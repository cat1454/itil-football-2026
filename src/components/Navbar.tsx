'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/sound';
import {
  Volume2,
  VolumeX,
  Shield,
  Trophy,
  CalendarDays,
  Users,
  Menu,
  X,
  Award,
} from 'lucide-react';

export default function Navbar() {
  const [soundOn, setSoundOn] = useState(sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundOn(sound.enabled);
    if (sound.enabled) {
      sound.playClick();
    }
  };

  const navLinks = [
    { href: '#standings-section', label: 'Bảng Xếp Hạng', icon: Trophy },
    { href: '#schedule-section', label: 'Lịch Đấu', icon: CalendarDays },
    { href: '#podium-section', label: 'Vinh Danh', icon: Trophy },
    { href: '#club-intro-section', label: 'Về CLB', icon: Shield },
    { href: '#squads-section', label: '4 Đội Bóng', icon: Users },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F6F5F0]/95 backdrop-blur-md border-b-2 border-[#141413]">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 bg-[#16422B] text-white border border-[#141413] flex items-center justify-center font-extrabold text-base sm:text-lg tracking-wider hard-shadow-sm group-hover:-translate-y-0.5 transition-transform shrink-0"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              ITIL
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className="font-extrabold text-base sm:text-lg tracking-tight uppercase text-[#141413] whitespace-nowrap"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  GIẢI BÓNG ĐÁ ITIL
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold px-1.5 py-0.2 bg-[#D97706] text-white border border-[#141413] whitespace-nowrap shadow-xs">
                  MÙA 1 • 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#61605B] font-medium -mt-0.5 truncate max-w-[180px] sm:max-w-none">
                CLB Bóng Đá Liên Chi Đoàn CNTT
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 hover:text-[#16422B] transition py-1 whitespace-nowrap text-[#141413]"
                >
                  <Icon className="w-3.5 h-3.5 text-[#16422B] shrink-0" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 sm:p-2 bg-[#F6F5F0] hover:bg-[#EAE8E0] border border-[#141413] text-xs transition cursor-pointer touch-manipulation"
              title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label="Toggle sound"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-[#16422B]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#61605B]" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-1.5 bg-white border border-[#141413] text-[#141413] cursor-pointer touch-manipulation"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#141413] px-4 py-3 space-y-2 hard-shadow font-mono text-xs animate-in slide-in-from-top-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-2 hover:bg-[#F6F5F0] border-b border-[#141413]/10 font-bold text-[#141413]"
                >
                  <Icon className="w-4 h-4 text-[#16422B]" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </header>

      {/* Floating Mobile Bottom Navigation Bar (Hidden on desktop, sticky on mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#141413] px-2 py-1.5 flex items-center justify-around font-mono text-[10px] hard-shadow select-none">
        <a
          href="#standings-section"
          className="flex flex-col items-center gap-0.5 p-1 text-[#141413] hover:text-[#16422B] active:scale-95 transition"
        >
          <Trophy className="w-4 h-4 text-[#16422B]" />
          <span>BXH</span>
        </a>
        <a
          href="#schedule-section"
          className="flex flex-col items-center gap-0.5 p-1 text-[#141413] hover:text-[#16422B] active:scale-95 transition"
        >
          <CalendarDays className="w-4 h-4 text-[#D9381E]" />
          <span>Lịch Đấu</span>
        </a>
        <a
          href="#podium-section"
          className="flex flex-col items-center gap-0.5 p-1 text-[#141413] hover:text-[#16422B] active:scale-95 transition"
        >
          <Trophy className="w-4 h-4 text-[#D97706]" />
          <span>Vinh Danh</span>
        </a>
        <a
          href="#club-intro-section"
          className="flex flex-col items-center gap-0.5 p-1 text-[#141413] hover:text-[#16422B] active:scale-95 transition"
        >
          <Shield className="w-4 h-4 text-[#16422B]" />
          <span>Về CLB</span>
        </a>
        <a
          href="#squads-section"
          className="flex flex-col items-center gap-0.5 p-1 text-[#141413] hover:text-[#16422B] active:scale-95 transition"
        >
          <Users className="w-4 h-4 text-[#16422B]" />
          <span>4 Đội</span>
        </a>
      </nav>
    </>
  );
}
