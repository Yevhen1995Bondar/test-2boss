import rawData from '../data/shopifyLiveProducts.json';

export interface ShopifyVariant {
  id: number;
  title: string;
  price: string;
  compare_at_price?: string | null;
  sku: string;
  position: number;
  available: boolean;
  option1: string | null;
  option2: string | null;
  option3: string | null;
}

export interface ShopifyProductRaw {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: ShopifyVariant[];
  images: { id: number; src: string; width: number; height: number }[];
  options: { name: string; position: number; values: string[] }[];
}

export interface TransformedShopifyProduct {
  id: string;
  shopifyId: number;
  title: string;
  handle: string;
  category: 'vests' | 'overalls' | 'hoodies';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  allImages: string[];
  description: string;
  cleanText: string;
  keyFeatures: string[];
  variants: ShopifyVariant[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  shopifyProductUrl: string;
  available: boolean;
  tag?: string;
  tagColor?: string;
  rating: number;
  reviewsCount: number;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapColorToHex(colorName: string): string {
  const c = colorName.toLowerCase();
  if (c.includes('red') || c.includes('rot')) return '#EF4444';
  if (c.includes('pink') || c.includes('rosa')) return '#F472B6';
  if (c.includes('grey') || c.includes('grau')) return '#9CA3AF';
  if (c.includes('coffee') || c.includes('kaffee') || c.includes('braun')) return '#78350F';
  if (c.includes('yellow') || c.includes('gelb')) return '#FBBF24';
  if (c.includes('green') || c.includes('army') || c.includes('oliv') || c.includes('khaki') || c.includes('grün')) return '#4D5D43';
  if (c.includes('black') || c.includes('schwarz') || c.includes('anthrazit')) return '#18181B';
  if (c.includes('blue') || c.includes('blau') || c.includes('navy')) return '#1E3A8A';
  return '#71717A';
}

// All 6 dog apparel products from milkyboss.de
export const ALLOWED_HANDLES = [
  'wasserdichte-hunde-winterweste',
  'wasserdichter-winter-hundeoverall',
  'fleece-hunde-hoodie-khaki',
  'fleece-hundeoverallcozypaws',
  'dog-clothes-fleece-cloth-hooded-security-pet-sweater',
  'kuscheliger-hunde-hoodie-fur-den-winter-warmer-fleece-pullover-fur-chihuahua-bulldogge-kleine-hunde'
] as const;

function transformRawProduct(raw: ShopifyProductRaw): TransformedShopifyProduct | null {
  const handle = raw.handle.toLowerCase();

  if (!ALLOWED_HANDLES.includes(handle as any)) {
    return null;
  }

  const minPrice = raw.variants?.length
    ? Math.min(...raw.variants.map(v => parseFloat(v.price) || 0))
    : 35.0;

  // Extract sizes and colors
  const rawSizes = new Set<string>();
  const rawColors = new Map<string, string>();

  raw.variants?.forEach(v => {
    const parts = v.title.split(' / ').map(p => p.trim());
    if (parts.length >= 2) {
      rawColors.set(parts[0], parts[0]);
      rawSizes.add(parts[1]);
    } else if (parts.length === 1 && parts[0] !== 'Default Title') {
      rawSizes.add(parts[0]);
    }
  });

  const sizes = Array.from(rawSizes);
  const colors = Array.from(rawColors.keys()).map(c => ({
    name: c,
    hex: mapColorToHex(c)
  }));

  const sizeOption = raw.options?.find(o => o.name.toLowerCase().includes('size') || o.name.toLowerCase().includes('größ'));
  const colorOption = raw.options?.find(o => o.name.toLowerCase().includes('color') || o.name.toLowerCase().includes('farb'));

  const parsedSizes = sizeOption?.values?.length ? sizeOption.values : sizes;
  const parsedColors = colorOption?.values?.length
    ? colorOption.values.map(c => ({ name: c, hex: mapColorToHex(c) }))
    : colors;

  const liveImages = (raw.images || []).map(i => i.src);

  if (handle === 'wasserdichte-hunde-winterweste') {
    const displayImages = liveImages.length ? liveImages : [
      'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_181rus181rus181r.jpg?v=1792437195'
    ];
    const comparePrice = raw.variants?.find(v => v.compare_at_price)?.compare_at_price;

    return {
      id: String(raw.id),
      shopifyId: raw.id,
      title: raw.title || 'Wasserdichte Hunde-Winterweste mit Geschirr',
      handle: 'wasserdichte-hunde-winterweste',
      category: 'vests',
      categoryLabel: 'Winter-Steppweste',
      price: minPrice,
      originalPrice: comparePrice ? parseFloat(comparePrice) : 57.0,
      image: displayImages[0],
      allImages: displayImages,
      description: 'Wasserdichte und winddichte Winter-Steppweste mit integrierten D-Ringen auf dem Rücken. Ermöglicht schnelles Anleinen ohne zusätzliches Brustgeschirr. Durchgehender Rücken-Reißverschluss und wärmender Stehkragen.',
      cleanText: stripHtml(raw.body_html),
      keyFeatures: [
        'Integriertes Geschirr mit robusten D-Ringen für die Leine',
        'Durchgehender Reißverschluss oben für Anziehen in 5 Sekunden',
        'Wasserdichtes & winddichtes Ripstop-Außenmaterial',
        'Hoher Stehkragen schützt Hals und Nacken vor Kälte'
      ],
      variants: raw.variants || [],
      sizes: parsedSizes.length ? parsedSizes : ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'],
      colors: parsedColors.length ? parsedColors : [
        { name: 'RED', hex: '#EF4444' },
        { name: 'GREY', hex: '#9CA3AF' },
        { name: 'COFFEE', hex: '#78350F' },
        { name: 'YELLOW', hex: '#FBBF24' }
      ],
      shopifyProductUrl: 'https://milkyboss.de/products/wasserdichte-hunde-winterweste',
      available: true,
      tag: '🔥 Nr. 1 Bestseller · Mit D-Ring Geschirr',
      tagColor: 'bg-gradient-to-r from-red-600 to-orange-600',
      rating: 4.9,
      reviewsCount: 168
    };
  }

  if (handle === 'wasserdichter-winter-hundeoverall') {
    const displayImages = liveImages.length ? liveImages : [
      'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_h2sw7dh2sw7dh2sw.jpg?v=1792600092'
    ];
    const comparePrice = raw.variants?.find(v => v.compare_at_price)?.compare_at_price;

    return {
      id: String(raw.id),
      shopifyId: raw.id,
      title: raw.title || 'Wasserdichter Winter-Hundeoverall',
      handle: 'wasserdichter-winter-hundeoverall',
      category: 'overalls',
      categoryLabel: 'Ganzkörper-Overall',
      price: minPrice,
      originalPrice: comparePrice ? parseFloat(comparePrice) : 64.0,
      image: displayImages[0],
      allImages: displayImages,
      description: 'Zweifarbiger Thermo-Ganzkörperoverall für maximalen Schutz bei Frost, Schnee und Regen. Schützt Brust, Bauch und alle 4 Läufe mit elastischen Strickbündchen und hohem Stehkragen.',
      cleanText: stripHtml(raw.body_html),
      keyFeatures: [
        '4-Bein-Rundumschutz gegen Schnee, Nässe und Straßensalz',
        'Gesteppte Thermo-Wattierung mit dichter Kältebarriere',
        'Elastische Rippbündchen verhindern Eindringen von Schmutz',
        'Ergonomische Passform für ungehinderte Bewegungsfreiheit'
      ],
      variants: raw.variants || [],
      sizes: parsedSizes.length ? parsedSizes : ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: parsedColors.length ? parsedColors : [
        { name: 'Gray', hex: '#9CA3AF' },
        { name: 'Blue', hex: '#1E3A8A' },
        { name: 'Yellow', hex: '#FBBF24' },
        { name: 'Orange', hex: '#EA580C' }
      ],
      shopifyProductUrl: 'https://milkyboss.de/products/wasserdichter-winter-hundeoverall',
      available: true,
      tag: '❄️ 100% Wetterfest · 4-Bein Schutz',
      tagColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      rating: 5.0,
      reviewsCount: 124
    };
  }

  if (handle === 'fleece-hunde-hoodie-khaki') {
    const displayImages = liveImages.length ? liveImages : [
      'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_so4pdkso4pdkso4p.jpg?v=1792436348'
    ];
    const comparePrice = raw.variants?.find(v => v.compare_at_price)?.compare_at_price;

    return {
      id: String(raw.id),
      shopifyId: raw.id,
      title: raw.title || 'Fleece-Hunde-Hoodie – Khaki',
      handle: 'fleece-hunde-hoodie-khaki',
      category: 'hoodies',
      categoryLabel: 'Streetwear Fleece-Hoodie',
      price: minPrice,
      originalPrice: comparePrice ? parseFloat(comparePrice) : 63.0,
      image: displayImages[0],
      allImages: displayImages,
      description: 'Samtweicher Fleece-Hoodie im zeitlosen Urban Khaki. Schützt empfindliche Hunde zuverlässig vor Wind und Kälte. Mit praktischem Reißverschlusskragen, Kapuze und sportlichem Patch.',
      cleanText: stripHtml(raw.body_html),
      keyFeatures: [
        'Hochwertiger Anti-Pilling Thermofleece für kuschelige Wärme',
        'Bequemer Half-Zip Kragen für leichtes An- und Ausziehen',
        'Sportlicher Urban Streetwear Schnitt mit Kapuze',
        'Atmungsaktiv und formbeständig bei 30°C Maschinenwäsche'
      ],
      variants: raw.variants || [],
      sizes: parsedSizes.length ? parsedSizes : ['S', 'M', 'L', 'XL', 'XXL'],
      colors: parsedColors.length ? parsedColors : [
        { name: 'Army Green', hex: '#4D5D43' }
      ],
      shopifyProductUrl: 'https://milkyboss.de/products/fleece-hunde-hoodie-khaki',
      available: true,
      tag: '🌿 Urban Streetwear · Thermo-Fleece',
      tagColor: 'bg-zinc-900',
      rating: 4.9,
      reviewsCount: 89
    };
  }

  if (handle === 'fleece-hundeoverallcozypaws') {
    const displayImages = liveImages.length ? liveImages : [
      'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_rh9lhlrh9lhlrh9l.jpg?v=1792600627'
    ];
    const comparePrice = raw.variants?.find(v => v.compare_at_price)?.compare_at_price;

    return {
      id: String(raw.id),
      shopifyId: raw.id,
      title: raw.title || 'Kuscheliger Hunde-Overall «FluffyPaws» mit D-Ring',
      handle: 'fleece-hundeoverallcozypaws',
      category: 'overalls',
      categoryLabel: 'Kuschel-Overall mit D-Ring',
      price: minPrice,
      originalPrice: comparePrice ? parseFloat(comparePrice) : 47.0,
      image: displayImages[0],
      allImages: displayImages,
      description: 'Kuschelweicher Ganzkörper-Fleeceoverall mit integriertem D-Ring am Rücken zum direkten Anleinen. Hält empfindliche Hunde an kalten Tagen rundum warm und geborgen.',
      cleanText: stripHtml(raw.body_html),
      keyFeatures: [
        'Integrierter D-Ring am Rücken zum direkten Anleinen',
        'Ultra-weicher Teddy-Fleece schützt Brust, Bauch und Beine',
        'Elastische Rippbündchen für perfekten Halt bei jedem Schritt',
        'Druckknöpfe am Bauch für kinderleichtes An- und Ausziehen'
      ],
      variants: raw.variants || [],
      sizes: parsedSizes.length ? parsedSizes : ['XS', 'S', 'M', 'L', 'XL'],
      colors: parsedColors.length ? parsedColors : [
        { name: 'Khaki', hex: '#4D5D43' },
        { name: 'Pink', hex: '#F472B6' },
        { name: 'Green', hex: '#15803D' }
      ],
      shopifyProductUrl: 'https://milkyboss.de/products/fleece-hundeoverallcozypaws',
      available: true,
      tag: '🧸 Kuschel-Fleece · Mit D-Ring',
      tagColor: 'bg-gradient-to-r from-amber-600 to-yellow-600',
      rating: 4.9,
      reviewsCount: 94
    };
  }

  if (handle === 'dog-clothes-fleece-cloth-hooded-security-pet-sweater') {
    const displayImages = liveImages.length ? liveImages : [
      'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_nhtveinhtveinhtv.jpg?v=1791054367'
    ];
    const comparePrice = raw.variants?.find(v => v.compare_at_price)?.compare_at_price;

    return {
      id: String(raw.id),
      shopifyId: raw.id,
      title: raw.title || 'Warmes Hunde-Sweatshirt mit Kapuze',
      handle: 'dog-clothes-fleece-cloth-hooded-security-pet-sweater',
      category: 'hoodies',
      categoryLabel: 'Sport-Hoodie mit Kapuze',
      price: minPrice,
      originalPrice: comparePrice ? parseFloat(comparePrice) : 38.0,
      image: displayImages[0],
      allImages: displayImages,
      description: 'Klassisches Kapuzen-Sweatshirt aus strapazierfähiger Baumwollmischung mit weichem Innenfleece. Bietet bequemen Tragekomfort und schützt vor kühlem Herbst- und Winterwind.',
      cleanText: stripHtml(raw.body_html),
      keyFeatures: [
        'Bequeme Passform mit gerippten Bündchen an Ärmeln und Saum',
        'Sportliche Kapuze und authentischer Streetwear-Look',
        'Weiche Baumwoll-Fleece Mischung für angenehme Wärme',
        'Einfaches Anziehen und waschmaschinenfest bei 30°C'
      ],
      variants: raw.variants || [],
      sizes: parsedSizes.length ? parsedSizes : ['XS', 'S', 'M', 'L'],
      colors: parsedColors.length ? parsedColors : [
        { name: 'Black', hex: '#18181B' },
        { name: 'Grey', hex: '#9CA3AF' },
        { name: 'Blue', hex: '#1E3A8A' }
      ],
      shopifyProductUrl: 'https://milkyboss.de/products/dog-clothes-fleece-cloth-hooded-security-pet-sweater',
      available: true,
      tag: '⚡ Sportlicher Kapuzen-Sweater',
      tagColor: 'bg-zinc-900',
      rating: 4.8,
      reviewsCount: 76
    };
  }

  if (handle === 'kuscheliger-hunde-hoodie-fur-den-winter-warmer-fleece-pullover-fur-chihuahua-bulldogge-kleine-hunde') {
    const displayImages = liveImages.length ? liveImages : [
      'https://cdn.shopify.com/s/files/1/1014/4884/3606/files/Gemini_Generated_Image_d1ej8fd1ej8fd1ej.jpg?v=1792601985'
    ];
    const comparePrice = raw.variants?.find(v => v.compare_at_price)?.compare_at_price;

    return {
      id: String(raw.id),
      shopifyId: raw.id,
      title: raw.title || 'Hoodie Fleece Milky Boss',
      handle: 'kuscheliger-hunde-hoodie-fur-den-winter-warmer-fleece-pullover-fur-chihuahua-bulldogge-kleine-hunde',
      category: 'hoodies',
      categoryLabel: 'Motiv-Fleece Pullover',
      price: minPrice,
      originalPrice: comparePrice ? parseFloat(comparePrice) : 27.59,
      image: displayImages[0],
      allImages: displayImages,
      description: 'Kuschelweicher Fleece-Pullover mit verspielten Motiven für kleine und mittlere Hunde. Ultraleicht, elastisch und wärmend bei jedem Spaziergang.',
      cleanText: stripHtml(raw.body_html),
      keyFeatures: [
        'Superweiches Flanell-Fleece kratzt nicht und hält mollig warm',
        'Elastischer Bauchausschnitt für uneingeschränkte Bewegungsfreiheit',
        'Große Auswahl an fröhlichen Designs und Farben',
        'Perfekt für Chihuahua, Französische Bulldogge, Welpen & Senioren'
      ],
      variants: raw.variants || [],
      sizes: parsedSizes.length ? parsedSizes : ['S', 'M', 'L', 'XL'],
      colors: parsedColors.length ? parsedColors.slice(0, 5) : [
        { name: 'pink love', hex: '#F472B6' },
        { name: 'blue', hex: '#3B82F6' },
        { name: 'grey', hex: '#9CA3AF' },
        { name: 'yellow bear', hex: '#FBBF24' }
      ],
      shopifyProductUrl: 'https://milkyboss.de/products/kuscheliger-hunde-hoodie-fur-den-winter-warmer-fleece-pullover-fur-chihuahua-bulldogge-kleine-hunde',
      available: true,
      tag: '🐶 Beliebter Motiv-Fleece',
      tagColor: 'bg-gradient-to-r from-pink-600 to-rose-600',
      rating: 4.9,
      reviewsCount: 112
    };
  }

  return null;
}

// Ensure all 6 products are in the desired logical order:
// 1. Weste mit Geschirr (Hero / Best seller #1)
// 2. Wasserdichter Winteroverall
// 3. Khaki Fleece Hoodie
// 4. FluffyPaws Fleece-Overall mit D-Ring
// 5. Kapuzen-Sweatshirt
// 6. Milky Boss Fleece Pullover
function sortInDesiredOrder(list: TransformedShopifyProduct[]): TransformedShopifyProduct[] {
  const orderMap: Record<string, number> = {
    'wasserdichte-hunde-winterweste': 1,
    'wasserdichter-winter-hundeoverall': 2,
    'fleece-hunde-hoodie-khaki': 3,
    'fleece-hundeoverallcozypaws': 4,
    'dog-clothes-fleece-cloth-hooded-security-pet-sweater': 5,
    'kuscheliger-hunde-hoodie-fur-den-winter-warmer-fleece-pullover-fur-chihuahua-bulldogge-kleine-hunde': 6
  };
  return [...list].sort((a, b) => (orderMap[a.handle] || 99) - (orderMap[b.handle] || 99));
}

export const INITIAL_SHOPIFY_PRODUCTS: TransformedShopifyProduct[] = sortInDesiredOrder(
  ((rawData as { products: ShopifyProductRaw[] }).products || [])
    .map(transformRawProduct)
    .filter((p): p is TransformedShopifyProduct => p !== null)
);

export function getShopifyDirectCheckoutUrl(variantId: number | string, quantity = 1): string {
  return `https://milkyboss.de/cart/${variantId}:${quantity}`;
}

export function getShopifyProductUrl(handle: string): string {
  return `https://milkyboss.de/products/${handle}`;
}

export function findMatchingVariant(
  variants: ShopifyVariant[],
  size: string,
  colorName?: string
): ShopifyVariant | undefined {
  if (!variants || variants.length === 0) return undefined;

  const normalize = (s?: string | null) => (s || '').trim().toLowerCase();
  const targetSize = normalize(size);
  const targetColor = normalize(colorName);

  // 1. Exact match on both size and color
  const exact = variants.find(v => {
    const vOpt1 = normalize(v.option1);
    const vOpt2 = normalize(v.option2);
    const vTitle = normalize(v.title);

    const sizeMatches = vOpt1 === targetSize || vOpt2 === targetSize || vTitle.includes(targetSize);
    const colorMatches = !targetColor || vOpt1.includes(targetColor) || targetColor.includes(vOpt1) || vTitle.includes(targetColor);

    return sizeMatches && colorMatches;
  });

  if (exact) return exact;

  // 2. Match on size only
  const sizeOnly = variants.find(v => {
    const vOpt1 = normalize(v.option1);
    const vOpt2 = normalize(v.option2);
    const vTitle = normalize(v.title);
    return vOpt1 === targetSize || vOpt2 === targetSize || vTitle.includes(targetSize);
  });

  return sizeOnly || variants[0];
}

export async function fetchLiveShopifyProducts(): Promise<TransformedShopifyProduct[]> {
  try {
    const res = await fetch('/api/shopify/products.json');
    if (!res.ok) throw new Error(`Shopify returned status ${res.status}`);
    const data = await res.json();
    if (data?.products?.length) {
      const transformed = data.products
        .map(transformRawProduct)
        .filter((p: TransformedShopifyProduct | null): p is TransformedShopifyProduct => p !== null);
      if (transformed.length) {
        return sortInDesiredOrder(transformed);
      }
    }
  } catch (err) {
    console.warn('Live fetch fallback:', err);
  }
  return INITIAL_SHOPIFY_PRODUCTS;
}
