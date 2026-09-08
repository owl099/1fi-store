import type { EmiPlan } from '@/lib/emi';

export type { EmiPlan } from '@/lib/emi';

/** One purchasable configuration of a product (storage + colour, etc.). */
export type ProductVariant = {
  id: string;
  /** Human label, e.g. "256 GB · Titanium Blue". */
  label: string;
  /** Structured attributes so the UI can group selectors by axis. */
  attributes: { name: string; value: string }[];
  price: number;
  mrp: number;
  inStock: boolean;
  /** Overrides the product hero image when this variant is selected. */
  image?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductSummary = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategoryId;
  tagline: string;
  /** Hero image (real photo where available). */
  image: string;
  /** Generated gradient tile used if `image` fails to load / is offline. */
  imageFallback: string;
  rating: number;
  ratingCount: number;
  /** Price of the cheapest in-stock variant, for listing cards. */
  startingPrice: number;
  startingMrp: number;
  /** Lowest available monthly instalment across EMI plans, if any. */
  fromEmiPerMonth: number;
};

export type Product = ProductSummary & {
  images: string[];
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  variants: ProductVariant[];
};

export type ProductCategoryId =
  | 'mobiles'
  | 'laptops'
  | 'audio'
  | 'wearables'
  | 'tv'
  | 'cameras';

export type ProductCategory = {
  id: ProductCategoryId | 'all';
  label: string;
};

/** Response shape from the mock EMI endpoint. */
export type EmiQuote = {
  productId: string;
  variantId: string;
  principal: number;
  currency: 'INR';
  plans: EmiPlan[];
};

/** What the user carries from product detail into checkout. */
export type MarketplaceSelection = {
  product: Product;
  variant: ProductVariant;
  plan: EmiPlan;
};
