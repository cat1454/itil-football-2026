const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800;900&family=Oswald:wght@600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: 'Be Vietnam Pro', -apple-system, sans-serif;
      background: #092015;
      color: #FFFFFF;
      position: relative;
    }

    /* Background Pitch Gradients & Textures */
    .bg-canvas {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.18) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(234, 179, 8, 0.15) 0%, transparent 45%),
        linear-gradient(135deg, #061910 0%, #0d2e1f 40%, #16422b 100%);
    }

    /* Football Pitch Graphic Lines */
    .pitch-lines {
      position: absolute;
      inset: 20px;
      border: 2px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      pointer-events: none;
    }
    .pitch-center-circle {
      position: absolute;
      right: -120px;
      top: 50%;
      transform: translateY(-50%);
      width: 440px;
      height: 440px;
      border: 2px solid rgba(255, 255, 255, 0.08);
      border-radius: 50%;
    }
    .pitch-center-spot {
      position: absolute;
      right: 98px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }

    /* Container */
    .content {
      position: relative;
      z-index: 10;
      width: 1200px;
      height: 630px;
      padding: 56px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Top Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .badge-org {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(12px);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #FEF08A;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    }

    .season-tag {
      background: linear-gradient(135deg, #EAB308 0%, #CA8A04 100%);
      color: #141413;
      font-weight: 900;
      font-size: 13px;
      padding: 6px 16px;
      border-radius: 999px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      box-shadow: 0 4px 12px rgba(234, 179, 8, 0.35);
    }

    /* Main Center Hero */
    .hero-center {
      margin-top: 10px;
      max-width: 820px;
    }

    .main-title {
      font-family: 'Oswald', sans-serif;
      font-size: 84px;
      font-weight: 700;
      line-height: 0.95;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      background: linear-gradient(180deg, #FFFFFF 30%, #D1FAE5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }

    .accent-title {
      color: #FACC15;
      -webkit-text-fill-color: #FACC15;
    }

    .sub-title {
      margin-top: 14px;
      font-size: 21px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .sub-dot {
      width: 6px;
      height: 6px;
      background: #4ADE80;
      border-radius: 50%;
    }

    /* Teams Grid Pill */
    .teams-strip {
      display: flex;
      gap: 10px;
      margin-top: 24px;
    }

    .team-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(10, 24, 17, 0.75);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      padding: 9px 14px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 700;
      color: #F9FAFB;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      white-space: nowrap;
    }

    .team-badge-circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.85);
    }

    /* Bottom Features & Domain Bar */
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1.5px solid rgba(255, 255, 255, 0.15);
      padding-top: 20px;
    }

    .feature-list {
      display: flex;
      gap: 22px;
      font-size: 13.5px;
      font-weight: 600;
      color: #86EFAC;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .domain-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 0, 0, 0.55);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      padding: 9px 20px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.02em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .live-dot {
      width: 10px;
      height: 10px;
      background: #22C55E;
      border-radius: 50%;
      box-shadow: 0 0 10px #22C55E;
      flex-shrink: 0;
    }

    /* Trophy Floating Graphic */
    .trophy-container {
      position: absolute;
      right: 48px;
      top: 110px;
      width: 260px;
      height: 260px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, rgba(234, 179, 8, 0.22) 0%, transparent 68%);
      pointer-events: none;
    }

    .trophy-svg {
      width: 200px;
      height: 200px;
      filter: drop-shadow(0 14px 28px rgba(0,0,0,0.6));
    }
  </style>
</head>
<body>
  <div class="bg-canvas"></div>
  <div class="pitch-lines">
    <div class="pitch-center-circle"></div>
    <div class="pitch-center-spot"></div>
  </div>

  <div class="trophy-container">
    <svg class="trophy-svg" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
      <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
      <path d="M8 22v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="rgba(251, 191, 36, 0.2)" />
      <circle cx="12" cy="7" r="2.5" fill="#FBBF24" stroke="none" />
    </svg>
  </div>

  <div class="content">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="badge-org">
        <span>⚽</span>
        <span>CLB BÓNG ĐÁ LIÊN CHI ĐOÀN KHOA CNTT</span>
      </div>
      <div class="season-tag">
        MÙA 1 • NĂM 2026
      </div>
    </div>

    <!-- Center Hero -->
    <div class="hero-center">
      <h1 class="main-title">
        ITIL FOOTBALL <span class="accent-title">2026</span>
      </h1>
      <p class="sub-title">
        <span>GIẢI BÓNG ĐÁ NỘI BỘ SINH VIÊN & GIẢNG VIÊN</span>
        <span class="sub-dot"></span>
        <span style="color: #FCD34D;">4 ĐỘI TRANH TÀI XOAY VÒNG</span>
      </p>

      <!-- 4 Teams Chips -->
      <div class="teams-strip">
        <div class="team-chip">
          <div class="team-badge-circle" style="background: #EAB308;"></div>
          <span>FC CN Phần Mềm</span>
        </div>
        <div class="team-chip">
          <div class="team-badge-circle" style="background: #EF4444;"></div>
          <span>FC Hệ Thống TT</span>
        </div>
        <div class="team-chip">
          <div class="team-badge-circle" style="background: #3B82F6;"></div>
          <span>FC Mạng Máy Tính</span>
        </div>
        <div class="team-chip">
          <div class="team-badge-circle" style="background: #F97316;"></div>
          <span>FC Khoa Học Dữ Liệu</span>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bottom-bar">
      <div class="feature-list">
        <div class="feature-item">
          <span>⚡</span>
          <span>Tỷ Số Trực Tiếp</span>
        </div>
        <div class="feature-item">
          <span>📊</span>
          <span>Bảng Xếp Hạng Chuẩn FIFA</span>
        </div>
        <div class="feature-item">
          <span>📅</span>
          <span>Lịch Thi Đấu 3 Vòng</span>
        </div>
        <div class="feature-item">
          <span>🏆</span>
          <span>Bục Vinh Danh 4 Thứ Hạng</span>
        </div>
      </div>

      <div class="domain-badge">
        <div class="live-dot"></div>
        <span>itil-football-2026.vercel.app</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

const htmlPath = path.join(__dirname, 'og-preview.html');
const outPublicPath = path.join(__dirname, '../public/og-image.png');
const outAppPath = path.join(__dirname, '../src/app/opengraph-image.png');
const outAppTwitterPath = path.join(__dirname, '../src/app/twitter-image.png');

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('Written HTML to', htmlPath);

// Chrome headless screenshot command
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

const cmd = `"${chromePath}" --headless --screenshot="${outPublicPath}" --window-size=1200,630 --hide-scrollbars --run-all-compositor-stages-before-draw "${fileUrl}"`;

console.log('Running chrome screenshot...');
execSync(cmd, { stdio: 'inherit' });
console.log('Rendered to', outPublicPath);

// Copy to app dir
fs.copyFileSync(outPublicPath, outAppPath);
fs.copyFileSync(outPublicPath, outAppTwitterPath);
console.log('Copied to', outAppPath, 'and', outAppTwitterPath);

// Generate Apple Touch Icon & App Icon (512x512)
const iconHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 512px;
    height: 512px;
    overflow: hidden;
    background: radial-gradient(circle at 30% 20%, #16422b 0%, #0a2015 70%, #05140d 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: -apple-system, sans-serif;
  }
  .border-ring {
    position: absolute;
    inset: 16px;
    border: 3px solid rgba(250, 204, 21, 0.4);
    border-radius: 96px;
  }
  .trophy-svg {
    width: 260px;
    height: 260px;
    filter: drop-shadow(0 12px 24px rgba(0,0,0,0.5));
  }
  .badge {
    margin-top: 14px;
    background: #EAB308;
    color: #141413;
    font-weight: 900;
    font-size: 26px;
    padding: 6px 28px;
    border-radius: 999px;
    letter-spacing: 0.1em;
  }
</style>
</head>
<body>
  <div class="border-ring"></div>
  <svg class="trophy-svg" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
    <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
    <path d="M8 22v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="rgba(251, 191, 36, 0.25)" />
    <circle cx="12" cy="7" r="2.5" fill="#FBBF24" stroke="none" />
  </svg>
  <div class="badge">ITIL 2026</div>
</body>
</html>`;

const iconHtmlPath = path.join(__dirname, 'icon-preview.html');
const outIcon512 = path.join(__dirname, '../public/icon-512.png');
const outAppleIcon = path.join(__dirname, '../public/apple-touch-icon.png');
const outAppIcon = path.join(__dirname, '../src/app/icon.png');
const outAppAppleIcon = path.join(__dirname, '../src/app/apple-icon.png');

fs.writeFileSync(iconHtmlPath, iconHtml, 'utf-8');
const iconCmd = `"${chromePath}" --headless --screenshot="${outIcon512}" --window-size=512,512 --hide-scrollbars "${'file:///' + iconHtmlPath.replace(/\\/g, '/')}"`;
execSync(iconCmd, { stdio: 'inherit' });

fs.copyFileSync(outIcon512, outAppleIcon);
fs.copyFileSync(outIcon512, outAppIcon);
fs.copyFileSync(outIcon512, outAppAppleIcon);
console.log('Icons generated successfully.');
