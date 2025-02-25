import { KvibProvider } from "@kvib/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ErrorElement } from "./components/ErrorElement.tsx";
import { router } from "./router.tsx";
import "./zodConfig.ts";

export const SENDERS_REF = "Kartverket Egenregistrering";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
 
function App() {


  return (
    <ErrorBoundary fallback={<ErrorElement />}>
      <QueryClientProvider client={queryClient}>
        <KvibProvider>
          <RouterProvider router={router} />
        </KvibProvider>
      </QueryClientProvider>   
    </ErrorBoundary>
  );
}

export default App;
