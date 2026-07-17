import { useState } from "react";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/content.js";
import { repoForSkill, hasAnyRepoLinks } from "../data/skills-config.js";

// Skill-Kategorien als kompakte Grid-Blöcke statt durchgehender Rows.
// Gibt mehr visuellen Rhythmus und nutzt Fläche besser.
function SpecRow({ group, delay }) {
  const [note, setNote] = useState(null);

  return (
    <Reveal delay={delay} className="skills-spec-block">
      <h4 className="skills-block-title">{group.label}</h4>
      <ul
        className="skills-grid"
        aria-label={group.label}
        onMouseLeave={() => setNote(null)}
      >
        {group.items.map((item) => {
          const repoUrl = repoForSkill(item.name);
          return (
            <li
              key={item.name}
              className="skills-grid-item"
              onMouseEnter={() => setNote(item.note || null)}
            >
              {repoUrl ? (
                <a
                  className="skills-grid-link"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onFocus={() => setNote(item.note || null)}
                  onBlur={() => setNote(null)}
                >
                  {item.name}
                  <span className="visually-hidden"> — Referenz-Repo auf GitHub</span>
                </a>
              ) : (
                <span>{item.name}</span>
              )}
              {item.note && (
                <span className="visually-hidden">, {item.note}</span>
              )}
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills" aria-label="Skills">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Womit ich baue</span>
        </Reveal>
        <SplitHeading className="section-title" text="Stack" dot />

        <Reveal>
          <p className="skills-lead">
            Was hier steht, ist im Einsatz: bei SimpleAct, in Kundenprojekten
            oder auf meiner eigenen Infrastruktur.
            {/* Reiner Maus-Hinweis — Screenreader bekommen die Notes
                direkt als Text an jedem Skill. */}
            <span className="skills-hint mono" aria-hidden="true">
              Hover zeigt, wofür.
              {hasAnyRepoLinks() && " Verlinkte Einträge führen zum Repo."}
            </span>
          </p>
        </Reveal>

        <div className="skills-spec">
          {skillGroups.map((group, i) => (
            <SpecRow key={group.id} group={group} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
