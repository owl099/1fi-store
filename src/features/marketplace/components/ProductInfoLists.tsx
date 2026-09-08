import { CheckIcon } from '@/components/icons';
import type { ProductSpec } from '../types';
import styles from './ProductInfoLists.module.css';

export function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className={styles.highlights}>
      {items.map((item) => (
        <li key={item}>
          <CheckIcon size={16} className={styles.tick} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SpecList({ specs }: { specs: ProductSpec[] }) {
  return (
    <dl className={styles.specs}>
      {specs.map((spec) => (
        <div key={spec.label} className={styles.specRow}>
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
