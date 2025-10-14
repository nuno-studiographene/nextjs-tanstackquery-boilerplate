# Custom API Hooks

This folder contains custom React Query hooks that abstract away the boilerplate of API calls.

## Structure

```
hooks/
├── useApiQuery.ts          # Generic hook factory
├── api/                    # API-specific hooks organized by domain
│   └── useBlogPosts.ts     # Blog post hooks
└── index.ts                # Main exports
```

## Usage

### Simple Usage (No Parameters)

```typescript
// In your component
import { useGetPosts } from "@/hooks";

function BlogsPage() {
  const { data: posts, isLoading, error } = useGetPosts();

  // Use posts data...
}
```

### With Parameters

```typescript
import { useGetPost } from "@/hooks";

function BlogPostPage({ postId }: { postId: string }) {
  const { data: post, isLoading, error } = useGetPost(postId);

  // Use post data...
}
```

### With Conditional Fetching

```typescript
import { useGetPost } from "@/hooks";

function BlogPostPage({ postId }: { postId: string | undefined }) {
  // Only fetch when postId is available
  const { data: post, isLoading } = useGetPost(postId || "", {
    enabled: !!postId,
  });

  // Use post data...
}
```

## Creating New Hooks

### Example 1: Simple GET Hook (No Parameters)

```typescript
// hooks/api/useUsers.ts
import { apiGet } from "@/utils/apiWrapper";
import { useApiQuery } from "../useApiQuery";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useGetUsers = useApiQuery<User[], void>({
  queryKeyFactory: () => ["users"],
  apiFn: async () => {
    const response = await apiGet<User[]>("/users");
    return response.data;
  },
});
```

Usage:

```typescript
const { data: users } = useGetUsers();
```

### Example 2: GET Hook with Single Parameter

```typescript
// hooks/api/useUsers.ts
export function useGetUser(userId: string, options?: { enabled?: boolean }) {
  return useApiQuery<User, string>({
    queryKeyFactory: (id) => ["user", id],
    apiFn: async (id) => {
      const response = await apiGet<User>(`/users/${id}`);
      return response.data;
    },
    enabled: options?.enabled ?? !!userId,
  })(userId);
}
```

Usage:

```typescript
const { data: user } = useGetUser(userId);
```

### Example 3: GET Hook with Multiple Parameters

```typescript
// hooks/api/useUsers.ts
interface GetUsersParams {
  page: number;
  limit: number;
  role?: string;
}

export function useGetUsersPaginated(params: GetUsersParams) {
  return useApiQuery<User[], GetUsersParams>({
    queryKeyFactory: (p) => ["users", "paginated", p],
    apiFn: async (p) => {
      const response = await apiGet<User[]>("/users", p);
      return response.data;
    },
  })(params);
}
```

Usage:

```typescript
const { data: users } = useGetUsersPaginated({ page: 1, limit: 10 });
```

### Example 4: GET Hook with Query Parameters

```typescript
// hooks/api/useSearch.ts
interface SearchParams {
  query: string;
  filters?: Record<string, string>;
}

export function useSearchPosts(params: SearchParams) {
  return useApiQuery<Post[], SearchParams>({
    queryKeyFactory: (p) => ["posts", "search", p.query, p.filters],
    apiFn: async (p) => {
      const response = await apiGet<Post[]>("/posts/search", {
        q: p.query,
        ...p.filters,
      });
      return response.data;
    },
    enabled: (p) => p.query.length > 2, // Only search if query is 3+ chars
  })(params);
}
```

Usage:

```typescript
const { data: results } = useSearchPosts({
  query: searchTerm,
  filters: { category: "tech" },
});
```

### Example 5: Complex Hook with Additional Options

```typescript
// hooks/api/useProjects.ts
export function useGetProject(
  projectId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  }
) {
  return useApiQuery<Project, string>({
    queryKeyFactory: (id) => ["project", id],
    apiFn: async (id) => {
      const response = await apiGet<Project>(`/projects/${id}`);
      return response.data;
    },
    enabled: options?.enabled ?? !!projectId,
    queryOptions: {
      refetchInterval: options?.refetchInterval,
      // Add any other React Query options here
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  })(projectId);
}
```

Usage:

```typescript
// Auto-refetch every 10 seconds
const { data: project } = useGetProject(projectId, {
  refetchInterval: 10000,
});
```

## Benefits

1. **No Boilerplate** - No need to write `async function` + `useQuery` every time
2. **Consistent Patterns** - All API calls follow the same structure
3. **Type-Safe** - Full TypeScript support with generics
4. **Reusable** - Create once, use everywhere
5. **Easier Testing** - Mock hooks instead of individual API calls
6. **Better Organization** - All API hooks in one place

## Best Practices

1. **Organize by Domain** - Create separate files for different API domains (users, posts, projects, etc.)
2. **Export Types** - Always export interfaces used in hooks
3. **Enable Smart Defaults** - Use `enabled` option to prevent unnecessary calls
4. **Document Your Hooks** - Add JSDoc comments with usage examples
5. **Keep Query Keys Consistent** - Use descriptive, hierarchical query keys

## Advanced: Custom Hook Factory

If you need more control, you can create your own factory functions:

```typescript
// hooks/factories/createGetHook.ts
export function createGetHook<TData>(endpoint: string, queryKey: string) {
  return useApiQuery<TData, void>({
    queryKeyFactory: () => [queryKey],
    apiFn: async () => {
      const response = await apiGet<TData>(endpoint);
      return response.data;
    },
  });
}

// Usage
export const useGetSettings = createGetHook<Settings>("/settings", "settings");
```

## Migration from Old Pattern

**Before:**

```typescript
async function fetchPost(id: string): Promise<Post> {
  const response = await apiGet<Post>(`/posts/${id}`);
  return response.data;
}

const { data, isLoading } = useQuery({
  queryKey: ["post", id],
  queryFn: () => fetchPost(id),
});
```

**After:**

```typescript
const { data, isLoading } = useGetPost(id);
```

Much cleaner! 🎉
