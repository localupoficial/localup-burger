/**
 * Fotos do cardápio:
 * - Hambúrgueres / Smash / BB Chicken / Batata → flyers HD
 * - Refrigerantes / Sucos com foto → prints do cardápio digital (sem placeholder)
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ASSETS =
  'C:/Users/ottav/.cursor/projects/c-Users-ottav-Projects-localup-hamburgueria-base44/assets';
const OUT = path.resolve('public/assets/menu');
fs.mkdirSync(OUT, { recursive: true });

function findBest(key) {
  const hits = fs
    .readdirSync(ASSETS)
    .filter((f) => f.includes(key))
    .map((f) => ({ f, size: fs.statSync(path.join(ASSETS, f)).size }))
    .sort((a, b) => b.size - a.size);
  if (!hits.length) throw new Error(`Missing: ${key}`);
  return path.join(ASSETS, hits[0].f);
}

async function crop(src, outName, region) {
  const meta = await sharp(src).metadata();
  const left = Math.max(0, Math.round(region.left * meta.width));
  const top = Math.max(0, Math.round(region.top * meta.height));
  const width = Math.min(Math.round(region.width * meta.width), meta.width - left);
  const height = Math.min(Math.round(region.height * meta.height), meta.height - top);
  await sharp(src)
    .extract({ left, top, width, height })
    .resize(800, 800, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(path.join(OUT, outName));
  console.log('✓', outName);
}

async function cropRows(srcKey, names, { photoLeft, photoWidth, topOffset, usable, insetY }) {
  const src = findBest(srcKey);
  const rowH = usable / names.length;
  for (let i = 0; i < names.length; i++) {
    await crop(src, names[i], {
      left: photoLeft,
      top: topOffset + i * rowH + insetY,
      width: photoWidth,
      height: rowH - insetY * 2,
    });
  }
}

async function main() {
  await cropRows(
    'burguer_boss_7',
    ['moleque.jpg', 'pivete.jpg', 'galinho.jpg', 'buguelo.jpg', 'oxente.jpg'],
    { photoLeft: 0.54, photoWidth: 0.44, topOffset: 0.01, usable: 0.98, insetY: 0.015 }
  );
  await cropRows(
    'burguer_boss_8',
    ['magrelo.jpg', 'marrua.jpg', 'retadinho.jpg', 'retadinho2.jpg', 'massa.jpg'],
    { photoLeft: 0.54, photoWidth: 0.44, topOffset: 0.008, usable: 0.985, insetY: 0.012 }
  );

  // Xodó — thumb do print digital (canto superior esquerdo)
  await crop(findBest('burgue_boss_1'), 'xodo.jpg', {
    left: 0.018,
    top: 0.12,
    width: 0.1,
    height: 0.2,
  });

  await crop(findBest('burguer_boss_9'), 'smash-de-lenhar.jpg', {
    left: 0.42,
    top: 0.08,
    width: 0.55,
    height: 0.34,
  });

  await crop(findBest('burguer_boss_10'), 'bb-chicken-500.jpg', {
    left: 0.48,
    top: 0.14,
    width: 0.48,
    height: 0.34,
  });
  await crop(findBest('burguer_boss_10'), 'bb-chicken-1kg.jpg', {
    left: 0.48,
    top: 0.14,
    width: 0.48,
    height: 0.34,
  });
  // Prefer separate thumbs from digital BB Chicken screen if usable
  try {
    const dig = findBest('burguer_boss_3-ada5');
    await crop(dig, 'bb-chicken-500.jpg', { left: 0.02, top: 0.3, width: 0.16, height: 0.5 });
    await crop(dig, 'bb-chicken-1kg.jpg', { left: 0.52, top: 0.3, width: 0.16, height: 0.5 });
  } catch {
    /* flyer fallback already written */
  }
  await sharp(path.join(OUT, 'bb-chicken-500.jpg')).toFile(path.join(OUT, 'bb-chicken.jpg'));

  await crop(findBest('burguer_boss_10'), 'batata-frita.jpg', {
    left: 0.48,
    top: 0.62,
    width: 0.48,
    height: 0.32,
  });

  // Refrigerantes — prints digitais (só itens com foto)
  const drinks = findBest('burguer_boss_5-cfaa');
  await crop(drinks, 'guarana-1l.jpg', { left: 0.685, top: 0.13, width: 0.11, height: 0.2 });
  await crop(drinks, 'coca-zero-lata.jpg', { left: 0.02, top: 0.41, width: 0.11, height: 0.2 });
  await crop(drinks, 'coca-lata.jpg', { left: 0.355, top: 0.41, width: 0.11, height: 0.2 });
  await crop(drinks, 'guarana-lata.jpg', { left: 0.685, top: 0.41, width: 0.11, height: 0.2 });
  await crop(drinks, 'h2o.jpg', { left: 0.355, top: 0.69, width: 0.11, height: 0.22 });
  await crop(drinks, 'h2o-limoneto.jpg', { left: 0.685, top: 0.69, width: 0.11, height: 0.22 });
  await sharp(path.join(OUT, 'coca-lata.jpg')).toFile(path.join(OUT, 'coca-cola.jpg'));
  await sharp(path.join(OUT, 'guarana-lata.jpg')).toFile(path.join(OUT, 'guarana.jpg'));

  // Sucos — só os com foto
  const juices = findBest('burguer_boss_6-4a3');
  await crop(juices, 'suco-laranja-morango.jpg', { left: 0.35, top: 0.15, width: 0.12, height: 0.28 });
  await crop(juices, 'suco-morango.jpg', { left: 0.35, top: 0.58, width: 0.12, height: 0.3 });

  console.log('\nFiles:', fs.readdirSync(OUT).filter((f) => f.endsWith('.jpg')).sort().join(', '));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
