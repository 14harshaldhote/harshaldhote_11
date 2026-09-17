import { useCallback, useEffect, useState } from 'react';

// index.html sets data-theme before first paint; this hook keeps React in sync with it.
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage can be unavailable (private mode); the theme still switches for this visit.
      }
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
