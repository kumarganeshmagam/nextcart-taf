import OpenAI from 'openai';
import { AIProvider } from './AIProvider';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  private client: OpenAI | null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.client) {
      throw new Error('OPENAI_API_KEY not set.');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      });
      return response.choices[0].message.content || '';
    } catch (error: any) {
      console.error('OpenAI API call failed:', error.message);
      return '';
    }
  }

  async generateWithVision(prompt: string, imageBase64: string): Promise<string> {
    if (!this.client) {
      throw new Error('OPENAI_API_KEY not set.');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o',
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
      console.error('OpenAI Vision API call failed:', error.message);
      return '';
    }
  }
}
