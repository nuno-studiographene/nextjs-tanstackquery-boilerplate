type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiWrapperOptions {
  method?: HttpMethod;
  params?: Record<string, string | number | boolean>;
  payload?: unknown;
  headers?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

/**
 * API Wrapper for handling HTTP requests
 * @param url - API endpoint path (without domain)
 * @param options - Request options including method, params, payload, and headers
 * @returns Promise with the API response
 * @throws Error with alert for failed requests
 *
 * @example
 * // GET request
 * const users = await apiWrapper<User[]>('/users');
 *
 * // GET with query params
 * const user = await apiWrapper('/users', { params: { id: 1 } });
 *
 * // POST with payload
 * const newUser = await apiWrapper('/users', {
 *   method: 'POST',
 *   payload: { name: 'John Doe', email: 'john@example.com' }
 * });
 */
export async function apiWrapper<T = unknown>(
  url: string,
  options: ApiWrapperOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    params,
    payload,
    headers: customHeaders = {},
  } = options;

  // Get the API base URL from environment variables
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

  // Build query string from params
  const queryString = params
    ? "?" +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : "";

  // Construct full URL
  const fullUrl = `${baseUrl}${url}${queryString}`;

  // Default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Merge headers
  const headers = { ...defaultHeaders, ...customHeaders };

  try {
    // Make the fetch request
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    // Parse response
    let data: T;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = (await response.text()) as T;
    }

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage =
        typeof data === "object" && data !== null && "message" in data
          ? (data as { message: string }).message
          : `HTTP Error ${response.status}: ${response.statusText}`;

      // Show alert for errors
      if (typeof window !== "undefined") {
        alert(errorMessage);
      }

      throw new Error(errorMessage);
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    // Handle network errors or other exceptions
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while fetching data";

    // Show alert for errors (if not already shown)
    if (
      typeof window !== "undefined" &&
      !(error instanceof Error && error.message.startsWith("HTTP Error"))
    ) {
      alert(errorMessage);
    }

    throw error;
  }
}

/**
 * Convenience function for GET requests
 */
export async function apiGet<T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>
): Promise<ApiResponse<T>> {
  return apiWrapper<T>(url, { method: "GET", params });
}

/**
 * Convenience function for POST requests
 */
export async function apiPost<T = unknown>(
  url: string,
  payload: unknown
): Promise<ApiResponse<T>> {
  return apiWrapper<T>(url, { method: "POST", payload });
}

/**
 * Convenience function for PUT requests
 */
export async function apiPut<T = unknown>(
  url: string,
  payload: unknown
): Promise<ApiResponse<T>> {
  return apiWrapper<T>(url, { method: "PUT", payload });
}

/**
 * Convenience function for PATCH requests
 */
export async function apiPatch<T = unknown>(
  url: string,
  payload: unknown
): Promise<ApiResponse<T>> {
  return apiWrapper<T>(url, { method: "PATCH", payload });
}

/**
 * Convenience function for DELETE requests
 */
export async function apiDelete<T = unknown>(
  url: string
): Promise<ApiResponse<T>> {
  return apiWrapper<T>(url, { method: "DELETE" });
}

