import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

const InterviewPrepFormat = z.object({
  hrQuestions: z.array(z.string()).describe("3 common behavioral HR questions based on the role level."),
  techQuestions: z.array(z.string()).describe("5 deep technical questions based directly on the JD requirements."),
  starAnswers: z.array(z.object({
    question: z.string(),
    situation: z.string(),
    task: z.string(),
    action: z.string(),
    result: z.string()
  })).describe("2 example STAR method answers constructed using the user's actual resume experience."),
  selfIntroduction: z.string().describe("A custom 3-paragraph 'Tell me about yourself' pitch summarizing their profile for this specific JD."),
  companyNotes: z.string().describe("General advice on what this type of company usually looks for.")
});

const SYSTEM_PROMPT = `
You are a Senior Technical Interview Coach. 
Analyze the candidate's tailored Resume and the target Job Description.
Generate interview preparation materials tailored EXACTLY to this specific candidate and role.
Construct realistic STAR (Situation, Task, Action, Result) answers using their actual experience bullets.
Return a perfect JSON object mapping to the schema.
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
      userPrompt: `Job Description:\n${JSON.stringify(parsedJdData)}\n\nCandidate Resume:\n${JSON.stringify(resumeContent)}`,
      model: 'gpt-4o', 
      temperature: 0.6,
      responseFormat: zodResponseFormat(InterviewPrepFormat, 'interview_prep'),
    });

    if (aiResponse.error || !aiResponse.data) throw new Error(aiResponse.error || 'Failed to generate prep');

    await supabase.from('interview_preparations').insert({
      resume_id: resumeId,
      hr_questions: aiResponse.data.hrQuestions,
      tech_questions: aiResponse.data.techQuestions,
      star_answers: aiResponse.data.starAnswers,
      self_introduction: aiResponse.data.selfIntroduction,
      company_notes: aiResponse.data.companyNotes
    });

    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      resume_id: resumeId,
      action_type: 'Generate Interview Prep',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({ success: true, prep: aiResponse.data });

  } catch (error: any) {
    console.error('Interview Prep Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
