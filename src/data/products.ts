import { Product, FragranceNoteDetail } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'oody-raspberry',
    slug: 'oody-raspberry',
    name: 'OODY RASPBERRY',
    subtitle: 'An opulent contrast of rare wild berries and smoked agarwood',
    classification: 'Woody · Fruity · Warm',
    family: 'Woody',
    category: 'Perfume',
    price: 4999,
    compareAtPrice: 5499,
    originalPrice: 5499,
    rating: 4.9,
    reviewCount: 124,
    volume: '100 ml / 3.4 FL.OZ',
    liquidColor: 'from-[#54121d] via-[#852737] to-[#b34055]',
    liquidHighlight: '#ff8a9e',
    topNotes: ['Wild Mountain Raspberry', 'Pink Pepper', 'Saffron Threads'],
    heartNotes: ['Damask Rose Petals', 'Smoked Incense', 'Papyrus'],
    baseNotes: ['Aged Cambodian Oud', 'Bourbon Vanilla', 'Amber Resin'],
    description:
      'A thrilling juxtaposition of tart wild mountain raspberry and the dark, smoldering depths of artisanal Cambodian oud. Opulent yet modern, it lingers with undeniable charisma on warm skin.',
    inspiration:
      'Inspired by the dusk air over ancient oriental courtyards where spice markets meet night-blooming gardens.',
    howItSmells:
      'Opens with bright, mouth-watering wild berry tartness and a pinch of tingling pink pepper. Within thirty minutes, smoldering Cambodian agarwood and sacred incense unveil a deep, velvety balsamic sillage softened by bourbon vanilla.',
    howToWear:
      'Apply 2–3 sprays directly to pulse points: the base of the throat, inner wrists, and behind the ears. Due to the 28% pure extrait concentration, do not rub the wrists together, allowing the fragrance pyramid to develop naturally.',
    details:
      'Extrait de Parfum · 28% concentration · Hand-poured in Grasse, France · Heavy French crystal flacon · Solid brushed champagne gold cap · Batch macerated for 8 weeks.',
    longevity: '12+ Hours (Extrait de Parfum)',
    sillage: 'Radiant & Enveloping',
    season: 'Autumn / Winter / Evening All-Season',
    stock: 28,
    inStock: true,
    badge: 'BESTSELLER',
    isBestseller: true,
    sku: 'MK-EXT-001',
    variants: [
      { size: '30ml', price: 2999, compareAtPrice: 3399, inStock: true },
      { size: '50ml', price: 3899, compareAtPrice: 4299, inStock: true },
      { size: '100ml', price: 4999, compareAtPrice: 5499, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Aria V.',
        rating: 5,
        date: '14 Sep 2026',
        title: 'Masterpiece of modern niche perfumery',
        comment:
          'The raspberry here is not sweet or juvenile at all — it is tart, crisp, and elevated. When the Cambodian oud settles after an hour, it becomes one of the most intoxicating scents I have ever worn. Lasts through the entire evening and into the morning.',
        verified: true,
        location: 'Mumbai',
      },
      {
        id: 'rev-2',
        author: 'Devendra K.',
        rating: 5,
        date: '02 Sep 2026',
        title: 'Unrivaled sillage and compliments',
        comment:
          'Wore this to a private gallery opening and received compliments from three distinct strangers. The bottle weight and glass packaging alone feel like a 20,000 rupee luxury flacon.',
        verified: true,
        location: 'New Delhi',
      },
      {
        id: 'rev-3',
        author: 'Camille B.',
        rating: 5,
        date: '18 Aug 2026',
        title: 'Rich, smoldering and sophisticated',
        comment:
          'A truly harmonious balance. The smokiness of the oud is refined, not medicinal. The complimentary 2ml sample vial included with the order gave me total confidence before unboxing the full 100ml.',
        verified: true,
        location: 'Bengaluru',
      },
      {
        id: 'rev-4',
        author: 'Rohit M.',
        rating: 4,
        date: '29 Jul 2026',
        title: 'Very potent — 2 sprays are plenty',
        comment:
          'Heavy and deeply sensual. It is strictly an evening fragrance for me, but the longevity is astonishing. Easily 12+ hours on skin and days on clothing.',
        verified: true,
        location: 'Hyderabad',
      },
    ],
  },
  {
    id: 'santal-blanc',
    slug: 'santal-blanc',
    name: 'SANTAL BLANC',
    subtitle: 'Creamy Australian sandalwood cloaked in white musk and cardamom',
    classification: 'Woody · Creamy · Serene',
    family: 'Woody',
    category: 'Perfume',
    price: 5299,
    compareAtPrice: 5899,
    originalPrice: 5899,
    rating: 4.8,
    reviewCount: 98,
    volume: '100 ml / 3.4 FL.OZ',
    liquidColor: 'from-[#8c6b3e] via-[#c49a5c] to-[#e4c28d]',
    liquidHighlight: '#fae3be',
    topNotes: ['Green Cardamom', 'Crisp White Tea', 'Bergamot Zest'],
    heartNotes: ['Iris Butter', 'Violet Leaf', 'Cashmere Accord'],
    baseNotes: ['Sustainably Sourced Australian Sandalwood', 'White Musk', 'Cedarwood'],
    description:
      'Silky, meditative, and profoundly calming. Santal Blanc envelops the wearer in creamy sandalwood softened by luminous iris and warm green cardamom spice.',
    inspiration:
      'Crafted as an olfactory sanctuary — the scent of sun-warmed untreated timber, sheer morning sunlight, and crisp white linen.',
    howItSmells:
      'A serene, milky opening of crushed cardamom pods and silver needle white tea that gently glides into powdery iris butter, anchored by an ultra-creamy Australian sandalwood base.',
    howToWear:
      'Ideal for daytime, executive boardrooms, and intimate evenings. Spray generously on the neck, collarbones, and hair ends for an aura of effortless elegance.',
    details:
      'Extrait de Parfum · 28% concentration · Ethically plantation-grown Australian sandalwood · 100% recyclable French crystal bottle.',
    longevity: '10 Hours',
    sillage: 'Sophisticated & Intimate',
    season: 'All Seasons / Daytime & Boardroom',
    stock: 22,
    inStock: true,
    badge: 'BESTSELLER',
    isBestseller: true,
    sku: 'MK-EXT-002',
    variants: [
      { size: '30ml', price: 3199, compareAtPrice: 3599, inStock: true },
      { size: '50ml', price: 4199, compareAtPrice: 4599, inStock: true },
      { size: '100ml', price: 5299, compareAtPrice: 5899, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-s1',
        author: 'Mira S.',
        rating: 5,
        date: '20 Sep 2026',
        title: 'The cleanest, most comforting sandalwood',
        comment:
          'Unlike typical synthetic sandalwood scents that smell sharp, this has a rich creamy milkiness that feels like cashmere. It is calming and so quietly luxurious.',
        verified: true,
        location: 'Pune',
      },
      {
        id: 'rev-s2',
        author: 'Armaan T.',
        rating: 5,
        date: '10 Sep 2026',
        title: 'Perfect signature everyday scent',
        comment:
          'Subtle yet memorable. It does not shout; people simply lean closer to smell you. Absolutely worth every rupee.',
        verified: true,
        location: 'Gurugram',
      },
    ],
  },
  {
    id: 'rose-imperiale',
    slug: 'rose-imperiale',
    name: 'ROSE IMPÉRIALE',
    subtitle: 'Regal velvet roses steeped in black pepper and golden amber',
    classification: 'Floral · Spicy · Velvet',
    family: 'Floral',
    category: 'Perfume',
    price: 5499,
    compareAtPrice: 6200,
    originalPrice: 6200,
    rating: 5.0,
    reviewCount: 146,
    volume: '100 ml / 3.4 FL.OZ',
    liquidColor: 'from-[#6e1e2d] via-[#a83248] to-[#d45d74]',
    liquidHighlight: '#ffaec0',
    topNotes: ['Sparkling Mandora', 'Tellicherry Black Pepper', 'Coriander Seed'],
    heartNotes: ['Grasse Centifolia Rose', 'Bulgarian Damascena Rose', 'Geranium Leaf'],
    baseNotes: ['Indonesian Patchouli', 'Labdanum Gold', 'Benzoin Tears'],
    description:
      'Not a fragile garden rose, but a commanding velvet monarch. Decadent blooms paired with sharp spices and dark resins create a fragrance of unapologetic grandeur.',
    inspiration:
      'The dramatic rose gardens of Grasse harvested at twilight before nocturnal distillation.',
    howItSmells:
      'Opens with vibrant citrus and cracked Tellicherry black pepper that slices through the honeyed crimson heart of Damascena and Centifolia roses, resting on warm ambered patchouli.',
    howToWear:
      'Spray on bare shoulders and behind the neck. Perfect for celebrations, black-tie occasions, and formal dining where a lingering impression is desired.',
    details:
      'Extrait de Parfum · 28% concentration · Features genuine Grasse Centifolia rose absolute · Hand-assembled presentation box.',
    longevity: '12 Hours',
    sillage: 'Magnetic & Unforgettable',
    season: 'Evening / Formal Occasions',
    stock: 14,
    inStock: true,
    badge: 'BESTSELLER',
    isBestseller: true,
    sku: 'MK-EXT-003',
    variants: [
      { size: '30ml', price: 3299, compareAtPrice: 3699, inStock: true },
      { size: '50ml', price: 4299, compareAtPrice: 4799, inStock: true },
      { size: '100ml', price: 5499, compareAtPrice: 6200, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-r1',
        author: 'Gayatri R.',
        rating: 5,
        date: '24 Sep 2026',
        title: 'Dark, spicy rose perfection',
        comment:
          'I am usually sceptical of rose perfumes, but Rose Impériale is dark, smoky, and magnificent. The pepper gives it edge and modern character.',
        verified: true,
        location: 'Kolkata',
      },
    ],
  },
  {
    id: 'iris-celeste',
    slug: 'iris-celeste',
    name: 'IRIS CÉLESTE',
    subtitle: 'Florentine orris root veiled in cool morning air and citrus dew',
    classification: 'Powdery · Fresh · Luminous',
    family: 'Fresh',
    category: 'Perfume',
    price: 4899,
    compareAtPrice: 5399,
    originalPrice: 5399,
    rating: 4.8,
    reviewCount: 89,
    volume: '100 ml / 3.4 FL.OZ',
    liquidColor: 'from-[#4a4f66] via-[#757d9e] to-[#a4adc9]',
    liquidHighlight: '#dbe0f2',
    topNotes: ['Calabrian Bergamot', 'Angelica Root', 'Morning Dew Accord'],
    heartNotes: ['Florentine Orris Pallida', 'French Lavender', 'Mimosa Blossom'],
    baseNotes: ['Ambrette Seed', 'White Suede', 'Soft Cedar'],
    description:
      'Ethereal, clean, and aristocratically refined. Iris Céleste transforms rare aged orris butter into a luminous second skin of pure silver elegance.',
    inspiration:
      'The morning mist rising above Tuscan hillsides where precious irises are dried over three patient years.',
    howItSmells:
      'Sparkling Italian bergamot meets cold botanical angelica root before giving way to the supreme nobility of buttery Florentine orris root and white suede.',
    howToWear:
      'Lightly spritz across freshly cleansed skin after a warm shower. The heat of the body allows the powdery orris to bloom with remarkable intimacy.',
    details:
      'Extrait de Parfum · Aged Florentine Orris butter · Micro-filtered natural alcohol base.',
    longevity: '9 Hours',
    sillage: 'Airy & Subtly Persistent',
    season: 'Spring / Summer / Everyday Luxury',
    stock: 19,
    inStock: true,
    badge: 'NEW',
    sku: 'MK-EXT-004',
    variants: [
      { size: '30ml', price: 2899, compareAtPrice: 3299, inStock: true },
      { size: '50ml', price: 3799, compareAtPrice: 4199, inStock: true },
      { size: '100ml', price: 4899, compareAtPrice: 5399, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-i1',
        author: 'Siddharth P.',
        rating: 5,
        date: '28 Sep 2026',
        title: 'The cleanest iris fragrance on the market',
        comment:
          'Orris is the most expensive natural perfumery ingredient for good reason. Maison Kiyora let the raw quality of the butter shine without burying it in cheap sugar.',
        verified: true,
        location: 'Chennai',
      },
    ],
  },
  {
    id: 'cuir-nocturne',
    slug: 'cuir-nocturne',
    name: 'CUIR NOCTURNE',
    subtitle: 'Burnished leather softened by saffron threads and roasted tonka',
    classification: 'Smoky · Leather · Intimate',
    family: 'Leather',
    category: 'Perfume',
    price: 5799,
    compareAtPrice: 6500,
    originalPrice: 6500,
    rating: 4.9,
    reviewCount: 112,
    volume: '100 ml / 3.4 FL.OZ',
    liquidColor: 'from-[#2e1d13] via-[#52331f] to-[#7d5032]',
    liquidHighlight: '#d49d68',
    topNotes: ['Golden Saffron', 'Juniper Berry', 'Thyme Herb'],
    heartNotes: ['Black Violet', 'Saddle Leather', 'Osmanthus Blossom'],
    baseNotes: ['Birch Tar', 'Roasted Tonka Bean', 'Smoked Vetiver'],
    description:
      'Dark, seductive, and tactile. Cuir Nocturne evokes vintage leather armchairs, midnight discussions, and the golden haze of warm embers.',
    inspiration:
      'A private Parisian library after midnight with amber spirits and hand-bound manuscripts.',
    howItSmells:
      'Warm golden saffron and herbal thyme burst forth, then settle into rich, supple black leather, sweetened subtly by roasted Venezuelan tonka bean and birch tar.',
    howToWear:
      'Spray on pulse points or onto the lapel of an overcoat or wool sweater. A commanding fragrance best suited for crisp nights and formal gatherings.',
    details:
      'Extrait de Parfum · Natural cade and birch tar extracts · 30-day cellar resting cycle.',
    longevity: '14+ Hours',
    sillage: 'Profound & Addictive',
    season: 'Autumn / Winter / Black Tie',
    stock: 9,
    inStock: true,
    badge: 'LIMITED',
    sku: 'MK-EXT-005',
    variants: [
      { size: '30ml', price: 3499, compareAtPrice: 3899, inStock: true },
      { size: '50ml', price: 4499, compareAtPrice: 4999, inStock: true },
      { size: '100ml', price: 5799, compareAtPrice: 6500, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-c1',
        author: 'Kunal M.',
        rating: 5,
        date: '12 Sep 2026',
        title: 'Dark, regal, deeply tactile leather',
        comment:
          'If you enjoy Tuscan Leather or Ombre Leather, Cuir Nocturne is on another plane entirely. The saffron and tonka give it an opulent smoothness that never feels harsh.',
        verified: true,
        location: 'Jaipur',
      },
    ],
  },
  {
    id: 'neroli-solaire',
    slug: 'neroli-solaire',
    name: 'NÉROLI SOLAIRE',
    subtitle: 'Sunlit orange blossoms infused with Sicilian petitgrain and solar amber',
    classification: 'Citrus · Floral · Radiant',
    family: 'Citrus',
    category: 'Perfume',
    price: 4699,
    compareAtPrice: 5199,
    originalPrice: 5199,
    rating: 4.7,
    reviewCount: 64,
    volume: '100 ml / 3.4 FL.OZ',
    liquidColor: 'from-[#b36b00] via-[#e69500] to-[#ffb833]',
    liquidHighlight: '#ffe8a3',
    topNotes: ['Bitter Orange', 'Sicilian Petitgrain', 'Neroli Water'],
    heartNotes: ['Orange Flower Absolute', 'White Jasmine', 'Rosemary Herb'],
    baseNotes: ['Solar Amber', 'Golden Musk', 'Driftwood Accord'],
    description:
      'A brilliant burst of Mediterranean sunshine. Sparkling bitter orange and distilled blossom petals dissolve into a warm golden skin musk.',
    inspiration:
      'The sun-baked groves of Sicily overlooking azure waters in midsummer afternoon warmth.',
    howItSmells:
      'An invigorating, sparkling blast of crushed citrus leaves and white blossoms that dries down to a luminous, sun-warmed skin scent.',
    howToWear:
      'Mist liberally over chest, neck, and clothing for an immediate surge of sunny optimism and crisp Mediterranean freshness.',
    details:
      'Extrait de Parfum · Cold-pressed Italian citrus oils · Biodegradable flacon components.',
    longevity: '8 Hours',
    sillage: 'Luminous & Uplifting',
    season: 'Spring / Summer / Daytime',
    stock: 35,
    inStock: true,
    badge: 'NEW',
    sku: 'MK-EXT-006',
    variants: [
      { size: '30ml', price: 2799, compareAtPrice: 3099, inStock: true },
      { size: '50ml', price: 3699, compareAtPrice: 4099, inStock: true },
      { size: '100ml', price: 4699, compareAtPrice: 5199, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-n1',
        author: 'Ananya B.',
        rating: 5,
        date: '25 Sep 2026',
        title: 'Golden sunshine captured in crystal',
        comment:
          'The most authentic orange blossom I have ever experienced. Uplifting, clean, and beautifully blended without synthetic sweetness.',
        verified: true,
        location: 'Goa',
      },
    ],
  },
  {
    id: 'discovery-set',
    slug: 'discovery-set',
    name: 'L’ATELIER DISCOVERY COFFRET',
    subtitle: 'Complete miniature journey across the five Maison Kiyora signature creations',
    classification: 'Discovery · 5 x 10ml · Travel Ready',
    family: 'Woody',
    category: 'Discovery Set',
    price: 3499,
    compareAtPrice: 3999,
    originalPrice: 3999,
    rating: 5.0,
    reviewCount: 218,
    volume: '5 x 10 ml / 0.34 FL.OZ',
    liquidColor: 'from-[#54121d] via-[#8c6b3e] to-[#6e1e2d]',
    liquidHighlight: '#f3e5c8',
    topNotes: ['Oody Raspberry (10ml)', 'Santal Blanc (10ml)', 'Rose Impériale (10ml)'],
    heartNotes: ['Iris Céleste (10ml)', 'Cuir Nocturne (10ml)'],
    baseNotes: ['Full 100% redeemable voucher included towards any 100ml flacon'],
    description:
      'Experience the entire Maison Kiyora olfactory library in travel-ready format. Includes five 10ml flacons housed in a rigid ivory presentation coffret, plus a ₹1,000 voucher towards your first 100ml flacon.',
    inspiration:
      'The traditional perfumer’s organ where journeys begin before a signature scent is declared.',
    howItSmells:
      'An intimate tour of our complete world: from tart wild berry oud to creamy sandalwood, velvet crimson rose, Tuscan orris, and burnished leather.',
    howToWear:
      'Wear each flacon for an entire week to observe how the notes evolve with your daily skin chemistry, morning to night.',
    details:
      'Includes five 10ml Extrait de Parfum flacons with spray atomizers · Linen-finish presentation coffret with magnetic clasp · Redeemable privilege voucher included.',
    longevity: '10–14 Hours across all five fragrances',
    sillage: 'Varies by creation',
    season: 'All Seasons',
    stock: 45,
    inStock: true,
    badge: 'BESTSELLER',
    isBestseller: true,
    sku: 'MK-SET-001',
    variants: [
      { size: '50ml', price: 3499, compareAtPrice: 3999, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-d1',
        author: 'Dr. Vikram S.',
        rating: 5,
        date: '21 Sep 2026',
        title: 'The ultimate luxury blind-buy solution',
        comment:
          'Each 10ml flacon is heavy, sealed with metal, and provides weeks of wear. The ₹1,000 redeemable voucher made purchasing my full bottle of Oody Raspberry a no-brainer.',
        verified: true,
        location: 'New Delhi',
      },
    ],
  },
  {
    id: 'grand-coffret-prestige',
    slug: 'grand-coffret-prestige',
    name: 'LE GRAND COFFRET PRESTIGE',
    subtitle: 'Signature 100ml flacon accompanied by a hand-stitched leather travel flacon',
    classification: 'Bespoke Gift · 100ml + 10ml Leather Flacon',
    family: 'Floral',
    category: 'Gift Set',
    price: 6499,
    compareAtPrice: 7200,
    originalPrice: 7200,
    rating: 5.0,
    reviewCount: 76,
    volume: '100 ml + 10 ml Travel Flacon',
    liquidColor: 'from-[#6e1e2d] via-[#b69a69] to-[#211c19]',
    liquidHighlight: '#fae3be',
    topNotes: ['Choice of any signature 100ml creation'],
    heartNotes: ['Bespoke Saffiano leather travel sleeve in cognac or espresso'],
    baseNotes: ['Complimentary wax-sealed personalized calligraphy greeting card'],
    description:
      'The definitive gifting tribute. Features a full-sized 100ml architectural flacon of your choice paired with a 10ml refillable travel flacon enveloped in artisanal Italian Saffiano leather.',
    inspiration:
      'The historic bespoke travel dressing trunks of European royalty and diplomatic envoys.',
    howItSmells:
      'Select any of the five Maison Kiyora signature olfactory profiles to anchor this premier set.',
    howToWear:
      'Keep the majestic crystal flacon upon your vanity and slip the leather atomizer into your briefcase or evening bag for seamless touch-ups.',
    details:
      'Includes 100ml flacon + 10ml travel atomizer + gold funnel + embossed calligraphy card + grosgrain ribbon presentation.',
    longevity: '12+ Hours',
    sillage: 'Magnificent',
    season: 'All Seasons / Ceremonial Gifting',
    stock: 12,
    inStock: true,
    badge: 'LIMITED',
    sku: 'MK-SET-002',
    variants: [
      { size: '100ml', price: 6499, compareAtPrice: 7200, inStock: true },
    ],
    reviews: [
      {
        id: 'rev-g1',
        author: 'Zoya K.',
        rating: 5,
        date: '17 Sep 2026',
        title: 'Ordered this for my anniversary — absolutely stunning',
        comment:
          'The recipient was astonished by the presentation. The wax seal, the handwritten calligraphy card, and the weight of the leather travel flacon are simply world-class.',
        verified: true,
        location: 'Mumbai',
      },
    ],
  },
];

