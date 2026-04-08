declare namespace NodeJS {
  interface ProcessEnv {
    ENV: 'dev' | 'prod';
    BASE_URL: string;
    API_BASE_URL: string;
    USERNAME: string;
    PASSWORD: string;
    CI?: string;
    AI_PROVIDER?: string;
    OPENAI_API_KEY?: string;
    GEMINI_API_KEY?: string;
    ANTHROPIC_API_KEY?: string;
    NVIDIA_API_KEY?: string;
    OPENROUTER_API_KEY?: string;
  }
}
