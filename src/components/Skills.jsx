import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/content.js";
import { repoForSkill } from "../data/skills-config.js";

// Eine Kategorie-Karte: Claim-Satz gibt Kontext, Chips sind die
// einzelnen Skills. Skills mit Repo-Beleg (skills-config.js) verlinken
// auf GitHub.
function SkillCard({ group, index, delay }) {
  return (
    <Reveal delay={delay} className="skills-spec-block">
      <div className="skills-block-head">
        <h4 className="skills-block-title">{group.label}</h4>
        <span className="skills-block-index mono" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {group.claim && <p className="skills-block-claim">{group.claim}</p>}
      <ul className="skills-grid" aria-label={group.label}>
        {group.items.map((item) => {
          const repoUrl = repoForSkill(item.name);
          return (
            <li key={item.name} className="skills-grid-item">
              {repoUrl ? (
                <a
                  className="skills-grid-link"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
          </p>
        </Reveal>

        <div className="skills-spec">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
