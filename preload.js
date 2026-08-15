import fs from 'fs';

const originalReadFileSync = fs.readFileSync.bind(fs);

fs.readFileSync = function patchedReadFileSync(path, ...args) {
  const result = originalReadFileSync(path, ...args);
  const pathText = String(path || '');
  if (!pathText.endsWith('index.html')) return result;

  const isBuffer = Buffer.isBuffer(result);
  let html = isBuffer ? result.toString('utf8') : String(result);

  html = html.replaceAll('/assets/amit-touch-logo.svg', '/assets/amit-touch-logo.webp?v=20260815-final-logo');

  const criticalSplash = `<style id="splash-critical">#splash{opacity:0!important;visibility:hidden!important}#splash.brand-ready{opacity:1!important;visibility:visible!important}#splash.brand-done{opacity:0!important;visibility:hidden!important}</style>`;
  html = html.replace('</head>', criticalSplash + '</head>');

  html = html.replace(
    "setTimeout(()=>document.getElementById('splash').classList.add('hide'),1600);",
    "/* splash timing is controlled exclusively by brand-assets.js */"
  );

  return isBuffer ? Buffer.from(html, 'utf8') : html;
};
