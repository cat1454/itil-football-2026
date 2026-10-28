'use client';

import React from 'react';
import { TeamStanding } from '@/types/tournament';
import { Trophy, Medal, Award, Sparkles, ShieldCheck } from 'lucide-react';

interface PodiumSectionProps {
  standings: TeamStanding[];
}

export default function PodiumSection({ standings }: PodiumSectionProps) {
  if (standings.length < 4) return null;

  const first = standings[0];
  const second = standings[1];
  const third = standings[2];
  const fourth = standings[3];

  return (
    <section id="podium-section" className="scroll-mt-16 py-10 sm:py-16 border-b border-[#141413] bg-[#EAE8E0]/40">
      <div className="w-full max-w-6xl mx-auto px-[4%] sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#D97706]" />
              <span>CƠ CẤU GIẢI THƯỞNG &amp; BẢNG VINH DANH CHUNG CUỘC</span>
            </div>
            <h2 className="font-extrabold text-[clamp(1.5rem,5.5vw,2.5rem)] uppercase tracking-tight leading-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              BỤC TRAO GIẢI ITIL 2026
            </h2>
            <p className="text-sm text-[#61605B] mt-1 max-w-2xl">
              Mỗi đội thi đấu đủ 3 trận vòng tròn. Đội đạt tổng điểm cao nhất là <strong className="text-[#141413]">Nhà Vô Địch</strong> đoạt Cúp Vàng. Nếu bằng điểm, xét theo luật chính thống: <strong className="text-[#141413]">Hiệu số bàn thắng/bại</strong> &rarr; <strong className="text-[#141413]">Tổng bàn thắng</strong> &rarr; <strong className="text-[#141413]">Đối đầu trực tiếp</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#141413] font-mono text-xs font-bold text-[#16422B] hard-shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#16422B]" />
              <span>LUẬT BÓNG ĐÁ CHÍNH THỐNG</span>
            </span>
          </div>
        </div>

        {/* 4 Team Awards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* 1. CHAMPION */}
          <div className="bg-gradient-to-b from-amber-500/10 via-white to-amber-500/[0.05] border-2 border-amber-500 ring-2 ring-amber-400/40 p-5 hard-shadow-sm sm:hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 text-[9px] font-mono font-black uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                CÚP VÀNG
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2.5 mb-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 font-mono text-xs font-black uppercase flex items-center gap-1.5 shadow-xs border border-amber-600/40">
                  <Trophy className="w-3.5 h-3.5 text-amber-950 fill-amber-700" />
                  <span>HẠNG 1 • VÔ ĐỊCH</span>
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-4 h-4 rounded-full border border-[#141413] shrink-0"
                  style={{ backgroundColor: first.kitColor }}
                />
                <h3 className="font-extrabold text-2xl uppercase text-[#141413] truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {first.name}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-amber-50 via-yellow-50/80 to-white border border-amber-300 p-2.5 mb-3 font-mono text-xs shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-amber-950 font-black">{first.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B] font-bold">{first.gd > 0 ? `+${first.gd}` : first.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B] font-bold">{first.won}</strong>/{first.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{first.captain}</strong>
            </div>
          </div>

          {/* 2. RUNNER UP */}
          <div className="bg-gradient-to-b from-slate-200/20 via-white to-slate-100/10 border-2 border-slate-400 ring-1 ring-slate-300/40 p-5 hard-shadow-sm sm:hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-gradient-to-r from-slate-400 to-slate-500 text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                BẠC
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-slate-300 pb-2.5 mb-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-800 font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-xs border border-slate-400/40">
                  <Medal className="w-3.5 h-3.5 text-slate-700 fill-slate-400" />
                  <span>HẠNG 2 • Á QUÂN</span>
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-4 h-4 rounded-full border border-[#141413] shrink-0"
                  style={{ backgroundColor: second.kitColor }}
                />
                <h3 className="font-extrabold text-2xl uppercase text-[#141413] truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {second.name}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-300 p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-slate-900 font-black">{second.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B] font-bold">{second.gd > 0 ? `+${second.gd}` : second.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B] font-bold">{second.won}</strong>/{second.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{second.captain}</strong>
            </div>
          </div>

          {/* 3. THIRD PLACE */}
          <div className="bg-gradient-to-b from-orange-500/10 via-white to-orange-500/[0.03] border-2 border-orange-500 ring-1 ring-orange-300/40 p-5 hard-shadow-sm sm:hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                ĐỒNG
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-orange-300 pb-2.5 mb-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 via-amber-600 to-orange-700 text-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-xs border border-orange-700/40">
                  <Award className="w-3.5 h-3.5 text-amber-200 fill-amber-300" />
                  <span>HẠNG 3 • GIẢI BA</span>
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-4 h-4 rounded-full border border-[#141413] shrink-0"
                  style={{ backgroundColor: third.kitColor }}
                />
                <h3 className="font-extrabold text-2xl uppercase text-[#141413] truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {third.name}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-orange-50/70 to-amber-50/50 border border-orange-300 p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-orange-950 font-black">{third.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B] font-bold">{third.gd > 0 ? `+${third.gd}` : third.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B] font-bold">{third.won}</strong>/{third.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{third.captain}</strong>
            </div>
          </div>

          {/* 4. FAIR PLAY */}
          <div className="bg-gradient-to-b from-emerald-500/10 via-white to-emerald-500/[0.03] border-2 border-emerald-600 ring-1 ring-emerald-300/40 p-5 hard-shadow-sm sm:hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                CỜ GIẢI
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-emerald-300 pb-2.5 mb-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-xs border border-emerald-800/40">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  <span>HẠNG 4 • PHONG CÁCH</span>
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-4 h-4 rounded-full border border-[#141413] shrink-0"
                  style={{ backgroundColor: fourth.kitColor }}
                />
                <h3 className="font-extrabold text-2xl uppercase text-[#141413] truncate" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {fourth.name}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-300 p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-[#16422B] font-black">{fourth.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B] font-bold">{fourth.gd > 0 ? `+${fourth.gd}` : fourth.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B] font-bold">{fourth.won}</strong>/{fourth.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{fourth.captain}</strong>
            </div>
          </div>
        </div>

        {/* Tiebreaker Rules Box */}
        <div className="bg-white border-2 border-[#141413] p-5 hard-shadow-sm sm:hard-shadow">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase text-[#16422B]">
            <ShieldCheck className="w-4 h-4" />
            <span>ĐIỀU LỆ XẾP HẠNG CHÍNH THỐNG KHI BẰNG ĐIỂM</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
              <div className="font-bold text-[#141413] mb-1">ƯU TIÊN 1: ĐIỂM SỐ</div>
              <p className="text-[#61605B]">Thắng 3 điểm, Hòa 1 điểm, Thua 0 điểm. Đội nhiều điểm hơn đứng trên.</p>
            </div>
            <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
              <div className="font-bold text-[#141413] mb-1">ƯU TIÊN 2: HIỆU SỐ (HS)</div>
              <p className="text-[#61605B]">Bằng điểm: xét Hiệu số bàn thắng trừ bàn thua (BT - BB) của 3 trận vòng tròn.</p>
            </div>
            <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
              <div className="font-bold text-[#141413] mb-1">ƯU TIÊN 3: TỔNG BÀN THẮNG</div>
              <p className="text-[#61605B]">Bằng hiệu số: đội ghi được nhiều bàn thắng hơn (BT) sẽ xếp trên.</p>
            </div>
            <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
              <div className="font-bold text-[#141413] mb-1">ƯU TIÊN 4: ĐỐI ĐẦU TRỰC TIẾP</div>
              <p className="text-[#61605B]">Bằng cả 3 chỉ số trên: xét kết quả trận đối đầu trực tiếp giữa 2 đội.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
