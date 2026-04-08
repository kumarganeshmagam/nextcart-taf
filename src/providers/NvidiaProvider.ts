import OpenAI from 'openai';
import { AIProvider } from './AIProvider';

export class NvidiaProvider implements AIProvider {
  name = 'Nvidia';
  private client: OpenAI | null;

  constructor() {
    const apiKey = process.env.NVIDIA_API_KEY;
    this.client = apiKey ? new OpenAI({
      apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1'
    }) : null;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.client) {
      throw new Error('NVIDIA_API_KEY not set.');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'meta/llama-3.1-405b-instruct', // Example model, user can change
        messages: [{ role: 'user', content: prompt }],
      });
      return response.choices[0].message.content || '';
    } catch (error: any) {
      console.error('Nvidia API call failed:', error.message);
      return '';
    }
  }

  async generateWithVision(prompt: string, imageBase64: string): Promise<string> {
    if (!this.client) {
      throw new Error('NVIDIA_API_KEY not set.');
    }

    try {
      // Nvidia Vision model (example: deplot or vision-enabled llama)
      const response = await this.client.chat.completions.create({
        model: 'nvidia/neva-22b',
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
      console.error('Nvidia Vision API call failed:', error.message);
      return '';
    }
  }
}
