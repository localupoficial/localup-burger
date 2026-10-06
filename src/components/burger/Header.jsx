import React, { useState } from 'react';
import { ShoppingBag, UserRound, Menu, X, ArrowUpRight } from 'lucide-react';
export default function Header({ count, onCart, onProfile }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner">
    <a className="wordmark" href="/" aria-label="LOCALUP Burger início">LOCAL<span>UP</span><small>BURGER • FEITO DE VERDADE</small></a>
    <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Menu principal">{[['Home', '#home'], ['Cardápio', '#cardapio'], ['Sobre nós', '#sobre'], ['Contato', '#contato']].map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <div className="header-actions"><button className="icon-btn profile-btn" onClick={onProfile} aria-label="Meu perfil"><UserRound size={20} /></button><button className="cart-btn" onClick={onCart}><ShoppingBag size={18} /><span className="cart-text">Meu pedido</span><b>{count}</b></button><button className="icon-btn mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X /> : <Menu />}</button></div>
  </div></header>;
}