import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateAIResponse } from '@/utils/ai-gateway';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const ATSAnalysisFormat = z.object({
  overallScore: z.number().min(0).max(100),
  categoryScores: z.object({
    keywordMatch: z.number().min(0).max(100),
    formatting: z.number().min(0).max(100),
    readability: z.number().min(0).max(100),
    grammar: z.number().min(0).max(100),
    skillsCoverage: z.number().min(0).max(100),
    experienceRelevance: z.number().min(0).max(100),
  }),
  missingKeywords: z.array(z.string()).describe("Important ATS keywords from the JD that are still missing from the resume."),
  improvementSuggestions: z.array(z.string()).describe("Actionable advice to increase the ATS score further.")
});

const SYSTEM_PROMPT = `
You are an ultra-strict, enterprise-grade ATS (Applicant Tracking System) Scanner (e.g., Workday, Taleo, Greenhouse).
Analyze the provided Resume against the provided Job Description.

Scoring Rules (BE CRITICAL):
- Do NOT arbitrarily give scores above 90 unless it is a mathematically perfect keyword and context match.
- Most good resumes score between 75 and 85.
- Deduct points aggressively if exact keywords (tools, frameworks, methodologies) are missing.
- Deduct points if action verbs are weak or metrics/quantifiable results are missing from experience bullets.
- Check readability and structural formatting strictness.

Score the resume out of 100 based on keyword density, action verbs, readable format, and relevance.
Return a perfect JSON object mapping to the exact requested schema.
`;

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    
    // We fetch ALL resumes in the database since this is a backfill for all existing ones.
    const { data: resumes, error } = await supabase
      .from('resumes_v2')
      .select('id, parsed_jd_id');
      
    if (error) throw error;
    
    // 2. We'll track progress
    const results = [];

    for (const resume of resumes) {
      // Check if it already has a "real" score. 
      // We know a score is fake if missing_keywords is completely empty (the old fallback did this).
      // Or we can just overwrite all of them. Let's just overwrite all of them.
      
      // Delete existing ats_analyses
      await supabase.from('ats_analyses').delete().eq('resume_id', resume.id);
      
      // Fetch JD
      const { data: jdRecord } = await supabase
        .from('parsed_job_descriptions')
        .select('parsed_data')
        .eq('id', resume.parsed_jd_id)
        .single();
        
      if (!jdRecord) {
        results.push({ id: resume.id, status: 'No JD found' });
        continue;
      }
      
      // Fetch Resume Sections
      const { data: sections } = await supabase
        .from('resume_sections')
        .select('section_type, content')
        .eq('resume_id', resume.id);
        
      const generatedResume = sections?.reduce((acc: any, sec) => {
        acc[(sec.section_type || '').toLowerCase()] = sec.content;
        return acc;
      }, {});
      
      if (!generatedResume || Object.keys(generatedResume).length === 0) {
        results.push({ id: resume.id, status: 'No content found' });
        continue;
      }

      // Generate New Score
      const aiResponse = await generateAIResponse<any>({
        systemPrompt: SYSTEM_PROMPT,
        userPrompt: `Job Description:\n${JSON.stringify(jdRecord.parsed_data)}\n\nResume Content:\n${JSON.stringify(generatedResume)}`,
        model: 'gpt-4o-mini',
        temperature: 0.1,
        responseFormat: zodResponseFormat(ATSAnalysisFormat, 'ats_analysis'),
      });

      if (aiResponse.error || !aiResponse.data) {
        results.push({ id: resume.id, status: 'AI Error', error: aiResponse.error });
        continue;
      }

      // Insert New Real Score
      await supabase.from('ats_analyses').insert({
        resume_id: resume.id,
        overall_score: aiResponse.data.overallScore,
        category_scores: aiResponse.data.categoryScores,
        missing_keywords: aiResponse.data.missingKeywords,
        improvement_suggestions: aiResponse.data.improvementSuggestions
      });

      results.push({ id: resume.id, status: 'Success', score: aiResponse.data.overallScore });
    }

    return NextResponse.json({ success: true, processed: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
