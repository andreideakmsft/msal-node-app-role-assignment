"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load the .env file if it exists
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Other dependencies
const msal_node_1 = require("@azure/msal-node");
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
const cca = new msal_node_1.ConfidentialClientApplication(msalConfig);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authResponse = yield cca.acquireTokenByClientCredential(tokenRequest);
            if (authResponse != null) {
                console.log(authResponse.accessToken); // display access token
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
