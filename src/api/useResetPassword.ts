import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";

type ResetPasswordData = {
  newPassword: string;
  code: string;
};
export type PasswordResetResponse = {
  message: string;
};

const resetPasswordRequest = async (
  data: ResetPasswordData
): Promise<PasswordResetResponse> => {
  return request({
    url: "/auth/reset-password",
    method: "POST",
    data: data,
  });
};
export const useResetPassword = (
  config?: MutationConfig<typeof resetPasswordRequest>
) => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPasswordRequest,
  });
};
