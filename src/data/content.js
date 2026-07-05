// Content für vvashed.dev / Timo Weiß.
// Struktur (Feldnamen, Shapes) stammt aus der Nowak-Development-Referenz,
// die Inhalte hier sind vollständig aus dem vvashed.dev-Repo übernommen.

export const profile = {
  name: "Timo Weiß",
  role: "Full-Stack Developer · CTO SimpleAct",
  tagline: "Full-Stack · Next.js/TypeScript · C#/.NET",
  location: "Deutschland",
  age: 22,
  email: "contact@vvashed.dev",
  github: "https://github.com/SauerExe",
  oldPortfolio: "https://v1.vvashed.dev",
};

export const heroStatement = "Ich baue Software, die im Betrieb läuft, nicht nur in der Demo.";

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
      "Der EU AI Act verpflichtet Unternehmen, ihre KI-Systeme zu klassifizieren und zu dokumentieren, für Nicht-Juristen kaum zu durchdringen. SimpleAct erfasst KI-Systeme strukturiert, ordnet sie nach Risikoklassen ein und leitet daraus konkrete Compliance-Aufgaben ab.",
    role: "Architektur, Plattform, Automatisierung",
    technologies: ["Next.js", "TypeScript", "Supabase", "n8n"],
    liveUrl: "https://simpleact.de",
    screenshot: "/images/projekte/simpleact/screenshot.webp",
    highlights: [
      "Verantwortlich für Produktarchitektur als Mitgründer",
      "Automatisierte Risikoeinordnung statt manueller Rechtsprüfung",
    ],
  },
  {
    title: "Gewinnspiel-Anwendung für die Stadtverwaltung",
    slug: "admin-kommune",
    type: "Web-App",
    status: "Im Regelbetrieb",
    context: "Entwicklung im Anstellungsverhältnis",
    shortDescription:
      "Gewinnspiele wurden manuell in Listen verwaltet, fehleranfällig, ohne Auswertung, ohne Rechteverwaltung. Web-Plattform mit .NET 10 Web API, EF Core und Next.js-Admin-UI löst das Problem strukturiert.",
    role: "Konzeption, Entwicklung",
    technologies: [".NET 10", "EF Core", "JWT / LDAP", "Next.js"],
    screenshot: "/images/projekte/admin-kommune/mockup.svg",
    highlights: [
      "Authentifizierung über JWT gegen bestehendes LDAP",
      "Läuft seit Übergabe im Regelbetrieb bei der Kommune",
    ],
  },
  {
    title: "Habitaz",
    slug: "habitaz",
    type: "Website / Booking",
    status: "In Entwicklung",
    context: "Ferienwohnungen · Gelsenkirchen & Haltern am See",
    shortDescription:
      "Buchungsseite für Ferienwohnungen an zwei Standorten, Gelsenkirchen und Haltern am See, mit Smoobu-Anbindung für Verfügbarkeiten und Reservierungen.",
    role: "Konzept, Design, Entwicklung",
    technologies: ["Next.js", "TypeScript", "Smoobu API"],
    screenshot: "/images/projekte/habitaz/screenshot.webp",
    highlights: [
      "Smoobu-Anbindung für Verfügbarkeiten und Buchungen",
      "Zwei Standorte über eine gemeinsame Buchungsstrecke",
    ],
  },
  {
    title: "vvashed.dev",
    slug: "vvashed-dev",
    type: "Website",
    status: "Live",
    context: "Dieses Portfolio",
    shortDescription:
      "Portfolios behaupten Skills, belegen sie aber selten. Diese Seite führt sie stattdessen vor: sechs interaktive Labs gegen echte API-Endpoints, der komplette Quellcode ist offen einsehbar.",
    role: "Konzept, Design, Entwicklung",
    technologies: ["Next.js 16", "Tailwind v4", "Motion", "zod"],
    liveUrl: "https://vvashed.dev",
    repoUrl: "https://github.com/SauerExe/vvashed.dev",
    extraLink: { href: "https://v1.vvashed.dev", label: "Altes Portfolio" },
    highlights: [
      "Sechs interaktive Labs statt Skill-Badges",
      "Kompletter Quellcode offen einsehbar",
    ],
  },
];

