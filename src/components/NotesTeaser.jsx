import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { posts } from "../notes/posts.js";

// Kuratierte Auswahl statt "die neuesten drei": je eine Notiz zu
// Architektur (Sommerfrische), einem Bug (Zeitzonen) und einer
// Produktentscheidung (SimpleAct) — bewusst aus verschiedenen Projekten.
const FEATURED = [
  "kein-login-trotzdem-rechte",
  "einen-tag-zu-frueh",
  "go-live-gate",
];

export default function NotesTeaser() {
  const featured = FEATURED.map((slug) =>
    posts.find((post) => post.slug === slug),
  ).filter(Boolean);

  return (
    <section id="notizen" className="section notes-home" aria-label="Notizen">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Aus dem Maschinenraum</span>
        </Reveal>
        <SplitHeading className="section-title" text="Notizen" dot />

        <Reveal>
          <p className="notes-lead">
            Kurze Notizen zu Entscheidungen, Fehlern und dem, was daraus
            geworden ist — direkt aus den Projekten oben. Drei Beispiele:
          </p>
        </Reveal>

        <ul className="notes-list">
          {featured.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 60}>
                <a className="notes-row" href={`/notes/${post.slug}`}>
                  <span className="notes-date mono">{post.date}</span>
                  <span className="notes-row-body">
                    <h3 className="notes-title">{post.title}</h3>
                    <span className="notes-teaser">{post.teaser}</span>
                  </span>
                  <span className="notes-arrow" aria-hidden="true">→</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <a className="notes-all-link" href="/notes">
            Alle {posts.length} Notizen ansehen
          </a>
        </Reveal>
      </div>
    </section>
  );
}