export const FRAGRANCE_NOTES: FragranceNoteDetail[] = [
  {
    name: 'WILD RASPBERRY',
    category: 'Top',
    origin: 'Valais Valley, Switzerland',
    description: 'Bright, juicy and subtly sweet with vibrant morning effervescence.',
    iconType: 'berry',
  },
  {
    name: 'SAFFRON THREADS',
    category: 'Top',
    origin: 'Kashmir, India',
    description: 'Warm, golden, bittersweet threads that provide an aristocratic spice shimmer.',
    iconType: 'spice',
  },
  {
    name: 'DAMASCENA ROSE',
    category: 'Heart',
    origin: 'Grasse & Kazanlak',
    description: 'Deep crimson petals harvested at sunrise, honeyed, rich, and velvety.',
    iconType: 'flower',
  },
  {
    name: 'FLORENTINE ORRIS',
    category: 'Heart',
    origin: 'Florence, Italy',
    description: 'Aged for 3 years to yield powdery, buttery iris root of peerless nobility.',
    iconType: 'flower',
  },
  {
    name: 'CAMBODIAN OUD',
    category: 'Base',
    origin: 'Pursat Province',
    description: 'Smoky, aged resinous heartwood with balsamic warmth and leather undertones.',
    iconType: 'wood',
  },
  {
    name: 'AUSTRALIAN SANDALWOOD',
    category: 'Base',
    origin: 'Albany, Western Australia',
    description: 'Silky, creamy wood heart with radiant milky facets and serene warmth.',
    iconType: 'wood',
  },
  {
    name: 'BOURBON VANILLA',
    category: 'Base',
    origin: 'Madagascar',
    description: 'Dark, balsamic vanilla pod extract without cloying sweetness.',
    iconType: 'vanilla',
  },
  {
    name: 'CALABRIAN BERGAMOT',
    category: 'Top',
    origin: 'Reggio Calabria, Italy',
    description: 'Cold-pressed citrus peel delivering sparkling freshness and sun-drenched vibrancy.',
    iconType: 'citrus',
  },
];

