import type {
  ProductCategoryId,
  ProductSpec,
  ProductVariant,
} from '@/features/marketplace/types';
import { productImage } from './media';

/**
 * Raw catalogue records — the mock "database".
 *
 * The API layer (`services/api/products.ts`) derives listing summaries
 * and injects computed fields (starting price, lowest EMI) from these
 * records so the UI never sees hard-coded, pre-aggregated data.
 */
export type ProductRecord = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategoryId;
  tagline: string;
  description: string;
  rating: number;
  ratingCount: number;
  highlights: string[];
  specs: ProductSpec[];
  variants: ProductVariant[];
};

const glyphFor: Record<ProductCategoryId, Parameters<typeof productImage>[1]> = {
  mobiles: 'mobiles',
  laptops: 'laptops',
  audio: 'audio',
  wearables: 'wearables',
  tv: 'tv',
  cameras: 'cameras',
};

function variant(
  id: string,
  label: string,
  attributes: ProductVariant['attributes'],
  price: number,
  mrp: number,
  inStock = true,
): ProductVariant {
  return { id, label, attributes, price, mrp, inStock };
}

export const productRecords: ProductRecord[] = [
  {
    id: 'aurora-x5-pro',
    name: 'Aurora X5 Pro',
    brand: 'Aurora',
    category: 'mobiles',
    tagline: '6.7" 120Hz AMOLED · Triple 50MP camera',
    description:
      'The Aurora X5 Pro pairs a pro-grade triple camera system with a titanium frame and a 5,000mAh cell that comfortably lasts a full day. The 120Hz LTPO display dims to 1Hz on the always-on screen to save power.',
    rating: 4.6,
    ratingCount: 3820,
    highlights: [
      'Titanium unibody, IP68 rated',
      '50MP main with sensor-shift OIS',
      '90W wired charging (0–60% in 20 min)',
      '4 years of OS updates',
    ],
    specs: [
      { label: 'Display', value: '6.7" LTPO AMOLED, 120Hz, 2600 nits' },
      { label: 'Processor', value: 'Aurora Fusion G3, 4nm' },
      { label: 'Battery', value: '5,000 mAh, 90W wired / 30W wireless' },
      { label: 'Rear camera', value: '50MP + 50MP UW + 12MP 3x tele' },
      { label: 'Weight', value: '198 g' },
      { label: 'In the box', value: 'Handset, USB-C cable, SIM tool' },
    ],
    variants: [
      variant(
        'aurora-x5-pro-256-blue',
        '256 GB · Nebula Blue',
        [
          { name: 'Storage', value: '256 GB' },
          { name: 'Colour', value: 'Nebula Blue' },
        ],
        74999,
        82999,
      ),
      variant(
        'aurora-x5-pro-256-black',
        '256 GB · Obsidian',
        [
          { name: 'Storage', value: '256 GB' },
          { name: 'Colour', value: 'Obsidian' },
        ],
        74999,
        82999,
      ),
      variant(
        'aurora-x5-pro-512-blue',
        '512 GB · Nebula Blue',
        [
          { name: 'Storage', value: '512 GB' },
          { name: 'Colour', value: 'Nebula Blue' },
        ],
        81999,
        89999,
      ),
      variant(
        'aurora-x5-pro-512-black',
        '512 GB · Obsidian',
        [
          { name: 'Storage', value: '512 GB' },
          { name: 'Colour', value: 'Obsidian' },
        ],
        81999,
        89999,
        false,
      ),
    ],
  },
  {
    id: 'nova-lite-5g',
    name: 'Nova Lite 5G',
    brand: 'Aurora',
    category: 'mobiles',
    tagline: '6.5" 90Hz · 5,000mAh · Clean software',
    description:
      'A dependable everyday 5G phone with a bright 90Hz screen, two-day battery life and a clean, ad-free interface. Great first EMI purchase.',
    rating: 4.3,
    ratingCount: 1512,
    highlights: [
      '90Hz IPS LCD, 600 nits',
      '5,000 mAh with 33W charging',
      'Dual SIM 5G',
    ],
    specs: [
      { label: 'Display', value: '6.5" IPS LCD, 90Hz' },
      { label: 'Processor', value: 'Aurora Fusion G1' },
      { label: 'Battery', value: '5,000 mAh, 33W wired' },
      { label: 'Rear camera', value: '50MP + 2MP depth' },
      { label: 'Weight', value: '189 g' },
    ],
    variants: [
      variant(
        'nova-lite-5g-128',
        '128 GB · Frost',
        [
          { name: 'Storage', value: '128 GB' },
          { name: 'Colour', value: 'Frost' },
        ],
        16999,
        18999,
      ),
      variant(
        'nova-lite-5g-256',
        '256 GB · Frost',
        [
          { name: 'Storage', value: '256 GB' },
          { name: 'Colour', value: 'Frost' },
        ],
        18999,
        20999,
      ),
    ],
  },
  {
    id: 'vertex-book-14',
    name: 'Vertex Book 14',
    brand: 'Vertex',
    category: 'laptops',
    tagline: '14" 2.8K OLED · 16GB · 1.29kg',
    description:
      'A thin-and-light 14" notebook with a stunning 2.8K OLED panel, all-day battery and a comfortable keyboard. Configured for students and everyday professionals.',
    rating: 4.5,
    ratingCount: 964,
    highlights: [
      '2.8K 90Hz OLED, 100% DCI-P3',
      '70Wh battery, ~12 hr real use',
      'Two Thunderbolt 4 ports',
      'MIL-STD-810H tested chassis',
    ],
    specs: [
      { label: 'Display', value: '14" 2880×1800 OLED, 90Hz' },
      { label: 'Processor', value: 'Vertex Core 7 (10c/16t)' },
      { label: 'Graphics', value: 'Integrated Xe' },
      { label: 'Battery', value: '70Wh, 65W USB-C charging' },
      { label: 'Weight', value: '1.29 kg' },
    ],
    variants: [
      variant(
        'vertex-book-14-16-512',
        '16 GB · 512 GB SSD',
        [
          { name: 'Memory', value: '16 GB' },
          { name: 'Storage', value: '512 GB' },
        ],
        84990,
        94990,
      ),
      variant(
        'vertex-book-14-16-1tb',
        '16 GB · 1 TB SSD',
        [
          { name: 'Memory', value: '16 GB' },
          { name: 'Storage', value: '1 TB' },
        ],
        92990,
        102990,
      ),
      variant(
        'vertex-book-14-32-1tb',
        '32 GB · 1 TB SSD',
        [
          { name: 'Memory', value: '32 GB' },
          { name: 'Storage', value: '1 TB' },
        ],
        104990,
        114990,
      ),
    ],
  },
  {
    id: 'vertex-book-pro-16',
    name: 'Vertex Book Pro 16',
    brand: 'Vertex',
    category: 'laptops',
    tagline: '16" mini-LED · discrete GPU · creator-ready',
    description:
      'A performance 16" workstation with a 165Hz mini-LED display and a discrete GPU for editing, rendering and heavier builds.',
    rating: 4.7,
    ratingCount: 611,
    highlights: [
      '16" 3.2K mini-LED, 165Hz, 1000 nits',
      'Discrete 8GB GPU',
      '99Wh battery, 140W charging',
    ],
    specs: [
      { label: 'Display', value: '16" 3200×2000 mini-LED, 165Hz' },
      { label: 'Processor', value: 'Vertex Core 9 HX (16c/24t)' },
      { label: 'Graphics', value: 'Discrete GPU, 8 GB' },
      { label: 'Battery', value: '99Wh, 140W USB-C' },
      { label: 'Weight', value: '2.1 kg' },
    ],
    variants: [
      variant(
        'vertex-book-pro-16-32-1tb',
        '32 GB · 1 TB SSD',
        [
          { name: 'Memory', value: '32 GB' },
          { name: 'Storage', value: '1 TB' },
        ],
        169990,
        184990,
      ),
      variant(
        'vertex-book-pro-16-32-2tb',
        '32 GB · 2 TB SSD',
        [
          { name: 'Memory', value: '32 GB' },
          { name: 'Storage', value: '2 TB' },
        ],
        184990,
        199990,
      ),
    ],
  },
  {
    id: 'pulse-buds-3',
    name: 'Pulse Buds 3',
    brand: 'Pulse',
    category: 'audio',
    tagline: 'Adaptive ANC · 36 hr total · USB-C',
    description:
      'Compact true-wireless earbuds with adaptive noise cancellation, multipoint pairing and a low-latency game mode.',
    rating: 4.4,
    ratingCount: 5210,
    highlights: [
      'Adaptive ANC, 4 mics',
      '8 hr buds + 28 hr case',
      'Bluetooth 5.4 multipoint',
      'IPX5 sweat resistance',
    ],
    specs: [
      { label: 'Driver', value: '11 mm dynamic' },
      { label: 'Battery', value: '8 hr (ANC on) + 28 hr case' },
      { label: 'Charging', value: 'USB-C + Qi wireless' },
      { label: 'Codecs', value: 'AAC, SBC, LDAC' },
      { label: 'Weight', value: '4.6 g per bud' },
    ],
    variants: [
      variant(
        'pulse-buds-3-graphite',
        'Graphite',
        [{ name: 'Colour', value: 'Graphite' }],
        8999,
        10999,
      ),
      variant(
        'pulse-buds-3-ivory',
        'Ivory',
        [{ name: 'Colour', value: 'Ivory' }],
        8999,
        10999,
      ),
    ],
  },
  {
    id: 'pulse-studio-over-ear',
    name: 'Pulse Studio Over-Ear',
    brand: 'Pulse',
    category: 'audio',
    tagline: 'Hi-res over-ear · 60 hr · plush memory foam',
    description:
      'Reference-tuned over-ear headphones with hybrid ANC, a 60-hour battery and a foldable travel design.',
    rating: 4.6,
    ratingCount: 1890,
    highlights: [
      'Hybrid ANC with transparency',
      '60 hr battery (ANC on)',
      'Hi-res certified, LDAC',
    ],
    specs: [
      { label: 'Driver', value: '40 mm bio-cellulose' },
      { label: 'Battery', value: '60 hr, 10 min = 5 hr fast charge' },
      { label: 'Weight', value: '255 g' },
      { label: 'Connectivity', value: 'BT 5.3, 3.5 mm, USB-C audio' },
    ],
    variants: [
      variant(
        'pulse-studio-midnight',
        'Midnight',
        [{ name: 'Colour', value: 'Midnight' }],
        17999,
        21999,
      ),
      variant(
        'pulse-studio-sand',
        'Sand',
        [{ name: 'Colour', value: 'Sand' }],
        17999,
        21999,
        false,
      ),
    ],
  },
  {
    id: 'chrono-watch-s2',
    name: 'Chrono Watch S2',
    brand: 'Chrono',
    category: 'wearables',
    tagline: 'AMOLED · GPS · 14-day battery',
    description:
      'A lightweight smartwatch with a bright AMOLED display, dual-band GPS, and up to 14 days of battery in everyday use.',
    rating: 4.2,
    ratingCount: 2740,
    highlights: [
      '1.43" AMOLED, always-on',
      'Dual-band GPS, 100+ sport modes',
      'SpO2, HRV and skin-temperature sensors',
      '5 ATM water resistance',
    ],
    specs: [
      { label: 'Display', value: '1.43" AMOLED, 466×466' },
      { label: 'Battery', value: 'Up to 14 days typical use' },
      { label: 'Health', value: 'HR, SpO2, HRV, sleep, stress' },
      { label: 'Water resistance', value: '5 ATM' },
    ],
    variants: [
      variant(
        'chrono-watch-s2-42-black',
        '42 mm · Black',
        [
          { name: 'Case', value: '42 mm' },
          { name: 'Colour', value: 'Black' },
        ],
        12999,
        14999,
      ),
      variant(
        'chrono-watch-s2-46-silver',
        '46 mm · Silver',
        [
          { name: 'Case', value: '46 mm' },
          { name: 'Colour', value: 'Silver' },
        ],
        14499,
        16499,
      ),
    ],
  },
  {
    id: 'lumen-55-qled',
    name: 'Lumen 55" 4K QLED',
    brand: 'Lumen',
    category: 'tv',
    tagline: '4K QLED · 120Hz · Dolby Vision IQ',
    description:
      'A 55" QLED TV with a 120Hz VRR panel, Dolby Vision IQ and Dolby Atmos, plus a fast, ad-light smart platform.',
    rating: 4.4,
    ratingCount: 1320,
    highlights: [
      'Quantum-dot 4K panel, 120Hz VRR',
      'Dolby Vision IQ + Atmos',
      '4 × HDMI (2 × HDMI 2.1)',
      'Hands-free voice remote',
    ],
    specs: [
      { label: 'Screen', value: '55" QLED 3840×2160, 120Hz' },
      { label: 'HDR', value: 'Dolby Vision IQ, HDR10+, HLG' },
      { label: 'Audio', value: '40W 2.1, Dolby Atmos' },
      { label: 'Ports', value: '4 × HDMI, 2 × USB, eARC' },
    ],
    variants: [
      variant(
        'lumen-55-qled-std',
        '55" · Wall + stand mount',
        [{ name: 'Size', value: '55 inch' }],
        44999,
        54999,
      ),
      variant(
        'lumen-65-qled-std',
        '65" · Wall + stand mount',
        [{ name: 'Size', value: '65 inch' }],
        61999,
        74999,
      ),
    ],
  },
  {
    id: 'optica-m20',
    name: 'Optica M20 Mirrorless',
    brand: 'Optica',
    category: 'cameras',
    tagline: '26MP APS-C · 4K60 · in-body stabilisation',
    description:
      'A compact APS-C mirrorless camera with 5-axis IBIS, reliable subject-detection autofocus and 4K60 10-bit video. Kitted with a versatile 18–55mm lens.',
    rating: 4.7,
    ratingCount: 540,
    highlights: [
      '26MP BSI APS-C sensor',
      '5-axis IBIS, up to 6.5 stops',
      'Subject-detect AF (people, animals, vehicles)',
      '4K60 10-bit internal',
    ],
    specs: [
      { label: 'Sensor', value: '26.1MP APS-C BSI CMOS' },
      { label: 'Stabilisation', value: '5-axis in-body, 6.5 stops' },
      { label: 'Video', value: '4K60 10-bit 4:2:2 internal' },
      { label: 'Burst', value: '20 fps electronic / 8 fps mechanical' },
      { label: 'Weight', value: '461 g (body only)' },
    ],
    variants: [
      variant(
        'optica-m20-body',
        'Body only',
        [{ name: 'Kit', value: 'Body only' }],
        89990,
        99990,
      ),
      variant(
        'optica-m20-kit-1855',
        'With 18–55mm lens',
        [{ name: 'Kit', value: '18–55mm kit' }],
        104990,
        117990,
      ),
    ],
  },
];

