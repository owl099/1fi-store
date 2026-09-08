import type { CSSProperties } from 'react';

import styles from './Skeleton.module.css';

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
};

/** Single shimmering placeholder block. */
export function Skeleton({ width, height, radius, className }: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
    borderRadius: radius,
  };
  return (
    <span
      className={className ? `${styles.skeleton} ${className}` : styles.skeleton}
      style={style}
      aria-hidden="true"
    />
  );
}

/** Multi-line text placeholder; the last line is shortened. */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <span className={styles.textBlock} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className={styles.skeleton}
          style={{
            height: 12,
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </span>
  );
}
