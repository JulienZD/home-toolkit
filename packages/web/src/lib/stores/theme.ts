import { browser } from '$app/env';
import { writable } from 'svelte/store';

const themePrefKey = 'theme';

const schema = '(prefers-color-scheme: dark)';

const getInitialValue = () => {
  const storedValue = localStorage.getItem(themePrefKey);

  // If the user already set their theme once, simply return that
  if (storedValue) {
    return storedValue === 'dark';
  }

  // Default to preferred theme
  return window.matchMedia(schema).matches;
};

export const isDark = writable(browser && getInitialValue());

isDark.subscribe((newIsDark) => {
  if (!browser) return;

  localStorage.setItem(themePrefKey, newIsDark ? 'dark' : 'light');
});
