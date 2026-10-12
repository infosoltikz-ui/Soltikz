import { NextResponse } from 'next/server';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/utils/supabase/server';
import { isPremiumPlan, FREE_TIER_CREDITS } from '@/utils/pricingPlans';

// ─── RESUME GENERATION SCHEMA FOR CLAUDE ─────────────────────────────────────
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

// JSON Schema definition for Claude Tool Use (Guarantees 100% structured output with Claude 3.5 Sonnet)
const CLAUDE_RESUME_TOOL_SCHEMA: Anthropic.Tool = {
  name: 'generate_resume',
  description: 'Generate the structured ATS resume output matching the candidate profile and target job description.',
  input_schema: {
    type: 'object',
    properties: {
      summary: {
        type: 'array',
        items: { type: 'string' },
        description: 'C2C: Exactly 10 bullets with bold keywords. Full-Time: Exactly 5 flowing sentences joined into a single paragraph without bullets.',
      },
      skills: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            items: { type: 'array', items: { type: 'string' } },
          },
          required: ['category', 'items'],
        },
        description: 'Exactly 10 categories with 5-7 items per category.',
      },
      experience: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            role: { type: 'string' },
            company: { type: 'string' },
            duration: { type: 'string' },
            environment: {
              type: ['array', 'null'],
              items: { type: 'string' },
              description: 'List of tools for C2C, or null for Full-Time',
            },
            bullets: {
              type: 'array',
              items: { type: 'string' },
              description: 'High-impact 40-55 word bullets with bold keywords and quantified metrics (%).',
            },
          },
          required: ['id', 'role', 'company', 'duration', 'bullets'],
        },
      },
      education: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            degree: { type: 'string' },
            institution: { type: 'string' },
            location: { type: 'string' },
            year: { type: 'string' },
          },
          required: ['degree', 'institution', 'location', 'year'],
        },
      },
      certifications: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            issuer: { type: 'string' },
            year: { type: 'string' },
          },
          required: ['name', 'issuer', 'year'],
        },
      },
    },
    required: ['summary', 'skills', 'experience', 'education', 'certifications'],
  },
};

// ─── RESUME GENERATION PROMPT (DYNAMIC, KEYWORD-INJECTED FOR CLAUDE) ─────────
const buildGenerationPrompt = (
  mustHaveKeywords: string[],
  jobTitle: string,
  coreDomain: string
) => `
You are the world's #1 Enterprise AI Resume Generator — powered by Anthropic Claude 3.5 Sonnet, engineered for guaranteed 90%+ ATS scores on Workday, Taleo, Greenhouse, and Lever.

══════════════════════════════════════════════════════════════════
🚨 STRICT HONESTY & REALISTIC TAILORING POLICY (CRITICAL) 🚨
══════════════════════════════════════════════════════════════════

1. DO NOT INVENT COMPANIES OR DATES: You must NEVER fabricate company names, degree titles, or employment dates that do not exist in the provided master profile.
2. DOMAIN-AWARE TAILORING:
   - For Related / Adjacent Technical Roles (e.g. DevOps ↔ Cloud, SRE, Platform, Full Stack, Software Engineering):
     Systematically weave target technologies (${mustHaveKeywords.slice(0, 15).join(', ')}) across Skills, Summary, and Project context where transferable foundation exists.
   - For Completely Unrelated / Opposite Domains (e.g. Software/DevOps ↔ HR Manager, Nursing, Finance, Legal):
     NEVER claim the candidate held an entirely fictional profession (e.g. do NOT say an engineer has "8+ years in HR" or "specialized in labor law compliance"). Instead, position the candidate through genuine transferable leadership, process optimization, technical onboarding, cross-functional mentorship, and operational delivery while preserving their authentic career foundation.
3. TARGET JOB TITLE: ${jobTitle}
4. CORE DOMAIN: ${coreDomain}

MANDATORY TARGET KEYWORDS TO INTEGRATE:
${mustHaveKeywords.map((kw, i) => `  ${i + 1}. ${kw}`).join('\n')}

══════════════════════════════════════════════════════════════════
KEYWORD PLACEMENT STRATEGY:
══════════════════════════════════════════════════════════════════

1. SKILLS MATRIX (Primary placement):
   - Place target JD tools and technologies across the 10 skill categories.
   - For related domains: Group relevant target tools into Core Domain Skills, Tools & Platforms, Frameworks & Methodologies, Programming & Scripting, Databases, etc.
   - For divergent domains: Retain the candidate's authentic technical skills and bridge transferable operational competencies (e.g., Team Leadership, Process Improvement, Onboarding, Cross-Functional Collaboration) without inventing false regulatory credentials.
   - Use exact standard naming (e.g., "React.js", "Node.js", "REST APIs", "AWS").

2. PROFESSIONAL SUMMARY (Secondary placement):
   - Tailor the summary to target ${jobTitle}, highlighting core overlapping capabilities and domain strengths.
   - If candidate's background is technically oriented, frame the summary as an experienced professional transitioning or bringing technical rigor to the target role.
   - For C2C: Bold keywords with **keyword** syntax.
   - For Full-Time: Embed them smoothly in flowing prose without bolding.

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

MANDATORY 10 SKILL CATEGORIES:
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
`;

