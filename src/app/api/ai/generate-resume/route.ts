import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// ─── STEP 1: Keyword Extraction Schema ───────────────────────────────────────
const KeywordExtractionFormat = z.object({
  mustHaveKeywords: z.array(z.string()).describe(
    'Every exact technical keyword, tool, framework, library, cloud service, methodology, and skill explicitly required or mentioned in the JD. These MUST appear verbatim in the resume.'
  ),
  jobTitle: z.string().describe('The exact job title from the JD'),
  coreDomain: z.string().describe('The primary domain (e.g., Frontend Engineering, Data Engineering, DevOps)'),
  keyResponsibilities: z.array(z.string()).describe('Top 5 core responsibilities from the JD as short phrases'),
});

// ─── STEP 2: Resume Generation Schema ────────────────────────────────────────
const GeneratedResumeFormat = z.object({
  summary: z.array(z.string()).describe(
    'High-impact bullet points for Professional Summary. Exactly 10 for C2C, 5-7 for Full-Time. Each bullet: strictly 25-35 words (~2 lines) with bolded keywords like **React.js**, **AWS Lambda**.'
  ),
  skills: z.array(z.object({
    category: z.string(),
    items: z.array(z.string()),
  })).describe(
    'Skills grouped by category. C2C: 7-10 categories with 5-7 items each. Full-Time: up to 6 categories with 7-8 items. Most critical JD skills MUST come first. No proficiency ratings.'
  ),
  experience: z.array(z.object({
    id: z.string().describe('Original project/experience ID from master profile'),
    role: z.string(),
    company: z.string(),
    duration: z.string(),
    environment: z.array(z.string()).nullable().describe('List of tools/tech used. Required for recent roles.'),
    bullets: z.array(z.string()).describe(
      'C2C: 8-10 bullets (most recent role), 6-8 (older), 5-6 (earliest). Full-Time: 10-12 per role. Every bullet: 25-35 words, bolded JD keywords, quantified outcomes. Formula: [ACTION VERB] + [scope] + [JD tool/method] + [metric outcome].'
    ),
  })),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string().describe('City, State'),
    year: z.string(),
  })),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.string(),
  })),
});

// ─── KEYWORD EXTRACTION PROMPT ────────────────────────────────────────────────
const KEYWORD_EXTRACTION_PROMPT = `
You are an expert ATS keyword analyst. Extract every single keyword from the Job Description.

Rules:
- Extract EVERY keyword — tools, frameworks, libraries, databases, cloud services, methodologies, soft skills.
- Use EXACT spelling and capitalisation (e.g., "React.js" not "react", "AWS Lambda" not "lambda").
- Include ALL technologies mentioned anywhere in the JD, even in "nice to have" sections.
- This keyword list is directly injected into the resume — completeness is critical for 90+ ATS scores.
- Return 25-60 keywords depending on JD richness. More is better.
`;

