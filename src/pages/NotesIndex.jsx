import SubPage from "./SubPage.jsx";
import { posts } from "../notes/posts.js";

export default function NotesIndex() {
  return (
    <SubPage title="Notizen">
      <section className="section notes" aria-label="Notizen">
        <div className="section-inner">
          <span className="kicker">Aus dem Maschinenraum</span>
          <h1 className="section-title">
            Notizen<span className="accent">.</span>
          </h1>

          <p className="notes-lead">
            Kurze Notizen zu Entscheidungen, Fehlern und dem, was daraus
            geworden ist. Statische Dateien im Repo — kein CMS, keine
            Kommentare.
          </p>

          <ul className="notes-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <a className="notes-row" href={`/notes/${post.slug}`}>
                  <span className="notes-date mono">{post.date}</span>
                  <span className="notes-row-body">
                    <span className="notes-title">{post.title}</span>
                    <span className="notes-teaser">{post.teaser}</span>
                  </span>
                  <span className="notes-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubPage>
  );
}
