import fs from 'fs/promises';
import path from 'path';
import { Team, Match, TournamentAwards } from '@/types/tournament';
import { INITIAL_TEAMS, INITIAL_MATCHES } from '@/data/initialData';

export interface TournamentData {
  teams: Team[];
  matches: Match[];
  tournamentMode: 'final' | 'direct';
  finals: {
    final: { home: number; away: number; homePen: number; awayPen: number; played: boolean };
    third: { home: number; away: number; homePen: number; awayPen: number; played: boolean };
  };
  awards: TournamentAwards;
  lastUpdated: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'tournament_db.json');

// Default initial state
const DEFAULT_DATA: TournamentData = {
  teams: INITIAL_TEAMS,
  matches: INITIAL_MATCHES,
  tournamentMode: 'final',
  finals: {
    final: { home: 0, away: 0, homePen: 0, awayPen: 0, played: false },
    third: { home: 0, away: 0, homePen: 0, awayPen: 0, played: false },
  },
  awards: {
    topScorer: 'Trần Lê Minh (Đội 1)',
    mvp: 'Tuấn Ngọc (Đội 2)',
    bestGk: 'Nghĩa Lê (Đội 4)',
    fairPlayTeam: 'Đội 3',
  },
  lastUpdated: new Date().toISOString(),
};

// In-memory cache for serverless environments
let memoryCache: TournamentData | null = null;

export async function getTournamentData(): Promise<TournamentData> {
  // If in-memory cache exists and file cannot be accessed (e.g. read-only Vercel serverless), return cache
  if (memoryCache) {
    return memoryCache;
  }

  try {
    const raw = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryCache = parsed;
    return parsed;
  } catch (err: any) {
    // If file doesn't exist, create it with default data
    if (err.code === 'ENOENT') {
      try {
        await fs.mkdir(DB_DIR, { recursive: true });
        await fs.writeFile(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      } catch (_) {
        // Read-only filesystem fallback
      }
    }
    memoryCache = DEFAULT_DATA;
    return DEFAULT_DATA;
  }
}

export async function saveTournamentData(data: Partial<TournamentData>): Promise<TournamentData> {
  const current = await getTournamentData();
  const updated: TournamentData = {
    ...current,
    ...data,
    lastUpdated: new Date().toISOString(),
  };

  memoryCache = updated;

  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    // Write atomically using temporary file to prevent corruption
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    await fs.writeFile(tempFile, JSON.stringify(updated, null, 2), 'utf-8');
    await fs.rename(tempFile, DB_FILE);
  } catch (err) {
    console.warn('Persistent disk write warning (operating on in-memory storage):', err);
  }

  return updated;
}

export async function resetTournamentData(): Promise<TournamentData> {
  const resetData: TournamentData = {
    ...DEFAULT_DATA,
    lastUpdated: new Date().toISOString(),
  };

  memoryCache = resetData;

  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(resetData, null, 2), 'utf-8');
  } catch (_) {}

  return resetData;
}
