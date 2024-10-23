import { NextApiRequest, NextApiResponse } from 'next';
import { getOutlookTokens } from '@/lib/outlook';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (typeof code === 'string') {
        try {
            const tokens = await getOutlookTokens(code);
            res.redirect('/dashboard'); // Redirect to dashboard after authentication
        } catch (error) {
            res.status(500).json({ error: 'Error getting tokens' });
        }
    } else {
        res.status(400).json({ error: 'Invalid code' });
    }
}
