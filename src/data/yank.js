/** Dados da marca — pitch Best Burguer 013 */

export const business = {
  name: 'Best Burguer 013',
  shortName: 'Best Burguer',
  tagline: 'Hambúrguer artesanal com sabor de verdade',
  category: 'Hamburgueria artesanal',
  rating: 4.9,
  ratingLabel: 'Feito na hora',
  reviewCount: 0,
  address: {
    street: 'Av. Oswaldo Cruz, 422',
    neighborhood: 'Parque Estuário (Vicente de Carvalho)',
    city: 'Guarujá',
    state: 'SP',
    zip: '11460-100',
    full: 'Av. Oswaldo Cruz, 422 — Parque Estuário (Vicente de Carvalho), Guarujá - SP, 11460-100',
  },
  phone: '(13) 98834-4676',
  phoneHref: 'tel:+5513988344676',
  whatsapp: '(13) 99721-4029',
  /** Número oficial (somente dígitos com DDI) */
  whatsappNumber: '5513997214029',
  whatsappHref: 'https://wa.me/5513997214029',
  instagram: '@yankburger',
  instagramHref: 'https://www.instagram.com/yankburger/',
  facebookHref: 'https://www.facebook.com/1401715250091463',
  ifoodHref: '#',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Yank+Burgers+And+Beers+Av.+Oswaldo+Cruz+422+Guaruja',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Yank+Burgers+And+Beers,+Av.+Oswaldo+Cruz,+422,+Guaruj%C3%A1+-+SP&hl=pt-BR&z=16&output=embed',
  hours: [
    { day: 'Segunda', time: 'Fechado', closed: true },
    { day: 'Terça', time: '20h30 – 00h' },
    { day: 'Quarta', time: '20h30 – 00h' },
    { day: 'Quinta', time: '20h30 – 00h' },
    { day: 'Sexta', time: '20h30 – 00h' },
    { day: 'Sábado', time: '20h30 – 00h' },
    { day: 'Domingo', time: '20h30 – 00h' },
  ],
};

/** Mensagem padrão dos CTAs gerais (Fazer Pedido / Pedir no WhatsApp) */
export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Best Burguer 013 e gostaria de fazer um pedido.';

/**
 * Monta o link do WhatsApp oficial com mensagem pré-digitada.
 * @param {string} [message] — texto personalizado; usa o padrão se omitido
 * @returns {string}
 */
