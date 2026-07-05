import { useEffect, useRef, useState } from "react";
import { isStaticMode } from "../hooks/useStaticMode.js";

export default function WorkPanel({ project, index, total, focused, onFocus, onRelease }) {
  const panelRef = useRef(null);
  const [inView, setInView] = useState(false);
  const isEmbeddable = project.previewMode === "iframe" && !!project.liveUrl;

  useEffect(() => {
    const el = panelRef.current;
    if (!el || isStaticMode()) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showLiveIframe = isEmbeddable && inView;
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `local://${project.slug}`;

  return (
    <article
      ref={panelRef}
      className={`work-panel${focused ? " is-focused" : ""}`}
      aria-label={`Projekt ${index + 1} von ${total}: ${project.title}`}
    >
      <div className="work-panel-inner">
        <div className="work-preview">
          <div className="frame" onMouseLeave={focused ? onRelease : undefined}>
            <div className="frame-bar">
              <span className="frame-dots" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="frame-url mono">{displayUrl}</span>
              {isEmbeddable && focused ? (
                <button className="frame-release mono" onClick={onRelease}>
                  Schließen · Esc
                </button>
              ) : (
                project.liveUrl && (
                  <a
                    className="frame-open mono"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Öffnen ↗
                  </a>
                )
              )}
            </div>
            <div className="frame-body">
              {showLiveIframe ? (
                <iframe
                  src={project.liveUrl}
                  title={`Live-Vorschau: ${project.title}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : project.screenshot ? (
                <img src={project.screenshot} alt={`Screenshot: ${project.title}`} loading="lazy" />
              ) : (
                <div className="frame-empty">
                  <span className="frame-empty-type mono">{project.type}</span>
                  <p>
                    {isEmbeddable
                      ? "Diese Seite lässt sich hier nicht einbetten. Rechts oben direkt öffnen."
                      : "Kein visueller Preview."}
                  </p>
                </div>
              )}
              {isEmbeddable && !focused && (
                <button
                  className="frame-focus-overlay"
                  onClick={onFocus}
                  aria-label={`Live-Vorschau von ${project.title} bedienen`}
                >
                  <span className="frame-focus-hint mono">
                    Klicken, um die Live-Seite zu bedienen
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="work-meta">
          <span className="work-no mono">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="console-chips">
            <span className="chip chip--accent">{project.status}</span>
            <span className="chip">{project.type}</span>
            {project.year && <span className="chip">{project.year}</span>}
          </div>
          <h3 className="work-title">{project.title}</h3>
          {project.context && <p className="work-context mono dim">{project.context}</p>}
          <p className="work-desc">{project.shortDescription}</p>
          {project.role && (
            <p className="work-role mono">Rolle: {project.role}</p>
          )}
          {project.highlights?.length > 0 && (
            <ul className="work-highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {project.technologies.length > 0 && (
            <div className="console-chips work-stack">
              {project.technologies.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="work-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="work-link mono">
                Live ansehen ↗
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="work-link mono">
                Code auf GitHub ↗
              </a>
            )}
            {project.extraLink && (
              <a href={project.extraLink.href} target="_blank" rel="noopener noreferrer" className="work-link mono">
                {project.extraLink.label} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
