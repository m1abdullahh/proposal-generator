import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";

type ConfirmRecoveryTokenData = {
  email: string;
  token: string;
};
export type RecoveryResponse = {
  message: string;
  code: string;
};

const confirmRecoveryToken = async (
  data: ConfirmRecoveryTokenData
): Promise<RecoveryResponse> => {
  return request({
    url: "/auth/account-recovery/confirm",
    method: "POST",
    data: data,
  });
};
export const useConfirmToken = (
  config?: MutationConfig<typeof confirmRecoveryToken>
) => {
  return useMutation({
    mutationKey: ["confirmRecoveryToken"],
    mutationFn: confirmRecoveryToken,
  });
};