// ─── MAIN POST HANDLER (SEPARATE CLAUDE API ROUTE) ───────────────────────────
// This route is 100% dedicated to Claude 3.5 Sonnet.
// It DOES NOT touch or interfere with the OpenAI route at /api/ai/generate-resume.
export async function POST(req: Request) {
  const startTime = Date.now();
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

    if (!isPremiumPlan(profile?.plan_id) && (profile?.credits_remaining ?? 0) <= 0) {
      return NextResponse.json({ error: 'Paywall', message: 'Upgrade to Pro to continue.' }, { status: 403 });
    }

    // --- ANTHROPIC CLAUDE CLIENT INITIALIZATION ---
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'Missing Anthropic API Key', 
          message: 'Please add ANTHROPIC_API_KEY to your .env.local file to use Claude 3.5 Sonnet.' 
        }, 
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Aggregate keywords
    const extractedKeywords: string[] = Array.from(new Set([
      ...(parsedJdData.requiredSkills || []),
      ...(parsedJdData.preferredSkills || []),
      ...(parsedJdData.technologies || []),
      ...(parsedJdData.priorityKeywords || [])
    ]));

    const jobTitle: string = parsedJdData.jobTitle || 'Software Engineer';
    const coreDomain: string = parsedJdData.industry || 'Software Engineering';

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
      `CRITICAL: DO NOT SHORTEN OR COMPRESS BULLET POINTS. GENERATE DETAILED 2 TO 3 FULL PRINTED LINE BULLETS (40-55 WORDS EACH) WITH METRICS AND BOLD KEYWORDS. CALL THE generate_resume TOOL WITH YOUR FINAL STRUCTURED DATA.`
    ].join('\n');

    // ─── ANTHROPIC CLAUDE SONNET TOOL CALL ─────────────────────────────────
    const CANDIDATE_MODELS = [
      'claude-sonnet-4-6',
      'claude-3-5-sonnet-20241022',
      'claude-3-7-sonnet-20250219',
      'claude-sonnet-5'
    ];

    let claudeMessage: any = null;
    let selectedModel = 'claude-sonnet-4-6';
    let lastError: any = null;

    for (const modelCandidate of CANDIDATE_MODELS) {
      try {
        claudeMessage = await anthropic.messages.create({
          model: modelCandidate,
          max_tokens: 8192,
          temperature: 0.15,
          system: dynamicSystemPrompt,
          messages: [{ role: 'user', content: finalUserPrompt }],
          tools: [CLAUDE_RESUME_TOOL_SCHEMA],
          tool_choice: { type: 'tool', name: 'generate_resume' },
        });
        selectedModel = modelCandidate;
        break;
      } catch (err: any) {
        lastError = err;
        if (err.status === 404) {
          console.warn(`Claude model ${modelCandidate} returned 404, attempting fallback...`);
          continue;
        }
        throw err;
      }
    }

    if (!claudeMessage) {
      throw lastError || new Error('Failed to generate resume with available Claude models.');
    }

    // Extract tool call output
    const toolUseBlock = claudeMessage.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use' && block.name === 'generate_resume'
    );

    let finalResumeData: any = null;

    if (toolUseBlock && toolUseBlock.input) {
      finalResumeData = toolUseBlock.input;
    } else {
      const textBlock = claudeMessage.content.find((block) => block.type === 'text');
      if (textBlock && 'text' in textBlock) {
        const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          finalResumeData = JSON.parse(jsonMatch[0]);
        }
      }
    }

    if (!finalResumeData) {
      throw new Error('Claude 3.5 Sonnet did not return the expected structured resume format.');
    }

    // Validate with Zod
    const validatedData = GeneratedResumeFormat.safeParse(finalResumeData);
    if (!validatedData.success) {
      console.warn('Claude schema warning, continuing with parsed data:', validatedData.error.issues);
    }

    const durationMs = Date.now() - startTime;
    const inputTokens = claudeMessage.usage.input_tokens;
    const outputTokens = claudeMessage.usage.output_tokens;

    // ─── Save Resume Record to Supabase ───────────────────────────
    const { data: resumeRecord, error: resumeError } = await supabase
      .from('resumes_v2')
      .insert({
        user_id: user.id,
        parsed_jd_id: parsedJdId,
        strategy_id: strategyId,
        resume_type: resumeType,
        title: title || `${resumeType} Resume - ${parsedJdData.companyName || 'Draft'} (Claude)`,
        status: 'Ready',
        template_id: templateId || (isC2CMode ? 'c2c-modern' : 'modern'),
      })
      .select()
      .single();

    if (resumeError) throw resumeError;

    // ─── Save Resume Sections ─────────────────────────────────────
    const sectionsToInsert = [
      { resume_id: resumeRecord.id, section_type: 'Summary', content: finalResumeData.summary },
      { resume_id: resumeRecord.id, section_type: 'Skills', content: finalResumeData.skills },
      { resume_id: resumeRecord.id, section_type: 'Experience', content: finalResumeData.experience },
      { resume_id: resumeRecord.id, section_type: 'Education', content: finalResumeData.education },
      { resume_id: resumeRecord.id, section_type: 'Certifications', content: finalResumeData.certifications },
    ];

    const { error: sectionsError } = await supabase.from('resume_sections').insert(sectionsToInsert);
    if (sectionsError) throw sectionsError;

    // ─── Log Telemetry (Provider: claude) ─────────────────────────
    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      resume_id: resumeRecord.id,
      action_type: 'Generate Resume',
      provider: 'claude',
      model: selectedModel,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      duration_ms: durationMs,
      status: 'success',
    });

    await supabase.from('usage_events').insert({
      user_id: user.id,
      resume_id: resumeRecord.id,
      event_type: 'resume_generated_claude',
    });

    // ─── Deduct Quota ─────────────────────────────────────────────
    const currentGenerated = profile?.resumes_generated ?? 0;
    if (!isPremiumPlan(profile?.plan_id)) {
      const remaining = profile?.credits_remaining ?? FREE_TIER_CREDITS;
      await supabase
        .from('profiles')
        .update({
          credits_remaining: Math.max(0, remaining - 1),
          resumes_generated: currentGenerated + 1,
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
      provider: 'claude',
      model: selectedModel,
      resume_id: resumeRecord.id,
      generated_resume: finalResumeData,
      keyword_stats: {
        total_keywords_extracted: extractedKeywords.length,
        keywords: extractedKeywords,
      },
    });

  } catch (error: any) {
    console.error('Claude Resume Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
