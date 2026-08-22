import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import pdf from 'pdf-parse';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// Mirrors the shape EmploymentForm / EducationForm / SkillsForm / PersonalInfoForm
// expect inside profiles.master_resume_data, so the parsed result can pre-fill them directly.
const ParsedLinkedInFormat = z.object({
  personal_info: z.object({
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    linkedin: z.string().nullable().describe("The LinkedIn profile URL if present in the PDF header"),
    location: z.string().nullable(),
    summary: z.string().nullable().describe("The 'About' section text, if present"),
  }),
  employment: z.array(z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string().nullable().describe("e.g. 'Jan 2020'"),
    endDate: z.string().nullable().describe("e.g. 'Mar 2023', null if current"),
    current: z.boolean(),
    responsibilities: z.string().nullable().describe("Bullet points from the role description, joined with newlines"),
  })),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    grade: z.string().nullable(),
    description: z.string().nullable(),
  })),
  skills: z.array(z.object({
    name: z.string(),
    category: z.string().describe("A reasonable grouping, e.g. 'Programming Languages', 'Tools', 'Soft Skills'"),
  })),
});

const SYSTEM_PROMPT = `
You are an expert resume data extractor. You will receive raw text extracted from a
LinkedIn "Save to PDF" profile export. Extract the candidate's real information into
the exact schema provided.

RULES:
- Only extract information that is actually present in the text. Use null for fields
  that genuinely aren't there rather than inventing content.
- For employment, list roles most recent first, matching what's in the PDF.
- Do not fabricate metrics, companies, or dates that aren't in the source text.
- "responsibilities" should be the role's actual bullet/description text from the PDF, one point per line.

Return a perfect JSON object matching the schema exactly.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Please upload a PDF file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const textResult = await pdf(Buffer.from(arrayBuffer));

    const rawText = textResult.text?.trim();
    if (!rawText) {
      return NextResponse.json({ error: 'Could not extract any text from this PDF' }, { status: 400 });
    }

    const aiResponse = await generateAIResponse<any>({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `LinkedIn PDF export text:\n\n${rawText}`,
      model: 'gpt-4o-mini',
      temperature: 0.1,
      responseFormat: zodResponseFormat(ParsedLinkedInFormat, 'parsed_linkedin_profile'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to parse LinkedIn PDF');
    }

    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      action_type: 'Parse LinkedIn PDF',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({
      success: true,
      parsed_data: aiResponse.data,
    });

  } catch (error: any) {
    console.error('LinkedIn PDF Parsing Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
