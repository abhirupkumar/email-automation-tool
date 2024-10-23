import { NextRequest, NextResponse } from 'next/server';
import { classifyEmail } from '@/lib/gemini';

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();
        const classification = await classifyEmail(email);

        return NextResponse.json({ classification });
    } catch (error) {
        console.error('Error classifying email:', error);
        return NextResponse.json({ error: 'Error classifying email' }, { status: 500 });
    }
};
