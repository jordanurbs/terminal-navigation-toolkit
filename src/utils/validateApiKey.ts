/// <reference types="vite/client" />

const API_ENDPOINT = 'https://toolkit.ai-captains.com/.netlify/functions/validate';

export async function validateApiKey(apiKey: string): Promise<{ valid: boolean; userId?: string }> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    });

    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return {
      valid: true,
      userId: data.userId
    };
  } catch (error) {
    console.error('Error validating API key:', error);
    return { valid: false };
  }
} 