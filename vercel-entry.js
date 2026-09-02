import './preload.js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const sourceUrl = new URL('./server-v2.js', import.meta.url);
let source = fs.readFileSync(sourceUrl, 'utf8');
const listenBlock = "const port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`AMIT TOUCH running on ${port}`));";
if (!source.includes(listenBlock)) {
  throw new Error('VERCEL_ENTRY_LISTEN_BLOCK_NOT_FOUND');
}
source = source.replace(listenBlock, 'export default app;');

const packageImports = [
  'express',
  'googleapis',
  'luxon',
  '@supabase/supabase-js',
  'tsdav',
  'node-ical'
];
for (const specifier of packageImports) {
  const resolved = import.meta.resolve(specifier);
  source = source.replaceAll(`from '${specifier}'`, `from '${resolved}'`);
  source = source.replaceAll(`from \"${specifier}\"`, `from \"${resolved}\"`);
}

const runtimePath = path.join(os.tmpdir(), 'amit-touch-vercel-runtime.mjs');
fs.writeFileSync(runtimePath, source, 'utf8');
const runtime = await import(pathToFileURL(runtimePath).href + '?v=' + Date.now());

if (!runtime.default) throw new Error('VERCEL_EXPRESS_EXPORT_MISSING');
export default runtime.default;
