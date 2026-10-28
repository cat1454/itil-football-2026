'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { sound } from '@/lib/sound';
import { Play } from 'lucide-react';

export default function HeroSection() {
  const [heroGoals, setHeroGoals] = useState(0);
  const [statusText, setStatusText] = useState('Nhấn giữ & kéo quả bóng bên dưới để sút vào khung thành bên phải!');
  const [statusClass, setStatusClass] = useState('text-[#61605B]');

  const stripRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const aimLineRef = useRef<SVGLineElement>(null);
  const keeperPinRef = useRef<SVGGElement>(null);

  const keeperYRef = useRef(65);
  const isKickingRef = useRef(false);

  // Goalkeeper animation inside tactical strip
  useEffect(() => {
    if (!keeperPinRef.current) return;
    const keeperObj = { y: 40 };
    const tween = gsap.to(keeperObj, {
      y: 90,
      duration: 1.25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        keeperYRef.current = keeperObj.y;
        keeperPinRef.current?.setAttribute('transform', `translate(925, ${keeperObj.y})`);
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  // Shoot ball on tactical strip
  const shootBall = (targetY: number) => {
    if (isKickingRef.current || !stripRef.current || !ballRef.current) return;
    isKickingRef.current = true;
    sound.playKick();

    const rect = stripRef.current.getBoundingClientRect();
    const targetPxX = rect.width * 0.81;
    const targetPxY = ((targetY - 65) / 130) * rect.height;

    gsap.to(ballRef.current, {
      x: targetPxX,
      y: targetPxY,
      rotation: 720,
      duration: 0.52,
      ease: 'power2.out',
      onComplete: () => {
        const blocked = Math.abs(targetY - keeperYRef.current) < 15;
        if (!blocked) {
          sound.playGoal();
          setHeroGoals(prev => prev + 1);
          setStatusText('⚽ VÀOOO! Cú dứt điểm chuẩn xác vào góc khung thành!');
          setStatusClass('text-[#16422B] font-bold');
        } else {
          sound.playWhistle();
          setStatusText('🧤 Thủ môn GK đã cản phá! Hãy thử kéo bóng lệch góc hơn.');
          setStatusClass('text-[#D9381E] font-bold');
        }

        setTimeout(() => {
          gsap.to(ballRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              isKickingRef.current = false;
            }
          });
        }, 650);
      }
    });
  };

  const handleAutoKick = () => {
    if (isKickingRef.current) return;
    const targetY = Math.random() > 0.5 ? 45 : 85;
    shootBall(targetY);
  };

  return (
    <section id="top" className="border-b border-[#141413] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Issue Meta Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#141413] text-xs font-mono text-[#61605B]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#D9381E] text-white font-bold uppercase">
              THỂ THỨC XOAY VÒNG
            </span>
            <span className="font-semibold text-[#141413]">
              4 ĐỘI BÓNG • 3 VÒNG ĐẤU • 6 TRẬN TOÀN GIẢI
            </span>
          </div>
          <div className="font-bold text-[#141413]">
            SÂN BÓNG ĐÁ MINI • 07/11, 08/11 &amp; 14/11/2026
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h1
              className="font-extrabold text-5xl sm:text-7xl uppercase tracking-tight leading-[0.95] text-[#141413]"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              GIẢI BÓNG ĐÁ NỘI BỘ <br />
              <span className="text-[#16422B]">LIÊN CHI ĐOÀN CNTT</span>
            </h1>
            <p className="text-base sm:text-lg text-[#61605B] max-w-2xl leading-relaxed">
              Không chia bảng phức tạp — <strong className="text-[#141413]">4 đội bóng</strong> đại diện cho các khóa và Ban Chấp Hành thi đấu <strong className="text-[#141413]">vòng tròn một lượt (Round-Robin)</strong>. Mỗi đội gặp nhau đúng 1 lần qua 3 lượt trận (ngày 07/11, 08/11 và 14/11/2026) để tìm ra nhà vô địch xứng đáng nhất.
            </p>
          </div>

          {/* Tournament Fact Box */}
          <div className="lg:col-span-4 bg-white border border-[#141413] p-5 hard-shadow">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#16422B] border-b border-[#141413] pb-2 mb-3 flex justify-between">
              <span>THÔNG SỐ GIẢI ĐẤU</span>
              <span>ITIL // 2026</span>
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#141413]">04</div>
                <div className="text-[11px] text-[#61605B] uppercase">Đội Tham Dự</div>
              </div>
              <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#16422B]">03</div>
                <div className="text-[11px] text-[#61605B] uppercase">Vòng Đấu</div>
              </div>
              <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#D9381E]">06</div>
                <div className="text-[11px] text-[#61605B] uppercase">Trận Toàn Giải</div>
              </div>
              <div className="p-3 bg-[#F6F5F0] border border-[#141413]">
                <div className="text-2xl sm:text-3xl font-bold text-[#141413]">5v5</div>
                <div className="text-[11px] text-[#61605B] uppercase">Sân Cỏ Nhân Tạo</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#141413]/20 text-xs text-[#61605B] flex items-center justify-between">
              <span>Tính điểm:</span>
              <span className="font-mono font-bold text-[#141413]">Thắng 3 • Hòa 1 • Thua 0</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE TACTICAL MINI PITCH STRIP */}
        <div className="mt-10 bg-white border border-[#141413] hard-shadow overflow-hidden">
          <div className="px-4 py-2.5 bg-[#EAE8E0] border-b border-[#141413] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]"></span>
              <span className="font-bold uppercase text-[#141413]">SA BÀN CHIẾN THUẬT MINI:</span>
              <span className={statusText.includes('VÀOOO') ? 'text-[#16422B] font-bold' : statusClass}>
                {statusText}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Bàn thắng: <strong className="text-[#16422B] text-sm">{heroGoals}</strong></span>
              <button
                onClick={handleAutoKick}
                className="flex items-center gap-1 px-2.5 py-0.5 bg-white border border-[#141413] font-semibold hover:bg-[#16422B] hover:text-white transition cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>Sút Mẫu</span>
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className="relative h-28 sm:h-32 bg-[#E8F0EB] overflow-hidden select-none flex items-center"
          >
            <svg viewBox="0 0 1000 130" preserveAspectRatio="none" className="w-full h-full pointer-events-none">
              <rect x="0" y="0" width="125" height="130" fill="#DFECE4" />
              <rect x="250" y="0" width="125" height="130" fill="#DFECE4" />
              <rect x="500" y="0" width="125" height="130" fill="#DFECE4" />
              <rect x="750" y="0" width="125" height="130" fill="#DFECE4" />

              <rect x="12" y="10" width="976" height="110" fill="none" stroke="#16422B" strokeWidth="2" opacity="0.45" />
              <line x1="500" y1="10" x2="500" y2="120" stroke="#16422B" strokeWidth="2" opacity="0.45" />
              <circle cx="500" cy="65" r="34" fill="none" stroke="#16422B" strokeWidth="2" opacity="0.45" />
              <circle cx="150" cy="65" r="4" fill="#16422B" />

              <rect x="840" y="24" width="148" height="82" fill="none" stroke="#16422B" strokeWidth="2" opacity="0.55" />
              <rect x="955" y="36" width="32" height="58" fill="#FFFFFF" stroke="#141413" strokeWidth="2.5" />
              <line x1="965" y1="36" x2="965" y2="94" stroke="#141413" strokeWidth="0.7" opacity="0.35" />
              <line x1="975" y1="36" x2="975" y2="94" stroke="#141413" strokeWidth="0.7" opacity="0.35" />
              <line x1="955" y1="55" x2="987" y2="55" stroke="#141413" strokeWidth="0.7" opacity="0.35" />
              <line x1="955" y1="75" x2="987" y2="75" stroke="#141413" strokeWidth="0.7" opacity="0.35" />

              <line ref={aimLineRef} x1="150" y1="65" x2="400" y2="65" stroke="#D9381E" strokeWidth="2.5" strokeDasharray="6 5" opacity="0" />

              <g ref={keeperPinRef} transform="translate(925, 65)">
                <circle r="13" fill="#D9381E" stroke="#141413" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700">GK</text>
              </g>
            </svg>

            {/* Clickable ball on pitch */}
            <div
              ref={ballRef}
              onClick={handleAutoKick}
              className="absolute left-[15%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              title="Bấm để sút bóng vào khung thành!"
            >
              <svg className="w-10 h-10 drop-shadow" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="21" fill="#FFFFFF" stroke="#141413" strokeWidth="2.5" />
                <polygon points="24,14 33,20 29.5,31 18.5,31 15,20" fill="#141413" />
                <path d="M24,14 L24,3.5 M33,20 L43.5,16.5 M29.5,31 L37,40 M18.5,31 L11,40 M15,20 L4.5,16.5" stroke="#141413" strokeWidth="2.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
