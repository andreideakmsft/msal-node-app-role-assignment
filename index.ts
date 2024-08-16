// Load the .env file if it exists
import dotenv from "dotenv";
dotenv.config();

// Other dependencies
import {ConfidentialClientApplication} from "@azure/msal-node";

// MSAL configuration for Confidential Client
const msalConfig = {
    auth: {
      clientId: `${process.env.CLIENT_ID}`,
      authority: `${process.env.AAD_ENDPOINT}${process.env.TENANT_ID}`,
      clientSecret: process.env.CLIENT_SECRET,
    }
};

console.dir(msalConfig);
// Endpoint to call
const apiConfig = {
    uri: process.env.GRAPH_ENDPOINT + 'v1.0/users',
};
  
// Configure scopes for the token request
const tokenRequest = {
    scopes: [process.env.GRAPH_ENDPOINT + '.default'],
};
  
// Instantiate MSAL Confidential Client
const cca = new ConfidentialClientApplication(msalConfig);

async function main() {
    try {
        const authResponse = await cca.acquireTokenByClientCredential(tokenRequest);
        if (authResponse != null) {
            console.log(authResponse.accessToken) // display access token
        }
    } catch (error) {
        console.log(error);
    }
}

main();