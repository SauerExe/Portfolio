import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import DistanceCard from "./DistanceCard.jsx";
import NowPlayingCard from "./NowPlayingCard.jsx";
import StatusCard from "./StatusCard.jsx";
import { profile } from "../data/content.js";
import { useMotionPref } from "../hooks/useMotionPref.js";

function localTime() {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date());
}

export default function Contact() {
  const [reduced, setReduced] = useMotionPref();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(localTime);
  const year = new Date().getFullYear();
  const [mailUser, mailDomain] = profile.email.split("@");

  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="kontakt" className="section contact" aria-label="Kontakt">
      <div className="section-inner">
        <div className="contact-closing">
          <Reveal>
            <span className="kicker">Kontakt</span>
          </Reveal>

          <Reveal>
            <p className="contact-lead">
              Kein Formular, kein Calendly. Eine Mail reicht.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <button
              type="button"
              className="contact-mail-big"
              onClick={copyEmail}
              aria-label={`E-Mail-Adresse ${profile.email} in die Zwischenablage kopieren`}
            >
              {mailUser}@<wbr />{mailDomain}
              <span className="contact-copy-hint mono" aria-hidden="true">
                {copied ? "✓ kopiert" : "klicken zum kopieren"}
              </span>
              <span className="visually-hidden" aria-live="polite">
                {copied ? "E-Mail-Adresse in die Zwischenablage kopiert" : ""}
              </span>
            </button>
          </Reveal>

          <Reveal delay={160} className="contact-actions">
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${profile.email}`}>
                Mail öffnen ↗
              </a>
              <a
                className="contact-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </Reveal>

          <Reveal delay={200} className="contact-live-head">
            <span className="kicker">Maschinenraum</span>
            <p className="contact-live-sub">
              Status, Musik und Standort kommen live aus meiner eigenen
              Infrastruktur.
            </p>
          </Reveal>

          <Reveal delay={240} className="contact-live">
            <StatusCard />
            <NowPlayingCard />
            <DistanceCard />
          </Reveal>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-schicht-sep" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="section-inner footer-inner">
          <span className="footer-coords mono" aria-label="Standort Gelsenkirchen">
            51.5177° N, 7.0857° E · {time} Uhr
          </span>
          <button
            className="footer-motion-btn"
            type="button"
            aria-pressed={reduced}
            onClick={() => setReduced((v) => !v)}
          >
            {reduced ? "Motion: aus" : "Motion: an"}
          </button>
          <span className="mono">© {year} {profile.name}</span>
        </div>
      </footer>
    </section>
  );
}
