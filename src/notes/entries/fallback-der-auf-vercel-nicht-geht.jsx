export const meta = {
  slug: "fallback-der-auf-vercel-nicht-geht",
  title: "Ein Fallback, der auf Vercel nicht gehen kann",
  date: "August 2026",
  project: "Sommerfrische",
  teaser:
    "Ohne Redis schreibt der Urlaubsplaner in eine JSON-Datei. Auf Vercel geht das nicht — statt EROFS-Stacktrace steht da jetzt, was zu tun ist.",
};

export default function Post() {
  return (
    <>
      <p>
        Lokal reicht eine JSON-Datei als Speicher, das spart beim Entwickeln
        jede Einrichtung. Auf Vercel ist das Dateisystem schreibgeschützt und
        pro Instanz flüchtig — derselbe Fallback kann dort nicht
        funktionieren.
      </p>
      <pre>{`EROFS: read-only file system, open '.data/urlaub.json'

→ Es ist kein Speicher verbunden. Im Vercel-Dashboard unter
  Storage eine Redis-Datenbank anlegen und mit dem Projekt
  verbinden, danach einmal neu deployen.`}</pre>
      <p>
        Jede schreibende Route fragt vorher, ob sie im Datei-Modus auf Vercel
        läuft, und antwortet dann mit genau diesem Satz statt mit einem
        Stacktrace. Ein Fehler, der die Lösung mitliefert, spart die halbe
        Stunde, in der man sonst das falsche Problem sucht.
      </p>
    </>
  );
}
