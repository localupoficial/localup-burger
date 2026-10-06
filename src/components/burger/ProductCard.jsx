import React from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { money, productImage } from '@/components/burger/catalog';
export default function ProductCard({ product, onSelect }) {
  return <article className="product-card"><button className="product-photo" onClick={() => onSelect(product)} aria-label={`Personalizar ${product.name}`}><Image src={productImage(product)} alt={product.name} className="product-img" loading="lazy" />{product.badge && <span className={`product-badge ${product.badge === 'MAIS PEDIDO' ? 'hot' : ''}`}>{product.badge}</span>}<span className="photo-arrow"><ArrowUpRight size={19} /></span></button>
    <div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><strong>{money(product.price)}</strong><button onClick={() => onSelect(product)} aria-label={`Adicionar ${product.name}`}><Plus size={18} /><span>Adicionar</span></button></div></div>
  </article>;
}