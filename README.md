# 1Fi Marketplace — Shop section

A responsive **React + Vite** implementation of the **1Fi Marketplace** section inside the **Shop** experience.

> **Context.** The brief is to build the Marketplace *within the existing 1Fi app*. As the 1Fi source isn't available, this repo stands up the surrounding shell (header + nav, Shop page, footer) and implements the Marketplace flow end-to-end against a mock API, in 1Fi's visual language (violet primary, lavender ground, Plus Jakarta Sans headings, violet→fuchsia gradient accents).

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires Node 18+. Also: `npm run build` (typecheck + build), `npm run preview`, `npm run typecheck`.

## What's built

**Shop page** (`/shop`) — route-linked tabs for the three sections. *Top Brands* and *Nearby Stores* are "coming soon" placeholders (out of scope per the brief); **1Fi Marketplace is fully implemented**. Each is a deep-linkable nested route.

**Listing** (`/shop/marketplace`) — fluid product grid; photo (with fallback), brand, name, rating, price with struck MRP, discount badge, lowest "From ₹x/mo EMI"; category chips + debounced search; per-browser wishlist with a "Saved" view (`?view=saved`); recently-viewed rail; category/query/view kept in the URL so the list is shareable and restores on back; skeleton, error-with-retry and empty states.

**Product detail** (`/product/:id`) — sticky image gallery beside the buy column; variant selection grouped by attribute axis, updating price + EMI; EMI plans (3–24 months, No-Cost option, one recommended) computed for the selected variant's price; highlights, description, specs table; purchase panel with live instalment summary, becoming a fixed bottom bar on mobile.

**Review & confirm** (`/product/:id/checkout`) — rebuilds the selection from the URL (`?variant=…&plan=…`); item / plan / repayment schedule beside a sticky order summary; consent checkbox gates a mock order mutation with loading + error states.

**Confirmation** (`/product/:id/confirmation`) — order reference and summary, with a graceful fallback when opened without navigation state.

## Architecture

- **`src/app/`** — AppShell, router, error boundary, placeholders
- **`src/components/`** — hand-built design-system primitives (no UI kit)
- **`src/features/{shop,marketplace}/`** — screens, components, React Query hooks, URL-as-state helpers, wishlist/recently-viewed store, order mutation
- **`src/services/{api,mock}/`** — mock endpoints + a transport that simulates latency and failures; the catalogue "database" and EMI config
- **`src/lib/`** — money/date formatting, EMI maths, query client + keys, `persistentIdList` (localStorage-backed ordered set)
- **`src/styles/`** — design tokens (light + dark) + reset

Key decisions: no component reads hard-coded data — everything goes through `services/api/*`, so a real backend is a one-file swap. EMI is derived from the variant price via a reducing-balance formula, not stored. Server state is React Query; selection state lives in the URL. Wishlist / recently-viewed are an external `localStorage` store surfaced via `useSyncExternalStore` (syncs across cards, pages and tabs). Images fall back to a deterministic gradient tile. Theme toggle persists and defaults to the OS preference, set before first paint.

## Trying the edge states

- **Not found:** `/shop/marketplace/product/does-not-exist`
- **Empty search:** search for something with no matches
- **Forced API failures** — in the browser console:
  ```js
  __configureMockApi({ errorRate: 1 })              // every request fails
  __configureMockApi({ errorRate: 0 })              // back to normal
  __configureMockApi({ latencyMs: [1500, 2500] })   // slow network
  ```

## Tech

React 18 · TypeScript · Vite 5 · React Router 6 · TanStack Query 5 · CSS Modules over a design-token layer. Inter for body, Plus Jakarta Sans for headings.
