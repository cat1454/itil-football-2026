'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, Check } from 'lucide-react';
import { sound } from '@/lib/sound';

export type BgTheme = 'aurora' | 'stadium' | 'gold';

interface AnimatedBackgroundProps {
  currentTheme?: BgTheme;
  onThemeChange?: (theme: BgTheme) => void;
}

export default function AnimatedBackground({
  currentTheme: propTheme,
  onThemeChange,
}: AnimatedBackgroundProps) {
  const [theme, setTheme] = useState<BgTheme>('aurora');
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('itil_bg_theme') as BgTheme;
    if (saved && (saved === 'aurora' || saved === 'stadium' || saved === 'gold')) {
      setTheme(saved);
      if (onThemeChange) onThemeChange(saved);
    }
  }, [onThemeChange]);

  const activeTheme = propTheme || theme;

  const handleSelectTheme = (newTheme: BgTheme) => {
    sound.playClick();
    setTheme(newTheme);
    localStorage.setItem('itil_bg_theme', newTheme);
    if (onThemeChange) onThemeChange(newTheme);
  };

  return (
    <>
      {/* 1. Fixed Dynamic Background Canvas (Behind all content, pointer-events-none) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Subtle Pitch Geometry Watermark */}
        <div className="absolute inset-0 opacity-[0.035] sm:opacity-[0.045]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stadium-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#141413" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stadium-grid)" />
            {/* Center Circle & Penalty Arcs */}
            <circle cx="50%" cy="30%" r="180" fill="none" stroke="#141413" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="50%" cy="75%" r="220" fill="none" stroke="#141413" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        </div>

        {/* Diagonal Floodlight Beams (Top-left & Top-right) */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[900px] pointer-events-none anim-sweep-left"
          style={{
            background:
              activeTheme === 'gold'
                ? 'radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.28), rgba(254, 240, 138, 0.12), transparent 70%)'
                : activeTheme === 'stadium'
                ? 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.32), rgba(22, 66, 43, 0.15), transparent 70%)'
                : 'radial-gradient(ellipse at top left, rgba(217, 56, 30, 0.26), rgba(245, 158, 11, 0.15), transparent 70%)',
            transformOrigin: 'top left',
          }}
        />

        <div
          className="absolute -top-32 -right-32 w-[600px] h-[900px] pointer-events-none anim-sweep-right"
          style={{
            background:
              activeTheme === 'gold'
                ? 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.28), rgba(253, 224, 71, 0.12), transparent 70%)'
                : activeTheme === 'stadium'
                ? 'radial-gradient(ellipse at top right, rgba(5, 150, 105, 0.3), rgba(16, 185, 129, 0.14), transparent 70%)'
                : 'radial-gradient(ellipse at top right, rgba(30, 64, 175, 0.28), rgba(16, 185, 129, 0.16), transparent 70%)',
            transformOrigin: 'top right',
          }}
        />

        {/* THEME 1: AURORA 4 MÀU ĐỘI BÓNG (Red, Green, Amber, Blue) */}
        {activeTheme === 'aurora' && (
          <>
            {/* Red Orb - Team 1 (Top Left) */}
            <div
              className="absolute top-[8%] left-[2%] w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full anim-orb-red"
              style={{
                background: 'radial-gradient(circle, rgba(217, 56, 30, 0.22) 0%, rgba(239, 68, 68, 0.08) 50%, transparent 75%)',
                filter: 'blur(50px)',
              }}
            />

            {/* Green Orb - Team 2 (Top Right) */}
            <div
              className="absolute top-[18%] right-[3%] w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full anim-orb-green"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.24) 0%, rgba(22, 66, 43, 0.12) 50%, transparent 75%)',
                filter: 'blur(55px)',
              }}
            />

            {/* Gold Orb - Team 3 & Trophy (Center-Mid) */}
            <div
              className="absolute top-[48%] left-[20%] w-[360px] sm:w-[550px] h-[360px] sm:h-[550px] rounded-full anim-orb-gold"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.1) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Blue Orb - Team 4 (Bottom Right) */}
            <div
              className="absolute top-[68%] right-[8%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full anim-orb-blue"
              style={{
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(30, 64, 175, 0.09) 50%, transparent 75%)',
                filter: 'blur(55px)',
              }}
            />
          </>
        )}

        {/* THEME 2: SÂN CỎ ĐÊM RỰC LỬA (Stadium Night Turf & Emerald) */}
        {activeTheme === 'stadium' && (
          <>
            <div
              className="absolute top-[5%] left-[10%] w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] rounded-full anim-orb-green"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.15) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute top-[45%] right-[5%] w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] rounded-full anim-orb-gold"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 75%)',
                filter: 'blur(55px)',
              }}
            />
            <div
              className="absolute top-[70%] left-[5%] w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full anim-orb-red"
              style={{
                background: 'radial-gradient(circle, rgba(22, 66, 43, 0.25) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 75%)',
                filter: 'blur(55px)',
              }}
            />
          </>
        )}

        {/* THEME 3: HÀO QUANG CÚP VÀNG HOÀNG KIM (Golden Championship) */}
        {activeTheme === 'gold' && (
          <>
            <div
              className="absolute top-[10%] left-[15%] w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] rounded-full anim-orb-gold"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(217, 119, 6, 0.15) 50%, transparent 75%)',
                filter: 'blur(65px)',
              }}
            />
            <div
              className="absolute top-[50%] right-[10%] w-[400px] sm:w-[620px] h-[400px] sm:h-[620px] rounded-full anim-orb-red"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.26) 0%, rgba(217, 56, 30, 0.12) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute top-[75%] left-[25%] w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full anim-orb-green"
              style={{
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.24) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
          </>
        )}
      </div>

      {/* 2. Interactive Background Style Switcher Floating Pill */}
      <div className="fixed bottom-20 sm:bottom-5 left-4 z-40 select-none font-mono">
        {pickerOpen ? (
          <div className="bg-white border-2 border-[#141413] p-2.5 hard-shadow text-xs space-y-1.5 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#141413]/20 font-bold text-[#141413]">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#16422B]" />
                <span>NỀN SINH ĐỘNG</span>
              </span>
              <button
                onClick={() => setPickerOpen(false)}
                className="text-[#61605B] hover:text-[#141413] px-1 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1 pt-1">
              {/* Option 1: 4 Màu Đội Bóng */}
              <button
                onClick={() => handleSelectTheme('aurora')}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 border transition cursor-pointer ${
                  activeTheme === 'aurora'
                    ? 'bg-[#141413] text-white font-bold border-[#141413]'
                    : 'bg-[#F6F5F0] hover:bg-[#EAE8E0] text-[#141413] border-[#141413]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D9381E] border border-white" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16422B] border border-white" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] border border-white" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF] border border-white" />
                  </div>
                  <span>4 Màu Đội Bóng</span>
                </div>
                {activeTheme === 'aurora' && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              </button>

              {/* Option 2: Sân Cỏ Sân Đấu */}
              <button
                onClick={() => handleSelectTheme('stadium')}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 border transition cursor-pointer ${
                  activeTheme === 'stadium'
                    ? 'bg-[#141413] text-white font-bold border-[#141413]'
                    : 'bg-[#F6F5F0] hover:bg-[#EAE8E0] text-[#141413] border-[#141413]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-white" />
                  <span>Sân Cỏ Rực Lửa</span>
                </div>
                {activeTheme === 'stadium' && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              </button>

              {/* Option 3: Hào Quang Cúp Vàng */}
              <button
                onClick={() => handleSelectTheme('gold')}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 border transition cursor-pointer ${
                  activeTheme === 'gold'
                    ? 'bg-[#141413] text-white font-bold border-[#141413]'
                    : 'bg-[#F6F5F0] hover:bg-[#EAE8E0] text-[#141413] border-[#141413]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-white" />
                  <span>Cúp Vàng Vô Địch</span>
                </div>
                {activeTheme === 'gold' && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              sound.playClick();
              setPickerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md hover:bg-white border-2 border-[#141413] hard-shadow font-bold text-xs text-[#141413] cursor-pointer hover:-translate-y-0.5 transition"
            title="Đổi phong cách hình nền sinh động"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706] animate-spin-slow" />
            <span className="hidden sm:inline">NỀN SINH ĐỘNG</span>
            <span className="sm:hidden">NỀN</span>
          </button>
        )}
      </div>
    </>
  );
}
