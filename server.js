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
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    // React/GSAP use style attributes; scripts and style elements stay same-origin.
    "Content-Security-Policy": "default-src 'self'; script-src 'self' https://zahlen.vvashed.dev; style-src 'self'; style-src-attr 'unsafe-inline'; img-src 'self' https://i.scdn.co; font-src 'self' data:; connect-src 'self' https://zahlen.vvashed.dev; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
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

// Gehashte Assets sind unveränderlich: lange TTL, damit Browser und
// Cloudflare-Edge sie über einen Deploy hinweg behalten. Beim Rolling-Update
// beantwortet sonst der alte Container kurz Anfragen nach dem neuen CSS
// mit 404 — und die Seite steht unstyled da.
const assetsDir = path.join(distDir, "assets") + path.sep;
app.use(express.static(distDir, {
  index: false, redirect: false, maxAge: "1h",
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) res.setHeader("Cache-Control", htmlCacheControl);
    else if (filePath.startsWith(assetsDir)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
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
    res.set({ "X-Robots-Tag": "noindex", "Cache-Control": "no-store" });
    res.status(404).sendFile(path.join(distDir, "404.html"));
  }
});
// 404 nie cachen: Cloudflare hält Fehlerantworten sonst minutenlang im Edge —
// ein während des Deploys fehlendes Asset bliebe dann "fehlend".
app.use((req, res) => {
  res.set("Cache-Control", "no-store").status(404).type("text").send("Not found");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`vvashed.dev läuft auf Port ${server.address().port}`);
});
