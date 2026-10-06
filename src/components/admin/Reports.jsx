import React from 'react';
import { money } from '@/components/burger/catalog';
export default function Reports({ orders }) {
  const delivered = orders.filter(o => o.status === 'Entregue');
  const today = delivered.filter(o => new Date(o.created_date).toDateString() === new Date().toDateString());
  const total = today.reduce((s, o) => s + o.total, 0);
  const ranking = Object.entries(delivered.reduce((acc, o) => { o.items?.forEach(i => { acc[i.name] = (acc[i.name] || 0) + i.quantity; }); return acc; }, {})).sort((a, b) => b[1] - a[1]);
  return <div className="reports"><p className="muted">Relatório baseado nos pedidos entregues. Vendas do dia consideram a data de criação do pedido.</p><div className="stats-grid"><article><span>Vendas do dia</span><strong>{money(total)}</strong><small>Pedidos entregues de hoje</small></article><article><span>Pedidos concluídos hoje</span><strong>{today.length}</strong><small>Hoje, {new Date().toLocaleDateString('pt-BR')}</small></article><article><span>Ticket médio do dia</span><strong>{money(today.length ? total / today.length : 0)}</strong><small>Por pedido entregue</small></article></div><section className="ranking"><h3>ITENS MAIS VENDIDOS</h3><p className="muted">Todos os pedidos entregues carregados no painel</p>{ranking.length ? ranking.map(([name, qty], i) => <div key={name}><b>{String(i + 1).padStart(2, '0')}</b><span>{name}</span><strong>{qty} unidades</strong></div>) : <div className="empty-state">Os primeiros pedidos entregues aparecerão aqui.</div>}</section></div>;
}