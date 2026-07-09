import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { profile } from "../data/content.js";

export default function Manifesto() {
  return (
    <section id="ueber" className="section manifesto" aria-label="Über mich">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Über mich</span>
        </Reveal>

        <SplitHeading
          as="p"
          className="manifesto-statement"
          text="Seit 2018 schreibe ich Code. Erst Spiele in Unity, heute SaaS-Plattformen und die Server darunter."
        />

        <div className="manifesto-split">
          <Reveal className="manifesto-photo">
            <img
              src="/me.webp"
              alt={`Portrait von ${profile.name}`}
              loading="lazy"
              width={520}
              height={640}
            />
          </Reveal>

          <div className="manifesto-text">
            <Reveal>
              <p>
                Ich bin <strong>Timo Weiß, 22</strong>, aus Gelsenkirchen. 2023
                habe ich die Ausbildung zum Fachinformatiker für
                Anwendungsentwicklung angefangen, mit Schwerpunkt auf{" "}
                <strong>C#/.NET und TypeScript</strong>. Seit Juli 2026 bin ich
                ausgelernt und arbeite fest bei der{" "}
                <a
                  className="text-link"
                  href="https://www.gkd-el.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gkd-el
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                2025 habe ich{" "}
                <a
                  className="text-link"
                  href="https://simpleact.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>SimpleAct</strong>
                </a>{" "}
                mitgegründet, ein B2B-SaaS für EU-AI-Act-Compliance. Als CTO
                verantworte ich dort Architektur, Plattform und
                Automatisierung.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                Meine Infrastruktur betreibe ich selbst:{" "}
                <strong>TrueNAS, Coolify und n8n</strong> auf eigenen Servern,
                abgesichert über Cloudflare Tunnel und Authelia. Auch diese
                Seite läuft darauf.
              </p>
            </Reveal>

            <Reveal delay={240} className="manifesto-meta">
              <div className="manifesto-meta-item">
                <span className="manifesto-meta-label">Standort</span>
                <span className="manifesto-meta-value">Gelsenkirchen, NRW</span>
              </div>
              <div className="manifesto-meta-item">
                <span className="manifesto-meta-label">Status</span>
                <span className="manifesto-meta-value">Festangestellt + CTO</span>
              </div>
              <div className="manifesto-meta-item">
                <span className="manifesto-meta-label">Seit</span>
                <span className="manifesto-meta-value">2018</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
