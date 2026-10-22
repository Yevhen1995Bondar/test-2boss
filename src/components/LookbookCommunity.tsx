import React from 'react';
import { Star, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const LookbookCommunity: React.FC = () => {
  const threeLookbookPhotos = [
    {
      url: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_181rus181rus181r.jpg?v=1792437195',
      title: 'Wasserdichte Hunde-Winterweste mit Geschirr',
      tag: 'Bestseller',
      pose: 'Originalprodukt · Red Edition mit D-Ringen',
      desc: 'Integriertes Geschirr auf dem Rücken und doppelter D-Ring',
      link: 'https://milkyboss.de/products/wasserdichte-hunde-winterweste'
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_h2sw7dh2sw7dh2sw.jpg?v=1792600092',
      title: 'Wasserdichter Winter-Hundeoverall',
      tag: '100% Wetterfest',
      pose: 'Original-Shopify · Gesteppter Kälteschutz',
      desc: 'Gesteppter 4-Bein Ganzkörperschutz mit Stehkragen',
      link: 'https://milkyboss.de/products/wasserdichter-winter-hundeoverall'
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_rh9lhlrh9lhlrh9l.jpg?v=1792600627',
      title: 'Kuscheliger Hunde-Overall «FluffyPaws»',
      tag: 'Kuschel-Hit',
      pose: 'Original Milky Boss Foto · Teddy-Fleece mit D-Ring',
      desc: 'Superweicher Ganzkörperschutz mit D-Ringen zum Anleinen',
      link: 'https://milkyboss.de/products/fleece-hundeoverallcozypaws'
    }
  ];

  return (
    <section id="lookbook" className="py-16 sm:py-24 bg-white border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>Studio Lookbook · Kollektion im Detail</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight [text-wrap:balance]">
            Dein Hund im Fokus: Bestseller im Studio.
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-medium">
            Authentische Fotos und Styles in cleaner Studio-Inszenierung — exakt passend zu deinen Artikeln auf milkyboss.de.
          </p>
        </div>

        {/* 3-Item Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {threeLookbookPhotos.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 border-2 border-zinc-200 hover:border-orange-500 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-[#FAF9F5]">
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-xs text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md">
                  {item.tag}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3.5 right-3.5 bg-white/95 text-zinc-950 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-500 hover:text-white shadow-md cursor-pointer"
                  title="Im Shop ansehen"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="p-5 space-y-1.5">
                <h4 className="text-base font-extrabold text-zinc-950 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-orange-700 font-bold">
                  {item.pose}
                </p>
                <p className="text-xs text-zinc-500 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div id="bewertungen" className="pt-8 border-t border-orange-100">
          <div className="text-xs font-bold tracking-wider uppercase text-zinc-500 mb-6">
            Echte Kundenbewertungen zu den 3 Bestsellern (4.9 / 5.0 Gesamtbewertung)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-orange-50/40 border-2 border-orange-200/80 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-orange-400 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-zinc-400 font-medium">{review.date}</span>
                  </div>

                  <h3 className="text-sm font-black text-zinc-950">
                    «{review.title}»
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    {review.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-orange-200/60 flex items-center justify-between text-xs">
                  <div>
                    <strong className="block text-zinc-950 font-bold">{review.author}</strong>
                    <span className="text-zinc-500">{review.dog}</span>
                  </div>
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                    {review.sizeBought}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
