import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { buildPath } from "../data/content.js";
import { isStaticMode } from "../hooks/useStaticMode.js";

gsap.registerPlugin(ScrollTrigger);

// Einzelner Eintrag: blendet von links ein, wenn er links der Linie
// steht, von rechts, wenn er rechts steht. period/body sind direkte
// Kinder (li ist selbst das Grid) statt über einen Wrapper — der
// müsste sonst display:contents sein, worauf Transform/Opacity nicht
// zuverlässig greifen (deshalb hier ein echtes <li> als Animationsziel).
function BuildPathEntry({ entry, isLeft, isNow, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isStaticMode()) {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -14% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`buildpath-reveal ${isLeft ? "buildpath-left" : "buildpath-right"}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <span className="buildpath-period mono">
        {entry.period}
        {isNow && (
          <span className="buildpath-now">
            <span className="buildpath-now-dot" aria-hidden="true" />
            heute
          </span>
        )}
      </span>
      <div className="buildpath-body">
        <h3 className="buildpath-title">{entry.title}</h3>
        <p className="buildpath-text">{entry.text}</p>
      </div>
    </li>
  );
}

export default function BuildPath() {
  const trackRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line || isStaticMode()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 80%",
            end: "bottom 65%",
            scrub: 0.4,
          },
        },
      );
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section id="weg" className="section buildpath" aria-label="Werdegang">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Build-Log</span>
        </Reveal>
        <SplitHeading className="section-title" text="Der Weg bis hier" dot />
        <div className="buildpath-track" ref={trackRef}>
          <div className="buildpath-line" ref={lineRef} aria-hidden="true" />
          <ol className="buildpath-list">
            {buildPath.map((entry, i) => (
              <BuildPathEntry
                key={i}
                entry={entry}
                isLeft={i % 2 === 0}
                isNow={i === buildPath.length - 1}
                delay={i * 80}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
