import React, { useState } from 'react';
import { X, Ruler, Check, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { BREEDS_DATA, PRODUCTS } from '../data/products';
import { INITIAL_SHOPIFY_PRODUCTS, findMatchingVariant } from '../services/shopifyLive';
import { useCart } from '../context/CartContext';

export const SizeFinderModal: React.FC = () => {
  const { sizeFinderOpen, setSizeFinderOpen, addToCart } = useCart();
  const [selectedBreed, setSelectedBreed] = useState(BREEDS_DATA[0]?.breed || 'Französische Bulldogge');

  if (!sizeFinderOpen) return null;

  const currentBreed = BREEDS_DATA.find(b => b.breed === selectedBreed) || BREEDS_DATA[0];

  const handleSelectBreedAndAdd = () => {
    const liveProd = INITIAL_SHOPIFY_PRODUCTS[0];
    const fallbackProd = PRODUCTS[0];
    const targetSize = currentBreed.recommendedSize;
    const targetColor = liveProd?.colors?.[0] || fallbackProd.colors[0];
    const matched = liveProd ? findMatchingVariant(liveProd.variants, targetSize, targetColor.name) : undefined;
    const currentPrice = matched?.price ? parseFloat(matched.price) : (liveProd?.price || fallbackProd.price);
    const currentComparePrice = matched?.compare_at_price ? parseFloat(matched.compare_at_price) : (liveProd?.originalPrice || fallbackProd.originalPrice);

    addToCart(
      {
        id: liveProd?.id || fallbackProd.id,
        name: liveProd?.title || fallbackProd.name,
        category: 'vests',
        categoryLabel: 'Winter-Steppweste',
        price: currentPrice,
        originalPrice: currentComparePrice,
        tag: '🔥 Nr. 1 Bestseller · Mit D-Ring Geschirr',
        image: liveProd?.image || fallbackProd.image,
        colors: liveProd?.colors || fallbackProd.colors,
        sizes: liveProd?.sizes || fallbackProd.sizes,
        description: liveProd?.description || fallbackProd.description,
        details: liveProd?.keyFeatures || fallbackProd.details,
        bestFor: 'Französische Bulldoggen, Möpse, Dackel & Chihuahuas',
        rating: 4.9,
        reviewsCount: 168
      },
      targetSize,
      targetColor,
      1,
      matched?.id
    );
    setSizeFinderOpen(false);
  };

  const handleApplyAndBrowse = () => {
    setSizeFinderOpen(false);
    const el = document.getElementById('kollektion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSizeFinderOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200 space-y-6">
          
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg font-bold text-zinc-950">
                Milky Boss Passform-Finder
              </h2>
            </div>
            <button
              onClick={() => setSizeFinderOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-lg"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-zinc-600">
              Wähle die Rasse deines Hundes, um sofort die empfohlene Konfektionsgröße und die Richtmaße zu sehen:
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 border border-zinc-200 rounded-xl">
              {BREEDS_DATA.map((item) => (
                <button
                  key={item.breed}
                  onClick={() => setSelectedBreed(item.breed)}
                  className={`p-2.5 text-left text-xs rounded-lg transition-all border ${
                    selectedBreed === item.breed
                      ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                      : 'bg-zinc-50 text-zinc-800 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <div className="truncate">{item.breed}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedBreed === item.breed ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    Größe {item.recommendedSize} · {item.weight}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Summary Card */}
            <div className="bg-[#FAF9F5] border border-zinc-200 rounded-xl p-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase">
                  Ergebnis für {currentBreed.breed}
                </div>
                <div className="text-xl font-extrabold text-zinc-950 mt-0.5">
                  Empfohlene Größe: <span className="text-amber-800 font-mono">{currentBreed.recommendedSize}</span>
                </div>
                <div className="text-xs text-zinc-600 mt-1">
                  Brustumfang: {currentBreed.chest} · Rückenlänge: {currentBreed.back}
                </div>
              </div>

              <div className="w-14 h-14 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-mono font-black text-2xl">
                {currentBreed.recommendedSize}
              </div>
            </div>

            {/* Measuring Tips */}
            <div className="text-xs text-zinc-500 space-y-1 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <strong className="text-zinc-800 block">Richtiges Messen in 2 Schritten:</strong>
              <div><strong>1. Brustumfang:</strong> Messe an der breitesten Stelle des Brustkorbs (direkt hinter den Vorderbeinen).</div>
              <div><strong>2. Rückenlänge:</strong> Messe vom Halsbandansatz bis kurz vor den Schwanzansatz.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleApplyAndBrowse}
                className="flex-1 py-3 px-4 text-xs font-bold text-zinc-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-orange-600" />
                <span>Kollektion in {currentBreed.recommendedSize} filtern</span>
              </button>

              <button
                type="button"
                onClick={handleSelectBreedAndAdd}
                className="flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-98"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span>Bestseller in {currentBreed.recommendedSize} testen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
