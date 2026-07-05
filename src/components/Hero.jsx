import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { profile, heroStatement } from "../data/content.js";
import { useMagneticHover } from "../hooks/useMagneticHover.js";
import { isStaticMode } from "../hooks/useStaticMode.js";

export default function Hero() {
  const sectionRef = useRef(null);
  const projectsCta = useMagneticHover();
  const aboutCta = useMagneticHover();
  const staticMode = isStaticMode();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isStaticMode()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-rise",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.15, ease: "power4.out", stagger: 0.09, delay: 0.1 },
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1, delay: 0.65 },
      );
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=140%",
            scrub: 0.5,
            pin: true,
          },
        })
        .to(".hero-head", { yPercent: -22, scale: 0.7, opacity: 0.1, ease: "none" }, 0)
        .to(".hero-cue", { opacity: 0, ease: "none" }, 0)
        .fromTo(
          ".hero-statement .hw",
          { yPercent: 130 },
          { yPercent: 0, stagger: 0.06, ease: "power2.out" },
          0.15,
        )
        .to(".hero-statement", { opacity: 1, duration: 0.25, ease: "none" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero${staticMode ? " hero--static" : ""}`}
      data-scene="violet"
      aria-label="Intro"
    >
      <div className="hero-inner">
        <div className="hero-head">
          <p className="hero-status hero-fade mono">
            {profile.location} · {profile.tagline}
          </p>
          <h1 className="hero-name">
            <span className="hero-mask">
              <span className="hero-rise">Timo</span>
            </span>
            <span className="hero-mask">
              <span className="hero-rise hero-name-last">Weiß</span>
            </span>
          </h1>
          <p className="hero-role hero-fade">{profile.role}</p>
          <div className="hero-ctas hero-fade">
            <a ref={projectsCta} className="btn btn--primary" href="#projekte">
              Projekte ansehen
            </a>
            <a ref={aboutCta} className="btn btn--ghost" href="#ueber">
              Wer ich bin
            </a>
          </div>
          <p className="hero-links hero-fade mono">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={`mailto:${profile.email}`}>E-Mail</a>
          </p>
        </div>
        <p className="hero-statement" aria-label={heroStatement}>
          {heroStatement.split(" ").map((word, i) => (
            <span key={i} className="hero-statement-mask" aria-hidden="true">
              <span className={`hw${word.startsWith("Demo") ? " accent" : ""}`}>
                {word}
              </span>
            </span>
          ))}
        </p>
        <p className="hero-cue hero-fade mono" aria-hidden="true">
          scrollen ↓
        </p>
      </div>
    </section>
  );
}
