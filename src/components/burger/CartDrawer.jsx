import React, { useState } from 'react';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Overlay from '@/components/burger/Overlay';
import Checkout from '@/components/burger/Checkout';
import OrderSuccess from '@/components/burger/OrderSuccess';
import { money } from '@/components/burger/catalog';

export default function CartDrawer({ cart, setCart, onClose }) {
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const subtotal = cart.reduce((s, x) => s + x.price * x.quantity, 0);

  const change = (key, delta) =>
    setCart((c) =>
      c
        .map((x) => (x.key === key ? { ...x, quantity: x.quantity + delta } : x))
        .filter((x) => x.quantity > 0)
    );

  return (
    <Overlay title={order ? 'SEU PEDIDO' : 'MEU PEDIDO'} onClose={onClose} drawer>
      {order ? (
        <OrderSuccess order={order} onClose={onClose} />
      ) : checkout ? (
        <Checkout
          cart={cart}
          subtotal={subtotal}
          onBack={() => setCheckout(false)}
          onSuccess={(o) => {
            setOrder(o);
            setCart([]);
          }}
        />
      ) : cart.length ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((x) => (
              <div className="cart-item" key={x.key}>
                <Image src={x.image} alt={x.name} className="cart-item-image" />
                <div>
                  <h4>{x.name}</h4>
                  <p>{x.customization || 'Receita original'}</p>
                  <strong>{money(x.price * x.quantity)}</strong>
                  <div className="cart-item-controls">
                    <div className="quantity">
                      <button
                        type="button"
                        onClick={() => change(x.key, -1)}
                        aria-label={`Diminuir ${x.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <b>{x.quantity}</b>
                      <button
                        type="button"
                        onClick={() => change(x.key, 1)}
                        aria-label={`Aumentar ${x.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setCart((c) => c.filter((i) => i.key !== x.key))}
                      aria-label={`Remover ${x.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-totals">
              <div>
                <span>Itens</span>
                <b>{cart.reduce((s, x) => s + x.quantity, 0)}</b>
              </div>
              <div className="total">
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>
            </div>
            <p className="muted">Frete e total final na próxima etapa.</p>
            <button type="button" className="primary-btn" onClick={() => setCheckout(true)}>
              CONTINUAR PEDIDO <ArrowRight size={18} />
            </button>
            <button type="button" className="text-link" onClick={onClose}>
              QUERO MAIS UM BURGER
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <ShoppingBag size={48} />
          <h3>SUA FOME MERECE MAIS.</h3>
          <p>
            Seu carrinho ainda está vazio.
            <br />
            Encontre seu próximo favorito.
          </p>
          <button type="button" className="primary-btn" onClick={onClose}>
            EXPLORAR CARDÁPIO
          </button>
        </div>
      )}
    </Overlay>
  );
}
