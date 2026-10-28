'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, Check, Flame } from 'lucide-react';
import { sound } from '@/lib/sound';

export type BgTheme = 'aurora' | 'stadium' | 'gold';

interface AnimatedBackgroundProps {
  currentTheme?: BgTheme;
  onThemeChange?: (theme: BgTheme) => void;
}

// 28 continuous upward-drifting golden spark & championship ember particles
const SPARKS = [
  { id: 1, left: '5%', size: 4, duration: '9s', delay: '0s', drift: '24px', color: '#FBBF24' },
  { id: 2, left: '12%', size: 6, duration: '11s', delay: '2.2s', drift: '-32px', color: '#F59E0B' },
  { id: 3, left: '19%', size: 5, duration: '8.5s', delay: '0.8s', drift: '28px', color: '#FEF08A' },
  { id: 4, left: '26%', size: 7, duration: '13s', delay: '3.6s', drift: '-25px', color: '#D97706' },
  { id: 5, left: '33%', size: 4, duration: '10s', delay: '0.5s', drift: '20px', color: '#FBBF24' },
  { id: 6, left: '41%', size: 6, duration: '12s', delay: '4.8s', drift: '-30px', color: '#EF4444' },
  { id: 7, left: '48%', size: 5, duration: '9.2s', delay: '1.8s', drift: '32px', color: '#10B981' },
  { id: 8, left: '56%', size: 7, duration: '14s', delay: '3.2s', drift: '-26px', color: '#FBBF24' },
  { id: 9, left: '63%', size: 4, duration: '8.2s', delay: '1.0s', drift: '24px', color: '#FEF08A' },
  { id: 10, left: '70%', size: 6, duration: '11.5s', delay: '5.5s', drift: '-28px', color: '#F59E0B' },
  { id: 11, left: '78%', size: 5, duration: '9.8s', delay: '2.7s', drift: '22px', color: '#D97706' },
  { id: 12, left: '85%', size: 4, duration: '8.8s', delay: '4.1s', drift: '-20px', color: '#FBBF24' },
  { id: 13, left: '92%', size: 6, duration: '12.8s', delay: '6.4s', drift: '34px', color: '#FEF08A' },
  { id: 14, left: '8%', size: 7, duration: '10.5s', delay: '4.9s', drift: '-22px', color: '#EF4444' },
  { id: 15, left: '16%', size: 4, duration: '8.9s', delay: '7.2s', drift: '26px', color: '#FBBF24' },
  { id: 16, left: '24%', size: 6, duration: '13.2s', delay: '3.4s', drift: '-36px', color: '#F59E0B' },
  { id: 17, left: '37%', size: 5, duration: '8.1s', delay: '6.0s', drift: '24px', color: '#10B981' },
  { id: 18, left: '45%', size: 7, duration: '11.2s', delay: '8.0s', drift: '-30px', color: '#FEF08A' },
  { id: 19, left: '53%', size: 4, duration: '9.6s', delay: '3.9s', drift: '19px', color: '#FBBF24' },
  { id: 20, left: '61%', size: 6, duration: '12.4s', delay: '7.0s', drift: '-32px', color: '#D97706' },
  { id: 21, left: '69%', size: 5, duration: '9.0s', delay: '1.5s', drift: '28px', color: '#F59E0B' },
  { id: 22, left: '77%', size: 8, duration: '13.8s', delay: '8.6s', drift: '-24px', color: '#FEF08A' },
  { id: 23, left: '84%', size: 4, duration: '8.6s', delay: '5.8s', drift: '22px', color: '#FBBF24' },
  { id: 24, left: '2%', size: 6, duration: '11.4s', delay: '9.0s', drift: '-26px', color: '#EF4444' },
  { id: 25, left: '29%', size: 5, duration: '10.0s', delay: '9.5s', drift: '32px', color: '#FEF08A' },
  { id: 26, left: '50%', size: 7, duration: '12.6s', delay: '1.2s', drift: '-34px', color: '#F59E0B' },
  { id: 27, left: '74%', size: 4, duration: '8.4s', delay: '9.9s', drift: '26px', color: '#FBBF24' },
  { id: 28, left: '96%', size: 6, duration: '11.9s', delay: '2.5s', drift: '-30px', color: '#10B981' },
];

