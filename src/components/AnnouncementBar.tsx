import React, { useState } from 'react';
import { X, Flame, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside
      aria-label="Ankündigung"
      className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white text-xs py-2.5 px-4 sticky top-0 z-50 transition-all shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block w-6" aria-hidden="true" />
        
        <div className="flex items-center justify-center gap-2 text-center mx-auto font-bold tracking-wide">
          <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            Streetwear Drop
          </span>
          <span aria-hidden="true">·</span>
          <span>Gratis Versand in ganz Deutschland ab 59 €</span>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <span className="hidden md:inline bg-white/20 px-2 py-0.5 rounded font-mono text-yellow-200">
            Code: MILKY10 (10% Rabatt)
          </span>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-white/80 hover:text-white p-1 rounded transition-colors"
          aria-label="Hinweis schließen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
