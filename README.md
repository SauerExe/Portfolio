# vvashed.dev

Portfolio von [Timo Weiß](https://vvashed.dev) — Full-Stack Developer aus Gelsenkirchen, CTO bei [SimpleAct](https://simpleact.de).

![vvashed.dev](public/og.png)

Software, die im Betrieb läuft, nicht nur in der Demo: Die Statusleiste und die Karten im „Maschinenraum" zeigen Live-Daten von meiner eigenen Infrastruktur (Uptime Kuma, Spotify, IP-Geolocation).

## Stack

- **Frontend:** [Vite](https://vitejs.dev) + React, plain CSS mit Cascade Layers und OKLCH-Farben
- **Animation:** [GSAP](https://gsap.com) (ScrollTrigger) + [Lenis](https://lenis.darkroom.engineering) Smooth Scroll
- **Karte:** [Leaflet](https://leafletjs.com) mit CARTO-Dark-Tiles (lazy geladen)
- **API:** Serverless Functions unter `api/` (Vercel), im Dev über ein Vite-Plugin gespiegelt — dieselben Handler, keine doppelte Implementierung

## Lokal starten

```bash
npm install
cp .env.example .env   # Spotify-Credentials eintragen (optional)
npm run dev            # http://localhost:5173
```

Ohne `.env` laufen die Live-Karten im Fallback-Zustand, der Rest der Seite funktioniert normal.

```bash
npm run build          # Produktions-Build nach dist/
npm run preview        # Build lokal testen
```

## Prinzipien

- Kein Tracking, keine Cookies — gespeichert wird nur die Darstellungs-Einstellung, lokal im Browser
- Barrierefreiheit: Textgröße, Kontrast und Motion sind über das Panel unten rechts einstellbar
- `?static` in der URL deaktiviert Smooth Scroll und Scroll-Animationen (praktisch für Screenshots und Crawler)

## Deploy

Läuft als statischer Vite-Build mit Serverless Functions auf Vercel. Benötigte Env-Vars siehe [.env.example](.env.example).
