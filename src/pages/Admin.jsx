import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ShoppingBag, UtensilsCrossed, Images, BarChart3, MessageCircle, ArrowUpRight, Volume2, VolumeX, Search } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import OrderBoard from '@/components/admin/OrderBoard';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminBanners from '@/components/admin/AdminBanners';
import Reports from '@/components/admin/Reports';
import SupportInbox from '@/components/admin/SupportInbox';
import { money } from '@/components/burger/catalog';
export default function Admin() {
  const [tab, setTab] = useState('Pedidos'), [search, setSearch] = useState(''), [sound, setSound] = useState(false);
  const audio = useRef(null), client = useQueryClient();
  const { data: orders = [], isLoading, error } = useQuery({ queryKey: ['orders'], queryFn: () => base44.entities.Order.list('-created_date', 1000), refetchInterval: 15000 });
  const refresh = () => client.invalidateQueries({ queryKey: ['orders'] });
  useEffect(() => base44.entities.Order.subscribe(e => { client.invalidateQueries({ queryKey: ['orders'] }); if (e.type === 'create' && sound && audio.current) { const ctx = audio.current; ctx.resume(); [0, 0.18, 0.36].forEach((delay, i) => { const oscillator = ctx.createOscillator(), gain = ctx.createGain(); oscillator.connect(gain); gain.connect(ctx.destination); oscillator.frequency.value = [660, 880, 660][i]; gain.gain.setValueAtTime(0.12, ctx.currentTime + delay); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.16); oscillator.start(ctx.currentTime + delay); oscillator.stop(ctx.currentTime + delay + 0.17); }); } }), [sound, client]);
  const toggleSound = () => { if (!audio.current) { const Context = window.AudioContext || window.webkitAudioContext; if (Context) audio.current = new Context(); } audio.current?.resume(); setSound(!sound); };
  const today = orders.filter(o => new Date(o.created_date).toDateString() === new Date().toDateString());
  const tabs = [['Pedidos', ShoppingBag], ['Cardápio', UtensilsCrossed], ['Banners', Images], ['Relatórios', BarChart3], ['Atendimento', MessageCircle]];
  const filtered = orders.filter(o => `${o.customer_name} ${o.id} ${o.phone}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="admin-shell"><aside className="admin-sidebar"><Link to="/" className="wordmark">LOCAL<span>UP</span><small>BURGER • GESTÃO</small></Link><div className="admin-nav">{tabs.map(([name, Icon]) => <button className={tab === name ? 'active' : ''} key={name} onClick={() => setTab(name)}><Icon size={19} />{name}</button>)}</div><Link className="view-store" to="/">Ver a loja <ArrowUpRight size={16} /></Link></aside><main className="admin-main"><div className="admin-topbar"><span>LOCALUP / CENTRAL DE OPERAÇÕES</span><div><span className="status-dot" /> Atualização em tempo real</div></div><div className="admin-public-note">Ambiente de demonstração público — não insira dados sensíveis. Acesso administrativo protegido e login ficam para a próxima etapa.</div><div className="admin-page-heading"><div><div className="eyebrow">TUDO SOB CONTROLE</div><h1>{tab === 'Pedidos' ? 'CENTRAL DE PEDIDOS' : tab.toUpperCase()}</h1></div>{tab === 'Pedidos' && <button className="outline-btn" onClick={toggleSound}>{sound ? <Volume2 size={18} /> : <VolumeX size={18} />}{sound ? 'SOM ATIVADO' : 'ATIVAR ALERTA SONORO'}</button>}</div>
    {tab === 'Pedidos' ? <><div className="stats-grid"><article><span>Pedidos de hoje</span><strong>{today.length}</strong><small>Recebidos na loja</small></article><article><span>Em andamento</span><strong>{orders.filter(o => o.status !== 'Entregue').length}</strong><small>Do recebimento à entrega</small></article><article><span>Vendas concluídas hoje</span><strong>{money(today.filter(o => o.status === 'Entregue').reduce((s, o) => s + o.total, 0))}</strong><small>Pedidos entregues</small></article></div><label className="search-field admin-search"><Search size={17} /><input placeholder="Buscar por cliente, telefone ou pedido" value={search} onChange={e => setSearch(e.target.value)} /></label>{isLoading ? <div className="empty-state">Carregando pedidos…</div> : error ? <div className="empty-state">Não foi possível carregar os pedidos.</div> : <OrderBoard orders={filtered} refresh={refresh} />}</> : tab === 'Cardápio' ? <AdminProducts /> : tab === 'Banners' ? <AdminBanners /> : tab === 'Relatórios' ? <Reports orders={orders} /> : <SupportInbox />}
  </main></div>;
}