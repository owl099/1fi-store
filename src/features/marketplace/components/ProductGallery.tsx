import { useEffect, useState } from 'react';

import { ProductImage } from '@/components/ProductImage/ProductImage';
import styles from './ProductGallery.module.css';

type ProductGalleryProps = {
  images: string[];
  alt: string;
  /** Shown for any image that fails to load. */
  fallback?: string;
};

/** Main image plus a thumbnail rail. Resets when the image set changes. */
export function ProductGallery({ images, alt, fallback }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const key = images.join('|');

  useEffect(() => {
    setActive(0);
  }, [key]);

  const current = images[Math.min(active, images.length - 1)] ?? images[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <ProductImage
          src={current}
          fallbackSrc={fallback}
          alt={alt}
          ratio={1}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show image ${i + 1}`}
              className={
                i === active ? `${styles.thumb} ${styles.on}` : styles.thumb
              }
              onClick={() => setActive(i)}
            >
              <ProductImage src={src} fallbackSrc={fallback} alt="" ratio={1} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
