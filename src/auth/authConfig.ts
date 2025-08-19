import { getAuthConfig } from "./getAuthConfig"

export async function loadMsalConfig() {
  const config = await getAuthConfig()

  return {
    auth: {
      clientId: config.auth.clientId,
      authority: config.auth.authority,
      redirectUri: config.auth.redirectUri,
    },
  }
}
