import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router";

// Initialize React Query client for managing server state
const queryClient = new QueryClient();

/**
 * Main App component
 * Wraps the application in the QueryClientProvider to enable React Query for data fetching and caching.
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* AppRouter handles all routes in the application */}
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
