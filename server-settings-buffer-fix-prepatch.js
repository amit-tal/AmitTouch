import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function amitSettingsBufferFix(path,...args){
  const result=previousReadFileSync(path,...args);
  if(!String(path||'').endsWith('server-v2.js'))return result;
  const isBuffer=Buffer.isBuffer(result);let source=isBuffer?result.toString('utf8'):String(result);
  const before="const BUFFER_MINUTES = { [Symbol.toPrimitive]() { const store = AMIT_BUFFER_CONTEXT.getStore(); const value = Number(store?.gap_minutes); return Number.isFinite(value) ? value : 30; } };";
  const after="const BUFFER_MINUTES = { value() { const store = AMIT_BUFFER_CONTEXT.getStore(); const value = Number(store?.gap_minutes); return Number.isFinite(value) ? value : 30; }, [Symbol.toPrimitive]() { return this.value(); }, toJSON() { return this.value(); } };";
  if(source.includes(before))source=source.replace(before,after);
  return isBuffer?Buffer.from(source,'utf8'):source;
};
