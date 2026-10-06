import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { categories } from '@/components/burger/catalog';
import ProductCard from '@/components/burger/ProductCard';

function MenuSkeleton() {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <article className="product-card product-skeleton" key={i}>
          <div className="product-photo skeleton-block" />
          <div className="product-info">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-short" />
            <div className="product-bottom">
              <div className="skeleton-line skeleton-price" />
              <div className="skeleton-line skeleton-btn" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function MenuSection({ products, loading, category, setCategory, onSelect }) {
  const [search, setSearch] = useState('');
  const filtered = products.filter(
    (p) =>
      (category === 'Todos' || p.category === category) &&
      `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="cardapio" className="container menu-section" aria-label="Cardápio">
      <div className="section-heading">
        <div>
          <div className="eyebrow">O DIFÍCIL É ESCOLHER UM SÓ</div>
          <h2>
            SEU PRÓXIMO <span>FAVORITO.</span>
          </h2>
        </div>
        <p>
          Receitas autorais. Ingredientes selecionados.
          <br />
          Personalize, peça e aproveite.
        </p>
      </div>

      <div className="menu-tools">
        <div className="category-tabs" role="tablist" aria-label="Categorias do cardápio">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={c === category}
              className={c === category ? 'active' : ''}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <input
            aria-label="Buscar no cardápio"
            placeholder="Buscar no cardápio"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <MenuSkeleton />
      ) : filtered.length ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="empty-state">Nenhum produto encontrado. Experimente outra categoria.</div>
      )}

      <div className="menu-footnote">
        <span>FEITO DO SEU JEITO.</span>
        <span>Escolha o ponto da carne, retire ingredientes e adicione extras.</span>
        <SlidersHorizontal size={17} aria-hidden="true" />
      </div>
    </section>
  );
}
