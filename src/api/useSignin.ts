import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";
import { IResponseMappings } from "@/lib/types";

type LoginData = {
  email: string;
  password: string;
};
export type LoginResponse = {
  accessToken: string;
  user: Record<string, any>;
  expiresIn: string;
};

const login = async (data: LoginData): Promise<LoginResponse> => {
  return request({
    url: "/auth/login",
    method: "POST",
    data: data,
  });
};
export const useSignIn = (config?: MutationConfig<typeof login>) => {
  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: login,
  });
};
