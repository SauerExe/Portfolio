// Content für vvashed.dev / Timo Weiß.
// Struktur (Feldnamen, Shapes) stammt aus der Nowak-Development-Referenz,
// die Inhalte hier sind vollständig aus dem vvashed.dev-Repo übernommen.

export const profile = {
  name: "Timo Weiß",
  role: "Full-Stack Developer · CTO SimpleAct",
  email: "contact@vvashed.dev",
  github: "https://github.com/SauerExe",
};

export const marqueeItems = [
  "Next.js",
  "TypeScript",
  "C# / .NET",
  "EF Core",
  "Automationen",
  "Infrastruktur",
];

export const projects = [
  {
    title: "SimpleAct",
    slug: "simpleact",
    type: "SaaS",
    status: "In Betrieb",
    context: "Mitgründer / CTO · B2B EU-AI-Act-Compliance",
    shortDescription:
      "Der EU AI Act verpflichtet Unternehmen, ihre KI-Systeme zu klassifizieren und zu dokumentieren. Für Nicht-Juristen ist das kaum zu durchdringen. SimpleAct erfasst die Systeme strukturiert, ordnet sie nach Risikoklassen ein und erzeugt daraus konkrete Compliance-Aufgaben.",
    role: "Architektur, Plattform, Automatisierung",
    technologies: ["Next.js", "TypeScript", "Supabase", "n8n"],
    liveUrl: "https://simpleact.de",
    screenshot: "/images/projekte/simpleact/screenshot.webp",
    highlights: [
      "Risikoeinordnung als strukturierter, automatisierter Prozess statt manueller Rechtsprüfung — aus der Einstufung entstehen direkt konkrete Compliance-Aufgaben",
      "Go-Live-Gate: Ein Tenant geht erst live, wenn Pflichtdokumente nachweislich vollständig sind, nicht nur angelegt",
    ],
    outcome:
      "In Betrieb. Produktarchitektur, Plattform und Automatisierung liegen seit Gründung bei mir.",
    // noteSlugs: Notizen (src/notes), die Entscheidungen aus diesem Projekt
    // dokumentieren — werden im Panel als Beleg-Links gerendert.
    noteSlugs: ["go-live-gate"],
  },
  {
    title: "Gewinnspiel-Anwendung für die Stadtverwaltung",
    slug: "admin-kommune",
    type: "Web-App",
    status: "Im Regelbetrieb",
    context: "Entwicklung im Anstellungsverhältnis",
    shortDescription:
      "Gewinnspiele liefen in der Stadtverwaltung über manuell gepflegte Listen: fehleranfällig, ohne Auswertung, ohne Rechteverwaltung.",
    role: "Konzeption, Entwicklung",
    technologies: [".NET 10", "EF Core", "JWT / LDAP", "Next.js"],
    screenshot: "/images/projekte/admin-kommune/mockup.svg",
    mediaCaption: "Schematische Darstellung · kein Produkt-Screenshot",
    highlights: [
      "Kein neues Nutzerverzeichnis: Authentifizierung per JWT gegen das bestehende LDAP der Verwaltung — niemand braucht ein zusätzliches Passwort",
      "Was vorher Handarbeit war, macht jetzt die Plattform: Auswertung und Rechteverwaltung inklusive, die manuell gepflegte Liste entfällt",
      ".NET 10 Web API mit EF Core als Backend, Admin-Oberfläche in Next.js",
    ],
    outcome:
      "Läuft seit Übergabe im Regelbetrieb der Kommune: bisher zwei Gewinnspiele mit rund 1.000 Teilnehmern, Tendenz wachsend. Das abgelöste Alt-System zählte in zwei Jahren 65.000 Unique-Teilnehmer — die Größenordnung, in der die Plattform gedacht ist.",
  },
  {
    title: "Habitaz",
    slug: "habitaz",
    type: "Website / Booking",
    status: "In Entwicklung",
    context: "Ferienwohnungen · Gelsenkirchen & Haltern am See",
    shortDescription:
      "Ferienwohnungen an zwei Standorten, Gelsenkirchen und Haltern am See — Verfügbarkeiten und Reservierungen liegen bereits in Smoobu, gebucht werden soll trotzdem über eine eigene Seite.",
    role: "Konzept, Design, Entwicklung",
    technologies: ["Next.js", "TypeScript", "Smoobu API"],
    screenshot: "/images/projekte/habitaz/screenshot.webp",
    mediaCaption: "Entwicklungsstand · Vorschau vor dem Launch",
    highlights: [
      "Eine gemeinsame Buchungsstrecke für beide Standorte",
      "Verfügbarkeiten und Buchungen kommen live aus der Smoobu-API statt aus einer zweiten Datenhaltung",
    ],
    outcome:
      "In Entwicklung — der Eintrag hier bekommt mit dem Launch den Live-Link.",
  },
  {
    title: "Sommerfrische",
    slug: "sommerfrische",
    type: "Web-App",
    status: "Live",
    context: "Eigenes Projekt · Gruppenurlaub-Planer ohne Accounts",
    shortDescription:
      "Ein gemeinsamer Urlaub scheitert selten am Ziel, sondern an neun Kalendern und neun Budgets. Sommerfrische fragt beides ab — mögliche Tage, Wunschziele, Unter- und Obergrenze, Reisestil — und rechnet daraus die besten Zeiträume, ein Zielranking, die Budget-Schnittmenge und alle Blockaden aus. Geteilt wird per Link, ohne Account.",
    role: "Konzept, Design, Entwicklung",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Redis / Upstash"],
    liveUrl: "https://urlaub.vvashed.dev",
    screenshot: "/images/projekte/sommerfrische/screenshot.webp",
    // Breiter als die 16:10 der anderen Screenshots — Maße mitgeben, damit
    // der Platz vor dem Laden stimmt.
    mediaSize: { w: 1600, h: 768 },
    highlights: [
      "Zeiträume werden gewichtet bewertet: wer mitkann, wie gut die Tage passen, ob die Wunschdauer hält",
      "Rechte hängen am Link statt am Account — der Organisator-Schlüssel verlässt die öffentliche API nie",
      "Ein Speicher-Interface, drei Backends: Upstash über REST, Redis über TCP, lokal eine JSON-Datei",
    ],
    outcome:
      "Live und ohne Account direkt ausprobierbar. Die Entscheidungen dahinter sind in drei Notizen dokumentiert.",
    noteSlugs: [
      "kein-login-trotzdem-rechte",
      "einen-tag-zu-frueh",
      "fallback-der-auf-vercel-nicht-geht",
    ],
  },
];

