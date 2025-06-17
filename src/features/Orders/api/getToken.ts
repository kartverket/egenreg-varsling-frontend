// src/lib/auth/getAccessToken.ts
import { AccountInfo } from "@azure/msal-browser"
import { getAuthState } from "../../../auth/authState"

const getAccessToken = async (): Promise<string> => {
  const { msalInstance, scopes } = getAuthState()

  const accounts = msalInstance.getAllAccounts()
  const activeAccount: AccountInfo | undefined = accounts[0]

  if (!activeAccount) throw new Error("No active account")

  const result = await msalInstance.acquireTokenSilent({
    account: activeAccount,
    scopes: scopes,
  })

  return result.accessToken
}

export { getAccessToken }
