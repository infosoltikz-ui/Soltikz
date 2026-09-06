import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

const RegeneratedSummaryFormat = z.object({
  summary: z.array(z.string()).describe("Bullet points for the Professional Summary. Must match the exact requested count."),
});

const SYSTEM_PROMPT = `
You are the ultimate AI Resume Generator and ATS Expert.
You are tasked with regenerating the Professional Summary section of a resume.

You will receive:
1. The User's Master Profile (raw data)
2. The Parsed Job Description
3. The Resume Strategy
4. The Resume Type (C2C or Full-Time)
5. The First Bullet Point (provided by the user)

CRITICAL RULES YOU MUST OBEY:
1. You MUST use the user's provided "First Bullet Point" EXACTLY as the very first point in your generated array. Do not alter it.
2. You will generate the remaining points based on the style, tone, and content of that first bullet point, aligning with the Job Description.
3. Every bullet must follow this format: "Action Verb + Task + Tool/Method + Result (where possible)". Do NOT start with "Responsible for".
4. At least 40-50% of bullets MUST carry a quantified result. NEVER fabricate numbers.
5. Content MUST be front-loaded. Every single bullet point must be strictly concise to fit within 2 lines.

RESUME TYPE RULES:
If C2C:
- The returned summary MUST have EXACTLY 9 bullet points in total (including the user's first point). So you will generate 8 additional points.

If Full-Time:
- The returned summary MUST have EXACTLY 5 bullet points in total (including the user's first point). So you will generate 4 additional points.

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

    const { masterProfile, resumeType, firstPoint, resumeId } = await req.json();

    if (!masterProfile || !resumeType || !firstPoint || !resumeId) {
      return NextResponse.json({ error: 'Missing required payload data' }, { status: 400 });
    }

    // Fetch the resume to get the parsed_jd_id and strategy_id
    const { data: resumeRecord } = await supabase
      .from('resumes_v2')
      .select('parsed_jd_id, strategy_id')
      .eq('id', resumeId)
      .single();
      
    if (!resumeRecord) {
      throw new Error('Resume not found');
    }

    // Fetch the parsed JD data
    const { data: parsedJd } = await supabase
      .from('parsed_jds')
      .select('parsed_data')
      .eq('id', resumeRecord.parsed_jd_id)
      .single();

    // Fetch the strategy data
    const { data: strategy } = await supabase
      .from('resume_strategies')
      .select('strategy_data')
      .eq('id', resumeRecord.strategy_id)
      .single();

    const parsedJdData = parsedJd?.parsed_data || {};
    const strategyData = strategy?.strategy_data || {};

    // Call the AI Gateway
    const aiResponse = await generateAIResponse<any>({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Resume Type: ${resumeType}\n\nUser's First Bullet Point (MUST BE POINT 1):\n"${firstPoint}"\n\nMaster Profile:\n${JSON.stringify(masterProfile)}\n\nParsed JD:\n${JSON.stringify(parsedJdData)}\n\nStrategy:\n${JSON.stringify(strategyData)}`,
      model: 'gpt-4o', // Must use 4o for complex generation and strict instruction following
      temperature: 0.4,
      responseFormat: zodResponseFormat(RegeneratedSummaryFormat, 'regenerated_summary'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to regenerate summary');
    }

    // Replace the first item of the array to be absolutely certain the AI didn't modify it
    let finalSummary = [...aiResponse.data.summary];
    if (finalSummary.length > 0) {
      finalSummary[0] = firstPoint;
    } else {
      finalSummary = [firstPoint];
    }
    
    // Truncate or pad just in case AI failed the length rule
    const requiredLength = resumeType.toLowerCase().includes('c2c') ? 9 : 5;
    if (finalSummary.length > requiredLength) {
      finalSummary = finalSummary.slice(0, requiredLength);
    }

    return NextResponse.json({ 
      success: true, 
      summary: finalSummary
    });

  } catch (error: any) {
    console.error('Summary Regeneration Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
