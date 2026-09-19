// Eigene Mini-Kartenprojektion für die „Du & ich"-Karte: Web-Mercator auf
// eine feste viewBox, der Ausschnitt richtet sich nach den beiden Punkten.
// Umrisse kommen aus src/data/world-outlines.json (Natural Earth, Public
// Domain) — keine Kacheln, kein Kartenanbieter, keine Fremdanfrage.

export const VIEW = { w: 480, h: 260 };
export const HOME = { lat: 51.5177, lng: 7.0857 };

const RAD = Math.PI / 180;
const MAX_LAT = 82;
// Mindest-Halbbreite des Ausschnitts in Mercator-Einheiten (≈ Bogenmaß der
// Länge): ±22°. So bekommt auch ein Besucher aus Bielefeld Europa zu sehen
// statt zweier Punkte auf leerem Grund.
const MIN_HALF_W = 0.38;
const MAX_HALF_W = Math.PI;
const PAD = 1.6;
// Unter diesem Pixelabstand würden sich die Beschriftungen überlagern.
const CLOSE_PX = 70;

function mercator(lng, lat) {
  const phi = Math.max(-MAX_LAT, Math.min(MAX_LAT, lat)) * RAD;
  return [lng * RAD, Math.log(Math.tan(Math.PI / 4 + phi / 2))];
}

function inverseLat(y) {
  return (2 * Math.atan(Math.exp(y)) - Math.PI / 2) / RAD;
}

export function haversineKm(a, b) {
  const h =
    Math.sin(((b.lat - a.lat) * RAD) / 2) ** 2 +
    Math.cos(a.lat * RAD) *
      Math.cos(b.lat * RAD) *
      Math.sin(((b.lng - a.lng) * RAD) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, h))));
}

export function fitView(points) {
  const aspect = VIEW.h / VIEW.w;
  const m = points.map((p) => mercator(p.lng, p.lat));
  const xs = m.map((p) => p[0]);
  const ys = m.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const halfW = Math.min(
    MAX_HALF_W,
    Math.max(MIN_HALF_W, ((maxX - minX) / 2) * PAD, (((maxY - minY) / 2) * PAD) / aspect),
  );
  // Ausschnitt nicht über den Kartenrand (±180°) hinausschieben — sonst
  // bliebe bei Besuchern aus Ozeanien die halbe Karte leer.
  const cx = Math.max(-Math.PI + halfW, Math.min(Math.PI - halfW, (minX + maxX) / 2));
  return { cx, cy: (minY + maxY) / 2, scale: VIEW.w / (2 * halfW) };
}

export function project(view, lng, lat) {
  const [x, y] = mercator(lng, lat);
  return [
    (x - view.cx) * view.scale + VIEW.w / 2,
    (view.cy - y) * view.scale + VIEW.h / 2,
  ];
}

// Großkreis zwischen zwei Punkten als Liste von [lng, lat].
export function greatCircle(a, b, steps = 48) {
  const toVec = ({ lng, lat }) => {
    const phi = lat * RAD, lambda = lng * RAD;
    return [Math.cos(phi) * Math.cos(lambda), Math.cos(phi) * Math.sin(lambda), Math.sin(phi)];
  };
  const va = toVec(a), vb = toVec(b);
  const omega = Math.acos(Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2])));
  if (omega < 1e-6) return [[a.lng, a.lat], [b.lng, b.lat]];
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
    const s2 = Math.sin(t * omega) / Math.sin(omega);
    const x = s1 * va[0] + s2 * vb[0];
    const y = s1 * va[1] + s2 * vb[1];
    const z = s1 * va[2] + s2 * vb[2];
    pts.push([Math.atan2(y, x) / RAD, Math.atan2(z, Math.hypot(x, y)) / RAD]);
  }
  return pts;
}

function fmt(n) {
  return n.toFixed(1).replace(/\.0$/, "");
}

function landPath(rings, view) {
  const margin = 24;
  const parts = [];
  for (const ring of rings) {
    let d = "";
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < ring.length; i += 2) {
      const [x, y] = project(view, ring[i] / 10, ring[i + 1] / 10);
      d += (i === 0 ? "M" : "L") + fmt(x) + " " + fmt(y);
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    if (maxX < -margin || minX > VIEW.w + margin || maxY < -margin || minY > VIEW.h + margin) continue;
    parts.push(d + "Z");
  }
  return parts.join("");
}

function routePath(a, b, view) {
  const pts = greatCircle(a, b);
  let d = "";
  let prevLng = null;
  for (const [lng, lat] of pts) {
    const [x, y] = project(view, lng, lat);
    // Sprung über ±180°: Linie unterbrechen statt quer über die Karte ziehen.
    const jump = prevLng !== null && Math.abs(lng - prevLng) > 180;
    d += (d === "" || jump ? "M" : "L") + fmt(x) + " " + fmt(y);
    prevLng = lng;
  }
  return d;
}

