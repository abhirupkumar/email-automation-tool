import { AuthenticationProvider, Client } from '@microsoft/microsoft-graph-client';
import axios from 'axios';

export class OutlookAuthProvider implements AuthenticationProvider {
    constructor(private token: string) { }

    async getAccessToken() {
        return this.token;
    }
}

export const getOutlookAuthUrl = () => {
    const scope = 'https://graph.microsoft.com/.default';
    const redirectUri = process.env.OUTLOOK_REDIRECT_URI;
    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.OUTLOOK_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scope}`;
};

export const getOutlookTokens = async (code: string) => {
    const tokenUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';

    const params = new URLSearchParams();
    params.append('client_id', process.env.OUTLOOK_CLIENT_ID || '');
    params.append('client_secret', process.env.OUTLOOK_CLIENT_SECRET || '');
    params.append('code', code);
    params.append('redirect_uri', process.env.OUTLOOK_REDIRECT_URI || '');
    params.append('grant_type', 'authorization_code');

    try {
        const response = await axios.post(tokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token, expires_in } = response.data;
        return { access_token, refresh_token, expires_in };
    } catch (error: any) {
        throw new Error(`Error retrieving Outlook tokens: ${error.response.data.error_description || error.message}`);
    }
};

export const listOutlookEmails = async (token: string) => {
    const client = Client.initWithMiddleware({
        authProvider: new OutlookAuthProvider(token),
    });

    const res = await client.api('/me/messages').get();
    return res.value || [];
};

export const getOutlookEmailDetails = async (token: string, messageId: string) => {
    const client = Client.initWithMiddleware({
        authProvider: new OutlookAuthProvider(token),
    });

    const res = await client.api(`/me/messages/${messageId}`).get();
    return res;
};
