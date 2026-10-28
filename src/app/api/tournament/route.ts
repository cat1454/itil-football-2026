import { NextResponse } from 'next/server';
import { getTournamentData, saveTournamentData } from '@/lib/db';


export async function GET() {
  try {
    const data = await getTournamentData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve tournament data', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = await saveTournamentData(body);
    return NextResponse.json({
      success: true,
      lastUpdated: updated.lastUpdated,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to save tournament data', message: error.message },
      { status: 500 }
    );
  }
}
