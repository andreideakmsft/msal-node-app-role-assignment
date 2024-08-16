// Load the .env file if it exists
import dotenv from "dotenv";
dotenv.config();

import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';


// @azure/identity
const credential = new ClientSecretCredential(
    `${process.env.TENANT_ID}`,
    `${process.env.CLIENT_ID}`,
    `${process.env.CLIENT_SECRET}`,
  );
  
  // @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    // The client credentials flow requires that you request the
    // /.default scope, and pre-configure your permissions on the
    // app registration in Azure. An administrator must grant consent
    // to those permissions beforehand.
    scopes: ['https://graph.microsoft.com/.default'],
  });
  
  const graphClient = Client.initWithMiddleware({ authProvider: authProvider });


const appRoleAssignment = {
    principalId: 'da55e018-55f8-48d3-aa49-7695f104d1ba', // Object ID of the Service Principal which will be granted the App Role
    resourceId: '26444935-9f63-403b-916d-55b67fefa6ab', // Object ID of the Service Principal exposing the App Role
    appRoleId: '5dc9486f-0607-4907-a159-7b8e5d819115' // ID of the App Role
  };
  
const resp = await graphClient.api('/servicePrincipals/26444935-9f63-403b-916d-55b67fefa6ab/appRoleAssignedTo')
    .post(appRoleAssignment);

console.log(resp);
