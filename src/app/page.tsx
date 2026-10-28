'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { Team, Match, TeamStanding } from '@/types/tournament';
import { INITIAL_TEAMS, INITIAL_MATCHES } from '@/data/initialData';

import KickoffGate from '@/components/KickoffGate';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StandingsTable from '@/components/StandingsTable';
import CrossMatrix from '@/components/CrossMatrix';
import ScheduleSection from '@/components/ScheduleSection';
import FinalsBracket from '@/components/FinalsBracket';
import SquadsSection from '@/components/SquadsSection';
import EditTeamsModal from '@/components/EditTeamsModal';

export default function HomePage() {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [tournamentMode, setTournamentMode] = useState<'final' | 'direct'>('final');
  const [isGateOpen, setIsGateOpen] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [isLiveSync, setIsLiveSync] = useState(false);

  // Fetch latest data from backend API
  const fetchLiveData = useCallback(async () => {
    try {
      const res = await fetch('/api/tournament', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.teams) setTeams(json.teams);
        if (json.matches) setMatches(json.matches);
        if (json.tournamentMode) setTournamentMode(json.tournamentMode);
        setIsLiveSync(true);
      }
    } catch (_) {}
  }, []);

  // Initial load and auto-polling every 8 seconds
  useEffect(() => {
    // Check local storage first
    try {
      const savedTeams = localStorage.getItem('itil_teams_2026');
      if (savedTeams) setTeams(JSON.parse(savedTeams));

      const savedMatches = localStorage.getItem('itil_matches_2026');
      if (savedMatches) setMatches(JSON.parse(savedMatches));

      const savedMode = localStorage.getItem('itil_mode_2026');
      if (savedMode) setTournamentMode(savedMode as 'final' | 'direct');

      const gateSeen = sessionStorage.getItem('itil_gate_passed');
      if (gateSeen === 'true') {
        setIsGateOpen(false);
      }
    } catch (_) {}

    // Fetch from backend
    fetchLiveData();

    const interval = setInterval(fetchLiveData, 8000);
    const onFocus = () => fetchLiveData();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchLiveData]);

  // Save to localStorage when state updates
  useEffect(() => {
    try {
      localStorage.setItem('itil_teams_2026', JSON.stringify(teams));
    } catch (_) {}
  }, [teams]);

  useEffect(() => {
    try {
      localStorage.setItem('itil_matches_2026', JSON.stringify(matches));
    } catch (_) {}
  }, [matches]);

  useEffect(() => {
    try {
      localStorage.setItem('itil_mode_2026', tournamentMode);
    } catch (_) {}
  }, [tournamentMode]);

  // Show Toast
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  }, []);

  // Compute standings with tie-breaker (Points -> GD -> GF -> Head-to-Head)
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

  // Adjust score handler
  const handleAdjustScore = (matchId: string, side: 'home' | 'away', delta: number) => {
    sound.playClick();
    setMatches(prev =>
      prev.map(m => {
        if (m.id !== matchId) return m;
        const homeGoals = side === 'home' ? Math.max(0, m.homeGoals + delta) : m.homeGoals;
        const awayGoals = side === 'away' ? Math.max(0, m.awayGoals + delta) : m.awayGoals;
        return {
          ...m,
          homeGoals,
          awayGoals,
          played: true,
        };
      })
    );
    showToast('Đã cập nhật tỉ số trận đấu!');
  };

  // Toggle played status
  const handleTogglePlayed = (matchId: string) => {
    sound.playClick();
    setMatches(prev =>
      prev.map(m => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          played: !m.played,
        };
      })
    );
    showToast('Đã chuyển trạng thái trận đấu!');
  };

  // Simulate all 6 matches with confetti
  const handleSimulateAll = () => {
    sound.playGoal();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D9381E', '#16422B', '#D97706', '#1E40AF'],
      });
    } catch (_) {}

    setMatches(prev =>
      prev.map(m => ({
        ...m,
        played: true,
        homeGoals: Math.floor(Math.random() * 4),
        awayGoals: Math.floor(Math.random() * 4),
      }))
    );
    showToast('Đã giả lập ngẫu nhiên toàn bộ 6 trận vòng tròn!');
  };

  // Reset default matches
  const handleResetMatches = () => {
    setMatches(JSON.parse(JSON.stringify(INITIAL_MATCHES)));
    showToast('Đã khôi phục trạng thái lịch đấu ban đầu');
  };

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

  // Save edited teams
  const handleSaveTeams = (updatedTeams: Team[]) => {
    setTeams(updatedTeams);
    showToast('Đã cập nhật danh sách 4 đội bóng!');
  };

  // Unlock gate
  const handleUnlockGate = () => {
    setIsGateOpen(false);
    try {
      sessionStorage.setItem('itil_gate_passed', 'true');
    } catch (_) {}
    showToast('Chào mừng bạn đến với ITIL 2026!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 0. Fullscreen Interactive Kickoff Entrance Gate */}
      <KickoffGate isOpen={isGateOpen} onUnlock={handleUnlockGate} />

      {/* 1. Header Navigation Bar */}
      <Navbar
        onReopenGate={() => setIsGateOpen(true)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* 2. Hero & Interactive Pitch Strip */}
        <HeroSection />

        {/* 3. Standings Table & 4x4 Cross Matrix */}
        <section id="standings-section" className="py-12 sm:py-16 border-b border-[#141413]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1">
                  01 // BẢNG XẾP HẠNG &amp; MA TRẬN XOAY VÒNG
                </div>
                <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  CỤC DIỆN VÒNG TRÒN 4 ĐỘI
                </h2>
              </div>

              {/* Tournament Mode Switcher */}
              <div className="flex flex-wrap items-center gap-2 bg-white border border-[#141413] p-1.5 hard-shadow-sm self-start">
                <span className="font-mono text-xs text-[#61605B] px-2">Thể thức:</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTournamentMode('final');
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold border border-[#141413] transition cursor-pointer ${
                    tournamentMode === 'final' ? 'bg-[#16422B] text-white' : 'text-[#141413] hover:bg-[#EAE8E0]'
                  }`}
                >
                  Top 2 đá Chung Kết
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTournamentMode('direct');
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-semibold border border-[#141413] transition cursor-pointer ${
                    tournamentMode === 'direct' ? 'bg-[#16422B] text-white' : 'text-[#141413] hover:bg-[#EAE8E0]'
                  }`}
                >
                  Tính điểm Vô Địch luôn
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Standings Table (7 cols) */}
              <div className="lg:col-span-7">
                <StandingsTable
                  standings={standings}
                  tournamentMode={tournamentMode}
                  onModeChange={setTournamentMode}
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

        {/* 4. Match Schedule 3 Rounds & Simulator */}
        <ScheduleSection
          teams={teams}
          matches={matches}
          onAdjustScore={handleAdjustScore}
          onTogglePlayed={handleTogglePlayed}
          onSimulateAll={handleSimulateAll}
          onResetMatches={handleResetMatches}
        />

        {/* 5. Finals Day Automatic Bracket */}
        <FinalsBracket standings={standings} />

        {/* 6. Squad Profiles & Tournament Rules */}
        <SquadsSection
          teams={teams}
          onOpenEditModal={() => setIsEditModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#141413] bg-white py-8 pb-24 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#61605B]">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 bg-[#16422B] text-white font-bold">
              ITIL 2026
            </span>
            <span className="text-[#141413] font-semibold">
              CLB Bóng Đá Liên Chi Đoàn Khoa CNTT
            </span>
          </div>
          <div>
            Next.js App Router • Tailwind CSS • Framer Motion &amp; GSAP
          </div>
        </div>
      </footer>

      {/* Edit Teams Modal */}
      <EditTeamsModal
        isOpen={isEditModalOpen}
        teams={teams}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTeams}
      />

      {/* Editorial Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 sm:bottom-4 right-4 z-50 bg-[#141413] text-white border border-[#141413] px-4 py-2.5 font-mono text-xs hard-shadow-sm animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
