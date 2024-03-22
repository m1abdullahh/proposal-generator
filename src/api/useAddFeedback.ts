import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";

type FeedbackData = {
  feedback: string;
  rating: number;
};
export type FeedbackResponse = {
  message: string;
};

const addFeedback = async (data: FeedbackData): Promise<FeedbackResponse> => {
  return request({
    url: "/feedback",
    method: "POST",
    data: data,
    withAuthToken: true,
  });
};
export const useAddFeedback = (config?: MutationConfig<typeof addFeedback>) => {
  return useMutation({
    mutationKey: ["addFeedback"],
    mutationFn: addFeedback,
  });
};
