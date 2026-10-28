'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamStanding } from '@/types/tournament';
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
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
  playedCount: number;
}

export default function StandingsTable({
  standings,
  tournamentMode,
  playedCount,
}: StandingsTableProps) {
  // Mobile display mode: 'table' or 'cards'
  const [mobileDisplay, setMobileDisplay] = useState<'cards' | 'table'>('cards');

  return (
    <div className="bg-white border-2 border-[#141413] hard-shadow-sm sm:hard-shadow overflow-hidden flex flex-col justify-between">
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
              <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Đội Hạng 1 đoạt Cúp Vô Địch</span>
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

              const rankBorderAndBg =
                rank === 1
                  ? 'border-2 border-[#141413] border-l-[6px] border-l-amber-500 bg-gradient-to-r from-amber-500/10 via-amber-500/[0.03] to-white'
                  : rank === 2
                  ? 'border-2 border-[#141413] border-l-[6px] border-l-slate-400 bg-gradient-to-r from-slate-200/40 via-slate-100/20 to-white'
                  : rank === 3
                  ? 'border-2 border-[#141413] border-l-[6px] border-l-orange-500 bg-gradient-to-r from-orange-500/10 via-orange-500/[0.02] to-white'
                  : 'border-2 border-[#141413] border-l-[6px] border-l-emerald-600 bg-gradient-to-r from-emerald-500/10 via-emerald-500/[0.02] to-white';

              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className={`p-3 hard-shadow-sm transition-all ${rankBorderAndBg}`}
                >
                  {/* Top card bar: Rank + Team + Points */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      {/* Modern Rank Number Pill */}
                      {rank === 1 ? (
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-amber-400/80 border border-amber-600/30 shrink-0">
                          1
                        </span>
                      ) : rank === 2 ? (
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800 font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-slate-300 border border-slate-400/30 shrink-0">
                          2
                        </span>
                      ) : rank === 3 ? (
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-orange-300 border border-amber-800/40 shrink-0">
                          3
                        </span>
                      ) : (
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 text-[#16422B] font-bold text-xs flex items-center justify-center ring-1 ring-emerald-300 border border-emerald-400/30 shrink-0">
                          4
                        </span>
                      )}

                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0"
                        style={{ backgroundColor: s.kitColor }}
                      />
                      <div>
                        <div className="font-bold text-sm text-[#141413] flex flex-wrap items-center gap-1.5">
                          <span>{s.name}</span>
                          {/* Modern Badges */}
                          {rank === 1 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 border border-amber-500/80 text-amber-900 font-mono font-black text-[10px] tracking-wide uppercase shadow-xs">
                              <Trophy className="w-3 h-3 text-amber-600 fill-amber-400" />
                              <span>VÔ ĐỊCH</span>
                            </span>
                          )}
                          {rank === 2 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-slate-200/80 via-slate-100 to-slate-200/80 border border-slate-400/80 text-slate-800 font-mono font-bold text-[10px] tracking-wide uppercase shadow-xs">
                              <Medal className="w-3 h-3 text-slate-500 fill-slate-300" />
                              <span>Á QUÂN</span>
                            </span>
                          )}
                          {rank === 3 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500/15 via-amber-600/20 to-orange-500/15 border border-orange-500/80 text-orange-950 font-mono font-bold text-[10px] tracking-wide uppercase shadow-xs">
                              <Award className="w-3 h-3 text-orange-600 fill-orange-400" />
                              <span>GIẢI BA</span>
                            </span>
                          )}
                          {rank === 4 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/20 to-emerald-500/15 border border-emerald-500/80 text-emerald-950 font-mono font-bold text-[10px] tracking-wide uppercase shadow-xs">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              <span>PHONG CÁCH</span>
                            </span>
                          )}
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

                  {/* 3 Matches Result & Captain */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#61605B]">
                    <span>ĐT: <strong className="text-[#141413]">{s.captain}</strong></span>
                    <div className="flex items-center gap-1">
                      <span>Kết quả 3 trận:</span>
                      {[0, 1, 2].map(i => {
                        const f = s.form[i];
                        if (!f) return <span key={i} className="px-1 h-4 text-center leading-4 border border-[#141413]/30 bg-white text-[9px] text-[#61605B]" title={`Trận Vòng ${i + 1}: Chưa đá`}>V{i + 1}</span>;
                        if (f === 'T') return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413] bg-[#16422B] text-white font-bold text-[9px]" title={`Trận Vòng ${i + 1}: Thắng (3đ)`}>T</span>;
                        if (f === 'H') return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413] bg-[#EAE8E0] text-[#141413] font-bold text-[9px]" title={`Trận Vòng ${i + 1}: Hòa (1đ)`}>H</span>;
                        return <span key={i} className="w-4 h-4 text-center leading-4 border border-[#141413] bg-[#D9381E] text-white font-bold text-[9px]" title={`Trận Vòng ${i + 1}: Thua (0đ)`}>B</span>;
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
                <th className="py-3 px-2 text-center" title="Hiệu số (Bàn thắng - Bàn thua)">HS</th>
                <th className="py-3 px-3 text-center font-bold text-[#141413]" title="Điểm số">ĐIỂM</th>
                <th className="py-3 px-3 text-right" title="Kết quả 3 lượt trận (V1, V2, V3): Thắng (T) • Hòa (H) • Bại (B)">KẾT QUẢ 3 TRẬN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141413]/15 text-sm">
              <AnimatePresence mode="popLayout">
                {standings.map((s, idx) => {
                  const rank = idx + 1;
                  const rowBorderAndBg =
                    rank === 1
                      ? 'border-l-4 border-l-amber-500 bg-amber-500/[0.04] hover:bg-amber-500/[0.08]'
                      : rank === 2
                      ? 'border-l-4 border-l-slate-400 bg-slate-500/[0.02] hover:bg-slate-500/[0.06]'
                      : rank === 3
                      ? 'border-l-4 border-l-orange-500 bg-orange-500/[0.02] hover:bg-orange-500/[0.06]'
                      : 'border-l-4 border-l-emerald-600 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.06]';

                  const gdFormatted = s.gd > 0 ? `+${s.gd}` : `${s.gd}`;

                  return (
                    <motion.tr
                      key={s.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className={`${rowBorderAndBg} transition-colors`}
                    >
                      {/* Rank Position */}
                      <td className="py-3 px-3 text-center font-mono">
                        {rank === 1 ? (
                          <span className="w-7 h-7 mx-auto rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-amber-400/80 border border-amber-600/30">
                            1
                          </span>
                        ) : rank === 2 ? (
                          <span className="w-7 h-7 mx-auto rounded-lg bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800 font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-slate-300 border border-slate-400/30">
                            2
                          </span>
                        ) : rank === 3 ? (
                          <span className="w-7 h-7 mx-auto rounded-lg bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs ring-1 ring-orange-300 border border-amber-800/40">
                            3
                          </span>
                        ) : (
                          <span className="w-7 h-7 mx-auto rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 text-[#16422B] font-bold text-xs flex items-center justify-center ring-1 ring-emerald-300 border border-emerald-400/30">
                            4
                          </span>
                        )}
                      </td>

                      {/* Team Name & Badge */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#141413] shrink-0 shadow-xs"
                            style={{ backgroundColor: s.kitColor }}
                          />
                          <div>
                            <div className="font-bold text-[#141413] leading-tight flex flex-wrap items-center gap-1.5">
                              <span>{s.name}</span>
                              {rank === 1 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 border border-amber-500/80 text-amber-900 font-mono font-black text-[10px] tracking-wide uppercase shadow-xs">
                                  <Trophy className="w-3 h-3 text-amber-600 fill-amber-400" />
                                  <span>VÔ ĐỊCH</span>
                                </span>
                              )}
                              {rank === 2 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-slate-200/80 via-slate-100 to-slate-200/80 border border-slate-400/80 text-slate-800 font-mono font-bold text-[10px] tracking-wide uppercase shadow-xs">
                                  <Medal className="w-3 h-3 text-slate-500 fill-slate-300" />
                                  <span>Á QUÂN</span>
                                </span>
                              )}
                              {rank === 3 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500/15 via-amber-600/20 to-orange-500/15 border border-orange-500/80 text-orange-950 font-mono font-bold text-[10px] tracking-wide uppercase shadow-xs">
                                  <Award className="w-3 h-3 text-orange-600 fill-orange-400" />
                                  <span>GIẢI BA</span>
                                </span>
                              )}
                              {rank === 4 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/20 to-emerald-500/15 border border-emerald-500/80 text-emerald-950 font-mono font-bold text-[10px] tracking-wide uppercase shadow-xs">
                                  <Sparkles className="w-3 h-3 text-emerald-600" />
                                  <span>PHONG CÁCH</span>
                                </span>
                              )}
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

                      {/* 3 Matches Result */}
                      <td className="py-3 px-3 text-right font-mono whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 justify-end">
                          {[0, 1, 2].map(i => {
                            const f = s.form[i];
                            if (!f) {
                              return (
                                <span
                                  key={i}
                                  className="inline-block px-1.5 h-5 text-center leading-5 border border-[#141413]/25 bg-[#F6F5F0] text-[#61605B] text-[10px]"
                                  title={`Trận Vòng ${i + 1}: Chưa diễn ra`}
                                >
                                  V{i + 1}
                                </span>
                              );
                            }
                            if (f === 'T') {
                              return (
                                <span
                                  key={i}
                                  className="inline-block w-5 h-5 text-center leading-5 border border-[#141413] bg-[#16422B] text-white font-bold text-[10px]"
                                  title={`Trận Vòng ${i + 1}: Thắng (+3 điểm)`}
                                >
                                  T
                                </span>
                              );
                            }
                            if (f === 'H') {
                              return (
                                <span
                                  key={i}
                                  className="inline-block w-5 h-5 text-center leading-5 border border-[#141413] bg-[#EAE8E0] text-[#141413] font-bold text-[10px]"
                                  title={`Trận Vòng ${i + 1}: Hòa (+1 điểm)`}
                                >
                                  H
                                </span>
                              );
                            }
                            return (
                              <span
                                key={i}
                                className="inline-block w-5 h-5 text-center leading-5 border border-[#141413] bg-[#D9381E] text-white font-bold text-[10px]"
                                title={`Trận Vòng ${i + 1}: Bại (0 điểm)`}
                              >
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

        {/* Official Tiebreaker Criteria Bar */}
        <div className="bg-[#EAE8E0] border-t border-[#141413] px-3 sm:px-4 py-2 font-mono text-[10px] sm:text-[11px] text-[#141413] flex flex-wrap items-center justify-between gap-1">
          <span className="font-bold text-[#16422B] flex items-center gap-1 shrink-0">
            <span>⚖️ LUẬT BẰNG ĐIỂM:</span>
          </span>
          <span className="text-[#61605B]">
            1. Điểm số (3-1-0) &rarr; 2. Hiệu số toàn giải (BT - BB) &rarr; 3. Tổng bàn thắng (BT) &rarr; 4. Đối đầu trực tiếp
          </span>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="px-3 sm:px-4 py-3 bg-[#F6F5F0] border-t border-[#141413] font-mono text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Tiến độ: <strong className="text-[#141413]">{playedCount}/6 trận</strong></span>
          <span className="text-[#61605B] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#61605B]">Thắng: <strong className="text-[#16422B]">3đ</strong> | Hòa: <strong className="text-[#141413]">1đ</strong> | Thua: <strong className="text-[#D9381E]">0đ</strong></span>
        </div>
        <span className="truncate">
          {playedCount === 6 ? (
            <span className="text-[#16422B] font-bold">
              🏆 CHÚC MỪNG NHÀ VÔ ĐỊCH: <strong className="underline">{standings[0]?.name}</strong> ({standings[0]?.pts}đ, HS {standings[0]?.gd > 0 ? `+${standings[0]?.gd}` : standings[0]?.gd})
            </span>
          ) : (
            <span>
              Đang dẫn đầu (#1): <strong className="text-[#16422B]">{standings[0]?.name}</strong> ({standings[0]?.pts}đ)
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