// vvashed.dev v1 ist bewusst kein Projekt-Eintrag mehr (Meta-Referenz, kein
// Kundenprojekt) — der Verweis lebt als Randnotiz im Footer weiter.
export const previousVersion = {
  label: "Frühere Version dieser Seite ↗",
  url: "https://v1.vvashed.dev",
};

export const skillGroups = [
  {
    id: "frontend",
    label: "Interface",
    claim: "Web-Plattformen mit Next.js und TypeScript, klar strukturiert und schnell.",
    items: [
      { name: "TypeScript / JavaScript", note: "typsicher, ohne Ballast" },
      { name: "React / Next.js", note: "Full-Stack-React, SSR & RSC" },
      { name: "Tailwind CSS", note: "konsistentes, schnelles Styling" },
      { name: "Motion", note: "Scroll- & UI-Animationen" },
    ],
    usedFor: "SimpleAct, Sommerfrische, der Gewinnspiel-Admin — alle oben unter Projekte",
  },
  {
    id: "backend",
    label: "Backend & Daten",
    claim: "Die Schicht dahinter: APIs, Datenmodelle, Auth-Flows.",
    items: [
      { name: "C# / .NET 10", note: "Web APIs, Anwendungsentwicklung" },
      { name: "EF Core", note: "Datenzugriff und Migrationen" },
      { name: "JWT / LDAP", note: "Auth gegen bestehende Systeme" },
      { name: "Supabase", note: "Datenbank & Auth als Service" },
      { name: "Redis", note: "Key-Value-Speicher, REST wie TCP" },
      { name: "zod", note: "Validierung an API-Grenzen" },
    ],
    usedFor: "Von der .NET-API der Gewinnspiel-Anwendung bis zum Redis-Speicher von Sommerfrische",
  },
  {
    id: "infra",
    label: "Infrastruktur & Automation",
    claim: "Eigener Betrieb statt Managed-Abhängigkeit, vom Server bis zum Deploy.",
    items: [
      { name: "TrueNAS", note: "zentrale Storage-Basis" },
      { name: "Coolify", note: "Container-Deployments" },
      { name: "n8n", note: "Workflow-Automatisierung" },
      { name: "Cloudflare Tunnel", note: "Zugriff ohne offene Ports" },
      { name: "Authelia", note: "zentrale Zugriffskontrolle" },
    ],
    usedFor: "Deployments und Automatisierung — auch diese Seite läuft auf eigenen Servern",
  },
  {
    id: "tools",
    label: "Werkzeuge",
    claim: "Das Fundament, mit dem aus Code ein laufendes System wird.",
    items: [
      { name: "Git & GitHub", note: "Versionierung, offener Quellcode" },
      { name: "Vercel", note: "Deployment für Next.js-Projekte" },
      { name: "Claude / KI-gestützte Entwicklung", note: "als Werkzeug im täglichen Workflow" },
    ],
    usedFor: "Jedes Projekt, vom ersten Commit bis live",
  },
];

