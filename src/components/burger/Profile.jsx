import React, { useState } from 'react';
import Overlay from '@/components/burger/Overlay';
export default function Profile({ onClose }) {
  const saved = JSON.parse(localStorage.getItem('localup-profile') || '{}');
  const [name, setName] = useState(saved.name || ''), [phone, setPhone] = useState(saved.phone || '');
  return <Overlay title="SEU PERFIL DE ENTREGA" onClose={onClose}><form className="form-body" onSubmit={e => { e.preventDefault(); localStorage.setItem('localup-profile', JSON.stringify({ name, phone })); onClose(); }}><p className="muted">Salve seus dados neste dispositivo e agilize seu próximo pedido. Não é necessário criar uma conta.</p><label className="field">Seu nome<input required value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label><label className="field">Telefone<input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" /></label><button className="primary-btn">SALVAR MEUS DADOS</button></form></Overlay>;
}