import { apiGet } from "@/utils/apiWrapper";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  // Add more fields as needed based on your API response
}

export interface PaginatedUsersResponse {
  users: User[];
  pagination: {
    total: number;
    skip: number;
    limit: number;
    hasMore: boolean;
  }
}

export interface PaginationParams {
  limit: number;
  skip: number;
}

/**
 * Hook to fetch paginated users
 * @param params - Pagination parameters (limit and skip)
 * @example
 * const { data, isLoading, error } = useGetUsers({ limit: 10, skip: 0 });
 */
export function useGetUsers(params: PaginationParams) {
  return useApiQuery<User[], PaginationParams>({
    queryKeyFactory: (paginationParams) => ["users", paginationParams],
    apiFn: async (paginationParams) => {
      const response = await apiGet<User[]>("/users", {
        limit: paginationParams.limit,
        skip: paginationParams.skip,
      });
      return response.data;
    },
  })(params);
}

/**
 * Hook to fetch a single user by ID
 * @param userId - The ID of the user to fetch
 * @example
 * const { data: user, isLoading, error } = useGetUser(userId);
 */
export function useGetUser(userId: string) {
  return useApiQuery<User, string>({
    queryKeyFactory: (id) => ["user", id],
    apiFn: async (id) => {
      const response = await apiGet<User>(`/users/${id}`);
      return response.data;
    },
    enabled: !!userId,
  })(userId);
}
