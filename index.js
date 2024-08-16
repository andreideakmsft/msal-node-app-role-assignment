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
// // GET https://graph.microsoft.com/v1.0/user
// const resp = await graphClient.api('/users').get();
// console.log(resp);
const appRoleAssignment = {
    principalId: 'da55e018-55f8-48d3-aa49-7695f104d1ba',
    resourceId: '26444935-9f63-403b-916d-55b67fefa6ab', // 26444935-9f63-403b-916d-55b67fefa6ab / 5508ed16-89a5-418f-8654-e5e66f2f2533
    appRoleId: '5dc9486f-0607-4907-a159-7b8e5d819115'
};
const resp = await graphClient.api('/servicePrincipals/26444935-9f63-403b-916d-55b67fefa6ab/appRoleAssignedTo')
    .post(appRoleAssignment);
console.log(resp);
