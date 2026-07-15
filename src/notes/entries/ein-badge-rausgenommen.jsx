export const meta = {
  slug: "ein-badge-rausgenommen",
  title: "Ein Badge, den ich rausgenommen habe",
  date: "April 2026",
  teaser:
    "Ein Reviews-Badge, bevor es echte Reviews gab: sah gut aus, war aber schlicht nicht wahr.",
};

export default function Post() {
  return (
    <>
      <p>
        Auf der Landingpage hing ein OMR-Reviews-Badge, bevor es echte
        Reviews gab. Sah gut aus, war aber schlicht nicht wahr.
      </p>
      <pre>{`- <ReviewsBadge />
+ {/* kommt wieder, wenn es echte Bewertungen gibt */}`}</pre>
      <p>Runtergenommen. Kommt zurück, sobald es sie gibt — nicht vorher.</p>
    </>
  );
}
