import React, { useState } from 'react';
import { Ruler, Check, HelpCircle, Sparkles, Flame } from 'lucide-react';
import { BREEDS_DATA, PRODUCTS } from '../data/products';
import { INITIAL_SHOPIFY_PRODUCTS, findMatchingVariant } from '../services/shopifyLive';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const SizeCalculatorSection: React.FC = () => {
  const { addToCart } = useCart();
  const { user, profile, updateDogProfile } = useAuth();
  const [selectedBreed, setSelectedBreed] = useState(profile?.dogBreed || BREEDS_DATA[0].breed);
  const [chestInput, setChestInput] = useState(52);
  const [backInput, setBackInput] = useState(35);
  const [weightInput, setWeightInput] = useState(12);
  const [calcMode, setCalcMode] = useState<'breed' | 'custom'>('breed');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);
  const [savedToCloud, setSavedToCloud] = useState(false);

  // Compute recommendation
  const currentBreedData = BREEDS_DATA.find(b => b.breed === selectedBreed) || BREEDS_DATA[0];

  const calculatedSize = React.useMemo(() => {
    if (calcMode === 'breed') {
      return currentBreedData.recommendedSize;
    }
    // Custom calculation logic
    if (chestInput <= 36 || weightInput <= 4) return 'XS';
    if (chestInput <= 48 || weightInput <= 8) return 'S';
    if (chestInput <= 58 || weightInput <= 14) return 'M';
    if (chestInput <= 68 || weightInput <= 22) return 'L';
    if (chestInput <= 80 || weightInput <= 32) return 'XL';
    return 'XXL';
  }, [calcMode, currentBreedData, chestInput, weightInput]);

  const liveProduct = INITIAL_SHOPIFY_PRODUCTS[0];
  const fallbackProduct = PRODUCTS[0];

  const handleQuickAdd = () => {
    const targetSize = calculatedSize;
    const targetColor = liveProduct?.colors?.[0] || fallbackProduct.colors[0];
    const matched = liveProduct ? findMatchingVariant(liveProduct.variants, targetSize, targetColor.name) : undefined;
    const currentPrice = matched?.price ? parseFloat(matched.price) : (liveProduct?.price || fallbackProduct.price);
    const currentComparePrice = matched?.compare_at_price ? parseFloat(matched.compare_at_price) : (liveProduct?.originalPrice || fallbackProduct.originalPrice);

    addToCart(
      {
        id: liveProduct?.id || fallbackProduct.id,
        name: liveProduct?.title || fallbackProduct.name,
        category: 'vests',
        categoryLabel: 'Winter-Steppweste',
        price: currentPrice,
        originalPrice: currentComparePrice,
        tag: '🔥 Nr. 1 Bestseller · Mit D-Ring Geschirr',
        image: liveProduct?.image || fallbackProduct.image,
        colors: liveProduct?.colors || fallbackProduct.colors,
        sizes: liveProduct?.sizes || fallbackProduct.sizes,
        description: liveProduct?.description || fallbackProduct.description,
        details: liveProduct?.keyFeatures || fallbackProduct.details,
        bestFor: 'Französische Bulldoggen, Möpse, Dackel & Chihuahuas',
        rating: 4.9,
        reviewsCount: 168
      },
      targetSize,
      targetColor,
      1,
      matched?.id
    );

    setAddedItemName(liveProduct?.title || fallbackProduct.name);

    if (user) {
      updateDogProfile(calcMode === 'breed' ? selectedBreed : 'Eigene Maße', calculatedSize)
        .then(() => {
          setSavedToCloud(true);
          setTimeout(() => setSavedToCloud(false), 3000);
        })
        .catch(console.warn);
    }

    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <section id="groessen-finder" className="py-16 sm:py-24 bg-gradient-to-b from-white via-orange-50/40 to-white border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-orange-800 bg-orange-100 border border-orange-300 px-3.5 py-1.5 rounded-full shadow-2xs">
            <Ruler className="w-3.5 h-3.5 text-orange-600" />
            <span>Passform-Garantie</span>
            <span aria-hidden="true">·</span>
            <span>0% Fehlkäufe</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight [text-wrap:balance]">
            Finde in 30 Sekunden die perfekte Größe für deinen Hund
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg">
            Kein Drücken an Kehlkopf oder Achseln: Unser Rechner berücksichtigt die
            spezifische Körperform von Bulldoggen, Dackeln, Möpsen und großen Hunderassen.
          </p>
        </div>

        {/* Interactive Box with vibrant border and shadow */}
        <div className="bg-white border-2 border-orange-200/90 rounded-3xl p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
          
          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-orange-100/70 rounded-2xl max-w-md mx-auto mb-8 border border-orange-200">
            <button
              onClick={() => setCalcMode('breed')}
              className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                calcMode === 'breed'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              Nach Rasse wählen
            </button>
            <button
              onClick={() => setCalcMode('custom')}
              className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                calcMode === 'custom'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              Maße eingeben (cm)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="md:col-span-7 space-y-6">
              {calcMode === 'breed' ? (
                <div className="space-y-4">
                  <label htmlFor="breed-select" className="block text-xs font-bold uppercase tracking-wider text-orange-950">
                    Hunderasse deines Lieblings:
                  </label>
                  <select
                    id="breed-select"
                    value={selectedBreed}
                    onChange={(e) => setSelectedBreed(e.target.value)}
                    className="w-full bg-orange-50/50 border-2 border-orange-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-xs"
                  >
                    {BREEDS_DATA.map((item) => (
                      <option key={item.breed} value={item.breed}>
                        {item.breed} (ca. {item.weight})
                      </option>
                    ))}
                  </select>

                  {/* Typical specs for this breed */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="bg-orange-50/60 p-3.5 rounded-xl border border-orange-200 text-center">
                      <span className="block text-[11px] text-zinc-600 font-bold">Brustumfang</span>
                      <strong className="text-xs sm:text-sm text-zinc-950 font-mono font-black">{currentBreedData.chest}</strong>
                    </div>
                    <div className="bg-orange-50/60 p-3.5 rounded-xl border border-orange-200 text-center">
                      <span className="block text-[11px] text-zinc-600 font-bold">Rückenlänge</span>
                      <strong className="text-xs sm:text-sm text-zinc-950 font-mono font-black">{currentBreedData.back}</strong>
                    </div>
                    <div className="bg-orange-50/60 p-3.5 rounded-xl border border-orange-200 text-center">
                      <span className="block text-[11px] text-zinc-600 font-bold">Gewicht</span>
                      <strong className="text-xs sm:text-sm text-zinc-950 font-mono font-black">{currentBreedData.weight}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-bold text-zinc-800">Brustumfang (breiteste Stelle)</span>
                      <span className="font-mono font-black text-orange-600 text-sm">{chestInput} cm</span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={95}
                      value={chestInput}
                      onChange={(e) => setChestInput(Number(e.target.value))}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-bold text-zinc-800">Rückenlänge (Halsband bis Rute)</span>
                      <span className="font-mono font-black text-orange-600 text-sm">{backInput} cm</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={75}
                      value={backInput}
                      onChange={(e) => setBackInput(Number(e.target.value))}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-bold text-zinc-800">Körpergewicht</span>
                      <span className="font-mono font-black text-orange-600 text-sm">{weightInput} kg</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={45}
                      value={weightInput}
                      onChange={(e) => setWeightInput(Number(e.target.value))}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Advice note */}
              <div className="flex items-start gap-2.5 text-xs text-zinc-700 bg-orange-50/80 p-3.5 rounded-2xl border border-orange-200">
                <HelpCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Passform-Tipp von Milky Boss:</strong> Durch elastische Y-Schnitte an der Brust
                  sitzen unsere Winterwesten und Hoodies rutschfest, ohne an den Schultern zu bremsen.
                </span>
              </div>
            </div>

            {/* Live Recommendation Output Card with energetic vibrant colors */}
            <div className="md:col-span-5 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white rounded-3xl p-7 text-center space-y-4 shadow-xl border-2 border-orange-500">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center justify-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Empfohlene Größe</span>
              </div>
              
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-24 h-24 text-5xl font-black text-white bg-gradient-to-tr from-orange-600 to-amber-500 rounded-3xl shadow-lg tracking-tight font-mono">
                  {calculatedSize}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-base font-black text-white">
                  Passend für Winterweste & Hoodie
                </div>
                <div className="text-xs text-zinc-300">
                  Garantierte Beinfreiheit & Geschirrzugang
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-3.5 px-4 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  {addedItemName ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>In Größe {calculatedSize} im Warenkorb!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Bestseller in {calculatedSize} sichern</span>
                    </>
                  )}
                </button>
              </div>

              {savedToCloud && (
                <div className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800 rounded-lg py-1 px-2 flex items-center justify-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>In deinem Kundenkonto gespeichert!</span>
                </div>
              )}

              <div className="text-[11px] text-zinc-400">
                Inkl. 30 Tage kostenloser Umtausch & Anprobe
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
