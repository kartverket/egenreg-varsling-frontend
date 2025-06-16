import { PopupRequest, PublicClientApplication, RedirectRequest, SsoSilentRequest } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";


export const msalInstance = new PublicClientApplication(msalConfig)

export const scopes = [`${"037789ff-26e2-480c-8574-e224035c1b0b"}/.default`]


export const authenticationRequest:
	| PopupRequest
	| RedirectRequest
	| SsoSilentRequest = {
	authority: msalInstance.getConfiguration().auth.authority, 
	scopes,
}

interface Config {
    clientId: string | undefined;
    authority: string | undefined;
    redirect_uri: string | undefined;
    backend_url: string | undefined;
    regelrett_frontend_url: string | undefined;
    regelrett_client_id: string | undefined;
}

interface Request {
    headersOut: Record<string, string>;
    return: (statusCode: number, body: string) => void;
}

function getConfig(r: Request): void {
    const config: Config = {
        clientId: process.env.VITE_CLIENT_ID,
        authority: process.env.VITE_AUTHORITY,
        redirect_uri: process.env.VITE_LOGIN_REDIRECT_URI,
        backend_url: process.env.VITE_BACKEND_URL,
        regelrett_frontend_url: process.env.VITE_REGELRETT_FRONTEND_URL,
        regelrett_client_id: process.env.REGELRETT_CLIENT_ID,
    };
    r.headersOut["Content-Type"] = "application/json";
    r.return(200, JSON.stringify(config));
}

export default { getConfig }