import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// 1. Define the exact structure of the generated resume
const GeneratedResumeFormat = z.object({
  summary: z.array(z.string()).describe("Bullet points for the Professional Summary. Must be exactly 9 points if C2C, or max 5 points if Full-Time."),
  skills: z.array(z.object({
    category: z.string(),
    items: z.array(z.string())
  })).describe("Skills grouped by category. EXACTLY up to 6 categories, each with exactly 7-8 skills. The most important skills MUST come first. No random ordering."),
  experience: z.array(z.object({
    id: z.string().describe("Original project/experience ID from master profile"),
    role: z.string(),
    company: z.string(),
    duration: z.string(),
    environment: z.array(z.string()).nullable().describe("List of tools/tech used. ONLY provide this for the first 2 most recent projects if C2C."),
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
You are the ultimate AI Resume Generator and ATS Expert.
You will receive:
1. The User's Master Profile (raw data, including any local edits)
2. The Parsed Job Description
3. The Resume Strategy (what to emphasize)
4. The Resume Type (C2C or Full-Time)

CRITICAL CONTENT QUALITY RULES YOU MUST OBEY:
4.1 Keyword Alignment: Extract key skills, tools, and job titles from the JD and use them consistently across Summary, Skills, and Experience. Use the JD's own terminology (no synonyms or paraphrased versions). Integrate keywords naturally within full sentences (no forced keyword stacking).
4.2 Bullet Point Structure: Every bullet must follow this format: "Action Verb + Task + Tool/Method + Result (where possible)". Do NOT start with "Responsible for" or "Worked on". Approved action verbs: Led, Built, Designed, Automated, Implemented, Optimized, Migrated, Developed, Streamlined, Managed.
4.3 Quantified Impact: At least 40-50% of bullets across the resume MUST carry a quantified result (metrics like percentage, dollar value, time saved, team size). If no real metric is available, default to a clear outcome statement instead of inventing a false metric. NEVER fabricate numbers.
4.4 Tense Consistency: Active/Current roles MUST use present tense ("Develops", "Leads"). Past roles MUST use past tense ("Developed", "Led").
4.5 No Unsupported Buzzwords: Avoid generic filler terms (like "team player", "detail-oriented") unless backed by a concrete example in the same sentence.
4.6 Recency-Based Detail: Front-load the detail. The most recent 1-2 roles/projects should receive the most detailed, most JD-tailored content.
4.7 Tool & Tech Specificity: Name specific tools (e.g., "AWS EC2" instead of "cloud platforms"). Do NOT add version numbers unless specifically required by context.
4.8 Length & Format Discipline: Content MUST be front-loaded (most important detail first). Every single bullet point must be strictly concise to fit within 2 lines.

RESUME TYPE RULES:
If C2C:
- Summary MUST have EXACTLY 9 bullet points.
- Skill Set MUST have up to 6 categories, each with 7-8 skills. Prioritized by JD relevance (most important first).
- Every Experience project MUST have EXACTLY 9 bullet points.
- The first 2 most recent projects MUST include an "environment" array listing the main tools/technologies used.

If Full-Time:
- Summary MUST have a MAX of 5 bullet points.
- Skill Set MUST have up to 6 categories, each with 7-8 skills. Prioritized by JD relevance (most important first).
- Every Experience project MUST have EXACTLY 7 bullet points, tailored to the JD.

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
    const aiResponse = await generateAIResponse<any>({
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
