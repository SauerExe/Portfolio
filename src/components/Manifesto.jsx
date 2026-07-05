import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { profile } from "../data/content.js";

export default function Manifesto() {
  return (
    <section id="ueber" className="section manifesto" aria-label="Über mich">
      <div className="section-inner manifesto-grid">
        <div className="manifesto-intro">
          <Reveal className="manifesto-portrait">
            <img
              src="/me.webp"
              alt={`Portrait von ${profile.name}`}
              loading="lazy"
              width={520}
              height={640}
            />
          </Reveal>
          <SplitHeading
            as="p"
            className="manifesto-lead"
            text="Ich baue digitale Dinge, die sauber gedacht sind"
            dot
          />
        </div>
        <div className="manifesto-body">
          <Reveal delay={80}>
            <p>
              Hallo zusammen, ich bin {profile.name}, {profile.age}. Progammieren habe ich früh angefangen 
              mit Unity und Spieleentwicklung, über YouTube-Tutorials und Guides einfach
              drauflosprogrammiert. Seit 2023, mit dem Start meiner Ausbildung zum
              Fachinformatiker für Anwendungsentwicklung, wurde daraus mehr Struktur:
              sauberer, besserer Code und die Erfahrung, im Team parallel zu entwickeln.
              Schwerpunkt waren Web- und Backend-Entwicklung mit C#/.NET und TypeScript,
              seit Juli 2026 bin ich ausgelernt. Aus dem Lernen wurde schleichend echte
              Verantwortung. Plötzlich saß ich in wichtigen Meetings und entwickelte
              eigenständig Projekte und Erweiterungen bestehender Systeme. Mit dem
              Abschluss der Ausbildung dann eine Gewinnspiel-Verwaltungsplattform für
              die gesamte Stadtverwaltung. Seitdem bin ich bei der gkd-el als Fester Mitarbeiter angestellt, entwickle dort Web- und Backend-Systeme.  
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p>
              Nebenbei bin ich seit 2025 Mitgründer und CTO von SimpleAct, einem B2B-SaaS
              für EU-AI-Act-Compliance. Verantwortlich für Architektur, Plattform und
              Automatisierung, von der Produktidee bis zum laufenden Betrieb.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p>
              Meine Infrastruktur betreibe ich selbst: TrueNAS, Coolify und n8n im
              eigenen Homelab, erreichbar nur über Cloudflare Tunnel und abgesichert
              mit Authelia. Diese Seite läuft darauf. Skills behaupte ich nicht, ich führe sie vor.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
