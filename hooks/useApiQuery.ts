import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

type QueryKeyFactory<TParams> = (params: TParams) => unknown[];

interface UseApiQueryOptions<TData, TParams, TError = Error> {
  queryKeyFactory: QueryKeyFactory<TParams>;
  apiFn: (params: TParams) => Promise<TData>;
  enabled?: boolean | ((params: TParams) => boolean);
  queryOptions?: Omit<
    UseQueryOptions<TData, TError, TData>,
    "queryKey" | "queryFn" | "enabled"
  >;
}

/**
 * Generic hook factory for creating API query hooks
 * This eliminates the need to write repetitive useQuery boilerplate
 *
 * @example
 * // Create a custom hook
 * export function useGetPost(postId: string) {
 *   return useApiQuery({
 *     queryKeyFactory: (id) => ["post", id],
 *     apiFn: async (id) => {
 *       const response = await apiGet<Post>(`/posts/${id}`);
 *       return response.data;
 *     },
 *   })(postId);
 * }
 */
export function useApiQuery<TData, TParams, TError = Error>(
  options: UseApiQueryOptions<TData, TParams, TError>
) {
  return (params: TParams): UseQueryResult<TData, TError> => {
    const { queryKeyFactory, apiFn, enabled = true, queryOptions } = options;

    const isEnabled =
      typeof enabled === "function" ? enabled(params) : enabled;

    return useQuery<TData, TError>({
      queryKey: queryKeyFactory(params),
      queryFn: () => apiFn(params),
      enabled: isEnabled,
      ...queryOptions,
    });
  };
}

