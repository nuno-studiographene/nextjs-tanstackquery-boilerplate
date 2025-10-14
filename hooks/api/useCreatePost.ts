import { apiPost } from "@/utils/apiWrapper";
import { useApiMutation } from "../useApiMutation";
import { Post } from "./useBlogPosts";

export interface CreatePostPayload {
  title: string;
  body?: string;
  userId?: number;
}

/**
 * Hook to create a new blog post
 * @example
 * const { mutate, isPending } = useCreatePost();
 *
 * const handleSubmit = () => {
 *   mutate({ title: 'New Post' });
 * };
 */
export function useCreatePost() {
  return useApiMutation<Post, CreatePostPayload>({
    mutationFn: async (payload) => {
      const response = await apiPost<Post>("/posts", payload);
      return response.data;
    },
  });
}

