import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { ATSScoringEngine } from '@/lib/ats/ATSScoringEngine';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const resumeId = body.resumeId;
    const parsedJdData = body.parsedJdData;
    const resumeContent = body.resumeContent || body.generatedResume;
    if (!resumeId || !parsedJdData || !resumeContent) return NextResponse.json({ error: 'Missing payload data' }, { status: 400 });

    // Initialize the new deterministic ATS engine
    const engine = new ATSScoringEngine();
    
    // Evaluate resume against JD
    const matchResult = engine.evaluate(parsedJdData, resumeContent);

    // Prepare legacy compatible format for DB if needed, but ideally we save the whole result
    const missingKw = [...matchResult.missingRequiredRequirements, ...matchResult.missingPreferredRequirements];

    // Save to ATS DB
    await supabase.from('ats_analyses').insert({
      resume_id: resumeId,
      overall_score: matchResult.overallScore,
      category_scores: {
        keywordMatch: matchResult.breakdown.requiredSkills,
        formatting: matchResult.breakdown.formatting,
        readability: matchResult.jobMatch.score, // mapped for legacy
        grammar: 100, // mapped for legacy
        skillsCoverage: matchResult.breakdown.preferredSkills,
        experienceRelevance: matchResult.breakdown.experience,
      },
      missing_keywords: missingKw,
      improvement_suggestions: matchResult.evidence
    });

    return NextResponse.json({ success: true, analysis: matchResult });

  } catch (error: any) {
    console.error('ATS Analysis Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
