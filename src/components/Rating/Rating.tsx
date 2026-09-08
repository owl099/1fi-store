import { StarIcon } from '@/components/icons';
import styles from './Rating.module.css';

type RatingProps = {
  value: number;
  count?: number;
  size?: number;
};

/** Compact rating pill: ★ 4.5 (1,240). */
export function Rating({ value, count, size = 13 }: RatingProps) {
  return (
    <span className={styles.rating}>
      <StarIcon size={size} className={styles.star} />
      <span className={styles.value}>{value.toFixed(1)}</span>
      {count != null && (
        <span className={styles.count}>
          ({new Intl.NumberFormat('en-IN').format(count)})
        </span>
      )}
    </span>
  );
}
