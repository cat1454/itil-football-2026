# ⚽ ITIL 2026 — Giải Bóng Đá Nội Bộ Liên Chi Đoàn Khoa CNTT
> Web App thời gian thực, bảng xếp hạng tự động, ma trận đối đầu 4x4, sa bàn chiến thuật & trang quản trị dành riêng cho Ban Tổ Chức (BTC).

---

## 🌟 Tính Năng Nổi Bật

### 1. Khán Giả & Cầu Thủ (`/`)
- **Cổng Khai Mạc Phạt Đền (Kick-Off Gate)**: Trò chơi kéo sút bóng vào khung thành tương tác (GSAP + Canvas Physics + Thủ môn GK tuần tra).
- **Bảng Xếp Hạng Trực Tiếp (Live Standings)**: Ứng dụng **Framer Motion Layout Animation** giúp các hàng trên BXH trượt lên / trượt xuống đổi chỗ tự động khi có bàn thắng.
- **Ma Trận Đối Đầu 4×4 (Cross Matrix)**: Hiển thị tỉ số đối đầu trực diện giữa 4 đội; bấm vào ô bất kỳ để nhảy mượt tới trận đấu đó.
- **Lịch Thi Đấu 3 Vòng (6 Trận)**:
  - **Vòng 1 (07/11/2026)**: Trận 1 (19:30 Đội 4 vs Đội 1) & Trận 2 (20:15 Đội 2 vs Đội 3).
  - **Vòng 2 (08/11/2026)**: Trận 3 (19:30 Đội 4 vs Đội 2) & Trận 4 (20:15 Đội 1 vs Đội 3).
  - **Vòng 3 (14/11/2026)**: Trận 5 (18:30 Đội 4 vs Đội 3) & Trận 6 (18:30 Đội 1 vs Đội 2).
- **Ngày Bế Mạc & Trao Giải**: Tự động đưa Top 1 vs Top 2 vào **Trận Chung Kết Cúp Vàng**, Top 3 vs Top 4 vào **Trận Tranh Hạng Ba**.
- **Danh Sách 4 Đội Bóng**: Hiển thị đầy đủ 6 cầu thủ cho từng đội kèm huy hiệu Đội Trưởng `(C)`.
- **Âm Thanh Sống Động**: Bộ tổng hợp âm thanh Web Audio API (tiếng còi, sút bóng, bàn thắng) không phụ thuộc file mp3 ngoài.

### 2. Trang Quản Trị Ban Tổ Chức (`/admin`)
- **Bảo mật PIN Code**: Mã PIN mặc định `1234` (hoặc `itil2026`), có thể đổi mã PIN ngay trên giao diện.
- **Quản lý trận đấu**: Sửa tỉ số, giờ đá, sân đấu, trạng thái `ĐÃ HOÀN THÀNH` / `CHƯA DIỄN RA`.
- **Quản lý đội bóng**: Đổi tên, mã đội, màu áo đấu (Color Picker), danh sách cầu thủ, chỉ định Đội Trưởng.
- **Ngày Chung Kết & Trao Giải**: Nhập kết quả trận Chung Kết & Tranh Hạng Ba (kể cả tỉ số luân lưu 6m), cập nhật danh hiệu cá nhân (*MVP, Vua phá lưới, Thủ môn xuất sắc, Phong cách*).
- **Sao lưu & Phục hồi**: Xuất/Nhập file JSON sao lưu dự phòng, khôi phục cài đặt gốc ban đầu.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Animation & Physics**: Framer Motion, GSAP 3 (ScrollTrigger, MotionPath, Draggable), Canvas-Confetti.
- **Audio**: Web Audio API (Synthesizer Engine).
- **Backend**: Next.js Route Handlers (`/api/tournament`, `/api/tournament/reset`, `/api/tournament/auth`).
- **Database**:
  - Tích hợp sẵn Persistent Atomic JSON Database (`data/tournament_db.json`) + In-memory Cache.
  - Sẵn sàng kết nối Supabase / PostgreSQL qua file migration `supabase_schema.sql`.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Local

### 1. Yêu cầu môi trường
- Node.js >= 18.x
- npm >= 9.x

### 2. Cài đặt và khởi chạy
```bash
# Cài đặt dependencies
npm install

# Khởi chạy server phát triển
npm run dev

# Mở trình duyệt tại:
# - Trang Khán Giả: http://localhost:3000
# - Trang Quản Trị BTC: http://localhost:3000/admin (PIN: 1234)
```

### 3. Build Production
```bash
npm run build
npm run start
```

---

## 🌐 Hướng Dẫn Triển Khai Live Production (Vercel)

1. Đẩy mã nguồn lên GitHub:
   ```bash
   git add .
   git commit -m "feat: complete live tournament app"
   git push origin main
   ```
2. Truy cập [Vercel](https://vercel.com) & bấm **Add New Project**.
3. Chọn Repository `itil-football-2026` và bấm **Deploy**.
4. Thiết lập biến môi trường (Environment Variables) trong Vercel Settings nếu muốn đổi mã PIN:
   - `ADMIN_PIN`: mã PIN bảo mật mong muốn.

---

## 📁 Cấu Trúc Thư Mục

```
├── data/                         # Thư mục lưu database JSON tự động
├── src/
│   ├── app/
│   │   ├── admin/page.tsx        # Trang Admin BTC Console (/admin)
│   │   ├── api/tournament/       # Backend API Routes (GET, POST, Reset, Auth)
│   │   ├── globals.css           # Design Tokens, Editorial Shadows & Keyframes
│   │   ├── layout.tsx            # Google Fonts & SEO Metadata
│   │   └── page.tsx              # Trang chủ Live Score & BXH (/)
│   ├── components/               # Các React Components tương tác
│   ├── data/initialData.ts       # Dữ liệu gốc 4 đội & lịch 6 trận
│   ├── lib/
│   │   ├── db.ts                 # Database Engine (Atomic write & Serverless cache)
│   │   └── sound.ts              # Web Audio Synthesizer
│   └── types/tournament.ts       # TypeScript Interfaces
├── supabase_schema.sql           # Script khởi tạo Database PostgreSQL/Supabase
└── package.json
```

---

## 👥 Bản Quyền & Tổ Chức
- **Đơn vị tổ chức**: CLB Bóng Đá Liên Chi Đoàn Khoa CNTT
- **Mùa giải**: ITIL 2026 (IT Internal League)
