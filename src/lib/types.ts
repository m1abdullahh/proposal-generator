import { GeneratorModel } from "@/api";

export interface IResponseMappings<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  success?: boolean;
  error?: string;
}

export const ModelNameMappings: Record<GeneratorModel, string> = {
  CLAUDE_3: "AnthropicAI Claude 3 Opus",
  GPT_4: "OpenAI ChatGPT 4 Turbo",
  GEMINI_PRO: "Google Gemini Pro",
};
