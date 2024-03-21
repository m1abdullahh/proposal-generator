import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from "@tanstack/react-query";
import { ApiErrorResponse } from "apisauce";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: Infinity,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    ApiErrorResponse<any>,
    Parameters<MutationFnType>[0]
  >;
