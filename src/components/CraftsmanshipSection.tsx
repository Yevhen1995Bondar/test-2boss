import React from 'react';
import { Shield, Sparkles, Wind, Droplets, HeartHandshake, Eye } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="passform" className="py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
            Ergonomie & Schnitttechnik
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight [text-wrap:balance]">
            Warum Standard-Hundekleidung scheitert – und wie Milky Boss es löst.
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Die meisten Hundejacken auf dem Markt sind zu eng an der Schulter oder scheuern in den Achseln.
            Unsere Schnitte basieren auf 3D-Körperscans von über 15 Hunderassen.
          </p>
        </div>

        {/* Bento Grid: 4 feature blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Ergonomic cut (Large span 7) */}
          <div className="md:col-span-7 bg-[#FAF9F5] border border-zinc-200 rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">
                01. Ergonomischer Y-Schnitt für freie Schulterblätter
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Konventionelle Mäntel blockieren den Bewegungsablauf beim Laufen und Springen.
                Milky Boss verwendet einen elastischen Y-Ausschnitt an der Brust. Ihr Hund kann ungehindert
                toben, schnüffeln und rennen, ohne dass Stoff scheuert oder einschnürt.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200/80 flex flex-wrap gap-4 text-xs font-semibold text-zinc-800">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                Kein Scheuern an Achseln & Gelenken
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                Spezieller Frenchie- & Dackel-Bauchlatz
              </span>
            </div>
          </div>

          {/* Card 2: Weatherproof (Span 5) */}
          <div className="md:col-span-5 bg-zinc-950 text-white rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                02. Dreilagige Bionic-Membran
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                10.000 mm Wassersäule hält selbst starkem Dauerregen stand. Gleichzeitig transportiert
                die mikroporöse Zwischenschicht Körperfeuchtigkeit nach außen, sodass dein Hund
                weder schwitzt noch auskühlt.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span>Wasserdicht & Winddicht</span>
              <span className="text-amber-400 font-mono font-bold">100% PFC-frei</span>
            </div>
          </div>

          {/* Card 3: Harness port (Span 5) */}
          <div className="md:col-span-5 bg-[#FAF9F5] border border-zinc-200 rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">
                03. Universeller Geschirr-Zugang
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Kein umständliches Geschirr-über-die-Jacke-Würgen mehr! Ein versiegelter
                2-Wege-Reißverschluss am Rücken ermöglicht es, jedes handelsübliche Geschirr
                darunter zu tragen und die Leine sicher einzuhaken.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200/80 text-xs text-zinc-600">
              Kompatibel mit Y-Geschirren, Norwegern und Sicherheitsgeschirren.
            </div>
          </div>

          {/* Card 4: Night safety (Span 7) */}
          <div className="md:col-span-7 bg-[#FAF9F5] border border-zinc-200 rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950">
                04. 3M™ Scotchlite™ 360° Sichtbarkeit im Dunkeln
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Sicherheit auf dunklen Abendspaziergängen: Integrierte Reflexpipings werfen
                Autoscheinwerferlicht aus bis zu 150 Metern Entfernung zurück — dezent am Tag,
                strahlend hell in der Nacht.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200/80 flex items-center justify-between text-xs text-zinc-600">
              <span>Sichtbar bis 150 m Distanz</span>
              <span className="font-semibold text-zinc-950">Maschinenwaschbar bei 30°C</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
