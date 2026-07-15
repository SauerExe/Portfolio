export const meta = {
  slug: "ein-nachmittag-npm-audit",
  title: "Ein Nachmittag npm audit",
  date: "Juli 2026",
  teaser:
    "Kein einzelner großer Fix, eher zehn kleine — aber genau solche Nachmittage verhindern die großen Probleme später.",
};

export default function Post() {
  return (
    <>
      <p>
        Alle offenen Schwachstellen in Frontend und Backend aufgeräumt,
        danach die Turnstile-Integration final auf „nur bei Interaktion
        sichtbar" gestellt.
      </p>
      <pre>{`14:02  npm audit → 11 vulnerabilities (2 high)
17:40  npm audit → found 0 vulnerabilities`}</pre>
      <p>
        Kein einzelner großer Fix, eher zehn kleine — aber genau solche
        Nachmittage verhindern die großen Probleme später.
      </p>
    </>
  );
}
