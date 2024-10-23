import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
);

export const getGmailAuthUrl = () => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    return authUrl;
};

export const getGmailTokens = async (code: string) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

export const listEmails = async () => {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 10,
    });
    return res.data.messages || [];
};

export const getEmailDetails = async (messageId: string) => {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
    });
    return res.data;
};
