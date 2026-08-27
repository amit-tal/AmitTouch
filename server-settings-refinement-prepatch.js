import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function amitSettingsRefinementRead(path,...args){
  const result=previousReadFileSync(path,...args);
  if(!String(path||'').endsWith('index.html'))return result;
  const isBuffer=Buffer.isBuffer(result);
  let html=isBuffer?result.toString('utf8'):String(result);
  const tag='<script src="/admin-settings-refinements.js?v=20260827-refinements-v1"></script><script src="/customer-studio-settings-bridge.js?v=20260827-refinements-v1"></script>';
  if(!html.includes('admin-settings-refinements.js'))html=html.replace('</body>',tag+'</body>');
  return isBuffer?Buffer.from(html,'utf8'):html;
};
