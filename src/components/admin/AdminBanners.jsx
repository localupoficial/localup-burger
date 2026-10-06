import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { assets } from '@/components/burger/catalog';
import BannerForm from '@/components/admin/BannerForm';
export default function AdminBanners() {
  const client = useQueryClient(), [editing, setEditing] = useState(null), [creating, setCreating] = useState(false);
  const { data: banners = [], isLoading } = useQuery({ queryKey: ['admin-banners'], queryFn: () => base44.entities.Banner.list('created_date', 100) });
  const refresh = () => { client.invalidateQueries({ queryKey: ['admin-banners'] }); client.invalidateQueries({ queryKey: ['banners'] }); };
  return <div><div className="admin-section-top"><p>Promoções e novidades da home</p><button className="primary-btn" onClick={() => setCreating(true)}><Plus size={17} /> NOVO BANNER</button></div>{isLoading ? <div className="empty-state">Carregando banners…</div> : <div className="admin-banner-list">{banners.map(b => <article key={b.id} className="admin-banner-card">{(b.image_url || b.image_key) && <Image src={b.image_url || assets[b.image_key]} alt={b.title} className="admin-banner-img" />}<div><span className="eyebrow">{b.active ? 'ATIVO' : 'OCULTO'}</span><h3>{b.title}</h3><p>{b.subtitle}</p><button className="outline-btn" onClick={() => setEditing(b)}><Pencil size={15} /> Editar</button><button className="icon-btn" aria-label={`Excluir ${b.title}`} onClick={async () => { if (window.confirm('Remover este banner?')) { await base44.entities.Banner.delete(b.id); refresh(); } }}><Trash2 size={17} /></button></div></article>)}{!banners.length && <div className="empty-state">Crie um banner para destacar seu cardápio.</div>}</div>}{(creating || editing) && <BannerForm banner={editing} onSaved={refresh} onClose={() => { setCreating(false); setEditing(null); }} />}</div>;
}