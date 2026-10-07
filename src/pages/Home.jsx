import React from 'react';
import Header from '@/components/burger/Header';
import Hero from '@/components/burger/Hero';
import Highlights from '@/components/burger/Highlights';
import InteractiveMenu from '@/components/burger/InteractiveMenu';
import Experience from '@/components/burger/Experience';
import Reviews from '@/components/burger/Reviews';
import Location from '@/components/burger/Location';
import SiteFooter from '@/components/burger/SiteFooter';
import WhatsAppFloat from '@/components/burger/WhatsAppFloat';

/**
 * Landing Best Burguer 013
 */
export default function Home() {
  return (
    <div className="yank-site font-body antialiased">
      <Header />

      <main>
        <Hero />
        <Highlights />
        <InteractiveMenu />
        <Experience />
        <Reviews />
        <Location />
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
