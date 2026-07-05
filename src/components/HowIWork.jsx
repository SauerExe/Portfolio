import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { principles } from "../data/content.js";

export default function HowIWork() {
  return (
    <section className="section how" data-scene="violet" aria-label="Arbeitsweise">
      <div className="section-inner">
        <SplitHeading className="section-title" text="Nicht kompliziert. Nur sauber gedacht" dot />
        <div className="how-grid">
          {principles.map(([title, text], i) => (
            <Reveal key={title} delay={(i % 2) * 80} className="how-item">
              <h3 className="how-item-title">{title}</h3>
              <p className="how-item-text">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
