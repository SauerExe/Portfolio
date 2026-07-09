import { useEffect, useState } from "react";

const KEY = "vv-motion-reduced";

function getInitial() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) return stored === "1";
  } catch {}
  return false;
}

export function useMotionPref() {
  const [reduced, setReduced] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (reduced) {
      root.dataset.motion = "reduced";
    } else {
      delete root.dataset.motion;
    }
    try { localStorage.setItem(KEY, reduced ? "1" : "0"); } catch {}
  }, [reduced]);

  return [reduced, setReduced];
}
