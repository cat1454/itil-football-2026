'use client';

import React from 'react';
import { Sparkles, Calendar, Shield, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="top" className="border-b border-[#141413] py-8 sm:py-14 bg-white/50">
      <div className="w-full max-w-6xl mx-auto px-[4%] sm:px-6">
        {/* Top Issue Meta Strip */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3.5 mb-5 border-b border-[#141413] text-xs font-mono text-[#61605B]">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2 py-0.5 bg-[#D9381E] text-white font-bold uppercase shadow-xs shrink-0 text-[10.5px] sm:text-xs">
              MÙA 1 • NĂM 2026
            </span>
            <span className="font-semibold text-[#141413] text-[10.5px] sm:text-xs">
              GIẢI ĐẤU ĐẦU TIÊN • 4 ĐỘI • 3 VÒNG • 6 TRẬN
            </span>
          </div>
          <div className="font-bold text-[#141413] text-[10.5px] sm:text-xs">
            SÂN BÓNG MINI • 07/11, 08/11 &amp; 14/11/2026
          </div>
        </div>

        {/* Official Cinematic Tournament Banner */}
        <div className="w-full mb-6 sm:mb-8 border-2 border-[#141413] hard-shadow-sm sm:hard-shadow overflow-hidden bg-[#071910] group">
          <img
            src="/banner.png"
            alt="ITIL FOOTBALL 2026 — Kết Nối Đam Mê - Lan Tỏa Tinh Thần IT — Liên Chi Đoàn Khoa CNTT"
            className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-500"
            loading="eager"
          />
        </div>

        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#16422B] text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>🏆 GIẢI BÓNG ĐÁ ITIL — MÙA 1 (2026)</span>
              <span className="hidden sm:inline text-[#FCD34D]">• KẾT NỐI ĐAM MÊ, LAN TỎA TINH THẦN IT</span>
            </div>
            <h1
              className="font-extrabold uppercase tracking-tight text-[#141413] text-[clamp(1.6rem,7vw,4.5rem)] leading-[1.05]"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              <span className="block whitespace-nowrap">GIẢI BÓNG ĐÁ NỘI BỘ</span>
              <span className="block text-[#16422B] whitespace-nowrap">LIÊN CHI ĐOÀN CNTT</span>
            </h1>
            <p className="text-sm sm:text-lg text-[#61605B] max-w-2xl leading-relaxed">
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
