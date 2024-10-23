import { NextApiRequest, NextApiResponse } from 'next';
import { getGmailTokens } from '@/lib/gmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (typeof code === 'string') {
        try {
            const tokens = await getGmailTokens(code);
            res.redirect('/dashboard');
        } catch (error) {
            res.status(500).json({ error: 'Error getting tokens' });
        }
    } else {
        res.status(400).json({ error: 'Invalid code' });
    }
}