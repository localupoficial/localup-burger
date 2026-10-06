import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { deliveryZones, money } from '@/components/burger/catalog';
import { createOrderWithDemoFallback } from '@/lib/catalogService';

export default function Checkout({ cart, subtotal, onBack, onSuccess }) {
  const saved = JSON.parse(localStorage.getItem('localup-profile') || '{}');
  const [name, setName] = useState(saved.name || '');
  const [phone, setPhone] = useState(saved.phone || '');
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState(0);
  const [payment, setPayment] = useState('Cartão');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const shipping = deliveryZones[zone].fee;
  const total = subtotal + shipping;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = {
        customer_name: name,
        phone,
        address: zone ? address : 'Retirada no balcão',
        delivery: deliveryZones[zone].label,
        payment,
        items: cart.map(({ name: itemName, quantity, price, customization }) => ({
          name: itemName,
          quantity,
          price,
          customization,
        })),
        subtotal,
        shipping,
        total,
        status: 'Aguardando Confirmação',
      };
      const { order } = await createOrderWithDemoFallback(payload);
      localStorage.setItem('localup-profile', JSON.stringify({ name, phone }));
      onSuccess(order);
    } catch {
      setError('Não foi possível enviar o pedido. Tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={submit}>
      <button type="button" className="text-link" onClick={onBack}>
        <ArrowLeft size={16} /> VOLTAR AO CARRINHO
      </button>

      <h3>QUASE NA CHAPA.</h3>
      <p className="muted">Confira seus dados e escolha como receber.</p>

      <div className="checkout-trust" aria-hidden="true">
        <span>Sem cobrança online</span>
        <span>Confirmação pela equipe</span>
        <span>Pagamento na entrega/retirada</span>
      </div>

      <label className="field">
        Seu nome
        <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>

      <label className="field">
        Telefone / WhatsApp
        <input
          required
          type="tel"
          minLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </label>

      <label className="field">
        Entrega ou retirada
        <select value={zone} onChange={(e) => setZone(Number(e.target.value))}>
          {deliveryZones.map((z, i) => (
            <option value={i} key={z.label}>
              {z.label} • {money(z.fee)}
            </option>
          ))}
        </select>
      </label>

      {zone > 0 && (
        <label className="field">
          Endereço completo e referência
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número, bairro, cidade e complemento"
            autoComplete="street-address"
          />
        </label>
      )}

      <small className="muted">
        Tarifas por faixa de distância. A disponibilidade de entrega será confirmada pela equipe.
      </small>

      <label className="field">
        Pagamento na {zone ? 'entrega' : 'retirada'}
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option>Cartão</option>
          <option>Dinheiro</option>
          <option>Pix presencial</option>
        </select>
      </label>

      <div className="cart-totals">
        <div>
          <span>Produtos</span>
          <b>{money(subtotal)}</b>
        </div>
        <div>
          <span>Frete</span>
          <b>{money(shipping)}</b>
        </div>
        <div className="total">
          <span>Total</span>
          <b>{money(total)}</b>
        </div>
      </div>

      {error && (
        <p role="alert" className="error-text">
          {error}
        </p>
      )}

      <button disabled={busy} className="primary-btn" type="submit">
        {busy ? 'ENVIANDO…' : 'CONFIRMAR PEDIDO'}
        <ArrowRight size={18} />
      </button>

      <small className="muted">
        Seu pedido será enviado para confirmação. Nenhuma cobrança online é realizada.
      </small>
    </form>
  );
}
