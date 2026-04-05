import Replicate from 'replicate';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize Replicate with API token from environment variable
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || '',
    });

    console.log('Generating image with Imagen-4 for prompt:', prompt);

    const input = {
      prompt: prompt,
      aspect_ratio: "1:1",
      safety_filter_level: "block_medium_and_above"
    };

    try {
      const output = await replicate.run("google/imagen-4", { input });

      let imageUrl = '';

      // Handle different output formats from Replicate
      if (output && typeof output === 'object' && 'url' in output) {
        imageUrl = (output as any).url;
      } else if (output && typeof output === 'string') {
        imageUrl = output;
      } else if (Array.isArray(output) && output.length > 0) {
        imageUrl = output[0];
      }

      console.log('Generated image URL from Imagen-4:', imageUrl);

      return new Response(
        JSON.stringify({
          imageUrl:output.url(),
          prompt,
          success: true
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (replicateError: any) {
      console.error('Replicate/Imagen-4 generation error:', replicateError);

      // Return error with fallback suggestion
      return new Response(
        JSON.stringify({
          error: 'Image generation failed',
          details: replicateError.message || 'Unknown error',
          fallback: true
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process image generation request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}