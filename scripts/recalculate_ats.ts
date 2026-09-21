import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  missingKeywords: z.array(z.string()),
  improvementSuggestions: z.array(z.string())
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

async function main() {
  console.log('Starting ATS Recalculation...');

  // 1. Get ALL resumes
  const { data: resumes, error } = await supabase
    .from('resumes_v2')
    .select('id, parsed_jd_id');
    
  if (error) {
    console.error('Error fetching resumes:', error);
    return;
  }
  
  console.log(`Found ${resumes.length} resumes. Process beginning...`);

  for (const resume of resumes) {
    console.log(`Processing Resume ID: ${resume.id}`);
    
    // Delete existing ats_analyses
    await supabase.from('ats_analyses').delete().eq('resume_id', resume.id);
    
    // Fetch JD
    const { data: jdRecord } = await supabase
      .from('parsed_job_descriptions')
      .select('parsed_data')
      .eq('id', resume.parsed_jd_id)
      .single();
      
    if (!jdRecord) {
      console.log(`  -> Skipped: No JD found`);
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
      console.log(`  -> Skipped: No generated content`);
      continue;
    }

    try {
      console.log(`  -> Requesting strict evaluation from OpenAI...`);
      const completion = await openai.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Job Description:\n${JSON.stringify(jdRecord.parsed_data)}\n\nResume Content:\n${JSON.stringify(generatedResume)}` }
        ],
        temperature: 0.1,
        response_format: zodResponseFormat(ATSAnalysisFormat, 'ats_analysis'),
      });
      
      const analysis = completion.choices[0].message.parsed;
      
      if (!analysis) {
         console.log(`  -> Skipped: OpenAI returned null parsed analysis`);
         continue;
      }

      await supabase.from('ats_analyses').insert({
        resume_id: resume.id,
        overall_score: analysis.overallScore,
        category_scores: analysis.categoryScores,
        missing_keywords: analysis.missingKeywords,
        improvement_suggestions: analysis.improvementSuggestions
      });

      console.log(`  -> Success: New Score = ${analysis.overallScore}%`);
    } catch (e: any) {
      console.error(`  -> Failed: ${e.message}`);
    }
  }
  
  console.log('Finished recalculating ATS scores.');
}

main();