// ─── RESUME GENERATION PROMPT (DYNAMIC, KEYWORD-INJECTED) ─────────────────────
const buildGenerationPrompt = (
  mustHaveKeywords: string[],
  jobTitle: string,
  coreDomain: string
) => `
You are the world's #1 Enterprise AI Resume Generator — engineered for guaranteed 90%+ ATS scores on Workday, Taleo, Greenhouse, and Lever.

══════════════════════════════════════════════════════════════════
🚨 MANDATORY KEYWORD COMPLIANCE — ZERO EXCEPTIONS 🚨
══════════════════════════════════════════════════════════════════

${mustHaveKeywords.length} keywords were extracted directly from the Job Description.
YOU MUST include EVERY SINGLE keyword verbatim somewhere in the resume.
(Summary, Skills matrix, or Experience bullets — at least one appearance per keyword.)
Missing even one keyword reduces the ATS score. This is the #1 priority.

TARGET JOB TITLE: ${jobTitle}
CORE DOMAIN: ${coreDomain}

MANDATORY KEYWORDS — ALL ${mustHaveKeywords.length} MUST APPEAR IN THE RESUME:
${mustHaveKeywords.map((kw, i) => `  ${i + 1}. ${kw}`).join('\n')}

══════════════════════════════════════════════════════════════════
KEYWORD PLACEMENT STRATEGY:
══════════════════════════════════════════════════════════════════

1. SKILLS MATRIX (Primary placement):
   - Place ALL mandatory keywords into relevant skill categories.
   - Every single keyword from the mandatory list must appear here.
   - Use keyword exact form (e.g., "React.js" not "React", "Node.js" not "NodeJS").

2. PROFESSIONAL SUMMARY (Secondary placement):
   - Bold the 15-20 most critical keywords: **React.js**, **AWS Lambda**, **PostgreSQL**.
   - Repeat the top 5-8 keywords across multiple bullet points for density.

3. EXPERIENCE BULLETS (Tertiary placement):
   - Weave remaining keywords naturally into bullets with bold syntax.
   - Top 10 most important keywords should appear 3+ times total across the resume.

══════════════════════════════════════════════════════════════════
CONTENT QUALITY RULES:
══════════════════════════════════════════════════════════════════

1. STRICT 2-LINE BULLET (25-35 WORDS EACH — NO EXCEPTIONS):
   - Formula: [Power Verb] + [Technical scope + JD keywords] + [Scale/method] + [Quantified % outcome].
   - BANNED: "Responsible for", "Helped with", "Assisted in", "Worked on", "Handled tasks".
   - BANNED: Bullets shorter than 25 words. BANNED: Bullets longer than 40 words.

2. QUANTIFIED METRICS (60%+ of bullets MUST have numbers):
   - Examples: "reducing latency by 38%", "scaling to 1.2M monthly transactions", "cutting deploy time from 4 hours to 25 minutes".
   - Action verbs: Architected, Engineered, Spearheaded, Automated, Deployed, Optimized, Scaled, Orchestrated.

3. TENSE:
   - Current/present roles: present tense ("Architects", "Engineers", "Leads").
   - Past roles: past tense ("Architected", "Engineered", "Led").

4. RESUME TYPE SPECIFICATIONS:
   ★ C2C:
     - Professional Summary: EXACTLY 10 bullets (strictly 2 lines each, all with metrics and JD keywords).
     - Skills Matrix: 7-10 categories, 5-7 items each, JD keywords first.
     - Experience: Most recent role: 8-10 bullets. 2nd role: 6-8 bullets. 3rd+: 5-6 bullets.
     - Include "environment" tech stack array for all roles.

   ★ Full-Time:
     - Professional Summary: 5-7 bullets (strictly 2 lines each).
     - Skills Matrix: up to 6 categories, 7-8 items each.
     - Experience: 10-12 bullets per role.

Return valid JSON matching exact schema. Populate ALL fields fully — no shortcuts, no truncation.
`;