export const TRUST_BENEFITS = [
  'CRAFTED FRAGRANCES',
  'PREMIUM PACKAGING',
  'SECURE CHECKOUT',
  'FAST DELIVERY',
];

// Helper to compute dynamic estimated delivery date based on PIN code
export function calculateDeliveryDate(pinCode: string): {
  valid: boolean;
  message: string;
  estimatedDate: string;
  city: string;
} {
  const cleanPin = pinCode.trim();
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit Indian PIN code.',
      estimatedDate: '',
      city: '',
    };
  }

  // Pre-mapped regions for realism
  const prefix = cleanPin.substring(0, 2);
  let daysToAdd = 3;
  let city = 'Metro Region';

  if (['11', '12', '13', '20'].includes(prefix)) {
    daysToAdd = 2;
    city = 'Delhi NCR & North';
  } else if (['40', '41', '42'].includes(prefix)) {
    daysToAdd = 2;
    city = 'Mumbai & Western Coast';
  } else if (['56', '57', '60', '50'].includes(prefix)) {
    daysToAdd = 3;
    city = 'Bengaluru, Chennai & South';
  } else if (['70', '71', '72'].includes(prefix)) {
    daysToAdd = 3;
    city = 'Kolkata & East';
  } else {
    daysToAdd = 4;
    city = 'National Delivery';
  }

  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysToAdd);

  const formattedDate = targetDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    valid: true,
    message: `Delivery available for ${city}`,
    estimatedDate: formattedDate,
    city,
  };
}
