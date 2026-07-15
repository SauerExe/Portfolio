import { useState } from "react";
import Reveal from "./Reveal.jsx";
import DistanceCard from "./DistanceCard.jsx";
import NowPlayingCard from "./NowPlayingCard.jsx";
import StatusCard from "./StatusCard.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { profile } from "../data/content.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [mailUser, mailDomain] = profile.email.split("@");

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

      <SiteFooter />
    </section>
  );
}