export const skillGroups = [
  {
    id: "frontend",
    label: "Interface",
    claim: "Web-Plattformen mit Next.js und TypeScript, klar strukturiert und schnell.",
    items: [
      { name: "TypeScript / JavaScript", note: "typsicher, ohne Ballast" },
      { name: "React / Next.js", note: "Full-Stack-React, SSR & RSC" },
      { name: "Tailwind CSS", note: "konsistentes, schnelles Styling" },
      { name: "Motion", note: "Scroll- und Interaktions-Animationen" },
    ],
    usedFor: "Web-Plattformen, interaktive Labs, Admin-Oberflächen",
  },
  {
    id: "backend",
    label: "Backend & Daten",
    claim: "Die Schicht dahinter: APIs, Datenmodelle, Auth-Flows.",
    items: [
      { name: "C# / .NET 10", note: "Web APIs, Anwendungsentwicklung" },
      { name: "EF Core", note: "Datenzugriff und Migrationen" },
      { name: "JWT / LDAP", note: "Authentifizierung gegen bestehende Systeme" },
      { name: "Supabase", note: "Datenbank, Auth, Backend-as-a-Service" },
      { name: "zod", note: "Validierung an API-Grenzen" },
    ],
    usedFor: "APIs, Auth-Flows, Datenmodellierung",
  },
  {
    id: "infra",
    label: "Infrastruktur & Automation",
    claim: "Eigener Betrieb statt Managed-Abhängigkeit, vom Server bis zum Deploy.",
    items: [
      { name: "TrueNAS", note: "Storage-Basis im Homelab" },
      { name: "Coolify", note: "Container-Deployments" },
      { name: "n8n", note: "Workflow-Automatisierung" },
      { name: "Cloudflare Tunnel", note: "Zugriff ohne offene Ports" },
      { name: "Authelia", note: "zentrale Zugriffskontrolle" },
    ],
    usedFor: "Eigenbetriebene Systeme, Deployments, Automatisierung",
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
    period: "Juli 2026",
    title: "Abschluss der Ausbildung",
    text: "Ausgelernt seit Juli 2026; seitdem Full-Stack-Entwicklung und Betrieb eigener Infrastruktur.",
  },
  {
    period: "2026",
    title: "Gewinnspiel-Anwendung für die Stadtverwaltung",
    text: "Konzeption und Entwicklung bis in den Regelbetrieb, .NET 10, EF Core, Next.js.",
  },
];

export const principles = [
  [
    "Vorführen statt behaupten",
    "Skills werden nicht behauptet, sondern vorgeführt. Die Labs auf vvashed.dev sprechen mit echten Route Handlers, Fehlerpfade inklusive, statt mit Skill-Badges zu werben.",
  ],
  [
    "Quellcode offen einsehbar",
    "Der komplette Code dieser Seite liegt öffentlich auf GitHub. Wer nachprüfen will, wie etwas gebaut ist, muss nicht glauben, sondern kann lesen.",
  ],
  [
    "Eigene Infrastruktur, eigene Kontrolle",
    "TrueNAS, Coolify und n8n selbst betrieben statt Managed-Dienste gemietet. Wer die Infrastruktur versteht, ist nicht von ihr abhängig.",
  ],
  [
    "Server-first, JavaScript nur wo nötig",
    "Sections bleiben React Server Components, wo es geht. Animationen laufen über CSS statt über Hydration, die auf sich warten lässt.",
  ],
  [
    "Kein Tracking, keine Cookies",
    "Diese Seite verzichtet bewusst auf Analyse-Dienste und Cookies. Eine Theme-Einstellung lokal zu speichern reicht, ohne Nutzer zu vermessen.",
  ],
  [
    "Offene Punkte offen benennen",
    "Was noch nicht fertig ist, wird als solches markiert statt kaschiert. Lieber ein sichtbares TODO als eine stille Lücke.",
  ],
  [
    "Verantwortung übernehmen",
    "Als Mitgründer und CTO von SimpleAct liegt Architektur- und Plattformverantwortung nicht bei irgendwem, sondern konkret bei mir.",
  ],
  [
    "Erst verstehen, dann automatisieren",
    "Bevor ein Ablauf automatisiert wird, muss er manuell verstanden sein. Automation, die das Problem nicht kennt, verschiebt es nur.",
  ],
];
