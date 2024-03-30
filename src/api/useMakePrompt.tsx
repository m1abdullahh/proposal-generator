import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";
import { IResponseMappings } from "@/lib/types";

export enum GeneratorModel {
  GPT_4 = "GPT_4",
  CLAUDE_3 = "CLAUDE_3",
}

export type IPrompt = {
  jobDescription: string;
  name: string;
  experience?: number;
  additionalPrompt?: string;
  model: GeneratorModel;
};

export type PromptResponse = IResponseMappings<string>;

const makePrompt = async (data: IPrompt): Promise<PromptResponse> => {
  return request({
    url: "generator/get-completion",
    method: "POST",
    data: data,
    withAuthToken: true,
  });
};
export const useMakePrompt = (config?: MutationConfig<typeof makePrompt>) => {
  return useMutation({
    mutationKey: ["promptCompletion"],
    mutationFn: makePrompt,
  });
};
