import Anthropic from '@anthropic-ai/sdk';
import { AIProvider } from './AIProvider';

export class ClaudeProvider implements AIProvider {
  name = 'Claude';
  private client: Anthropic | null;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    this.client = apiKey ? new Anthropic({ apiKey }) : null;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.client) {
      throw new Error('ANTHROPIC_API_KEY not set.');
    }

    try {
      const response = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      // Claude returns an array of content blocks
      const content = response.content[0];
      return content.type === 'text' ? content.text : '';
    } catch (error: any) {
      console.error('Claude API call failed:', error.message);
      return '';
    }
  }

  async generateWithVision(prompt: string, imageBase64: string): Promise<string> {
    if (!this.client) {
      throw new Error('ANTHROPIC_API_KEY not set.');
    }

    try {
      const response = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/png',
                  data: imageBase64,
                },
              },
              { type: 'text', text: prompt },
            ],
          },
        ],
      });
      const content = response.content[0];
      return content.type === 'text' ? content.text : '';
    } catch (error: any) {
      console.error('Claude Vision API call failed:', error.message);
      return '';
    }
  }
}
