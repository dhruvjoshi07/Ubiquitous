import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        return NextResponse.json({ success: true, user: decodedPayload });
    } catch (e) {
        return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }
}
