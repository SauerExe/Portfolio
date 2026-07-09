/**
 * SVG-Eckmarkierungen — technische Zeichnung / Vermessungs-Anmutung.
 * Alle 4 Ecken, via 4 absolute-positionierte Mini-SVGs.
 *
 * Verwendung: <CornerMark /> innerhalb eines `position: relative` Containers.
 */
export default function CornerMark({ arm = 14, inset = 8, stroke = 1.5 }) {
  const fill = "none";
  const color = "var(--accent)";
  const a = arm;

  const corners = [
    // top-left: Ecke bei (0,0), L öffnet nach rechts+unten
    { pos: { top: inset, left: inset }, d: `M ${a},0 L 0,0 L 0,${a}` },
    // top-right: Ecke bei (a,0), L öffnet nach links+unten
    { pos: { top: inset, right: inset }, d: `M 0,0 L ${a},0 L ${a},${a}` },
    // bottom-left: Ecke bei (0,a), L öffnet nach rechts+oben
    { pos: { bottom: inset, left: inset }, d: `M 0,0 L 0,${a} L ${a},${a}` },
    // bottom-right: Ecke bei (a,a), L öffnet nach links+oben
    { pos: { bottom: inset, right: inset }, d: `M 0,${a} L ${a},${a} L ${a},0` },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <svg
          key={i}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${a} ${a}`}
          width={a}
          height={a}
          fill={fill}
          style={{ position: "absolute", pointerEvents: "none", ...c.pos }}
        >
          <path
            d={c.d}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      ))}
    </>
  );
}