export const buildPath = [
  {
    period: "2018",
    title: "Erste Zeilen Code",
    text: "Spieleentwicklung mit Unity, gelernt über YouTube und eigene Projekte.",
  },
  {
    period: "2023",
    title: "Ausbildung Fachinformatiker Anwendungsentwicklung",
    text: "Schwerpunkt Web- und Backend-Entwicklung mit C#/.NET und TypeScript.",
  },
  {
    period: "2025",
    title: "Mitgründung SimpleAct, CTO",
    text: "EU-AI-Act-Compliance-SaaS: Produktarchitektur, Plattform, Automatisierung.",
  },
  {
    period: "2026",
    title: "Gewinnspiel-Anwendung für die Stadtverwaltung",
    text: "Konzeption und Entwicklung bis in den Regelbetrieb, mit .NET 10, EF Core und Next.js.",
  },
  {
    period: "Juli 2026",
    title: "Ausbildung abgeschlossen",
    text: "Seitdem fest angestellt bei der gkd-el, daneben CTO-Rolle und Betrieb eigener Server-Infrastruktur.",
  },
];

// Jedes Prinzip mit optionalem Beleg: ein Link zu der Stelle auf
// dieser Seite (oder extern), die die Aussage einlöst — "vorführen
// statt behaupten" gilt auch für die eigene Arbeitsweise-Liste.
export const principles = [
  {
    title: "Vorführen statt behaupten",
    text: "Die Statusleiste oben zeigt echte Daten von meinen eigenen Servern. Wenn dort etwas ausfällt, sieht man es auf dieser Seite zuerst.",
    proof: { href: "#top", label: "Statusleiste ansehen" },
  },
  {
    title: "Quellcode offen",
    text: "Diese Seite liegt komplett öffentlich auf GitHub, inklusive der Commits, in denen ich Sachen wieder rausgeworfen habe.",
    proof: { href: profile.github, label: "Quelltext auf GitHub", external: true },
  },
  {
    title: "Eigene Infrastruktur",
    text: "TrueNAS, Coolify und n8n laufen auf meinen eigenen Servern. Es gibt keinen Support, den ich anrufen kann, und genau das ist der Punkt.",
    proof: { href: "#skills", label: "Stack ansehen" },
  },
  {
    title: "JavaScript nur wo nötig",
    text: "Animationen laufen über CSS, wo es geht. JavaScript kommt dazu, wenn man etwas anklicken kann, nicht für Deko.",
  },
  {
    title: "Kein Tracking, keine Cookies",
    text: "Ich könnte nicht sagen, wie viele Leute diese Seite besuchen. Es gibt keine Zählung, nur eine Theme-Einstellung im Browser.",
    proof: { href: "/datenschutz", label: "Datenschutzerklärung" },
  },
  {
    title: "Offene Punkte offen benennen",
    text: "Was nicht fertig ist, steht als solches da. Ein sichtbares TODO ist mir lieber als eine stille Lücke.",
    proof: { href: "#projekte", label: "Offene Punkte ansehen" },
  },
  {
    title: "Verantwortung übernehmen",
    text: "Bei SimpleAct liegt die Verantwortung für Architektur und Plattform bei mir. Wenn nachts etwas ausfällt, ist das mein Problem.",
    proof: { href: "#projekte", label: "SimpleAct ansehen" },
  },
  {
    title: "Erst verstehen, dann automatisieren",
    text: "Bevor ich einen Ablauf automatisiere, will ich ihn einmal von Hand gemacht haben. Automation ohne Verständnis verschiebt das Problem nur.",
  },
];
