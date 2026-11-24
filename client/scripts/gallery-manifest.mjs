// Regenerate public/gallery/manifest.json — run after adding/removing gallery images:
//   node scripts/gallery-manifest.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'gallery');
const ok = /\.(jpe?g|png|webp|gif|avif)$/i;
const files = fs.readdirSync(dir).filter(f => ok.test(f) && f !== 'manifest.json').sort();
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(files, null, 2));
console.log(`manifest.json written — ${files.length} images`);
