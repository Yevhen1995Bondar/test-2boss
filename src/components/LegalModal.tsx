import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Shield,
  FileText,
  RotateCcw,
  Building2,
  Truck,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useCart, LegalTab } from '../context/CartContext';

interface PolicyData {
  title: string;
  subtitle: string;
  lastUpdated: string;
  shopifyUrl: string;
  summary: string[];
  sections: {
    heading: string;
    content: string[];
    subsections?: { title: string; text: string }[];
  }[];
}

const STATIC_POLICIES: Record<LegalTab, PolicyData> = {
  terms: {
    title: 'Allgemeine Geschäftsbedingungen (AGB)',
    subtitle: 'Rechtliche Rahmenbedingungen für Bestellungen auf Milky Boss',
    lastUpdated: 'Januar 2026',
    shopifyUrl: 'https://milkyboss.de/policies/terms-of-service',
    summary: [
      'Geltungsbereich für alle Bestellungen von Verbrauchern im Sinne des § 13 BGB',
      'Verbindlicher Vertragsschluss bei Bestellbestätigung per E-Mail',
      'Kostenloser Versand in Deutschland ab 50,00 € Bestellwert',
      'Gesetzliche Gewährleistungsfrist von 24 Monaten'
    ],
    sections: [
      {
        heading: '§ 1 Geltungsbereich, Begriffsbestimmungen & Anbieter',
        content: [
          'Für alle Geschäftsbeziehungen zwischen Milky Boss (nachfolgend „Anbieter“ oder „wir“) und dem Kunden (nachfolgend „Kunde“ oder „Sie“) über diesen Onlineshop gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.',
          'Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).'
        ]
      },
      {
        heading: '§ 2 Vertragsschluss & Bestellablauf',
        content: [
          'Die Präsentation der Waren im Onlineshop stellt kein rechtlich bindendes Angebot, sondern eine unverbindliche Aufforderung zur Bestellung dar.',
          'Durch Anklicken des Buttons „Direkt zur Shopify Kasse“ oder das Absenden des Bestellvorgangs auf milkyboss.de gibt der Kunde ein verbindliches Kaufangebot für die im Warenkorb enthaltenen Artikel ab.',
          'Die Bestätigung des Zugangs der Bestellung erfolgt unmittelbar nach dem Absenden durch eine automatisierte E-Mail (Bestellbestätigung). Mit dieser E-Mail-Bestätigung kommt der Kaufvertrag rechtswirksam zustande.'
        ]
      },
      {
        heading: '§ 3 Preise, Versandkosten & Mindestbestellwert',
        content: [
          'Alle auf der Website genannten Preise verstehen sich in Euro (€) inklusive der jeweils gültigen gesetzlichen Mehrwertsteuer.',
          'Lieferungen innerhalb der Bundesrepublik Deutschland sind ab einem Warenwert von 50,00 € versandkostenfrei. Bei einem Bestellwert unter 50,00 € berechnen wir eine Standard-Versandkostenpauschale von 4,90 € pro Bestellung.',
          'Eventuell anfallende Zölle oder Einfuhrabgaben bei Lieferungen in Länder außerhalb der Europäischen Union trägt der Kunde.'
        ]
      },
      {
        heading: '§ 4 Lieferung & Verfügbarkeit von Waren',
        content: [
          'Soweit nicht anders angegeben, beträgt die Lieferzeit für verfügbare Artikel innerhalb Deutschlands 2 bis 4 Werktage nach Zahlungseingang.',
          'Sollte ein bestelltes Produkt wider Erwarten nicht verfügbar sein, werden wir den Kunden unverzüglich informieren und bereits geleistete Zahlungen unverzüglich erstatten.'
        ]
      },
      {
        heading: '§ 5 Zahlungsbedingungen & Eigentumsvorbehalt',
        content: [
          'Dem Kunden stehen die im Checkout auf milkyboss.de angezeigten Zahlungsarten zur Verfügung: PayPal, Klarna (Rechnung, Sofortüberweisung, Ratenkauf), Kreditkarte (Visa, Mastercard, Maestro, American Express) sowie Apple Pay und Google Pay.',
          'Bis zur vollständigen Bezahlung aller Forderungen bleibt die gelieferte Ware Eigentum von Milky Boss.'
        ]
      },
      {
        heading: '§ 6 Gesetzliches Mängelhaftungsrecht & Gewährleistung',
        content: [
          'Es gelten die gesetzlichen Vorschriften zur Mängelhaftung (§§ 437 ff. BGB). Die Verjährungsfrist für gesetzliche Mängelansprüche beträgt bei Verbrauchern 2 Jahre ab Ablieferung der Ware.',
          'Schäden durch unsachgemäßen Gebrauch (z.B. Zerstörung durch Hundebisse, unsachgemäße Heißwäsche entgegen der Pflegeanleitung) begründen keinen Gewährleistungsanspruch.'
        ]
      },
      {
        heading: '§ 7 Streitbeilegung & EU-Plattform',
        content: [
          'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.',
          'Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
        ]
      }
    ]
  },
  privacy: {
    title: 'Datenschutzerklärung (DSGVO / GDPR)',
    subtitle: 'Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 & 14 DSGVO',
    lastUpdated: 'Januar 2026',
    shopifyUrl: 'https://milkyboss.de/policies/privacy-policy',
    summary: [
      'Vollständige Einhaltung der Datenschutz-Grundverordnung (DSGVO)',
      'Hosting und Shop-Abwicklung über die zertifizierte Shopify-Infrastruktur',
      'Keine Weitergabe oder Verkauf von Kundendaten an unberechtigte Dritte',
      'Recht auf Auskunft, Berichtigung und Löschung jederzeit per E-Mail'
    ],
    sections: [
      {
        heading: '1. Verantwortliche Stelle',
        content: [
          'Verantwortlich für die Datenverarbeitung auf dieser Website ist Milky Boss (milkyboss.de). Bei datenschutzrechtlichen Fragen oder zur Ausübung Ihrer Betroffenenrechte erreichen Sie uns per E-Mail unter: teams@milkyboss.de.'
        ]
      },
      {
        heading: '2. Art & Zweck der Datenverarbeitung',
        content: [
          'Beim Aufrufen unserer Website erfassen die Webserver automatisch temporäre Verbindungsdaten (IP-Adresse, Datum/Uhrzeit, aufgerufene Seiten, Browserversion, Betriebssystem). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung der Systemsicherheit und Stabilität.',
          'Bei der Durchführung von Bestellungen verarbeiten wir Bestandsdaten (Name, Rechnungs- und Lieferanschrift), Kontaktdaten (E-Mail-Adresse, Telefonnummer) und Zahlungsdaten zur Erfüllung des Kaufvertrags (Art. 6 Abs. 1 lit. b DSGVO).'
        ]
      },
      {
        heading: '3. E-Commerce Hosting & Shopify Plattform',
        content: [
          'Unser Onlineshop wird über Shopify International Limited, Victoria Buildings, 1-2 Haddington Road, Dublin 4, D04 XN52, Irland betrieben.',
          'Shopify verarbeitet Daten zur Abwicklung von Warenkörben, Zahlungen und Server-Infrastruktur. Es besteht ein Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO inklusive EU-Standardvertragsklauseln.'
        ]
      },
      {
        heading: '4. Zahlungsdienstleister & Weitergabe an Logistikpartner',
        content: [
          'Zur Bestellabwicklung übermitteln wir Ihre Lieferadresse an den beauftragten Paketdienstleister (z.B. DHL, Deutsche Post) zum Zwecke der Zustellung der Ware.',
          'Zahlungsdaten werden im gesicherten TLS/SSL-Verfahren verschlüsselt direkt an den ausgewählten Zahlungsanbieter übermittelt (PayPal (Europe) S.à r.l., Klarna Bank AB oder Shopify Payments / Stripe). Wir speichern selbst keine vollständigen Kreditkartendaten.'
        ]
      },
      {
        heading: '5. Cookies & Lokale Speicherung',
        content: [
          'Wir setzen technisch notwendige Cookies ein, um die Funktionalität des Warenkorbs, der Sprachauswahl und der Sitzungssicherheit zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO).',
          'Sie können die Annahme von Cookies über Ihre Browsereinstellungen jederzeit einschränken oder deaktivieren.'
        ]
      },
      {
        heading: '6. Ihre Rechte als betroffene Person',
        content: [
          'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), das Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).',
          'Wenden Sie sich hierzu formlos an: teams@milkyboss.de.'
        ]
      }
    ]
  },
  refund: {
    title: 'Widerrufsbelehrung & Rückgaberecht',
    subtitle: 'Bedingungen und Vorlage für die 14-tägige gesetzliche Rückgabe',
    lastUpdated: 'Januar 2026',
    shopifyUrl: 'https://milkyboss.de/policies/refund-policy',
    summary: [
      '14 Tage gesetzliches Widerrufsrecht ab Erhalt der Ware',
      'Unkomplizierte Rückabwicklung per E-Mail an teams@milkyboss.de',
      'Vollständige Rückerstattung aller Zahlungen innerhalb von 14 Tagen',
      'Inklusive vorgefertigtem Muster-Widerrufsformular zum Kopieren'
    ],
    sections: [
      {
        heading: 'Widerrufsrecht',
        content: [
          'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
          'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen haben bzw. hat.',
          'Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Milky Boss, E-Mail: teams@milkyboss.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.',
          'Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.'
        ]
      },
      {
        heading: 'Folgen des Widerrufs',
        content: [
          'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.',
          'Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.',
          'Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben.',
          'Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.',
          'Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist (z.B. Tragespuren, starke Tierhaare, Gerüche).'
        ]
      },
      {
        heading: 'Muster-Widerrufsformular',
        content: [
          'Wenn Sie den Vertrag widerrufen wollen, können Sie den folgenden Text kopieren, ausfüllen und per E-Mail an teams@milkyboss.de senden:',
          '— An: Milky Boss (E-Mail: teams@milkyboss.de)',
          '— Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)',
          '— Bestellt am (*) / erhalten am (*)',
          '— Name des/der Verbraucher(s)',
          '— Anschrift des/der Verbraucher(s)',
          '— Datum & Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)',
          '(*) Unzutreffendes streichen.'
        ]
      }
    ]
  },
  impressum: {
    title: 'Impressum / Rechtliche Angaben',
    subtitle: 'Anbieterkennzeichnung gemäß § 5 DDG (Digitale-Dienste-Gesetz)',
    lastUpdated: 'Januar 2026',
    shopifyUrl: 'https://milkyboss.de',
    summary: [
      'Offizielle Betreiber- und Kontaktangaben für milkyboss.de',
      'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      'Direkter Support via E-Mail: teams@milkyboss.de'
    ],
    sections: [
      {
        heading: 'Angaben gemäß § 5 DDG',
        content: [
          'Milky Boss',
          'E-Commerce & Premium Dog Apparel',
          'Deutschland',
          'Offizieller Onlineshop: https://milkyboss.de'
        ]
      },
      {
        heading: 'Kontakt',
        content: [
          'E-Mail: teams@milkyboss.de',
          'Web: https://milkyboss.de',
          'Kundenservice: Montag bis Freitag von 09:00 bis 18:00 Uhr'
        ]
      },
      {
        heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
        content: [
          'Milky Boss Redaktion & Shop-Management',
          'teams@milkyboss.de'
        ]
      },
      {
        heading: 'Urheberrechtshinweis',
        content: [
          'Die durch die Seitenbetreiber erstellten Inhalte, Designs, Studio-Fotografien und Texte auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
        ]
      }
    ]
  },
  shipping: {
    title: 'Versand- und Zahlungsbedingungen',
    subtitle: 'Transparente Informationen zu Lieferzeiten, Tarifen und Zahlungsmitteln',
    lastUpdated: 'Januar 2026',
    shopifyUrl: 'https://milkyboss.de/policies/shipping-policy',
    summary: [
      'Kostenloser Standardversand ab 50,00 € Bestellwert in Deutschland',
      'Pauschale von nur 4,90 € bei Bestellungen unter 50,00 €',
      'Schneller und klimaneutraler Versand mit DHL GoGreen',
      'Lieferzeit ca. 2 bis 4 Werktage'
    ],
    sections: [
      {
        heading: 'Versandkosten & Liefergebiete',
        content: [
          'Lieferungen erfolgen standardmäßig innerhalb Deutschlands sowie in ausgewählte Länder der Europäischen Union.',
          'Innerhalb Deutschlands:',
          '• Ab 50,00 € Bestellwert: KOSTENLOSER VERSAND',
          '• Bis 49,99 € Bestellwert: 4,90 € Standard-Versandpauschale',
          'Nach Übergabe an DHL erhalten Sie eine Versandbestätigung mit Tracking-Nummer zur lückenlosen Sendungsverfolgung.'
        ]
      },
      {
        heading: 'Akzeptierte Zahlungsmethoden',
        content: [
          'Wir bieten maximale Sicherheit durch zertifizierte Zahlungsdienstleister mit 256-Bit SSL-Verschlüsselung:',
          '• PayPal (auch PayPal Später Bezahlen)',
          '• Klarna (Kauf auf Rechnung, Sofortüberweisung, Ratenkauf)',
          '• Kreditkarten: Visa, Mastercard, Maestro, American Express',
          '• Apple Pay & Google Pay (für sekundenschnellen mobilen Checkout)'
        ]
      }
    ]
  }
};

