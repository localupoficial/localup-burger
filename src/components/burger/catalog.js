export const money = value => Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const categories = ['Todos', 'Hambúrgueres', 'Combos', 'Acompanhamentos', 'Bebidas', 'Sobremesas'];
export const assets = {
  hero: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/292859efd_generated_f8784155.png',
  classic: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/e551c3a06_generated_91487c33.png',
  bacon: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/6f146fabd_generated_db1f190f.png',
  truffle: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/b2edeab16_generated_c11a8080.png',
  combo: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/b2aa07b84_generated_27a45a34.png',
  fries: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/0f9990a60_generated_d25a87b0.png',
  cola: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/4f5db8ff9_generated_dc56c306.jpg',
  brownie: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/e99547be0_generated_5e358b05.png',
  promo: 'https://media.base44.com/images/public/6ac450780cc38252171d60e3/7fd3d4c57_generated_ffd54030.png'
};
export const productImage = product => product.image_url || assets[product.image_key];
export const statuses = ['Aguardando Confirmação', 'Em Preparo', 'Saiu para Entrega', 'Entregue'];
export const deliveryZones = [{ label: 'Retirada no balcão', fee: 0 }, { label: 'Entrega até 3 km', fee: 7.9 }, { label: 'Entrega de 3 a 6 km', fee: 12.9 }];