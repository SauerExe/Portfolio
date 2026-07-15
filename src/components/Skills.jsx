import { useState } from "react";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/content.js";
import { repoForSkill, hasAnyRepoLinks } from "../data/skills-config.js";

// Eine Zeile des Spec-Sheets. Die Note des gehoverten Skills erscheint
// in einer festen Spalte rechts, damit sich das Layout nicht verschiebt.
// Skills mit Repo-Beleg (skills-config.js) verlinken auf GitHub.
function SpecRow({ group, delay }) {
  const [note, setNote] = useState(null);

  return (
    <Reveal delay={delay} className="skills-spec-row">
      <span className="skills-spec-cat">{group.label}</span>
      <ul
        className="skills-spec-list"
        aria-label={group.label}
        onMouseLeave={() => setNote(null)}
      >
        {group.items.map((item) => {
          const repoUrl = repoForSkill(item.name);
          return (
            <li
              key={item.name}
              className="skills-spec-item"
              title={item.note || undefined}
              onMouseEnter={() => setNote(item.note || null)}
            >
              {repoUrl ? (
                <a
                  className="skills-spec-link"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} – Referenz-Repo auf GitHub öffnen`}
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </li>
          );
        })}
      </ul>
      <span
        className={`skills-spec-notecol mono${note ? " has-note" : ""}`}
        aria-hidden="true"
      >
        {note || ""}
      </span>
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
            <span className="skills-hint mono">
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
