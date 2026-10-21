import React, { useState } from 'react';
import { X, Ruler, Check, ArrowRight } from 'lucide-react';
import { BREEDS_DATA, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const SizeFinderModal: React.FC = () => {
  const { sizeFinderOpen, setSizeFinderOpen, addToCart } = useCart();
  const [selectedBreed, setSelectedBreed] = useState(BREEDS_DATA[0].breed);

  if (!sizeFinderOpen) return null;

  const currentBreed = BREEDS_DATA.find(b => b.breed === selectedBreed) || BREEDS_DATA[0];

  const handleSelectBreedAndAdd = () => {
    const defaultProduct = PRODUCTS[0];
    addToCart(defaultProduct, currentBreed.recommendedSize, defaultProduct.colors[0], 1);
    setSizeFinderOpen(false);
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

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSizeFinderOpen(false)}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Fenster schließen
              </button>
              <button
                onClick={handleSelectBreedAndAdd}
                className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
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
