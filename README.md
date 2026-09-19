# vvashed.dev

Portfolio von [Timo Weiß](https://vvashed.dev) — Full-Stack Developer aus Gelsenkirchen, CTO bei [SimpleAct](https://simpleact.de).

![vvashed.dev](public/og.png)

Software, die im Betrieb läuft, nicht nur in der Demo: Die Statusleiste und die Karten im „Maschinenraum" zeigen Live-Daten von meiner eigenen Infrastruktur (Uptime Kuma, Spotify, IP-Geolocation).

## Stack

- **Frontend:** [Vite](https://vitejs.dev) + React, plain CSS mit Cascade Layers und OKLCH-Farben
- **Animation:** [GSAP](https://gsap.com) (ScrollTrigger) + [Lenis](https://lenis.darkroom.engineering) Smooth Scroll
- **Standort:** eigene SVG-Karte (Mercator, Umrisse von [Natural Earth](https://www.naturalearthdata.com), `npm run geo:outlines`), ohne Kartenanbieter oder zusätzliche Bibliothek
- **API:** Serverless Functions unter `api/` (Vercel), im Dev über ein Vite-Plugin gespiegelt — dieselben Handler, keine doppelte Implementierung

## Lokal starten

```bash
npm install
cp .env.example .env   # Spotify-Credentials eintragen (optional)
npm run dev            # http://localhost:5173
```

Ohne `.env` laufen die Live-Karten im Fallback-Zustand, der Rest der Seite funktioniert normal.

```bash
npm run build          # Build + Seiten-Metadaten + Sitemap nach dist/
npm run preview        # Build lokal ansehen
npm run check:server   # HTTP-, SEO- und Fehlerfall-Prüfungen nach dem Build
```

## Prinzipien

- Kein Tracking, keine Cookies — gespeichert wird nur die Darstellungs-Einstellung, lokal im Browser
- Barrierefreiheit: Textgröße, Kontrast und Motion sind über das Panel unten rechts einstellbar
- `?static` in der URL deaktiviert Smooth Scroll und Scroll-Animationen (praktisch für Screenshots und Crawler)

## Deploy

Self-Hosting (Coolify): `npm run build` und `npm start`, alternativ das Dockerfile.
Der Express-Server liefert pro Route generiertes HTML mit eigenen SEO-Tags aus,
setzt Security-Header und antwortet für fehlende Dateien und unbekannte Seiten mit 404.
HTML wird mit `Cache-Control: no-transform` ausgeliefert, damit Cloudflare keine
Analytics- oder JavaScript-Detections-Skripte in die Seite einfügt.
Vercel verwendet dieselben generierten Seiten und die Header aus `vercel.json`.
Benötigte Env-Vars siehe [.env.example](.env.example).

Die Sitemap und HTML-Metadaten werden bei jedem Build aus `src/notes/posts.js`
und `src/data/seo.js` erzeugt. Neue Notizen brauchen keinen manuellen Sitemap-Eintrag.
Die Inhalts-Komponenten selbst werden weiterhin im Browser gerendert.
