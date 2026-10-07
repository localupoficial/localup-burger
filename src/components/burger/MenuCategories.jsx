import React, { useEffect, useId, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { business, menuFilters, menuItems, money } from '@/data/burgerBoss';

function ProductModal({ item, onClose }) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className="bb-modal-panel relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="icon-btn absolute right-2 top-2 z-10 min-h-[44px] min-w-[44px]"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="pr-10">
          <h3 id={titleId} className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {item.name}
          </h3>
          {item.description ? <p className="mt-3 bb-lead text-sm sm:text-base">{item.description}</p> : null}
          <p className="mt-5 font-heading text-2xl font-bold text-[var(--lu-yellow)]">{money(item.price)}</p>
          {typeof item.combo === 'number' ? (
            <p className="mt-1 font-body text-sm text-[var(--lu-text-muted)]">
              Combo: <span className="font-semibold text-white">{money(item.combo)}</span>
            </p>
          ) : null}
        </div>

        <a
          href={`${business.whatsappHref}?text=${encodeURIComponent(`Olá! Quero pedir: ${item.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bb-whatsapp-btn mt-6 w-full"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Pedir no WhatsApp
        </a>
      </div>
    </div>
  );
}

function ProductCard({ item, onOpen }) {
  return (
    <article className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-[var(--lu-border)] bg-gradient-to-b from-[#1d1d1d] to-[#151515] p-4 transition duration-300 hover:border-[rgba(243,188,69,0.28)] hover:bg-[#1a1a1a] sm:p-5">
      <button type="button" className="w-full text-left" onClick={() => onOpen(item)}>
        <h3 className="font-heading text-base font-bold leading-tight tracking-tight text-white transition group-hover:text-[var(--lu-yellow)] sm:text-lg">
          {item.name}
        </h3>
        {item.description ? (
          <p className="mt-1.5 line-clamp-3 font-body text-xs leading-relaxed text-[var(--lu-text-muted)] sm:text-sm">
            {item.description}
          </p>
        ) : null}
      </button>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="font-heading text-base font-bold text-[var(--lu-yellow)] sm:text-lg">{money(item.price)}</p>
          {typeof item.combo === 'number' ? (
            <p className="mt-0.5 font-body text-[0.65rem] text-[var(--lu-text-dim)] sm:text-xs">
              Combo {money(item.combo)}
            </p>
          ) : null}
        </div>
        <a
          href={`${business.whatsappHref}?text=${encodeURIComponent(`Olá! Quero pedir: ${item.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md bg-[var(--lu-yellow)] px-2.5 py-1.5 font-heading text-[0.65rem] font-bold uppercase tracking-wide text-[var(--lu-yellow-ink)] transition hover:brightness-110 sm:text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle size={12} aria-hidden="true" />
          Pedir
        </a>
      </div>
    </article>
  );
}

export default function MenuCategories() {
  const [filter, setFilter] = useState('todos');
  const [selected, setSelected] = useState(null);

  const visible =
    filter === 'todos' ? menuItems : menuItems.filter((item) => item.filter === filter);

  return (
    <section
      id="cardapio"
      className="menu-section bb-section-dark !py-6 sm:!py-10 md:!py-16 lg:!py-24"
      aria-labelledby="cardapio-title"
    >
      <div className="container">
        <div className="section-heading mx-auto block max-w-2xl text-center md:mx-0 md:text-left">
          <p className="bb-eyebrow">Cardápio</p>
          <h2 id="cardapio-title" className="!text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">
            Escolha e peça agora
          </h2>
          <p className="bb-lead mt-3 text-sm sm:text-base md:mt-4">
            Valores oficiais do cardápio. Combos: hambúrguer + batata 150g + refri lata.
          </p>
        </div>

        <div
          className="bb-filters-scroll mt-5 flex space-x-2 overflow-x-auto pb-2 sm:mt-6 md:mt-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filtros do cardápio"
        >
          {menuFilters.map((tab) => {
            const active = tab.id === filter;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`bb-filter-tab min-h-[44px] ${active ? 'is-active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <ul
          className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
          role="tabpanel"
        >
          {visible.map((item) => (
            <li key={item.id} className="h-full">
              <ProductCard item={item} onOpen={setSelected} />
            </li>
          ))}
        </ul>

        {visible.length === 0 && (
          <p className="mt-6 text-center font-body text-sm text-[var(--lu-text-muted)] md:text-left">
            Nenhum item nesta categoria.
          </p>
        )}

        {(filter === 'todos' || filter === 'porcoes') && (
          <p className="mt-6 text-center font-body text-xs text-[var(--lu-text-dim)] sm:text-sm md:mt-8 md:text-left">
            Molhos BB Chicken: {business.sauces.join(' · ')}
          </p>
        )}
      </div>

      {selected && <ProductModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
