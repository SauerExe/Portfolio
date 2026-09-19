export const siteUrl = "https://vvashed.dev";

export const pageMeta = {
  "/": {
    title: "Timo Weiß – vvashed · Full-Stack Developer",
    description: "Portfolio von Timo Weiß (vvashed), Full-Stack Developer und CTO von SimpleAct: Next.js/TypeScript-Web-Plattformen, .NET/EF-Core-Backends und selbst betriebene Infrastruktur.",
  },
  "/notes": {
    title: "Notizen · vvashed",
    description: "Notizen von Timo Weiß zu Softwareentwicklung: Entscheidungen, Fehler und Lösungen aus eigenen Projekten und dem laufenden Betrieb.",
  },
  "/impressum": {
    title: "Impressum · vvashed",
    description: "Impressum und Kontaktangaben zum Portfolio von Timo Weiß (vvashed).",
  },
  "/datenschutz": {
    title: "Datenschutz · vvashed",
    description: "Datenschutzhinweise für vvashed.dev: Hosting, Standort-Anzeige, Live-Widgets, Kontakt und lokale Darstellungseinstellungen.",
  },
};

export function noteMeta(post) {
  return { title: `${post.title} · vvashed`, description: post.teaser, type: "article" };
}
