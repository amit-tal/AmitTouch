import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const sourceUrl = new URL('./server-v2.js', import.meta.url);
let source = fs.readFileSync(sourceUrl, 'utf8');
const listenBlock = "const port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`AMIT TOUCH running on ${port}`));";
if (!source.includes(listenBlock)) {
  throw new Error('VERCEL_ENTRY_LISTEN_BLOCK_NOT_FOUND');
}
source = source.replace(listenBlock, 'export default app;');

// Keep the generated runtime beside package.json/node_modules so bare package
// imports such as express, luxon and googleapis resolve correctly on Vercel.
const baseDir = path.dirname(fileURLToPath(import.meta.url));
const runtimePath = path.join(baseDir, '.vercel-server-runtime.mjs');
fs.writeFileSync(runtimePath, source, 'utf8');
const runtime = await import(pathToFileURL(runtimePath).href + '?v=' + Date.now());

export default runtime.default;
