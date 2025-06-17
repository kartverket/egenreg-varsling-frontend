type AuthConfigResponse = {
  AZURE_APP_CLIENT_ID: string
  AZURE_APP_AUTHORITY: string
  AZURE_APP_LOGIN_REDIRECT_URI: string
}

export async function getAuthConfig(): Promise<AuthConfigResponse> {
  const res = await fetch("/authConfig")
  if (!res.ok) throw new Error("Failed to fetch auth config")
  return await res.json()
}
