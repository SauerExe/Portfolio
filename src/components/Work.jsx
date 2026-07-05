import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import WorkPanel from "./WorkPanel.jsx";
import { projects } from "../data/content.js";
import { pauseLenis, resumeLenis } from "../hooks/useLenisController.js";

export default function Work() {
  const [focusedSlug, setFocusedSlug] = useState(null);

  const release = () => {
    setFocusedSlug(null);
    resumeLenis();
  };
  const focus = (slug) => {
    setFocusedSlug(slug);
    pauseLenis();
  };

  useEffect(() => {
    if (!focusedSlug) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") release();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusedSlug]);

  return (
    <section id="projekte" className="work" data-scene="blue" aria-label="Projekte">
      <div className="work-head section">
        <div className="section-inner">
          <Reveal>
            <span className="kicker">Ausgewählte Arbeiten</span>
          </Reveal>
          <SplitHeading className="section-title" text="Echte Projekte, live geschaltet" dot />
        </div>
      </div>
      <div className="work-rail">
        {projects.map((project, i) => (
          <WorkPanel
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            focused={focusedSlug === project.slug}
            onFocus={() => focus(project.slug)}
            onRelease={release}
          />
        ))}
      </div>
    </section>
  );
}
