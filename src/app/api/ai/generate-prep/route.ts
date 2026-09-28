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
  selfIntroduction: z.string().describe("A powerful 3-4 paragraph spoken 'Tell me about yourself' pitch. Each paragraph must be 3-4 lines. Use simple, confident, conversational language. Deeply align with the specific JD, company, and candidate's real experience and metrics. Use \\n\\n to separate paragraphs."),
  companyNotes: z.string().describe("General advice on what this type of company usually looks for.")
});

const SYSTEM_PROMPT = `
You are a Senior Technical Interview Coach with 20+ years of experience preparing candidates for top tech companies.
Analyze the candidate's tailored Resume and the target Job Description carefully.

Generate interview preparation materials tailored EXACTLY to this specific candidate, role, and company.

For the selfIntroduction (Tell me about yourself):
- Write a SPOKEN pitch, not a formal letter. It should sound natural when said out loud in an interview.
- Write EXACTLY 3 to 4 paragraphs separated by \n\n.
- Each paragraph must be 3 to 4 lines long (not short, not too long).
- USE SIMPLE, CLEAR, CONFIDENT WORDS. Avoid jargon-heavy or overly formal language.
- Paragraph 1: Who you are, how many years of experience, and your main technical strength (React, frontend, etc.). Reference the company name and role directly.
- Paragraph 2: Your most impressive real achievement(s) from the resume with specific numbers/metrics. Connect it directly to what the JD is asking for.
- Paragraph 3: Why THIS company specifically excites you. Reference the company's domain, mission, or tech stack.
- Paragraph 4 (optional): Your leadership/teamwork value and what you bring to the team beyond code.

For STAR answers:
- Construct realistic answers using ONLY the candidate's actual experience bullets from their resume.
- Each STAR component (situation/task/action/result) should be 2-3 sentences.

Return a perfect JSON object mapping to the schema.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { resumeId, parsedJdData, resumeContent } = await req.json();
    if (!resumeId || !parsedJdData || !resumeContent) return NextResponse.json({ error: 'Missing payload data' }, { status: 400 });

    const aiResponse = await generateAIResponse<any>({
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
