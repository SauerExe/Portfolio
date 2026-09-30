export const meta = {
  slug: "impressum-aber-lesbar",
  title: "Impressum, aber lesbar",
  date: "Februar 2026",
  project: "SimpleAct",
  teaser:
    "Rechtsseiten überarbeitet — nicht weil's die Rechtslage verlangt hat, sondern weil ich sie selbst nicht gern gelesen habe.",
};

export default function Post() {
  return (
    <>
      <p>
        Datenschutz- und Impressum-Seiten überarbeitet, nicht weil's die
        Rechtslage verlangt hat, sondern weil ich sie selbst nicht gern
        gelesen habe.
      </p>
      <pre>{`vorher   Wall of Text, ein Absatz, keine Luft
nachher  klare Abschnitte, eine Sache pro Überschrift`}</pre>
    </>
  );
}
