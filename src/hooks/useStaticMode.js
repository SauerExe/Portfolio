// Mirrors the original `Ia`/`g2` helpers: disable scroll-linked animation
// when the user prefers reduced motion, or when ?static is present in the URL
// (handy for screenshots / crawlers).
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isStaticMode() {
  return (
    prefersReducedMotion() ||
    new URLSearchParams(window.location.search).has("static")
  );
}
