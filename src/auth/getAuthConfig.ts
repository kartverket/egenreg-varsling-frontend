import { api } from "../lib/api"

type AuthConfigResponse = {
  AZURE_APP_CLIENT_ID: string
  AZURE_APP_AUTHORITY: string
  AZURE_APP_LOGIN_REDIRECT_URI: string
}

export const getAuthConfig = (): Promise<AuthConfigResponse> => {
  return api.get("/authConfig")
}
