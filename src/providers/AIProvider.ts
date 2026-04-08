export interface AIProvider {
  name: string;
  generateText(prompt: string): Promise<string>;
  generateWithVision(prompt: string, imageBase64: string): Promise<string>;
}
