import { useEffect, useRef, useState } from "react";

const KEY = "vv-motion-reduced";

// Startet beim Hydrieren mit dem Server-Wert (false) und liest die
// gespeicherte Wahl erst im Effekt — sonst passt das vorgerenderte HTML
// nicht zum ersten Client-Render.
export function useMotionPref() {
  const [reduced, setReduced] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      try {
        if (localStorage.getItem(KEY) === "1") return setReduced(true);
      } catch {}
    }
    const root = document.documentElement;
    if (reduced) root.dataset.motion = "reduced";
    else delete root.dataset.motion;
    try { localStorage.setItem(KEY, reduced ? "1" : "0"); } catch {}
  }, [reduced]);

  return [reduced, setReduced];
}
