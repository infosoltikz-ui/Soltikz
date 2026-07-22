import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

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
You are a strict Enterprise ATS (Applicant Tracking System) Scanner (e.g. Workday, Taleo).
Analyze the provided Resume against the provided Job Description.
Score the resume out of 100 based on keyword density, action verbs, readable format, and relevance.
Return a perfect JSON object mapping to the exact requested schema.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { resumeId, parsedJdData, resumeContent } = await req.json();
    if (!resumeId || !parsedJdData || !resumeContent) return NextResponse.json({ error: 'Missing payload data' }, { status: 400 });

    const aiResponse = await generateAIResponse({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Job Description:\n${JSON.stringify(parsedJdData)}\n\nResume Content:\n${JSON.stringify(resumeContent)}`,
      model: 'gpt-4o-mini', // Faster model is fine for scoring
      temperature: 0.1, // Highly deterministic scoring
      responseFormat: zodResponseFormat(ATSAnalysisFormat, 'ats_analysis'),
    });

    if (aiResponse.error || !aiResponse.data) throw new Error(aiResponse.error || 'Failed to analyze ATS');

    // Save to ATS DB
    await supabase.from('ats_analyses').insert({
      resume_id: resumeId,
      overall_score: aiResponse.data.overallScore,
      category_scores: aiResponse.data.categoryScores,
      missing_keywords: aiResponse.data.missingKeywords,
      improvement_suggestions: aiResponse.data.improvementSuggestions
    });

    // Log telemetry
    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      resume_id: resumeId,
      action_type: 'Analyze ATS',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({ success: true, analysis: aiResponse.data });

  } catch (error: any) {
    console.error('ATS Analysis Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
