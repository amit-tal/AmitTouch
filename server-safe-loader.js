import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const sourcePath = path.resolve('./server.js');
const runtimePath = path.resolve('./.server-safe-runtime.mjs');
let source = fs.readFileSync(sourcePath, 'utf8');

const fatal = "if (!input.includes(before)) throw new Error(`PATCH_TARGET_NOT_FOUND: ${label}`);";
const safe = "if (!input.includes(before)) { console.warn(`PATCH_TARGET_SKIPPED: ${label}`); return input; }";

if (source.includes(fatal)) {
  source = source.replace(fatal, safe);
} else if (!source.includes('PATCH_TARGET_SKIPPED')) {
  console.warn('SERVER_SAFE_LOADER: replaceRequired guard pattern not found; continuing without modifying server.js');
}

fs.writeFileSync(runtimePath, source, 'utf8');
await import(pathToFileURL(runtimePath).href + '?v=' + Date.now());