/**
 * Real product photography, keyed by record id (Unsplash CDN).
 *
 * Kept out of the record literals so the whole image set is swappable in
 * one place. Anything missing here — or any URL that fails to load —
 * falls back to a generated gradient tile (`recordFallbackImages`), so
 * the catalogue still renders offline.
 */
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

const REMOTE_IMAGES: Record<string, string[]> = {
  'aurora-x5-pro': ['1511707171634-5f897ff02aa9', '1592286927505-1def25a5df1d'].map(UNSPLASH),
  'nova-lite-5g': ['1598327105666-5b89351aff97', '1533228100845-08145b01de14'].map(UNSPLASH),
  'vertex-book-14': ['1517336714731-489689fd1ca8', '1496181133206-80ce9b88a853'].map(UNSPLASH),
  'vertex-book-pro-16': ['1541807084-5c52b6b3adef', '1593642702821-c8da6771f0c6'].map(UNSPLASH),
  'pulse-buds-3': ['1590658268037-6bf12165a8df', '1606220945770-b5b6c2c55bf1'].map(UNSPLASH),
  'pulse-studio-over-ear': ['1505740420928-5e560c06d30e', '1583394838336-acd977736f90'].map(UNSPLASH),
  'chrono-watch-s2': ['1579586337278-3befd40fd17a', '1508685096489-7aacd43bd3b1'].map(UNSPLASH),
  'lumen-55-qled': ['1593359677879-a4bb92f829d1', '1461151304267-38535e780c79'].map(UNSPLASH),
  'optica-m20': ['1516035069371-29a1b244cc32', '1502920917128-1aa500764cbd'].map(UNSPLASH),
};

/** Generated gradient tiles — the offline / load-failure fallback. */
export function recordFallbackImages(record: ProductRecord): string[] {
  const glyph = glyphFor[record.category];
  const seeds = [record.id, `${record.id}-a`, `${record.id}-b`];
  return seeds.map((seed) => productImage(seed, glyph));
}

/** Hero + gallery imagery for a record: real photos where we have them. */
export function recordImages(record: ProductRecord): string[] {
  return REMOTE_IMAGES[record.id] ?? recordFallbackImages(record);
}
