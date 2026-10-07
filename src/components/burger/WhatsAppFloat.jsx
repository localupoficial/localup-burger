import React from 'react';
import { MessageCircle } from 'lucide-react';
import { business, orderHref } from '@/data/yank';

/**
 * Botão flutuante WhatsApp — canto inferior direito, acompanha a rolagem (position: fixed).
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={orderHref}
      target="_blank"
      rel="noopener noreferrer"
      className="yank-wa-float"
      aria-label="Pedir no WhatsApp da Best Burguer 013"
      title="Pedir no WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={2.25} aria-hidden="true" />
      <span className="sr-only">WhatsApp {business.whatsapp}</span>
    </a>
  );
}
