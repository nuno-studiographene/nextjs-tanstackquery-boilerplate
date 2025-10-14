import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

interface UseApiMutationOptions<TData, TVariables, TError = Error> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables>,
    "mutationFn" | "onSuccess" | "onError"
  >;
}

/**
 * Generic hook for creating API mutation hooks (POST, PUT, PATCH, DELETE)
 * This eliminates the need to write repetitive useMutation boilerplate
 *
 * @example
 * // Create a custom mutation hook
 * export function useCreatePost() {
 *   return useApiMutation<Post, CreatePostPayload>({
 *     mutationFn: async (payload) => {
 *       const response = await apiPost<Post>('/posts', payload);
 *       return response.data;
 *     },
 *     onSuccess: (data) => {
 *       console.log('Post created:', data);
 *     },
 *   });
 * }
 */
export function useApiMutation<TData, TVariables, TError = Error>(
  options: UseApiMutationOptions<TData, TVariables, TError>
): UseMutationResult<TData, TError, TVariables> {
  const { mutationFn, onSuccess, onError, mutationOptions } = options;

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess,
    onError,
    ...mutationOptions,
  });
}

