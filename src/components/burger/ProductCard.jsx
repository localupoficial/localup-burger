import React from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { money, productImage } from '@/components/burger/catalog';

export default function ProductCard({ product, onSelect }) {
  const badgeHot = product.badge === 'MAIS PEDIDO';

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-photo"
        onClick={() => onSelect(product)}
        aria-label={`Personalizar ${product.name}`}
      >
        <Image
          src={productImage(product)}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-badge${badgeHot ? ' hot' : ''}`}>{product.badge}</span>
        )}
        <span className="photo-arrow" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </button>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>{money(product.price)}</strong>
          <button type="button" onClick={() => onSelect(product)} aria-label={`Adicionar ${product.name}`}>
            <Plus size={17} />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
