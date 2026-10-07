import React from 'react';
import { Quote, Star } from 'lucide-react';
import { business, reviews, tripadvisorNote } from '@/data/yank';

function Stars({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-[#f59e0b] text-[#f59e0b]"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * Avaliações — Google (depoimentos públicos) + menção TripAdvisor.
 */
export default function Reviews() {
  return (
    <section
      id="avaliacoes"
      className="border-t border-white/5 bg-[#171717] py-14 sm:py-16 md:py-20"
      aria-labelledby="avaliacoes-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b]">
            Prova social
          </p>
          <h2
            id="avaliacoes-title"
            className="mt-3 font-heading text-3xl font-black uppercase tracking-tight text-[#f3f4f6] sm:text-4xl md:text-5xl"
          >
            O que nossos clientes dizem
          </h2>
          <p className="mt-3 font-body text-sm text-[#a3a3a3] sm:text-base">
            <span className="font-semibold text-[#f59e0b]">★ {business.rating}</span> no Google
            {' · '}
            Avaliações públicas e reconhecimento no TripAdvisor
          </p>
        </header>

        {/* Card TripAdvisor (reconhecimento editorial, não depoimento inventado) */}
        <aside className="mx-auto mt-8 max-w-3xl rounded-xl border border-[#00af87]/35 bg-[#00af87]/10 px-5 py-4 text-center sm:mt-10">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#00af87]">
            TripAdvisor
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-[#f3f4f6]">{tripadvisorNote}</p>
        </aside>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {reviews.map((item) => (
            <li key={item.id}>
              <article className="relative flex h-full flex-col rounded-xl border border-white/10 bg-[#0d0d0d] p-5 shadow-2xl transition duration-300 hover:border-[#f59e0b]/25">
                <Quote
                  className="absolute right-4 top-4 text-[#f59e0b]/20"
                  size={28}
                  aria-hidden="true"
                />
                <Stars count={item.rating} />
                <blockquote className="mt-4 flex-1">
                  <p className="font-body text-sm leading-relaxed text-[#d4d4d4]">
                    “{item.quote}”
                  </p>
                </blockquote>
                <footer className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <p className="font-heading text-sm font-bold uppercase tracking-wide text-[#f3f4f6]">
                    {item.name}
                  </p>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-heading text-[0.65rem] font-bold uppercase tracking-wide text-[#a3a3a3]">
                    {item.source}
                  </span>
                </footer>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="yank-btn-outline"
          >
            Ver mais no Google
          </a>
        </div>
      </div>
    </section>
  );
}
