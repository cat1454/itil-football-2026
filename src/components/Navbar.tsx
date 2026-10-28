'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/sound';
import { Volume2, VolumeX, Sparkles, Edit3 } from 'lucide-react';

interface NavbarProps {
  onReopenGate: () => void;
  onOpenEditModal: () => void;
}

export default function Navbar({ onReopenGate, onOpenEditModal }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(sound.enabled);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundOn(sound.enabled);
    if (sound.enabled) {
      sound.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F5F0]/95 backdrop-blur-md border-b border-[#141413]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#16422B] text-white border border-[#141413] flex items-center justify-center font-extrabold text-lg tracking-wider hard-shadow-sm group-hover:-translate-y-0.5 transition-transform" style={{ fontFamily: 'Oswald, sans-serif' }}>
            ITIL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                IT INTERNAL LEAGUE
              </span>
              <span className="hidden sm:inline-block font-mono text-[11px] font-bold px-2 py-0.5 bg-[#EAE8E0] border border-[#141413]">
                MÙA 2026
              </span>
            </div>
            <p className="text-[11px] text-[#61605B] font-medium -mt-0.5">
              CLB Bóng Đá Liên Chi Đoàn Khoa CNTT
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="#standings-section" className="hover:text-[#16422B] transition">
            Bảng Xếp Hạng &amp; Ma Trận
          </a>
          <a href="#schedule-section" className="hover:text-[#16422B] transition">
            Lịch 3 Vòng (6 Trận)
          </a>
          <a href="#finals-section" className="hover:text-[#16422B] transition">
            Ngày Chung Kết
          </a>
          <a href="#squads-section" className="hover:text-[#16422B] transition">
            4 Đội Tham Dự
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 bg-[#F6F5F0] hover:bg-[#EAE8E0] border border-[#141413] text-xs transition cursor-pointer"
            title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#16422B]" /> : <VolumeX className="w-4 h-4 text-[#61605B]" />}
          </button>

          {/* Reopen Penalty Shootout */}
          <button
            onClick={() => {
              sound.playWhistle();
              onReopenGate();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EAE8E0] hover:bg-[#D9381E] hover:text-white border border-[#141413] font-mono text-xs font-bold transition cursor-pointer"
            title="Mở lại sa bàn sút bóng phạt đền"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sút mở màn</span>
          </button>

          {/* Edit Teams Modal */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenEditModal();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ĐỔI TÊN 4 ĐỘI</span>
            <span className="sm:hidden">ĐỔI TÊN</span>
          </button>

          {/* Admin Dashboard Link */}
          <a
            href="/admin"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-[#EAE8E0] hover:bg-[#141413] hover:text-white border border-[#141413] font-mono text-xs font-bold transition hard-btn cursor-pointer"
            title="Trang quản trị Ban Tổ Chức"
          >
            <span className="w-2 h-2 rounded-full bg-[#D9381E] animate-pulse"></span>
            <span className="hidden sm:inline">BTC ADMIN</span>
            <span className="sm:hidden">BTC</span>
          </a>
        </div>
      </div>
    </header>
  );
}