export const LegalModal: React.FC = () => {
  const { legalModalOpen, legalModalTab, openLegalModal, closeLegalModal } = useCart();
  const [activeTab, setActiveTab] = useState<LegalTab>(legalModalTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [liveHtml, setLiveHtml] = useState<string | null>(null);

  // Sync tab with context when modal opens or tab changes
  useEffect(() => {
    setActiveTab(legalModalTab);
    setSearchQuery('');
  }, [legalModalTab, legalModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (legalModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [legalModalOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && legalModalOpen) {
        closeLegalModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [legalModalOpen, closeLegalModal]);

  // Optional: Attempt to fetch live policy from Shopify endpoint
  useEffect(() => {
    if (!legalModalOpen) return;

    let isMounted = true;
    const policyPathMap: Record<LegalTab, string> = {
      terms: 'terms-of-service',
      privacy: 'privacy-policy',
      refund: 'refund-policy',
      impressum: '',
      shipping: 'shipping-policy'
    };

    const path = policyPathMap[activeTab];
    if (!path) {
      setLiveHtml(null);
      return;
    }

    setIsFetchingLive(true);
    fetch(`/api/shopify/policies/${path}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Live policy status not ok');
        const text = await res.text();
        if (isMounted && text && text.length > 200) {
          // If HTML is returned, extract policy container or show parsed content
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const policyBody = doc.querySelector('.shopify-policy__body') || doc.querySelector('.rte') || doc.body;
          if (policyBody && policyBody.innerHTML.trim().length > 100) {
            setLiveHtml(policyBody.innerHTML);
          } else {
            setLiveHtml(null);
          }
        }
      })
      .catch(() => {
        if (isMounted) setLiveHtml(null);
      })
      .finally(() => {
        if (isMounted) setIsFetchingLive(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab, legalModalOpen]);

  const currentPolicy = STATIC_POLICIES[activeTab] || STATIC_POLICIES.terms;

  // Search filter
  const filteredSections = useMemo(() => {
    if (!currentPolicy?.sections) return [];
    if (!searchQuery.trim()) return currentPolicy.sections;
    const q = searchQuery.toLowerCase().trim();
    return currentPolicy.sections.filter(sec =>
      sec.heading.toLowerCase().includes(q) ||
      sec.content.some(line => line.toLowerCase().includes(q))
    );
  }, [currentPolicy, searchQuery]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentPolicy.shopifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!legalModalOpen) return null;

  const tabItems: { key: LegalTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'terms', label: 'AGB', icon: FileText },
    { key: 'privacy', label: 'Datenschutz', icon: Shield },
    { key: 'refund', label: 'Widerrufsrecht', icon: RotateCcw },
    { key: 'shipping', label: 'Versand & Zahlung', icon: Truck },
    { key: 'impressum', label: 'Impressum', icon: Building2 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeLegalModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col border border-zinc-200 overflow-hidden z-10">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 bg-[#FFFDF9] shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>Rechtliche Informationen & Verbraucherschutz</span>
                <span className="text-zinc-300">·</span>
                <span className="text-zinc-500 font-medium">milkyboss.de</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mt-1 tracking-tight">
                {currentPolicy.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                {currentPolicy.subtitle}
              </p>
            </div>

            <button
              onClick={closeLegalModal}
              className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-all cursor-pointer shrink-0"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-zinc-200/80">
            {tabItems.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    openLegalModal(tab.key);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Actions Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`In "${currentPolicy.title}" suchen (z.B. Rücksendung, Frist, DHL)...`}
                className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl transition-colors cursor-pointer"
                title="Offiziellen Link kopieren"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copied ? 'Kopiert!' : 'Link'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl transition-colors cursor-pointer"
                title="Dokument drucken"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-500" />
                <span>Drucken</span>
              </button>

              <a
                href={currentPolicy.shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors cursor-pointer"
              >
                <span>milkyboss.de</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-zinc-800 text-sm leading-relaxed bg-[#FAF9F5]/40">
          
          {/* Quick Key Takeaways Box */}
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 sm:p-5">
            <div className="text-xs font-extrabold text-orange-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-orange-600" />
              <span>Das Wichtigste auf einen Blick:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-orange-950 font-medium">
              {currentPolicy.summary.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Indicator if Live Shopify Fetch is running or completed */}
          {isFetchingLive && (
            <div className="flex items-center gap-2 text-xs text-zinc-500 bg-white p-3 rounded-xl border border-zinc-200">
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
              <span>Prüfe Live-Richtlinien von milkyboss.de...</span>
            </div>
          )}

          {/* Search Result Count */}
          {searchQuery && (
            <div className="text-xs text-zinc-600 font-medium bg-zinc-100 px-3 py-1.5 rounded-lg inline-block">
              Suchergebnisse für „<strong>{searchQuery}</strong>“: {filteredSections.length} Abschnitte gefunden
            </div>
          )}

          {/* If live HTML is successfully fetched from Shopify, show option to view it */}
          {liveHtml && !searchQuery ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-500 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
                <span className="font-bold text-emerald-800">✓ Direkt mit milkyboss.de Shopify Store synchronisiert</span>
                <span className="text-[11px] font-mono text-emerald-700">Live Policy</span>
              </div>
              <div
                className="prose prose-sm max-w-none text-zinc-800 space-y-3"
                dangerouslySetInnerHTML={{ __html: liveHtml }}
              />
            </div>
          ) : (
            /* Structured Policy Content */
            <div className="space-y-6">
              {filteredSections.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 space-y-2">
                  <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto" />
                  <div className="text-sm font-bold">Keine Treffer für „{searchQuery}“ gefunden.</div>
                  <div className="text-xs">Versuchen Sie einen anderen Begriff oder setzen Sie die Suche zurück.</div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs font-bold text-orange-600 underline"
                  >
                    Suche zurücksetzen
                  </button>
                </div>
              ) : (
                filteredSections.map((section, idx) => (
                  <article key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/90 shadow-xs space-y-3">
                    <h3 className="text-base font-extrabold text-zinc-950 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-orange-600 rounded-full" />
                      <span>{section.heading}</span>
                    </h3>
                    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                      {section.content.map((paragraph, pIdx) => {
                        const isForm = paragraph.startsWith('—');
                        return (
                          <p
                            key={pIdx}
                            className={isForm ? 'font-mono text-xs bg-zinc-50 p-2 rounded-lg border border-zinc-200 text-zinc-900' : ''}
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {/* Contact & Support Notice */}
          <div className="p-4 bg-white rounded-2xl border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-zinc-900">Fragen zu unseren Richtlinien oder deiner Bestellung?</div>
              <div className="text-xs text-zinc-500">Unser Kundenservice hilft dir gern werktags innerhalb von 24h.</div>
            </div>
            <a
              href="mailto:teams@milkyboss.de"
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
            >
              teams@milkyboss.de kontaktieren
            </a>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <span>Stand: {currentPolicy.lastUpdated}</span>
            <span>·</span>
            <span>Gültig für die Bundesrepublik Deutschland</span>
            <span>·</span>
            <span className="font-semibold text-emerald-700">DSGVO & DDG Konform</span>
          </div>

          <button
            onClick={closeLegalModal}
            className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Verstanden & Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
