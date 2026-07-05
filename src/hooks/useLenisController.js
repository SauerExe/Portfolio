// Small module-level registry so components that don't own the Lenis
// instance (custom scrollbar, project iframe focus) can still read/drive it.
// Mirrors the original `ha`/`Sd`/`D_`/`w_`/`_2`/`v2`/`y2` closures.
let activeLenis = null;
const listeners = new Set();

export function setLenisInstance(instance) {
  activeLenis = instance;
  listeners.forEach((listener) => listener());
}

export function getLenisInstance() {
  return activeLenis;
}

export function onLenisChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function pauseLenis() {
  activeLenis?.stop();
}

export function resumeLenis() {
  activeLenis?.start();
}
