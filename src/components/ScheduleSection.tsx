'use client';

import React, { useState } from 'react';
import { Team, Match } from '@/types/tournament';
import { Calendar, CheckCircle2, Clock, Flame } from 'lucide-react';
import { sound } from '@/lib/sound';

interface ScheduleSectionProps {
  teams: Team[];
  matches: Match[];
}

export default function ScheduleSection({
  teams,
  matches,
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#D9381E] tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>02 // LỊCH THI ĐẤU &amp; KẾT QUẢ 6 TRẬN VÒNG TRÒN</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              3 LƯỢT TRẬN VÒNG BẢNG
            </h2>
            <p className="text-sm text-[#61605B] mt-1 max-w-2xl">
              Lịch thi đấu chính thức 3 vòng (6 trận) và tỉ số cập nhật tự động từ Ban Tổ Chức theo điều lệ giải ITIL 2026.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#141413] font-mono text-xs font-bold text-[#16422B] hard-shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16422B] animate-pulse"></span>
              <span>DỮ LIỆU ĐỒNG BỘ TRỰC TIẾP (LIVE)</span>
            </span>
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

                            <span
                              className={`px-2 py-0.5 border border-[#141413] font-bold text-[10px] ${
                                m.played
                                  ? 'bg-[#16422B] text-white'
                                  : 'bg-white text-[#61605B]'
                              }`}
                            >
                              {m.played ? (
                                <span className="inline-flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                                  <span>ĐÃ KẾT THÚC</span>
                                </span>
                              ) : (
                                'SẮP DIỄN RA'
                              )}
                            </span>
                          </div>

                          {/* Match Scoreboard Row */}
                          <div className="grid grid-cols-11 items-center gap-1 py-1">
                            {/* Home Team */}
                            <div className="col-span-4 flex items-center gap-2 min-w-0">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0"
                                style={{ backgroundColor: homeTeam?.kitColor }}
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-sm text-[#141413] truncate">
                                  {homeTeam?.name}
                                </div>
                                <div className="font-mono text-[10px] text-[#61605B]">
                                  {homeTeam?.code}
                                </div>
                              </div>
                            </div>

                            {/* Scoreboard in Center */}
                            <div className="col-span-3 text-center">
                              {m.played ? (
                                <div className="inline-flex items-center justify-center px-3 py-1 bg-white border border-[#141413] font-mono font-black text-lg text-[#141413] hard-shadow-sm">
                                  <span>{m.homeGoals}</span>
                                  <span className="mx-1 text-[#61605B]">-</span>
                                  <span>{m.awayGoals}</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center px-3 py-1 bg-[#EAE8E0] border border-[#141413] font-mono font-bold text-xs text-[#61605B]">
                                  VS
                                </div>
                              )}
                            </div>

                            {/* Away Team */}
                            <div className="col-span-4 flex items-center justify-end gap-2 text-right min-w-0">
                              <div className="min-w-0">
                                <div className="font-bold text-sm text-[#141413] truncate">
                                  {awayTeam?.name}
                                </div>
                                <div className="font-mono text-[10px] text-[#61605B]">
                                  {awayTeam?.code}
                                </div>
                              </div>
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0"
                                style={{ backgroundColor: awayTeam?.kitColor }}
                              />
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