export function whatsappOrderUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${text}`;
}

/** Atalho para CTAs gerais do site */
export const orderHref = whatsappOrderUrl();


/** Avaliações públicas (Google) + reconhecimento TripAdvisor */
export const reviews = [
  {
    id: 'r1',
    name: 'Cristhian Andrade',
    source: 'Google',
    rating: 5,
    quote:
      'Simplesmente a melhor hamburgueria que eu fui, lanches diferenciados e suculentos, fora o amplo cardápio de cervejas. Ótimo atendimento e ambiente acolhedor.',
  },
  {
    id: 'r2',
    name: 'Hellen Caroline',
    source: 'Google',
    rating: 5,
    quote:
      'Lugar muito legal. Uma dica é pedir sugestão de lanche porque tem muitas opções. Ambiente top para jantar.',
  },
  {
    id: 'r3',
    name: 'Cliente Google',
    source: 'Google',
    rating: 5,
    quote:
      'Não é apenas mais um hambúrguer — o anfitrião conhece cerveja de verdade e a experiência é única. Produtos de primeira linha.',
  },
  {
    id: 'r4',
    name: 'Cliente Google',
    source: 'Google',
    rating: 5,
    quote: 'Fantastic food, vibe and decor! Ambiente, comida e clima de pub impecáveis.',
  },
];

/** Menção editorial TripAdvisor (Costa Norte) — não é depoimento inventado */
export const tripadvisorNote =
  'Usuários do TripAdvisor já listaram a Yank entre os restaurantes mais lembrados de Guarujá — comida americana e bar.';

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Destaques', href: '#destaques' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'A Experiência', href: '#experiencia' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Localização', href: '#localizacao' },
];

export function money(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const img = (file) => `/assets/menu/${file}`;

/** Abas do cardápio interativo */
export const menuTabs = [
  { id: 'burgers', label: 'Burgers' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'bebidas', label: 'Chopps & Cervejas' },
  { id: 'sobremesas', label: 'Sobremesas' },
];

/** Destaques — mesmos 4 burgers artesanais do cardápio */
export const highlights = [
  {
    id: 'yank-double-cheese',
    name: 'Yank Double Cheese',
    description: 'Dois blends smash, cheddar duplo derretido, picles e molho especial da casa.',
    price: 44,
    pairing: 'IPA',
    pairingNote: 'Amargor que equilibra o queijo',
    image: img('buguelo.jpg'),
    badge: 'Mais pedido',
  },
  {
    id: 'smash-bacon',
    name: 'Smash Bacon',
    description: 'Smash crocante, bacon defumado, cheddar e maionese da casa.',
    price: 39,
    pairing: 'Pilsen Trincando',
    pairingNote: 'Leve e gelada para o smash',
    image: img('smash-de-lenhar.jpg'),
    badge: 'Chef',
  },
  {
    id: 'pork-burger',
    name: 'Pork Burger',
    description: 'Blend de porco temperado, queijo prato, cebola caramelizada e BBQ.',
    price: 41,
    pairing: 'Weiss',
    pairingNote: 'Notas de trigo com a carne suína',
    image: img('marrua.jpg'),
    badge: 'Pub hit',
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    description: 'Burger vegetal da casa, rúcula, tomate seco, queijo e aioli herbado.',
    price: 36,
    pairing: 'Lager',
    pairingNote: 'Refresco limpo para o veggie',
    image: img('magrelo.jpg'),
    badge: 'Vegetariano',
  },
];

/** Cardápio — 4 burgers artesanais + 3 chopps/cervejas */
export const menuItems = [
  {
    id: 'yank-double-cheese',
    name: 'Yank Double Cheese',
    description: 'Dois blends smash, cheddar duplo derretido, picles e molho especial da casa.',
    price: 44,
    category: 'burgers',
    pairing: 'IPA',
    image: img('buguelo.jpg'),
  },
  {
    id: 'smash-bacon',
    name: 'Smash Bacon',
    description: 'Smash crocante, bacon defumado, cheddar e maionese da casa.',
    price: 39,
    category: 'burgers',
    pairing: 'Pilsen Trincando',
    image: img('smash-de-lenhar.jpg'),
  },
  {
    id: 'pork-burger',
    name: 'Pork Burger',
    description: 'Blend de porco temperado, queijo prato, cebola caramelizada e BBQ.',
    price: 41,
    category: 'burgers',
    pairing: 'Weiss',
    image: img('marrua.jpg'),
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    description: 'Burger vegetal da casa, rúcula, tomate seco, queijo e aioli herbado.',
    price: 36,
    category: 'burgers',
    pairing: 'Lager',
    image: img('magrelo.jpg'),
  },

  {
    id: 'batata-rustica',
    name: 'Batata Rústica',
    description: 'Batatas crocantes com páprica e molho da casa.',
    price: 22,
    category: 'porcoes',
    image: img('batata-frita.jpg'),
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados com dip barbecue.',
    price: 24,
    category: 'porcoes',
    image: img('massa.jpg'),
  },
  {
    id: 'bolinho-costela',
    name: 'Bolinho de Costela',
    description: '6 unidades crocantes com catupiry e molho chimichurri.',
    price: 28,
    category: 'porcoes',
    image: img('bb-chicken.jpg'),
  },

  {
    id: 'chopp-pilsen',
    name: 'Chopp Pilsen Trincando',
    description: '500ml bem gelado — o clássico do pub Yank.',
    price: 14,
    category: 'bebidas',
  },
  {
    id: 'chopp-ipa',
    name: 'Chopp IPA',
    description: '500ml com amargor equilibrado e aroma cítrico.',
    price: 18,
    category: 'bebidas',
  },
  {
    id: 'chopp-weiss',
    name: 'Chopp Weiss',
    description: '500ml de trigo — leve, aromático e cremoso.',
    price: 16,
    category: 'bebidas',
  },

  {
    id: 'brownie-yank',
    name: 'Brownie Yank',
    description: 'Brownie quente com calda de chocolate e sorvete.',
    price: 22,
    category: 'sobremesas',
    image: img('xodo.jpg'),
  },
  {
    id: 'churros-pub',
    name: 'Churros do Pub',
    description: 'Porção de churros com doce de leite e canela.',
    price: 20,
    category: 'sobremesas',
    image: img('retadinho.jpg'),
  },
];
