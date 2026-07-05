import { marqueeItems } from "../data/content.js";

export default function Marquee() {
  const track = marqueeItems.map((item) => (
    <span key={item} className="marquee-item">
      {item}
      <span className="marquee-sep" aria-hidden="true">
        ✦
      </span>
    </span>
  ));

  return (
    <div className="marquee" aria-label={marqueeItems.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-group">{track}</div>
        <div className="marquee-group">{track}</div>
      </div>
    </div>
  );
}
