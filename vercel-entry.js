import './preload.js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const sourceUrl = new URL('./server-v2.js', import.meta.url);
const projectRoot = path.dirname(fileURLToPath(sourceUrl));
let source = fs.readFileSync(sourceUrl, 'utf8');
const listenBlock = "const port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`AMIT TOUCH running on ${port}`));";
if (!source.includes(listenBlock)) {
  throw new Error('VERCEL_ENTRY_LISTEN_BLOCK_NOT_FOUND');
}
source = source.replace(listenBlock, 'export default app;');

// Always resolve the app shell and static assets from the packaged project
// directory inside the Vercel serverless function.
source = source.replace("fs.readFileSync('./index.html', 'utf8')", `fs.readFileSync(${JSON.stringify(path.join(projectRoot, 'index.html'))}, 'utf8')`);
source = source.replace("app.use(express.static('.'));", `app.use(express.static(${JSON.stringify(projectRoot)}));`);

// The manager account is uniquely identified by its phone in preview, so it
// can never fall through to the regular customer login path.
const adminMatch = "if (fullName === ADMIN_NAME && phone === ADMIN_PHONE)";
if (source.includes(adminMatch)) {
  source = source.replace(adminMatch, "if (phone === ADMIN_PHONE)");
}

// The preload HTML currently contains an earlier login-runtime loader. Strip
// that one from the served HTML so only the final handler below owns login.
const readHtmlLine = `let html = fs.readFileSync(${JSON.stringify(path.join(projectRoot, 'index.html'))}, 'utf8');`;
if (source.includes(readHtmlLine)) {
  source = source.replace(
    readHtmlLine,
    readHtmlLine + `\n    html = html.replace("['/login-runtime-fix.js','loginfix'],", '');`
  );
}

// Load exactly one canonical login handler at the very end of the page.
const bodyInject = "html = html.replace('</body>', pwaScript + '</body>');";
if (source.includes(bodyInject)) {
  source = source.replace(
    bodyInject,
    "html = html.replace('</body>', pwaScript + '<script src=\"/login-runtime-fix.js?v=20260902-login-final-v2\"></script><script src=\"/final-font-runtime.js?v=20260902-font-final-v2\"></script></body>');"
  );
}

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
  source = source.replaceAll(`from "${specifier}"`, `from "${resolved}"`);
}

const runtimePath = path.join(os.tmpdir(), 'amit-touch-vercel-runtime.mjs');
fs.writeFileSync(runtimePath, source, 'utf8');
const runtime = await import(pathToFileURL(runtimePath).href + '?v=' + Date.now());

if (!runtime.default) throw new Error('VERCEL_EXPRESS_EXPORT_MISSING');
export default runtime.default;
