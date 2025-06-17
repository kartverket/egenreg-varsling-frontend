import {
  PopupRequest,
  PublicClientApplication,
  RedirectRequest,
  SsoSilentRequest,
} from "@azure/msal-browser"
import { msalConfig } from "./authConfig"

export const msalInstance = new PublicClientApplication(msalConfig)

const clientId = msalConfig.auth.clientId

export const scopes = [`${clientId}/.default`]

export const authenticationRequest: PopupRequest | RedirectRequest | SsoSilentRequest = {
  authority: msalInstance.getConfiguration().auth.authority,
  scopes,
}
