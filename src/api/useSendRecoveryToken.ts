import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";

type AccountRecoveryData = {
  email: string;
};
export type RecoveryResponse = {
  message: string;
};

const sendTokenRequest = async (
  data: AccountRecoveryData
): Promise<RecoveryResponse> => {
  return request({
    url: "/auth/account-recovery",
    method: "POST",
    data: data,
  });
};
export const useSendToken = (
  config?: MutationConfig<typeof sendTokenRequest>
) => {
  return useMutation({
    mutationKey: ["recoverAccount"],
    mutationFn: sendTokenRequest,
  });
};
