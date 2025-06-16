export const msalConfig = {
  auth: {
    clientId: "037789ff-26e2-480c-8574-e224035c1b0b",
    authority: "https://login.microsoftonline.com/7f74c8a2-43ce-46b2-b0e8-b6306cba73a3",
    redirectUri: "http://localhost:3000",  
  },
  cache: {
    cacheLocation: "localStorage",  
    storeAuthStateInCookie: false,
  },
};