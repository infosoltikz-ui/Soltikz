import { NextResponse } from 'next/server';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateAIResponse } from '@/utils/ai-gateway';
import { createClient } from '@/utils/supabase/server';

// Define the structured output for the Resume Strategy
const StrategyFormat = z.object({
  prioritizedSkills: z.array(z.string()).describe("The top skills from the user's profile that perfectly match the JD keywords."),
  emphasizedProjects: z.array(z.string()).describe("The titles of the projects that are most relevant to this specific role."),
  tone: z.string().describe("The tone the resume should take (e.g., 'Highly technical and metric-driven', 'Leadership focused')."),
  missingKeywords: z.array(z.string()).describe("Keywords from the JD that the user does not seem to have. (The generator should try to weave these in if plausible)."),
});

const SYSTEM_PROMPT = `
You are an Elite Enterprise Resume Strategist and ATS Match Optimization Engine (targeting 90%+ ATS match score).
Your job is to compare a Candidate's Master Profile against a Parsed Job Description.
You must construct a surgical strategy for how the Resume Generator should tailor the resume:
1. Extract all high-priority technical tools, cloud architectures, methodologies, and role-specific keywords from the JD.
2. Identify which skills and projects from the candidate's master profile map directly to these JD requirements.
3. Formulate a keyword injection strategy so every section (Summary, Skills Taxonomy, Experience Bullets) naturally incorporates JD terminology for 90%+ ATS scan compatibility.
4. Set the tone to high-impact, quantified, and technical.
Return your strategy as a structured JSON object matching the schema.
`;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // Ensure user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { masterProfile, parsedJdData, parsedJdId } = await req.json();

    if (!masterProfile || !parsedJdData || !parsedJdId) {
      return NextResponse.json({ error: 'masterProfile, parsedJdData, and parsedJdId are required' }, { status: 400 });
    }

    // Call the AI Gateway
    const aiResponse = await generateAIResponse<any>({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: `Master Profile:\n${JSON.stringify(masterProfile)}\n\nParsed Job Description:\n${JSON.stringify(parsedJdData)}`,
      model: 'gpt-4o', // Using the smarter model for complex strategic reasoning
      temperature: 0.3,
      responseFormat: zodResponseFormat(StrategyFormat, 'resume_strategy'),
    });

    if (aiResponse.error || !aiResponse.data) {
      throw new Error(aiResponse.error || 'Failed to generate strategy');
    }

    // Save the strategy to the database
    const { data: dbData, error: dbError } = await supabase
      .from('resume_strategies')
      .insert({
        parsed_jd_id: parsedJdId,
        strategy_data: aiResponse.data
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Log the AI Telemetry
    await supabase.from('ai_telemetry_logs').insert({
      user_id: user.id,
      action_type: 'Generate Strategy',
      provider: aiResponse.provider,
      model: aiResponse.model,
      input_tokens: aiResponse.usage.inputTokens,
      output_tokens: aiResponse.usage.outputTokens,
      duration_ms: aiResponse.durationMs,
      status: 'success'
    });

    return NextResponse.json({ 
      success: true, 
      strategy_id: dbData.id,
      strategy_data: aiResponse.data
    });

  } catch (error: any) {
    console.error('Strategy Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
