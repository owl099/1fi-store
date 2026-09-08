import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchField } from '@/components/SearchField/SearchField';
import { ErrorState, EmptyState } from '@/components/StateView/StateView';
import { HeartIcon } from '@/components/icons';
import { useDebouncedValue } from '@/lib/hooks';
import { CategoryFilter } from './components/CategoryFilter';
import { MarketplaceHero } from './components/MarketplaceHero';
import { ProductGrid, ProductGridSkeleton } from './components/ProductGrid';
import { RecentlyViewedRow } from './components/RecentlyViewedRow';
import { useCategories, useProducts } from './queries';
import { useWishlist } from './savedProducts';
import type { ProductCategory } from './types';
import styles from './MarketplacePage.module.css';

/**
 * 1Fi Marketplace — product listing.
 *
 * Category, search and the "saved" view all live in the URL so the list
 * is shareable and restores when the user returns from a product page.
 * Data comes from React Query hooks; this component only maps query
 * state to a view.
 */
export function MarketplacePage() {
  const [params, setParams] = useSearchParams();
  const category = (params.get('cat') ?? 'all') as ProductCategory['id'];
  const savedView = params.get('view') === 'saved';

  const [searchInput, setSearchInput] = useState(params.get('q') ?? '');
  const search = useDebouncedValue(searchInput.trim(), 300);

  const categoriesQuery = useCategories();
  const productsQuery = useProducts(
    useMemo(() => ({ category, search }), [category, search]),
  );
  const wishlist = useWishlist();

  const patchParams = (mutate: (next: URLSearchParams) => void) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        mutate(next);
        return next;
      },
      { replace: true },
    );
  };

  const setCategory = (id: ProductCategory['id']) =>
    patchParams((p) => (id === 'all' ? p.delete('cat') : p.set('cat', id)));

  const toggleSavedView = () =>
    patchParams((p) => (savedView ? p.delete('view') : p.set('view', 'saved')));

  const onSearchChange = (value: string) => {
    setSearchInput(value);
    patchParams((p) =>
      value.trim() ? p.set('q', value.trim()) : p.delete('q'),
    );
  };

  const allProducts = productsQuery.data ?? [];
  const products = savedView
    ? allProducts.filter((p) => wishlist.has(p.id))
    : allProducts;

  const isIdle = !savedView && category === 'all' && !search;
  const showSavedToggle = wishlist.count > 0 || savedView;

  return (
    <div className={styles.page}>
      <MarketplaceHero />

      <div className={`container ${styles.body}`}>
        {isIdle && <RecentlyViewedRow />}

        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <div className={styles.categoryWrap}>
              <CategoryFilter
                categories={categoriesQuery.data}
                isLoading={categoriesQuery.isPending}
                value={category}
                onChange={setCategory}
              />
            </div>
            {showSavedToggle && (
              <button
                type="button"
                className={
                  savedView
                    ? `${styles.savedToggle} ${styles.savedToggleOn}`
                    : styles.savedToggle
                }
                aria-pressed={savedView}
                onClick={toggleSavedView}
              >
                <HeartIcon size={15} filled={savedView} />
                Saved
                <span className={styles.savedCount}>{wishlist.count}</span>
              </button>
            )}
          </div>
          <div className={styles.search}>
            <SearchField
              label="Search the marketplace"
              placeholder="Search phones, laptops, audio…"
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.results}>
          {productsQuery.isPending ? (
            <ProductGridSkeleton />
          ) : productsQuery.isError ? (
            <ErrorState
              message="We couldn’t load the marketplace right now."
              onRetry={() => productsQuery.refetch()}
            />
          ) : products.length === 0 ? (
            <EmptyState
              title={savedView ? 'No saved products here' : 'No matching products'}
              message={
                savedView
                  ? wishlist.count === 0
                    ? 'Tap the heart on any product to save it for later.'
                    : 'None of your saved products match this category or search.'
                  : search
                    ? `Nothing matched “${search}”. Try a different search.`
                    : 'There are no products in this category yet.'
              }
            />
          ) : (
            <>
              <p className={styles.count}>
                {products.length}{' '}
                {savedView
                  ? 'saved'
                  : products.length === 1
                    ? 'product'
                    : 'products'}
              </p>
              <ProductGrid products={products} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
