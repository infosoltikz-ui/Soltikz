import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// 1. Define the exact structure of the generated resume
const GeneratedResumeFormat = z.object({
  summary: z.array(z.string()).describe("Bullet points for the Professional Summary"),
  skills: z.array(z.object({
    category: z.string(),
    items: z.array(z.string())
  })).describe("Skills grouped by category. Max 6 categories, 7-8 skills each."),
  experience: z.array(z.object({
    id: z.string().describe("Original project/experience ID from master profile"),
    role: z.string(),
    company: z.string(),
    duration: z.string(),
    environment: z.array(z.string()).optional().describe("List of tools/tech used. ONLY provide this for the first 2 most recent projects if C2C."),
    bullets: z.array(z.string()).describe("Action-driven bullet points for this role.")
  })),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string()
  })),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.string()
  }))
});

const SYSTEM_PROMPT = `
You are the ultimate AI Resume Generator. 
You will receive:
1. The User's Master Profile (raw data)
2. The Parsed Job Description
3. The Resume Strategy (what to emphasize)
4. The Resume Type (C2C or Full-Time)

CRITICAL RULES YOU MUST OBEY:
- Every bullet point must be a MAXIMUM of 2 lines long (keep it concise).
- Every bullet point must start with a strong Action Verb (e.g., Developed, Led, Architected). Do not use passive voice (e.g., "Responsible for").
- Ensure 40-50% of bullets contain quantified metrics (e.g., "reduced latency by 20%").
- Use exact keywords from the Parsed JD.
- Tense rules: Use present tense for current roles, past tense for past roles.

RESUME TYPE RULES:
- If C2C: Summary must have exactly 9 points. Every Experience project must have exactly 9 points. The first 2 most recent projects MUST include an "environment" array of tech used.
- If Full-Time: Summary must have max 5 points. Every Experience project must have max 7 points.

Return a perfect JSON object mapping exactly to the schema.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // Ensure user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { masterProfile, parsedJdData, strategyData, resumeType, parsedJdId, strategyId, title } = await req.json();

    if (!masterProfile || !parsedJdData || !strategyData || !resumeType) {
      return NextResponse.json({ error: 'Missing required payload data' }, { status: 400 });
    }

    // Call the AI Gateway
    const aiResponse = await generateAIResponse({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Resume Type: ${resumeType}\n\nMaster Profile:\n${JSON.stringify(masterProfile)}\n\nParsed JD:\n${JSON.stringify(parsedJdData)}\n\nStrategy:\n${JSON.stringify(strategyData)}`,
      model: 'gpt-4o', // Must use 4o for complex generation and strict instruction following
      temperature: 0.4, // Slight creativity for writing, but strict enough for formatting
      responseFormat: zodResponseFormat(GeneratedResumeFormat, 'generated_resume'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to generate resume');
    }

    // Save the new Resume to the database (V2 Schema)
    const { data: resumeRecord, error: resumeError } = await supabase
      .from('resumes_v2')
      .insert({
        user_id: user.id,
        parsed_jd_id: parsedJdId,
        strategy_id: strategyId,
        resume_type: resumeType,
        title: title || `${resumeType} Resume - ${parsedJdData.companyName || 'Draft'}`,
        status: 'Generating' // Next step will be validation
      })
      .select()
      .single();

    if (resumeError) throw resumeError;

    // Save the generated sections individually to allow granular editing
    const sectionsToInsert = [
      { resume_id: resumeRecord.id, section_type: 'Summary', content: aiResponse.data.summary },
      { resume_id: resumeRecord.id, section_type: 'Skills', content: aiResponse.data.skills },
      { resume_id: resumeRecord.id, section_type: 'Experience', content: aiResponse.data.experience },
      { resume_id: resumeRecord.id, section_type: 'Education', content: aiResponse.data.education },
      { resume_id: resumeRecord.id, section_type: 'Certifications', content: aiResponse.data.certifications }
    ];

    const { error: sectionsError } = await supabase.from('resume_sections').insert(sectionsToInsert);
    if (sectionsError) throw sectionsError;

    // Log the AI Telemetry
    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      resume_id: resumeRecord.id,
      action_type: 'Generate Resume',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({ 
      success: true, 
      resume_id: resumeRecord.id,
      generated_resume: aiResponse.data
    });

  } catch (error: any) {
    console.error('Resume Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
