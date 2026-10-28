'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Team, Match, TeamStanding } from '@/types/tournament';
import { INITIAL_TEAMS, INITIAL_MATCHES } from '@/data/initialData';
import { Trophy } from 'lucide-react';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StandingsTable from '@/components/StandingsTable';
import CrossMatrix from '@/components/CrossMatrix';
import ScheduleSection from '@/components/ScheduleSection';
import PodiumSection from '@/components/PodiumSection';
import ClubIntroSection from '@/components/ClubIntroSection';
import SquadsSection from '@/components/SquadsSection';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function HomePage() {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [tournamentMode, setTournamentMode] = useState<'final' | 'direct'>('direct');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Fetch latest data from backend API with deep equality check to prevent unnecessary re-renders
  const fetchLiveData = useCallback(async () => {
    try {
      const res = await fetch('/api/tournament', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.teams) {
          setTeams(prev => (JSON.stringify(prev) === JSON.stringify(json.teams) ? prev : json.teams));
        }
        if (json.matches) {
          setMatches(prev => (JSON.stringify(prev) === JSON.stringify(json.matches) ? prev : json.matches));
        }
        if (json.tournamentMode) {
          setTournamentMode(prev => (prev === json.tournamentMode ? prev : json.tournamentMode));
        }
      }
    } catch (_) {}
  }, []);

  // Initial load and auto-polling every 6 seconds
  useEffect(() => {
    fetchLiveData();

    const interval = setInterval(fetchLiveData, 6000);
    const onFocus = () => fetchLiveData();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchLiveData]);

  // Show Toast
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  }, []);

  // Compute standings with tie-breaker (Points 3-1-0 -> GD -> GF -> Head-to-Head)
  const standings = useMemo(() => {
    const statsMap: Record<number, TeamStanding> = {};

    teams.forEach((t, idx) => {
      statsMap[t.id] = {
        ...t,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
        form: [],
        rank: idx + 1,
      };
    });

    matches.forEach(m => {
      if (!m.played) return;
      const home = statsMap[m.home];
      const away = statsMap[m.away];
      if (!home || !away) return;

      home.played += 1;
      away.played += 1;
      home.gf += m.homeGoals;
      home.ga += m.awayGoals;
      away.gf += m.awayGoals;
      away.ga += m.homeGoals;

      if (m.homeGoals > m.awayGoals) {
        home.won += 1;
        home.pts += 3;
        home.form.push('T');
        away.lost += 1;
        away.form.push('B');
      } else if (m.homeGoals < m.awayGoals) {
        away.won += 1;
        away.pts += 3;
        away.form.push('T');
        home.lost += 1;
        home.form.push('B');
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.pts += 1;
        away.pts += 1;
        home.form.push('H');
        away.form.push('H');
      }
    });

    Object.values(statsMap).forEach(s => {
      s.gd = s.gf - s.ga;
    });

    const sorted = Object.values(statsMap).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;

      // Head-to-head tie breaker
      const h2h = matches.find(
        m => m.played && ((m.home === a.id && m.away === b.id) || (m.home === b.id && m.away === a.id))
      );
      if (h2h) {
        const aGoals = h2h.home === a.id ? h2h.homeGoals : h2h.awayGoals;
        const bGoals = h2h.home === b.id ? h2h.homeGoals : h2h.awayGoals;
        if (bGoals !== aGoals) return bGoals - aGoals;
      }

      return a.id - b.id;
    });

    return sorted.map((s, idx) => ({ ...s, rank: idx + 1 }));
  }, [teams, matches]);

  const playedCount = useMemo(() => matches.filter(m => m.played).length, [matches]);

  // Select match from matrix to scroll
  const handleSelectMatch = (matchId: string) => {
    const el = document.getElementById(`matchCard-${matchId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-[#D9381E]');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#D9381E]');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dynamic Ambient Stadium Background */}
      <AnimatedBackground />

      {/* 1. Header Navigation Bar (Fixed z-50 at top) */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 relative z-10">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Club Introduction & Season 1 Milestone (At Top of Page) */}
        <ClubIntroSection />

        {/* 4. Standings Table & 4x4 Cross Matrix */}
        <section id="standings-section" className="scroll-mt-16 py-10 sm:py-16 border-b border-[#141413]">
          <div className="w-full max-w-6xl mx-auto px-[4%] sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#16422B]" />
                  <span>BẢNG XẾP HẠNG &amp; MA TRẬN ĐỐI ĐẦU</span>
                </div>
                <h2 className="font-extrabold text-[clamp(1.5rem,5.5vw,2.5rem)] uppercase tracking-tight leading-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  CỤC DIỆN VÒNG TRÒN 4 ĐỘI
                </h2>
              </div>

              {/* Official Tournament Format Badge */}
              <div className="flex items-center gap-2 bg-white border border-[#141413] px-3.5 py-2 hard-shadow-sm self-start font-mono text-xs">
                <span className="text-[#61605B]">Thể thức:</span>
                <span className="font-bold text-[#16422B] flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Đấu 3 trận vòng tròn — Điểm cao nhất Vô Địch</span>
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Standings Table (7 cols) */}
              <div className="lg:col-span-7">
                <StandingsTable
                  standings={standings}
                  tournamentMode={tournamentMode}
                  playedCount={playedCount}
                />
              </div>

              {/* 4x4 Cross Matrix (5 cols) */}
              <div className="lg:col-span-5">
                <CrossMatrix
                  teams={teams}
                  matches={matches}
                  onSelectMatch={handleSelectMatch}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Match Schedule 3 Rounds & Official Scores */}
        <ScheduleSection
          teams={teams}
          matches={matches}
        />

        <div className="cv-auto">
          {/* 6. Podium & Awards Showcase */}
          <PodiumSection standings={standings} />
        </div>

        <div className="cv-auto">
          {/* 7. Squad Profiles & Tournament Rules */}
          <SquadsSection teams={teams} />
        </div>
      </main>

      {/* Footer (hidden on mobile per user request) */}
      <footer className="hidden sm:block border-t border-[#141413] bg-white/90 backdrop-blur-md py-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#61605B]">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-[#16422B] text-white font-bold">
              ITIL MÙA 1 (2026)
            </span>
            <span className="text-[#141413] font-semibold">
              CLB Bóng Đá Liên Chi Đoàn Khoa CNTT
            </span>
          </div>
          <div>
            Giải Bóng Đá Nội Bộ Mùa 1 (2026) • Ban Tổ Chức LCĐ Khoa CNTT
          </div>
        </div>
      </footer>

      {/* Editorial Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 sm:bottom-4 right-4 z-50 bg-[#141413] text-white border border-[#141413] px-4 py-2.5 font-mono text-xs hard-shadow-sm animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
