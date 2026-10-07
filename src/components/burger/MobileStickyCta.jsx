import React from 'react';
import { MessageCircle } from 'lucide-react';
import { business } from '@/data/burgerBoss';

/** Sticky CTA só no celular — não aparece em md+ */
export default function MobileStickyCta() {
  return (
    <div
      className="bb-mobile-sticky md:hidden"
      role="complementary"
      aria-label="Pedido rápido"
    >
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="bb-mobile-sticky__btn"
      >
        <MessageCircle size={20} aria-hidden="true" />
        <span>Pedir via WhatsApp</span>
      </a>
    </div>
  );
}
