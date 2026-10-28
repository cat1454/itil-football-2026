'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamStanding } from '@/types/tournament';
import {
  Trophy,
  Award,
  TrendingUp,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  CheckCircle2,
  Minus,
  XCircle,
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface StandingsTableProps {
  standings: TeamStanding[];
  tournamentMode: 'final' | 'direct';
  onModeChange: (mode: 'final' | 'direct') => void;
  playedCount: number;
}

export default function StandingsTable({
  standings,
  tournamentMode,
  onModeChange,
  playedCount,
}: StandingsTableProps) {
  // Mobile display mode: 'table' or 'cards'
  const [mobileDisplay, setMobileDisplay] = useState<'cards' | 'table'>('cards');

  return (
    <div className="bg-white border-2 border-[#141413] hard-shadow overflow-hidden flex flex-col justify-between">
      <div>
        {/* Table Header */}
        <div className="px-3 sm:px-4 py-3 bg-[#EAE8E0] border-b-2 border-[#141413] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#16422B]" />
            <span className="font-mono text-xs font-bold uppercase text-[#141413]">
              BẢNG XẾP HẠNG TRỰC TIẾP
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 bg-white border border-[#141413] text-[10px] font-mono text-[#16422B] font-bold shadow-xs">
              Thắng 3đ • Hòa 1đ • Thua 0đ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile View Toggle Switch */}
            <div className="flex sm:hidden items-center bg-white border border-[#141413] p-0.5 font-mono text-[10px]">
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileDisplay('cards');
                }}
                className={`px-2 py-0.5 flex items-center gap-1 font-bold ${
                  mobileDisplay === 'cards' ? 'bg-[#141413] text-white' : 'text-[#61605B]'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Thẻ</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileDisplay('table');
                }}
                className={`px-2 py-0.5 flex items-center gap-1 font-bold ${
                  mobileDisplay === 'table' ? 'bg-[#141413] text-white' : 'text-[#61605B]'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Bảng</span>
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-[#16422B] font-semibold">
              {tournamentMode === 'final' ? (
                <>
                  <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Top 2 đội vào Chung Kết</span>
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5 text-[#D9381E]" />
                  <span>Đội Hạng 1 vô địch trực tiếp</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* 1. MOBILE COMPACT CARDS VIEW (For small screens when 'cards' is selected) */}
        <div className={`sm:hidden p-3 space-y-2.5 ${mobileDisplay === 'table' ? 'hidden' : 'block'}`}>
          <div className="bg-[#E8F0EB] border border-[#141413] px-2.5 py-1.5 font-mono text-[10px] text-[#16422B] font-bold flex items-center justify-between">
            <span>TÍNH ĐIỂM:</span>
            <span>Thắng 3đ • Hòa 1đ • Thua 0đ</span>
          </div>
          <AnimatePresence mode="popLayout">
            {standings.map((s, idx) => {
              const rank = idx + 1;
              const isTop2 = tournamentMode === 'final' ? rank <= 2 : rank === 1;
              const gdFormatted = s.gd > 0 ? `+${s.gd}` : `${s.gd}`;

              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className={`p-3 border-2 border-[#141413] hard-shadow-sm transition-colors ${
                    isTop2 ? 'bg-[#E8F0EB]/80' : 'bg-[#F6F5F0]'
                  }`}
                >
                  {/* Top card bar: Rank + Team + Points */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 flex items-center justify-center font-mono text-xs font-bold border border-[#141413] shadow-xs ${
                          isTop2 ? 'bg-[#16422B] text-white' : 'bg-white text-[#141413]'
                        }`}
                      >
                        {rank}
                      </span>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0"
                        style={{ backgroundColor: s.kitColor }}
                      />
                      <div>
                        <div className="font-bold text-sm text-[#141413] flex items-center gap-1">
                          <span>{s.name}</span>
                          {rank === 1 && <Award className="w-3.5 h-3.5 text-amber-600 inline" />}
                        </div>
                        <span className="font-mono text-[10px] text-[#61605B]">({s.code})</span>
                      </div>
                    </div>

                    {/* Big Bold Points Badge */}
                    <div className="text-right">
                      <div className="font-mono text-[10px] uppercase text-[#61605B] font-semibold">Điểm</div>
                      <div className="font-mono font-black text-xl text-[#141413] leading-none">
                        {s.pts}
                      </div>
                    </div>
                  </div>

                  {/* Quick stats chip row */}
                  <div className="grid grid-cols-4 gap-1.5 py-1.5 px-2 bg-white/80 border border-[#141413]/30 font-mono text-[11px] text-center mb-2">
                    <div>
                      <div className="text-[9px] text-[#61605B]">ĐÁ</div>
                      <div className="font-bold">{s.played}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#61605B]">T-H-B</div>
                      <div className="font-bold text-[#16422B]">
                        {s.won}-{s.drawn}-{s.lost}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#61605B]">BT-BB</div>
                      <div className="font-bold text-[#61605B]">{s.gf}-{s.ga}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#61605B]">HS</div>
                      <div className={`font-bold ${s.gd > 0 ? 'text-[#16422B]' : s.gd < 0 ? 'text-[#D9381E]' : 'text-[#61605B]'}`}>
                        {gdFormatted}
                      </div>
                    </div>
                  </div>

                  {/* Form & Captain */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#61605B]">
                    <span>ĐT: <strong className="text-[#141413]">{s.captain}</strong></span>
                    <div className="flex items-center gap-1">
                      <span>Phong độ:</span>
                      {[0, 1, 2].map(i => {
                        const f = s.form[i];
                        if (!f) return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413]/30 bg-white text-[9px]">-</span>;
                        if (f === 'T') return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413] bg-[#16422B] text-white font-bold text-[9px]">T</span>;
                        if (f === 'H') return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413] bg-[#EAE8E0] text-[#141413] font-bold text-[9px]">H</span>;
                        return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413] bg-[#D9381E] text-white font-bold text-[9px]">B</span>;
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 2. TABULAR VIEW (Desktop default or mobile table option) */}
        <div className={`overflow-x-auto ${mobileDisplay === 'cards' ? 'hidden sm:block' : 'block'}`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#141413] bg-[#F6F5F0] font-mono text-[11px] text-[#61605B] uppercase">
                <th className="py-3 px-3 text-center w-12">#</th>
                <th className="py-3 px-3">Đội Bóng</th>
                <th className="py-3 px-2 text-center" title="Số trận đã đá">Đá</th>
                <th className="py-3 px-2 text-center" title="Thắng">T</th>
                <th className="py-3 px-2 text-center" title="Hòa">H</th>
                <th className="py-3 px-2 text-center" title="Bại">B</th>
                <th className="py-3 px-2 text-center" title="Bàn thắng - Bàn bại">BT-BB</th>
                <th className="py-3 px-2 text-center" title="Hiệu số">HS</th>
                <th className="py-3 px-3 text-center font-bold text-[#141413]" title="Điểm số">ĐIỂM</th>
                <th className="py-3 px-3 text-right">Phong Độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141413]/15 text-sm">
              <AnimatePresence mode="popLayout">
                {standings.map((s, idx) => {
                  const rank = idx + 1;
                  const isHighlighted = tournamentMode === 'final' ? rank <= 2 : rank === 1;
                  const rowBg = isHighlighted ? 'bg-[#E8F0EB]/60 hover:bg-[#E8F0EB]' : 'bg-white hover:bg-[#EAE8E0]/40';
                  const rankBadgeClass = isHighlighted
                    ? 'bg-[#16422B] text-white border-[#141413]'
                    : 'bg-[#F6F5F0] text-[#141413] border-[#141413]';

                  const gdFormatted = s.gd > 0 ? `+${s.gd}` : `${s.gd}`;

                  return (
                    <motion.tr
                      key={s.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className={`${rowBg} transition-colors`}
                    >
                      {/* Rank Position */}
                      <td className="py-3 px-3 text-center font-mono">
                        <span className={`inline-flex w-6 h-6 items-center justify-center text-xs font-bold border ${rankBadgeClass} shadow-xs`}>
                          {rank}
                        </span>
                      </td>

                      {/* Team Name & Badge */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0 shadow-xs"
                            style={{ backgroundColor: s.kitColor }}
                          />
                          <div>
                            <div className="font-bold text-[#141413] leading-tight flex items-center gap-1.5">
                              <span>{s.name}</span>
                              {rank === 1 && <Award className="w-3.5 h-3.5 text-amber-600 inline" />}
                            </div>
                            <div className="font-mono text-[10px] text-[#61605B]">
                              {s.code} • ĐT: {s.captain}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Stats */}
                      <td className="py-3 px-2 text-center font-mono font-medium">{s.played}</td>
                      <td className="py-3 px-2 text-center font-mono text-[#16422B] font-bold">{s.won}</td>
                      <td className="py-3 px-2 text-center font-mono text-[#61605B]">{s.drawn}</td>
                      <td className="py-3 px-2 text-center font-mono text-[#D9381E]">{s.lost}</td>
                      <td className="py-3 px-2 text-center font-mono text-[#61605B]">{s.gf}-{s.ga}</td>
                      <td className={`py-3 px-2 text-center font-mono font-bold ${s.gd > 0 ? 'text-[#16422B]' : s.gd < 0 ? 'text-[#D9381E]' : 'text-[#61605B]'}`}>
                        {gdFormatted}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-black text-base text-[#141413]">
                        {s.pts}
                      </td>

                      {/* Form badges */}
                      <td className="py-3 px-3 text-right font-mono whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 justify-end">
                          {[0, 1, 2].map(i => {
                            const f = s.form[i];
                            if (!f) {
                              return (
                                <span key={i} className="inline-block w-5 h-5 text-center leading-5 border border-[#141413]/20 bg-[#F6F5F0] text-[#61605B] text-[10px]">
                                  -
                                </span>
                              );
                            }
                            if (f === 'T') {
                              return (
                                <span key={i} className="inline-block w-5 h-5 text-center leading-5 border border-[#141413] bg-[#16422B] text-white font-bold text-[10px]">
                                  T
                                </span>
                              );
                            }
                            if (f === 'H') {
                              return (
                                <span key={i} className="inline-block w-5 h-5 text-center leading-5 border border-[#141413] bg-[#EAE8E0] text-[#141413] font-bold text-[10px]">
                                  H
                                </span>
                              );
                            }
                            return (
                              <span key={i} className="inline-block w-5 h-5 text-center leading-5 border border-[#141413] bg-[#D9381E] text-white font-bold text-[10px]">
                                B
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="px-3 sm:px-4 py-3 bg-[#F6F5F0] border-t border-[#141413] font-mono text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Tiến độ: <strong className="text-[#141413]">{playedCount}/6 trận</strong></span>
          <span className="text-[#61605B] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#61605B]">Thắng: <strong className="text-[#16422B]">3đ</strong> | Hòa: <strong className="text-[#141413]">1đ</strong> | Thua: <strong className="text-[#D9381E]">0đ</strong></span>
        </div>
        {tournamentMode === 'final' ? (
          <span className="truncate">
            Chung Kết: <strong className="text-[#16422B]">{standings[0]?.name}</strong> vs <strong className="text-[#16422B]">{standings[1]?.name}</strong>
          </span>
        ) : (
          <span className="truncate">
            Ứng viên Vô Địch (#1): <strong className="text-[#D9381E]">{standings[0]?.name} ({standings[0]?.pts}đ)</strong>
          </span>
        )}
      </div>
    </div>
  );
}
