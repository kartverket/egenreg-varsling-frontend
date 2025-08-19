import {
  PopupRequest,
  PublicClientApplication,
  RedirectRequest,
  SsoSilentRequest,
} from "@azure/msal-browser"
import { loadMsalConfig } from "./authConfig"
import { setAuthState } from "./authState"

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
