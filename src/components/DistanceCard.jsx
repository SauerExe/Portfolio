import { useEffect, useMemo, useState } from "react";
import { VIEW, buildScene, haversineKm, HOME } from "../lib/geo-map.js";

const EMPTY = [];

export default function DistanceCard() {
  const [visitor, setVisitor] = useState(null);
  const [failed, setFailed] = useState(false);
  const [rings, setRings] = useState(EMPTY);

  // Umrisse lazy als eigener Chunk — nur diese Karte braucht sie.
  useEffect(() => {
    let active = true;
    import("../data/world-outlines.json")
      .then((mod) => { if (active) setRings(mod.default); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let active = true;

    async function locate() {
      try {
        const response = await fetch("/api/geo", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("geo unavailable");
        const data = await response.json();
        const pos = { lat: data.latitude, lng: data.longitude };
        if (!data.success || !Number.isFinite(pos.lat) || !Number.isFinite(pos.lng) ||
            Math.abs(pos.lat) > 90 || Math.abs(pos.lng) > 180) {
          throw new Error("invalid coordinates");
        }
        if (active) setVisitor({ ...pos, city: data.city });
      } catch {
        if (active) setFailed(true);
      } finally {
        clearTimeout(timeout);
      }
    }
    locate();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const scene = useMemo(() => buildScene(rings, visitor), [rings, visitor]);
  const km = visitor ? Math.round(haversineKm(HOME, visitor)) : null;

  return (
    <article className="live-panel geo-panel" aria-label="Entfernung zwischen mir und dir">
      <div className="geo-map" aria-hidden="true">
        <svg className="geo-blueprint" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}>
          {scene.land && <path className="geo-land" d={scene.land} />}
          {scene.route && <path className="geo-route" d={scene.route} />}

          <circle className="geo-point-ring" cx={scene.home[0]} cy={scene.home[1]} r="9" />
          <circle className="geo-point" cx={scene.home[0]} cy={scene.home[1]} r="4" />
          {scene.guest && (
            <>
              <circle className="geo-point-ring geo-visitor" cx={scene.guest[0]} cy={scene.guest[1]} r="9" />
              <circle className="geo-point geo-visitor" cx={scene.guest[0]} cy={scene.guest[1]} r="4" />
            </>
          )}

          {scene.texts.map((t) => (
            <text key={t.cls + t.text} className={t.cls} x={t.x} y={t.y} textAnchor={t.anchor}>
              {t.text}
            </text>
          ))}

          <g className="geo-scale" transform={`translate(24 ${VIEW.h - 24})`}>
            <path d={`M0 0H${scene.scale.px.toFixed(1)} M0 -4V4 M${scene.scale.px.toFixed(1)} -4V4`} />
            <text className="geo-coordinate" x={scene.scale.px + 8} y="3">
              {scene.scale.km.toLocaleString("de-DE")} km
            </text>
          </g>
          <text className="geo-coordinate" x={VIEW.w - 28} y={VIEW.h - 20} textAnchor="end">
            MERCATOR · UMRISSE: NATURAL EARTH
          </text>
          <path className="geo-corners" d="M1 20V1H20 M460 1H479V20 M1 240V259H20 M460 259H479V240" />
        </svg>
      </div>
      <div className="geo-text">
        <div className="live-panel-head">
          <span className="live-panel-badge mono">Du &amp; ich</span>
          <span className={`live-dot${visitor ? " is-live" : ""}`} aria-hidden="true" />
        </div>
        {visitor ? (
          <p className="geo-sentence">
            Ich bin in <strong>Gelsenkirchen</strong>. Dein ungefährer Standort
            {visitor.city ? <> ist <strong>{visitor.city}</strong> und</> : ""} liegt{" "}
            <span className="geo-km">~{km.toLocaleString("de-DE")} km</span>{" "}
            Luftlinie entfernt.
          </p>
        ) : failed ? (
          <p className="geo-sentence">
            Ich bin in <strong>Gelsenkirchen</strong>. Deine Position lässt sich gerade nicht bestimmen.
          </p>
        ) : (
          <p className="geo-sentence dim mono">Ungefähre Entfernung wird ermittelt …</p>
        )}
        <p className="geo-note mono">
          Grobe Ortung über die IP: Mein Server kürzt sie und fragt damit ipwho.is an.
          Die Karte selbst lädt nichts nach — die Umrisse liegen hier.
        </p>
      </div>
    </article>
  );
}
