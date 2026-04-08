import OpenAI from 'openai';
import { AIProvider } from './AIProvider';

export class OpenRouterProvider implements AIProvider {
  name = 'OpenRouter';
  private client: OpenAI | null;

  constructor() {
    const apiKey = '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';
    this.client = apiKey ? new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://localhost:3000', // Required by OpenRouter
        'X-Title': 'NexCart Playwright Healer',
      }
    }) : null;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.client) {
      throw new Error('OPENROUTER_API_KEY not set.');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'mistralai/mistral-7b-instruct', // Or any other open model
        messages: [{ role: 'user', content: prompt }],
      });
      return response.choices[0].message.content || '';
    } catch (error: any) {
      console.error('OpenRouter API call failed:', error.message);
      return '';
    }
  }

  async generateWithVision(prompt: string, imageBase64: string): Promise<string> {
    if (!this.client) {
      throw new Error('OPENROUTER_API_KEY not set.');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'google/gemini-flash-1.5', // OpenRouter supports many vision models
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: `data:image/png;base64,${imageBase64}` },
              },
            ],
          },
        ],
      });
      return response.choices[0].message.content || '';
    } catch (error: any) {
      console.error('OpenRouter Vision API call failed:', error.message);
      return '';
    }
  }
}
