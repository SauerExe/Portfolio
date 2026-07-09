import { useEffect, useState } from "react";
import { usePolling } from "../hooks/usePolling.js";

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function NowPlayingCard() {
  const { data, loading } = usePolling("/api/spotify/now-playing", 30000);
  const [progress, setProgress] = useState(0);
  const isPlaying = Boolean(data?.isPlaying);

  useEffect(() => {
    if (!isPlaying) {
      setProgress(data?.progressMs ?? 0);
      return;
    }
    setProgress(data.progressMs ?? 0);
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1000, data.durationMs ?? prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [data?.progressMs, isPlaying, data?.durationMs]);

  const duration = data?.durationMs || 1;
  const progressPercent = Math.min((progress / duration) * 100, 100);
  const href = data?.songUrl || "https://open.spotify.com/";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="live-panel spotify-panel"
      aria-label={isPlaying ? `Spotify — ${data.title} von ${data.artist}` : "Spotify"}
    >
      <div className="live-panel-head">
        <span className="live-panel-badge mono">Spotify</span>
        <span className={`live-dot${isPlaying ? " is-live" : ""}`} aria-hidden="true" />
      </div>
      {loading ? (
        <p className="live-panel-empty mono dim">Lädt …</p>
      ) : !isPlaying ? (
        <p className="live-panel-empty mono dim">Gerade nichts am Laufen</p>
      ) : (
        <>
          <div className="spotify-track">
            {data.albumImageUrl && (
              <img src={data.albumImageUrl} alt="" className="spotify-art" loading="lazy" />
            )}
            <div className="spotify-track-info">
              <span className="spotify-title">{data.title}</span>
              <span className="spotify-artist mono dim">{data.artist}</span>
            </div>
          </div>
          <div className="live-progress">
            <span className="live-progress-track">
              <span className="live-progress-fill" style={{ width: `${progressPercent}%` }} />
            </span>
            <span className="live-progress-time mono">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>
        </>
      )}
    </a>
  );
}
