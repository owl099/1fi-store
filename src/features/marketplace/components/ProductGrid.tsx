import { Skeleton } from '@/components/Skeleton/Skeleton';
import type { ProductSummary } from '../types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton height={180} radius={12} />
          <Skeleton height={11} width="45%" />
          <Skeleton height={13} width="85%" />
          <Skeleton height={13} width="60%" />
          <Skeleton height={15} width="50%" />
        </div>
      ))}
    </div>
  );
}
