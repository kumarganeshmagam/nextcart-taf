import { AIProvider } from './AIProvider';
import { GeminiProvider } from './GeminiProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { ClaudeProvider } from './ClaudeProvider';
import { NvidiaProvider } from './NvidiaProvider';
import { OpenRouterProvider } from './OpenRouterProvider';

export class ProviderFactory {
  static getProvider(): AIProvider {
    const providerType = (process.env.AI_PROVIDER || 'openrouter').toLowerCase();

    switch (providerType) {
      case 'openai':
        return new OpenAIProvider();
      case 'claude':
      case 'anthropic':
        return new ClaudeProvider();
      case 'nvidia':
        return new NvidiaProvider();
      case 'openrouter':
        return new OpenRouterProvider();
      case 'gemini':
      default:
        return new GeminiProvider();
    }
  }
}
