import { useCallback, useEffect, useState } from 'react';

/**
 * Light / dark theme.
 *
 * The resolved theme is written to `document.documentElement[data-theme]`.
 * A tiny inline script in `index.html` applies the stored (or system)
 * value before first paint to avoid a flash; this hook keeps React in
 * sync, persists explicit choices, and follows the OS until the user
 * makes one.
 */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'onefi-theme';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function resolveInitialTheme(): Theme {
  return getStoredTheme() ?? systemTheme();
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const attr = document.documentElement.dataset.theme;
    return attr === 'light' || attr === 'dark' ? attr : resolveInitialTheme();
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow the OS while the user hasn't made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) setThemeState(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const persist = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode / storage disabled — non-fatal */
    }
  }, []);

  const toggle = useCallback(
    () => persist(theme === 'dark' ? 'light' : 'dark'),
    [persist, theme],
  );

  return { theme, setTheme: persist, toggle };
}
