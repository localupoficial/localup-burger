import React from 'react';
import { Clock, Instagram, MapPin, Navigation, Wifi } from 'lucide-react';
import { business } from '@/data/burgerBoss';

export default function AboutLocation() {
  return (
    <section id="sobre" className="bg-[#F7F1E6] py-16 sm:py-20 lg:py-24" aria-labelledby="sobre-title">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">Sobre e localização</p>
          <h2 id="sobre-title" className="mt-3 font-heading text-4xl font-black tracking-tight text-[#1A0508] sm:text-5xl">
            No Royal Trade Center, Gonzaga
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-[#3D342C] sm:text-lg">
            A {business.name} fica no Royal Trade Center, em Santos. Hambúrgueres na churrasqueira,
            smash, BB Chicken e batatas — para comer no local, levar ou receber em casa.
          </p>

          <div className="mt-8 flex gap-4">
            <MapPin className="mt-1 shrink-0 text-[#E10600]" size={22} aria-hidden="true" />
            <div>
              <h3 className="font-heading text-lg font-extrabold uppercase tracking-wide text-[#1A0508]">Endereço</h3>
              <p className="mt-1 font-body text-[#3D342C]">
                {business.address.street} — {business.address.neighborhood}
                <br />
                {business.address.city}, {business.address.zip}
              </p>
              <p className="mt-1 font-body text-sm text-[#6B5E52]">Plus Code: {business.address.plusCode}</p>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-wide text-[#E10600] hover:text-[#1A0508]"
              >
                <Navigation size={16} aria-hidden="true" />
                Abrir no Maps
              </a>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Wifi className="mt-1 shrink-0 text-[#E10600]" size={22} aria-hidden="true" />
            <div>
              <h3 className="font-heading text-lg font-extrabold uppercase tracking-wide text-[#1A0508]">Wi-Fi</h3>
              <p className="mt-1 font-body text-[#3D342C]">
                Rede: <strong>{business.wifi.ssid}</strong>
                <br />
                Senha: <strong>{business.wifi.password}</strong>
              </p>
            </div>
          </div>

          <a
            href={business.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#1A0508] px-4 py-3 font-heading text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#E10600]"
          >
            <Instagram size={18} aria-hidden="true" />
            Instagram {business.instagram}
          </a>
        </div>

        <aside className="rounded-xl border-2 border-[#1A0508] bg-[#E10600] p-6 text-white sm:p-8" aria-label="Horário de funcionamento">
          <div className="flex items-center gap-3">
            <Clock size={22} aria-hidden="true" />
            <h3 className="font-heading text-xl font-extrabold uppercase tracking-wide">Horário de funcionamento</h3>
          </div>
          <ul className="mt-6 space-y-3">
            {business.hours.map((h) => (
              <li
                key={h.day}
                className={`flex items-center justify-between gap-4 border-b border-white/20 pb-3 font-body text-sm sm:text-base ${
                  h.closed ? 'rounded-md bg-[#1A0508] px-3 py-2 border-b-0' : ''
                }`}
              >
                <span className="font-semibold">{h.day}</span>
                <span className={h.closed ? 'font-extrabold text-[#FFD200]' : 'font-bold'}>{h.time}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
