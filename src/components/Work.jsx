import { useState } from "react";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { projects } from "../data/content.js";

function statusClass(status) {
  if (!status) return "";
  const s = status.toLowerCase();
  if (s.includes("betrieb") || s === "live") return "is-live";
  if (s.includes("entwicklung")) return "is-wip";
  return "";
}

export default function Work() {
  const [open, setOpen] = useState(null);

  return (
    <section id="projekte" className="section work" aria-label="Projekte">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Was ich gebaut habe</span>
        </Reveal>
        <SplitHeading className="section-title" text="Projekte" dot />
        <div className="work-list">
          {projects.map((project, i) => {
            const isOpen = open === project.slug;
            const panelId = `work-panel-${project.slug}`;

            return (
              <Reveal key={project.slug}>
                <article className={`work-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="work-row"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : project.slug)}
                  >
                    <span className="work-row-num mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="work-row-head">
                      <span className="work-row-title">{project.title}</span>
                      <span className="work-row-context">{project.context}</span>
                    </span>

                    <span className="work-row-aside">
                      <span className="work-row-year">{project.type}</span>
                      <span className={`work-row-status mono ${statusClass(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="work-row-toggle" aria-hidden="true">+</span>
                    </span>
                  </button>

                  <div id={panelId} className="work-panel">
                    <div className="work-panel-inner">
                      <div className="work-panel-body">
                        <div className="work-panel-info">
                          <p className="work-panel-desc">{project.shortDescription}</p>

                          {project.highlights?.length > 0 && (
                            <ul className="work-panel-highlights">
                              {project.highlights.map((h) => (
                                <li key={h}>{h}</li>
                              ))}
                            </ul>
                          )}

                          <div className="work-panel-tags">
                            {project.technologies.map((t) => (
                              <span key={t} className="chip">{t}</span>
                            ))}
                          </div>

                          <div className="work-panel-links">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Live ansehen ↗
                              </a>
                            )}
                            {project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Code ↗
                              </a>
                            )}
                          </div>
                        </div>

                        {project.screenshot && (
                          <div className="work-panel-media">
                            <img
                              src={project.screenshot}
                              alt={`Screenshot von ${project.title}`}
                              loading="lazy"
                              width={640}
                              height={400}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
