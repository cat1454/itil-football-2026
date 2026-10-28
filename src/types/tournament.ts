export interface Player {
  id: string;
  name: string;
  isCaptain?: boolean;
}

export interface Team {
  id: number;
  code: string;
  name: string;
  captain: string;
  kitColor: string;
  kitName: string;
  note: string;
  players: string[];
}

export interface Match {
  id: string;
  matchNo: number;
  round: number;
  date: string;
  time: string;
  pitch: string;
  home: number; // team id
  away: number; // team id
  homeGoals: number;
  awayGoals: number;
  played: boolean;
  status?: 'upcoming' | 'live' | 'finished';
  scorers?: string[];
  cards?: { player: string; type: 'yellow' | 'red' }[];
}

export interface TeamStanding extends Team {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ('T' | 'H' | 'B')[];
  rank: number;
  prevRank?: number;
}

export interface PlayoffMatch {
  homeGoals: number;
  awayGoals: number;
  homePenalties?: number;
  awayPenalties?: number;
  played: boolean;
}

export interface TournamentAwards {
  topScorer: string;
  mvp: string;
  bestGk: string;
  fairPlayTeam: string;
}
