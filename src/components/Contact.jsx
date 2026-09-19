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
              Etwas Gutes im Kopf?<br />Lass uns reden.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <p className="contact-sub">
              Ob Frage zu einem der Projekte, Idee oder Feedback — es
              antwortet kein Autoresponder, sondern ich.
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

          {/* Erwartungsmanagement statt Sales-Versprechen: beschreibt nur,
              wie eine Anfrage behandelt wird — keine Kapazitäts- oder
              Preiszusagen, die die Seite nicht halten kann. */}
          <Reveal delay={200} className="contact-process">
            <span className="contact-process-label mono">Der erste Schritt</span>
            <p className="contact-process-text">
              Diese Seite ist in erster Linie Portfolio, kein Schaufenster mit
              Preisliste. Projekte neben Festanstellung und CTO-Rolle nehme
              ich auf Anfrage an — wenn Thema und Timing passen. Du hast eines
              im Kopf? Zwei Sätze Kontext reichen: was entstehen soll, was
              schon existiert, bis wann. Du bekommst eine ehrliche
              Einschätzung — und wenn es nicht passt, sage ich auch das.
            </p>
            {/* Erwartungsmanagement konkret: was in dieses Setup passt und
                was ehrlicherweise nicht — solo, nebenberuflich. */}
            <dl className="contact-fit">
              <div className="contact-fit-col">
                <dt className="contact-fit-label mono">Passt gut</dt>
                <dd>
                  Klar geschnittene Web-Projekte — Portal, Buchung, Admin —
                  gern mit Anbindung an ein Bestandssystem. Ein Zeitplan, der
                  Sorgfalt zulässt.
                </dd>
              </div>
              <div className="contact-fit-col">
                <dt className="contact-fit-label mono">Passt nicht</dt>
                <dd>
                  Vorhaben, die ein ganzes Team oder 24/7-Bereitschaft
                  brauchen — ich arbeite solo, neben Job und CTO-Rolle. Das
                  sage ich lieber vorher als mittendrin.
                </dd>
              </div>
            </dl>
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
