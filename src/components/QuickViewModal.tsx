import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, ShieldCheck, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { findMatchingVariant, INITIAL_SHOPIFY_PRODUCTS } from '../services/shopifyLive';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setSizeFinderOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentSize = (quickViewProduct.sizes && quickViewProduct.sizes.includes(selectedSize as any))
    ? selectedSize
    : (quickViewProduct.sizes?.[0] || 'M');

  const chosenColor = quickViewProduct.colors[selectedColorIdx] || quickViewProduct.colors[0];

  const liveProd = INITIAL_SHOPIFY_PRODUCTS.find(p => p.id === quickViewProduct.id || p.title === quickViewProduct.name);
  const matchedVariant = liveProd ? findMatchingVariant(liveProd.variants, currentSize, chosenColor.name) : undefined;
  const currentPrice = matchedVariant?.price ? parseFloat(matchedVariant.price) : quickViewProduct.price;
  const currentOriginalPrice = matchedVariant?.compare_at_price ? parseFloat(matchedVariant.compare_at_price) : quickViewProduct.originalPrice;

  const handleAdd = () => {
    addToCart(
      {
        ...quickViewProduct,
        price: currentPrice,
        originalPrice: currentOriginalPrice
      },
      currentSize,
      chosenColor,
      1,
      matchedVariant?.id
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200 overflow-hidden">
          
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
            
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {quickViewProduct.tag && (
                <span className="absolute top-3 left-3 bg-zinc-950 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                  {quickViewProduct.tag}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                  <span>{quickViewProduct.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1 text-zinc-800 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{quickViewProduct.rating}</span>
                    <span className="text-zinc-400">({quickViewProduct.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-zinc-950 leading-snug">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-extrabold text-zinc-950 font-mono tabular-nums">
                    {currentPrice.toFixed(2)} €
                  </span>
                  {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                    <span className="text-sm text-zinc-400 line-through font-mono tabular-nums">
                      {currentOriginalPrice.toFixed(2)} €
                    </span>
                  )}
                  <span className="text-xs text-orange-600 font-bold bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                    Größe: {selectedSize}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-1.5">
                <span className="text-xs text-zinc-600 font-medium">
                  Farbe: <strong className="text-zinc-900">{chosenColor.name}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColorIdx === idx
                          ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110'
                          : 'border-zinc-300 hover:scale-105'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 font-medium">Größe:</span>
                  <button
                    onClick={() => {
                      setQuickViewProduct(null);
                      setSizeFinderOpen(true);
                    }}
                    className="text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Größenguide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        currentSize === s
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Highlights */}
              <ul className="text-xs text-zinc-600 space-y-1 pt-2 border-t border-zinc-100">
                {quickViewProduct.details.slice(0, 3).map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Add to Cart button */}
              <button
                onClick={handleAdd}
                className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Hinzugefügt!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>In den Warenkorb ({quickViewProduct.price.toFixed(2)} €)</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
