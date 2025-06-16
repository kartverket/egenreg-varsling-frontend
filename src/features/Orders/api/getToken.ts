// src/lib/auth/getAccessToken.ts
import { AccountInfo } from "@azure/msal-browser";
import { msalInstance, scopes } from "../../../auth/msal";
 
const getAccessToken = async (): Promise<string> => {
  const accounts = msalInstance.getAllAccounts()
  const activeAccount: AccountInfo | undefined = accounts[0]

  if (!activeAccount) throw new Error("No active account")

  const result = await msalInstance.acquireTokenSilent({
    account: activeAccount,
    scopes: scopes, 
  });

  return result.accessToken;
}

export { getAccessToken };

