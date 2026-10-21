import React, { useState, useEffect } from 'react';
import { Check, ShoppingBag, Star, Flame, ExternalLink, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import {
  INITIAL_SHOPIFY_PRODUCTS,
  TransformedShopifyProduct,
  fetchLiveShopifyProducts,
  getShopifyDirectCheckoutUrl,
  findMatchingVariant
} from '../services/shopifyLive';
import { useCart } from '../context/CartContext';

export const ProductSection: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<TransformedShopifyProduct[]>(INITIAL_SHOPIFY_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<'all' | 'vests' | 'overalls' | 'hoodies'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('6 Bestseller synchronisiert');

  // Track active photo index per product
  const [activePhotoIdx, setActivePhotoIdx] = useState<Record<string, number>>({});

  // Track selected variant per product
  const [selectedVariants, setSelectedVariants] = useState<Record<string, { size: string; colorIdx: number }>>(() => {
    const initial: Record<string, { size: string; colorIdx: number }> = {};
    INITIAL_SHOPIFY_PRODUCTS.forEach(p => {
      initial[p.id] = { size: p.sizes[0] || 'M', colorIdx: 0 };
    });
    return initial;
  });

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    fetchLiveShopifyProducts().then(live => {
      if (isMounted && live.length) {
        setProducts(live);
        setSelectedVariants(prev => {
          const next = { ...prev };
          live.forEach(p => {
            if (!next[p.id] || !p.sizes.includes(next[p.id].size)) {
              next[p.id] = { size: p.sizes[0] || 'M', colorIdx: 0 };
            }
          });
          return next;
        });
        setSyncStatus(`Live synchronisiert (${live.length} Modelle)`);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatus('Lade Live-Daten von milkyboss.de...');
    const live = await fetchLiveShopifyProducts();
    setProducts(live);
    setSelectedVariants(prev => {
      const next = { ...prev };
      live.forEach(p => {
        if (!next[p.id] || !p.sizes.includes(next[p.id].size)) {
          next[p.id] = { size: p.sizes[0] || 'M', colorIdx: 0 };
        }
      });
      return next;
    });
    setIsSyncing(false);
    setSyncStatus(`${live.length} Artikel live verbunden (${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })})`);
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: { ...(prev[productId] || { colorIdx: 0 }), size }
    }));
  };

  const handleSelectColor = (productId: string, colorIdx: number) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: { ...(prev[productId] || { size: 'M' }), colorIdx }
    }));
    // Auto-switch photo to matching color variant
    setActivePhotoIdx(prev => ({ ...prev, [productId]: colorIdx }));
  };

  const handleSwitchPhoto = (productId: string, idx: number) => {
    setActivePhotoIdx(prev => ({ ...prev, [productId]: idx }));
  };

  const handleAddToCart = (product: TransformedShopifyProduct) => {
    const variant = selectedVariants[product.id] || { size: product.sizes[0], colorIdx: 0 };
    const chosenColor = product.colors[variant.colorIdx] || product.colors[0];

    // Accurately locate variant to get exact size-dependent price
    const matched = findMatchingVariant(product.variants, variant.size, chosenColor.name) || product.variants[0];
    const currentPrice = matched?.price ? parseFloat(matched.price) : product.price;
    const currentComparePrice = matched?.compare_at_price ? parseFloat(matched.compare_at_price) : product.originalPrice;

    addToCart(
      {
        id: product.id,
        name: product.title,
        category: product.category,
        categoryLabel: product.categoryLabel,
        price: currentPrice,
        originalPrice: currentComparePrice,
        tag: product.tag,
        image: product.image,
        colors: product.colors,
        sizes: product.sizes as any,
        description: product.description,
        details: product.keyFeatures,
        bestFor: 'Französische Bulldoggen, Möpse, Dackel & Chihuahuas',
        rating: product.rating,
        reviewsCount: product.reviewsCount
      },
      variant.size,
      chosenColor,
      1
    );

    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const displayedProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="kollektion" className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100 border border-orange-300 px-3.5 py-1 rounded-full shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                <span>Alle 6 Bestseller deines Stores</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{syncStatus}</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.1] [text-wrap:balance]">
              Alle 6 Favoriten auf <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">milkyboss.de</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">
              Vollständige Kollektion aller 6 Top-Modelle: Mit authentischen Produkt- und Detailfotos, dynamischer Größen-Preisberechnung und direktem Checkout.
            </p>
          </div>

          {/* Sync Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-4 py-2.5 text-xs font-black bg-white border border-zinc-300 rounded-xl hover:bg-orange-50 hover:border-orange-300 text-zinc-800 flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              title="Katalogdaten jetzt aktualisieren"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-orange-600' : 'text-zinc-600'}`} />
              <span>Shopify Sync</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-orange-100">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-300'
            }`}
          >
            Alle ({products.length})
          </button>
          <button
            onClick={() => setActiveCategory('vests')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeCategory === 'vests'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-orange-600 border border-zinc-200 hover:border-orange-200'
            }`}
          >
            Winterwesten ({products.filter(p => p.category === 'vests').length})
          </button>
          <button
            onClick={() => setActiveCategory('overalls')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeCategory === 'overalls'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-orange-600 border border-zinc-200 hover:border-orange-200'
            }`}
          >
            Overalls ({products.filter(p => p.category === 'overalls').length})
          </button>
          <button
            onClick={() => setActiveCategory('hoodies')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeCategory === 'hoodies'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-zinc-600 hover:text-orange-600 border border-zinc-200 hover:border-orange-200'
            }`}
          >
            Hoodies & Sweater ({products.filter(p => p.category === 'hoodies').length})
          </button>
        </div>

        {/* 6 Core Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, idx) => {
            const variant = selectedVariants[product.id] || { size: product.sizes[0], colorIdx: 0 };
            const isAdded = !!addedIds[product.id];
            const activeColor = product.colors[variant.colorIdx] || product.colors[0];

            const currentPhotoIdx = activePhotoIdx[product.id] ?? 0;
            const currentImg = product.allImages[currentPhotoIdx] || product.image;

            const matchedShopifyVariant = findMatchingVariant(product.variants, variant.size, activeColor.name) || product.variants[0];
            const currentPrice = matchedShopifyVariant?.price ? parseFloat(matchedShopifyVariant.price) : product.price;
            const currentOriginalPrice = matchedShopifyVariant?.compare_at_price ? parseFloat(matchedShopifyVariant.compare_at_price) : product.originalPrice;

            const directCheckoutUrl = matchedShopifyVariant?.id
              ? getShopifyDirectCheckoutUrl(matchedShopifyVariant.id, 1)
              : product.shopifyProductUrl;

            return (
              <article
                key={product.id}
                className="bg-white border-2 border-zinc-200 hover:border-orange-500 rounded-3xl overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                {/* Ranking Ribbon */}
                <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1 items-start">
                  <span className={`${product.tagColor || 'bg-zinc-950'} text-white text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-lg shadow-md`}>
                    {product.tag}
                  </span>
                </div>

                {/* Scaled 4:3 photo container */}
                <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden">
                  <img
                    src={currentImg}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Direct link button to milkyboss.de */}
                  <a
                    href={product.shopifyProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3.5 right-3.5 bg-white/95 text-zinc-950 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500 hover:text-white shadow-md cursor-pointer z-10"
                    title="Originalartikel auf milkyboss.de öffnen"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Photo Counter */}
                  {product.allImages.length > 1 && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Ansicht {currentPhotoIdx + 1} / {product.allImages.length}
                    </div>
                  )}
                </div>

                {/* Multi-angle & Variant Thumbnails */}
                {product.allImages.length > 1 && (
                  <div className="flex gap-2 p-2.5 bg-orange-50/40 border-b border-orange-100 overflow-x-auto">
                    {product.allImages.slice(0, 6).map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => handleSwitchPhoto(product.id, i)}
                        className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          currentPhotoIdx === i
                            ? 'border-orange-600 scale-105 shadow-xs'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        title={`Ansicht ${i + 1}`}
                      >
                        <img
                          src={imgUrl}
                          alt="Detailansicht"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="font-extrabold uppercase tracking-wider text-orange-600 text-[11px]">
                        {product.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-zinc-900 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-mono tabular-nums">{product.rating}</span>
                        <span className="text-zinc-400 text-[11px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-zinc-950 group-hover:text-orange-600 transition-colors leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                      {product.description}
                    </p>

                    {/* Detailed Key Features List */}
                    <div className="pt-2 space-y-1.5 border-t border-zinc-100">
                      <div className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                        Top-Vorteile:
                      </div>
                      {product.keyFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-800 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Options & Purchase Controls */}
                  <div className="space-y-4 pt-4 border-t border-zinc-100">
                    {/* Color selection */}
                    {product.colors.length > 1 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 text-[11px] font-medium">
                          Farbe: <strong className="text-zinc-950">{activeColor.name}</strong>
                        </span>
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c, cIdx) => (
                            <button
                              key={c.name}
                              onClick={() => handleSelectColor(product.id, cIdx)}
                              style={{ backgroundColor: c.hex }}
                              className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                                variant.colorIdx === cIdx
                                  ? 'ring-2 ring-orange-500 ring-offset-2 scale-110 border-transparent'
                                  : 'border-zinc-300 hover:scale-105'
                              }`}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size selection with dynamic size prices */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-zinc-500 font-medium">Größe:</span>
                        <span className="text-orange-700 font-bold bg-orange-100/80 border border-orange-200 px-2 py-0.5 rounded-md">
                          Gewählt: {variant.size} · {currentPrice.toFixed(2)} €
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((s) => {
                          const sVar = findMatchingVariant(product.variants, s, activeColor.name);
                          const sPrice = sVar?.price ? parseFloat(sVar.price) : null;
                          const isSelected = variant.size === s;

                          return (
                            <button
                              key={s}
                              onClick={() => handleSelectSize(product.id, s)}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? 'bg-orange-500 text-white border-orange-500 shadow-xs scale-105'
                                  : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-orange-300 hover:bg-orange-50/40'
                              }`}
                              title={sPrice ? `Größe ${s}: ${sPrice.toFixed(2)} €` : `Größe ${s}`}
                            >
                              <span>{s}</span>
                              {sPrice && (
                                <span className={`text-[9px] font-mono tabular-nums ${isSelected ? 'text-orange-100' : 'text-zinc-400'}`}>
                                  {sPrice.toFixed(0)}€
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <div>
                        {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                          <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono tabular-nums">
                            <span className="line-through">{currentOriginalPrice.toFixed(2)} €</span>
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1 py-0.2 rounded">
                              -{Math.round((1 - currentPrice / currentOriginalPrice) * 100)}%
                            </span>
                          </div>
                        )}
                        <div className="text-2xl font-black text-zinc-950 font-mono tabular-nums tracking-tight">
                          {currentPrice.toFixed(2)} €
                        </div>
                        <div className="text-[10px] text-zinc-400 font-medium">
                          Preis für Gr. {variant.size}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isAdded}
                          className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                            isAdded
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md hover:shadow-lg active:scale-95'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Im Korb</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>In den Korb</span>
                            </>
                          )}
                        </button>

                        <a
                          href={directCheckoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 text-zinc-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl border border-zinc-200 hover:border-orange-300 transition-colors"
                          title="Sofort zum Shopify Checkout"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
