import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider } from './AIProvider';

export class GeminiProvider implements AIProvider {
  name = 'Gemini';
  private genAI: GoogleGenerativeAI | null;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    this.genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.genAI) {
      throw new Error('GOOGLE_API_KEY not set.');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini API call failed:', error.message);
      return '';
    }
  }

  async generateWithVision(prompt: string, imageBase64: string): Promise<string> {
    if (!this.genAI) {
      throw new Error('GOOGLE_API_KEY not set.');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: 'image/png'
          }
        }
      ]);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini Vision API call failed:', error.message);
      return '';
    }
  }
}
