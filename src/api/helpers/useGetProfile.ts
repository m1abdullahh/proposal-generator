import { useQuery } from "@tanstack/react-query";
import { request } from "@/api/helpers/request";
import { MutationConfig } from "@/api/helpers/reactQueryClient";

export type UserPrpfileResponse = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  active: true;
  emailVerified: true;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const getProfile = async (): Promise<UserPrpfileResponse> => {
  return request({
    url: "/auth/profile",
    method: "GET",
    withAuthToken: true,
  });
};
export const useGetProfile = (config?: MutationConfig<typeof getProfile>) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfile,
  });
};
