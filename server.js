// Produktions-Server für Self-Hosting (Coolify o.ä.): liefert den Vite-Build
// aus dist/ statisch aus und bedient /api/* mit denselben Handlern wie die
// Vercel-Functions unter api/_lib, damit keine zweite Implementierung
// entsteht, die auseinanderlaufen kann.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { getStatusPayload } from "./api/_lib/status.js";
import { getNowPlayingPayload } from "./api/_lib/spotify.js";
import { getGeoPayload } from "./api/_lib/geo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const routes = new Set(JSON.parse(readFileSync(path.join(distDir, "routes.json"), "utf8")));
// Keep Cloudflare from injecting analytics and JavaScript Detections into HTML.
// https://developers.cloudflare.com/web-analytics/faq/
const htmlCacheControl = "public, max-age=0, must-revalidate, no-transform";

const app = express();
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.set({
    "Strict-Transport-Security": "max-age=31536000",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    // React/GSAP use style attributes; scripts and style elements stay same-origin.
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline'; img-src 'self' https://i.scdn.co; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
  });
  next();
});

app.get("/api/status", async (req, res) => {
  try {
    const payload = await getStatusPayload();
    res.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    res.json(payload);
  } catch {
    res.json({ status: "unknown" });
  }
});

app.get("/api/spotify/now-playing", async (req, res) => {
  res.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
  try {
    res.json(await getNowPlayingPayload());
  } catch {
    res.json({ isPlaying: false, configured: false });
  }
});

app.get("/api/geo", async (req, res) => {
  // Antwort ist besucherspezifisch (Ortsangabe) — niemals cachen.
  res.set("Cache-Control", "no-store");
  try {
    const forwarded = req.headers["x-forwarded-for"];
    const ip =
      typeof forwarded === "string" && forwarded.length > 0
        ? forwarded.split(",")[0].trim()
        : req.socket?.remoteAddress;
    res.json(await getGeoPayload(ip));
  } catch {
    res.json({ success: false });
  }
});

app.use(express.static(distDir, {
  index: false, redirect: false, maxAge: "1h",
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) res.setHeader("Cache-Control", htmlCacheControl);
  },
}));

// Only known page routes receive their generated HTML. Missing assets and
// unknown API endpoints must never become successful HTML responses.
app.get(/^(?!\/api(?:\/|$))(?!.*\.[^/]+\/?$).*/, (req, res) => {
  res.set("Cache-Control", htmlCacheControl);
  const route = req.path.replace(/\/+$/, "") || "/";
  if (routes.has(route)) {
    res.sendFile(path.join(distDir, route, "index.html"));
  } else {
    res.set("X-Robots-Tag", "noindex").status(404).sendFile(path.join(distDir, "404.html"));
  }
});
app.use((req, res) => {
  res.status(404).type("text").send("Not found");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`vvashed.dev läuft auf Port ${server.address().port}`);
});
