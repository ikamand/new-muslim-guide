/**
 * whisper.rn resolves to its TypeScript sources under Expo's
 * `customConditions: ["react-native"]`, and those sources reference the
 * runtime `global`, which nothing in the app's type roots declares. This is
 * Node's own declaration of it, and React Native provides the same object
 * at runtime.
 */
/* The index signature is for whisper.rn's own `global[...]` accesses, which
   our strict noImplicitAny would otherwise reject in their sources. */
// eslint-disable-next-line no-var
declare var global: typeof globalThis & Record<string, any>;
