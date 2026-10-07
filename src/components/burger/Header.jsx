import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { business, navLinks, orderHref } from '@/data/yank';

/**
 * Navbar fixa — desktop com links, mobile com menu hambúrguer.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`yank-header fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${
        scrolled || open ? 'yank-header--solid' : ''
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-8">
        <a
          href="#inicio"
          className="yank-wordmark shrink-0"
          aria-label={`${business.name} - inicio`}
        >
          BEST
          <span className="block text-[0.55em] font-semibold tracking-[0.18em] text-[#f59e0b]">
            BURGUER 013
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Menu principal">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-body text-sm font-medium text-[#a3a3a3] transition hover:text-[#f3f4f6]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="yank-btn-amber !min-h-[40px] !px-3 !py-2 !text-[0.6875rem] sm:!min-h-[44px] sm:!px-4 sm:!text-xs"
          >
            Fazer Pedido
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#f3f4f6] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="yank-mobile-nav"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="yank-mobile-nav"
          className="border-t border-white/10 bg-[rgba(13,13,13,0.98)] px-4 py-4 backdrop-blur-lg sm:px-6 lg:hidden"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-3.5 font-heading text-lg font-bold uppercase tracking-wide text-[#f3f4f6] last:border-0"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
