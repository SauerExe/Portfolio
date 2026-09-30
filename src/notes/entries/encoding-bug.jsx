export const meta = {
  slug: "encoding-bug",
  title: "Ein Encoding-Bug, der nicht totzukriegen ist",
  date: "März 2026",
  project: "SimpleAct",
  teaser:
    "Wieder kaputte Umlaute — dritte oder vierte Runde. Diesmal einen Check gebaut, der das vorher abfängt.",
};

export default function Post() {
  return (
    <>
      <p>
        Wieder mal kaputte Umlaute in der DSGVO-Sektion — diesmal durch eine
        Datei, die als <code>Windows-1252</code> statt <code>UTF-8</code>{" "}
        reinkam. Dritte oder vierte Runde mit demselben Grundproblem.
      </p>
      <pre>{`MaÃŸnahmen zur DatenÃ¼bertragung   ← so kam es an
Maßnahmen zur Datenübertragung    ← so gehört das`}</pre>
      <p>
        Diesmal einen Check eingebaut, der das beim nächsten Mal vorher
        abfängt, statt es hinterher zu reparieren.
      </p>
    </>
  );
}
