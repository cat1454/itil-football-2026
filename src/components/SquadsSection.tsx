'use client';

import React from 'react';
import { Team } from '@/types/tournament';
import { Users, Shield, BookOpen, Edit } from 'lucide-react';
import { sound } from '@/lib/sound';

interface SquadsSectionProps {
  teams: Team[];
}

export default function SquadsSection({ teams }: SquadsSectionProps) {
  return (
    <section id="squads-section" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>HỒ SƠ 4 ĐỘI BÓNG &amp; ĐIỀU LỆ GIẢI</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              4 ĐỘI HÌNH THAM DỰ ITIL 2026
            </h2>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F5F0] border border-[#141413] font-mono text-xs text-[#16422B] font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>Đội hình đăng ký chính thức BTC</span>
          </div>
        </div>

        {/* 4 Team Squad Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {teams.map(t => (
            <div
              key={t.id}
              className="bg-white border border-[#141413] p-4 sm:p-5 hard-shadow flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                {/* Team Card Header */}
                <div className="flex items-center justify-between border-b border-[#141413] pb-2.5 mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#F6F5F0] border border-[#141413]">
                    {t.code}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#61605B]">
                    <span
                      className="w-3 h-3 rounded-full border border-[#141413]"
                      style={{ backgroundColor: t.kitColor }}
                    />
                    <span>{t.kitName}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-2xl uppercase text-[#141413] mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {t.name}
                </h3>
                <p className="text-xs text-[#61605B] leading-relaxed mb-3">
                  {t.note}
                </p>

                {/* Player Roster Table */}
                <div className="border border-[#141413]/30 mb-3 overflow-hidden">
                  <div className="px-2.5 py-1.5 bg-[#EAE8E0] border-b border-[#141413]/20 font-mono text-[10px] uppercase font-bold text-[#141413] flex justify-between items-center">
                    <span>DANH SÁCH 6 CẦU THỦ</span>
                    <span className="text-[#61605B] font-normal">Sân 5 + 1 Dự bị</span>
                  </div>
                  <ul className="divide-y divide-[#141413]/10">
                    {t.players.map((p, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center justify-between py-1.5 px-2 text-xs ${
                          idx % 2 === 0 ? 'bg-[#F6F5F0]/70' : 'bg-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-[#61605B] w-3 font-semibold">
                            {idx + 1}.
                          </span>
                          <span className="font-semibold text-[#141413]">{p}</span>
                        </span>
                        {idx === 0 && (
                          <span
                            className="px-1.5 py-0.2 bg-[#16422B] text-white font-mono text-[9px] font-bold uppercase border border-[#141413]"
                            title="Đội trưởng"
                          >
                            C
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Captain Footer */}
              <div className="pt-2.5 border-t border-[#141413]/20 font-mono text-xs flex items-center justify-between">
                <span className="text-[#61605B]">Đội trưởng:</span>
                <span className="font-bold text-[#141413]">{t.captain}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Concise Tournament Rules Box */}
        <div className="bg-white border border-[#141413] p-6 hard-shadow grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#16422B] uppercase mb-1 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>QUY TẮC 1: THỂ THỨC XOAY VÒNG</span>
            </div>
            <h3 className="font-extrabold text-xl uppercase mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Đá Vòng Tròn 1 Lượt
            </h3>
            <p className="text-xs text-[#61605B] leading-relaxed">
              4 đội thi đấu vòng tròn 1 lượt (3 vòng, mỗi vòng 2 trận diễn ra các ngày 07/11, 08/11 và 14/11). Mỗi đội thi đấu đúng 3 trận để đảm bảo tính công bằng tuyệt đối.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs font-bold text-[#D9381E] uppercase mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>QUY TẮC 2: TIÊU CHÍ XẾP HẠNG</span>
            </div>
            <h3 className="font-extrabold text-xl uppercase mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Điểm Số &amp; Hiệu Số
            </h3>
            <p className="text-xs text-[#61605B] leading-relaxed">
              Thắng: <strong className="text-[#141413]">3 điểm</strong> • Hòa: <strong className="text-[#141413]">1 điểm</strong> • Thua: <strong className="text-[#141413]">0 điểm</strong>. Nếu bằng điểm: xét <strong className="text-[#141413]">Hiệu số (HS)</strong> &rarr; <strong className="text-[#141413]">Tổng bàn thắng (BT)</strong> &rarr; <strong className="text-[#141413]">Đối đầu trực tiếp</strong>.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs font-bold text-[#141413] uppercase mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>QUY TẮC 3: THỜI LƯỢNG &amp; SÂN BÃI</span>
            </div>
            <h3 className="font-extrabold text-xl uppercase mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Luật Sân 5 Liên Chi Đoàn
            </h3>
            <p className="text-xs text-[#61605B] leading-relaxed">
              Mỗi trận gồm 2 hiệp × 20 phút (nghỉ giữa hiệp 5 phút). Thay người xoay vòng tự do không giới hạn. Cầu thủ nhận 2 thẻ vàng hoặc 1 thẻ đỏ trực tiếp nghỉ trận tiếp theo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
