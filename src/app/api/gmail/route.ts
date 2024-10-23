import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Generate Gmail OAuth URL
export const GET = async (req: NextRequest) => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/gmail.readonly'],
        });

        return NextResponse.json({ url: authUrl });
    } catch (error) {
        console.error('Error generating Gmail OAuth URL:', error);
        return NextResponse.json({ error: 'Error generating OAuth URL' }, { status: 500 });
    }
};
