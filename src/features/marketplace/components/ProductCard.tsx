import { Link } from 'react-router-dom';

import { Badge } from '@/components/Badge/Badge';
import { ProductImage } from '@/components/ProductImage/ProductImage';
import { Rating } from '@/components/Rating/Rating';
import { discountPercent, formatINR } from '@/lib/money';
import type { ProductSummary } from '../types';
import { WishlistButton } from './WishlistButton';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: ProductSummary;
  /** Trimmed variant for the "recently viewed" rail. */
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const off = discountPercent(product.startingMrp, product.startingPrice);

  return (
    <Link
      to={`/shop/marketplace/product/${product.id}`}
      className={compact ? `${styles.card} ${styles.compact}` : styles.card}
      aria-label={`${product.brand} ${product.name}`}
    >
      <div className={styles.media}>
        <ProductImage
          src={product.image}
          fallbackSrc={product.imageFallback}
          alt=""
          ratio={1}
        />
        {off > 0 && (
          <span className={styles.discount}>
            <Badge tone="success" size="sm">
              {off}% off
            </Badge>
          </span>
        )}
        <span className={styles.save}>
          <WishlistButton
            productId={product.id}
            productName={product.name}
            size={compact ? 'sm' : 'md'}
          />
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>
        {!compact && (
          <Rating value={product.rating} count={product.ratingCount} />
        )}

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatINR(product.startingPrice)}</span>
          {off > 0 && (
            <span className={styles.mrp}>{formatINR(product.startingMrp)}</span>
          )}
        </div>

        {!compact && product.fromEmiPerMonth > 0 && (
          <p className={styles.emi}>
            From <strong>{formatINR(product.fromEmiPerMonth)}/mo</strong> EMI
          </p>
        )}
      </div>
    </Link>
  );
}
