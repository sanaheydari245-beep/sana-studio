import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../dist');
const destDir = path.resolve(__dirname, '../backend/public');

if (!fs.existsSync(srcDir)) {
  console.error(`❌ Source build directory not found: ${srcDir}`);
  process.exit(1);
}

// 1. Remove obsolete files from destination before copying
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

// 2. Recursively copy all generated assets and nested folders
fs.cpSync(srcDir, destDir, { recursive: true });

console.log(`✅ [Build Mirror] Successfully copied frontend build from dist/ to backend/public/`);
