import { useMemo } from 'react';

import { TrashIcon } from '@/components/icons';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { useProductsByIds } from '../queries';
import { useRecentlyViewed } from '../savedProducts';
import { ProductCard } from './ProductCard';
import styles from './RecentlyViewedRow.module.css';

/**
 * Horizontal "pick up where you left off" rail. Renders nothing until
 * the shopper has opened at least two products; `excludeId` drops the
 * product currently on screen (so it can be reused on the detail page).
 */
export function RecentlyViewedRow({ excludeId }: { excludeId?: string }) {
  const { ids, clear } = useRecentlyViewed();

  const shownIds = useMemo(
    () => ids.filter((id) => id !== excludeId),
    [ids, excludeId],
  );

  const query = useProductsByIds(shownIds);

  if (shownIds.length < 2) return null;

  return (
    <section className={styles.wrap} aria-label="Recently viewed">
      <div className={styles.head}>
        <h2 className={styles.title}>Recently viewed</h2>
        <button type="button" className={styles.clear} onClick={clear}>
          <TrashIcon size={14} />
          Clear
        </button>
      </div>

      <div className={styles.rail}>
        {query.isPending || !query.data
          ? shownIds.slice(0, 6).map((id) => (
              <Skeleton key={id} width={168} height={214} radius={16} />
            ))
          : query.data.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
      </div>
    </section>
  );
}
