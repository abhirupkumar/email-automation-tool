import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const params = new URLSearchParams({
        client_id: process.env.OUTLOOK_CLIENT_ID!,
        response_type: 'code',
        redirect_uri: process.env.NEXT_PUBLIC_OUTLOOK_REDIRECT_URI!,
        response_mode: 'query',
        scope: 'Mail.Read',
    });

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
    res.redirect(authUrl);
}
