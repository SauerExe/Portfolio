import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/content.js";
import { repoForSkill } from "../data/skills-config.js";

// Eine Zeile im Datenblatt: Index, Name, Notiz. Skills mit Repo-Beleg
// (skills-config.js) verlinken auf GitHub — "vorführen statt behaupten"
// gilt auch hier, deshalb der ↗-Hinweis statt eines stillen Links.
function SkillRow({ item, index }) {
  const repoUrl = repoForSkill(item.name);
  const body = (
    <>
      <span className="skills-row-name">
        {item.name}
        {repoUrl && (
          <span className="skills-row-link-icon" aria-hidden="true">
            {" "}
            ↗
          </span>
        )}
      </span>
      {item.note && <span className="skills-row-note">{item.note}</span>}
    </>
  );

  return (
    <li
      className="skills-row"
      style={{ transitionDelay: `${150 + index * 45}ms` }}
    >
      <span className="skills-row-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      {repoUrl ? (
        <a
          className="skills-row-body skills-row-link"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
          <span className="visually-hidden"> — Referenz-Repo auf GitHub</span>
        </a>
      ) : (
        <span className="skills-row-body">{body}</span>
      )}
    </li>
  );
}

// Eine Kategorie-Karte: Claim gibt Kontext, Zeilen sind die einzelnen
// Skills, die Fußzeile zeigt den Einsatzbereich der Gruppe. Der
// "01 / 04"-Zähler spiegelt die Zeilen-Nummerierung auf Kartenebene.
function SkillCard({ group, delay, index, total }) {
  return (
    <Reveal delay={delay} className="skills-spec-block">
      <div className="skills-block-head">
        <h3 className="skills-block-title">{group.label}</h3>
        <span className="skills-block-count" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      {group.claim && <p className="skills-block-claim">{group.claim}</p>}
      <ul className="skills-grid" aria-label={group.label}>
        {group.items.map((item, i) => (
          <SkillRow key={item.name} item={item} index={i} />
        ))}
      </ul>
      {group.usedFor && (
        <p className="skills-block-usedfor">
          <span className="skills-block-usedfor-label">Einsatz</span>
          {group.usedFor}
        </p>
      )}
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills" aria-label="Stack">
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
            <SkillCard
              key={group.id}
              group={group}
              delay={i * 60}
              index={i}
              total={skillGroups.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
