import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function amitStudioPagesRead(path,...args){
  const result=previousReadFileSync(path,...args);
  if(!String(path||'').endsWith('index.html'))return result;
  const isBuffer=Buffer.isBuffer(result);
  let html=isBuffer?result.toString('utf8'):String(result);
  const tag='<script src="/admin-studio-settings-pages.js?v=20260827-studio-pages-live-v4"></script>';
  if(!html.includes('admin-studio-settings-pages.js'))html=html.replace('</body>',tag+'</body>');
  else html=html.replace(/<script src="\/admin-studio-settings-pages\.js\?v=[^"]+"><\/script>/,tag);
  return isBuffer?Buffer.from(html,'utf8'):html;
};
