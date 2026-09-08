/**
 * A small localStorage-backed ordered set of ids with a React-friendly
 * subscription API (for `useSyncExternalStore`).
 *
 * Used for the wishlist and the "recently viewed" list. It keeps one
 * in-memory copy, persists on every mutation, and stays in sync across
 * tabs via the `storage` event.
 */

type Options = {
  /** Cap the list length. Oldest entries (by list order) are dropped. */
  max?: number;
  /** New ids go to the front (recency lists) instead of the back. */
  prepend?: boolean;
};

export type PersistentIdList = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => readonly string[];
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
};

const EMPTY: readonly string[] = Object.freeze([]);

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === 'string')
      : [];
  } catch {
    return [];
  }
}

export function createPersistentIdList(
  key: string,
  { max = Infinity, prepend = false }: Options = {},
): PersistentIdList {
  let ids: readonly string[] = Object.freeze(readIds(key));
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());

  const commit = (next: string[]) => {
    ids = Object.freeze(next);
    try {
      localStorage.setItem(key, JSON.stringify(ids));
    } catch {
      /* storage unavailable — keep working in-memory */
    }
    emit();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key !== key) return;
      ids = Object.freeze(readIds(key));
      emit();
    });
  }

  const has = (id: string) => ids.includes(id);

  const add = (id: string) => {
    const without = ids.filter((x) => x !== id);
    const next = prepend ? [id, ...without] : [...without, id];
    commit(prepend ? next.slice(0, max) : next.slice(-max));
  };

  const remove = (id: string) => {
    if (!has(id)) return;
    commit(ids.filter((x) => x !== id));
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => ids,
    has,
    add,
    remove,
    toggle: (id) => (has(id) ? remove(id) : add(id)),
    clear: () => commit([]),
  };
}

export { EMPTY as EMPTY_ID_LIST };
