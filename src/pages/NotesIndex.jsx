import { useState } from "react";
import SubPage from "./SubPage.jsx";
import { posts } from "../notes/posts.js";

const PROJECTS = [...new Set(posts.map((post) => post.project).filter(Boolean))];

export default function NotesIndex() {
  // Vorgerendert werden alle Notizen; der Filter greift erst mit JavaScript.
  const [filter, setFilter] = useState(null);
  const visible = filter ? posts.filter((post) => post.project === filter) : posts;

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

          <div className="notes-filter" role="group" aria-label="Nach Projekt filtern">
            {[null, ...PROJECTS].map((project) => (
              <button
                key={project ?? "alle"}
                type="button"
                aria-pressed={filter === project}
                onClick={() => setFilter(project)}
              >
                {project ?? "Alle"}
                <span className="notes-filter-count">
                  {project ? posts.filter((post) => post.project === project).length : posts.length}
                </span>
              </button>
            ))}
          </div>

          <ul className="notes-list">
            {visible.map((post) => (
              <li key={post.slug}>
                <a className="notes-row" href={`/notes/${post.slug}`}>
                  <span className="notes-date mono">
                    {post.date}
                    {post.project && <span className="notes-project">{post.project}</span>}
                  </span>
                  <span className="notes-row-body">
                    <h2 className="notes-title">{post.title}</h2>
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
