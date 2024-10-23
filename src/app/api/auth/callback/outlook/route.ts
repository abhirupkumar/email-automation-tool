import { getOutlookTokens } from '@/lib/outlook';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (typeof code === 'string') {
        try {
            const tokens = await getOutlookTokens(code);
            return NextResponse.redirect('/dashboard');
        } catch (error) {
            return NextResponse.json({ error: 'Error getting tokens' }, { status: 400 });
        }
    } else {
        return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
    }
}
