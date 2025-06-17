// src/auth/authState.ts
import { PopupRequest, PublicClientApplication, RedirectRequest } from "@azure/msal-browser"
import { CommonAuthorizationUrlRequest } from "@azure/msal-common"

type AuthenticationRequest =
  | RedirectRequest
  | PopupRequest
  | Partial<
      Omit<
        CommonAuthorizationUrlRequest,
        | "responseMode"
        | "earJwk"
        | "codeChallenge"
        | "codeChallengeMethod"
        | "requestedClaimsHash"
        | "platformBroker"
      >
    >
  | null

let msalInstance: PublicClientApplication | null = null
let authenticationRequest: AuthenticationRequest | null = null
let scopes: string[] | null = null

export const setAuthState = (
  instance: PublicClientApplication,
  request: AuthenticationRequest,
  s: string[],
) => {
  msalInstance = instance
  authenticationRequest = request
  scopes = s
}

export const getAuthState = () => {
  if (!msalInstance || !authenticationRequest || !scopes) {
    throw new Error("MSAL not initialized yet")
  }
  return { msalInstance, authenticationRequest, scopes }
}
