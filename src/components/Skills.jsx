import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { skillGroups } from "../data/content.js";

export default function Skills() {
  return (
    <section id="skills" className="section skills" data-scene="green" aria-label="Skills">
      <div className="section-inner">
        <SplitHeading className="section-title" text="Womit ich baue" dot />
        <Reveal>
          <p className="skills-intro dim">
            Alles, was ich baue, besteht aus denselben Modulen. Keine Prozentbalken,
            keine erfundenen Level: nur das, was ich wirklich benutze.
          </p>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={(i % 2) * 90} className="skills-card">
              <div className="skills-card-head">
                <span className="skills-card-no mono">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="skills-card-label">{group.label}</h3>
              </div>
              <p className="skills-claim">{group.claim}</p>
              <ul className="skills-items">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="skills-item-name mono">{item.name}</span>
                    {item.note && <span className="skills-item-note">{item.note}</span>}
                  </li>
                ))}
              </ul>
              <p className="skills-used mono">Im Einsatz für: {group.usedFor}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
