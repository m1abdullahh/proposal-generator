import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import {
  ExtractFnReturnType,
  MutationConfig,
} from "@/api/helpers/reactQueryClient";
import { IResponseMappings } from "@/lib/types";

type SignupData = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type SignUpResponse = {
  message: string;
};

const signUp = async (data: SignupData): Promise<SignUpResponse> => {
  return request({
    url: "/auth/register",
    method: "POST",
    data: data,
  });
};
export const useSignUp = (config?: MutationConfig<typeof signUp>) => {
  return useMutation({
    mutationKey: ["regitserUser"],
    mutationFn: signUp,
  });
};
