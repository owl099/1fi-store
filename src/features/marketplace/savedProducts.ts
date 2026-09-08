import { useCallback, useSyncExternalStore } from 'react';

import { createPersistentIdList } from '@/lib/persistentIdList';

/**
 * Client-side, per-browser product lists:
 *  - `wishlist`  — items the shopper explicitly saved (heart toggle)
 *  - `recent`    — the last few products opened, newest first
 *
 * Both persist to localStorage and sync across tabs. Components read
 * them through `useSyncExternalStore`, so a heart toggled on a card
 * updates the detail page, the toolbar count and any other card at once.
 */

const RECENT_LIMIT = 10;

const wishlistStore = createPersistentIdList('onefi.wishlist.v1');
const recentStore = createPersistentIdList('onefi.recentlyViewed.v1', {
  max: RECENT_LIMIT,
  prepend: true,
});

export function useWishlist() {
  const ids = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getSnapshot,
  );

  return {
    ids,
    count: ids.length,
    has: useCallback((id: string) => ids.includes(id), [ids]),
    toggle: wishlistStore.toggle,
    remove: wishlistStore.remove,
  };
}

export function useRecentlyViewed() {
  const ids = useSyncExternalStore(
    recentStore.subscribe,
    recentStore.getSnapshot,
    recentStore.getSnapshot,
  );

  return { ids, record: recentStore.add, clear: recentStore.clear };
}
