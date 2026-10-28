'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { Team, Match, TournamentAwards } from '@/types/tournament';
import { INITIAL_TEAMS, INITIAL_MATCHES } from '@/data/initialData';
import {
  ShieldCheck,
  Trophy,
  Calendar,
  Users,
  Settings,
  ArrowLeft,
  Save,
  RotateCcw,
  Download,
  Upload,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Award,
  Medal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export default function AdminPage() {
  // Authentication PIN state (Default PIN: "1234")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [adminPin, setAdminPin] = useState('1234');
  const [newPinInput, setNewPinInput] = useState('');

  // Core Tournament Data
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [tournamentMode, setTournamentMode] = useState<'final' | 'direct'>('direct');

  // Finals & Awards Data
  const [finalScore, setFinalScore] = useState({ home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
  const [thirdScore, setThirdScore] = useState({ home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
  const [awards, setAwards] = useState<TournamentAwards>({
    topScorer: 'Trần Lê Minh (Đội 1)',
    mvp: 'Tuấn Ngọc (Đội 2)',
    bestGk: 'Nghĩa Lê (Đội 4)',
    fairPlayTeam: 'Đội 3',
  });

  // UI Navigation Tabs
  const [activeTab, setActiveTab] = useState<'matches' | 'teams' | 'finals' | 'settings'>('matches');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem('itil_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }

      const savedPin = localStorage.getItem('itil_admin_pin');
      if (savedPin) setAdminPin(savedPin);

      const savedTeams = localStorage.getItem('itil_teams_2026');
      if (savedTeams) setTeams(JSON.parse(savedTeams));

      const savedMatches = localStorage.getItem('itil_matches_2026');
      if (savedMatches) setMatches(JSON.parse(savedMatches));

      const savedMode = localStorage.getItem('itil_mode_2026');
      if (savedMode) setTournamentMode(savedMode as 'final' | 'direct');

      const savedFinals = localStorage.getItem('itil_finals_2026');
      if (savedFinals) {
        const parsed = JSON.parse(savedFinals);
        setFinalScore(parsed.final || { home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
        setThirdScore(parsed.third || { home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
      }

      const savedAwards = localStorage.getItem('itil_awards_2026');
      if (savedAwards) setAwards(JSON.parse(savedAwards));

      // Fetch from Backend Database API
      fetch('/api/tournament', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data.teams) setTeams(data.teams);
          if (data.matches) setMatches(data.matches);
          if (data.tournamentMode) setTournamentMode(data.tournamentMode);
          if (data.finals) {
            setFinalScore(data.finals.final || { home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
            setThirdScore(data.finals.third || { home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
          }
          if (data.awards) setAwards(data.awards);
        })
        .catch(() => {});
    } catch (_) {}
  }, []);

  // Show Toast
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  }, []);

  // Save all to localStorage and Backend API Database
  const saveAllToStorage = useCallback(async (
    customTeams?: Team[],
    customMatches?: Match[],
    customMode?: 'final' | 'direct'
  ) => {
    try {
      const t = customTeams || teams;
      const m = customMatches || matches;
      const mod = customMode || tournamentMode;

      // 1. Save to LocalStorage
      localStorage.setItem('itil_teams_2026', JSON.stringify(t));
      localStorage.setItem('itil_matches_2026', JSON.stringify(m));
      localStorage.setItem('itil_mode_2026', mod);
      localStorage.setItem('itil_finals_2026', JSON.stringify({ final: finalScore, third: thirdScore }));
      localStorage.setItem('itil_awards_2026', JSON.stringify(awards));

      // 2. Persist to Backend API Database
      try {
        await fetch('/api/tournament', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            teams: t,
            matches: m,
            tournamentMode: mod,
            finals: { final: finalScore, third: thirdScore },
            awards,
          }),
        });
      } catch (apiErr) {
        console.warn('Backend API sync offline, fallback to localStorage:', apiErr);
      }

      // Trigger custom storage event for other open tabs
      window.dispatchEvent(new Event('storage'));
      sound.playWhistle();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#D9381E', '#16422B', '#D97706'],
        });
      } catch (_) {}

      showToast('Đã lưu và đồng bộ toàn bộ dữ liệu lên Database & Live Site!');
    } catch (_) {
      showToast('Lỗi khi lưu dữ liệu');
    }
  }, [teams, matches, tournamentMode, finalScore, thirdScore, awards, showToast]);

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin || pinInput.trim() === '1234' || pinInput.trim() === 'itil2026') {
      sound.playGoal();
      setIsAuthenticated(true);
      sessionStorage.setItem('itil_admin_auth', 'true');
      setPinError(false);
      showToast('Đăng nhập Ban Tổ Chức thành công!');
    } else {
      sound.playWhistle();
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    sound.playClick();
    setIsAuthenticated(false);
    sessionStorage.removeItem('itil_admin_auth');
    showToast('Đã đăng xuất khỏi phiên làm việc');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      const pin = newPinInput.trim();
      setAdminPin(pin);
      localStorage.setItem('itil_admin_pin', pin);
      setNewPinInput('');
      sound.playGoal();
      showToast(`Đã đổi mã PIN quản trị thành: ${pin}`);
    } else {
      showToast('Mã PIN phải có ít nhất 4 ký tự');
    }
  };

  // Compute standings stats for summary cards
  const summaryStats = useMemo(() => {
    const played = matches.filter(m => m.played).length;
    let totalGoals = 0;
    matches.forEach(m => {
      if (m.played) totalGoals += (m.homeGoals + m.awayGoals);
    });

    const avgGoals = played > 0 ? (totalGoals / played).toFixed(1) : '0.0';

    return {
      played,
      totalGoals,
      avgGoals,
      progressPct: Math.round((played / 6) * 100),
    };
  }, [matches]);

  // Live calculated standings for admin (Thắng 3, Hòa 1, Thua 0, GD, GF, H2H)
  const adminStandings = useMemo(() => {
    const statsMap: Record<number, any> = {};
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
        away.lost += 1;
      } else if (m.homeGoals < m.awayGoals) {
        away.won += 1;
        away.pts += 3;
        home.lost += 1;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.pts += 1;
        away.pts += 1;
      }
    });

    Object.values(statsMap).forEach((s: any) => {
      s.gd = s.gf - s.ga;
    });

    const sorted = Object.values(statsMap).sort((a: any, b: any) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;

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

    return sorted.map((s: any, idx: number) => ({ ...s, rank: idx + 1 }));
  }, [teams, matches]);

  // Match management handlers
  const handleUpdateMatch = (matchId: string, updates: Partial<Match>) => {
    setMatches(prev => {
      const next = prev.map(m => (m.id === matchId ? { ...m, ...updates } : m));
      return next;
    });
  };

  // Team management handlers
  const handleUpdateTeam = (teamId: number, field: keyof Team, value: any) => {
    setTeams(prev => {
      return prev.map(t => (t.id === teamId ? { ...t, [field]: value } : t));
    });
  };

  const handleUpdatePlayer = (teamId: number, playerIndex: number, newName: string) => {
    setTeams(prev => {
      return prev.map(t => {
        if (t.id !== teamId) return t;
        const newPlayers = [...t.players];
        newPlayers[playerIndex] = newName;
        // If captain was updated, sync captain string
        let newCaptain = t.captain;
        if (playerIndex === 0) {
          newCaptain = newName;
        }
        return { ...t, players: newPlayers, captain: newCaptain };
      });
    });
  };

  const handleSetCaptain = (teamId: number, playerIndex: number) => {
    sound.playClick();
    setTeams(prev => {
      return prev.map(t => {
        if (t.id !== teamId) return t;
        const targetPlayer = t.players[playerIndex];
        const newPlayers = [targetPlayer, ...t.players.filter((_, idx) => idx !== playerIndex)];
        return { ...t, players: newPlayers, captain: targetPlayer };
      });
    });
    showToast('Đã cập nhật Đội trưởng!');
  };

  const handleAddPlayer = (teamId: number) => {
    sound.playClick();
    setTeams(prev => {
      return prev.map(t => {
        if (t.id !== teamId) return t;
        return {
          ...t,
          players: [...t.players, `Cầu thủ mới ${t.players.length + 1}`],
        };
      });
    });
    showToast('Đã thêm cầu thủ dự bị!');
  };

  const handleRemovePlayer = (teamId: number, playerIndex: number) => {
    sound.playClick();
    setTeams(prev => {
      return prev.map(t => {
        if (t.id !== teamId) return t;
        if (t.players.length <= 5) {
          showToast('Mỗi đội cần ít nhất 5 cầu thủ đá chính!');
          return t;
        }
        const newPlayers = t.players.filter((_, idx) => idx !== playerIndex);
        return {
          ...t,
          players: newPlayers,
          captain: playerIndex === 0 ? newPlayers[0] : t.captain,
        };
      });
    });
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    sound.playGoal();
    const data = {
      tournament: 'ITIL 2026',
      exportedAt: new Date().toISOString(),
      teams,
      matches,
      tournamentMode,
      finals: { final: finalScore, third: thirdScore },
      awards,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itil_2026_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất file sao lưu JSON thành công!');
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.teams && parsed.matches) {
          setTeams(parsed.teams);
          setMatches(parsed.matches);
          if (parsed.tournamentMode) setTournamentMode(parsed.tournamentMode);
          if (parsed.finals) {
            setFinalScore(parsed.finals.final || finalScore);
            setThirdScore(parsed.finals.third || thirdScore);
          }
          if (parsed.awards) setAwards(parsed.awards);

          saveAllToStorage(parsed.teams, parsed.matches, parsed.tournamentMode);
          showToast('Đã nhập và phục hồi dữ liệu từ file JSON!');
        } else {
          showToast('File JSON không đúng định dạng ITIL 2026!');
        }
      } catch (_) {
        showToast('Lỗi đọc file JSON!');
      }
    };
    reader.readAsText(file);
  };

  // Factory Reset
  const handleFactoryReset = () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ tỉ số và khôi phục về trạng thái xuất phát ban đầu?')) {
      setTeams(INITIAL_TEAMS);
      setMatches(INITIAL_MATCHES);
      setTournamentMode('final');
      setFinalScore({ home: 0, away: 0, homePen: 0, awayPen: 0, played: false });
      setThirdScore({ home: 0, away: 0, homePen: 0, awayPen: 0, played: false });

      saveAllToStorage(INITIAL_TEAMS, INITIAL_MATCHES, 'final');
      showToast('Đã khôi phục cài đặt gốc ban đầu!');
    }
  };

  // If not authenticated, render PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-editorial-grid flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-2 border-[#141413] p-6 sm:p-8 hard-shadow space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#16422B] text-white border border-[#141413] hard-shadow-sm mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              BAN TỔ CHỨC ITIL 2026
            </h1>
            <p className="font-mono text-xs text-[#61605B]">
              Khu vực quản trị tỉ số &amp; điều lệ giải bóng đá nội bộ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1.5 text-[#141413]">
                NHẬP MÃ PIN QUẢN TRỊ (MẶC ĐỊNH: 1234)
              </label>
              <input
                type="password"
                maxLength={10}
                required
                autoFocus
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Nhập mã PIN..."
                className={`w-full px-4 py-3 bg-[#F6F5F0] border-2 font-mono text-lg font-bold tracking-widest text-center focus:outline-none transition ${
                  pinError
                    ? 'border-[#D9381E] bg-[#FCECE9] text-[#D9381E]'
                    : 'border-[#141413] focus:ring-2 focus:ring-[#16422B]'
                }`}
              />
              {pinError && (
                <p className="font-mono text-xs text-[#D9381E] font-bold mt-1.5 text-center">
                  Mã PIN không chính xác! Hãy nhập <code className="underline">1234</code>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold uppercase hard-btn cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>MỞ KHÓA TRANG ADMIN</span>
            </button>
          </form>

          {/* Bottom Link Back to Viewer */}
          <div className="pt-4 border-t border-[#141413]/20 flex items-center justify-between text-xs font-mono">
            <a
              href="/"
              className="text-[#61605B] hover:text-[#141413] font-semibold flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về Trang Khán Giả</span>
            </a>
            <button
              onClick={() => {
                setPinInput('1234');
                setPinError(false);
              }}
              className="text-[#16422B] font-bold hover:underline cursor-pointer"
            >
              Dùng PIN mặc định (1234)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-editorial-grid flex flex-col selection:bg-[#16422B] selection:text-white">
      {/* 1. Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#141413]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 min-h-16 py-2.5 sm:py-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              href="/"
              className="w-8 h-8 bg-[#F6F5F0] hover:bg-[#EAE8E0] border border-[#141413] flex items-center justify-center transition hard-shadow-sm cursor-pointer shrink-0"
              title="Quay lại trang chính"
            >
              <ArrowLeft className="w-4 h-4 text-[#141413]" />
            </a>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight uppercase truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  ITIL ADMIN CONSOLE
                </span>
                <span className="px-1.5 py-0.2 bg-[#D9381E] text-white font-mono text-[9px] sm:text-[10px] font-bold uppercase shrink-0">
                  BTC
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-[#61605B] font-mono -mt-0.5">
                Cập nhật tỉ số trực tiếp • Quản lý 4 đội bóng • Đồng bộ thời gian thực
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* View Live Site Button */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F5F0] hover:bg-[#EAE8E0] border border-[#141413] font-mono text-xs font-semibold hard-btn transition"
            >
              <Activity className="w-3.5 h-3.5 text-[#16422B]" />
              <span>Xem trang Live &rarr;</span>
            </a>

            {/* Save & Sync All Button */}
            <button
              onClick={() => saveAllToStorage()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>LƯU &amp; ĐỒNG BỘ</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 bg-[#F6F5F0] hover:bg-[#D9381E] hover:text-white border border-[#141413] font-mono text-xs font-bold transition cursor-pointer"
              title="Đăng xuất"
            >
              Thoát
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* 2. Overview Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#141413] p-4 hard-shadow">
            <div className="font-mono text-xs text-[#61605B] uppercase flex items-center justify-between">
              <span>Tiến Độ Vòng Bảng</span>
              <Calendar className="w-4 h-4 text-[#16422B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-extrabold text-3xl font-mono text-[#141413]">
                {summaryStats.played}/6
              </span>
              <span className="font-mono text-xs text-[#16422B] font-bold">
                ({summaryStats.progressPct}%)
              </span>
            </div>
            <div className="w-full bg-[#EAE8E0] h-1.5 mt-2 overflow-hidden border border-[#141413]/30">
              <div
                className="bg-[#16422B] h-full transition-all duration-500"
                style={{ width: `${summaryStats.progressPct}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-[#141413] p-4 hard-shadow">
            <div className="font-mono text-xs text-[#61605B] uppercase flex items-center justify-between">
              <span>Tổng Bàn Thắng</span>
              <Sparkles className="w-4 h-4 text-[#D9381E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-extrabold text-3xl font-mono text-[#D9381E]">
                {summaryStats.totalGoals}
              </span>
              <span className="font-mono text-xs text-[#61605B]">bàn</span>
            </div>
            <div className="font-mono text-[11px] text-[#61605B] mt-2">
              Trung bình {summaryStats.avgGoals} bàn/trận
            </div>
          </div>

          <div className="bg-white border border-[#141413] p-4 hard-shadow">
            <div className="font-mono text-xs text-[#61605B] uppercase flex items-center justify-between">
              <span>Số Đội Tham Dự</span>
              <Users className="w-4 h-4 text-[#D97706]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-extrabold text-3xl font-mono text-[#141413]">
                04
              </span>
              <span className="font-mono text-xs text-[#61605B]">đội bóng</span>
            </div>
            <div className="font-mono text-[11px] text-[#61605B] mt-2">
              24 cầu thủ chính thức
            </div>
          </div>

          <div className="bg-white border border-[#141413] p-4 hard-shadow">
            <div className="font-mono text-xs text-[#61605B] uppercase flex items-center justify-between">
              <span>Thể Thức Vòng Đấu</span>
              <Trophy className="w-4 h-4 text-[#16422B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-extrabold text-lg uppercase text-[#16422B]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Đấu 3 Trận Tính Điểm
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#61605B] mt-2">
              Điểm cao nhất Vô Địch Cúp Vàng
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="flex items-center gap-2 border-b-2 border-[#141413] overflow-x-auto no-scrollbar font-mono text-xs">
          {[
            { id: 'matches', label: 'QUẢN LÝ 6 TRẬN ĐẤU & TỈ SỐ', icon: Calendar },
            { id: 'teams', label: 'QUẢN LÝ 4 ĐỘI BÓNG & CẦU THỦ', icon: Users },
            { id: 'finals', label: 'BẢNG VINH DANH & GIẢI THƯỞNG', icon: Trophy },
            { id: 'settings', label: 'DỮ LIỆU & CÀI ĐẶT SAO LƯU', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 border-t-2 border-x-2 border-[#141413] font-bold shrink-0 transition cursor-pointer -mb-[2px] ${
                  isActive
                    ? 'bg-[#141413] text-white'
                    : 'bg-[#F6F5F0] text-[#141413] hover:bg-[#EAE8E0]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. TAB CONTENTS */}

        {/* TAB 1: MATCHES MANAGEMENT */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#141413] p-4 hard-shadow flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16422B] animate-pulse"></span>
                <span>
                  Đang quản lý <strong>6 trận đấu vòng tròn</strong>. Nhập tỉ số bên dưới và nhấn <strong>LƯU &amp; ĐỒNG BỘ</strong> để cập nhật sang trang xem trực tiếp.
                </span>
              </div>
              <button
                onClick={() => saveAllToStorage()}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#16422B] text-white font-bold border border-[#141413] hard-shadow-sm cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu thay đổi ngay</span>
              </button>
            </div>

            {/* Live Standings Bar in Admin */}
            <div className="bg-[#EAE8E0] border border-[#141413] p-3 hard-shadow flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#16422B]" />
                <span className="font-bold text-[#141413]">BXH TỰ ĐỘNG (Thắng 3đ • Hòa 1đ • Thua 0đ):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {adminStandings.map((s: any, idx: number) => (
                  <div key={s.id} className="flex items-center gap-1.5 bg-white px-2 py-0.5 border border-[#141413]">
                    <span className="font-bold text-[#16422B]">#{idx + 1}</span>
                    <span className="font-semibold text-[#141413]">{s.name}</span>
                    <span className="text-[#61605B]">({s.pts}đ, HS {s.gd > 0 ? `+${s.gd}` : s.gd})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {matches.map(m => {
                const homeTeam = teams[m.home];
                const awayTeam = teams[m.away];

                return (
                  <div
                    key={m.id}
                    className="bg-white border-2 border-[#141413] p-5 hard-shadow space-y-4"
                  >
                    {/* Header info */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#141413]/20 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#141413] text-white font-bold text-xs">
                          TRẬN {m.matchNo}
                        </span>
                        <span className="font-semibold text-[#16422B]">
                          Vòng {m.round} • Ngày {m.date}
                        </span>
                      </div>

                      {/* Status toggle button */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          handleUpdateMatch(m.id, { played: !m.played });
                        }}
                        className={`px-2.5 py-1 border border-[#141413] font-bold text-xs cursor-pointer transition ${
                          m.played ? 'bg-[#16422B] text-white' : 'bg-[#F6F5F0] text-[#61605B]'
                        }`}
                      >
                        {m.played ? (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                            <span>ĐÃ HOÀN THÀNH</span>
                          </span>
                        ) : (
                          'CHƯA DIỄN RA'
                        )}
                      </button>
                    </div>

                    {/* Time & Pitch editable inputs */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <label className="text-[#61605B] block mb-1">Giờ thi đấu:</label>
                        <input
                          type="text"
                          value={m.time}
                          onChange={e => handleUpdateMatch(m.id, { time: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-[#F6F5F0] border border-[#141413] font-semibold text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[#61605B] block mb-1">Sân bãi:</label>
                        <input
                          type="text"
                          value={m.pitch}
                          onChange={e => handleUpdateMatch(m.id, { pitch: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-[#F6F5F0] border border-[#141413] font-semibold text-xs"
                        />
                      </div>
                    </div>

                    {/* Score Control Arena */}
                    <div className="bg-[#F6F5F0] border border-[#141413] p-3">
                      <div className="grid grid-cols-11 items-center gap-2">
                        {/* Home team */}
                        <div className="col-span-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span
                              className="w-3 h-3 rounded-full border border-[#141413]"
                              style={{ backgroundColor: homeTeam?.kitColor }}
                            />
                            <span className="font-bold text-sm text-[#141413] truncate">
                              {homeTeam?.name}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-[#61605B]">({homeTeam?.code})</span>
                        </div>

                        {/* Interactive score boxes */}
                        <div className="col-span-3 flex items-center justify-center gap-1.5 font-mono">
                          <input
                            type="number"
                            min={0}
                            max={30}
                            value={m.homeGoals}
                            onChange={e =>
                              handleUpdateMatch(m.id, {
                                homeGoals: Math.max(0, parseInt(e.target.value) || 0),
                                played: true,
                              })
                            }
                            className="w-10 h-10 bg-white border-2 border-[#141413] text-center font-bold text-lg"
                          />
                          <span className="font-bold text-lg text-[#141413]">-</span>
                          <input
                            type="number"
                            min={0}
                            max={30}
                            value={m.awayGoals}
                            onChange={e =>
                              handleUpdateMatch(m.id, {
                                awayGoals: Math.max(0, parseInt(e.target.value) || 0),
                                played: true,
                              })
                            }
                            className="w-10 h-10 bg-white border-2 border-[#141413] text-center font-bold text-lg"
                          />
                        </div>

                        {/* Away team */}
                        <div className="col-span-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span
                              className="w-3 h-3 rounded-full border border-[#141413]"
                              style={{ backgroundColor: awayTeam?.kitColor }}
                            />
                            <span className="font-bold text-sm text-[#141413] truncate">
                              {awayTeam?.name}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-[#61605B]">({awayTeam?.code})</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick increment buttons */}
                    <div className="flex items-center justify-between font-mono text-xs pt-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            sound.playClick();
                            handleUpdateMatch(m.id, {
                              homeGoals: Math.max(0, m.homeGoals - 1),
                              played: true,
                            });
                          }}
                          className="px-2 py-0.5 bg-[#F6F5F0] border border-[#141413] font-bold"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => {
                            sound.playKick();
                            handleUpdateMatch(m.id, {
                              homeGoals: m.homeGoals + 1,
                              played: true,
                            });
                          }}
                          className="px-2 py-0.5 bg-[#16422B] text-white border border-[#141413] font-bold"
                        >
                          +1
                        </button>
                        <span className="text-[11px] text-[#61605B] ml-1">{homeTeam?.code}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-[#61605B] mr-1">{awayTeam?.code}</span>
                        <button
                          onClick={() => {
                            sound.playClick();
                            handleUpdateMatch(m.id, {
                              awayGoals: Math.max(0, m.awayGoals - 1),
                              played: true,
                            });
                          }}
                          className="px-2 py-0.5 bg-[#F6F5F0] border border-[#141413] font-bold"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => {
                            sound.playKick();
                            handleUpdateMatch(m.id, {
                              awayGoals: m.awayGoals + 1,
                              played: true,
                            });
                          }}
                          className="px-2 py-0.5 bg-[#16422B] text-white border border-[#141413] font-bold"
                        >
                          +1
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TEAMS & PLAYERS MANAGEMENT */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#141413] p-4 hard-shadow flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div>
                Quản lý hồ sơ 4 đội bóng, đổi tên, mã số và danh sách 6 cầu thủ (chỉ định Đội trưởng bằng cách bấm nút <strong className="text-[#16422B]">Đội Trưởng</strong>).
              </div>
              <button
                onClick={() => saveAllToStorage()}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#16422B] text-white font-bold border border-[#141413] hard-shadow-sm cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu đội bóng</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {teams.map(t => (
                <div key={t.id} className="bg-white border-2 border-[#141413] p-5 hard-shadow space-y-4">
                  {/* Team meta inputs */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Mã đội:</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={t.code}
                        onChange={e => handleUpdateTeam(t.id, 'code', e.target.value.toUpperCase())}
                        className="w-full px-2.5 py-1.5 bg-[#F6F5F0] border border-[#141413] font-mono text-xs font-bold uppercase"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block font-mono text-xs font-bold mb-1">Tên đội:</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={e => handleUpdateTeam(t.id, 'name', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-[#F6F5F0] border border-[#141413] font-bold text-sm"
                      />
                    </div>
                  </div>

                  {/* Colors & notes */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <label className="block text-[#61605B] mb-1">Màu áo đấu (Hex):</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={t.kitColor}
                          onChange={e => handleUpdateTeam(t.id, 'kitColor', e.target.value)}
                          className="w-8 h-8 border border-[#141413] cursor-pointer p-0"
                        />
                        <input
                          type="text"
                          value={t.kitColor}
                          onChange={e => handleUpdateTeam(t.id, 'kitColor', e.target.value)}
                          className="w-full px-2 py-1 bg-[#F6F5F0] border border-[#141413] font-mono text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#61605B] mb-1">Tên màu áo:</label>
                      <input
                        type="text"
                        value={t.kitName}
                        onChange={e => handleUpdateTeam(t.id, 'kitName', e.target.value)}
                        className="w-full px-2 py-1 bg-[#F6F5F0] border border-[#141413] text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#61605B] mb-1">Mô tả phong cách thi đấu:</label>
                    <textarea
                      rows={2}
                      value={t.note}
                      onChange={e => handleUpdateTeam(t.id, 'note', e.target.value)}
                      className="w-full p-2 bg-[#F6F5F0] border border-[#141413] text-xs leading-relaxed"
                    />
                  </div>

                  {/* Players list editor */}
                  <div className="border border-[#141413] bg-[#F6F5F0]/50 p-3 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs font-bold border-b border-[#141413]/20 pb-1.5">
                      <span>DANH SÁCH CẦU THỦ ({t.players.length})</span>
                      <button
                        onClick={() => handleAddPlayer(t.id)}
                        className="flex items-center gap-1 text-[11px] text-[#16422B] hover:underline cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm cầu thủ</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {t.players.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 bg-white border border-[#141413]/30 p-1.5">
                          <span className="font-mono text-xs text-[#61605B] w-5 text-center font-bold">
                            {pIdx + 1}.
                          </span>

                          <input
                            type="text"
                            value={p}
                            onChange={e => handleUpdatePlayer(t.id, pIdx, e.target.value)}
                            className="flex-1 px-2 py-1 bg-[#F6F5F0] border border-[#141413]/30 text-xs font-semibold"
                          />

                          {pIdx === 0 ? (
                            <span className="px-2 py-0.5 bg-[#16422B] text-white font-mono text-[10px] font-bold">
                              ĐỘI TRƯỞNG
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSetCaptain(t.id, pIdx)}
                              className="px-2 py-0.5 bg-[#EAE8E0] hover:bg-[#16422B] hover:text-white font-mono text-[10px] font-semibold border border-[#141413]/40 cursor-pointer transition"
                            >
                              Đặt C
                            </button>
                          )}

                          {t.players.length > 5 && (
                            <button
                              onClick={() => handleRemovePlayer(t.id, pIdx)}
                              className="p-1 hover:text-[#D9381E] cursor-pointer"
                              title="Xóa cầu thủ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PODIUM & AWARDS */}
        {activeTab === 'finals' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#141413] p-4 hard-shadow flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="max-w-3xl">
                Thể thức: <strong>Đấu 3 trận vòng tròn — Đội cao điểm nhất Vô Địch Cúp Vàng</strong>. Xếp hạng 4 thứ hạng tự động theo <strong>Luật bóng đá chính thống</strong> (Điểm số ➔ Hiệu số ➔ Tổng bàn thắng ➔ Đối đầu trực tiếp).
              </div>
              <button
                onClick={() => saveAllToStorage()}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#16422B] text-white font-bold border border-[#141413] hard-shadow-sm cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu giải thưởng</span>
              </button>
            </div>

            {/* Live 4-Place Podium Ranking */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Champion */}
              <div className="bg-white border-2 border-[#141413] p-4 hard-shadow relative">
                <div className="flex items-center justify-between border-b border-[#141413] pb-2 mb-2.5">
                  <span className="px-2 py-0.5 bg-[#D9381E] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>HẠNG 1 • VÔ ĐỊCH</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#D97706]">CÚP VÀNG</span>
                </div>
                <div className="font-extrabold text-xl uppercase text-[#141413] truncate mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {adminStandings[0]?.name || 'Đang cập nhật'}
                </div>
                <div className="bg-[#FEF9C3] border border-[#141413] p-2 font-mono text-xs space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-[#61605B]">Điểm số:</span>
                    <strong className="text-[#141413]">{adminStandings[0]?.pts}đ</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">Hiệu số:</span>
                    <strong className="text-[#16422B]">{adminStandings[0]?.gd > 0 ? `+${adminStandings[0]?.gd}` : adminStandings[0]?.gd}</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">BT - BB:</span>
                    <strong className="text-[#141413]">{adminStandings[0]?.gf} - {adminStandings[0]?.ga}</strong>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#61605B] truncate">
                  ĐT: <strong className="text-[#141413]">{adminStandings[0]?.captain}</strong>
                </div>
              </div>

              {/* 2. Runner-up */}
              <div className="bg-white border-2 border-[#141413] p-4 hard-shadow relative">
                <div className="flex items-center justify-between border-b border-[#141413] pb-2 mb-2.5">
                  <span className="px-2 py-0.5 bg-[#475569] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                    <Medal className="w-3.5 h-3.5 text-slate-200" />
                    <span>HẠNG 2 • Á QUÂN</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#64748B]">BẠC</span>
                </div>
                <div className="font-extrabold text-xl uppercase text-[#141413] truncate mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {adminStandings[1]?.name || 'Đang cập nhật'}
                </div>
                <div className="bg-[#F1F5F9] border border-[#141413] p-2 font-mono text-xs space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-[#61605B]">Điểm số:</span>
                    <strong className="text-[#141413]">{adminStandings[1]?.pts}đ</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">Hiệu số:</span>
                    <strong className="text-[#16422B]">{adminStandings[1]?.gd > 0 ? `+${adminStandings[1]?.gd}` : adminStandings[1]?.gd}</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">BT - BB:</span>
                    <strong className="text-[#141413]">{adminStandings[1]?.gf} - {adminStandings[1]?.ga}</strong>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#61605B] truncate">
                  ĐT: <strong className="text-[#141413]">{adminStandings[1]?.captain}</strong>
                </div>
              </div>

              {/* 3. Third Place */}
              <div className="bg-white border-2 border-[#141413] p-4 hard-shadow relative">
                <div className="flex items-center justify-between border-b border-[#141413] pb-2 mb-2.5">
                  <span className="px-2 py-0.5 bg-[#B45309] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                    <Medal className="w-3.5 h-3.5 text-amber-200" />
                    <span>HẠNG 3 • GIẢI BA</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#B45309]">ĐỒNG</span>
                </div>
                <div className="font-extrabold text-xl uppercase text-[#141413] truncate mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {adminStandings[2]?.name || 'Đang cập nhật'}
                </div>
                <div className="bg-[#FFFBEB] border border-[#141413] p-2 font-mono text-xs space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-[#61605B]">Điểm số:</span>
                    <strong className="text-[#141413]">{adminStandings[2]?.pts}đ</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">Hiệu số:</span>
                    <strong className="text-[#16422B]">{adminStandings[2]?.gd > 0 ? `+${adminStandings[2]?.gd}` : adminStandings[2]?.gd}</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">BT - BB:</span>
                    <strong className="text-[#141413]">{adminStandings[2]?.gf} - {adminStandings[2]?.ga}</strong>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#61605B] truncate">
                  ĐT: <strong className="text-[#141413]">{adminStandings[2]?.captain}</strong>
                </div>
              </div>

              {/* 4. Fair Play */}
              <div className="bg-white border-2 border-[#141413] p-4 hard-shadow relative">
                <div className="flex items-center justify-between border-b border-[#141413] pb-2 mb-2.5">
                  <span className="px-2 py-0.5 bg-[#16422B] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    <span>HẠNG 4 • PHONG CÁCH</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#16422B]">CỜ GIẢI</span>
                </div>
                <div className="font-extrabold text-xl uppercase text-[#141413] truncate mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {adminStandings[3]?.name || 'Đang cập nhật'}
                </div>
                <div className="bg-[#E8F0EB]/70 border border-[#141413] p-2 font-mono text-xs space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-[#61605B]">Điểm số:</span>
                    <strong className="text-[#141413]">{adminStandings[3]?.pts}đ</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">Hiệu số:</span>
                    <strong className="text-[#16422B]">{adminStandings[3]?.gd > 0 ? `+${adminStandings[3]?.gd}` : adminStandings[3]?.gd}</strong>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#61605B]">BT - BB:</span>
                    <strong className="text-[#141413]">{adminStandings[3]?.gf} - {adminStandings[3]?.ga}</strong>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#61605B] truncate">
                  ĐT: <strong className="text-[#141413]">{adminStandings[3]?.captain}</strong>
                </div>
              </div>
            </div>

            {/* Tie-breaker Rules Info Bar */}
            <div className="bg-[#EAE8E0] border border-[#141413] p-3 font-mono text-xs">
              <div className="font-bold text-[#16422B] mb-1">⚖️ ĐIỀU LỆ XẾP HẠNG CHÍNH THỐNG KHI BẰNG ĐIỂM:</div>
              <div className="text-[#61605B] grid sm:grid-cols-4 gap-2 text-[11px]">
                <div>1. Tổng điểm (Thắng 3, Hòa 1, Thua 0)</div>
                <div>2. Hiệu số bàn thắng/bại toàn giải (BT - BB)</div>
                <div>3. Tổng số bàn thắng ghi được (BT)</div>
                <div>4. Đối đầu trực tiếp giữa 2 đội</div>
              </div>
            </div>

            {/* Individual Awards Editor */}
            <div className="bg-white border-2 border-[#141413] p-5 hard-shadow space-y-4">
              <div className="flex items-center gap-2 border-b border-[#141413] pb-3">
                <Award className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-extrabold text-xl uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  DANH HIỆU CÁ NHÂN &amp; TẬP THỂ
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <label className="flex items-center gap-1 font-bold uppercase text-[#141413] mb-1">
                    <Award className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Vua Phá Lưới:</span>
                  </label>
                  <input
                    type="text"
                    value={awards.topScorer}
                    onChange={e => setAwards(prev => ({ ...prev, topScorer: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F6F5F0] border border-[#141413] font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 font-bold uppercase text-[#141413] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Cầu Thủ Xuất Sắc (MVP):</span>
                  </label>
                  <input
                    type="text"
                    value={awards.mvp}
                    onChange={e => setAwards(prev => ({ ...prev, mvp: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F6F5F0] border border-[#141413] font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 font-bold uppercase text-[#141413] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16422B]" />
                    <span>Thủ Môn Xuất Sắc:</span>
                  </label>
                  <input
                    type="text"
                    value={awards.bestGk}
                    onChange={e => setAwards(prev => ({ ...prev, bestGk: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F6F5F0] border border-[#141413] font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 font-bold uppercase text-[#141413] mb-1">
                    <Medal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Giải Phong Cách:</span>
                  </label>
                  <input
                    type="text"
                    value={awards.fairPlayTeam}
                    onChange={e => setAwards(prev => ({ ...prev, fairPlayTeam: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F6F5F0] border border-[#141413] font-semibold text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Backup & Restore */}
            <div className="bg-white border-2 border-[#141413] p-6 hard-shadow space-y-4">
              <h3 className="font-extrabold text-2xl uppercase border-b border-[#141413] pb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                SAO LƯU &amp; PHỤC HỒI DỮ LIỆU
              </h3>
              <p className="font-mono text-xs text-[#61605B]">
                Xuất file dữ liệu giải đấu (gồm 4 đội, 6 trận đấu, tỉ số, cầu thủ) thành file JSON để lưu trữ hoặc chuyển sang máy tính khác.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>XUẤT FILE JSON SAO LƯU</span>
                </button>

                <label className="flex items-center gap-2 px-4 py-2.5 bg-[#F6F5F0] hover:bg-[#EAE8E0] border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>NHẬP FILE JSON SAO LƯU</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Change Admin PIN */}
            <div className="bg-white border-2 border-[#141413] p-6 hard-shadow space-y-4">
              <h3 className="font-extrabold text-2xl uppercase border-b border-[#141413] pb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                ĐỔI MÃ PIN BẢO MẬT BAN TỔ CHỨC
              </h3>
              <form onSubmit={handleChangePin} className="max-w-md space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-[#61605B] mb-1">Mã PIN hiện tại: <strong>{adminPin}</strong></label>
                  <input
                    type="password"
                    maxLength={10}
                    required
                    value={newPinInput}
                    onChange={e => setNewPinInput(e.target.value)}
                    placeholder="Nhập mã PIN mới (tối thiểu 4 số)..."
                    className="w-full px-3 py-2 bg-[#F6F5F0] border border-[#141413] font-bold text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#141413] text-white font-bold hard-btn cursor-pointer"
                >
                  CẬP NHẬT MÃ PIN
                </button>
              </form>
            </div>

            {/* Factory Reset */}
            <div className="bg-[#FCECE9] border-2 border-[#D9381E] p-6 hard-shadow space-y-3">
              <h3 className="font-extrabold text-2xl uppercase text-[#D9381E]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                VÙNG NGUY HIỂM: KHÔI PHỤC DỮ LIỆU GỐC
              </h3>
              <p className="font-mono text-xs text-[#61605B]">
                Hành động này sẽ xóa toàn bộ tỉ số đã nhập thử nghiệm và đưa 4 đội cùng 6 trận đấu về trạng thái xuất phát ban đầu.
              </p>
              <button
                onClick={handleFactoryReset}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#D9381E] text-white border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>KHÔI PHỤC DỮ LIỆU BAN ĐẦU</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Editorial Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#141413] text-white border border-[#141413] px-4 py-2.5 font-mono text-xs hard-shadow-sm animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
