import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { profile } from "../data/content.js";
import { isStaticMode } from "../hooks/useStaticMode.js";

gsap.registerPlugin(ScrollTrigger);

// Claim, das beim Scrollen über dem Hero aufsteigt.
// Wort für Wort maskiert; "Betrieb" bekommt die Akzentfarbe.
const CLAIM_WORDS = [
  ["Software,", false],
  ["die", false],
  ["im", false],
  ["Betrieb", true],
  ["läuft.", false],
  ["Nicht", false],
  ["nur", false],
  ["in", false],
  ["der", false],
  ["Demo.", false],
];

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced =
      document.documentElement.dataset.motion === "reduced" ||
      isStaticMode();
    section.classList.toggle("is-static", reduced);

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".hero-rise",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.1 },
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power2.out", stagger: 0.08, delay: 0.6 },
      );

      // Scroll-Pin: Hero bleibt stehen, Inhalt blendet aus,
      // das Claim steigt Wort für Wort auf und scrollt dann mit raus.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=85%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      // y: 0 überschreibt den CSS-Startzustand (translateY 115%),
      // sonst bliebe er als Basis-Offset unter dem yPercent-Tween stehen.
      tl.to(".hero-scroll-cue", { opacity: 0, duration: 0.08, ease: "none" }, 0)
        .to(
          ".hero-inner",
          { yPercent: -10, opacity: 0, duration: 0.3, ease: "power1.in" },
          0,
        )
        .fromTo(
          ".hero-claim .sw",
          { y: 0, yPercent: 115 },
          { yPercent: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" },
          0.22,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero" aria-label="Intro">
      <div className="hero-meta mono">
        <span>Portfolio / Entwicklung &amp; Betrieb</span>
        <span>Gelsenkirchen, DE <span aria-hidden="true">↗</span></span>
      </div>
      <div className="hero-inner">
        {/* Left: giant name. aria-label, weil die zwei Masken-Spans ohne
            Leerzeichen aneinanderliegen — sonst liest ein Screenreader
            "TimoWeiß" als ein Wort. */}
        <h1 className="hero-name" aria-label="Timo Weiß">
          <span className="hero-mask" aria-hidden="true">
            <span className="hero-rise">Timo</span>
          </span>
          <span className="hero-mask" aria-hidden="true">
            <span className="hero-rise hero-name-last">Weiß</span>
          </span>
        </h1>

        {/* Vertical rule */}
        <div className="hero-rule" aria-hidden="true" />

        {/* Right: content */}
        <div className="hero-content hero-fade">
          <div className="hero-eyebrow">
            <span className="hero-role">Full-Stack Developer</span>
            <span className="hero-org">CTO · SimpleAct</span>
          </div>

          <p className="hero-intro">
            Software, die im <span>Betrieb läuft.</span>
          </p>
          <p className="hero-description">
            Von der ersten Oberfläche bis zum eigenen Server.
          </p>

          <nav className="hero-links" aria-label="Sprungnavigation">
            <a className="hero-primary" href="#projekte">Projekte ansehen <span aria-hidden="true">↗</span></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={`mailto:${profile.email}`}>Kontakt</a>
          </nav>

          {/* Der Claim aus dem Scroll-Overlay, einmal als echter Text —
              das Overlay selbst ist reine Deko (aria-hidden) und bei
              reduzierter Motion komplett ausgeblendet. */}
          <p className="visually-hidden">
            Software, die im Betrieb läuft. Nicht nur in der Demo.
          </p>
        </div>
      </div>

      <div className="hero-baseline mono" aria-hidden="true">
        <span><i>01</i> Interface</span>
        <span><i>02</i> Backend</span>
        <span><i>03</i> Infrastruktur</span>
        <span className="hero-baseline-note">Idee → Umsetzung → Betrieb</span>
      </div>

      <div className="hero-claim-wrap" aria-hidden="true">
        <p className="hero-claim">
          {CLAIM_WORDS.map(([word, accent], i) => (
            <span key={i}>
              <span className="sw-mask">
                <span className={accent ? "sw accent-word" : "sw"}>{word}</span>
              </span>
              {i < CLAIM_WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>

      <p className="hero-scroll-cue mono" aria-hidden="true">Weiter entdecken ↓</p>
    </section>
  );
}
