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
You are an ultra-strict, enterprise-grade ATS (Applicant Tracking System) Scanner (e.g., Workday, Taleo, Greenhouse).
Analyze the provided Resume against the provided Job Description.

Scoring Rules (MATHEMATICALLY STRICT - NO EXCEPTIONS):
- Score ONLY based on what is literally present in the resume text provided.
- Do NOT inflate scores. Do NOT be generous. Do NOT assume implied skills.
- KEYWORD MATCH (40% weight): Count how many exact or near-exact keywords from the JD appear verbatim in the resume. Score = (matched / total_jd_keywords) * 100.
- FORMATTING (15% weight): Score 100 if the resume has clear section headers (Summary, Skills, Experience, Education). Deduct 20 per missing section.
- READABILITY (15% weight): Score based on bullet point quality - deduct for vague verbs ("helped", "worked on"), missing metrics/numbers, or overly long paragraphs.
- GRAMMAR (10% weight): Deduct per grammar issue found. Default 85 if no obvious errors.
- SKILLS COVERAGE (10% weight): What % of required skills/tools from JD appear in the Skills section.
- EXPERIENCE RELEVANCE (10% weight): How closely the candidate's past roles match the target role.
- Overall Score = weighted average of all 6 categories.
- Most good resumes score between 75-88. Only mathematically perfect keyword coverage justifies 90+.
- Return ONLY what the resume actually shows — do not guess or assume.

Return a perfect JSON object mapping to the exact requested schema.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const resumeId = body.resumeId;
    const parsedJdData = body.parsedJdData;
    const resumeContent = body.resumeContent || body.generatedResume;
    if (!resumeId || !parsedJdData || !resumeContent) return NextResponse.json({ error: 'Missing payload data' }, { status: 400 });

    const aiResponse = await generateAIResponse<any>({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Job Description:\n${JSON.stringify(parsedJdData)}\n\nResume Content:\n${JSON.stringify(resumeContent)}`,
      model: 'gpt-4o-mini',
      temperature: 0, // FULLY deterministic — same resume + same JD must always produce same score
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
