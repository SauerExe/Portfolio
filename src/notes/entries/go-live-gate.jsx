export const meta = {
  slug: "go-live-gate",
  title: "Go-Live Gate",
  date: "Februar 2026",
  project: "SimpleAct",
  teaser:
    "Vor dem Go-Live prüft SimpleAct jetzt automatisch, ob Pflichtdokumente wirklich vollständig sind — nicht nur angelegt.",
};

export default function Post() {
  return (
    <>
      <p>
        Bevor ein Tenant live gehen kann, prüft SimpleAct jetzt automatisch,
        ob die Pflichtdokumente tatsächlich vollständig sind — nicht nur
        angelegt.
      </p>
      <pre>{`RoPA   ✓ vollständig
TOMs   ✓ vollständig
DPIA   ✗ 3 Pflichtfelder leer

→ Go-Live blockiert`}</pre>
      <p>
        Grund: eine leere Vorlage sieht im UI genauso aus wie ein fertiges
        Dokument, und das wollte ich nicht dem Kunden überlassen müssen zu
        bemerken.
      </p>
    </>
  );
}
