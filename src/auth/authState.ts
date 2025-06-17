// src/auth/authState.ts
import {
  PopupRequest,
  PublicClientApplication,
  RedirectRequest,
  SsoSilentRequest,
} from "@azure/msal-browser"

let msalInstance: PublicClientApplication | null = null
let authenticationRequest: PopupRequest | RedirectRequest | SsoSilentRequest | null = null
let scopes: string[] | null = null

export const setAuthState = (
  instance: PublicClientApplication,
  request: PopupRequest | RedirectRequest | SsoSilentRequest,
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
