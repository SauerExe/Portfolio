export const meta = {
  slug: "dsgvo-formulare-als-wizard",
  title: "DSGVO-Formulare als Wizard statt Wall of Fields",
  date: "Mai 2026",
  project: "SimpleAct",
  teaser:
    "RoPA, DPIA und TOMs schrittweise statt als eine lange Seite — der meistgenannte Frust aus Nutzergesprächen.",
};

export default function Post() {
  return (
    <>
      <p>
        RoPA, DPIA und TOMs liefen bisher als eine lange Seite mit allen
        Feldern auf einmal. Umgebaut auf schrittweise Wizards.
      </p>
      <pre>{`vorher   1 Seite · alle Felder auf einmal · Scrollbalken ohne Ende
nachher  6 Schritte · ein Thema pro Schritt · Fortschritt sichtbar`}</pre>
      <p>
        Nicht weniger Arbeit für den Nutzer, aber spürbar weniger Overwhelm —
        das war in Nutzergesprächen der meistgenannte Frust.
      </p>
    </>
  );
}
