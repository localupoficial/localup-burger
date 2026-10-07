import React from 'react';
import { Facebook, Instagram, MessageCircle, Phone } from 'lucide-react';
import { business, navLinks, orderHref } from '@/data/yank';

/**
 * Rodapé — links rápidos, redes e copyright.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="border-t border-white/10 bg-[#0d0d0d]" aria-labelledby="footer-title">
      {/* CTA final */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#ea580c] to-[#f59e0b]">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:items-center sm:px-6 sm:text-left lg:px-8">
          <div>
            <p className="font-heading text-xl font-black uppercase tracking-tight text-[#1a1005] sm:text-2xl">
              Pronto para pedir?
            </p>
            <p className="mt-1 font-body text-sm text-[#1a1005]/90">
              WhatsApp · Delivery · Retirada no pub
            </p>
          </div>
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#0d0d0d] px-5 font-heading text-sm font-bold uppercase tracking-wide text-[#f3f4f6] transition hover:bg-[#171717]"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Pedir no WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <h2 id="footer-title" className="yank-wordmark !text-2xl">
            BEST
            <span className="mt-1 block text-[0.55em] font-semibold tracking-[0.18em] text-[#f59e0b]">
              BURGUER 013
            </span>
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-[#a3a3a3]">
            {business.tagline}
            <br />
            {business.address.neighborhood}, {business.address.city}/{business.address.state}
          </p>
        </div>

        <div>
          <h3 className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#f59e0b]">
            Links rápidos
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-body text-sm text-[#d4d4d4] transition hover:text-[#f59e0b]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#f59e0b]">
            Contato
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 font-body text-sm text-[#d4d4d4] hover:text-[#f59e0b]"
              >
                <Phone size={16} aria-hidden="true" />
                {business.phone}
              </a>
            </li>
            <li>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-[#d4d4d4] hover:text-[#f59e0b]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp {business.whatsapp}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#f59e0b]">
            Redes sociais
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={business.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#171717] px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wide text-[#f3f4f6] transition hover:border-[#f59e0b]/50 hover:text-[#f59e0b]"
              aria-label={`Instagram ${business.instagram}`}
            >
              <Instagram size={18} aria-hidden="true" />
              {business.instagram}
            </a>
            <a
              href={business.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#171717] px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wide text-[#f3f4f6] transition hover:border-[#f59e0b]/50 hover:text-[#f59e0b]"
              aria-label="Facebook Best Burguer 013"
            >
              <Facebook size={18} aria-hidden="true" />
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 font-body text-xs text-[#737373] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>
            © {year} {business.name}. Todos os direitos reservados.
          </span>
          <span>Vicente de Carvalho · Guarujá/SP</span>
        </div>
      </div>
    </footer>
  );
}
