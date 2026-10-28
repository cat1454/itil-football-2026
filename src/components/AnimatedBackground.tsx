'use client';

import React, { useState, useEffect } from 'react';

export type BgTheme = 'aurora' | 'stadium' | 'gold';

interface AnimatedBackgroundProps {
  currentTheme?: BgTheme;
  onThemeChange?: (theme: BgTheme) => void;
}

// 28 continuous upward-drifting golden spark & championship ember particles
const SPARKS = [
  { id: 1, left: '5%', size: 4, duration: '9s', delay: '0s', drift: '24px', color: '#10B981' },
  { id: 2, left: '12%', size: 6, duration: '11s', delay: '2.2s', drift: '-32px', color: '#F59E0B' },
  { id: 3, left: '19%', size: 5, duration: '8.5s', delay: '0.8s', drift: '28px', color: '#34D399' },
  { id: 4, left: '26%', size: 7, duration: '13s', delay: '3.6s', drift: '-25px', color: '#10B981' },
  { id: 5, left: '33%', size: 4, duration: '10s', delay: '0.5s', drift: '20px', color: '#FBBF24' },
  { id: 6, left: '41%', size: 6, duration: '12s', delay: '4.8s', drift: '-30px', color: '#059669' },
  { id: 7, left: '48%', size: 5, duration: '9.2s', delay: '1.8s', drift: '32px', color: '#10B981' },
  { id: 8, left: '56%', size: 7, duration: '14s', delay: '3.2s', drift: '-26px', color: '#FBBF24' },
  { id: 9, left: '63%', size: 4, duration: '8.2s', delay: '1.0s', drift: '24px', color: '#34D399' },
  { id: 10, left: '70%', size: 6, duration: '11.5s', delay: '5.5s', drift: '-28px', color: '#10B981' },
  { id: 11, left: '78%', size: 5, duration: '9.8s', delay: '2.7s', drift: '22px', color: '#F59E0B' },
  { id: 12, left: '85%', size: 4, duration: '8.8s', delay: '4.1s', drift: '-20px', color: '#10B981' },
  { id: 13, left: '92%', size: 6, duration: '12.8s', delay: '6.4s', drift: '34px', color: '#34D399' },
  { id: 14, left: '8%', size: 7, duration: '10.5s', delay: '4.9s', drift: '-22px', color: '#059669' },
  { id: 15, left: '16%', size: 4, duration: '8.9s', delay: '7.2s', drift: '26px', color: '#FBBF24' },
  { id: 16, left: '24%', size: 6, duration: '13.2s', delay: '3.4s', drift: '-36px', color: '#10B981' },
  { id: 17, left: '37%', size: 5, duration: '8.1s', delay: '6.0s', drift: '24px', color: '#34D399' },
  { id: 18, left: '45%', size: 7, duration: '11.2s', delay: '8.0s', drift: '-30px', color: '#F59E0B' },
  { id: 19, left: '53%', size: 4, duration: '9.6s', delay: '3.9s', drift: '19px', color: '#10B981' },
  { id: 20, left: '61%', size: 6, duration: '12.4s', delay: '7.0s', drift: '-32px', color: '#059669' },
  { id: 21, left: '69%', size: 5, duration: '9.0s', delay: '1.5s', drift: '28px', color: '#FBBF24' },
  { id: 22, left: '77%', size: 8, duration: '13.8s', delay: '8.6s', drift: '-24px', color: '#34D399' },
  { id: 23, left: '84%', size: 4, duration: '8.6s', delay: '5.8s', drift: '22px', color: '#10B981' },
  { id: 24, left: '2%', size: 6, duration: '11.4s', delay: '9.0s', drift: '-26px', color: '#059669' },
  { id: 25, left: '29%', size: 5, duration: '10.0s', delay: '9.5s', drift: '32px', color: '#34D399' },
  { id: 26, left: '50%', size: 7, duration: '12.6s', delay: '1.2s', drift: '-34px', color: '#10B981' },
  { id: 27, left: '74%', size: 4, duration: '8.4s', delay: '9.9s', drift: '26px', color: '#F59E0B' },
  { id: 28, left: '96%', size: 6, duration: '11.9s', delay: '2.5s', drift: '-30px', color: '#10B981' },
];

