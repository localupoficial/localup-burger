import React from 'react';
import { ArrowUpRight, Flame, ArrowDown, Leaf, Beef, ChefHat } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { assets } from '@/components/burger/catalog';
export default function Hero() {
  return <><section id="home" className="hero">
    <Image src={assets.hero} alt="Hambúrguer artesanal com brioche, bacon crocante e cheddar em composição 3D suspensa" className="hero-image" loading="eager" fetchPriority="high" />
    <div className="hero-shade" /><div className="hero-content container"><div className="eyebrow"><span /> ARTESANAL NA ESSÊNCIA. EXTRAORDINÁRIO NO SABOR.</div>
      <h1>NÃO É SÓ<br />UM <span>BURGER.</span></h1><p>É carne no ponto. Cheddar de verdade.<br />E aquela primeira mordida que muda tudo.</p>
      <a className="primary-btn" href="#cardapio">ENCONTRE SEU FAVORITO <ArrowUpRight size={19} /></a>
      <div className="hero-note"><Flame size={16} /> Feito na hora. Sem atalhos.</div>
    </div><div className="hero-bottom container"><span>INGREDIENTES REAIS. SABOR SEM LIMITES.</span><a href="#promocoes" aria-label="Explorar promoções"><ArrowDown size={19} /></a><span className="hero-edition">LOCALUP SIGNATURE / 01</span></div>
  </section><div className="quality-strip"><span><Beef /> BLEND ARTESANAL</span><i /><span><Leaf /> INGREDIENTES FRESCOS</span><i /><span><Flame /> GRELHADO NA HORA</span><i /><span><ChefHat /> RECEITAS AUTORAIS</span></div></>;
}