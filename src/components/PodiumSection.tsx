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
    <section id="podium-section" className="py-12 sm:py-16 border-b border-[#141413] bg-[#EAE8E0]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#D97706]" />
              <span>CƠ CẤU GIẢI THƯỞNG &amp; BẢNG VINH DANH CHUNG CUỘC</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
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
          <div className="bg-white border-2 border-[#141413] p-5 hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-[#D97706] text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                CÚP VÀNG
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-[#141413] pb-2.5 mb-3">
                <span className="px-2 py-0.5 bg-[#D9381E] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
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

              <div className="bg-[#FEF9C3] border border-[#141413] p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-[#141413] font-black">{first.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B]">{first.gd > 0 ? `+${first.gd}` : first.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B]">{first.won}</strong>/{first.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{first.captain}</strong>
            </div>
          </div>

          {/* 2. RUNNER UP */}
          <div className="bg-white border-2 border-[#141413] p-5 hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-[#64748B] text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                BẠC
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-[#141413] pb-2.5 mb-3">
                <span className="px-2 py-0.5 bg-[#475569] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5 text-slate-200" />
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

              <div className="bg-[#F1F5F9] border border-[#141413] p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-[#141413] font-black">{second.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B]">{second.gd > 0 ? `+${second.gd}` : second.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B]">{second.won}</strong>/{second.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{second.captain}</strong>
            </div>
          </div>

          {/* 3. THIRD PLACE */}
          <div className="bg-white border-2 border-[#141413] p-5 hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-[#B45309] text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                ĐỒNG
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-[#141413] pb-2.5 mb-3">
                <span className="px-2 py-0.5 bg-[#B45309] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5 text-amber-200" />
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

              <div className="bg-[#F6F5F0] border border-[#141413] p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-[#141413] font-black">{third.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B]">{third.gd > 0 ? `+${third.gd}` : third.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B]">{third.won}</strong>/{third.played}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
              <span className="text-[#61605B]">Đội trưởng:</span>
              <strong className="text-[#141413]">{third.captain}</strong>
            </div>
          </div>

          {/* 4. FAIR PLAY */}
          <div className="bg-white border-2 border-[#141413] p-5 hard-shadow flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-[#16422B] text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                CỜ GIẢI
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-[#141413] pb-2.5 mb-3">
                <span className="px-2 py-0.5 bg-[#16422B] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
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

              <div className="bg-[#E8F0EB]/60 border border-[#141413] p-2.5 mb-3 font-mono text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#61605B]">Điểm số:</span>
                  <strong className="text-base text-[#141413] font-black">{fourth.pts} điểm</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#61605B]">
                  <span>Hiệu số: <strong className="text-[#16422B]">{fourth.gd > 0 ? `+${fourth.gd}` : fourth.gd}</strong></span>
                  <span>Thắng: <strong className="text-[#16422B]">{fourth.won}</strong>/{fourth.played}</span>
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
        <div className="bg-white border-2 border-[#141413] p-5 hard-shadow">
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
