import { useMemo } from 'react';

import { formatINR } from '@/lib/money';
import type { ProductVariant } from '../types';
import styles from './VariantSelector.module.css';

type VariantSelectorProps = {
  variants: ProductVariant[];
  selected: ProductVariant;
  onSelect: (variantId: string) => void;
};

type Axis = { name: string; values: string[] };

/** Ordered, de-duplicated attribute axes across all variants. */
function deriveAxes(variants: ProductVariant[]): Axis[] {
  const axes: Axis[] = [];
  for (const variant of variants) {
    for (const attr of variant.attributes) {
      let axis = axes.find((a) => a.name === attr.name);
      if (!axis) {
        axis = { name: attr.name, values: [] };
        axes.push(axis);
      }
      if (!axis.values.includes(attr.value)) axis.values.push(attr.value);
    }
  }
  return axes;
}

function attrValue(variant: ProductVariant, name: string): string | undefined {
  return variant.attributes.find((a) => a.name === name)?.value;
}

export function VariantSelector({
  variants,
  selected,
  onSelect,
}: VariantSelectorProps) {
  const axes = useMemo(() => deriveAxes(variants), [variants]);

  /**
   * Resolve the best variant when the user changes one axis: prefer an
   * exact match on every other currently-selected axis, then fall back to
   * any (in-stock first) variant carrying the new value.
   */
  const handlePick = (axisName: string, value: string) => {
    const desired = new Map<string, string>(
      selected.attributes.map((a) => [a.name, a.value]),
    );
    desired.set(axisName, value);

    const exact = variants.find((v) =>
      [...desired].every(([name, val]) => attrValue(v, name) === val),
    );
    if (exact) {
      onSelect(exact.id);
      return;
    }

    const candidates = variants.filter(
      (v) => attrValue(v, axisName) === value,
    );
    const best =
      candidates.find((v) => v.inStock) ?? candidates[0] ?? selected;
    onSelect(best.id);
  };

  return (
    <div className={styles.selector}>
      {axes.map((axis) => {
        const current = attrValue(selected, axis.name);
        return (
          <fieldset key={axis.name} className={styles.axis}>
            <legend className={styles.legend}>
              {axis.name}
              {current && <span className={styles.current}>{current}</span>}
            </legend>
            <div className={styles.options}>
              {axis.values.map((value) => {
                const isSelected = value === current;
                const anyInStock = variants.some(
                  (v) => attrValue(v, axis.name) === value && v.inStock,
                );
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handlePick(axis.name, value)}
                    className={[
                      styles.option,
                      isSelected ? styles.selected : '',
                      !anyInStock ? styles.soldOut : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      <p className={styles.priceLine}>
        <span className={styles.price}>{formatINR(selected.price)}</span>
        {selected.mrp > selected.price && (
          <span className={styles.mrp}>{formatINR(selected.mrp)}</span>
        )}
        {!selected.inStock && (
          <span className={styles.oos}>Currently out of stock</span>
        )}
      </p>
    </div>
  );
}
