import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { isStaticMode } from "../hooks/useStaticMode.js";

// Splits a heading into per-word spans and animates them in on scroll
// (`ir` in the original bundle).
export default function SplitHeading({ text, as: Tag = "h2", className, dot }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isStaticMode()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".sw"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.055,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="sw-mask">
            <span className="sw">
              {word}
              {dot && i === words.length - 1 && <span className="accent">.</span>}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
