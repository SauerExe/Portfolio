export const meta = {
  slug: "postgres-camelcase-spalten",
  title: "Postgres mag keine camelCase-Spalten",
  date: "März 2026",
  project: "SimpleAct",
  teaser:
    "Ein Subscription-Bug, der nur in Produktion auftrat. Lehre: Staging sollte dieselbe DB wie Prod nutzen, nicht nur „eine DB“.",
};

export default function Post() {
  return (
    <>
      <p>
        Ein Subscription-Bug, der nur in Produktion auftrat: die Entity hat
        auf camelCase-Felder gemapped, die Postgres-Spalten heißen aber
        lowercase. Lokal mit SQLite nie aufgefallen.
      </p>
      <pre>{`ERROR:  column "isActive" does not exist
HINT:   Perhaps you meant to reference the column "isactive".`}</pre>
      <p>
        Lehre: Staging sollte dieselbe DB wie Prod nutzen, nicht nur „eine
        DB".
      </p>
    </>
  );
}
