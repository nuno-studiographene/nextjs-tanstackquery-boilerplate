import { apiGet } from "@/utils/apiWrapper";
import { useApiQuery } from "../useApiQuery";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Hook to fetch all blog posts
 * @example
 * const { data: posts, isLoading, error } = useGetPosts();
 */
export const useGetPosts = useApiQuery<Post[], void>({
  queryKeyFactory: () => ["posts"],
  apiFn: async () => {
    const response = await apiGet<Post[]>("/posts");
    return response.data;
  },
});

/**
 * Hook to fetch a single blog post by ID
 * @param postId - The ID of the post to fetch
 * @param options - Additional options like enabled
 * @example
 * const { data: post, isLoading, error } = useGetPost(blogId);
 *
 * // With conditional fetching
 * const { data: post } = useGetPost(blogId, { enabled: !!blogId });
 */
export function useGetPost(
  postId: string,
  options?: { enabled?: boolean }
) {
  return useApiQuery<Post, string>({
    queryKeyFactory: (id) => ["post", id],
    apiFn: async (id) => {
      const response = await apiGet<Post>(`/posts/${id}`);
      return response.data;
    },
    enabled: options?.enabled ?? (!!postId),
  })(postId);
}

