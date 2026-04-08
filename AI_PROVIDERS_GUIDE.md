# AI Provider Layer Documentation

I have implemented a flexible AI layer that allows you to switch between different AI providers for the self-healing mechanism.

## Available Providers

| Provider | `AI_PROVIDER` Value | Required Environment Variable |
| :--- | :--- | :--- |
| **Gemini** | `gemini` (Default) | `GOOGLE_API_KEY` |
| **OpenAI** | `openai` | `OPENAI_API_KEY` |
| **Claude** | `claude` | `ANTHROPIC_API_KEY` |
| **Nvidia** | `nvidia` | `NVIDIA_API_KEY` |
| **OpenRouter** | `openrouter` | `OPENROUTER_API_KEY` |

## How to Switch Providers

You can switch the AI provider by setting the `AI_PROVIDER` environment variable in your terminal or `.env` file.

### Examples

**Using Gemini (Default):**
```powershell
$env:AI_PROVIDER="gemini"
$env:GOOGLE_API_KEY="your_key"
npx playwright test
```

**Using OpenAI:**
```powershell
$env:AI_PROVIDER="openai"
$env:OPENAI_API_KEY="your_key"
npx playwright test
```

**Using Claude:**
```powershell
$env:AI_PROVIDER="claude"
$env:ANTHROPIC_API_KEY="your_key"
npx playwright test
```

## Implementation Details

The architecture follows a Provider Pattern:
- **`AIProvider.ts`**: The interface defining `generateText` and `generateWithVision`.
- **`ProviderFactory.ts`**: Handles the instantiation of the correct provider based on configuration.
- **Individual Providers**: Each provider (`GeminiProvider`, `OpenAIProvider`, etc.) handles its own API calls and response formatting.

## Adding New "Open" Models
If you want to use local models (like Ollama), you can easily add an `OllamaProvider.ts` that implements the `AIProvider` interface and update the `ProviderFactory`. Currently, `OpenRouterProvider` is included to give you access to models like Mistral, Llama 3, and more.
