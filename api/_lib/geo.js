// Geo-Proxy für die „Du & ich"-Karte: Der Browser ruft ipwho.is nicht mehr
// direkt auf (dabei ginge die volle Besucher-IP an den Drittanbieter),
// sondern unsere eigene API. Der Server kürzt die IP (IPv4: letztes Oktett
// weg, IPv6: auf /48) und fragt erst mit der gekürzten IP bei ipwho.is an —
// der Dienst sieht damit weder den Browser noch die vollständige IP.
// Bewusst kein Cache: Besucher-IPs sollen hier nicht im Speicher liegen.
const GEO_TIMEOUT_MS = 5000;

function isPrivate(ip) {
  return (
    ip === "" ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    /^f[cd]/i.test(ip) ||
    /^fe80/i.test(ip)
  );
}

function maskIp(ip) {
  const v4 = ip.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}$/);
  if (v4) return `${v4[1]}.0`;
  if (ip.includes(":")) {
    const groups = ip.split(":").filter(Boolean);
    if (groups.length < 3) return null;
    return `${groups.slice(0, 3).join(":")}::`;
  }
  return null;
}

export async function getGeoPayload(clientIp) {
  const ip = String(clientIp || "").trim().replace(/^::ffff:/, "");
  const masked = isPrivate(ip) ? null : maskIp(ip);
  // Ohne brauchbare Client-IP (lokale Entwicklung hinter Loopback) ortet
  // ipwho.is die ausgehende Server-IP — reicht als Dev-Fallback.
  const url = masked ? `https://ipwho.is/${masked}` : "https://ipwho.is/";

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(GEO_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`ipwho.is responded ${res.status}`);
    const data = await res.json();
    if (!data?.success || data.latitude == null) return { success: false };
    // Nur das Nötigste zurückgeben, nicht die komplette Drittanbieter-Antwort.
    return {
      success: true,
      city: data.city ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch {
    return { success: false };
  }
}
