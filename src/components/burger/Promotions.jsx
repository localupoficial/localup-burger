import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { assets } from '@/components/burger/catalog';
export default function Promotions({ banners, onCategory }) {
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => setIndex(i => (i + 1) % Math.max(banners.length, 1)), 6500); return () => clearInterval(timer); }, [banners.length]);
  const item = banners[index % Math.max(banners.length, 1)];
  if (!item) return null;
  return <section id="promocoes" className="container promotion-section"><div className="promo-card">
    {(item.image_url || item.image_key) && <Image src={item.image_url || assets[item.image_key]} alt={item.title} className="promo-image" loading="lazy" />}
    <div className="promo-content"><span className="eyebrow"><Flame size={14} /> COMBINA COM A SUA FOME</span><h2>{item.title}</h2><p>{item.subtitle}</p><a href="#cardapio" onClick={() => onCategory(item.category || 'Todos')}>EXPLORAR CARDÁPIO <ArrowUpRight size={17} /></a></div>
    <div className="promo-controls"><button onClick={() => setIndex((index - 1 + banners.length) % banners.length)} aria-label="Banner anterior"><ChevronLeft size={18} /></button><button onClick={() => setIndex((index + 1) % banners.length)} aria-label="Próximo banner"><ChevronRight size={18} /></button></div>
  </div><div className="slide-dots">{banners.map((b, i) => <button key={b.id} onClick={() => setIndex(i)} aria-label={`Ver banner ${i + 1}`} className={i === index % banners.length ? 'active' : ''} />)}</div></section>;
}