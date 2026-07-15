import { useEffect, useState } from "react";
import { profile, previousVersion } from "../data/content.js";

function localTime() {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date());
}

// Seiten-Footer, geteilt zwischen Startseite und Unterseiten
// (Impressum, Datenschutz, Notizen). Rechtliches bewusst unauffällig
// hier statt in der Hauptnavigation. Der Motion-Toggle lebt im
// A11y-Panel unten rechts.
export default function SiteFooter() {
  const [time, setTime] = useState(localTime);
  const year = new Date().getFullYear();

  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-schicht-sep" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="section-inner footer-inner">
        <span className="footer-coords mono" aria-label="Standort Gelsenkirchen">
          51.5177° N, 7.0857° E · {time} Uhr
        </span>
        <span className="footer-legal mono">
          © {year} {profile.name}
          <nav className="footer-links" aria-label="Rechtliches und Archiv">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/notes">Notizen</a>
            <a
              href={previousVersion.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {previousVersion.label}
            </a>
          </nav>
        </span>
      </div>
    </footer>
  );
}