// Maßstabsbalken für die Breite in der Bildmitte (Mercator verzerrt mit der
// Breite — die Mitte ist die übliche Konvention).
function scaleBar(view) {
  const kmPerUnit = (40075 * Math.cos(inverseLat(view.cy) * RAD)) / (2 * Math.PI);
  const kmPerPx = kmPerUnit / view.scale;
  const km = [5000, 2000, 1000, 500, 200, 100, 50, 20, 10].find((s) => s / kmPerPx <= 110) ?? 10;
  return { km, px: km / kmPerPx };
}

// Beschriftung auf der vom anderen Punkt abgewandten Seite, damit sich
// Label und Route nicht kreuzen.
function labelSide(pt, other) {
  return {
    right: !other || other[0] <= pt[0],
    below: !other || other[1] <= pt[1],
  };
}

// Grobe Zeichenbreiten der Mono-Schrift je Klasse (Schriftgröße + Spationierung),
// reicht für die Rand-Prüfung.
const CHAR_W = { "geo-label": 8.7, "geo-coordinate": 5.4, "geo-distance": 10.2 };
const STEP = 13;
// Unterer Streifen gehört Maßstab und Quellenangabe.
const FOOT = 30;

const FONT_H = { "geo-label": 12, "geo-coordinate": 9, "geo-distance": 17 };

function textBox(t) {
  const w = t.text.length * CHAR_W[t.cls];
  const x0 = t.anchor === "end" ? t.x - w : t.anchor === "middle" ? t.x - w / 2 : t.x;
  return { x0, x1: x0 + w, y0: t.y - FONT_H[t.cls], y1: t.y };
}

function overlaps(a, b, gap = 4) {
  const A = textBox(a), B = textBox(b);
  return A.x0 < B.x1 + gap && B.x0 < A.x1 + gap && A.y0 < B.y1 + gap && B.y0 < A.y1 + gap;
}

function placeLabel(pt, side, lines) {
  const width = Math.max(...lines.map((l) => l.text.length * CHAR_W[l.cls]));
  const height = 12 + STEP * (lines.length - 1);
  let { right, below } = side;
  // Am Rand umklappen statt aus der viewBox zu laufen.
  if (right && pt[0] + 14 + width > VIEW.w - 6) right = false;
  else if (!right && pt[0] - 14 - width < 6) right = true;
  if (below && pt[1] + 20 + height - 12 > VIEW.h - FOOT) below = false;
  else if (!below && pt[1] - 11 - height + 2 < 6) below = true;

  const x = pt[0] + (right ? 14 : -14);
  const anchor = right ? "start" : "end";
  const y0 = below ? pt[1] + 20 : pt[1] - 11 - STEP * (lines.length - 1);
  return lines.map((line, i) => ({ ...line, x, y: y0 + i * STEP, anchor }));
}

// Komplette Szene als reine Daten — die Komponente rendert nur noch.
export function buildScene(rings, visitor) {
  const points = visitor ? [HOME, visitor] : [HOME];
  const view = fitView(points);
  const home = project(view, HOME.lng, HOME.lat);
  const guest = visitor ? project(view, visitor.lng, visitor.lat) : null;
  const km = visitor ? Math.round(haversineKm(HOME, visitor)) : null;
  const kmText = km === null ? "" : `~${km.toLocaleString("de-DE")} KM`;
  const close = guest ? Math.hypot(guest[0] - home[0], guest[1] - home[1]) < CLOSE_PX : false;

  const homeSide = labelSide(home, guest);
  const texts = placeLabel(home, homeSide, [
    { cls: "geo-label", text: "GELSENKIRCHEN" },
    { cls: "geo-coordinate", text: "51.5177° N / 7.0857° E" },
  ]);

  if (guest) {
    // Bei Nachbarn (Bielefeld) landet „DU" auf der anderen Seite und trägt
    // die Distanz gleich mit — für ein eigenes Distanz-Label fehlt der Platz.
    const guestSide = close
      ? { right: homeSide.right, below: !homeSide.below }
      : labelSide(guest, home);
    texts.push(
      ...placeLabel(guest, guestSide, [
        { cls: "geo-label", text: close ? `DU · ${kmText}` : "DU" },
      ]),
    );
    if (!close) {
      const mid = greatCircle(HOME, visitor, 2)[1];
      const [mx, my] = project(view, mid[0], mid[1]);
      const halfText = (kmText.length * CHAR_W["geo-distance"]) / 2;
      const x = Math.max(6 + halfText, Math.min(VIEW.w - 6 - halfText, mx));
      const clampY = (y) => Math.max(22, Math.min(VIEW.h - FOOT - 4, y));
      // Erst über der Route, bei Kollision mit einem Punkt-Label darunter.
      const candidates = [clampY(my - 12), clampY(my + 24)];
      const y = candidates.find((cy) =>
        !texts.some((t) => overlaps(t, { cls: "geo-distance", text: kmText, x, y: cy, anchor: "middle" })),
      ) ?? candidates[0];
      texts.push({ cls: "geo-distance", text: kmText, x, y, anchor: "middle" });
    }
  }

  return {
    land: landPath(rings, view),
    route: visitor ? routePath(HOME, visitor, view) : null,
    home,
    guest,
    texts,
    scale: scaleBar(view),
  };
}
