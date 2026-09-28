import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Spiegelt in `npm run dev` dieselben Handler, die als Vercel-Serverless-
// Functions unter /api/* deployed werden, damit es keine zweite
// Implementierung gibt, die auseinanderlaufen kann.
function apiDevPlugin() {
  return {
    name: "local-api-routes",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.url === "/api/spotify/now-playing") {
            const { getNowPlayingPayload } = await import("./api/_lib/spotify.js");
            const payload = await getNowPlayingPayload();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
            return;
          }
          if (req.url === "/api/status") {
            const { getStatusPayload } = await import("./api/_lib/status.js");
            const payload = await getStatusPayload();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
            return;
          }
        } catch {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ isPlaying: false, status: "unknown" }));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Lädt .env-Werte ohne VITE_-Prefix in process.env, nur für den Node-Prozess
  // (vite.config.js + api/_lib/*), niemals ins Client-Bundle.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevPlugin()],
  };
});
