'use client';
import { useState } from 'react';

export function useGeminiImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const generateImage = async (prompt: string) => {
    if (!prompt?.trim()) {
      setError('Please enter a prompt for image generation');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simply use the prompt as description
      let generatedText = prompt;

      // Generate actual AI image using Google Imagen-4 via API route
      let generatedImageUrl = '';

      try {
        console.log('Calling API to generate image with Imagen-4 for prompt:', prompt);

        const response = await fetch('/api/replicate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Prefer: "wait"
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          generatedImageUrl = data.imageUrl;
          console.log('Generated image URL from Imagen-4:', generatedImageUrl);
        } else if (data.fallback) {
          // Use fallback if API suggests it
          const seed = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          generatedImageUrl = `https://picsum.photos/seed/${seed}/400/400`;
          console.log('Using fallback image due to API error');
        } else {
          throw new Error(data.error || 'Failed to generate image');
        }
      } catch (fetchError: any) {
        console.error('Image generation error:', fetchError);

        // Fallback to placeholder if API call fails
        const seed = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        generatedImageUrl = `https://picsum.photos/seed/${seed}/400/400`;

        // Don't overwrite Gemini errors, only set if no existing error
        if (!error) {
          setError(`Image generation failed. Using placeholder.`);
        }
      }

      setImageUrl(generatedImageUrl);
      setDescription(generatedText);

      return {
        imageUrl: generatedImageUrl,
        description: generatedText || prompt
      };
    } catch (error) {
      console.error('Error with Gemini API:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImageUrl('');
    setDescription('');
    setError(null);
  };

  return {
    generateImage,
    isLoading,
    error,
    imageUrl,
    description,
    reset
  };
}