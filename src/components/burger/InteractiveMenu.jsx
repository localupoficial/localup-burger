import React, { useState } from 'react';
import { Beer, MessageCircle } from 'lucide-react';
import { menuItems, menuTabs, money, whatsappOrderUrl } from '@/data/yank';

/**
 * Cardápio interativo — abas sem recarregar a página.
 * Burgers com tag de harmonização + CTA WhatsApp.
 */
export default function InteractiveMenu() {
  const [activeTab, setActiveTab] = useState('burgers');

  const visible = menuItems.filter((item) => item.category === activeTab);
  const activeLabel = menuTabs.find((t) => t.id === activeTab)?.label ?? '';

  return (
    <section
      id="cardapio"
      className="border-t border-white/5 bg-[#171717] py-14 sm:py-16 md:py-20"
      aria-labelledby="cardapio-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b]">
            Cardápio
          </p>
          <h2
            id="cardapio-title"
            className="mt-3 font-heading text-3xl font-black uppercase tracking-tight text-[#f3f4f6] sm:text-4xl md:text-5xl"
          >
            Escolha e peça agora
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-[#a3a3a3] sm:text-base">
            Burgers artesanais com harmonização e chopp trincando — peça no WhatsApp.
          </p>
        </header>

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Categorias do cardápio"
        >
          {menuTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`yank-tab shrink-0 ${isActive ? 'is-active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="mt-6 sm:mt-8"
        >
          <p className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#a3a3a3] md:hidden">
            {activeLabel}
          </p>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((item) => (
              <li key={item.id}>
                <article className="yank-card group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] shadow-2xl transition duration-300 hover:border-[#f59e0b]/35 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.18)]">
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[#f3f4f6] transition duration-300 group-hover:text-[#f59e0b]">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-[#a3a3a3]">
                      {item.description}
                    </p>

                    {item.pairing ? (
                      <div className="mt-4 inline-flex items-center gap-2 self-start rounded-md border border-[#f59e0b] bg-[#0d0d0d] px-3 py-2 shadow-[0_0_12px_rgba(245,158,11,0.12)]">
                        <Beer size={14} className="shrink-0 text-[#f59e0b]" aria-hidden="true" />
                        <span className="font-heading text-[0.7rem] font-bold uppercase tracking-wide text-[#f59e0b]">
                          Harmoniza com: {item.pairing}
                        </span>
                      </div>
                    ) : null}

                    <div className="mt-auto flex flex-col gap-3 pt-4">
                      <p className="font-heading text-xl font-bold text-[#f59e0b]">
                        {money(item.price)}
                      </p>
                      <a
                        href={whatsappOrderUrl(
                          `Olá! Vim pelo site da Best Burguer 013 e gostaria de pedir: ${item.name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yank-btn-whatsapp"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        Pedir via WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {visible.length === 0 && (
            <p className="py-10 text-center font-body text-sm text-[#a3a3a3]">
              Nenhum item nesta categoria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
