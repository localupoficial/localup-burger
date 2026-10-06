import React from 'react';
import { ArrowUpRight, Flame, ArrowDown, Leaf, Beef, ChefHat } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { assets } from '@/components/burger/catalog';

export default function Hero() {
  return (
    <>
      <section id="home" className="hero" aria-label="Apresentação LOCALUP Burger">
        <Image
          src={assets.hero}
          alt="Hambúrguer artesanal com brioche, bacon crocante e cheddar em composição gastronômica"
          className="hero-image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content container">
          <div className="eyebrow">
            <span /> ARTESANAL NA ESSÊNCIA. EXTRAORDINÁRIO NO SABOR.
          </div>
          <h1>
            NÃO É SÓ
            <br />
            UM <span>BURGER.</span>
          </h1>
          <p>
            Carne no ponto. Cheddar de verdade.
            <br />
            A primeira mordida que muda tudo.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#cardapio">
              ENCONTRE SEU FAVORITO <ArrowUpRight size={18} />
            </a>
            <a className="outline-btn" href="#promocoes">
              VER PROMOÇÕES
            </a>
          </div>
          <div className="hero-note">
            <Flame size={16} /> Feito na hora. Sem atalhos.
          </div>
        </div>

        <div className="hero-bottom container">
          <span>INGREDIENTES REAIS. SABOR SEM LIMITES.</span>
          <a href="#promocoes" aria-label="Explorar promoções">
            <ArrowDown size={18} />
          </a>
          <span className="hero-edition">LOCALUP SIGNATURE / 01</span>
        </div>
      </section>

      <div className="quality-strip" aria-label="Diferenciais">
        <span>
          <Beef /> BLEND ARTESANAL
        </span>
        <i />
        <span>
          <Leaf /> INGREDIENTES FRESCOS
        </span>
        <i />
        <span>
          <Flame /> GRELHADO NA HORA
        </span>
        <i />
        <span>
          <ChefHat /> RECEITAS AUTORAIS
        </span>
      </div>
    </>
  );
}
