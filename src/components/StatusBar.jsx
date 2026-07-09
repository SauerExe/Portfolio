import { useEffect, useState } from "react";

/**
 * Persistente Statusleiste — läuft auf der gesamten Seite mit.
 * Zeigt Uptime und Now-Playing nebeneinander in Monospace.
 * Kein Card-Styling, kein Icon-Panel — liest sich wie ein beiläufiges Detail.
 *
 * uptimeUrl / spotifyUrl: echte Endpoints (kommen später).
 * Solange null → Platzhalterwerte.
 */
export default function StatusBar({ uptimeUrl = null, spotifyUrl = null }) {
  const [uptime, setUptime] = useState({ text: "Server: 47 Tage online", live: true });
  const [track, setTrack] = useState({ text: "Spotify: gerade nichts an", live: false });

  // Uptime polling (Uptime-Kuma-kompatible Antwortstruktur)
  useEffect(() => {
    if (!uptimeUrl) return;
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch(uptimeUrl, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!active) return;
        const days = data?.uptimeDays ?? data?.uptime_days ?? null;
        if (days !== null) {
          setUptime({ text: `Server: ${days} Tag${days !== 1 ? "e" : ""} online`, live: true });
        }
      } catch {}
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
