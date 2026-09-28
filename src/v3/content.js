// Inhalte der v3-Startseite (Claude-Design „vvashed Portfolio v3").
// Bewusst eigene, gestraffte Texte — Unterseiten und Notizen lesen
// weiterhin aus src/data/content.js.

export const EMAIL = "contact@vvashed.dev";
export const GITHUB = "https://github.com/SauerExe";

export const marqueeItems = [
  "Next.js",
  "TypeScript",
  "C# / .NET",
  "EF Core",
  "Lokale KI",
  "Automationen",
  "Infrastruktur",
  "Self-hosted",
];

export const replayHaven = {
  icon: "/images/projekte/replayhaven/icon-192.png",
  screenshot: "/images/projekte/replayhaven/app-home.jpg",
  url: "https://replayhaven.vvashed.dev",
  repo: "https://github.com/SauerExe/ReplayHaven",
};

export const projects = [
  {
    title: "SimpleAct",
    context: "Mitgründer / CTO · B2B EU-AI-Act-Compliance",
    status: "In Betrieb",
    live: true,
    screenshot: "/images/projekte/simpleact/screenshot.webp",
    desc: "Der EU AI Act verpflichtet Unternehmen, ihre KI-Systeme zu klassifizieren und zu dokumentieren. SimpleAct erfasst die Systeme strukturiert, ordnet sie nach Risikoklassen ein und erzeugt daraus konkrete Compliance-Aufgaben.",
    outcome: "In Betrieb. Produktarchitektur, Plattform und Automatisierung liegen seit Gründung bei mir.",
    tech: ["Next.js", "TypeScript", "Supabase", "n8n"],
    url: "https://simpleact.de",
  },
  {
    title: "Gewinnspiel-Plattform für die Stadtverwaltung",
    context: "Entwicklung im Anstellungsverhältnis",
    status: "Im Regelbetrieb",
    live: true,
    screenshot: "/images/projekte/admin-kommune/mockup.svg",
    caption: "Schematische Darstellung · Inhalte aus Vertraulichkeit unkenntlich",
    secret: true,
    desc: "Gewinnspiele liefen über manuell gepflegte Listen: fehleranfällig, ohne Auswertung, ohne Rechteverwaltung. Authentifizierung jetzt per JWT gegen das bestehende LDAP — niemand braucht ein zusätzliches Passwort.",
    outcome: "Seit Übergabe im Regelbetrieb: bisher zwei Gewinnspiele mit rund 1.000 Teilnehmern, Tendenz wachsend.",
    tech: [".NET 10", "EF Core", "JWT / LDAP", "Next.js"],
  },
  {
    title: "Sommerfrische",
    context: "Eigenes Projekt · Gruppenurlaub-Planer ohne Accounts",
    status: "Live",
    live: true,
    screenshot: "/images/projekte/sommerfrische/screenshot.webp",
    desc: "Ein gemeinsamer Urlaub scheitert selten am Ziel, sondern an neun Kalendern und neun Budgets. Sommerfrische rechnet daraus die besten Zeiträume, ein Zielranking und die Budget-Schnittmenge aus — geteilt per Link.",
    outcome: "Live und ohne Account direkt ausprobierbar. Rechte hängen am Link statt am Account.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Redis / Upstash"],
    url: "https://urlaub.vvashed.dev",
  },
  {
    title: "Habitaz",
    context: "Ferienwohnungen · Gelsenkirchen & Haltern am See",
    status: "In Entwicklung",
    live: false,
    screenshot: "/images/projekte/habitaz/screenshot.webp",
    caption: "Entwicklungsstand · Vorschau vor dem Launch",
    desc: "Verfügbarkeiten und Reservierungen liegen bereits in Smoobu, gebucht werden soll trotzdem über eine eigene Seite — mit einer gemeinsamen Buchungsstrecke für beide Standorte.",
    outcome: "In Entwicklung — der Eintrag bekommt mit dem Launch den Live-Link.",
    tech: ["Next.js", "TypeScript", "Smoobu API"],
  },
];

