import SubPage from "./SubPage.jsx";
import { profile } from "../data/content.js";

// Bewusst ohne volle Anschrift: Diese Seite ist ein privates,
// nicht-kommerzielles Portfolio — es werden keine Dienstleistungen
// angeboten oder Verträge angebahnt.
export default function Impressum() {
  return (
    <SubPage title="Impressum">
      <section className="section legal" aria-label="Impressum">
        <div className="section-inner">
          <span className="kicker">Rechtliches</span>
          <h1 className="section-title">
            Impressum<span className="accent">.</span>
          </h1>

          <div className="legal-body">
            <div className="legal-block">
              <h2>Angaben zu dieser Seite</h2>
              <p className="legal-address">
                Timo Weiß
                <br />
                Gelsenkirchen, Deutschland
              </p>
              <p>
                Diese Seite ist ein privates, nicht-kommerzielles Portfolio.
                Es werden hier keine Dienstleistungen angeboten, keine Waren
                verkauft und keine Verträge angebahnt.
              </p>
            </div>

            <div className="legal-block">
              <h2>Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a className="text-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
            </div>

            <div className="legal-block">
              <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p className="legal-address">
                Timo Weiß, Gelsenkirchen
              </p>
            </div>

            <div className="legal-block">
              <h2>Streitbeilegung</h2>
              <p>
                Ich bin nicht bereit und nicht verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
              </p>
            </div>

            <div className="legal-block">
              <h2>Haftung für Links</h2>
              <p>
                Diese Seite verlinkt auf externe Websites (u. a. GitHub,
                SimpleAct, Habitaz). Für deren Inhalte sind die jeweiligen
                Betreiber verantwortlich; zum Zeitpunkt der Verlinkung waren
                keine Rechtsverstöße erkennbar. Werden mir Rechtsverstöße
                bekannt, entferne ich betroffene Links umgehend.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPage>
  );
}
