/**
 * Deterministic placeholder imagery.
 *
 * The reference build ships without a real asset pipeline, so product
 * images are generated as inline SVG data URIs. They are deterministic
 * (same seed → same artwork), fully offline, and share one visual
 * language so the catalogue looks curated rather than stock.
 */

type CategoryGlyph =
  | 'mobiles'
  | 'laptops'
  | 'audio'
  | 'wearables'
  | 'tv'
  | 'cameras';

// Violets / lavenders / warm neutrals — on-brand with the 1Fi palette.
const PALETTES: [string, string][] = [
  ['#F1EBFE', '#C9B4F5'],
  ['#EEE9FD', '#C0AEF0'],
  ['#F3EEFB', '#D3C2EE'],
  ['#F4F1FA', '#DCD3EB'],
  ['#F6F0F8', '#E6CDE8'],
  ['#EDE9FA', '#C2B4EC'],
];

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const GLYPHS: Record<CategoryGlyph, string> = {
  mobiles:
    '<rect x="150" y="96" width="100" height="168" rx="18" fill="#fff" opacity="0.9"/><rect x="164" y="118" width="72" height="118" rx="8" fill="currentColor" opacity="0.25"/>',
  laptops:
    '<rect x="126" y="112" width="148" height="96" rx="10" fill="#fff" opacity="0.9"/><rect x="140" y="126" width="120" height="68" rx="5" fill="currentColor" opacity="0.25"/><path d="M112 214h176l-14 20H126z" fill="#fff" opacity="0.9"/>',
  audio:
    '<path d="M136 196v-8a64 64 0 0 1 128 0v8" stroke="#fff" stroke-width="14" fill="none" opacity="0.9"/><rect x="122" y="188" width="34" height="60" rx="14" fill="#fff" opacity="0.9"/><rect x="244" y="188" width="34" height="60" rx="14" fill="#fff" opacity="0.9"/>',
  wearables:
    '<rect x="158" y="120" width="84" height="120" rx="26" fill="#fff" opacity="0.9"/><rect x="172" y="140" width="56" height="80" rx="14" fill="currentColor" opacity="0.25"/><rect x="182" y="86" width="36" height="34" rx="8" fill="#fff" opacity="0.7"/><rect x="182" y="240" width="36" height="34" rx="8" fill="#fff" opacity="0.7"/>',
  tv: '<rect x="110" y="104" width="180" height="116" rx="10" fill="#fff" opacity="0.9"/><rect x="124" y="118" width="152" height="88" rx="5" fill="currentColor" opacity="0.25"/><rect x="176" y="228" width="48" height="12" rx="6" fill="#fff" opacity="0.8"/>',
  cameras:
    '<rect x="120" y="132" width="160" height="112" rx="16" fill="#fff" opacity="0.9"/><circle cx="200" cy="188" r="34" fill="currentColor" opacity="0.25"/><rect x="150" y="116" width="44" height="20" rx="6" fill="#fff" opacity="0.9"/>',
};

export function productImage(seed: string, glyph: CategoryGlyph): string {
  const [bg, accent] = PALETTES[hash(seed) % PALETTES.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="360" viewBox="0 0 400 360" role="img">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}"/>
        <stop offset="1" stop-color="${accent}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="360" fill="url(#g)"/>
    <g color="${accent}" transform="translate(0 8)">${GLYPHS[glyph]}</g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
