import { Chip } from '@/components/Chip/Chip';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import type { ProductCategory } from '../types';
import styles from './CategoryFilter.module.css';

type CategoryFilterProps = {
  categories: ProductCategory[] | undefined;
  isLoading: boolean;
  value: ProductCategory['id'];
  onChange: (id: ProductCategory['id']) => void;
};

export function CategoryFilter({
  categories,
  isLoading,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className={styles.scroller}>
      <div className={styles.row} role="tablist" aria-label="Product categories">
        {isLoading || !categories
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} width={72} height={34} radius={999} />
            ))
          : categories.map((category) => (
              <Chip
                key={category.id}
                selected={category.id === value}
                onClick={() => onChange(category.id)}
              >
                {category.label}
              </Chip>
            ))}
      </div>
    </div>
  );
}
