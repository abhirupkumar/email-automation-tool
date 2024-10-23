import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const outlookAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.OUTLOOK_CLIENT_ID}&response_type=code&redirect_uri=${process.env.OUTLOOK_REDIRECT_URI}&response_mode=query&scope=offline_access%20Mail.Read`;

        return NextResponse.json({ url: outlookAuthUrl });
    } catch (error) {
        console.error('Error generating Outlook OAuth URL:', error);
        return NextResponse.json({ error: 'Error generating OAuth URL' }, { status: 500 });
    }
};
