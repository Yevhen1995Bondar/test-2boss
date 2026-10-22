import React, { useState } from 'react';
import { Heart, Send, Check, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3 Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white text-sm">Kostenloser Versand ab 50 €</strong>
              <span className="text-zinc-400">Schnelle und klimaneutrale Lieferung via DHL GoGreen</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white text-sm">30 Tage Passform-Garantie</strong>
              <span className="text-zinc-400">Kostenloser Größenumtausch ohne Wenn und Aber</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-white text-sm">Designed in Deutschland</strong>
              <span className="text-zinc-400">Ergonomische 3D-Schnitte für optimalen Tragekomfort</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-zinc-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-black text-white tracking-tight uppercase">
              MILKY BOSS
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Milky Boss steht für kompromisslose Qualität, zeitloses urbanes Design und ergonomischen Komfort für Hunde.
              Entwickelt, damit dein vierbeiniger Liebling bei jedem Wetter warm, trocken und stilvoll geschützt ist.
            </p>
            <div className="pt-1">
              <a
                href="https://milkyboss.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
              >
                Besuche unseren offiziellen Shopify Store: milkyboss.de →
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Kollektion
            </div>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#kollektion" className="hover:text-white transition-colors">Winterjacken & Mäntel</a></li>
              <li><a href="#kollektion" className="hover:text-white transition-colors">Zopfstrick & Fleece</a></li>
              <li><a href="#kollektion" className="hover:text-white transition-colors">Wasserdichte Regenmäntel</a></li>
              <li><a href="#passform" className="hover:text-white transition-colors">Passform-Technologie</a></li>
              <li><a href="#groessen-finder" className="hover:text-white transition-colors">Größen-Rechner</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Service
            </div>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#groessen-finder" className="hover:text-white transition-colors">Passform-Beratung</a></li>
              <li><a href="https://milkyboss.de/pages/contact" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Kontakt & WhatsApp Support</a></li>
              <li><a href="https://milkyboss.de/policies/shipping-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Versand & Rückgabe</a></li>
              <li><a href="https://milkyboss.de/policies/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">AGB & Impressum</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Milky Boss VIP Club</span>
            </div>
            <p className="text-xs text-zinc-400">
              Erhalte 10% Willkommensrabatt und exklusiven Vorab-Zugang zu limitierten Drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Deine E-Mail-Adresse"
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsletterSuccess && (
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Vielen Dank! Dein 10% Code wurde versendet.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Milky Boss Germany. Alle Rechte vorbehalten.
          </div>

          {/* Payment Badges representation */}
          <div className="flex items-center gap-2 text-[10px] font-mono font-semibold text-zinc-400">
            <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">PayPal</span>
            <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Klarna</span>
            <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Apple Pay</span>
            <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Visa / Master</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
