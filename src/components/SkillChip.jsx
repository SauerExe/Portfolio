import { useState } from "react";
import { projectsForSkill } from "../data/content.js";

export default function SkillChip({ skill, categoryLabel }) {
  const [open, setOpen] = useState(false);
  const related = projectsForSkill(skill.name);
  const hasRefs = related.length > 0;

  return (
    <div className={`skill-chip${hasRefs ? " skill-chip--interactive" : ""}${open ? " is-open" : ""}`}>
      {hasRefs ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="skill-chip-head"
        >
          <span className="skill-chip-name">{skill.name}</span>
          <span className="skill-chip-toggle mono" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </button>
      ) : (
        <div className="skill-chip-head">
          <span className="skill-chip-name">{skill.name}</span>
        </div>
      )}
      {skill.note && <p className="skill-chip-note">{skill.note}</p>}
      {hasRefs && open && (
        <p className="skill-chip-refs mono">
          Im Einsatz in:{" "}
          {related.map((project, i) => (
            <span key={project.slug}>
              {i > 0 ? ", " : ""}
              <a href={`#projekt-${project.slug}`} className="skill-chip-link">
                {project.title}
              </a>
            </span>
          ))}
        </p>
      )}
      <span className="skill-chip-category mono">{categoryLabel}</span>
    </div>
  );
}
