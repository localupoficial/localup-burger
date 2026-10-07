import React from 'react';
import { Beer, MessageCircle } from 'lucide-react';
import { highlights, money, whatsappOrderUrl } from '@/data/yank';

/**
 * Destaques da Casa — carros-chefe com tag de harmonização.
 */
export default function Highlights() {
  return (
    <section
      id="destaques"
      className="bg-[#0d0d0d] py-14 sm:py-16 md:py-20"
      aria-labelledby="destaques-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b]">
            Destaques da Casa
          </p>
          <h2
            id="destaques-title"
            className="mt-3 font-heading text-3xl font-black uppercase tracking-tight text-[#f3f4f6] sm:text-4xl md:text-5xl"
          >
            Os carros-chefe do pub
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-[#a3a3a3] sm:text-base">
            Burgers que mais saem — cada um com a cerveja que combina.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {highlights.map((item) => (
            <li key={item.id}>
              <article className="yank-card group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-2xl transition duration-300 hover:border-[#f59e0b]/40 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.18)]">
                <div className="relative aspect-square overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {item.badge ? (
                    <span className="absolute left-3 top-3 rounded bg-gradient-to-r from-[#ea580c] to-[#f59e0b] px-2 py-1 font-heading text-[0.65rem] font-bold uppercase tracking-wide text-[#1a1005] shadow-lg shadow-[#f59e0b]/25">
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[#f3f4f6] transition duration-300 group-hover:text-[#f59e0b]">
                    {item.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 font-body text-sm leading-relaxed text-[#a3a3a3]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#f59e0b]/25 bg-[#0d0d0d] px-3 py-2.5">
                    <Beer
                      size={16}
                      className="mt-0.5 shrink-0 text-[#f59e0b]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-heading text-xs font-bold uppercase tracking-wide text-[#f59e0b]">
                        Harmoniza com {item.pairing}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-[#d4d4d4]">
                        {item.pairingNote}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="font-heading text-xl font-bold text-[#f59e0b]">
                      {money(item.price)}
                    </p>
                    <a
                      href={whatsappOrderUrl(
                        `Olá! Vim pelo site da Best Burguer 013 e gostaria de pedir: ${item.name}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="yank-btn-amber !min-h-[40px] !px-3 !py-2 !text-[0.7rem]"
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      Pedir
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
