import { NextResponse } from 'next/server';
import { resetTournamentData } from '@/lib/db';


export async function POST() {
  try {
    const data = await resetTournamentData();
    return NextResponse.json({
      success: true,
      message: 'Tournament data has been reset to defaults',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to reset tournament data', message: error.message },
      { status: 500 }
    );
  }
}
