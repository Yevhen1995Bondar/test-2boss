import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    appliedDiscount,
    applyPromoCode,
    cartCount
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [codeMessage, setCodeMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.90;
  const finalTotal = subtotal + shippingCost;
  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyPromoCode(inputCode);
    if (ok) {
      setCodeMessage({ text: 'Gutschein erfolgreich eingelöst! (10% Rabatt)' });
    } else {
      setCodeMessage({ text: 'Ungültiger Code. Teste: MILKY10', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-950" />
              <h2 className="text-base font-bold text-zinc-950">
                Warenkorb ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Warenkorb schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FAF9F5] p-4 border-b border-zinc-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-800">
                {freeShippingRemaining <= 0
                  ? 'Gratis Versand freigeschaltet! 🚀'
                  : `Noch ${freeShippingRemaining.toFixed(2)} € bis zum Gratis-Versand`}
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-zinc-950 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-zinc-900">Dein Warenkorb ist leer</div>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Entdecke unsere ergonomische Hundekleidung und mache deinen Vierbeiner zum Boss.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-zinc-950 rounded-lg hover:bg-zinc-800"
                >
                  Jetzt shoppen
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-zinc-50/70 border border-zinc-200 rounded-xl"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg shrink-0 border border-zinc-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-zinc-950 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-0.5"
                          title="Artikel entfernen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                        <span>Größe: <strong className="text-zinc-900 font-mono">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{item.color.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-zinc-300 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-zinc-600 hover:text-zinc-950"
                          aria-label="Menge verringern"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-zinc-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-950"
                          aria-label="Menge erhöhen"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-zinc-950 font-mono tabular-nums">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-[#FAF9F5] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Rabattcode (z.B. MILKY10)"
                    className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-2 text-xs font-medium uppercase tracking-wider text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Anwenden
                </button>
              </form>

              {codeMessage && (
                <div className={`text-[11px] ${codeMessage.error ? 'text-red-600' : 'text-emerald-700 font-semibold'}`}>
                  {codeMessage.text}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-zinc-200/80">
                <div className="flex justify-between">
                  <span>Zwischensumme:</span>
                  <span className="font-mono text-zinc-900 tabular-nums">{subtotal.toFixed(2)} €</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Rabatt ({(appliedDiscount * 100).toFixed(0)}%):</span>
                    <span className="font-mono tabular-nums">-{(subtotal * appliedDiscount).toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Versandkosten:</span>
                  <span className="font-mono text-zinc-900 tabular-nums">
                    {shippingCost === 0 ? 'Kostenlos' : `${shippingCost.toFixed(2)} €`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-zinc-950 pt-2 border-t border-zinc-300">
                  <span>Gesamtsumme (inkl. MwSt.):</span>
                  <span className="font-mono tabular-nums">{finalTotal.toFixed(2)} €</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <a
                href="https://milkyboss.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-center"
              >
                <span>Zur Kasse auf MilkyBoss.de</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="text-[10px] text-center text-zinc-500">
                Sichere SSL-Verschlüsselung · Klarna, PayPal, Apple Pay & Kreditkarte
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
