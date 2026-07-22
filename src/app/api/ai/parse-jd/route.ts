import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// 1. Define the exact strict JSON schema we want the AI to return for a parsed JD
const ParsedJDFormat = z.object({
  jobTitle: z.string().describe("The primary job title, e.g., Senior Software Engineer"),
  companyName: z.string().optional().describe("The name of the company hiring, if mentioned"),
  experienceLevel: z.string().describe("Required experience level, e.g., Mid, Senior, 5+ years"),
  requiredSkills: z.array(z.string()).describe("A list of 5-10 core mandatory skills"),
  technologies: z.array(z.string()).describe("Specific tools, languages, or frameworks mentioned (e.g. AWS, React)"),
  responsibilities: z.array(z.string()).describe("Top 3-5 core daily responsibilities extracted"),
  softSkills: z.array(z.string()).describe("Required soft skills like Leadership, Communication"),
  certifications: z.array(z.string()).describe("Required or nice-to-have certifications"),
  industry: z.string().optional().describe("The industry of the company or role"),
  priorityKeywords: z.array(z.string()).describe("The absolute most critical ATS keywords to include in a resume"),
});

const SYSTEM_PROMPT = `
You are an expert ATS (Applicant Tracking System) algorithm and Senior IT Recruiter.
Your job is to analyze Job Descriptions (JDs) and extract structured data.
You must return a perfect JSON object that matches the requested schema.
Extract exact keywords used in the JD (do not use synonyms).
Identify the priority keywords that are most likely weighted heavily by an ATS.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // Ensure user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobDescription } = await req.json();

    if (!jobDescription) {
      return NextResponse.json({ error: 'jobDescription is required' }, { status: 400 });
    }

    // Call the AI Gateway
    const aiResponse = await generateAIResponse({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Parse the following Job Description:\n\n${jobDescription}`,
      model: 'gpt-4o-mini', // 4o-mini is great for fast text parsing
      temperature: 0.2, // Low temperature for factual extraction
      responseFormat: zodResponseFormat(ParsedJDFormat, 'parsed_jd'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to parse JD');
    }

    // Save the parsed JD to the database
    const { data: dbData, error: dbError } = await supabase
      .from('parsed_job_descriptions')
      .insert({
        user_id: user.id,
        original_text: jobDescription,
        job_title: aiResponse.data.jobTitle,
        company_name: aiResponse.data.companyName || 'Unknown Company',
        parsed_data: aiResponse.data
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Log the AI Telemetry for cost tracking
    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      action_type: 'Parse JD',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({ 
      success: true, 
      parsed_jd_id: dbData.id,
      parsed_data: aiResponse.data
    });

  } catch (error: any) {
    console.error('JD Parsing Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
