import OpenAI from 'openai';

// Initialize OpenAI. It automatically looks for process.env.OPENAI_API_KEY
const openai = new OpenAI();

export type AIProvider = 'openai' | 'claude' | 'gemini';

export interface AIGenerationOptions {
  provider?: AIProvider;
  model?: string;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  responseFormat?: any; // Used for structured JSON outputs (e.g. zodResponseFormat)
}

export interface AIResponse<T> {
  data: T | null;
  error: string | null;
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  provider: AIProvider;
  model: string;
  durationMs: number;
}

/**
 * AI Gateway Layer
 * Routes requests to the appropriate AI provider (currently defaults to OpenAI).
 * Automatically logs token usage and performance metadata.
 */
export async function generateAIResponse<T = string>(
  options: AIGenerationOptions
): Promise<AIResponse<T>> {
  const startTime = Date.now();
  const provider = options.provider || 'openai';
  // Default to the fast and cheap 4o-mini, but allow override (e.g. gpt-4o for complex logic)
  const model = options.model || 'gpt-4o-mini'; 

  let resultData: T | null = null;
  let errorMsg: string | null = null;
  let usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };

  try {
    if (provider === 'openai') {
      const completion = await openai.beta.chat.completions.parse({
        model: model,
        messages: [
          { role: 'system', content: options.systemPrompt },
          { role: 'user', content: options.userPrompt },
        ],
        temperature: options.temperature ?? 0.7,
        response_format: options.responseFormat, // This enforces strict JSON matching the schema
      });

      const message = completion.choices[0].message;
      
      if (message.refusal) {
        throw new Error(`AI Refused: ${message.refusal}`);
      }

      // If a responseFormat was provided, message.parsed will contain the typed object
      resultData = (options.responseFormat ? message.parsed : message.content) as T;
      
      usage = {
        inputTokens: completion.usage?.prompt_tokens || 0,
        outputTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
      };
    } else {
      throw new Error(`Provider ${provider} is not yet implemented.`);
    }
  } catch (error: any) {
    console.error(`[AI Gateway Error] (${provider}/${model}):`, error);
    errorMsg = error.message || 'Unknown AI error occurred';
  }

  const durationMs = Date.now() - startTime;

  return {
    data: resultData,
    error: errorMsg,
    usage,
    provider,
    model,
    durationMs,
  };
}