export default function AnimatedBackground({
  currentTheme: propTheme,
  onThemeChange,
}: AnimatedBackgroundProps) {
  const [theme, setTheme] = useState<BgTheme>('aurora');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sparksEnabled, setSparksEnabled] = useState(true);

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
        <div className="absolute inset-0 opacity-[0.04] sm:opacity-[0.055]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stadium-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#141413" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stadium-grid)" />
            {/* Center Circle & Penalty Arcs */}
            <circle cx="50%" cy="28%" r="190" fill="none" stroke="#141413" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="50%" cy="72%" r="230" fill="none" stroke="#141413" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        </div>

        {/* Diagonal Floodlight Beams (Top-left & Top-right) */}
        <div
          className="absolute -top-32 -left-32 w-[650px] h-[950px] pointer-events-none anim-sweep-left"
          style={{
            background:
              activeTheme === 'gold'
                ? 'radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.38), rgba(254, 240, 138, 0.16), transparent 70%)'
                : activeTheme === 'stadium'
                ? 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.4), rgba(22, 66, 43, 0.2), transparent 70%)'
                : 'radial-gradient(ellipse at top left, rgba(217, 56, 30, 0.35), rgba(245, 158, 11, 0.2), transparent 70%)',
            transformOrigin: 'top left',
          }}
        />

        <div
          className="absolute -top-32 -right-32 w-[650px] h-[950px] pointer-events-none anim-sweep-right"
          style={{
            background:
              activeTheme === 'gold'
                ? 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.38), rgba(253, 224, 71, 0.16), transparent 70%)'
                : activeTheme === 'stadium'
                ? 'radial-gradient(ellipse at top right, rgba(5, 150, 105, 0.38), rgba(16, 185, 129, 0.18), transparent 70%)'
                : 'radial-gradient(ellipse at top right, rgba(30, 64, 175, 0.36), rgba(16, 185, 129, 0.2), transparent 70%)',
            transformOrigin: 'top right',
          }}
        />

        {/* THEME 1: AURORA 4 MÀU ĐỘI BÓNG (Blazing Red, Pitch Green, Trophy Gold, Electric Blue) */}
        {activeTheme === 'aurora' && (
          <>
            {/* Red Orb - Team 1 (Top Left) */}
            <div
              className="absolute top-[6%] left-[1%] w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] rounded-full anim-orb-red"
              style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.32) 0%, rgba(217, 56, 30, 0.15) 50%, transparent 75%)',
                filter: 'blur(55px)',
              }}
            />

            {/* Green Orb - Team 2 (Top Right) */}
            <div
              className="absolute top-[16%] right-[2%] w-[380px] sm:w-[560px] h-[380px] sm:h-[560px] rounded-full anim-orb-green"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.34) 0%, rgba(5, 150, 105, 0.18) 50%, transparent 75%)',
                filter: 'blur(58px)',
              }}
            />

            {/* Gold Orb - Team 3 & Trophy (Center-Mid) */}
            <div
              className="absolute top-[44%] left-[18%] w-[400px] sm:w-[620px] h-[400px] sm:h-[620px] rounded-full anim-orb-gold"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.16) 50%, transparent 75%)',
                filter: 'blur(65px)',
              }}
            />

            {/* Blue Orb - Team 4 (Bottom Right) */}
            <div
              className="absolute top-[66%] right-[6%] w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] rounded-full anim-orb-blue"
              style={{
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.32) 0%, rgba(30, 64, 175, 0.14) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
          </>
        )}

        {/* THEME 2: SÂN CỎ ĐÊM RỰC LỬA (Stadium Night Turf & Emerald Glow) */}
        {activeTheme === 'stadium' && (
          <>
            <div
              className="absolute top-[4%] left-[8%] w-[460px] sm:w-[700px] h-[460px] sm:h-[700px] rounded-full anim-orb-green"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.38) 0%, rgba(5, 150, 105, 0.22) 50%, transparent 75%)',
                filter: 'blur(65px)',
              }}
            />
            <div
              className="absolute top-[42%] right-[4%] w-[420px] sm:w-[640px] h-[420px] sm:h-[640px] rounded-full anim-orb-gold"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(16, 185, 129, 0.18) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute top-[68%] left-[4%] w-[420px] sm:w-[660px] h-[420px] sm:h-[660px] rounded-full anim-orb-red"
              style={{
                background: 'radial-gradient(circle, rgba(22, 66, 43, 0.35) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
          </>
        )}

        {/* THEME 3: HÀO QUANG CÚP VÀNG HOÀNG KIM (Golden Championship Radiance) */}
        {activeTheme === 'gold' && (
          <>
            <div
              className="absolute top-[8%] left-[12%] w-[480px] sm:w-[750px] h-[480px] sm:h-[750px] rounded-full anim-orb-gold"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.42) 0%, rgba(217, 119, 6, 0.22) 50%, transparent 75%)',
                filter: 'blur(70px)',
              }}
            />
            <div
              className="absolute top-[48%] right-[8%] w-[440px] sm:w-[680px] h-[440px] sm:h-[680px] rounded-full anim-orb-red"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.36) 0%, rgba(217, 56, 30, 0.18) 50%, transparent 75%)',
                filter: 'blur(65px)',
              }}
            />
            <div
              className="absolute top-[72%] left-[22%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full anim-orb-green"
              style={{
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.34) 0%, rgba(245, 158, 11, 0.16) 50%, transparent 75%)',
                filter: 'blur(65px)',
              }}
            />
          </>
        )}

        {/* 2. CONTINUOUS FLOATING GOLDEN SPARKS & EMBER PARTICLES */}
        {sparksEnabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {SPARKS.map(s => (
              <div
                key={s.id}
                className="absolute rounded-full anim-spark-rise pointer-events-none"
                style={
                  {
                    left: s.left,
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    background: `radial-gradient(circle, #ffffff 15%, ${s.color} 85%)`,
                    boxShadow: `0 0 10px 2.5px ${s.color}`,
                    '--duration': s.duration,
                    '--delay': s.delay,
                    '--drift-x': s.drift,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. Interactive Background Style Switcher Floating Pill */}
      <div className="fixed bottom-20 sm:bottom-5 left-4 z-40 select-none font-mono">
        {pickerOpen ? (
          <div className="bg-white border-2 border-[#141413] p-3 hard-shadow text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 w-64">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#141413]/20 font-bold text-[#141413]">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#16422B]" />
                <span>NỀN SINH ĐỘNG</span>
              </span>
              <button
                onClick={() => setPickerOpen(false)}
                className="text-[#61605B] hover:text-[#141413] px-1 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 3 Theme Options */}
            <div className="space-y-1">
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

            {/* Sparkle Particles Toggle */}
            <div className="pt-2 border-t border-[#141413]/20 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-[#61605B]">
                <Flame className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Bụi vàng &amp; Hoa lửa</span>
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setSparksEnabled(!sparksEnabled);
                }}
                className={`px-2 py-0.5 border font-bold cursor-pointer transition ${
                  sparksEnabled
                    ? 'bg-[#16422B] text-white border-[#141413]'
                    : 'bg-[#F6F5F0] text-[#61605B] border-[#141413]/30'
                }`}
              >
                {sparksEnabled ? 'BẬT' : 'TẮT'}
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
            title="Đổi phong cách hình nền sinh động và hoa lửa"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
            <span className="hidden sm:inline">NỀN SINH ĐỘNG</span>
            <span className="sm:hidden">NỀN</span>
          </button>
        )}
      </div>
    </>
  );
}
