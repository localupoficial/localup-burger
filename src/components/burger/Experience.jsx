import React from 'react';
import { Beer, Flame, Music2 } from 'lucide-react';
import { business } from '@/data/yank';

const pillars = [
  {
    icon: Flame,
    title: 'Burgers artesanais',
    text: 'Blend na medida, pão macio e ingredientes de verdade — sem atalho de fast food.',
  },
  {
    icon: Beer,
    title: 'Cerveja com história',
    text: 'Carta nacional e importada, com gente que entende e sugere a harmonia certa.',
  },
  {
    icon: Music2,
    title: 'Clima de pub',
    text: 'Decoração acolhedora, atendimento próximo e a vibe certa para a noite em Guarujá.',
  },
];

/**
 * A Experiência Yank — sobre o pub.
 */
export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-[#0d0d0d] py-14 sm:py-16 md:py-20"
      aria-labelledby="experiencia-title"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#f59e0b]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b]">
            A Experiência Best
          </p>
          <h2
            id="experiencia-title"
            className="mt-3 font-heading text-3xl font-black uppercase tracking-tight text-[#f3f4f6] sm:text-4xl md:text-5xl"
          >
            Mais que hambúrguer. É experiência.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-[#a3a3a3] sm:text-base md:text-lg">
            Na {business.name}, o ritual é simples: burger artesanal, ingredientes de verdade
            e aquele sabor que faz pedir de novo. Feito na hora, sem atalho.
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-[#a3a3a3] sm:text-base">
            Peça pelo WhatsApp, retire ou aproveite no local — o melhor lanche da região 013.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-1">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-4 rounded-xl border border-white/10 bg-[#171717] p-5 shadow-2xl"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f59e0b]/12 text-[#f59e0b]">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[#f3f4f6]">
                  {title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-[#a3a3a3]">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
