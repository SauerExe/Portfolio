import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { profile } from "../data/content.js";
import { useMagneticHover } from "../hooks/useMagneticHover.js";

export default function Contact() {
  const mailCta = useMagneticHover();
  const year = new Date().getFullYear();

  return (
    <section id="kontakt" className="section contact" data-scene="ember" aria-label="Kontakt">
      <div className="section-inner">
        <SplitHeading className="contact-headline" text="Lass uns reden" dot />
        <Reveal>
          <p className="contact-line">
            Ob Projekt, Frage oder einfach Interesse an dem, was ich baue: ich freue
            mich über eine Nachricht.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="contact-ctas">
            <a ref={mailCta} className="btn btn--primary" href={`mailto:${profile.email}`}>
              Nachricht schreiben
            </a>
            <a className="btn btn--ghost" href={profile.oldPortfolio} target="_blank" rel="noopener noreferrer">
              Altes Portfolio ↗
            </a>
          </div>
          <ul className="contact-channels">
            <li>
              <span className="mono dim">E-Mail</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span className="mono dim">GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                {profile.github.replace("https://", "")} ↗
              </a>
            </li>
            <li>
              <span className="mono dim">Altes Portfolio</span>
              <a href={profile.oldPortfolio} target="_blank" rel="noopener noreferrer">
                {profile.oldPortfolio.replace("https://", "")} ↗
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
      <footer className="footer">
        <div className="section-inner footer-inner">
          <p className="mono">
            © {year} {profile.name} · {profile.location}
          </p>
        </div>
      </footer>
    </section>
  );
}
