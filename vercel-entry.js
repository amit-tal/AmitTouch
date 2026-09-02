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

// The preview must always resolve index.html and all client assets from the
// packaged project directory. In a Vercel serverless runtime, process.cwd()
// is not a reliable public/static root.
source = source.replace("fs.readFileSync('./index.html', 'utf8')", `fs.readFileSync(${JSON.stringify(path.join(projectRoot, 'index.html'))}, 'utf8')`);
source = source.replace("app.use(express.static('.'));", `app.use(express.static(${JSON.stringify(projectRoot)}));`);

// In the preview environment, the manager account is identified by the
// unique manager phone. This prevents that phone from ever falling through
// to the regular-customer login path because of name formatting differences.
const adminMatch = "if (fullName === ADMIN_NAME && phone === ADMIN_PHONE)";
if (source.includes(adminMatch)) {
  source = source.replace(adminMatch, "if (phone === ADMIN_PHONE)");
}

// Make the login button itself use the preview login flow rather than the
// legacy inline login() path embedded in index.html.
const legacyLoginButton = '<button class="primary" onclick="login()">התחברות</button>';
const previewLoginButton = '<button class="primary" onclick="window.AMIT_TOUCH_PREVIEW_LOGIN ? window.AMIT_TOUCH_PREVIEW_LOGIN(event) : login()">התחברות</button>';
source = source.replace("let html = fs.readFileSync(" + JSON.stringify(path.join(projectRoot, 'index.html')) + ", 'utf8');", "let html = fs.readFileSync(" + JSON.stringify(path.join(projectRoot, 'index.html')) + ", 'utf8');\n    html = html.replace(" + JSON.stringify(legacyLoginButton) + ", " + JSON.stringify(previewLoginButton) + ");");

// Load the final admin login gate after every other client script so the
// legacy inline login handler cannot override the manager-code flow.
const bodyInject = "html = html.replace('</body>', pwaScript + '</body>');";
if (source.includes(bodyInject)) {
  source = source.replace(bodyInject, "html = html.replace('</body>', pwaScript + '<script src=\"/final-admin-login-lock.js?v=20260902-admin-lock-v3\"></script></body>');");
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
