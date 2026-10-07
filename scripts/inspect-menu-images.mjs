import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir =
  'C:/Users/ottav/.cursor/projects/c-Users-ottav-Projects-localup-hamburgueria-base44/assets';

for (const f of fs.readdirSync(dir)) {
  if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
  const meta = await sharp(path.join(dir, f)).metadata();
  const short = f.includes('burgue') || f.includes('burguer') || f.includes('ChatGPT')
    ? f.replace(/^c__Users.*?images_/, '').slice(0, 60)
    : f.slice(0, 60);
  console.log(`${short}\t${meta.width}x${meta.height}`);
}
