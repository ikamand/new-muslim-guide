import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/** Whether we have hydrated changes exactly once, at hydration, so nothing subscribes. */
const subscribe = () => () => {};

/**
 * The device colour scheme, once the client is allowed to know it.
 *
 * Static rendering has no idea what a visitor's scheme is, so the server and
 * the first client render have to agree on something or hydration mismatches.
 *
 * `useSyncExternalStore` is the hydration-aware way to ask: it reads its server
 * snapshot during the first render and its client snapshot afterwards, in one
 * pass. Doing this with `useState` plus an effect — the shape this had — is a
 * render, then a setState, then a second render, on every web page load.
 */
export function useColorScheme() {
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const colorScheme = useRNColorScheme();

  return hasHydrated ? colorScheme : 'light';
}
