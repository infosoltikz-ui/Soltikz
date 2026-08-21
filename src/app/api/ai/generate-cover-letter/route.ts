import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

const GeneratedCoverLetterFormat = z.object({
  salutation: z.string().describe("e.g. 'Dear Hiring Manager,' — use the company name if it fits naturally."),
  paragraphs: z.array(z.string()).describe("3-4 paragraphs: opening hook referencing the role/company, 1-2 body paragraphs connecting the candidate's real experience to the job's requirements using its own keywords, and a closing paragraph with a call to action."),
  sign_off: z.string().describe("e.g. 'Sincerely,'"),
});

const SYSTEM_PROMPT = `
You are an expert cover letter writer for technical and professional hires.
You will receive the candidate's Master Profile and the Parsed Job Description for the role they're applying to.

RULES:
- Write in first person, as the candidate.
- Reference the actual company name and job title from the JD naturally in the opening paragraph.
- Ground every claim in the candidate's real, provided experience. NEVER invent employers, projects, metrics, or skills that are not present in the Master Profile.
- Use the JD's own keywords/terminology where the candidate genuinely has that skill, to help with ATS keyword matching.
- Keep it concise: 3-4 short paragraphs total, not a full page. No filler like "I am a hard worker" without concrete backing.
- Do not repeat the resume verbatim — this should read as a genuine, focused pitch for why this specific role is a fit.

Return a perfect JSON object mapping exactly to the schema.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId } = await req.json();
    if (!resumeId) {
      return NextResponse.json({ error: 'Missing resumeId' }, { status: 400 });
    }

    // Load the resume (RLS also enforces ownership) to find its linked job description
    const { data: resume, error: resumeError } = await supabase
      .from('resumes_v2')
      .select('id, user_id, parsed_jd_id')
      .eq('id', resumeId)
      .single();

    if (resumeError || !resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    if (resume.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (!resume.parsed_jd_id) {
      return NextResponse.json({ error: 'This resume has no linked job description to write a cover letter for' }, { status: 400 });
    }

    const [{ data: parsedJd }, { data: profile }] = await Promise.all([
      supabase.from('parsed_job_descriptions').select('*').eq('id', resume.parsed_jd_id).single(),
      supabase.from('profiles').select('*').eq('id', user.id).single(),
    ]);

    if (!parsedJd || !profile) {
      return NextResponse.json({ error: 'Missing profile or job description data' }, { status: 400 });
    }

    const aiResponse = await generateAIResponse<any>({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Master Profile:\n${JSON.stringify(profile.master_resume_data || {})}\n\nCandidate Name: ${profile.full_name}\n\nJob Title: ${parsedJd.job_title}\nCompany: ${parsedJd.company_name}\nParsed JD:\n${JSON.stringify(parsedJd.parsed_data)}`,
      model: 'gpt-4o',
      temperature: 0.5,
      responseFormat: zodResponseFormat(GeneratedCoverLetterFormat, 'generated_cover_letter'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to generate cover letter');
    }

    const { data: coverLetterRecord, error: saveError } = await supabase
      .from('cover_letters')
      .insert({
        user_id: user.id,
        resume_id: resumeId,
        content: aiResponse.data,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      resume_id: resumeId,
      action_type: 'Generate Cover Letter',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({
      success: true,
      cover_letter_id: coverLetterRecord.id,
      cover_letter: aiResponse.data,
    });

  } catch (error: any) {
    console.error('Cover Letter Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
