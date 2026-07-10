import { useEffect, useRef } from "react";
import { marqueeItems } from "../data/content.js";

export default function Marquee() {
  const ref = useRef(null);

  // Band nur animieren, wenn es im Viewport ist. Sonst läuft der
  // riesige Composite-Layer bei jedem Frame auf der ganzen Seite mit.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle("is-running", entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const track = marqueeItems.map((item) => (
    <span key={item} className="marquee-item">
      {item}
      <span className="marquee-sep" aria-hidden="true">
        ✦
      </span>
    </span>
  ));

  return (
    <section ref={ref} className="marquee" aria-label={marqueeItems.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-group">{track}</div>
        <div className="marquee-group">{track}</div>
      </div>
    </section>
  );
}
