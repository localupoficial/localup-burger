import React, { useState } from 'react';
import { Minus, Plus, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Overlay from '@/components/burger/Overlay';
import { money, productImage } from '@/components/burger/catalog';
export default function Customize({ product, onClose, onAdd }) {
  const [point, setPoint] = useState('Ao ponto'), [extras, setExtras] = useState([]), [removed, setRemoved] = useState([]), [note, setNote] = useState(''), [qty, setQty] = useState(1);
  const burger = ['Hambúrgueres', 'Combos'].includes(product.category);
  const options = [{ name: 'Bacon extra', price: 5 }, { name: 'Queijo extra', price: 4 }];
  const toggle = (setter, values, v) => setter(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  const price = product.price + options.filter(x => extras.includes(x.name)).reduce((s, x) => s + x.price, 0);
  const add = () => { onAdd({ key: crypto.randomUUID(), product_id: product.id, name: product.name, image: productImage(product), price, quantity: qty, customization: [burger ? `Ponto: ${point}` : '', extras.join(', '), removed.length ? `Sem ${removed.join(', ')}` : '', note].filter(Boolean).join(' • ') }); onClose(); };
  return <Overlay title="DO SEU JEITO" onClose={onClose}><Image src={productImage(product)} alt={product.name} className="custom-image" /><div className="custom-body"><div className="custom-title"><h3>{product.name}</h3><strong>{money(product.price)}</strong></div><p className="muted">{product.description}</p>
    {burger && <><h4>PONTO DA CARNE</h4><div className="choice-row">{['Mal passado', 'Ao ponto', 'Bem passado'].map(p => <button key={p} className={point === p ? 'active' : ''} onClick={() => setPoint(p)}>{p}</button>)}</div><h4>UM EXTRA DE SABOR</h4>{options.map(o => <label className="check-row" key={o.name}><input type="checkbox" checked={extras.includes(o.name)} onChange={() => toggle(setExtras, extras, o.name)} /><span>{o.name}</span><b>+ {money(o.price)}</b></label>)}</>}
    {!!product.ingredients?.length && <><h4>RETIRAR INGREDIENTES</h4><div className="choice-row wrap">{product.ingredients.map(i => <button key={i} className={removed.includes(i) ? 'active' : ''} onClick={() => toggle(setRemoved, removed, i)}>{removed.includes(i) && <Check size={13} />} Sem {i.toLowerCase()}</button>)}</div></>}
    <label className="field"><span>OBSERVAÇÕES <small>(opcional)</small></span><textarea placeholder="Algo que precisamos saber?" maxLength={300} value={note} onChange={e => setNote(e.target.value)} /></label><div className="custom-actions"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir quantidade"><Minus size={16} /></button><b>{qty}</b><button onClick={() => setQty(qty + 1)} aria-label="Aumentar quantidade"><Plus size={16} /></button></div><button className="primary-btn" onClick={add}>ADICIONAR • {money(price * qty)} <Plus size={17} /></button></div>
  </div></Overlay>;
}