import type { InputHTMLAttributes } from 'react';

import { SearchIcon } from '@/components/icons';
import styles from './SearchField.module.css';

type SearchFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
> & {
  label: string;
};

export function SearchField({ label, id, ...rest }: SearchFieldProps) {
  const inputId = id ?? 'search-field';
  return (
    <div className={styles.wrap}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <SearchIcon size={18} className={styles.icon} />
      <input
        id={inputId}
        type="search"
        className={styles.input}
        autoComplete="off"
        {...rest}
      />
    </div>
  );
}
