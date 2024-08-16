// Load the .env file if it exists
import dotenv from "dotenv";
dotenv.config();
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
// @azure/identity
const credential = new ClientSecretCredential(`${process.env.TENANT_ID}`, `${process.env.CLIENT_ID}`, `${process.env.CLIENT_SECRET}`);
// @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    // The client credentials flow requires that you request the
    // /.default scope, and pre-configure your permissions on the
    // app registration in Azure. An administrator must grant consent
    // to those permissions beforehand.
    scopes: ['https://graph.microsoft.com/.default'],
});
const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
// GET https://graph.microsoft.com/v1.0/me
// const user = async () => {
//     return response;
// };
// GET https://graph.microsoft.com/v1.0/user
const resp = await graphClient.api('/users').get();
console.log(resp);
