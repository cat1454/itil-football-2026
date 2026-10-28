const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: #06150E;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .bg-glow {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.28) 0%, rgba(6, 21, 14, 0.95) 85%),
      linear-gradient(180deg, #071910 0%, #030a07 100%);
  }
  .banner-img {
    position: relative;
    z-index: 10;
    width: 1200px;
    height: 630px;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 0 50px rgba(0,0,0,0.9);
  }
  .bottom-badge {
    position: absolute;
    bottom: 20px;
    right: 28px;
    z-index: 20;
    background: rgba(10, 20, 15, 0.88);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    color: #FFFFFF;
    font-family: -apple-system, sans-serif;
    font-size: 15px;
    font-weight: 700;
    padding: 7px 18px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #22C55E;
    box-shadow: 0 0 10px #22C55E;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <img src="file:///D:/Football/public/banner.png" class="banner-img" />
  <div class="bottom-badge">
    <div class="dot"></div>
    <span>itil-football-2026.vercel.app</span>
  </div>
</body>
</html>`;

const previewHtmlPath = path.join(__dirname, 'og-banner-preview.html');
fs.writeFileSync(previewHtmlPath, htmlContent, 'utf-8');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.join(__dirname, '../public/og-image.png');
const outAppPath = path.join(__dirname, '../src/app/opengraph-image.png');
const outTwitterPath = path.join(__dirname, '../src/app/twitter-image.png');

const cmd = `"${chromePath}" --headless --screenshot="${outPath}" --window-size=1200,630 --hide-scrollbars "file:///${previewHtmlPath.replace(/\\/g, '/')}"`;
execSync(cmd, { stdio: 'inherit' });

fs.copyFileSync(outPath, outAppPath);
fs.copyFileSync(outPath, outTwitterPath);
console.log('Successfully generated new OG image from banner!');
