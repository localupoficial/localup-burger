import React from 'react';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { business } from '@/data/yank';

/**
 * Endereço, horários e mapa Google incorporado.
 */
export default function Location() {
  return (
    <section
      id="localizacao"
      className="bg-[#0d0d0d] py-14 sm:py-16 md:py-20"
      aria-labelledby="localizacao-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b]">
            Onde estamos
          </p>
          <h2
            id="localizacao-title"
            className="mt-3 font-heading text-3xl font-black uppercase tracking-tight text-[#f3f4f6] sm:text-4xl md:text-5xl"
          >
            Endereço e Horários
          </h2>
          <p className="mt-3 font-body text-sm text-[#a3a3a3] sm:text-base">
            Vicente de Carvalho · Guarujá/SP
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-6">
            <div className="flex gap-4 rounded-xl border border-white/10 bg-[#171717] p-5 shadow-2xl">
              <MapPin className="mt-0.5 shrink-0 text-[#f59e0b]" size={22} aria-hidden="true" />
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[#f3f4f6]">
                  Endereço
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#d4d4d4]">
                  {business.address.street}
                  <br />
                  {business.address.neighborhood}
                  <br />
                  {business.address.city} - {business.address.state}, {business.address.zip}
                </p>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#f59e0b] hover:text-[#fbbf24]"
                >
                  <Navigation size={16} aria-hidden="true" />
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-white/10 bg-[#171717] p-5 shadow-2xl">
              <Phone className="mt-0.5 shrink-0 text-[#f59e0b]" size={22} aria-hidden="true" />
              <div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[#f3f4f6]">
                  Contato
                </h3>
                <a
                  href={business.phoneHref}
                  className="mt-2 block font-body text-sm text-[#d4d4d4] hover:text-[#f59e0b]"
                >
                  {business.phone}
                </a>
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-body text-sm text-[#d4d4d4] hover:text-[#f59e0b]"
                >
                  WhatsApp {business.whatsapp}
                </a>
              </div>
            </div>

            <aside
              className="rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-5 sm:p-6"
              aria-label="Horário de funcionamento"
            >
              <div className="flex items-center gap-3 text-[#f59e0b]">
                <Clock size={22} aria-hidden="true" />
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide">
                  Horário de funcionamento
                </h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {business.hours.map((h) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between gap-4 border-b border-white/10 pb-2.5 font-body text-sm last:border-0 last:pb-0 ${
                      h.closed ? 'text-[#a3a3a3]' : 'text-[#f3f4f6]'
                    }`}
                  >
                    <span className="font-medium">{h.day}</span>
                    <span className={h.closed ? 'font-bold text-[#ea580c]' : 'font-semibold'}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Mapa incorporado */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-2xl">
            <iframe
              title={`Mapa — ${business.name} em Vicente de Carvalho, Guarujá`}
              src={business.mapsEmbedUrl}
              className="h-[min(420px,70vw)] w-full border-0 lg:h-full lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
