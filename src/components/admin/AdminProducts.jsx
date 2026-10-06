import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { money, productImage } from '@/components/burger/catalog';
import ProductForm from '@/components/admin/ProductForm';
export default function AdminProducts() {
  const client = useQueryClient(), [editing, setEditing] = useState(null), [creating, setCreating] = useState(false);
  const { data: products = [], isLoading } = useQuery({ queryKey: ['admin-products'], queryFn: () => base44.entities.Product.list('created_date', 200) });
  const refresh = () => { client.invalidateQueries({ queryKey: ['admin-products'] }); client.invalidateQueries({ queryKey: ['products'] }); };
  return <div><div className="admin-section-top"><p>{products.length} produtos no seu cardápio</p><button className="primary-btn" onClick={() => setCreating(true)}><Plus size={17} /> NOVO PRODUTO</button></div>{isLoading ? <div className="empty-state">Carregando produtos…</div> : <div className="admin-product-list">{products.map(p => <article className="admin-product-row" key={p.id}><Image src={productImage(p)} alt={p.name} className="admin-thumb" /><div><h3>{p.name}</h3><span>{p.category} • {p.active ? 'Disponível' : 'Indisponível'}</span></div><strong>{money(p.price)}</strong><button className="icon-btn" onClick={() => setEditing(p)} aria-label={`Editar ${p.name}`}><Pencil size={18} /></button><button className="icon-btn" aria-label={`Excluir ${p.name}`} onClick={async () => { if (window.confirm(`Remover ${p.name} do cardápio?`)) { await base44.entities.Product.delete(p.id); refresh(); } }}><Trash2 size={18} /></button></article>)}{!products.length && <div className="empty-state">Adicione seu primeiro produto.</div>}</div>}{(creating || editing) && <ProductForm product={editing} onClose={() => { setCreating(false); setEditing(null); }} onSaved={refresh} />}</div>;
}