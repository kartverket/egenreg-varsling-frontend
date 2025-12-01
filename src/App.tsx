import {
  InteractionType,
  PopupRequest,
  PublicClientApplication,
  RedirectRequest,
  SsoSilentRequest,
} from "@azure/msal-browser"
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react"
import { KvibProvider, Toaster } from "@kvib/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { RouterProvider } from "react-router-dom"
import "./App.css"
import { initAuth } from "./auth/msal.ts"
import { ErrorElement } from "./components/ErrorElement.tsx"
import { router } from "./router.tsx"
import "./zodConfig.ts"

export const SENDERS_REF = "Kartverket Egenregistrering"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

function App() {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)
  const [authRequest, setAuthRequest] = useState<
    PopupRequest | RedirectRequest | SsoSilentRequest | null
  >(null)

  const authInitialized = useRef(false)

  useEffect(() => {
    if (!authInitialized.current) {
      initAuth().then(({ msalInstance, authenticationRequest }) => {
        setMsalInstance(msalInstance)
        setAuthRequest(authenticationRequest)
      })
      authInitialized.current = true
    }
  }, [])

  if (!msalInstance || !authRequest) return <div>Laster autentisering...</div>
  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={authRequest}
      >
        <ErrorBoundary fallback={<ErrorElement />}>
          <QueryClientProvider client={queryClient}>
            <KvibProvider>
              <RouterProvider router={router} />
              <Toaster />
            </KvibProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  )
}

export default App
