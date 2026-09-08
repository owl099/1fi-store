import { useEffect, useState } from 'react';

import styles from './ProductImage.module.css';

type ProductImageProps = {
  src: string;
  alt: string;
  /** Shown if `src` fails to load. Defaults to a neutral placeholder. */
  fallbackSrc?: string;
  /** Aspect ratio as width/height, defaults to 1. */
  ratio?: number;
  className?: string;
};

const NEUTRAL_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#f0f0f5"/><path d="M140 250l50-55 35 38 40-48 55 65z" fill="#d5d5e0"/><circle cx="165" cy="160" r="22" fill="#d5d5e0"/></svg>',
  );

/**
 * Image with a graceful fallback and a fixed aspect box so grids don't
 * reflow while artwork loads. If the primary source errors (offline, dead
 * URL) it swaps to `fallbackSrc`, then to a neutral placeholder.
 */
export function ProductImage({
  src,
  alt,
  fallbackSrc,
  ratio = 1,
  className,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  // Retry the real source when it changes (e.g. variant switch).
  useEffect(() => setFailed(false), [src]);

  return (
    <div
      className={className ? `${styles.frame} ${className}` : styles.frame}
      style={{ aspectRatio: String(ratio) }}
    >
      <img
        src={failed ? (fallbackSrc ?? NEUTRAL_FALLBACK) : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={styles.image}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
