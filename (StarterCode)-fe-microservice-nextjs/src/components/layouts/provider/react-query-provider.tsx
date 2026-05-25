"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IReactQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      refetchOnReconnect: false, 
      refetchOnMount: false, 
      retry: false, 
      retryOnMount: false, 
      networkMode: "always", 
    },
  },
});

export default function ReactQueryProvider({
  children,
}: IReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
