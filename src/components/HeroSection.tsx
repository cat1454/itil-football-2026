'use client';

import React from 'react';
import { Sparkles, Calendar, Shield, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="top" className="border-b border-[#141413] py-10 sm:py-14 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Issue Meta Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#141413] text-xs font-mono text-[#61605B]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#D9381E] text-white font-bold uppercase shadow-xs">
              MÙA 1 • NĂM 2026
            </span>
            <span className="font-semibold text-[#141413]">
              GIẢI ĐẤU MÙA ĐẦU TIÊN • 4 ĐỘI BÓNG • 3 VÒNG ĐẤU • 6 TRẬN
            </span>
          </div>
          <div className="font-bold text-[#141413]">
            SÂN BÓNG ĐÁ MINI • 07/11, 08/11 &amp; 14/11/2026
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#16422B] text-white font-mono text-xs font-bold uppercase tracking-wider">
              <span>🏆 GIẢI BÓNG ĐÁ ITIL — MÙA 1 (2026)</span>
            </div>
            <h1
              className="font-extrabold text-5xl sm:text-7xl uppercase tracking-tight leading-[0.95] text-[#141413]"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              GIẢI BÓNG ĐÁ NỘI BỘ <br />
              <span className="text-[#16422B]">LIÊN CHI ĐOÀN CNTT</span>
            </h1>
            <p className="text-base sm:text-lg text-[#61605B] max-w-2xl leading-relaxed">
              Mùa giải đầu tiên — <strong className="text-[#141413]">4 đội bóng</strong> đại diện cho các khóa và Ban Chấp Hành thi đấu <strong className="text-[#141413]">vòng tròn một lượt (Round-Robin)</strong>. Mỗi đội gặp nhau đúng 1 lần qua 3 lượt trận (ngày 07/11, 08/11 và 14/11/2026) để tìm ra nhà Vô Địch Mùa 1 xứng đáng nhất.
            </p>
          </div>

          {/* Tournament Fact Box */}
          <div className="lg:col-span-4 bg-white border-2 border-[#141413] p-4 sm:p-5 hard-shadow">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#16422B] border-b border-[#141413] pb-2 mb-3 flex justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>THÔNG SỐ GIẢI ĐẤU</span>
              </span>
              <span>ITIL 2026</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 font-mono">
              <div className="p-2.5 sm:p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#141413]">04</div>
                <div className="text-[10px] sm:text-[11px] text-[#61605B] uppercase font-semibold">Đội Tham Dự</div>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#16422B]">03</div>
                <div className="text-[10px] sm:text-[11px] text-[#61605B] uppercase font-semibold">Vòng Đấu</div>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#D9381E]">06</div>
                <div className="text-[10px] sm:text-[11px] text-[#61605B] uppercase font-semibold">Trận Toàn Giải</div>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#141413]">5v5</div>
                <div className="text-[10px] sm:text-[11px] text-[#61605B] uppercase font-semibold">Sân Cỏ Mini</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#141413]/20 text-xs text-[#61605B] flex items-center justify-between">
              <span>Tính điểm:</span>
              <span className="font-mono font-bold text-[#141413]">Thắng 3 • Hòa 1 • Thua 0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
