import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC =
  'C:/Users/ottav/.cursor/projects/c-Users-ottav-Projects-localup-hamburgueria-base44/assets';
const OUT = path.resolve('public/assets/menu');
fs.mkdirSync(OUT, { recursive: true });

const file = (key) => {
  const hit = fs.readdirSync(SRC).find((f) => f.includes(key));
  if (!hit) throw new Error(`Missing source: ${key}`);
  return path.join(SRC, hit);
};

async function cropTo(srcPath, outName, region) {
  const { width, height } = await sharp(srcPath).metadata();
  const left = Math.max(0, Math.round(region.left * width));
  const top = Math.max(0, Math.round(region.top * height));
  const w = Math.min(Math.round(region.width * width), width - left);
  const h = Math.min(Math.round(region.height * height), height - top);
  await sharp(srcPath)
    .extract({ left, top, width: w, height: h })
    .resize(800, 800, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT, outName));
  console.log('✓', outName, `${w}x${h} → 800x800`);
}

async function cropRows(srcKey, names, { photoLeft, photoWidth, topOffset, usable, insetY }) {
  const src = file(srcKey);
  const rowH = usable / names.length;
  for (let i = 0; i < names.length; i++) {
    await cropTo(src, names[i], {
      left: photoLeft,
      top: topOffset + i * rowH + insetY,
      width: photoWidth,
      height: rowH - insetY * 2,
    });
  }
}

async function main() {
  // Clear previous thumbs noise later; overwrite mains
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

  // Smash — photo only on right of top band
  await cropTo(file('burguer_boss_9'), 'smash-de-lenhar.jpg', {
    left: 0.42,
    top: 0.08,
    width: 0.55,
    height: 0.34,
  });

  // Chicken flyer
  await cropTo(file('burguer_boss_10'), 'bb-chicken.jpg', {
    left: 0.48,
    top: 0.14,
    width: 0.48,
    height: 0.34,
  });
  await cropTo(file('burguer_boss_10'), 'batata-frita.jpg', {
    left: 0.48,
    top: 0.62,
    width: 0.48,
    height: 0.32,
  });

  // Drinks flyer — cans and juices on right
  await cropTo(file('burguer_boss_11'), 'guarana.jpg', {
    left: 0.4,
    top: 0.16,
    width: 0.18,
    height: 0.28,
  });
  await cropTo(file('burguer_boss_11'), 'coca-cola.jpg', {
    left: 0.72,
    top: 0.14,
    width: 0.2,
    height: 0.3,
  });
  await cropTo(file('burguer_boss_11'), 'h2o.jpg', {
    left: 0.55,
    top: 0.1,
    width: 0.2,
    height: 0.34,
  });
  await cropTo(file('burguer_boss_11'), 'suco-laranja-morango.jpg', {
    left: 0.48,
    top: 0.56,
    width: 0.24,
    height: 0.38,
  });
  await cropTo(file('burguer_boss_11'), 'suco-morango.jpg', {
    left: 0.7,
    top: 0.56,
    width: 0.24,
    height: 0.38,
  });

  // Delivery app thumbs — better for Xodó and drink cans
  // burgue_boss_1: 1024x414 — 3 cols, ~4 rows under header
  const d1 = file('burgue_boss_1');
  // Manual tuning: first thumb (Xodó) top-left after title bar
  await cropTo(d1, 'xodo.jpg', { left: 0.015, top: 0.2, width: 0.1, height: 0.24 });

  // Refrigerantes strip
  const d5 = file('burguer_boss_5');
  await cropTo(d5, 'coca-lata.jpg', { left: 0.35, top: 0.45, width: 0.1, height: 0.4 });
  await cropTo(d5, 'guarana-lata.jpg', { left: 0.68, top: 0.45, width: 0.1, height: 0.4 });
  await cropTo(d5, 'h2o-bottle.jpg', { left: 0.015, top: 0.72, width: 0.1, height: 0.25 });

  // Sucos strip
  const d6 = file('burguer_boss_6');
  await cropTo(d6, 'suco-laranja-morango-alt.jpg', { left: 0.35, top: 0.28, width: 0.12, height: 0.45 });
  await cropTo(d6, 'suco-morango-alt.jpg', { left: 0.015, top: 0.72, width: 0.12, height: 0.25 });

  // BB chicken delivery thumbs
  const d3 = file('burguer_boss_3');
  await cropTo(d3, 'bb-chicken-500.jpg', { left: 0.015, top: 0.3, width: 0.14, height: 0.55 });
  await cropTo(d3, 'bb-chicken-1kg.jpg', { left: 0.35, top: 0.3, width: 0.14, height: 0.55 });

  // Prefer delivery drink cans if flyer crops are messy — overwrite with lata crops when good
  // Keep flyer-based coca/guarana/h2o as primary; use lata as extras

  // Cleanup helper thumbs from previous run
  for (const f of fs.readdirSync(OUT)) {
    if (f.includes('-thumb')) fs.unlinkSync(path.join(OUT, f));
  }

  console.log('\nFiles:', fs.readdirSync(OUT).join(', '));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
