import React, { useState } from 'react';
import { ArrowRight, Ruler, Star, Flame, Sparkles, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CORE_PRODUCTS_SPOTLIGHT = [
  {
    id: 'weste',
    handle: 'wasserdichte-hunde-winterweste',
    title: 'Wasserdichte Hunde-Winterweste mit Geschirr',
    category: 'Nr. 1 Bestseller · All-in-One Geschirr',
    price: '30,00 €',
    originalPrice: '57,45 €',
    tag: 'Fokus-Highlight',
    tagColor: 'bg-red-600',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_181rus181rus181r.jpg?v=1792437195',
    badge: 'Rot mit D-Ringen',
    headline: 'Die Winterweste mit integriertem D-Ring-Geschirr.',
    subtext: 'Kein lästiges Geschirr mehr unter der Jacke: Einfach anziehen, Reißverschluss oben schließen und Leine direkt an den doppelten D-Ringen einhaken.',
    shopUrl: 'https://milkyboss.de/products/wasserdichte-hunde-winterweste',
    directCheckoutUrl: 'https://milkyboss.de/cart/55848453079382:1',
    features: ['Integrierte D-Ringe', 'Reißverschluss am Rücken', 'Wasserdicht & Winddicht']
  },
  {
    id: 'overall',
    handle: 'wasserdichter-winter-hundeoverall',
    title: 'Wasserdichter Winter-Hundeoverall',
    category: 'Ganzkörper-Schutz · 4-Bein',
    price: '39,00 €',
    originalPrice: '64,59 €',
    tag: '100% Wetterfest',
    tagColor: 'bg-blue-600',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_h2sw7dh2sw7dh2sw.jpg?v=1792600092',
    badge: 'Anthrazit & Grau',
    headline: 'Ganzkörper-Schutz vor Frost, Schnee und Straßensalz.',
    subtext: 'Thermo-Wattierung und elastische Beinbündchen halten Nässe und Schmutz vom Bauch und allen 4 Läufen fern.',
    shopUrl: 'https://milkyboss.de/products/wasserdichter-winter-hundeoverall',
    directCheckoutUrl: 'https://milkyboss.de/products/wasserdichter-winter-hundeoverall',
    features: ['4-Bein Kälteschutz', 'Stehkragen für Nacken', 'Ergonomische Beinfreiheit']
  },
  {
    id: 'hoodie',
    handle: 'fleece-hunde-hoodie-khaki',
    title: 'Fleece-Hunde-Hoodie – Khaki',
    category: 'Urban Streetwear · Half-Zip',
    price: '31,00 €',
    originalPrice: '63,94 €',
    tag: 'Boutique Drop',
    tagColor: 'bg-zinc-900',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_so4pdkso4pdkso4p.jpg?v=1792436348',
    badge: 'Khaki Fleece',
    headline: 'Ultraweicher Thermofleece im zeitlosen Streetwear-Look.',
    subtext: 'Atmungsaktiver Anti-Pilling Fleece mit Half-Zip Kragen und bequemer Kapuze für gemütliche Gassirunden im Herbst und Frühjahr.',
    shopUrl: 'https://milkyboss.de/products/fleece-hunde-hoodie-khaki',
    directCheckoutUrl: 'https://milkyboss.de/products/fleece-hunde-hoodie-khaki',
    features: ['Anti-Pilling Fleece', 'Half-Zip Kragen', '30°C Maschinenwäsche']
  }
];

export const Hero: React.FC = () => {
  const { setSizeFinderOpen } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = CORE_PRODUCTS_SPOTLIGHT[activeIdx];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-orange-100 bg-gradient-to-b from-orange-50/60 via-white to-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Copy & Selected Hero Feature */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span className="bg-orange-600 text-white px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Flame className="w-3.5 h-3.5" />
                Original Milky Boss Kollektion
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-orange-900 bg-orange-100/90 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1 font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                3 Bestseller aus dem Store
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-zinc-950 tracking-tight leading-[1.08] [text-wrap:balance]">
              {activeItem.headline.split(' ').slice(0, -3).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
                {activeItem.headline.split(' ').slice(-3).join(' ')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-xl font-medium">
              {activeItem.subtext}
            </p>

            {/* Quick 3-Pill Feature Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeItem.features.map((feat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-orange-200 rounded-xl text-xs font-bold text-zinc-800 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>

            {/* CTAs with vibrant gradient */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#kollektion"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
              >
                <span>Alle 6 Bestseller ansehen</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={activeItem.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-zinc-900 bg-white border-2 border-zinc-300 hover:border-orange-500 rounded-2xl transition-all active:scale-[0.98] shadow-xs"
              >
                <span>Auf milkyboss.de öffnen</span>
                <ExternalLink className="w-4 h-4 text-orange-600" />
              </a>

              <button
                onClick={() => setSizeFinderOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-4 text-xs font-bold text-zinc-600 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-orange-600" />
                <span>Größenberater</span>
              </button>
            </div>

            {/* Trust Quote snippet */}
            <div className="pt-3 flex items-center gap-4 text-xs text-zinc-600 border-t border-orange-200/60">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-zinc-950">4.9 / 5.0</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-zinc-700">100% Originalware von milkyboss.de im einheitlichen Studio-Look</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor + 3-Product Switcher */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-[#FAF9F5] border-4 border-white shadow-2xl aspect-square group">
              <img
                src={activeItem.image}
                alt={`${activeItem.title} im Studio-Lookbook`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Product floating caption card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-black text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    {activeItem.tag}
                  </div>
                  <div className="text-base font-extrabold text-zinc-950 line-clamp-1">
                    {activeItem.title}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {activeItem.category}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-zinc-400 line-through font-mono">{activeItem.originalPrice}</div>
                  <div className="text-xl font-black text-orange-600 tabular-nums font-mono">{activeItem.price}</div>
                </div>
              </div>
            </div>

            {/* Quick 3-item thumbnail selector */}
            <div className="grid grid-cols-3 gap-3">
              {CORE_PRODUCTS_SPOTLIGHT.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-2 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer bg-white ${
                    activeIdx === idx
                      ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20 scale-[1.02]'
                      : 'border-zinc-200 hover:border-zinc-300 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-zinc-100">
                    <img
                      src={prod.image}
                      alt={prod.badge}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center w-full">
                    <span className="text-[11px] font-extrabold text-zinc-950 line-clamp-1">
                      {idx === 0 ? '1. Winterweste' : idx === 1 ? '2. Winteroverall' : '3. Khaki Hoodie'}
                    </span>
                    <span className="text-[10px] font-bold text-orange-600">
                      ab {prod.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip */}
        <div className="mt-12 pt-8 border-t border-orange-100 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-1 bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-orange-600 tabular-nums">
              3 Modelle
            </div>
            <div className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
              Fokussierte Kollektion
            </div>
            <p className="text-xs text-zinc-500">
              Nur deine 3 meistverkauften Top-Artikel.
            </p>
          </div>

          <div className="space-y-1 bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-zinc-950">
              100%
            </div>
            <div className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
              Wasserdicht & Winddicht
            </div>
            <p className="text-xs text-zinc-500">
              Zuverlässiger Wetterschutz bei Regen und Schnee.
            </p>
          </div>

          <div className="space-y-1 bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-orange-600">
              D-Ringe
            </div>
            <div className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
              Integriertes Geschirr
            </div>
            <p className="text-xs text-zinc-500">
              Direktes Anleinen in 5 Sekunden ohne Zusatzgeschirr.
            </p>
          </div>

          <div className="space-y-1 bg-white p-4 rounded-2xl border border-orange-100 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-zinc-950">
              S – 5XL
            </div>
            <div className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
              Für jede Hundegröße
            </div>
            <p className="text-xs text-zinc-500">
              Perfekte Passform für Chihuahuas bis Frenchies.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
