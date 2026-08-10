export const meta = {
  slug: "einen-tag-zu-frueh",
  title: "Einen Tag zu früh",
  date: "August 2026",
  teaser:
    "toISOString() auf ein lokal gemeintes Datum schiebt in Berlin den Kalendertag zurück. Im Urlaubsplaner rechnet deshalb alles in lokaler Zeit.",
};

export default function Post() {
  return (
    <>
      <p>
        Im Urlaubsplaner malt man Tage in einen Kalender. Jeder Tag ist ein
        String <code>yyyy-mm-dd</code>, gemeint ist der Kalendertag — keine
        Uhrzeit, keine Zone. Serialisiert man den mit{" "}
        <code>toISOString()</code>, landet man in Berlin einen Tag davor.
      </p>
      <pre>{`new Date(2026, 6, 12)       // 12. Juli, lokal

.toISOString().slice(0,10)  → 2026-07-11   ✗
iso(d) aus lib/dates.ts     → 2026-07-12   ✓`}</pre>
      <p>
        Grund ist die Sommerzeit: <code>toISOString()</code> rechnet auf UTC
        zurück, aus Mitternacht wird der Vortag um 22 Uhr. Also gibt es keine{" "}
        <code>Date</code>-Objekte quer durch die App, sondern Helfer, die
        Strings in lokaler Zeit addieren und formatieren. Ein Urlaub, der
        einen Tag früher anfängt als angemalt, wäre der Bug, den keiner
        meldet und alle merken.
      </p>
    </>
  );
}
