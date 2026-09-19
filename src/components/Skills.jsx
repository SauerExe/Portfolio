import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/content.js";
import { repoForSkill } from "../data/skills-config.js";

// Ein Bauteil in der Schicht: Name + Notiz, mit Repo-Beleg als Link
// (skills-config.js) — „vorführen statt behaupten" gilt auch hier.
function Part({ item }) {
  const repoUrl = repoForSkill(item.name);
  const body = (
    <>
      <span className="stack-part-name">
        {item.name}
        {repoUrl && (
          <>
            {" "}
            <span className="stack-part-link-icon" aria-hidden="true">↗</span>
          </>
        )}
      </span>
      {item.note && <span className="stack-part-note">{item.note}</span>}
    </>
  );

  return (
    <li className="stack-part">
      {repoUrl ? (
        <a
          className="stack-part-link"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
          <span className="visually-hidden"> — Referenz-Repo auf GitHub</span>
        </a>
      ) : (
        body
      )}
    </li>
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

        {/* Querschnitt: oben die Oberfläche, unten der Server. Die
            Reihenfolge der Gruppen in content.js ist die Schichtreihenfolge. */}
        <ol className="stack-layers">
          {skillGroups.map((group, i) => (
            <li key={group.id}>
              <Reveal delay={i * 70}>
                <div className="stack-layer">
                  <div className="stack-layer-head">
                    <span className="stack-layer-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="stack-layer-title">{group.label}</h3>
                    {group.claim && <p className="stack-layer-claim">{group.claim}</p>}
                  </div>

                  <ul className="stack-parts" aria-label={group.label}>
                    {group.items.map((item) => (
                      <Part key={item.name} item={item} />
                    ))}
                  </ul>

                  {group.usedFor && (
                    <p className="stack-layer-usedfor">
                      <span className="stack-layer-usedfor-label">Einsatz</span>
                      {group.usedFor}
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
