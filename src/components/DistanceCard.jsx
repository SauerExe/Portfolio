import { useEffect, useState } from "react";

const HOME = { lat: 51.5177, lng: 7.0857 };

function haversineKm(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) *
    Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, h))));
}

export default function DistanceCard() {
  const [visitor, setVisitor] = useState(null);
  const [failed, setFailed] = useState(false);

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
        if (active) setVisitor({ city: data.city, km: Math.round(haversineKm(HOME, pos)) });
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

  return (
    <article className="live-panel geo-panel" aria-label="Entfernung zwischen mir und dir">
      <div className="geo-map" aria-hidden="true">
        <svg className="geo-blueprint" viewBox="0 0 480 260">
          <path className="geo-axis" d="M0 130H480 M120 0V260 M360 0V260" />
          <circle className="geo-orbit" cx="120" cy="146" r="68" />
          <circle className="geo-orbit" cx="120" cy="146" r="104" />
          {visitor && <path className="geo-route" d="M120 146C204 146 222 94 360 94" />}
          <circle className="geo-point-ring" cx="120" cy="146" r="12" />
          <circle className="geo-point" cx="120" cy="146" r="5" />
          <text className="geo-label" x="30" y="196">GELSENKIRCHEN</text>
          <text className="geo-coordinate" x="30" y="216">51.5177° N / 7.0857° E</text>
          {visitor && <>
            <circle className="geo-point-ring geo-visitor" cx="360" cy="94" r="12" />
            <circle className="geo-point geo-visitor" cx="360" cy="94" r="5" />
            <text className="geo-label" x="360" y="58" textAnchor="middle">DU</text>
            <text className="geo-distance" x="290" y="176" textAnchor="middle">
              ~{visitor.km.toLocaleString("de-DE")} KM
            </text>
          </>}
          <text className="geo-coordinate" x="450" y="242" textAnchor="end">SCHEMATISCH / NICHT MASSSTABSGETREU</text>
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
            <span className="geo-km">~{visitor.km.toLocaleString("de-DE")} km</span>{" "}
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
          Die Skizze ist nicht maßstabsgetreu.
        </p>
      </div>
    </article>
  );
}
