import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { money, statuses } from '@/components/burger/catalog';

export default function OrderSuccess({ order, onClose }) {
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    if (order._demo || String(order.id).startsWith('demo-')) return undefined;
    return base44.entities.Order.subscribe((e) => {
      if (e.id === order.id && e.data?.status) setStatus(e.data.status);
    });
  }, [order.id, order._demo]);

  return (
    <div className="success-body">
      <div className="success-icon">
        <Check size={32} />
      </div>
      <div className="eyebrow">PEDIDO ENVIADO</div>
      <h3>AGORA É COM A GENTE.</h3>
      <p>
        Pedido #{order.id.slice(-6).toUpperCase()}
        <br />
        {order.customer_name}, acompanhe o status aqui.
      </p>
      <div className="order-progress" aria-label="Status do pedido">
        {statuses.map((s, i) => (
          <div key={s} className={i <= statuses.indexOf(status) ? 'done' : ''}>
            <span>{i + 1}</span>
            {s}
          </div>
        ))}
      </div>
      <p>
        Total: <strong>{money(order.total)}</strong>
        <br />
        <small>
          Pagamento na {order.shipping ? 'entrega' : 'retirada'} • {order.payment}
        </small>
      </p>
      <button type="button" className="primary-btn" onClick={onClose}>
        VOLTAR AO CARDÁPIO
      </button>
    </div>
  );
}
