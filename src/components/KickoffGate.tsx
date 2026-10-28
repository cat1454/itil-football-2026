'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { Trophy, Smartphone, Laptop } from 'lucide-react';

interface KickoffGateProps {
  onUnlock: () => void;
  isOpen: boolean;
}

export default function KickoffGate({ onUnlock, isOpen }: KickoffGateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arenaSvgRef = useRef<SVGSVGElement>(null);
  const ballGroupRef = useRef<SVGGElement>(null);
  const ballVisualRef = useRef<SVGGElement>(null);
  const aimLayerRef = useRef<SVGGElement>(null);
  const aimVectorRef = useRef<SVGLineElement>(null);
  const pullCordRef = useRef<SVGLineElement>(null);
  const aimReticleRef = useRef<SVGCircleElement>(null);
  const keeperPinRef = useRef<SVGGElement>(null);
  const keeperBodyRef = useRef<SVGGElement>(null);
  const leftArmRef = useRef<SVGGElement>(null);
  const rightArmRef = useRef<SVGGElement>(null);
  const netMeshRef = useRef<SVGPathElement>(null);

  const keeperTweenRef = useRef<gsap.core.Tween | null>(null);
  const keeperIdleTweenRef = useRef<gsap.core.Tween | null>(null);

  const [power, setPower] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusClass, setStatusClass] = useState('text-[#61605B]');
  const [celebrating, setCelebrating] = useState(false);

  const isShootingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const keeperXRef = useRef(200);
  const dragVectorRef = useRef({ vx: 0, vy: -1, power: 0, targetX: 200, targetY: 52 });

  // Reset ball to penalty spot
  const resetBallToSpot = useCallback((msg?: string) => {
    if (msg) {
      setStatusMsg(msg);
      setStatusClass('text-[#D9381E] font-bold');
    }
    // Return keeper to upright ready stance
    if (keeperBodyRef.current) {
      gsap.to(keeperBodyRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          keeperTweenRef.current?.resume();
          keeperIdleTweenRef.current?.resume();
        }
      });
    }

    if (ballGroupRef.current && ballVisualRef.current) {
      gsap.to({ t: 0 }, {
        t: 1,
        duration: 0.35,
        onComplete: () => {
          ballGroupRef.current?.setAttribute('transform', 'translate(200, 370) scale(1)');
          ballVisualRef.current?.setAttribute('transform', 'rotate(0)');
          setPower(0);
          isShootingRef.current = false;
        }
      });
    }
  }, []);

  // Launch shot
  const launchShot = useCallback((targetX: number, targetY: number) => {
    if (isShootingRef.current) return;
    isShootingRef.current = true;
    sound.playKick();

    const ballGroup = ballGroupRef.current;
    const ballVisual = ballVisualRef.current;
    if (!ballGroup || !ballVisual) return;

    const transform = ballGroup.getAttribute('transform') || '';
    const match = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
    const startX = match ? parseFloat(match[1]) : 200;
    const startY = match ? parseFloat(match[2]) : 370;

    const ballState = { x: startX, y: startY, rot: 0, scale: 1 };

    // Goalkeeper dynamic diving reaction
    if (keeperPinRef.current && keeperBodyRef.current) {
      keeperTweenRef.current?.pause();
      keeperIdleTweenRef.current?.pause();

      const keeperCurrentX = keeperXRef.current;
      const willSave = Math.abs(targetX - keeperCurrentX) < 32;
      const diveX = willSave ? targetX : keeperCurrentX + (targetX > keeperCurrentX ? 24 : -24);
      const isDivingLeft = targetX < keeperCurrentX;
      const diveAngle = isDivingLeft ? -26 : 26;

      gsap.to(keeperPinRef.current, {
        attr: { transform: `translate(${diveX}, 74)` },
        duration: 0.42,
        ease: 'power2.out',
        onUpdate: () => {
          keeperXRef.current = diveX;
        }
      });

      gsap.to(keeperBodyRef.current, {
        rotation: diveAngle,
        y: -4,
        duration: 0.38,
        ease: 'power2.out',
      });
    }

    gsap.to(ballState, {
      x: targetX,
      y: targetY,
      rot: 720,
      scale: 0.78,
      duration: 0.46,
      ease: 'power2.out',
      onUpdate: () => {
        ballGroup.setAttribute('transform', `translate(${ballState.x}, ${ballState.y}) scale(${ballState.scale})`);
        ballVisual.setAttribute('transform', `rotate(${ballState.rot})`);
      },
      onComplete: () => {
        const hitPost = Math.abs(targetX - 120) <= 7 || Math.abs(targetX - 280) <= 7;
        const isInsideGoal = targetX > 123 && targetX < 277;
        const savedByKeeper = isInsideGoal && Math.abs(targetX - keeperXRef.current) < 22;

        if (isInsideGoal && !savedByKeeper) {
          // GOAL!
          sound.playGoal();
          sound.playWhistle();

          // Keeper beaten animation: falls to the pitch
          if (keeperBodyRef.current) {
            gsap.to(keeperBodyRef.current, {
              rotation: targetX > 200 ? 65 : -65,
              y: 8,
              duration: 0.4,
              ease: 'bounce.out'
            });
          }

          if (netMeshRef.current) {
            gsap.fromTo(
              netMeshRef.current,
              { attr: { d: 'M 120,78 L 128,28 Q 200,4 272,28 L 280,78 Z' } },
              { attr: { d: 'M 120,78 L 128,28 Q 200,28 272,28 L 280,78 Z' }, duration: 0.7, ease: 'elastic.out(1.2, 0.3)' }
            );
          }

          // Confetti explosion
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.45 },
              colors: ['#D9381E', '#16422B', '#D97706', '#F6F5F0', '#1E40AF']
            });
          } catch (_) {}

          setStatusMsg('VÀOOOOO! Cú sút cháy lưới — Chào mừng bạn đến với ITIL 2026!');
          setStatusClass('text-[#16422B] font-bold text-sm');
          setCelebrating(true);

          setTimeout(() => {
            onUnlock();
          }, 850);
        } else if (savedByKeeper) {
          // Keeper Save
          const reboundX = targetX + (targetX >= keeperXRef.current ? 45 : -45);
          gsap.to(ballState, {
            x: reboundX,
            y: 170,
            rot: 980,
            scale: 0.88,
            duration: 0.35,
            ease: 'power2.out',
            onUpdate: () => {
              ballGroup.setAttribute('transform', `translate(${ballState.x}, ${ballState.y}) scale(${ballState.scale})`);
              ballVisual.setAttribute('transform', `rotate(${ballState.rot})`);
            },
            onComplete: () => {
              resetBallToSpot('Thủ môn GK vừa cản phá! Hãy kéo bóng lái sang 2 góc xa hơn.');
            }
          });
        } else {
          // Miss or hit post
          const msg = hitPost
            ? 'Bóng dội trúng cột dọc! Căn chỉnh lại lực và góc sút nhé.'
            : 'Bóng đi chệch khung thành! Hãy hướng bóng vào giữa 2 cột gôn.';
          resetBallToSpot(msg);
        }
      }
    });
  }, [onUnlock, resetBallToSpot]);

  // Active keeper patrol, idle bounce, and gloves waving
  useEffect(() => {
    if (!keeperPinRef.current || !keeperBodyRef.current) return;

    // 1. Patrol side to side along the goal line
    const keeperState = { x: 155 };
    keeperTweenRef.current = gsap.to(keeperState, {
      x: 245,
      duration: 1.45,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        if (!isShootingRef.current) {
          keeperXRef.current = keeperState.x;
          keeperPinRef.current?.setAttribute('transform', `translate(${keeperState.x}, 72)`);
        }
      }
    });

    // 2. Active ready bounce on toes
    keeperIdleTweenRef.current = gsap.to(keeperBodyRef.current, {
      scaleY: 0.9,
      scaleX: 1.08,
      duration: 0.32,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      transformOrigin: '50% 90%'
    });

    // 3. Hands & gloves ready pumping
    let armTween: gsap.core.Tween | null = null;
    if (leftArmRef.current && rightArmRef.current) {
      armTween = gsap.to([leftArmRef.current, rightArmRef.current], {
        rotation: 16,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '0% 0%'
      });
    }

    return () => {
      keeperTweenRef.current?.kill();
      keeperIdleTweenRef.current?.kill();
      armTween?.kill();
    };
  }, []);

  // Touch & Pointer Drag Listeners
  const getSvgPoint = (clientX: number, clientY: number) => {
    if (!arenaSvgRef.current) return { x: 200, y: 370 };
    const rect = arenaSvgRef.current.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 500 / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (isShootingRef.current) return;
    const pt = getSvgPoint(e.clientX, e.clientY);
    const dist = Math.hypot(pt.x - 200, pt.y - 370);
    if (dist > 120) return;

    isDraggingRef.current = true;
    aimLayerRef.current?.setAttribute('opacity', '1');
    updateDrag(pt.x, pt.y);
  };

  const updateDrag = (svgX: number, svgY: number) => {
    const spotX = 200;
    const spotY = 370;
    const dx = svgX - spotX;
    const dy = svgY - spotY;
    const rawDist = Math.hypot(dx, dy);

    let aimTargetX = 200;
    let ballDisplayX = spotX;
    let ballDisplayY = spotY;
    let powerPct = 0;

    if (dy > 8) {
      // Slingshot pull backward
      const clamped = Math.min(rawDist, 105);
      const angle = Math.atan2(dy, dx);
      ballDisplayX = spotX + Math.cos(angle) * clamped * 0.68;
      ballDisplayY = spotY + Math.sin(angle) * clamped * 0.68;
      powerPct = Math.min(100, Math.round((clamped / 85) * 100));
      const shootVx = -dx * 2.2;
      aimTargetX = Math.max(70, Math.min(330, spotX + shootVx));
    } else {
      // Forward flick / drag
      const clamped = Math.min(rawDist, 280);
      powerPct = Math.min(100, Math.round((clamped / 130) * 100));
      ballDisplayX = Math.max(95, Math.min(305, spotX + dx * 0.45));
      ballDisplayY = Math.max(190, Math.min(370, spotY + dy * 0.45));
      const slopeX = dx * 1.35;
      aimTargetX = Math.max(70, Math.min(330, spotX + slopeX));
    }

    dragVectorRef.current = {
      power: powerPct,
      targetX: aimTargetX,
      targetY: 50,
      vx: 0,
      vy: -1
    };

    setPower(powerPct);

    ballGroupRef.current?.setAttribute('transform', `translate(${ballDisplayX}, ${ballDisplayY})`);
    pullCordRef.current?.setAttribute('x1', `${spotX}`);
    pullCordRef.current?.setAttribute('y1', `${spotY}`);
    pullCordRef.current?.setAttribute('x2', `${ballDisplayX}`);
    pullCordRef.current?.setAttribute('y2', `${ballDisplayY}`);

    aimVectorRef.current?.setAttribute('x1', `${ballDisplayX}`);
    aimVectorRef.current?.setAttribute('y1', `${ballDisplayY}`);
    aimVectorRef.current?.setAttribute('x2', `${aimTargetX}`);
    aimVectorRef.current?.setAttribute('y2', '50');

    aimReticleRef.current?.setAttribute('cx', `${aimTargetX}`);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || isShootingRef.current) return;
    const pt = getSvgPoint(e.clientX, e.clientY);
    updateDrag(pt.x, pt.y);
  };

  const onPointerUp = () => {
    if (!isDraggingRef.current || isShootingRef.current) return;
    isDraggingRef.current = false;
    aimLayerRef.current?.setAttribute('opacity', '0');

    if (dragVectorRef.current.power < 15) {
      resetBallToSpot('Kéo bóng dứt khoát hơn một chút để sút vào gôn!');
      return;
    }

    launchShot(dragVectorRef.current.targetX, 50);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 h-[100dvh] z-[999] bg-[#F6F5F0] flex flex-col justify-between border-b-4 border-[#141413] select-none touch-none transition-transform duration-500 overflow-hidden"
    >
      {/* Top Editorial Gate Bar */}
      <div className="border-b-2 border-[#141413] bg-white px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#16422B] text-white font-bold text-xs sm:text-sm tracking-wider border border-[#141413]">
            ITIL 2026
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-[#141413] truncate">
            CỔNG KHAI MẠC GIẢI BÓNG ĐÁ LCĐ
          </span>
        </div>
        <button
          onClick={() => {
            sound.playWhistle();
            onUnlock();
          }}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-[#F6F5F0] hover:bg-[#EAE8E0] border border-[#141413] font-mono text-[11px] font-bold transition cursor-pointer touch-manipulation shrink-0"
        >
          <span>Bỏ qua</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Center Interactive Pitch Arena */}
      <div className="flex-1 flex flex-col items-center justify-between max-w-3xl w-full mx-auto px-3 sm:px-6 py-2 sm:py-3 min-h-0">
        {/* Instruction Header */}
        <div className="text-center space-y-1 shrink-0 mb-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#EAE8E0] border border-[#141413] font-mono text-[10px] sm:text-xs font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D9381E] animate-ping"></span>
            <span>SÚT BÓNG VÀO LƯỚI ĐỂ MỞ TRANG GIẢI ĐẤU</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#141413] leading-none" style={{ fontFamily: 'Oswald, sans-serif' }}>
            KÉO &amp; THẢ QUẢ BÓNG VÀO KHUNG THÀNH
          </h2>
          {statusMsg ? (
            <p className={`font-mono text-[11px] sm:text-xs ${statusClass}`}>
              {statusMsg}
            </p>
          ) : (
            <div className="font-mono text-[11px] sm:text-xs text-[#61605B] flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-[#141413]">
                <Laptop className="w-3.5 h-3.5 text-[#16422B]" />
                <span>Laptop: Giữ chuột kéo bóng</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#141413]">
                <Smartphone className="w-3.5 h-3.5 text-[#D9381E]" />
                <span>Điện thoại: Vuốt bóng vào lưới</span>
              </span>
            </div>
          )}
        </div>

        {/* Interactive Penalty Pitch Box */}
        <div
          className="relative w-full flex-1 max-h-[500px] bg-[#16422B] border-2 border-[#141413] hard-shadow overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <svg
            ref={arenaSvgRef}
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full pointer-events-none"
          >
            {/* Turf Horizontal Stripes */}
            <rect x="0" y="0" width="400" height="500" fill="#16422B" />
            <rect x="0" y="0" width="400" height="62" fill="#1A4B31" />
            <rect x="0" y="124" width="400" height="62" fill="#1A4B31" />
            <rect x="0" y="248" width="400" height="62" fill="#1A4B31" />
            <rect x="0" y="372" width="400" height="62" fill="#1A4B31" />

            {/* Boundary Chalk Lines */}
            <line x1="20" y1="78" x2="380" y2="78" stroke="#F6F5F0" strokeWidth="2.5" opacity="0.85" />
            <line x1="20" y1="78" x2="20" y2="485" stroke="#F6F5F0" strokeWidth="2" opacity="0.5" />
            <line x1="380" y1="78" x2="380" y2="485" stroke="#F6F5F0" strokeWidth="2" opacity="0.5" />

            {/* Penalty Area & 6-Yard Box */}
            <rect x="65" y="78" width="270" height="175" fill="none" stroke="#F6F5F0" strokeWidth="2" opacity="0.7" />
            <rect x="115" y="78" width="170" height="68" fill="none" stroke="#F6F5F0" strokeWidth="1.8" opacity="0.6" />
            <path d="M 145 253 A 65 65 0 0 0 255 253" fill="none" stroke="#F6F5F0" strokeWidth="2" opacity="0.7" />

            {/* Goal Net Structure */}
            <g id="introGoalGroup">
              <path
                ref={netMeshRef}
                d="M 120,78 L 128,28 Q 200,28 272,28 L 280,78 Z"
                fill="rgba(246, 245, 240, 0.16)"
                stroke="#F6F5F0"
                strokeWidth="1.5"
              />
              <g stroke="#F6F5F0" strokeWidth="0.8" opacity="0.45">
                <line x1="145" y1="28" x2="142" y2="78" />
                <line x1="172" y1="28" x2="170" y2="78" />
                <line x1="200" y1="28" x2="200" y2="78" />
                <line x1="228" y1="28" x2="230" y2="78" />
                <line x1="255" y1="28" x2="258" y2="78" />
                <line x1="125" y1="44" x2="275" y2="44" />
                <line x1="123" y1="60" x2="277" y2="60" />
              </g>
              <path d="M 120,80 L 120,26 L 280,26 L 280,80" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="square" />
              <path d="M 120,80 L 120,26 L 280,26 L 280,80" fill="none" stroke="#D9381E" strokeWidth="5" strokeDasharray="12 12" />
              <circle cx="120" cy="78" r="4.5" fill="#FFFFFF" stroke="#141413" strokeWidth="1.5" />
              <circle cx="280" cy="78" r="4.5" fill="#FFFFFF" stroke="#141413" strokeWidth="1.5" />
            </g>

            {/* Fully Animated Goalkeeper with Arms, Gloves & Stance */}
            <g ref={keeperPinRef} transform="translate(200, 72)" className="select-none pointer-events-none">
              {/* Keeper Shadow */}
              <ellipse cx="0" cy="20" rx="20" ry="6" fill="rgba(20, 20, 19, 0.4)" />

              {/* Animated Keeper Body */}
              <g ref={keeperBodyRef}>
                {/* Legs & Cleats */}
                <line x1="-6" y1="8" x2="-8" y2="18" stroke="#141413" strokeWidth="3" strokeLinecap="round" />
                <line x1="6" y1="8" x2="8" y2="18" stroke="#141413" strokeWidth="3" strokeLinecap="round" />
                <rect x="-11" y="16" width="6" height="3.5" rx="1.5" fill="#EAB308" stroke="#141413" strokeWidth="1" />
                <rect x="5" y="16" width="6" height="3.5" rx="1.5" fill="#EAB308" stroke="#141413" strokeWidth="1" />

                {/* Torso & GK Jersey (Neon Amber/Yellow) */}
                <path
                  d="M -12,2 L -14,12 L 14,12 L 12,2 Z"
                  fill="#F59E0B"
                  stroke="#141413"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <rect x="-9" y="-2" width="18" height="14" rx="3" fill="#FBBF24" stroke="#141413" strokeWidth="2" />
                <text x="0" y="8" textAnchor="middle" fill="#141413" fontFamily="Oswald, sans-serif" fontSize="9" fontWeight="900">1</text>

                {/* Left Arm & Glove */}
                <g ref={leftArmRef}>
                  <line x1="-8" y1="0" x2="-20" y2="-4" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="-21" cy="-4" r="5.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="-21" cy="-4" r="2.5" fill="#FFFFFF" />
                </g>

                {/* Right Arm & Glove */}
                <g ref={rightArmRef}>
                  <line x1="8" y1="0" x2="20" y2="-4" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="21" cy="-4" r="5.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="21" cy="-4" r="2.5" fill="#FFFFFF" />
                </g>

                {/* Head & Headband */}
                <circle cx="0" cy="-9" r="8.5" fill="#FDE68A" stroke="#141413" strokeWidth="2" />
                <path d="M -8,-11 Q 0,-14 8,-11" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Eyes focused on ball */}
                <circle cx="-2.5" cy="-8" r="1.5" fill="#141413" />
                <circle cx="2.5" cy="-8" r="1.5" fill="#141413" />
              </g>
            </g>

            {/* Aiming Layer */}
            <g ref={aimLayerRef} opacity="0">
              <line ref={aimVectorRef} x1="200" y1="370" x2="200" y2="60" stroke="#F6F5F0" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
              <line ref={pullCordRef} x1="200" y1="370" x2="200" y2="370" stroke="#D9381E" strokeWidth="2.5" />
              <circle ref={aimReticleRef} cx="200" cy="60" r="11" fill="rgba(217, 56, 30, 0.35)" stroke="#F6F5F0" strokeWidth="2" />
            </g>

            {/* Spot Marker & Pulse Ring */}
            <circle cx="200" cy="370" r="6" fill="#F6F5F0" opacity="0.85" />
            <circle cx="200" cy="370" r="28" fill="none" stroke="#F6F5F0" strokeWidth="2" className="pulse-ring-anim" style={{ transformOrigin: '200px 370px' }} />

            {/* Ball Group */}
            <g ref={ballGroupRef} transform="translate(200, 370)" style={{ pointerEvents: 'all' }}>
              <circle cx="0" cy="0" r="44" fill="transparent" />
              <ellipse cx="4" cy="24" rx="20" ry="6.5" fill="rgba(20, 20, 19, 0.42)" />
              <g ref={ballVisualRef}>
                <circle cx="0" cy="0" r="23" fill="#FFFFFF" stroke="#141413" strokeWidth="2.5" />
                <polygon points="0,-10 9.5,-3 5.8,8 -5.8,8 -9.5,-3" fill="#141413" />
                <path d="M 0,-10 L 0,-22.5 M 9.5,-3 L 21.5,-6.5 M 5.8,8 L 15,18 M -5.8,8 L -15,18 M -9.5,-3 L -21.5,-6.5" stroke="#141413" strokeWidth="2.2" />
                <polygon points="-5.5,-22 5.5,-22 0,-16" fill="#141413" />
                <polygon points="22,-4 18.5,-12 16.5,-2.5" fill="#141413" />
                <polygon points="-22,-4 -18.5,-12 -16.5,-2.5" fill="#141413" />
                <polygon points="12,20 19,13.5 11,14" fill="#141413" />
                <polygon points="-12,20 -19,13.5 -11,14" fill="#141413" />
              </g>
            </g>
          </svg>

          {/* Power Meter Badge */}
          <div className="absolute top-3 left-3 bg-white/95 border border-[#141413] px-2.5 py-1 font-mono text-[11px] flex items-center gap-2 pointer-events-none">
            <span className="text-[#61605B]">Lực sút:</span>
            <strong className="text-[#141413]">{power}%</strong>
          </div>

          {/* Celebration Banner */}
          {celebrating && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="bg-white border-2 border-[#141413] p-6 max-w-sm w-full hard-shadow space-y-2 animate-bounce">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#D9381E] text-white font-mono text-xs font-bold uppercase">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>GOAL! // TRẬN ĐẤU BẮT ĐẦU</span>
                </div>
                <h3 className="font-extrabold text-4xl uppercase text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  VÀOOOOO! 1 - 0
                </h3>
                <p className="font-mono text-xs text-[#61605B]">
                  Đang mở cổng giải đấu ITIL 2026...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
