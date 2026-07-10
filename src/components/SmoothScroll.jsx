import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenisInstance } from "../hooks/useLenisController.js";
import { isStaticMode } from "../hooks/useStaticMode.js";

gsap.registerPlugin(ScrollTrigger);

// Bridges Lenis' smooth scroll with GSAP's ScrollTrigger + ticker
// (`S2` in the original bundle). Renders nothing.
export default function SmoothScroll() {
  useEffect(() => {
    if (isStaticMode()) return;

    // lerp statt duration: reagiert direkter aufs Rad, kein "Nachzieh"-Gefühl
    const lenis = new Lenis({ lerp: 0.14, anchors: true });
    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return null;
}