export default function AnimatedBackground({
  currentTheme: propTheme,
  onThemeChange,
}: AnimatedBackgroundProps) {
  // Green stadium tone as the permanent default
  const [theme, setTheme] = useState<BgTheme>('stadium');

  useEffect(() => {
    const saved = localStorage.getItem('itil_bg_theme') as BgTheme;
    if (saved && (saved === 'stadium' || saved === 'aurora' || saved === 'gold')) {
      setTheme(saved);
      if (onThemeChange) onThemeChange(saved);
    } else {
      setTheme('stadium');
      if (onThemeChange) onThemeChange('stadium');
    }
  }, [onThemeChange]);

  const activeTheme = propTheme || theme;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ contain: 'paint layout' }}
      aria-hidden="true"
    >
      {/* Subtle Pitch Geometry Watermark */}
      <div className="absolute inset-0 opacity-[0.045] sm:opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stadium-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#16422B" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stadium-grid)" />
          {/* Center Circle & Penalty Arcs */}
          <circle cx="50%" cy="28%" r="190" fill="none" stroke="#16422B" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="50%" cy="72%" r="230" fill="none" stroke="#16422B" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Diagonal Floodlight Beams (Top-left & Top-right) */}
      <div
        className="absolute -top-32 -left-32 w-[650px] h-[950px] pointer-events-none anim-sweep-left"
        style={{
          background:
            activeTheme === 'gold'
              ? 'radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.38), rgba(254, 240, 138, 0.16), transparent 70%)'
              : activeTheme === 'aurora'
              ? 'radial-gradient(ellipse at top left, rgba(217, 56, 30, 0.35), rgba(245, 158, 11, 0.2), transparent 70%)'
              : 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.44), rgba(22, 66, 43, 0.24), transparent 70%)',
          transformOrigin: 'top left',
        }}
      />

      <div
        className="absolute -top-32 -right-32 w-[650px] h-[950px] pointer-events-none anim-sweep-right"
        style={{
          background:
            activeTheme === 'gold'
              ? 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.38), rgba(253, 224, 71, 0.16), transparent 70%)'
              : activeTheme === 'aurora'
              ? 'radial-gradient(ellipse at top right, rgba(30, 64, 175, 0.36), rgba(16, 185, 129, 0.2), transparent 70%)'
              : 'radial-gradient(ellipse at top right, rgba(5, 150, 105, 0.42), rgba(16, 185, 129, 0.22), transparent 70%)',
          transformOrigin: 'top right',
        }}
      />

      {/* DEFAULT TONE: SÂN CỎ ĐÊM RỰC LỬA (Stadium Night Turf & Emerald Glow) */}
      {activeTheme === 'stadium' && (
        <>
          <div
            className="absolute top-[4%] left-[6%] w-[480px] sm:w-[720px] h-[480px] sm:h-[720px] rounded-full anim-orb-green"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.38) 0%, rgba(5, 150, 105, 0.22) 50%, transparent 75%)',
              filter: 'blur(65px)',
            }}
          />
          <div
            className="absolute top-[40%] right-[4%] w-[440px] sm:w-[660px] h-[440px] sm:h-[660px] rounded-full anim-orb-gold"
            style={{
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.34) 0%, rgba(16, 185, 129, 0.18) 50%, transparent 75%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute top-[68%] left-[4%] w-[440px] sm:w-[680px] h-[440px] sm:h-[680px] rounded-full anim-orb-red"
            style={{
              background: 'radial-gradient(circle, rgba(22, 66, 43, 0.38) 0%, rgba(16, 185, 129, 0.16) 50%, transparent 75%)',
              filter: 'blur(60px)',
            }}
          />
        </>
      )}

      {/* THEME 1: AURORA */}
      {activeTheme === 'aurora' && (
        <>
          <div
            className="absolute top-[6%] left-[1%] w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] rounded-full anim-orb-red"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.32) 0%, rgba(217, 56, 30, 0.15) 50%, transparent 75%)',
              filter: 'blur(55px)',
            }}
          />
          <div
            className="absolute top-[16%] right-[2%] w-[380px] sm:w-[560px] h-[380px] sm:h-[560px] rounded-full anim-orb-green"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.34) 0%, rgba(5, 150, 105, 0.18) 50%, transparent 75%)',
              filter: 'blur(58px)',
            }}
          />
          <div
            className="absolute top-[44%] left-[18%] w-[400px] sm:w-[620px] h-[400px] sm:h-[620px] rounded-full anim-orb-gold"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.16) 50%, transparent 75%)',
              filter: 'blur(65px)',
            }}
          />
          <div
            className="absolute top-[66%] right-[6%] w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] rounded-full anim-orb-blue"
            style={{
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.32) 0%, rgba(30, 64, 175, 0.14) 50%, transparent 75%)',
              filter: 'blur(60px)',
            }}
          />
        </>
      )}

      {/* THEME 3: GOLD */}
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

      {/* CONTINUOUS FLOATING GOLDEN SPARKS & EMBER PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SPARKS.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute rounded-full anim-spark-rise pointer-events-none ${
              idx >= 12 ? 'hidden sm:block' : ''
            }`}
            style={
              {
                left: s.left,
                width: `${s.size}px`,
                height: `${s.size}px`,
                background: `radial-gradient(circle, #ffffff 15%, ${s.color} 85%)`,
                boxShadow: `0 0 10px 2px ${s.color}`,
                '--duration': s.duration,
                '--delay': s.delay,
                '--drift-x': s.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
