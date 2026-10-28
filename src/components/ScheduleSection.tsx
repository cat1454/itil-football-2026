'use client';

import React, { useState } from 'react';
import { Team, Match } from '@/types/tournament';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, RotateCcw, Calendar, CheckCircle2, Clock, Flame } from 'lucide-react';
import { sound } from '@/lib/sound';

interface ScheduleSectionProps {
  teams: Team[];
  matches: Match[];
  onAdjustScore: (matchId: string, side: 'home' | 'away', delta: number) => void;
  onTogglePlayed: (matchId: string) => void;
  onSimulateAll: () => void;
  onResetMatches: () => void;
}

export default function ScheduleSection({
  teams,
  matches,
  onAdjustScore,
  onTogglePlayed,
  onSimulateAll,
  onResetMatches,
}: ScheduleSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 1 | 2 | 3>('all');

  const roundTitles: Record<number, string> = {
    1: 'VÒNG 1 • 07/11',
    2: 'VÒNG 2 • 08/11',
    3: 'VÒNG 3 • 14/11',
  };

  const roundSubtitles: Record<number, string> = {
    1: '07/11/2026 • 19:30 & 20:15',
    2: '08/11/2026 • 19:30 & 20:15',
    3: '14/11/2026 • 18:30 (Quyết định)',
  };

  const displayedRounds = activeFilter === 'all' ? [1, 2, 3] : [activeFilter];

  return (
    <section id="schedule-section" className="py-12 sm:py-16 border-b border-[#141413]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header & Simulator Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#D9381E] tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>02 // LỊCH THI ĐẤU &amp; BỘ GIẢ LẬP TỈ SỐ</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              3 LƯỢT TRẬN VÒNG TRÒN (6 TRẬN)
            </h2>
            <p className="text-sm text-[#61605B] mt-1 max-w-2xl">
              Nhấn nút <code className="font-mono px-1.5 py-0.5 bg-[#EAE8E0] border border-[#141413] text-[#141413] font-bold">+</code> / <code className="font-mono px-1.5 py-0.5 bg-[#EAE8E0] border border-[#141413] text-[#141413] font-bold">-</code> hoặc nút <strong className="text-[#141413]">ĐÃ ĐÁ</strong> để thử nghiệm biến động bảng xếp hạng ngay lập tức.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                sound.playWhistle();
                onSimulateAll();
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer"
            >
              <Dices className="w-4 h-4" />
              <span>GIẢ LẬP 6 TRẬN</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onResetMatches();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#141413] border border-[#141413] font-mono text-xs font-semibold hard-btn cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#61605B]" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Round Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-[#141413]/20 font-mono text-xs">
          {[
            { id: 'all', label: 'Tất cả (3 Vòng • 6 Trận)' },
            { id: 1, label: 'Vòng 1 • 07/11 (Trận 1 & 2)' },
            { id: 2, label: 'Vòng 2 • 08/11 (Trận 3 & 4)' },
            { id: 3, label: 'Vòng 3 • 14/11 (Trận 5 & 6)' },
          ].map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveFilter(tab.id as 'all' | 1 | 2 | 3);
                }}
                className={`relative px-3.5 py-1.5 border border-[#141413] font-bold shrink-0 transition cursor-pointer ${
                  isActive ? 'bg-[#141413] text-white' : 'bg-white text-[#141413] hover:bg-[#EAE8E0]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3 Rounds Grid */}
        <div className={activeFilter === 'all' ? 'grid md:grid-cols-3 gap-6' : 'grid md:grid-cols-1 max-w-xl mx-auto gap-6'}>
          {displayedRounds.map(rNum => {
            const roundMatches = matches.filter(m => m.round === rNum);

            return (
              <div key={rNum} className="bg-white border border-[#141413] hard-shadow flex flex-col justify-between">
                <div>
                  {/* Round Header */}
                  <div className="px-4 py-3 bg-[#EAE8E0] border-b border-[#141413] flex items-center justify-between font-mono">
                    <div>
                      <span className="font-bold text-sm uppercase text-[#141413]">{roundTitles[rNum]}</span>
                      <div className="text-[10px] text-[#61605B]">{roundSubtitles[rNum]}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 bg-[#F6F5F0] border border-[#141413]">
                      02 Trận
                    </span>
                  </div>

                  {/* Matches List */}
                  <div className="p-4 space-y-4">
                    {roundMatches.map(m => {
                      const homeTeam = teams[m.home];
                      const awayTeam = teams[m.away];

                      return (
                        <div
                          key={m.id}
                          id={`matchCard-${m.id}`}
                          className="p-4 bg-[#F6F5F0] border border-[#141413] transition hover:border-[#16422B]"
                        >
                          {/* Match Info Bar */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#61605B] pb-2.5 mb-3 border-b border-[#141413]/20">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 bg-[#141413] text-white font-bold text-[10px] tracking-wider">
                                TRẬN {m.matchNo}
                              </span>
                              <span className="font-semibold text-[#141413] flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#16422B]" />
                                {m.time}
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                sound.playClick();
                                onTogglePlayed(m.id);
                              }}
                              className={`px-2 py-0.5 border border-[#141413] font-bold cursor-pointer text-[10px] transition ${
                                m.played ? 'bg-[#16422B] text-white' : 'bg-white text-[#61605B] hover:bg-[#EAE8E0]'
                              }`}
                            >
                              {m.played ? (
                                <span className="inline-flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                                  <span>ĐÃ ĐÁ</span>
                                </span>
                              ) : (
                                'CHƯA ĐÁ'
                              )}
                            </button>
                          </div>

                          {/* Home Team Row */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0"
                                style={{ backgroundColor: homeTeam?.kitColor }}
                              />
                              <span className="font-bold text-sm text-[#141413] truncate">
                                {homeTeam?.name}
                              </span>
                              <span className="font-mono text-[10px] text-[#61605B]">
                                ({homeTeam?.code})
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 font-mono">
                              <button
                                onClick={() => onAdjustScore(m.id, 'home', -1)}
                                className="w-9 h-9 sm:w-8 sm:h-8 bg-white border border-[#141413] hover:bg-[#EAE8E0] active:bg-[#141413] active:text-white font-bold text-base sm:text-sm cursor-pointer transition touch-manipulation flex items-center justify-center"
                                aria-label="Giảm bàn thắng đội nhà"
                              >
                                -
                              </button>
                              <span className={`w-7 text-center font-bold text-base ${m.played ? 'text-[#141413]' : 'text-[#61605B]'}`}>
                                {m.played ? m.homeGoals : '-'}
                              </span>
                              <button
                                onClick={() => onAdjustScore(m.id, 'home', 1)}
                                className="w-9 h-9 sm:w-8 sm:h-8 bg-white border border-[#141413] hover:bg-[#EAE8E0] active:bg-[#141413] active:text-white font-bold text-base sm:text-sm cursor-pointer transition touch-manipulation flex items-center justify-center"
                                aria-label="Tăng bàn thắng đội nhà"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Away Team Row */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0"
                                style={{ backgroundColor: awayTeam?.kitColor }}
                              />
                              <span className="font-bold text-sm text-[#141413] truncate">
                                {awayTeam?.name}
                              </span>
                              <span className="font-mono text-[10px] text-[#61605B]">
                                ({awayTeam?.code})
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 font-mono">
                              <button
                                onClick={() => onAdjustScore(m.id, 'away', -1)}
                                className="w-9 h-9 sm:w-8 sm:h-8 bg-white border border-[#141413] hover:bg-[#EAE8E0] active:bg-[#141413] active:text-white font-bold text-base sm:text-sm cursor-pointer transition touch-manipulation flex items-center justify-center"
                                aria-label="Giảm bàn thắng đội khách"
                              >
                                -
                              </button>
                              <span className={`w-7 text-center font-bold text-base ${m.played ? 'text-[#141413]' : 'text-[#61605B]'}`}>
                                {m.played ? m.awayGoals : '-'}
                              </span>
                              <button
                                onClick={() => onAdjustScore(m.id, 'away', 1)}
                                className="w-9 h-9 sm:w-8 sm:h-8 bg-white border border-[#141413] hover:bg-[#EAE8E0] active:bg-[#141413] active:text-white font-bold text-base sm:text-sm cursor-pointer transition touch-manipulation flex items-center justify-center"
                                aria-label="Tăng bàn thắng đội khách"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Round Footer */}
                <div className="px-4 py-2 bg-[#F6F5F0] border-t border-[#141413] font-mono text-[11px] text-[#61605B] flex items-center justify-between">
                  <span>
                    {rNum === 3 ? (
                      <span className="inline-flex items-center gap-1 text-[#D9381E] font-bold">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Lượt trận cuối định đoạt ngôi đầu</span>
                      </span>
                    ) : (
                      `Lượt trận vòng tròn thứ ${rNum}`
                    )}
                  </span>
                  <span className="text-[#141413] font-semibold">{rNum === 3 ? '18:30 - 19:30' : '19:30 & 20:15'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
