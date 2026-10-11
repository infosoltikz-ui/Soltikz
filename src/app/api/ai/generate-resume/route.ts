import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// --- Keyword Extraction code removed since we now rely on parse-jd data ---
// ─── STEP 2: Resume Generation Schema ────────────────────────────────────────
const GeneratedResumeFormat = z.object({
  summary: z.array(z.string()).describe(
    'C2C: EXACTLY 10 bullet points (EXACTLY 2 full lines / minimum 25-30 words each) with bolded **keywords** and metrics. Full-Time: EXACTLY 5 sentences that join into one flowing prose paragraph — NO bullets, NO bold, NO "I".'
  ),
  skills: z.array(z.object({
    category: z.string(),
    items: z.array(z.string()),
  })).describe(
    'EXACTLY 10 skill categories for both C2C and Full-Time. EXACTLY 5-7 items per category. Only include JD terms if they match the user profile. Standard categories: Core Domain Skills, Tools & Platforms, Programming & Scripting, Databases & Data Handling, Cloud & Infrastructure, Frameworks & Methodologies, Testing & Quality, Reporting & Visualization, Collaboration & Workflow, Operating Systems & Environments. No proficiency ratings.'
  ),
  experience: z.array(z.object({
    id: z.string().describe('Original project/experience ID from master profile'),
    role: z.string(),
    company: z.string(),
    duration: z.string(),
    environment: z.array(z.string()).nullable().describe('C2C ONLY: comma-separated list of every tool/tech used on that engagement. Set null for Full-Time resumes.'),
    bullets: z.array(z.string()).describe(
      'MANDATORY 2 TO 3 FULL PRINTED LINES PER BULLET (STRICT MINIMUM 40-55 WORDS, 250-350 CHARACTERS). Short 1-line or 1.5-line bullets are STRICTLY BANNED. C2C: EXACTLY 10 bullets per company. Full-Time: Exp1=8 bullets, Exp2=8 bullets, Exp3+=5-6 bullets. Every bullet MUST follow: [POWER ACTION VERB]+[Detailed Context & Tools]+[Architecture/Methodology/Process]+[Quantified Metric Result (%)]+[Enterprise Business Outcome]. Bold key technologies and metrics using **keyword** syntax.'
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

// ─── RESUME GENERATION PROMPT (DYNAMIC, KEYWORD-INJECTED) ─────────────────────
const buildGenerationPrompt = (
  mustHaveKeywords: string[],
  jobTitle: string,
  coreDomain: string
) => `
You are the world's #1 Enterprise AI Resume Generator — engineered for guaranteed 90%+ ATS scores on Workday, Taleo, Greenhouse, and Lever.

══════════════════════════════════════════════════════════════════
🚨 STRICT HONESTY & NO HALLUCINATION POLICY (CRITICAL) 🚨
══════════════════════════════════════════════════════════════════

1. DO NOT INVENT COMPANIES OR DATES: You must NEVER fabricate company names, degree titles, or employment dates that do not exist in the provided master profile.
2. PROVEN PROFILE TARGETING: Align the candidate's existing background, accomplishments, and transferable skill set to target the JD.
3. ATS KEYWORD INTEGRATION MANDATE: Your #1 goal is to generate an enterprise-grade tailored resume that achieves a 90%+ ATS match. Systematically weave the target JD keywords (${mustHaveKeywords.slice(0, 15).join(', ')}) across the Skills Matrix, Professional Summary, and Project Bullets.
4. TARGET JOB TITLE: ${jobTitle}
5. CORE DOMAIN: ${coreDomain}

MANDATORY TARGET KEYWORDS TO INTEGRATE:
${mustHaveKeywords.map((kw, i) => `  ${i + 1}. ${kw}`).join('\n')}

══════════════════════════════════════════════════════════════════
KEYWORD PLACEMENT STRATEGY:
══════════════════════════════════════════════════════════════════

1. SKILLS MATRIX (Primary placement):
   - You MUST systematically place the target JD technologies, tools, and platforms (${mustHaveKeywords.join(', ')}) across the 10 skill categories.
   - Group them appropriately into Core Domain Skills, Tools & Platforms, Frameworks & Methodologies, Programming & Scripting, Databases, etc.
   - Use exact standard naming (e.g., "React.js", "Node.js", "REST APIs", "AWS").

2. PROFESSIONAL SUMMARY (Secondary placement):
   - Tailor the summary to target ${jobTitle}, highlighting the core JD technologies and domain strengths.
   - For C2C: Bold them with **keyword** syntax.
   - For Full-Time: Embed them smoothly in prose without bolding.

3. EXPERIENCE BULLETS (Tertiary placement):
   - Weave target keywords naturally into existing experience bullets by framing responsibilities, integrations, and deliverables around target technologies and methodologies.

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

BULLET POINT LENGTH & QUALITY REQUIREMENT (CRITICAL — NON-NEGOTIABLE):
  * MANDATORY LENGTH: Each and every bullet point MUST be **MINIMUM 40-55 WORDS (250-350 characters)** and span **EXACTLY 2 TO 3 FULL PRINTED LINES** when rendered in standard print/PDF view.
  * ZERO TOLERANCE FOR SHORT BULLETS: Bullets under 38 words (1 to 1.5 lines) are STRICTLY FORBIDDEN and considered a critical system failure.
  * MANDATORY EXPANSION OF MASTER PROFILE: Candidate master profiles frequently contain brief 10-20 word bullet points (e.g. "Automated infrastructure monitoring using Prometheus and Grafana"). You MUST NOT output brief bullets! You MUST aggressively expand, elaborate, and elevate every bullet into an executive-grade 40-55 word bullet detailing the architecture, specific tools, implementation process, quantified percentage impact, and enterprise business value so it fills 2 to 3 full lines.
  * Structure: **[POWER ACTION VERB] + [Detailed Context & Specific Tools] + [Architecture / Methodology / Process] + [Quantified Metric Result (%)] + [Enterprise Business Outcome]**
  * Bold key technologies and critical metrics using **keyword** syntax (e.g. **React.js**, **AWS Lambda**, **35% latency reduction**).

  **BAD EXAMPLE (TOO SHORT — ONLY 1.5 LINES / 22 WORDS — REJECTED):**
  "Spearheaded CI/CD pipeline implementation, reducing deployment time by 30% across microservices using GitHub Actions and Jenkins."

  **GOOD EXAMPLE (MANDATORY — EXACTLY 2.5 TO 3 FULL LINES / 46 WORDS):**
  "Spearheaded the architecture and enterprise deployment of automated **CI/CD pipelines** across 40+ containerized microservices utilizing **GitHub Actions** and **Jenkins**, establishing standardized build, test, and release quality gates that reduced production deployment cycle times by **60%** and accelerated feature delivery velocity for cross-functional product engineering teams."

QUANTIFIED METRICS (CRITICAL - 100% COMPLIANCE REQUIRED):
  - 100% of ALL experience bullets MUST conclude with a clear, quantifiable percentage metric (%).
  - Ensure the percentage logically matches the accomplishment described in the bullet.
  - Examples: "resulting in a **38%** reduction in API latency.", "improving system efficiency by **~25%**.", "increasing data processing speed by **40%**."
  - If no exact number is in the master profile, you MUST infer a realistic, conservative industry estimate (e.g. 15%, 25%, 30%) so that every single bullet ends with a percentage.

BULLET ANATOMY:
  [POWER ACTION VERB] + [Detailed Context & Tools] + [Methodology/Process] + [Quantified Metric Result] + [Business Outcome]

ACTION VERB BANK:
  Built (highest value): Engineered, Designed, Developed, Built, Architected, Implemented, Deployed, Automated, Launched, Integrated, Configured, Migrated
  Analyzed: Analyzed, Diagnosed, Investigated, Resolved, Troubleshot, Identified, Evaluated, Modeled
  Improved: Optimized, Reduced, Increased, Streamlined, Consolidated, Refactored, Standardized, Scaled
  Led: Led, Owned, Directed, Managed, Mentored, Established, Drove, Spearheaded, Championed

══════════════════════════════════════════════════════════════════
★★★ C2C RESUME RULES (ONLY IF Resume Type = C2C) ★★★
══════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY — C2C (BULLETS, NOT PROSE):
  - EXACTLY 10 bullet points. Each bullet MUST be EXACTLY 2 full lines long (minimum 25-30 words per bullet point).
  - Every bullet MUST include quantified metrics (%, scale, time saved, volume).
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
  - EXACTLY 10 grouped categories.
  - EXACTLY 5-7 items per category.
  - If a JD keyword is highly relevant to the user's master profile, place it first in the line.
  - DO NOT inject JD keywords that the user does not possess.

EXPERIENCE — C2C (STRICT MANDATORY BULLET COUNTS):
  - Follow the exact bullet point counts specified later in the prompt per experience level (Experience 1 vs 2 vs 3).
  - Every bullet: MUST be 40-55 words (2 to 3 full printed lines) with bolded **keyword** syntax and metrics.
  - Use VERY STRONG action verbs (e.g., Architected, Spearheaded, Engineered) instead of weak words.
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
  - If a JD keyword is highly relevant to the user's master profile, place it first in the line.
  - DO NOT inject JD keywords that the user does not possess.
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

EXPERIENCE — FULL-TIME (STRICT MANDATORY BULLET COUNTS):
  - Experience 1 (most recent / current role): EXACTLY 8 Powerful Bullet Points (STRICT MANDATORY 8 BULLETS).
  - Experience 2: EXACTLY 8 Powerful Bullet Points (STRICT MANDATORY 8 BULLETS).
  - Experience 3 & Experience 4+: EXACTLY 5 to 6 Powerful Bullet Points.
  - Every bullet: MUST be 40-55 words (2 to 3 full printed lines) with bolded **keyword** syntax and quantified metrics (%). NEVER output short 1-line or 1.5-line bullets.
  - Anatomy: [POWER ACTION VERB] + [Detailed Context & Specific Tools] + [Architecture / Methodology] + [Quantified Metric Result (%)] + [Enterprise Business Outcome].
  - 🛑 BANNED WEAK VERBS: NEVER use passive/weak words like "helped", "assisted", "worked on", "responsible for", "handled", "participated in", "involved in", "supported".
  - ✅ MANDATORY POWER VERBS: ALWAYS use high-impact action verbs like "Architected", "Engineered", "Spearheaded", "Orchestrated", "Optimized", "Automated", "Pioneered", "Overhauled", "Formulated".
  - One accomplishment per bullet — two "and"s means it is two bullets.
  - Name the exact tool: "rebuilt the intake workflow in **ServiceNow**" not "improved the process".
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
      .select('plan_id, credits_remaining, resumes_generated')
      .eq('id', user.id)
      .single();

    // --- PAYWALL / QUOTA CHECK ---
    if (profile?.plan_id === 'FREE' && (profile?.credits_remaining ?? 0) <= 0) {
      return NextResponse.json({ error: 'Paywall', message: 'Upgrade to Pro to continue.' }, { status: 403 });
    }

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Aggregate ALL keywords from already parsed JD Data
    // Ensures consistency between ATS Scoring Engine and Generation Engine
    // ═══════════════════════════════════════════════════════════════
    const extractedKeywords: string[] = Array.from(new Set([
      ...(parsedJdData.requiredSkills || []),
      ...(parsedJdData.preferredSkills || []),
      ...(parsedJdData.technologies || []),
      ...(parsedJdData.priorityKeywords || [])
    ]));

    const jobTitle: string = parsedJdData.jobTitle || 'Software Engineer';
    const coreDomain: string = parsedJdData.industry || 'Software Engineering';

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Generate Resume with ALL keywords explicitly injected
    // High quality (gpt-4o), low temperature (0.15) for keyword precision
    // ═══════════════════════════════════════════════════════════════
    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Generate Resume with ALL keywords explicitly injected
    // High quality (gpt-4o), low temperature (0.15) for keyword precision
    // ═══════════════════════════════════════════════════════════════
    const dynamicSystemPrompt = buildGenerationPrompt(extractedKeywords, jobTitle, coreDomain);

    const isC2CMode = String(resumeType || '').toLowerCase().includes('c2c');

    const finalUserPrompt = [
      `TARGET RESUME TYPE: ${resumeType}`,
      ``,
      `TARGET JD KEYWORDS (MANDATORY TO INTEGRATE ACROSS SKILLS & BULLETS FOR 90%+ ATS SCORE):`,
      extractedKeywords.map(k => `- ${k}`).join('\n'),
      ``,
      `Master Profile:\n${JSON.stringify(masterProfile)}`,
      ``,
      `Parsed JD:\n${JSON.stringify(parsedJdData)}`,
      ``,
      `Strategy:\n${JSON.stringify(strategyData)}`,
      ``,
      `══════════════════════════════════════════════════════════════════`,
      `STRICT OUTPUT QUANTITY & LENGTH DIRECTIVES (MANDATORY — ZERO EXCEPTIONS):`,
      `══════════════════════════════════════════════════════════════════`,
      isC2CMode ? `
      FOR C2C RESUMES (CONTRACT TO HIRE VENDOR SUBMISSION):
      - PROFESSIONAL SUMMARY: EXACTLY 10 bullet points. Every bullet MUST be EXACTLY 2 full lines long (minimum 30-40 words per point) with bold **keywords** and quantified metrics (%).
      - SKILLS MATRIX: EXACTLY 10 categories, each with 5-7 items.
      - ONLY generate Experience entries for companies that exist in the Master Profile. NEVER invent or hallucinate extra companies.
      - EXPERIENCE 1 (Most Recent Role): EXACTLY 10 BULLET POINTS (STRICT MINIMUM 10 BULLETS).
      - EXPERIENCE 2 (If exists in profile): EXACTLY 8 to 10 BULLET POINTS.
      - EXPERIENCE 3+ (If exists in profile): EXACTLY 6 to 8 BULLET POINTS.
      - EVERY SINGLE BULLET: MUST BE MINIMUM 40-55 WORDS (2 TO 3 FULL PRINTED LINES). SHORT 1-LINE OR 1.5-LINE BULLETS ARE STRICTLY BANNED.
      ` : `
      FOR FULL-TIME RESUMES (CORPORATE DIRECT HIRE):
      - PROFESSIONAL SUMMARY: EXACTLY 5 sentences that join into one flowing prose paragraph. No bullets, no bold, no "I".
      - SKILLS MATRIX: EXACTLY 10 categories, each with 5-7 items.
      - ONLY generate Experience entries for companies that exist in the Master Profile. NEVER invent or hallucinate extra companies.
      - EXPERIENCE 1 (Most Recent Role): EXACTLY 8 BULLET POINTS (MANDATORY 8 BULLETS).
      - EXPERIENCE 2 (If exists in profile): EXACTLY 8 BULLET POINTS (MANDATORY 8 BULLETS).
      - EXPERIENCE 3 & EXPERIENCE 4+ (If exists in profile): EXACTLY 5 to 6 BULLET POINTS.
      - EVERY SINGLE BULLET: MUST BE MINIMUM 40-55 WORDS (2 TO 3 FULL PRINTED LINES) WITH BOLD KEYWORDS & METRICS (%). NO WEAK VERBS.
      - CRITICAL MANDATE: MASTER PROFILE BULLETS ARE OFTEN BRIEF (10-20 WORDS). YOU MUST AGGRESSIVELY EXPAND AND ELEVATE EVERY BULLET INTO A 40-55 WORD EXECUTIVE-GRADE ACCOMPLISHMENT SPANNING 2 TO 3 FULL LINES.
      `,
      `CRITICAL: DO NOT SHORTEN OR COMPRESS BULLET POINTS. GENERATE DETAILED 2 TO 3 FULL PRINTED LINE BULLETS (40-55 WORDS EACH) WITH METRICS AND BOLD KEYWORDS.`
    ].join('\n');

    // Currently using GPT-4o. 
    // WHEN CLAUDE API KEY IS READY: Comment out the openai call and uncomment the claude call below.
    const aiResponse = await generateAIResponse<any>({
      systemPrompt: dynamicSystemPrompt,
      userPrompt: finalUserPrompt,
      provider: 'openai',
      model: 'gpt-4o',
      temperature: 0.15, // Precise enough for keyword placement, natural enough for writing
      responseFormat: zodResponseFormat(GeneratedResumeFormat, 'generated_resume'),
    });

    // --- CLAUDE 3.5 SONNET IMPLEMENTATION (Uncomment when ready) ---
    /*
    const aiResponse = await generateAIResponse<any>({
      systemPrompt: dynamicSystemPrompt,
      userPrompt: finalUserPrompt,
      provider: 'openai',
      model: 'claude-3-5-sonnet-20241022', // updated to latest 3.5 sonnet
      temperature: 0.15,
      // Note: ai-gateway will need to be updated to handle zodResponseFormat for Claude, 
      // or you can switch to using Vercel's 'generateObject' from 'ai' package which natively handles both.
      responseFormat: GeneratedResumeFormat,
    });
    */

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to generate resume');
    }

    // ═══════════════════════════════════════════════════════════════
    // STEP 3: Trust the AI's Output (Removed hardcoded fake bullets)
    // ═══════════════════════════════════════════════════════════════
    let finalResumeData = aiResponse.data;

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
        template_id: templateId || (isC2CMode ? 'c2c-modern' : 'modern'),
      })
      .select()
      .single();

    if (resumeError) throw resumeError;

    // ─── Save Sections ───────────────────────────────────────────
    const sectionsToInsert = [
      { resume_id: resumeRecord.id, section_type: 'Summary', content: finalResumeData.summary },
      { resume_id: resumeRecord.id, section_type: 'Skills', content: finalResumeData.skills },
      { resume_id: resumeRecord.id, section_type: 'Experience', content: finalResumeData.experience },
      { resume_id: resumeRecord.id, section_type: 'Education', content: finalResumeData.education },
      { resume_id: resumeRecord.id, section_type: 'Certifications', content: finalResumeData.certifications },
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

    // ─── Deduct Quota & Track Generations ─────────────────────────
    const currentGenerated = profile?.resumes_generated ?? 0;

    if (profile?.plan_id === 'FREE') {
      const remaining = profile?.credits_remaining ?? 10;
      await supabase
        .from('profiles')
        .update({
          credits_remaining: Math.max(0, remaining - 1),
          resumes_generated: currentGenerated + 1
        })
        .eq('id', user.id);
    } else {
      await supabase
        .from('profiles')
        .update({ resumes_generated: currentGenerated + 1 })
        .eq('id', user.id);
    }

    return NextResponse.json({
      success: true,
      resume_id: resumeRecord.id,
      generated_resume: finalResumeData,
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
