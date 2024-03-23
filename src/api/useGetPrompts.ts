import { useQuery } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";

export type UserPrompt = {
  _id: string;
  prompt: string;
  completion: string;
  createdAt: string;
};

const getPrompts = async (): Promise<Array<UserPrompt>> => {
  return request({
    url: "/prompts/my-prompts",
    method: "GET",
    withAuthToken: true,
  });
};
export const useGetPrompts = (config?: MutationConfig<typeof getPrompts>) => {
  return useQuery({
    queryKey: ["myPrompts"],
    queryFn: getPrompts,
    retry: 0,
  });
};
