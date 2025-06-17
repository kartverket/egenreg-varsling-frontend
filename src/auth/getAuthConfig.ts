import { baseUrl } from "../lib/api"

export const getAuthConfig = async () => {
  const response = await fetch(`${baseUrl}/authConfig`)
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
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  }
}
