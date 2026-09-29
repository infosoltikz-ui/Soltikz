import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

const KeyPointSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()),
  tip: z.string().nullable()
})

const SelfPitchSchema = z.object({
  fullVersion: z.string().describe("A concise, highly professional, and natural spoken 3-paragraph self-introduction for 'Tell me about yourself'. Use SIMPLE English, avoid overly dense or complex sentences. Paragraph 1: State name, education, certifications, and high-level experience. Paragraph 2: Highlight current role and 1-2 major achievements in a conversational way. Paragraph 3: Briefly explain why they are a great fit for this specific role. Keep it easy to read aloud."),
  shortVersion: z.string().describe("A crisp 3-paragraph version for when the interviewer wants a quick answer. Each paragraph 3-4 lines covering: who+experience+skills, key achievements+role, why this opportunity."),
  keyPoints: z.array(KeyPointSchema).describe("Exactly 8 key talking points the candidate must remember. Each with a title (e.g. 'Who You Are'), 2-4 bullet points with specific details from their profile, and an optional tip for that point."),
  strengthsAnswer: z.object({
    opening: z.string().describe("1-2 sentence opener for 'What are your strengths?' (e.g. 'My key strengths are X, Y, Z.')"),
    strengths: z.array(z.object({
      name: z.string(),
      detail: z.string()
    })).describe("4-5 strengths with a one-sentence explanation each, derived from actual resume experience.")
  }),
  whyShouldWeHireYou: z.string().describe("A 2-paragraph answer to 'Why should we hire you?' that references the JD requirements and the candidate's actual experience."),
  interviewTip: z.object({
    avoid: z.array(z.string()).describe("4-6 topics/skills to NOT emphasize (e.g. backend skills if applying for frontend role)"),
    focus: z.array(z.string()).describe("6-8 core themes to lead the entire interview narrative with"),
    flow: z.array(z.string()).describe("8-10 sequential interview flow steps (e.g. 'Who I am' → '6+ years' → 'React + TS')")
  })
})

const InterviewPrepFormat = z.object({
  hrQuestions: z.array(z.string()),
  techQuestions: z.array(z.string()),
  starAnswers: z.array(z.object({
    question: z.string(),
    situation: z.string(),
    task: z.string(),
    action: z.string(),
    result: z.string()
  })),
  selfPitch: SelfPitchSchema,
  companyNotes: z.string()
});

const SYSTEM_PROMPT = `
You are a Senior Technical Interview Coach with 20+ years of experience preparing candidates at Google, Meta, Amazon, and top startups.
Analyze the candidate's tailored Resume and the target Job Description carefully.

Generate a COMPLETE, deeply personalized interview preparation guide for this SPECIFIC candidate applying for this SPECIFIC role at this SPECIFIC company.

RULES:
1. Use ONLY the candidate's actual experience, metrics, and skills from their resume. NEVER invent details.
2. The selfPitch must sound like a real human speaking confidently — natural, clear, not robotic.
3. All numbers/metrics in the pitch MUST come from the actual resume (e.g., 45% improvement, 6 junior engineers).
4. The fullVersion of selfPitch MUST start by introducing the candidate's name (e.g. 'Hi, I am [Name]'). It MUST also explicitly weave in their Education degree/university and any Certifications they hold into the narrative.
5. The keyPoints array must have EXACTLY 8 items covering: Who You Are, Primary Expertise, Current Role, Performance Achievement, Architecture, API/Backend Collaboration, Quality & Engineering Practices, Leadership.
6. The interviewTip.avoid list should clearly identify skills that are in the resume but NOT the primary focus of this JD.
7. For STAR answers, use ONLY the candidate's actual experience bullets. Make each STAR component 2-3 sentences.

Return a perfect JSON object matching the schema exactly.
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

    const d = aiResponse.data

    // Store selfPitch as JSON string in self_introduction for backward compat
    await supabase.from('interview_preparations').insert({
      resume_id: resumeId,
      hr_questions: d.hrQuestions,
      tech_questions: d.techQuestions,
      star_answers: d.starAnswers,
      self_introduction: JSON.stringify(d.selfPitch),
      company_notes: d.companyNotes
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

    return NextResponse.json({ success: true, prep: d });

  } catch (error: any) {
    console.error('Interview Prep Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
