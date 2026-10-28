import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const correctPin = process.env.ADMIN_PIN || '1234';

    // Allow default PINs or environment override
    const isValid = pin === correctPin || pin === '1234' || pin === 'itil2026';

    if (isValid) {
      return NextResponse.json({ success: true, authorized: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid PIN' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Auth failed', message: error.message }, { status: 500 });
  }
}
