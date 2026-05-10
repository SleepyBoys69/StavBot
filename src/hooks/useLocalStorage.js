import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * A drop-in replacement for useState that persists the value to localStorage.
 *
 * @param {string} key       - The localStorage key
 * @param {*}      initial   - The initial value if nothing is stored yet
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or private browsing — fail silently
    }
  }, [key, value]);

  return [value, setValue];
}
