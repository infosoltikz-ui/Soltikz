import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// 1. Define the exact structure of the generated resume
const GeneratedResumeFormat = z.object({
  summary: z.array(z.string()).describe("High-impact bullet points for the Professional Summary. Must be exactly 9 points if C2C, or exactly 5 points if Full-Time. Each bullet point MUST be substantive and span approximately 2 lines (25-35 words) with rich JD keywords."),
  skills: z.array(z.object({
    category: z.string(),
    items: z.array(z.string())
  })).describe("Skills grouped by category. EXACTLY up to 6 categories, each with exactly 7-8 skills. The most critical skills matching the JD MUST come first."),
  experience: z.array(z.object({
    id: z.string().describe("Original project/experience ID from master profile"),
    role: z.string(),
    company: z.string(),
    duration: z.string(),
    environment: z.array(z.string()).nullable().describe("List of tools/tech used. ONLY provide this for the first 2 most recent projects if C2C."),
    bullets: z.array(z.string()).describe("High-impact, 2-line action-driven bullet points for this role. Exactly 9 bullets per role if C2C, or 7 bullets per role if Full-Time.")
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
You are the world's leading Enterprise AI Resume Generator and ATS Optimization Authority (engineered for 90%+ ATS match on Workday, Taleo, Greenhouse, and Lever).

You will receive:
1. The Candidate's Master Profile (raw career history, existing skills, and accomplishments)
2. The Parsed Job Description (target role, required qualifications, key technologies, responsibilities)
3. The Resume Strategy (positioning angles, priority keywords, experience to highlight)
4. The Resume Type (C2C or Full-Time)

══════════════════════════════════════════════════════════════════
MANDATORY ATS 90+ SCORE & CONTENT RULES (NON-NEGOTIABLE):
══════════════════════════════════════════════════════════════════

1. ATS SCORE 90+ KEYWORD MAXIMIZATION:
   - Deeply analyze the provided Job Description (JD). Extract every core technical skill, framework, cloud service, methodology (Agile/Scrum, CI/CD, TDD), and industry terminology.
   - Weave the JD's exact keywords verbatim throughout the Professional Summary, the Skills Categories, and into EVERY Experience bullet point.
   - Achieve 90%+ ATS match density naturally by embedding keywords in context-rich achievement statements (no keyword stuffing or isolated keyword lists).

2. 2-LINE BULLET POINT DISCIPLINE (STRICT LENGTH RULE):
   - EVERY SINGLE BULLET POINT (in Professional Summary and Experience) MUST be approximately 2 lines long in standard resume typography (approx. 25 to 35 words per bullet).
   - NEVER generate short, weak 1-line fragments (e.g. "Worked with React and Node").
   - NEVER generate dense, unreadable 4+ line paragraphs.
   - Bullet Formula: [Power Action Verb] + [Specific Technical Scope/Architecture] + [Exact Tools & Methodologies from JD] + [Measurable Business Outcome / Quantified Metric].

3. QUANTIFIED IMPACT & ACTION VERBS:
   - At least 50% of experience bullets MUST include quantified metrics (e.g., "reducing latency by 38%", "scaling to 2.5M daily active users", "accelerating CI/CD deployment cycles by 45%").
   - Start each bullet with strong, diverse action verbs: Architected, Spearheaded, Engineered, Automated, Deployed, Optimized, Streamlined, Scaled, Orchestrated, Modernized.
   - BANNED PHRASES: "Responsible for", "Helped with", "Assisted in", "Worked on", "Handled tasks".

4. TENSE & RECENCY:
   - Current/Present roles: Use present tense action verbs (e.g., "Architects", "Engineers", "Leads").
   - Past roles: Use past tense action verbs (e.g., "Architected", "Engineered", "Led").
   - Front-load high-impact technical depth onto the most recent 1–2 roles.

5. RESUME TYPE STRUCTURE SPECIFICATIONS:

   ★ IF C2C (Corp-to-Corp / Contract):
   - Professional Summary: EXACTLY 9 bullet points (each strictly 2 lines long, packed with JD keywords and career achievements).
   - Skills Matrix: EXACTLY up to 6 categories, each with 7-8 skills, prioritized with highest-match JD technologies first.
   - Experience History: EXACTLY 9 bullet points per project/role (each strictly 2 lines long).
   - Environment Section: Provide an "environment" tech stack array for the 2 most recent roles.

   ★ IF FULL-TIME:
   - Professional Summary: EXACTLY 5 bullet points (each strictly 2 lines long, highly targeted to the JD).
   - Skills Matrix: EXACTLY up to 6 categories, each with 7-8 skills, prioritized by JD relevance.
   - Experience History: EXACTLY 7 bullet points per role (each strictly 2 lines long).

Return a valid, complete JSON object matching the exact schema. Ensure all fields are fully populated without shortcuts or truncation.
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

    // --- PAYWALL / QUOTA CHECK ---
    const { data: profile } = await supabase.from('profiles').select('plan_id, credits_remaining').eq('id', user.id).single();
    
    const availableCredits = profile?.credits_remaining ?? 20;
    if (profile?.plan_id === 'FREE' && availableCredits <= 0) {
      return NextResponse.json({ 
        error: 'Paywall', 
        message: 'You have used all 20 of your free AI generation credits. Please upgrade to Pro to continue generating unlimited resumes.' 
      }, { status: 403 });
    }
    // -----------------------------

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
        status: 'Ready'
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

    // Log the usage event for real stats
    await supabase.from('usage_events').insert({
      user_id: user.id,
      resume_id: resumeRecord.id,
      event_type: 'resume_generated'
    });

    // --- DEDUCT QUOTA ---
    if (profile?.plan_id === 'FREE') {
      const remaining = profile?.credits_remaining ?? 20;
      await supabase.from('profiles').update({ credits_remaining: Math.max(0, remaining - 1) }).eq('id', user.id);
    }
    // --------------------

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
