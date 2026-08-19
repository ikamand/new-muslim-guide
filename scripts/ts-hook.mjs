import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const src = new URL('../src/', import.meta.url);

/**
 * Lets Node resolve what TypeScript allows: extensionless relative imports and
 * the `@/` alias. Only the manifest scripts use this; Metro handles the app.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const path = specifier.slice(2);
    for (const candidate of [`${path}.ts`, `${path}.tsx`, `${path}/index.ts`]) {
      try {
        return await nextResolve(new URL(candidate, src).href, context);
      } catch {
        // Try the next shape.
      }
    }
  }
  if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
    for (const candidate of [`${specifier}.ts`, `${specifier}/index.ts`]) {
      try {
        return await nextResolve(candidate, context);
      } catch {
        // Try the next shape.
      }
    }
  }
  return nextResolve(specifier, context);
}
