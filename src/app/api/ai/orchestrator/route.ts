import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * AI Orchestrator Layer
 * This acts as the single entry point for the frontend to kick off generation.
 * It manages the pipeline: JD Parser -> Strategy -> Resume Generator -> ATS -> Interview Prep.
 * 
 * Note: In a true production environment, this should be offloaded to a background queue
 * (e.g., Inngest or Upstash) to prevent Vercel 10-second timeout limits on hobby plans.
 * For now, this handles the sequential orchestration.
 */
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Verify User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { masterProfile, jobDescription, companyName, jobRole, resumeType, resumeTitle } = await req.json();

    if (!masterProfile || !jobDescription || !resumeType) {
      return NextResponse.json({ error: 'Missing core data' }, { status: 400 });
    }

    // --- PAYWALL / QUOTA CHECK ---
    const { data: profile } = await supabase.from('profiles').select('plan_id, credits_remaining').eq('id', user.id).single();
    
    if (profile?.plan_id === 'FREE' && (profile?.credits_remaining || 0) <= 0) {
      return NextResponse.json({ 
        error: 'Paywall', 
        message: 'You have used all 5 of your free AI generation credits. Please upgrade to Pro to continue generating unlimited resumes.' 
      }, { status: 403 });
    }
    // -----------------------------

    // Determine the base URL for internal fetch calls
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const reqHeaders = { 'Content-Type': 'application/json', 'cookie': req.headers.get('cookie') || '' };

    console.log('[Orchestrator] Starting Pipeline...');

    // STEP 1: Parse JD
    console.log('[Orchestrator] 1/5 Parsing Job Description...');
    const parseJdRes = await fetch(`${baseUrl}/api/ai/parse-jd`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({ jobDescription })
    });
    const parsedJd = await parseJdRes.json();
    if (!parsedJd.success) throw new Error(parsedJd.error);

    // STEP 2: Generate Strategy
    console.log('[Orchestrator] 2/5 Generating Strategy...');
    const strategyRes = await fetch(`${baseUrl}/api/ai/generate-strategy`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({
        masterProfile,
        parsedJdData: parsedJd.parsed_data,
        parsedJdId: parsedJd.parsed_jd_id
      })
    });
    const strategy = await strategyRes.json();
    if (!strategy.success) throw new Error(strategy.error);

    // STEP 3: Generate Resume
    console.log('[Orchestrator] 3/5 Generating Resume...');
    const resumeRes = await fetch(`${baseUrl}/api/ai/generate-resume`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({
        masterProfile,
        parsedJdData: parsedJd.parsed_data,
        strategyData: strategy.strategy_data,
        resumeType,
        parsedJdId: parsedJd.parsed_jd_id,
        strategyId: strategy.strategy_id,
        title: resumeTitle || `${jobRole} @ ${companyName}`
      })
    });
    const resume = await resumeRes.json();
    if (!resume.success) throw new Error(resume.error);

    // STEP 4: ATS Analysis
    console.log('[Orchestrator] 4/5 Analyzing ATS...');
    const atsRes = await fetch(`${baseUrl}/api/ai/analyze-ats`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({
        resumeId: resume.resume_id,
        parsedJdData: parsedJd.parsed_data,
        resumeContent: resume.generated_resume
      })
    });
    // We don't strictly fail the whole pipeline if ATS fails, just log it.
    if (!atsRes.ok) console.warn('[Orchestrator] ATS Analysis failed, but continuing.');

    // STEP 5: Interview Prep
    console.log('[Orchestrator] 5/5 Generating Interview Prep...');
    const prepRes = await fetch(`${baseUrl}/api/ai/generate-prep`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify({
        resumeId: resume.resume_id,
        parsedJdData: parsedJd.parsed_data,
        resumeContent: resume.generated_resume
      })
    });
    if (!prepRes.ok) console.warn('[Orchestrator] Interview Prep failed, but continuing.');

    // Update Resume Status to Ready
    await supabase.from('resumes_v2').update({ status: 'Ready' }).eq('id', resume.resume_id);

    // --- DEDUCT QUOTA ---
    if (profile?.plan_id === 'FREE') {
      await supabase.rpc('decrement_credits', { user_id: user.id });
      // Note: If you don't have the RPC, we can do a standard update:
      // await supabase.from('profiles').update({ credits_remaining: (profile.credits_remaining - 1) }).eq('id', user.id);
      await supabase.from('profiles').update({ credits_remaining: (profile.credits_remaining - 1) }).eq('id', user.id);
    }
    // --------------------

    console.log('[Orchestrator] Pipeline Complete!');

    return NextResponse.json({
      success: true,
      resume_id: resume.resume_id,
      message: 'Pipeline completed successfully'
    });

  } catch (error: any) {
    console.error('[Orchestrator] Pipeline Failed:', error);
    return NextResponse.json({ error: error.message || 'Orchestrator failed' }, { status: 500 });
  }
}
