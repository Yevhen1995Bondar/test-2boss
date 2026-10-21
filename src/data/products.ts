export interface Product {
  id: string;
  name: string;
  category: 'vests' | 'overalls' | 'hoodies';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  bestFor: string;
  rating: number;
  reviewsCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'mb-west-01',
    name: 'Wasserdichte Hunde-Winterweste mit Geschirr',
    category: 'vests',
    categoryLabel: 'Winter-Steppweste',
    price: 30.00,
    originalPrice: 57.45,
    tag: '🔥 Nr. 1 Bestseller · Mit D-Ring Geschirr',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_181rus181rus181r.jpg?v=1792437195',
    colors: [
      { name: 'RED', hex: '#EF4444' },
      { name: 'GREY', hex: '#9CA3AF' },
      { name: 'COFFEE', hex: '#78350F' },
      { name: 'YELLOW', hex: '#FBBF24' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'],
    description: 'Wasserdichte und winddichte Winter-Steppweste mit integrierten D-Ringen auf dem Rücken. Ermöglicht schnelles Anleinen ohne zusätzliches Brustgeschirr. Durchgehender Rücken-Reißverschluss und wärmender Stehkragen.',
    details: [
      'Integriertes Geschirr mit robusten D-Ringen für die Leine',
      'Durchgehender Reißverschluss oben für Anziehen in 5 Sekunden',
      'Wasserdichtes & winddichtes Ripstop-Außenmaterial',
      'Hoher Stehkragen schützt Hals und Nacken vor Kälte'
    ],
    bestFor: 'Französische Bulldoggen, Möpse, Dackel, Chihuahuas & alle Stadthunde',
    rating: 4.9,
    reviewsCount: 168
  },
  {
    id: 'mb-over-01',
    name: 'Wasserdichter Winter-Hundeoverall',
    category: 'overalls',
    categoryLabel: 'Ganzkörper-Overall',
    price: 39.00,
    originalPrice: 64.59,
    tag: '❄️ 100% Wetterfest · 4-Bein Schutz',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_h2sw7dh2sw7dh2sw.jpg?v=1792600092',
    colors: [
      { name: 'Gray', hex: '#9CA3AF' },
      { name: 'Blue', hex: '#1E3A8A' },
      { name: 'Yellow', hex: '#FBBF24' },
      { name: 'Orange', hex: '#EA580C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    description: 'Zweifarbiger Thermo-Ganzkörperoverall für maximalen Schutz bei Frost, Schnee und Regen. Schützt Brust, Bauch und alle 4 Läufe mit elastischen Strickbündchen und hohem Stehkragen.',
    details: [
      '4-Bein-Rundumschutz gegen Schnee, Nässe und Straßensalz',
      'Gesteppte Thermo-Wattierung mit dichter Kältebarriere',
      'Elastische Rippbündchen verhindern Eindringen von Schmutz',
      'Ergonomische Passform für ungehinderte Bewegungsfreiheit'
    ],
    bestFor: 'Chihuahuas, Pinscher, Dackel & kälteempfindliche Hunde',
    rating: 5.0,
    reviewsCount: 124
  },
  {
    id: 'mb-hood-01',
    name: 'Fleece-Hunde-Hoodie – Khaki',
    category: 'hoodies',
    categoryLabel: 'Streetwear Fleece-Hoodie',
    price: 31.00,
    originalPrice: 63.94,
    tag: '🌿 Urban Streetwear · Thermo-Fleece',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_so4pdkso4pdkso4p.jpg?v=1792436348',
    colors: [
      { name: 'Army Green', hex: '#4D5D43' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Samtweicher Fleece-Hoodie im zeitlosen Urban Khaki. Schützt empfindliche Hunde zuverlässig vor Wind und Kälte. Mit praktischem Reißverschlusskragen, Kapuze und sportlichem Patch.',
    details: [
      'Hochwertiger Anti-Pilling Thermofleece für kuschelige Wärme',
      'Bequemer Half-Zip Kragen für leichtes An- und Ausziehen',
      'Sportlicher Urban Streetwear Schnitt mit Kapuze',
      'Atmungsaktiv und formbeständig bei 30°C Maschinenwäsche'
    ],
    bestFor: 'Französische Bulldoggen, Möpse, Chihuahuas & Boston Terrier',
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: 'mb-over-02',
    name: 'Kuscheliger Hunde-Overall «FluffyPaws» mit D-Ring',
    category: 'overalls',
    categoryLabel: 'Kuschel-Overall mit D-Ring',
    price: 23.00,
    originalPrice: 47.59,
    tag: '🧸 Kuschel-Fleece · Mit D-Ring',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_rh9lhlrh9lhlrh9l.jpg?v=1792600627',
    colors: [
      { name: 'Khaki', hex: '#4D5D43' },
      { name: 'Pink', hex: '#F472B6' },
      { name: 'Green', hex: '#15803D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Kuschelweicher Ganzkörper-Fleeceoverall mit integriertem D-Ring am Rücken zum direkten Anleinen. Hält empfindliche Hunde an kalten Tagen rundum warm und geborgen.',
    details: [
      'Integrierter D-Ring am Rücken zum direkten Anleinen',
      'Ultra-weicher Teddy-Fleece schützt Brust, Bauch und Beine',
      'Elastische Rippbündchen für perfekten Halt bei jedem Schritt',
      'Druckknöpfe am Bauch für kinderleichtes An- und Ausziehen'
    ],
    bestFor: 'Chihuahuas, Malteser, Zwergspitz & kleine Hunde',
    rating: 4.9,
    reviewsCount: 94
  },
  {
    id: 'mb-hood-02',
    name: 'Warmes Hunde-Sweatshirt mit Kapuze',
    category: 'hoodies',
    categoryLabel: 'Sport-Hoodie mit Kapuze',
    price: 21.00,
    originalPrice: 38.00,
    tag: '⚡ Sportlicher Kapuzen-Sweater',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_nhtveinhtveinhtv.jpg?v=1791054367',
    colors: [
      { name: 'Black', hex: '#18181B' },
      { name: 'Grey', hex: '#9CA3AF' },
      { name: 'Blue', hex: '#1E3A8A' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Klassisches Kapuzen-Sweatshirt aus strapazierfähiger Baumwollmischung mit weichem Innenfleece. Bietet bequemen Tragekomfort und schützt vor kühlem Herbst- und Winterwind.',
    details: [
      'Bequeme Passform mit gerippten Bündchen an Ärmeln und Saum',
      'Sportliche Kapuze und authentischer Streetwear-Look',
      'Weiche Baumwoll-Fleece Mischung für angenehme Wärme',
      'Einfaches Anziehen und waschmaschinenfest bei 30°C'
    ],
    bestFor: 'Französische Bulldoggen, Möpse & aktive Stadthunde',
    rating: 4.8,
    reviewsCount: 76
  },
  {
    id: 'mb-hood-03',
    name: 'Hoodie Fleece Milky Boss',
    category: 'hoodies',
    categoryLabel: 'Motiv-Fleece Pullover',
    price: 19.00,
    originalPrice: 27.59,
    tag: '🐶 Beliebter Motiv-Fleece',
    image: 'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_d1ej8fd1ej8fd1ej.jpg?v=1792601985',
    colors: [
      { name: 'pink love', hex: '#F472B6' },
      { name: 'blue 1', hex: '#3B82F6' },
      { name: 'grey', hex: '#9CA3AF' },
      { name: 'yellow bear', hex: '#FBBF24' }
    ],
    sizes: ['XS（old）', 'S', 'M', 'L', 'XL'],
    description: 'Kuschelweicher Fleece-Pullover mit verspielten Motiven für kleine und mittlere Hunde. Ultraleicht, elastisch und wärmend bei jedem Spaziergang.',
    details: [
      'Superweiches Flanell-Fleece kratzt nicht und hält mollig warm',
      'Elastischer Bauchausschnitt für uneingeschränkte Bewegungsfreiheit',
      'Große Auswahl an fröhlichen Designs und Farben',
      'Perfekt für Chihuahua, Französische Bulldogge, Welpen & Senioren'
    ],
    bestFor: 'Chihuahuas, Welpen, Katzen & kleine Hunderassen',
    rating: 4.9,
    reviewsCount: 112
  }
];

export const BREEDS_DATA = [
  { breed: 'Chihuahua / Zwergspitz', chest: '28-36 cm', back: '20-28 cm', weight: '1.5-4 kg', recommendedSize: 'S' },
  { breed: 'Französische Bulldogge', chest: '48-58 cm', back: '32-38 cm', weight: '9-14 kg', recommendedSize: 'L' },
  { breed: 'Dackel (Standard / Zwerg)', chest: '35-48 cm', back: '35-45 cm', weight: '4-9 kg', recommendedSize: 'M' },
  { breed: 'Mops / Boston Terrier', chest: '44-54 cm', back: '30-36 cm', weight: '7-11 kg', recommendedSize: 'L' },
  { breed: 'Jack Russell / Pinscher', chest: '40-50 cm', back: '30-38 cm', weight: '5-8 kg', recommendedSize: 'M' },
  { breed: 'Beagle / Cocker Spaniel', chest: '52-64 cm', back: '40-48 cm', weight: '11-17 kg', recommendedSize: 'XL' },
  { breed: 'Border Collie / Mittlere Hunde', chest: '62-76 cm', back: '50-60 cm', weight: '18-26 kg', recommendedSize: 'XXL' },
  { breed: 'Labrador / Große Hunde', chest: '72-88 cm', back: '58-70 cm', weight: '26-36 kg', recommendedSize: '4XL' },
];

export const REVIEWS = [
  {
    id: 1,
    author: 'Dennis M.',
    city: 'Köln',
    dog: 'Frenchie "Rocky" (12 kg)',
    sizeBought: 'Winterweste mit Geschirr (Größe L)',
    rating: 5,
    title: 'Kein lästiges Geschirr mehr unter der Jacke!',
    comment: 'Die D-Ringe oben sind absolute Spitzenklasse. Reißverschluss zu, Leine dran und fertig. Rocky läuft super gern damit und bleibt bei Regen trocken.',
    verified: true,
    date: 'Vor 2 Tagen'
  },
  {
    id: 2,
    author: 'Carina B.',
    city: 'Frankfurt am Main',
    dog: 'Chihuahua "Peanut" (2.8 kg)',
    sizeBought: 'Winteroverall (Größe S)',
    rating: 5,
    title: 'Endlich warme Beinchen im Schnee',
    comment: 'Für meinen kurzhaarigen Chihuahua ein Lebensretter im Winter. Die Bündchen an den Beinen sitzen sanft und die Jacke hält den Bauch komplett warm.',
    verified: true,
    date: 'Vor 4 Tagen'
  },
  {
    id: 3,
    author: 'Maximilian K.',
    city: 'Berlin',
    dog: 'Mops "Hugo" (8.5 kg)',
    sizeBought: 'Fleece-Hoodie Khaki (Größe M)',
    rating: 5,
    title: 'Mega weicher Fleece, super Streetwear-Look',
    comment: 'Passt perfekt über den Mops-Brustkorb ohne zu spannen. Der Zipper vorne erleichtert das Anziehen enorm. Jeder im Park fragt, woher Hugo den Hoodie hat!',
    verified: true,
    date: 'Vor 1 Woche'
  }
];
