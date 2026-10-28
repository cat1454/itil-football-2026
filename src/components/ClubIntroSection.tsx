'use client';

import React from 'react';
import { Shield, Trophy, Users, HeartHandshake, Zap, Target, Sparkles, Calendar } from 'lucide-react';

export default function ClubIntroSection() {
  return (
    <section id="club-intro-section" className="py-12 sm:py-16 border-b border-[#141413] bg-white/70 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[#16422B] tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#16422B]" />
              <span>GIỚI THIỆU CÂU LẠC BỘ &amp; CỘT MỐC MÙA 1 (2026)</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
              CLB BÓNG ĐÁ LIÊN CHI ĐOÀN CNTT
            </h2>
            <p className="text-sm text-[#61605B] mt-1 max-w-2xl leading-relaxed">
              Giải đấu <strong className="text-[#141413]">ITIL 2026</strong> là <strong>Mùa 1 (Season 1)</strong> chính thức khởi tranh, đặt nền móng cho hệ thống giải bóng đá truyền thống thường niên của Khoa Công Nghệ Thông Tin.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold hard-shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>KHỞI TRANH MÙA 1 • NĂM 2026</span>
            </span>
          </div>
        </div>

        {/* Club Profile & Mission Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Main Story Box (7 cols) */}
          <div className="lg:col-span-7 bg-[#F6F5F0] border-2 border-[#141413] p-5 sm:p-6 hard-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#141413]/20">
                <span className="px-2.5 py-0.5 bg-[#D9381E] text-white font-mono text-xs font-bold uppercase">
                  SỨ MỆNH &amp; TÔN CHỈ
                </span>
                <span className="font-mono text-xs text-[#61605B]">
                  Nhiệt Huyết — Gắn Kết — Tinh Thần IT
                </span>
              </div>

              <h3 className="font-extrabold text-2xl uppercase text-[#141413] leading-snug" style={{ fontFamily: 'Oswald, sans-serif' }}>
                SÂN CHƠI THỂ THAO ĐOÀN KẾT DÀNH CHO SINH VIÊN &amp; CÁN BỘ ĐOÀN
              </h3>

              <p className="text-sm text-[#61605B] leading-relaxed">
                Được thành lập dưới sự chỉ đạo của <strong className="text-[#141413]">Ban Chấp Hành Liên Chi Đoàn Khoa Công Nghệ Thông Tin</strong>, Câu Lạc Bộ Bóng Đá là mái nhà chung dành cho tất cả những ai có niềm đam mê với trái bóng tròn sau những giờ học tập, nghiên cứu và làm đồ án căng thẳng.
              </p>

              <p className="text-sm text-[#61605B] leading-relaxed">
                Năm 2026 đánh dấu <strong className="text-[#16422B]">MÙA 1 (SEASON 1)</strong> — mùa giải đầu tiên mở màn chuỗi giải đấu nội bộ thường niên. 4 đội bóng tham dự đại diện cho các thế hệ sinh viên từ các khóa K21, K22, K23, K24 cùng Ban Chấp Hành Đoàn Khoa, tranh tài theo thể thức xoay vòng công bằng, kịch tính để chọn ra nhà Vô Địch xứng đáng nhất.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#141413]/20 grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="p-2 bg-white border border-[#141413]">
                <div className="font-black text-lg text-[#16422B]">MÙA 1</div>
                <div className="text-[10px] text-[#61605B] uppercase">Cột mốc 2026</div>
              </div>
              <div className="p-2 bg-white border border-[#141413]">
                <div className="font-black text-lg text-[#D9381E]">24</div>
                <div className="text-[10px] text-[#61605B] uppercase">Cầu thủ tranh tài</div>
              </div>
              <div className="p-2 bg-white border border-[#141413]">
                <div className="font-black text-lg text-[#D97706]">01 CÚP</div>
                <div className="text-[10px] text-[#61605B] uppercase">Vô Địch Cúp Vàng</div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Box (5 cols) */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-white border-2 border-[#141413] p-4 hard-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-4 h-4 text-[#D9381E]" />
                <h4 className="font-bold text-sm uppercase text-[#141413]">1. NHIỆT HUYẾT THỂ THAO</h4>
              </div>
              <p className="text-xs text-[#61605B] leading-relaxed">
                Cháy hết mình vì màu cờ sắc áo của đội tuyển, cống hiến những pha bóng đẹp mắt và những bàn thắng mãn nhãn.
              </p>
            </div>

            <div className="bg-white border-2 border-[#141413] p-4 hard-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <HeartHandshake className="w-4 h-4 text-[#16422B]" />
                <h4 className="font-bold text-sm uppercase text-[#141413]">2. TINH THẦN FAIR-PLAY</h4>
              </div>
              <p className="text-xs text-[#61605B] leading-relaxed">
                Tôn trọng điều lệ giải, tôn trọng đối thủ và trọng tài. Đặt tình đồng chí, tinh thần đoàn kết lên hàng đầu.
              </p>
            </div>

            <div className="bg-white border-2 border-[#141413] p-4 hard-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-[#D97706]" />
                <h4 className="font-bold text-sm uppercase text-[#141413]">3. GẮN KẾT CÁC THẾ HỆ</h4>
              </div>
              <p className="text-xs text-[#61605B] leading-relaxed">
                Tạo cơ hội giao lưu giữa sinh viên các khóa K21, K22, K23, K24 và cựu sinh viên, xây dựng mạng lưới hỗ trợ học tập và nghề nghiệp.
              </p>
            </div>

            <div className="bg-white border-2 border-[#141413] p-4 hard-shadow">
              <div className="flex items-center gap-2 mb-1.5">
                <Trophy className="w-4 h-4 text-[#1E40AF]" />
                <h4 className="font-bold text-sm uppercase text-[#141413]">4. TIỀN ĐỀ THƯỜNG NIÊN</h4>
              </div>
              <p className="text-xs text-[#61605B] leading-relaxed">
                Mùa 1 năm 2026 sẽ là tiền đề vững chắc để Liên Chi Đoàn nhân rộng mô hình giải đấu thường niên với quy mô ngày càng chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
