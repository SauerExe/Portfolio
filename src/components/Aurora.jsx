import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { isStaticMode } from "../hooks/useStaticMode.js";

// Colour "scenes" per section: each <section data-scene="..."> triggers a
// crossfade between these gradient-blob layers plus a CSS var accent colour.
// Flat riso-ink washes instead of soft neon-mesh blobs: one directional hard
// band per scene for a printed/registration feel, plus a dark vignette.
const scenes = {
  violet: {
    blobs: [
      "linear-gradient(128deg, transparent 32%, rgba(161, 91, 255, 0.32) 48%, transparent 64%)",
      "radial-gradient(42vw 42vh at 12% 8%, rgba(255, 72, 176, 0.22), transparent 62%)",
      "radial-gradient(70vw 60vh at 50% 108%, rgba(18, 12, 26, 0.92), transparent 70%)",
    ].join(","),
    accent: "#a15bff",
  },
  blue: {
    blobs: [
      "linear-gradient(128deg, transparent 32%, rgba(18, 179, 194, 0.3) 48%, transparent 64%)",
      "radial-gradient(42vw 42vh at 88% 10%, rgba(61, 139, 255, 0.22), transparent 62%)",
      "radial-gradient(70vw 60vh at 55% 110%, rgba(8, 20, 26, 0.92), transparent 70%)",
    ].join(","),
    accent: "#12b3c2",
  },
  green: {
    blobs: [
      "linear-gradient(128deg, transparent 32%, rgba(75, 191, 94, 0.3) 48%, transparent 64%)",
      "radial-gradient(42vw 42vh at 14% 18%, rgba(200, 214, 55, 0.16), transparent 62%)",
      "radial-gradient(70vw 60vh at 45% 110%, rgba(10, 24, 14, 0.92), transparent 70%)",
    ].join(","),
    accent: "#4bbf5e",
  },
  ember: {
    blobs: [
      "linear-gradient(128deg, transparent 32%, rgba(255, 90, 54, 0.32) 48%, transparent 64%)",
      "radial-gradient(42vw 42vh at 82% 14%, rgba(255, 156, 53, 0.2), transparent 62%)",
      "radial-gradient(75vw 65vh at 50% 115%, rgba(26, 12, 8, 0.92), transparent 70%)",
    ].join(","),
    accent: "#ff5a36",
  },
};

export default function Aurora() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const layers = new Map();
    root.querySelectorAll("[data-aurora]").forEach((el) => {
      layers.set(el.dataset.aurora, el);
    });

    const activate = (sceneName, instant = false) => {
      const scene = scenes[sceneName];
      if (!scene) return;
      document.documentElement.style.setProperty("--scene-accent", scene.accent);
      layers.forEach((el, name) => {
        const isActive = name === sceneName;
        if (instant) {
          gsap.set(el, { opacity: isActive ? 1 : 0 });
        } else {
          gsap.to(el, {
            opacity: isActive ? 1 : 0,
            duration: 1.4,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
    };

    activate("violet", true);
    if (isStaticMode()) return;

    const triggers = [];
    document.querySelectorAll("[data-scene]").forEach((section) => {
      const sceneName = section.dataset.scene;
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) activate(sceneName);
          },
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={rootRef} className="aurora" aria-hidden="true">
      {Object.entries(scenes).map(([name, scene]) => (
        <div
          key={name}
          data-aurora={name}
          className="aurora-layer"
          style={{ backgroundImage: scene.blobs }}
        />
      ))}
    </div>
  );
}
