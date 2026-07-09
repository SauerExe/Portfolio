// Portiert 1:1 aus dem alten vvashed.dev-Status-Proxy (app/api/status/route.ts):
// Uptime Kumas öffentliche Status-Seite liefert JSON, aber ohne CORS-Header,
// der Browser kann sie also nicht direkt lesen. Wir proxyen, normalisieren
// die Antwort und cachen sie kurz, um den Status-Host nicht zu bombardieren.
const STATUS_BASE_URL = (process.env.STATUS_PAGE_BASE_URL || "https://status.vvashed.dev").replace(
  /\/+$/,
  "",
);
const STATUS_SLUG = process.env.STATUS_PAGE_SLUG || "vvashed";
const PUBLIC_PAGE_URL = `${STATUS_BASE_URL}/status/${STATUS_SLUG}`;

const CACHE_DURATION = 60 * 1000;
let cache = null;

// Uptime-Kuma-Heartbeat-Statuscodes
const STATUS_DOWN = 0;
const STATUS_UP = 1;
const STATUS_PENDING = 2;
const STATUS_MAINTENANCE = 3;

function mapStatus(code) {
  switch (code) {
    case STATUS_UP:
      return "operational";
    case STATUS_DOWN:
      return "down";
    case STATUS_PENDING:
      return "degraded";
    case STATUS_MAINTENANCE:
      return "maintenance";
    default:
      return "unknown";
  }
}

function aggregateStatus(statuses) {
  if (statuses.length === 0) return "unknown";
  if (statuses.some((s) => s === "down")) {
    return statuses.every((s) => s === "down") ? "down" : "degraded";
  }
  if (statuses.some((s) => s === "maintenance")) return "maintenance";
  if (statuses.some((s) => s === "degraded")) return "degraded";
  if (statuses.every((s) => s === "operational")) return "operational";
  return "unknown";
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Status host responded ${res.status} for ${url}`);
  return res.json();
}

export async function getStatusPayload() {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  try {
    const [heartbeat, config] = await Promise.all([
      fetchJson(`${STATUS_BASE_URL}/api/status-page/heartbeat/${STATUS_SLUG}`),
      fetchJson(`${STATUS_BASE_URL}/api/status-page/${STATUS_SLUG}`).catch(() => null),
    ]);

    const heartbeatList = heartbeat?.heartbeatList ?? {};
    const uptimeList = heartbeat?.uptimeList ?? {};

    const nameById = new Map();
    const groups = config?.publicGroupList ?? [];
    for (const group of groups) {
      for (const monitor of group?.monitorList ?? []) {
        if (typeof monitor?.id === "number") {
          nameById.set(monitor.id, monitor?.name ?? `Monitor ${monitor.id}`);
        }
      }
    }

    const monitors = Object.entries(heartbeatList).map(([idStr, beats]) => {
      const id = Number(idStr);
      const last = beats?.[beats.length - 1];
      const uptimeRaw = uptimeList[`${id}_24`];
      return {
        id,
        name: nameById.get(id) ?? config?.config?.title ?? `Monitor ${id}`,
        status: mapStatus(last?.status),
        uptime24h: typeof uptimeRaw === "number" ? uptimeRaw : null,
        ping: typeof last?.ping === "number" ? last.ping : null,
      };
    });

    const uptimes = monitors.map((m) => m.uptime24h).filter((u) => typeof u === "number");
    const uptime24h = uptimes.length > 0 ? uptimes.reduce((a, b) => a + b, 0) / uptimes.length : null;

    const longestSeries = Object.values(heartbeatList).sort(
      (a, b) => (b?.length ?? 0) - (a?.length ?? 0),
    )[0];
    const pings = (longestSeries ?? [])
      .map((beat) => beat?.ping)
      .filter((p) => typeof p === "number")
      .slice(-24);

    const latestPings = monitors.map((m) => m.ping).filter((p) => typeof p === "number");
    const ping =
      latestPings.length > 0
        ? Math.round(latestPings.reduce((a, b) => a + b, 0) / latestPings.length)
        : null;

    const status = aggregateStatus(monitors.map((m) => m.status));

    const payload = {
      status,
      uptime24h,
      ping,
      pings,
      monitors,
      pageUrl: PUBLIC_PAGE_URL,
      updatedAt: new Date().toISOString(),
    };

    cache = { data: payload, timestamp: Date.now() };
    return payload;
  } catch {
    if (cache) {
      return { ...cache.data, stale: true };
    }
    return {
      status: "unknown",
      uptime24h: null,
      ping: null,
      pings: [],
      monitors: [],
      pageUrl: PUBLIC_PAGE_URL,
      updatedAt: new Date().toISOString(),
    };
  }
}
