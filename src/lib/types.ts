import { GeneratorModel } from "@/api";

export interface IResponseMappings<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  success?: boolean;
  error?: string;
}

export const ModelNameMappings: Record<GeneratorModel, string> = {
  CLAUDE_3: "Claude 3 Opus",
  GPT_4: "ChatGPT 4 Turbo",
};
