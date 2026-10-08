import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/burger/Header';
import Hero from '@/components/burger/Hero';
import Promotions from '@/components/burger/Promotions';
import MenuSection from '@/components/burger/MenuSection';
import Customize from '@/components/burger/Customize';
import CartDrawer from '@/components/burger/CartDrawer';
import AboutFooter from '@/components/burger/AboutFooter';
import ChatWidget from '@/components/burger/ChatWidget';
import Profile from '@/components/burger/Profile';
import { money } from '@/components/burger/catalog';
import { fetchMenuBanners, fetchMenuProducts } from '@/lib/catalogService';

export default function Home() {
  const [category, setCategory] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('localup-cart') || '[]'));

  useEffect(() => {
    localStorage.setItem('localup-cart', JSON.stringify(cart));
  }, [cart]);

  const {
    data: productResult,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchMenuProducts,
    refetchInterval: 30000,
  });

  const { data: bannerResult } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchMenuBanners,
    refetchInterval: 30000,
  });

  const products = productResult?.products ?? [];
  const banners = bannerResult?.banners ?? [];
  const showSkeletons = isLoading && !productResult;

  const count = cart.reduce((s, x) => s + x.quantity, 0);
  const total = cart.reduce((s, x) => s + x.quantity * x.price, 0);

  return (
    <div className="burger-site">
      <Header
        count={count}
        onCart={() => setCartOpen(true)}
        onProfile={() => setProfileOpen(true)}
      />

      <main>
        <Hero />
        <Promotions banners={banners} onCategory={setCategory} />
        <MenuSection
          products={products}
          loading={showSkeletons || (isFetching && !products.length)}
          category={category}
          setCategory={setCategory}
          onSelect={setSelected}
        />
        <AboutFooter onChat={() => setChatOpen(true)} />
      </main>

      {selected && (
        <Customize
          key={selected.id}
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={(item) => setCart((c) => [...c, item])}
        />
      )}

      {cartOpen && (
        <CartDrawer cart={cart} setCart={setCart} onClose={() => setCartOpen(false)} />
      )}

      {profileOpen && <Profile onClose={() => setProfileOpen(false)} />}

      <ChatWidget open={chatOpen} setOpen={setChatOpen} />

      {count > 0 && !cartOpen && (
        <button type="button" className="mobile-cart-bar" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={18} />
          <span>
            {count} {count === 1 ? 'item' : 'itens'} • {money(total)}
          </span>
          <b>VER PEDIDO</b>
          <ArrowRight size={17} />
        </button>
      )}
    </div>
  );
}
