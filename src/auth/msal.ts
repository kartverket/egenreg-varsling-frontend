import {
  PopupRequest,
  PublicClientApplication,
  RedirectRequest,
  SsoSilentRequest,
} from "@azure/msal-browser"
import { setAuthState } from "./authState"
import { apiRoute } from "../lib/api"

export async function initAuth() {
  const msalConfig = await loadMsalConfig()
  const msalInstance = new PublicClientApplication(msalConfig)
  await msalInstance.initialize()

  const clientId = msalConfig.auth.clientId
  const scopes = [`${clientId}/.default`]

  const authenticationRequest: PopupRequest | RedirectRequest | SsoSilentRequest = {
    authority: msalInstance.getConfiguration().auth.authority,
    scopes,
  }

  setAuthState(msalInstance, authenticationRequest, scopes)

  return {
    msalInstance,
    authenticationRequest,
    scopes,
  }
}

async function loadMsalConfig() {
  const response = await fetch(`${apiRoute}/authConfig`)
  if (!response.ok) {
    throw new Error("Failed to load MSAL config")
  }

  const config = await response.json()

  return {
    auth: {
      clientId: config.AZURE_APP_CLIENT_ID,
      authority: config.AZURE_APP_AUTHORITY,
      redirectUri: config.AZURE_APP_LOGIN_REDIRECT_URI,
    },
  }
}
