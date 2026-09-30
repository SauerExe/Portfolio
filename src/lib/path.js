// Aktueller Pfad ohne Trailing Slash — im Browser aus location, beim
// Vorrendern (scripts/generate-seo.mjs) aus globalThis.__SSR_PATH__.
export function currentPath() {
  const raw = typeof window === "undefined" ? globalThis.__SSR_PATH__ ?? "/" : window.location.pathname;
  return raw.replace(/\/+$/, "") || "/";
}