// ─── MAIN POST HANDLER ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      masterProfile,
      parsedJdData,
      strategyData,
      resumeType,
      parsedJdId,
      strategyId,
      title,
      templateId,
    } = await req.json();

    if (!masterProfile || !parsedJdData || !strategyData || !resumeType) {
      return NextResponse.json({ error: 'Missing required payload data' }, { status: 400 });
    }

    // --- PAYWALL / QUOTA CHECK ---
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan_id, credits_remaining')
      .eq('id', user.id)
      .single();

    // TEMPORARY BYPASS: Allow unlimited generations for local testing
    // if (profile?.plan_id === 'FREE' && (profile?.credits_remaining ?? 0) <= 0) {
    //   return NextResponse.json({ error: 'Paywall', message: 'Upgrade to Pro to continue.' }, { status: 403 });
    // }

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Extract ALL keywords from JD
    // Fast, cheap, deterministic (temperature=0, gpt-4o-mini)
    // ═══════════════════════════════════════════════════════════════
    const keywordResponse = await generateAIResponse<any>({
      systemPrompt: KEYWORD_EXTRACTION_PROMPT,
      userPrompt: `Extract all keywords from this Job Description:\n${JSON.stringify(parsedJdData)}`,
      model: 'gpt-4o-mini',
      temperature: 0,
      responseFormat: zodResponseFormat(KeywordExtractionFormat, 'keyword_extraction'),
    });

    const extractedKeywords: string[] = keywordResponse.data?.mustHaveKeywords || [];
    const jobTitle: string = keywordResponse.data?.jobTitle || parsedJdData?.jobTitle || 'Software Engineer';
    const coreDomain: string = keywordResponse.data?.coreDomain || 'Software Engineering';

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Generate Resume with ALL keywords explicitly injected
    // High quality (gpt-4o), low temperature (0.15) for keyword precision
    // ═══════════════════════════════════════════════════════════════
    const dynamicSystemPrompt = buildGenerationPrompt(extractedKeywords, jobTitle, coreDomain);

    const aiResponse = await generateAIResponse<any>({
      systemPrompt: dynamicSystemPrompt,
      userPrompt: [
        `Resume Type: ${resumeType}`,
        ``,
        `MANDATORY KEYWORDS (ALL ${extractedKeywords.length} MUST APPEAR IN RESUME): ${extractedKeywords.join(', ')}`,
        ``,
        `Master Profile:\n${JSON.stringify(masterProfile)}`,
        ``,
        `Parsed JD:\n${JSON.stringify(parsedJdData)}`,
        ``,
        `Strategy:\n${JSON.stringify(strategyData)}`,
      ].join('\n'),
      model: 'gpt-4o',
      temperature: 0.15, // Precise enough for keyword placement, natural enough for writing
      responseFormat: zodResponseFormat(GeneratedResumeFormat, 'generated_resume'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to generate resume');
    }

    // ─── Save Resume Record ───────────────────────────────────────
    const { data: resumeRecord, error: resumeError } = await supabase
      .from('resumes_v2')
      .insert({
        user_id: user.id,
        parsed_jd_id: parsedJdId,
        strategy_id: strategyId,
        resume_type: resumeType,
        title: title || `${resumeType} Resume - ${parsedJdData.companyName || 'Draft'}`,
        status: 'Ready',
        template_id: templateId || (resumeType.toLowerCase().includes('c2c') ? 'c2c-modern' : 'modern'),
      })
      .select()
      .single();

    if (resumeError) throw resumeError;

    // ─── Save Sections ───────────────────────────────────────────
    const sectionsToInsert = [
      { resume_id: resumeRecord.id, section_type: 'Summary', content: aiResponse.data.summary },
      { resume_id: resumeRecord.id, section_type: 'Skills', content: aiResponse.data.skills },
      { resume_id: resumeRecord.id, section_type: 'Experience', content: aiResponse.data.experience },
      { resume_id: resumeRecord.id, section_type: 'Education', content: aiResponse.data.education },
      { resume_id: resumeRecord.id, section_type: 'Certifications', content: aiResponse.data.certifications },
    ];

    const { error: sectionsError } = await supabase.from('resume_sections').insert(sectionsToInsert);
    if (sectionsError) throw sectionsError;

    // ─── Log Telemetry ────────────────────────────────────────────
    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      resume_id: resumeRecord.id,
      action_type: 'Generate Resume',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success',
    });

    await supabase.from('usage_events').insert({
      user_id: user.id,
      resume_id: resumeRecord.id,
      event_type: 'resume_generated',
    });

    // ─── Deduct Quota ────────────────────────────────────────────
    if (profile?.plan_id === 'FREE') {
      const remaining = profile?.credits_remaining ?? 20;
      await supabase
        .from('profiles')
        .update({ credits_remaining: Math.max(0, remaining - 1) })
        .eq('id', user.id);
    }

    return NextResponse.json({
      success: true,
      resume_id: resumeRecord.id,
      generated_resume: aiResponse.data,
      keyword_stats: {
        total_keywords_extracted: extractedKeywords.length,
        keywords: extractedKeywords,
      },
    });

  } catch (error: any) {
    console.error('Resume Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
