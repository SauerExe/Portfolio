import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { buildPath } from "../data/content.js";

export default function BuildPath() {
  return (
    <section id="weg" className="section buildpath" aria-label="Werdegang">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Build-Log</span>
        </Reveal>
        <SplitHeading className="section-title" text="Der Weg bis hier" dot />
        <ol className="buildpath-list">
          {buildPath.map((entry, i) => (
            <li key={i}>
              <Reveal delay={i * 80} className="buildpath-entry">
                <span className="buildpath-period mono">{entry.period}</span>
                <div className="buildpath-body">
                  <h3 className="buildpath-title">{entry.title}</h3>
                  <p className="buildpath-text">{entry.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
