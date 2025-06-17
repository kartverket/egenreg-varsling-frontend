import { getAuthConfig } from "./getAuthConfig"

export async function loadMsalConfig() {
  const env = import.meta.env

  const clientId = env.VITE_CLIENT_ID
  const tenantId = env.VITE_TENANT_ID
  const redirectUri = env.VITE_LOGIN_REDIRECT_URI

  if (clientId && tenantId && redirectUri) {
    return {
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
      },
    }
  }
  const config = await getAuthConfig()

  return {
    auth: {
      clientId: config.AZURE_APP_CLIENT_ID,
      authority: config.AZURE_APP_AUTHORITY,
      redirectUri: config.AZURE_APP_LOGIN_REDIRECT_URI,
    },
  }
}
