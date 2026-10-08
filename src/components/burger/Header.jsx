import React, { useEffect, useState } from 'react';
import { ShoppingBag, UserRound, Menu, X } from 'lucide-react';

export default function Header({ count, onCart, onProfile }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [open]);

  const links = [
    ['Home', '#home'],
    ['Cardápio', '#cardapio'],
    ['Sobre nós', '#sobre'],
    ['Contato', '#contato'],
  ];

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <a className="wordmark" href="/" aria-label="Best Burguer 013 início">
          best <span>Burguer</span>
          <small>013</small>
        </a>

        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Menu principal">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="outline-btn header-menu-cta" href="#cardapio">
            Cardápio
          </a>
          <button className="icon-btn profile-btn" onClick={onProfile} aria-label="Meu perfil">
            <UserRound size={20} />
          </button>
          <button className="cart-btn" onClick={onCart} aria-label={`Meu pedido, ${count} itens`}>
            <ShoppingBag size={18} />
            <span className="cart-text">Meu pedido</span>
            <b>{count}</b>
          </button>
          <button
            className="icon-btn mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
