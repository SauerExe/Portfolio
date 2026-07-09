import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { principles } from "../data/content.js";

const SHOW = 5;

export default function HowIWork() {
  return (
    <section className="section how" aria-label="Arbeitsweise">
      <div className="section-inner">
        <Reveal>
          <span className="kicker">Arbeitsweise</span>
        </Reveal>
        <SplitHeading className="section-title" text="Wie ich arbeite" dot />

        <ol className="principles-list">
          {principles.slice(0, SHOW).map(([title, text], i) => (
            <li key={title}>
              <Reveal delay={i * 60} className="principle-item">
                <span className="principle-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="principle-body">
                  <h3 className="principle-title">{title}</h3>
                  <p className="principle-text">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
