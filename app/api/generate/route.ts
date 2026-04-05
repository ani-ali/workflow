import { generateText } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create DeepSeek instance with API key from environment variable
    const deepseek = createDeepSeek({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
    });

    // Generate text using DeepSeek
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: prompt,
      maxTokens: 2000,
      temperature: 0.7,
    });

    // Return the generated text
    return new Response(
      JSON.stringify({ text }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating text:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate text',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}