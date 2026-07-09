import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mein Standort (Gelsenkirchen), passend zu den Footer-Koordinaten.
const HOME = { lat: 51.5177, lng: 7.0857 };

const ACCENT = "oklch(66% 0.12 40)";
const GREEN = "oklch(68% 0.18 145)";

function haversineKm(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function DistanceCard() {
  const mapEl = useRef(null);
  const [visitor, setVisitor] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = mapEl.current;
    if (!el) return;

    const map = L.map(el, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    const dotStyle = (color) => ({
      radius: 5,
      color,
      weight: 2,
      fillColor: color,
      fillOpacity: 0.9,
    });
    L.circleMarker([HOME.lat, HOME.lng], dotStyle(ACCENT)).addTo(map);
    map.setView([HOME.lat, HOME.lng], 4);

    let cancelled = false;
    // Grobe Position über die IP des Besuchers, keine Browser-Berechtigung nötig.
    fetch("https://ipwho.is/")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data?.success || data.latitude == null) throw new Error("no geo");
        const pos = { lat: data.latitude, lng: data.longitude };
        L.circleMarker([pos.lat, pos.lng], dotStyle(GREEN)).addTo(map);
        L.polyline(
          [
            [HOME.lat, HOME.lng],
            [pos.lat, pos.lng],
          ],
          { color: ACCENT, weight: 1.5, dashArray: "4 6", opacity: 0.8 },
        ).addTo(map);
        map.fitBounds(
          L.latLngBounds([HOME.lat, HOME.lng], [pos.lat, pos.lng]),
          { padding: [28, 28], maxZoom: 9 },
        );
        setVisitor({
          city: data.city,
          km: Math.round(haversineKm(HOME, pos)),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      map.remove();
    };
  }, []);

  return (
    <article className="live-panel geo-panel" aria-label="Entfernung zwischen mir und dir">
      <div ref={mapEl} className="geo-map" aria-hidden="true" />
      <div className="geo-text">
        <div className="live-panel-head">
          <span className="live-panel-badge mono">Du &amp; ich</span>
          <span
            className={`live-dot${visitor ? " is-live" : ""}`}
            aria-hidden="true"
          />
        </div>
        {visitor ? (
          <p className="geo-sentence">
            Ich befinde mich in <strong>Gelsenkirchen</strong>, du gerade in{" "}
            <strong>{visitor.city}</strong>. Das sind{" "}
            <span className="geo-km">
              ~{visitor.km.toLocaleString("de-DE")} km
            </span>{" "}
            Luftlinie.
          </p>
        ) : failed ? (
          <p className="geo-sentence">
            Ich befinde mich in <strong>Gelsenkirchen</strong>. Deine Position
            lässt sich gerade nicht bestimmen.
          </p>
        ) : (
          <p className="geo-sentence dim mono">Wird geortet …</p>
        )}
      </div>
    </article>
  );
}
