import { useEffect, useState } from "react";

/**
 * Persistente Statusleiste, läuft auf der gesamten Seite mit.
 * Zeigt Server-Status und Now-Playing nebeneinander in Monospace.
 * Beide Werte kommen von den echten API-Endpoints (/api/*),
 * bis zur ersten Antwort steht ein neutraler Platzhalter da.
 */
const STATUS_TEXT = {
  operational: "Server: online",
  degraded: "Server: eingeschränkt",
  down: "Server: down",
  maintenance: "Server: Wartung",
  unknown: "Server: unbekannt",
};

export default function StatusBar({
  uptimeUrl = "/api/status",
  spotifyUrl = "/api/spotify/now-playing",
}) {
  const [uptime, setUptime] = useState({ text: "Server: …", live: false });
  const [track, setTrack] = useState({ text: "Spotify: gerade nichts an", live: false });

  // Server-Status (Uptime-Kuma-Proxy unter /api/status)
  useEffect(() => {
    if (!uptimeUrl) return;
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch(uptimeUrl, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!active) return;
        const status = data?.status ?? "unknown";
        let text = STATUS_TEXT[status] ?? STATUS_TEXT.unknown;
        if (status === "operational" && data?.uptime24h != null) {
          text = `Server: online · ${(data.uptime24h * 100).toFixed(1)}% (24h)`;
        }
        setUptime({ text, live: status === "operational" });
      } catch {
        if (active) setUptime({ text: STATUS_TEXT.unknown, live: false });
      }
    };
    poll();
    const id = setInterval(poll, 60_000);
    return () => { active = false; clearInterval(id); };
  }, [uptimeUrl]);

  // Spotify Now Playing
  useEffect(() => {
    if (!spotifyUrl) return;
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch(spotifyUrl, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!active) return;
        if (data?.isPlaying && data?.title) {
          setTrack({ text: `${data.title} – ${data.artist}`, live: true });
        } else {
          setTrack({ text: "Spotify: gerade nichts an", live: false });
        }
      } catch {}
    };
    poll();
    const id = setInterval(poll, 30_000);
    return () => { active = false; clearInterval(id); };
  }, [spotifyUrl]);

  return (
    <div className="statusbar" role="status" aria-label="Systemstatus">
      <div className="statusbar-inner">
        <span className="statusbar-item statusbar-item--live">
          {uptime.live && <span className="statusbar-dot" aria-hidden="true" />}
          <span>{uptime.text}</span>
        </span>
        <span className="statusbar-sep" aria-hidden="true">·</span>
        <span className="statusbar-item">
          {track.live && <span aria-hidden="true">♫</span>}
          <span>{track.text}</span>
        </span>
      </div>
    </div>
  );
}