export const skillGroups = [
  {
    label: "Interface",
    claim: "Web-Plattformen mit Next.js und TypeScript, klar strukturiert und schnell.",
    items: [
      ["TypeScript / JavaScript", "typsicher, ohne Ballast"],
      ["React / Next.js", "Full-Stack-React, SSR & RSC"],
      ["Tailwind CSS", "konsistentes, schnelles Styling"],
      ["Motion", "Scroll- & UI-Animationen"],
    ],
  },
  {
    label: "Backend & Daten",
    claim: "Die Schicht dahinter: APIs, Datenmodelle, Auth-Flows.",
    items: [
      ["C# / .NET 10", "Web APIs, Anwendungsentwicklung"],
      ["EF Core", "Datenzugriff und Migrationen"],
      ["JWT / LDAP", "Auth gegen bestehende Systeme"],
      ["Supabase · Redis", "Datenbank, Auth, Key-Value"],
      ["Node.js · SQLite", "Backend von ReplayHaven"],
    ],
  },
  {
    label: "Infrastruktur & Automation",
    claim: "Eigener Betrieb statt Managed-Abhängigkeit, vom Server bis zum Deploy.",
    items: [
      ["TrueNAS", "zentrale Storage-Basis"],
      ["Coolify · Docker", "Container-Deployments"],
      ["n8n", "Workflow-Automatisierung"],
      ["Cloudflare Tunnel", "Zugriff ohne offene Ports"],
      ["Authelia", "zentrale Zugriffskontrolle"],
    ],
  },
  {
    label: "Lokale KI & Werkzeuge",
    claim: "Lokale Modelle statt Cloud-API, dazu die Werkzeuge für den Alltag.",
    items: [
      ["Ollama", "Vision-Modelle lokal auf der GPU"],
      ["OCR · Speech-to-Text", "PaddleOCR, Parakeet"],
      ["Git & GitHub", "offener Quellcode, CI"],
      ["Claude", "KI-gestützte Entwicklung"],
    ],
  },
];

export const buildPath = [
  ["2018", "Erste Zeilen Code", "Spieleentwicklung mit Unity, gelernt über YouTube und eigene Projekte."],
  ["2023", "Ausbildung Fachinformatiker Anwendungsentwicklung", "Schwerpunkt Web- und Backend-Entwicklung mit C#/.NET und TypeScript."],
  ["2025", "Mitgründung SimpleAct, CTO", "EU-AI-Act-Compliance-SaaS: Produktarchitektur, Plattform, Automatisierung."],
  ["2026", "Gewinnspiel-Plattform für die Stadtverwaltung", "Konzeption und Entwicklung bis in den Regelbetrieb, mit .NET 10, EF Core und Next.js."],
  ["Juli 2026", "Ausbildung abgeschlossen", "Seitdem fest angestellt bei der gkd-el, daneben CTO-Rolle und eigene Server-Infrastruktur."],
  ["Sep 2026", "ReplayHaven veröffentlicht", "Selbst gehostetes Clip-Archiv mit lokaler KI: Windows-Client, Docker-Server und Web-Bibliothek. Der Quellcode liegt auf GitHub."],
];

export const principles = [
  ["Vorführen statt behaupten", "Die Statusleiste oben zeigt echte Daten meiner eigenen Server. Fällt dort etwas aus, ist es hier zuerst sichtbar."],
  ["Quellcode offen", "Diese Seite und ReplayHaven liegen öffentlich auf GitHub — inklusive der Commits, in denen ich Dinge wieder verworfen habe."],
  ["Eigene Infrastruktur", "TrueNAS, Coolify und n8n laufen auf eigenen Servern. Fällt etwas aus, löse ich es selbst — dadurch kenne ich den Stack bis zur untersten Schicht."],
  ["Kein Tracking, keine Cookies", "Diese Seite zählt keine Besucher und setzt keine Cookies."],
  ["Offene Punkte offen benennen", "Was nicht fertig ist, wird auch so benannt. Ein sichtbarer offener Punkt ist mir lieber als eine stille Lücke."],
  ["Erst verstehen, dann automatisieren", "Bevor ich einen Ablauf automatisiere, will ich ihn einmal von Hand gemacht haben."],
];
