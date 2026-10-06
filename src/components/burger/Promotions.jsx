import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { assets } from '@/components/burger/catalog';

export default function Promotions({ banners, onCategory }) {
  const [index, setIndex] = useState(0);
  const total = banners.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 6500);
    return () => clearInterval(timer);
  }, [total]);

  useEffect(() => {
    if (total > 0 && index >= total) setIndex(0);
  }, [total, index]);

  if (!total) return null;

  const item = banners[index % total];
  const image = item.image_url || assets[item.image_key];

  return (
    <section id="promocoes" className="container promotion-section" aria-label="Promoções">
      <div className="promo-card">
        {image && (
          <Image
            key={item.id}
            src={image}
            alt={item.title}
            className="promo-image"
            loading="lazy"
          />
        )}
        <div className="promo-content">
          <span className="eyebrow">
            <Flame size={14} /> COMBINA COM A SUA FOME
          </span>
          <h2>{item.title}</h2>
          {item.subtitle && <p>{item.subtitle}</p>}
          <a
            href="#cardapio"
            onClick={() => onCategory(item.category || 'Todos')}
          >
            EXPLORAR CARDÁPIO <ArrowUpRight size={17} />
          </a>
        </div>
        {total > 1 && (
          <div className="promo-controls">
            <button
              type="button"
              onClick={() => setIndex((index - 1 + total) % total)}
              aria-label="Banner anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((index + 1) % total)}
              aria-label="Próximo banner"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      {total > 1 && (
        <div className="slide-dots" role="tablist" aria-label="Indicadores de promoção">
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={i === index % total}
              onClick={() => setIndex(i)}
              aria-label={`Ver banner ${i + 1}: ${b.title}`}
              className={i === index % total ? 'active' : ''}
            />
          ))}
        </div>
      )}
    </section>
  );
}
