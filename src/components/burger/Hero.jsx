import React from 'react';
import { Star, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { business, orderHref } from '@/data/yank';
import ExplodedBurger from '@/components/burger/ExplodedBurger';

/**
 * Hero — marca Best Burguer 013 + burger interativo (camadas se juntam no hover).
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#0d0d0d] md:min-h-[min(100svh,900px)]"
      aria-label={`Destaque ${business.name}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(229,43,48,0.18),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(245,158,11,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="max-w-xl">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-[#f59e0b] sm:text-base">
            {business.name}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#f59e0b]/35 bg-[#171717]/80 px-3 py-1.5 backdrop-blur-sm">
            <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#f3f4f6]">
              ★ {business.ratingLabel}
            </span>
          </div>

          <h1 className="mt-5 font-heading text-[clamp(2rem,8.5vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tight text-[#f3f4f6]">
            Não é só
            <br />
            um <span className="text-[#f59e0b]">burger.</span>
          </h1>

          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#d4d4d4] sm:mt-5 sm:text-base md:text-lg">
            Carne no ponto, cheddar de verdade e a primeira mordida que muda tudo.
            Bem-vindo à {business.name}.
          </p>

          <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center">
            <a href="#cardapio" className="yank-btn-amber w-full justify-center sm:w-auto">
              <UtensilsCrossed size={18} aria-hidden="true" />
              Ver Cardápio
            </a>
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="yank-btn-outline w-full justify-center sm:w-auto"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              Fazer Pedido
            </a>
          </div>

          <p className="mt-5 font-body text-xs uppercase tracking-[0.14em] text-[#737373]">
            Passe o mouse no burger · veja tudo se juntar
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ExplodedBurger />
        </div>
      </div>
    </section>
  );
}
