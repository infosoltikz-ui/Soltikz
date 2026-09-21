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
    'C2C: EXACTLY 10 bullet points (2 lines/25-35 words each) with bolded **keywords** and metrics. Full-Time: EXACTLY 5 sentences that join into one flowing prose paragraph — NO bullets, NO bold, NO "I".'
  ),
  skills: z.array(z.object({
    category: z.string(),
    items: z.array(z.string()),
  })).describe(
    'EXACTLY 10 skill categories for both C2C and Full-Time. EXACTLY 5-7 items per category. JD exact terms MUST come first. Standard categories: Core Domain Skills, Tools & Platforms, Programming & Scripting, Databases & Data Handling, Cloud & Infrastructure, Frameworks & Methodologies, Testing & Quality, Reporting & Visualization, Collaboration & Workflow, Operating Systems & Environments. No proficiency ratings.'
  ),
  experience: z.array(z.object({
    id: z.string().describe('Original project/experience ID from master profile'),
    role: z.string(),
    company: z.string(),
    duration: z.string(),
    environment: z.array(z.string()).nullable().describe('C2C ONLY: comma-separated list of every tool/tech used on that engagement. Set null for Full-Time resumes.'),
    bullets: z.array(z.string()).describe(
      'C2C: Exp1=8 bullets, Exp2=6-8, Exp3+=5-6. Full-Time: Exp1=5-6 strongest, Exp2=4-5 strongest, Exp3+=3-4 strongest. Every bullet: exactly 2 lines/24-32 words. Formula: [ACTION VERB]+[what]+[tool/method]+[scope]+[number outcome].'
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
   - Weave the top 10-15 most critical JD keywords into the summary naturally.
   - For C2C: Bold them with **keyword** syntax.
   - For Full-Time: Embed them in prose without bolding.

3. EXPERIENCE BULLETS (Tertiary placement):
   - Weave remaining keywords naturally into bullets.
   - Top 10 most important keywords should appear 3+ times total across the resume.

══════════════════════════════════════════════════════════════════
UNIVERSAL CONTENT RULES (APPLY TO BOTH C2C AND FULL-TIME):
══════════════════════════════════════════════════════════════════

BANNED PHRASES — NEVER USE:
  ✗ "Responsible for"  ✗ "Helped with"  ✗ "Assisted in"  ✗ "Worked on"
  ✗ "Participated in"  ✗ "Involved in"  ✗ "Utilized"  ✗ "Tasked with"
  ✗ "Familiar with"  ✗ "Exposure to"  ✗ "detail-oriented"  ✗ "results-driven"
  ✗ "passionate"  ✗ "motivated"  ✗ "seeking a challenging role"
  ✗ NEVER open a sentence or bullet with "I"

TENSE RULES (CRITICAL):
  - CURRENT / PRESENT roles: PRESENT tense — "Architects", "Engineers", "Leads", "Deploys"
  - PAST roles: PAST tense — "Architected", "Engineered", "Led", "Deployed"

QUANTIFIED METRICS:
  - Minimum 60% of ALL experience bullets MUST contain a real number.
  - Use: percentages, volume, scale, time saved, team size, cost, revenue, users.
  - Examples: "reducing API latency by 38%", "supporting 1.2M monthly transactions",
    "cutting release time from 4 hours to 25 minutes", "mentoring a team of 8 engineers".
  - If no exact number is available, use a defensible range ("~200-250 weekly").

BULLET ANATOMY:
  [ACTION VERB] + [what you did] + [tool/method] + [scope/scale] + [outcome with a number]
  Front-load each role's strongest bullet first.
  Roughly 60% "built/designed/engineered/led" + 40% "optimized/ran/handled/supported".

ACTION VERB BANK:
  Built (highest value): Engineered, Designed, Developed, Built, Architected, Implemented,
    Deployed, Automated, Launched, Integrated, Configured, Migrated
  Analyzed: Analyzed, Diagnosed, Investigated, Resolved, Troubleshot, Identified, Evaluated, Modeled
  Improved: Optimized, Reduced, Increased, Streamlined, Consolidated, Refactored, Standardized, Scaled
  Led: Led, Owned, Directed, Managed, Mentored, Established, Drove, Spearheaded, Championed
  Communicated: Documented, Presented, Briefed, Reported, Advised, Trained, Partnered

══════════════════════════════════════════════════════════════════
★★★ C2C RESUME RULES (ONLY IF Resume Type = C2C) ★★★
══════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY — C2C (BULLETS, NOT PROSE):
  - EXACTLY 10 bullet points. Each bullet MUST be exactly 2 full lines (~25-35 words).
  - Every bullet MUST include quantified metrics (%, scale, time saved, people mentored).
  - Bold ALL critical JD keywords with **keyword** syntax.
  - Exact 10-bullet sequence:
    1. Headline: [Title] with [N]+ years across [domains] driving [metric]% improvement.
    2. Primary technical depth — strongest JD tool built at scale, [%] efficiency gain.
    3. Secondary technical depth — next JD capability at [metric] scale.
    4. Design or build work — created from scratch, [%] improvement.
    5. Analysis or problem-solving — hard problems solved, reducing errors by [%].
    6. Delivery or operations — lifecycle phases owned end-to-end, [%] faster delivery.
    7. Automation or efficiency — scripted/streamlined, [N] hours/week reclaimed.
    8. Data/cloud/infrastructure — platforms, supporting [N] users or [metric] throughput.
    9. Standards and compliance — frameworks, methodologies, 100% compliance achieved.
    10. Leadership and communication — mentored [N] engineers, led cross-functional teams of [N]+.

SKILLS MATRIX — C2C:
  - EXACTLY 10 grouped categories (same 10 as Full-Time — keep at least 7 minimum if domain truly cannot fill all 10).
  - EXACTLY 5-7 items per category. JD's exact terms MUST come first in every line.
  - NO proficiency bars, ratings, percentages, or years-per-skill.

EXPERIENCE — C2C:
  - Experience 1 (most recent): EXACTLY 8 bullets. These are the STRONGEST 8 from all work done.
  - Experience 2: EXACTLY 6-8 bullets. Pick the 6-8 strongest.
  - Experience 3+: EXACTLY 5-6 bullets. Pick the 5-6 strongest.
  - Every bullet: exactly 2 lines / 25-35 words.
  - Include "environment" tech stack array for ALL roles (comma-separated, every tool used on that engagement).
  - C2C length is 3-4 pages — DO NOT compress or shorten.
  - Education: Degree, Major | University | City, State | Mon YYYY – Mon YYYY
  - Certifications: Certification | Issuer | Earned Mon YYYY

══════════════════════════════════════════════════════════════════
★★★ FULL-TIME RESUME RULES (ONLY IF Resume Type = Full-Time) ★★★
══════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY — FULL-TIME (PROSE PARAGRAPH, NOT BULLETS):
  ⚠️ CRITICAL: Summary MUST be PROSE — a flowing paragraph, NEVER a bulleted list.
  Direct-hire recruiters expect prose. Bullets read as a vendor/contract submission.

  Return summary as an array of exactly 5 strings — each string is ONE complete sentence.
  The template will join them with a space into one flowing paragraph on the page.

  REQUIRED 5-SENTENCE STRUCTURE (in this exact order):
    [1] [Job Title] with [N]+ years in [domain/environment], focused on [core JD function].
    [2] Strong hands-on depth in [primary JD tools], with [secondary JD capability].
    [3] [Strongest career accomplishment with a specific number — scale, %, volume, or time saved].
    [4] Experienced across [environments / team structures / business contexts from profile].
    [5] [Leadership scope, mentoring count, or stakeholder-facing work — only if in profile].

  HARD RULES FOR PROSE SUMMARY:
    ✗ NEVER open with "I" — always open with the Job Title.
    ✗ NEVER say "seeking a challenging role" — they know why you sent the resume.
    ✗ NEVER use adjectives: "detail-oriented", "results-driven", "passionate", "motivated".
    ✗ NEVER use bullet characters, dashes, or numbered list markers.
    ✗ DO NOT bold keywords in the summary — it is prose, not a bullet list.
    ✓ Weave JD keywords naturally into the prose.
    ✓ Third-person descriptive style (e.g., "Senior Engineer with 10 years...").

SKILLS MATRIX — FULL-TIME (10 CATEGORIES REQUIRED):
  - EXACTLY 10 categories. EXACTLY 5-7 items per category.
  - JD's exact terms MUST appear first in each category line.
  - Use THESE exact category names:
      1. Core Domain Skills
      2. Tools & Platforms
      3. Programming & Scripting
      4. Databases & Data Handling
      5. Cloud & Infrastructure
      6. Frameworks & Methodologies
      7. Testing & Quality
      8. Reporting & Visualization
      9. Collaboration & Workflow
      10. Operating Systems & Environments
  - NO proficiency bars, ratings, percentages, or years-per-skill.

EXPERIENCE — FULL-TIME (OFFICIAL BULLET COUNTS FROM TEMPLATE):
  - Experience 1 (most recent): 5-6 bullets — these are the STRONGEST 5-6 from all work done on that role.
  - Experience 2: 4-5 bullets — the strongest 4-5 from that role.
  - Experience 3+: 3-4 bullets — the strongest 3-4 from that role.
  - Every bullet: EXACTLY 2 lines / 24-32 words. NOT one line, NOT three.
  - Anatomy: [ACTION VERB] + [what you did] + [tool/method] + [scope/scale] + [outcome with number].
  - One accomplishment per bullet — two "and"s means it is two bullets.
  - Name the exact tool: "rebuilt the intake workflow in ServiceNow" not "improved the process".
  - DO NOT include an "environment" array for Full-Time roles (that is C2C format only).
  - Full-Time length: 1 page under ~8 years, 2 pages beyond. DO NOT pad to reach two pages.
  - Education: Degree, Major | University | City, State | Mon YYYY – Mon YYYY
  - Certifications: Certification | Issuer | Earned Mon YYYY

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
