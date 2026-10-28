'use client';

import React from 'react';
import { TeamStanding } from '@/types/tournament';
import { Trophy, Medal, Sparkles } from 'lucide-react';

interface FinalsBracketProps {
  standings: TeamStanding[];
}

export default function FinalsBracket({ standings }: FinalsBracketProps) {
  if (standings.length < 4) return null;

  const first = standings[0];
  const second = standings[1];
  const third = standings[2];
  const fourth = standings[3];

  return (
    <section id="finals-section" className="py-12 sm:py-16 border-b border-[#141413] bg-[#EAE8E0]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#D97706]" />
              <span>03 // CẶP ĐẤU NGÀY CHUNG KẾT (TỰ ĐỘNG CẬP NHẬT TỪ BXH)</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              LỊCH THI ĐẤU NGÀY BẾ MẠC &amp; TRAO GIẢI
            </h2>
            <p className="text-sm text-[#61605B] mt-1 max-w-2xl">
              Sau khi khép lại 3 vòng đấu xoay vòng (6 trận), 2 đội dẫn đầu bước vào trận Chung Kết tranh Cúp Vô Địch ITIL 2026; 2 đội xếp thứ 3 và 4 thi đấu trận Tranh Hạng Ba.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* GRAND FINAL CARD */}
          <div className="bg-white border-2 border-[#141413] p-5 sm:p-6 hard-shadow flex flex-col justify-between relative overflow-hidden group">
            {/* Gold Ribbon corner */}
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="bg-[#D97706] text-white text-[9px] font-mono font-bold uppercase text-center py-1 absolute top-3 right-[-32px] w-28 rotate-45 shadow-sm">
                CÚP VÀNG
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-[#141413] pb-3 mb-4">
                <span className="px-2.5 py-0.5 bg-[#D9381E] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>TRẬN CHUNG KẾT ITIL 2026</span>
                </span>
                <span className="font-mono text-xs text-[#61605B] font-semibold pr-6">
                  17:00 • Bế Mạc
                </span>
              </div>

              <div className="grid grid-cols-11 items-center gap-2 py-3">
                {/* Team 1 */}
                <div className="col-span-5 bg-[#F6F5F0] border border-[#141413] p-3 text-center transition group-hover:border-[#16422B]">
                  <div className="font-mono text-[10px] text-[#16422B] font-bold uppercase mb-1">
                    HẠNG 1 VÒNG TRÒN
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span
                      className="w-3 h-3 rounded-full border border-[#141413]"
                      style={{ backgroundColor: first.kitColor }}
                    />
                    <div className="font-extrabold text-lg sm:text-xl uppercase truncate text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {first.name}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#61605B]">
                    {first.pts} điểm (HS {first.gd > 0 ? `+${first.gd}` : first.gd})
                  </div>
                </div>

                <div className="col-span-1 text-center font-extrabold text-xl text-[#D9381E]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  VS
                </div>

                {/* Team 2 */}
                <div className="col-span-5 bg-[#F6F5F0] border border-[#141413] p-3 text-center transition group-hover:border-[#16422B]">
                  <div className="font-mono text-[10px] text-[#16422B] font-bold uppercase mb-1">
                    HẠNG 2 VÒNG TRÒN
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span
                      className="w-3 h-3 rounded-full border border-[#141413]"
                      style={{ backgroundColor: second.kitColor }}
                    />
                    <div className="font-extrabold text-lg sm:text-xl uppercase truncate text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {second.name}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#61605B]">
                    {second.pts} điểm (HS {second.gd > 0 ? `+${second.gd}` : second.gd})
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#141413]/20 font-mono text-xs text-[#61605B] flex items-center justify-between">
              <span>Hòa sau 40p: Sút luân lưu 6m (3 lượt)</span>
              <span className="text-[#141413] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Cúp Vàng &amp; Huy Chương</span>
              </span>
            </div>
          </div>

          {/* THIRD PLACE PLAYOFF CARD */}
          <div className="bg-white border border-[#141413] p-5 sm:p-6 hard-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#141413] pb-3 mb-4">
                <span className="px-2.5 py-0.5 bg-[#16422B] text-white font-mono text-xs font-bold uppercase flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5 text-amber-300" />
                  <span>TRANH HẠNG BA</span>
                </span>
                <span className="font-mono text-xs text-[#61605B] font-semibold">
                  16:00 • Bế Mạc
                </span>
              </div>

              <div className="grid grid-cols-11 items-center gap-2 py-3">
                {/* Team 3 */}
                <div className="col-span-5 bg-[#F6F5F0] border border-[#141413] p-3 text-center">
                  <div className="font-mono text-[10px] text-[#61605B] font-bold uppercase mb-1">
                    HẠNG 3 VÒNG TRÒN
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span
                      className="w-3 h-3 rounded-full border border-[#141413]"
                      style={{ backgroundColor: third.kitColor }}
                    />
                    <div className="font-extrabold text-lg sm:text-xl uppercase truncate text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {third.name}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#61605B]">
                    {third.pts} điểm (HS {third.gd > 0 ? `+${third.gd}` : third.gd})
                  </div>
                </div>

                <div className="col-span-1 text-center font-extrabold text-xl text-[#61605B]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  VS
                </div>

                {/* Team 4 */}
                <div className="col-span-5 bg-[#F6F5F0] border border-[#141413] p-3 text-center">
                  <div className="font-mono text-[10px] text-[#61605B] font-bold uppercase mb-1">
                    HẠNG 4 VÒNG TRÒN
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span
                      className="w-3 h-3 rounded-full border border-[#141413]"
                      style={{ backgroundColor: fourth.kitColor }}
                    />
                    <div className="font-extrabold text-lg sm:text-xl uppercase truncate text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {fourth.name}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#61605B]">
                    {fourth.pts} điểm (HS {fourth.gd > 0 ? `+${fourth.gd}` : fourth.gd})
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#141413]/20 font-mono text-xs text-[#61605B] flex items-center justify-between">
              <span>Hòa sau 40p: Sút luân lưu 6m ngay</span>
              <span className="text-[#141413] font-bold">Giải Ba &amp; Phong Cách</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
