import { browser } from '$app/environment';

export function persistate<T>(key: string, initialState: T): T {
  // Load state from localStorage
  const savedState = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  const state = $state<T>(savedState ? JSON.parse(savedState) : initialState);

  // Create a root effect to manage the lifecycle
  $effect.root(() => {
    $effect(() => {
      if (browser) {
        localStorage.setItem(key, JSON.stringify(state));
      }
    });
  });

  return state;
}
