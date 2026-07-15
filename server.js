// Produktions-Server für Self-Hosting (Coolify o.ä.): liefert den Vite-Build
// aus dist/ statisch aus und bedient /api/* mit denselben Handlern wie die
// Vercel-Functions unter api/_lib, damit keine zweite Implementierung
// entsteht, die auseinanderlaufen kann.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getStatusPayload } from "./api/_lib/status.js";
import { getNowPlayingPayload } from "./api/_lib/spotify.js";
import { getGeoPayload } from "./api/_lib/geo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");

const app = express();
app.disable("x-powered-by");

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

app.use(express.static(distDir, { index: false, maxAge: "1h" }));

// Alles außer /api/* fällt auf die SPA zurück (Single-Page, keine Client-Routen
// außer Hash-Anker, daher reicht ein einfacher Fallback statt echtem Routing).
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`vvashed.dev läuft auf Port ${port}`);
});
