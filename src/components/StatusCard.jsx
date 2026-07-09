import { usePolling } from "../hooks/usePolling.js";

const STATUS_LABEL = {
  operational: "Betriebsbereit",
  degraded: "Eingeschränkt",
  down: "Ausgefallen",
  maintenance: "Wartung",
  unknown: "Unbekannt",
};

const STATUS_COLOR = {
  operational: "#4bbf5e",
  degraded: "#f5b942",
  down: "#ff5a5a",
  maintenance: "#a15bff",
  unknown: "var(--ink-faint)",
};

function buildSparkline(values, width, height) {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  return values
    .map((value, i) => {
      const x = i * step;
      const y = height - ((value - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function StatusCard() {
  const { data, loading, error } = usePolling("/api/status", 60000);
  const status = data?.status ?? "unknown";
  const pageUrl = data?.pageUrl || "https://status.vvashed.dev/status/vvashed";
  const uptimeLabel =
    data?.uptime24h == null ? "—" : (data.uptime24h * 100).toFixed(data.uptime24h >= 0.99 ? 2 : 1);
  const sparkPath = buildSparkline(data?.pings ?? [], 100, 24);

  return (
    <a
      href={pageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="live-panel status-panel"
      aria-label={`Server-Status: ${STATUS_LABEL[status]}`}
    >
      <div className="live-panel-head">
        <span className="live-panel-badge mono">Server-Status</span>
        <span
          className={`live-dot${status === "operational" ? " is-live" : ""}`}
          style={{ background: STATUS_COLOR[status] }}
          aria-hidden="true"
        />
      </div>
      {loading && !data ? (
        <p className="live-panel-empty mono dim">Lädt …</p>
      ) : (
        <>
          <p className="status-state mono" style={{ color: STATUS_COLOR[status] }}>
            {error ? "Nicht erreichbar" : STATUS_LABEL[status]}
          </p>
          <div className="status-metrics">
            <div className="status-metric">
              <span className="status-metric-value">
                {uptimeLabel}
                <span className="status-metric-unit">%</span>
              </span>
              <span className="status-metric-label mono dim">Uptime 24h</span>
            </div>
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="status-spark" aria-hidden="true">
              {sparkPath && (
                <path d={sparkPath} fill="none" stroke="var(--scene-accent)" strokeWidth="2" />
              )}
            </svg>
            {data?.ping != null && <span className="status-ping mono dim">{data.ping} ms</span>}
          </div>
        </>
      )}
    </a>
  );
}
