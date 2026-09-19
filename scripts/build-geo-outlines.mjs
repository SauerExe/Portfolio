// Erzeugt src/data/world-outlines.json für die „Du & ich"-Karte aus den
// Natural-Earth-Länderumrissen (1:110 Mio., Public Domain).
//
//   node scripts/build-geo-outlines.mjs            # lädt von GitHub
//   node scripts/build-geo-outlines.mjs pfad.json  # nimmt lokale Datei
//
// Ausgabe: Array von Ringen, jeder Ring flach als [lng·10, lat·10, …] in
// Zehntelgrad-Ganzzahlen — bei 480px Kartenbreite reicht das, und die
// Datei bleibt klein genug für einen Lazy-Chunk.
import { readFile, writeFile } from "node:fs/promises";

const SOURCE =
  process.argv[2] ??
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
const OUT = new URL("../src/data/world-outlines.json", import.meta.url);

const raw = SOURCE.startsWith("http")
  ? await (await fetch(SOURCE)).text()
  : await readFile(SOURCE, "utf8");
const geo = JSON.parse(raw);

const rings = [];
for (const feature of geo.features) {
  if (feature.properties.ADMIN === "Antarctica") continue;
  const { type, coordinates } = feature.geometry;
  const polygons = type === "Polygon" ? [coordinates] : coordinates;
  for (const polygon of polygons) {
    const flat = [];
    let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
    // Nur der Außenring — Binnenseen/Enklaven braucht die Karte nicht.
    for (const [lng, lat] of polygon[0]) {
      const x = Math.round(lng * 10);
      const y = Math.round(lat * 10);
      const n = flat.length;
      if (n >= 2 && flat[n - 2] === x && flat[n - 1] === y) continue;
      flat.push(x, y);
      minLng = Math.min(minLng, x); maxLng = Math.max(maxLng, x);
      minLat = Math.min(minLat, y); maxLat = Math.max(maxLat, y);
    }
    if (flat.length < 8) continue;
    // Inselchen unter 0,3° in beiden Richtungen wären nur Pixelmüll.
    if (maxLng - minLng < 3 && maxLat - minLat < 3) continue;
    rings.push(flat);
  }
}

await writeFile(OUT, JSON.stringify(rings));
const points = rings.reduce((n, r) => n + r.length / 2, 0);
console.log(`world-outlines.json: ${rings.length} Ringe, ${points} Punkte`);
