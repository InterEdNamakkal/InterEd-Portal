import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      queryFn: async ({ queryKey }) => {
        const [url] = queryKey as [string, ...unknown[]];
        const res = await fetch(url);
        
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || 'An error occurred while fetching the data.');
        }
        
        return res.json();
      },
    },
  },
});

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RequestOptions = {
  on401?: "returnNull" | "throw";
};

export async function apiRequest(
  method: ApiMethod,
  url: string,
  data?: any,
  options?: RequestOptions
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (response.status === 401 && options?.on401 === "returnNull") {
    return null;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed: ${response.statusText}`);
  }

  return response;
}

export const getQueryFn = (options?: RequestOptions) => 
  async ({ queryKey }: { queryKey: readonly unknown[] }) => {
    const [url] = queryKey as [string, ...unknown[]];
    const res = await fetch(url as string, {
      credentials: "include",
    });

    if (res.status === 401 && options?.on401 === "returnNull") {
      return null;
    }
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `API request failed: ${res.statusText}`);
    }
    
    return res.json();
  };