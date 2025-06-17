// src/lib/auth/getAccessToken.ts
import { AccountInfo } from "@azure/msal-browser"
import { getAuthState } from "../../../auth/authState"

export const getAccessToken = async (): Promise<string> => {
  const { msalInstance, scopes } = getAuthState()

  const accounts = msalInstance.getAllAccounts()
  const activeAccount: AccountInfo | undefined = accounts[0]
  if (!activeAccount) throw new Error("No active account")

  const result = await msalInstance.acquireTokenSilent({
    account: activeAccount,
    scopes,
  })

  return result.accessToken
}
