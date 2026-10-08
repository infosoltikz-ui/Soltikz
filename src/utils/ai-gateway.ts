import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// Initialize OpenAI. It automatically looks for process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy_build_key' });

// Initialize Anthropic
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_build_key' });

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
      const completion = await openai.chat.completions.parse({
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
    } else if (provider === 'claude') {
      const claudeSystemPrompt = options.systemPrompt + "\n\nIMPORTANT: You must return ONLY valid JSON matching the exact schema required. Do NOT include markdown code blocks (like ```json), just the raw JSON object.";
      
      const message = await anthropic.messages.create({
        model: model,
        max_tokens: 8192,
        system: claudeSystemPrompt,
        messages: [
          { role: 'user', content: options.userPrompt }
        ],
        temperature: options.temperature ?? 0.7,
      });
      
      const content = message.content[0].type === 'text' ? message.content[0].text : '';
      
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          resultData = JSON.parse(jsonMatch[0]) as T;
        } else {
          resultData = JSON.parse(content) as T;
        }
      } catch (e) {
        throw new Error(`Failed to parse Claude JSON response: ${content}`);
      }
      
      usage = {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        totalTokens: message.usage.input_tokens + message.usage.output_tokens,
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
