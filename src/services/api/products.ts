import type {
  Product,
  ProductCategory,
  ProductSummary,
} from '@/features/marketplace/types';
import {
  productRecords,
  recordImages,
  recordFallbackImages,
  type ProductRecord,
} from '@/services/mock/products';
import { ApiError, mockRequest, type MockRequestOptions } from './client';
import { lowestEmiPerMonth } from './emi';

const CATEGORIES: ProductCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'mobiles', label: 'Mobiles' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'audio', label: 'Audio' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'tv', label: 'TV' },
  { id: 'cameras', label: 'Cameras' },
];

/** Pick the record's headline variant: cheapest one still in stock. */
function leadVariant(record: ProductRecord) {
  const pool = record.variants.filter((v) => v.inStock);
  const source = pool.length > 0 ? pool : record.variants;
  return source.reduce((min, v) => (v.price < min.price ? v : min));
}

function toSummary(record: ProductRecord): ProductSummary {
  const lead = leadVariant(record);
  return {
    id: record.id,
    name: record.name,
    brand: record.brand,
    category: record.category,
    tagline: record.tagline,
    image: recordImages(record)[0],
    imageFallback: recordFallbackImages(record)[0],
    rating: record.rating,
    ratingCount: record.ratingCount,
    startingPrice: lead.price,
    startingMrp: lead.mrp,
    fromEmiPerMonth: lowestEmiPerMonth(lead.price),
  };
}

function toProduct(record: ProductRecord): Product {
  return {
    ...toSummary(record),
    images: recordImages(record),
    description: record.description,
    highlights: record.highlights,
    specs: record.specs,
    variants: record.variants,
  };
}

export type ProductQuery = {
  category?: ProductCategory['id'];
  search?: string;
};

/** "GET /products" — filtered listing summaries. */
export async function fetchProducts(
  query: ProductQuery = {},
  options?: MockRequestOptions,
): Promise<ProductSummary[]> {
  return mockRequest(() => {
    const term = query.search?.trim().toLowerCase();
    return productRecords
      .filter((r) =>
        !query.category || query.category === 'all'
          ? true
          : r.category === query.category,
      )
      .filter((r) =>
        !term
          ? true
          : `${r.name} ${r.brand} ${r.tagline}`.toLowerCase().includes(term),
      )
      .map(toSummary);
  }, options);
}

/**
 * "GET /products?ids=a,b,c" — listing summaries for a specific set of
 * ids, returned in the same order they were asked for. Unknown ids are
 * silently skipped. Powers "Recently viewed" and the saved-items view.
 */
export async function fetchProductsByIds(
  ids: string[],
  options?: MockRequestOptions,
): Promise<ProductSummary[]> {
  return mockRequest(() => {
    const rank = new Map(ids.map((id, index) => [id, index]));
    return productRecords
      .filter((record) => rank.has(record.id))
      .map(toSummary)
      .sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
  }, options);
}

/** "GET /products/:id" — full product with variants and specs. */
export async function fetchProductById(
  id: string,
  options?: MockRequestOptions,
): Promise<Product> {
  return mockRequest(() => {
    const record = productRecords.find((r) => r.id === id);
    if (!record) {
      throw new ApiError(`Product "${id}" was not found.`, 404);
    }
    return toProduct(record);
  }, options);
}

/** "GET /categories" — filter chips for the listing screen. */
export async function fetchCategories(
  options?: MockRequestOptions,
): Promise<ProductCategory[]> {
  return mockRequest(() => CATEGORIES, options);
}
