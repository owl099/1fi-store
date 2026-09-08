import { HeartIcon } from '@/components/icons';
import { useWishlist } from '../savedProducts';
import styles from './WishlistButton.module.css';

type WishlistButtonProps = {
  productId: string;
  /** Accessible name context, e.g. the product name. */
  productName: string;
  size?: 'sm' | 'md';
  /** `overlay` sits on top of product imagery; `inline` sits in a row. */
  variant?: 'overlay' | 'inline';
};

/**
 * Heart toggle for saving a product. Safe to place inside a link/card —
 * it stops the click from bubbling to the surrounding navigation.
 */
export function WishlistButton({
  productId,
  productName,
  size = 'md',
  variant = 'overlay',
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  return (
    <button
      type="button"
      className={[styles.button, styles[size], styles[variant]]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${productName} from saved` : `Save ${productName}`
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(productId);
      }}
    >
      <HeartIcon
        size={size === 'sm' ? 16 : 18}
        filled={saved}
        className={saved ? styles.heartOn : styles.heart}
      />
      {variant === 'inline' && (
        <span>{saved ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
}
