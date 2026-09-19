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
      <h2>Ein Kalendertag ist kein Zeitpunkt</h2>
      <p>
        Im Urlaubsplaner malt man Tage in einen Kalender. Jeder Tag ist ein
        String <code>yyyy-mm-dd</code>, gemeint ist der Kalendertag — keine
        Uhrzeit, keine Zone. Erzeugt man dafür ein lokales Mitternachtsdatum und serialisiert es mit{" "}
        <code>toISOString()</code>, landet man in Berlin einen Tag davor.
      </p>
      <p>
        Die Unterscheidung klingt klein, betrifft aber die ganze Planung.
        Wenn jemand den 12. Juli auswählt, ist genau dieses Kalenderfeld
        gemeint. Es soll nicht abhängig vom Standort des Browsers einen
        anderen Tag bezeichnen. Eine Uhrzeit auf einer globalen Zeitachse
        würde hier zusätzliche Bedeutung einführen, die die Auswahl gar
        nicht hat.
      </p>
      <pre>{`new Date(2026, 6, 12)       // 12. Juli, lokal

.toISOString().slice(0,10)  → 2026-07-11   ✗
iso(d) aus lib/dates.ts     → 2026-07-12   ✓`}</pre>
      <h2>Eine gemeinsame Grenze für Datumswerte</h2>
      <p>
        In diesem Beispiel gilt in Berlin Sommerzeit: <code>toISOString()</code> rechnet auf UTC
        zurück, aus Mitternacht wird der Vortag um 22 Uhr. Also gibt es keine{" "}
        <code>Date</code>-Objekte quer durch die App, sondern Helfer, die
        Strings in lokaler Zeit addieren und formatieren. Ein Urlaub, der
        einen Tag früher anfängt als angemalt, wäre der Bug, den keiner
        meldet und alle merken.
      </p>
      <p>
        Denkbar wäre, alle Operationen konsequent mit UTC durchzuführen.
        Dann müssten auch das Erzeugen, Addieren und Auslesen dieser Werte
        durchgehend dazu passen. Im bestehenden Kalender folgt die Lösung
        stattdessen der lokalen Darstellung: <code>parseISO()</code> zerlegt
        Jahr, Monat und Tag und erzeugt daraus ein lokales Datum.
        <code>iso()</code> liest dieselben lokalen Bestandteile wieder aus.
        <code>addDays()</code> verbindet beide Schritte und liefert erneut
        einen Datumsstring zurück.
      </p>
      <h2>Die Kosten liegen in der Konsequenz</h2>
      <p>
        Ein paar zentrale Helfer sind überschaubar. Entscheidend ist, dass
        Kalender, Auswertung und Beschriftungen dieselbe Bedeutung verwenden.
        Ein beiläufiges <code>toISOString()</code> an einer neuen Stelle kann
        die Verschiebung wieder einführen. Der kürzeste Ausdruck ist deshalb
        nicht automatisch der richtige: An der Grenze zwischen Anzeige und
        gespeicherten Werten muss er zum Datenmodell passen.
      </p>
      <p>
        Auch Sommerzeitwechsel bleiben ein Prüfpunkt. Einen Kalendertag
        weiterzugehen ist nicht in jeder Zeitzone dasselbe wie exakt 24
        Stunden zu addieren. Die Helfer halten diese Fragen an einer Stelle,
        statt sie auf einzelne Komponenten zu verteilen. Der Gewinn ist
        keine ausgefeilte Datumsarchitektur, sondern eine verlässliche
        Zusage: Der ausgewählte Tag bleibt der ausgewählte Tag.
      </p>
    </>
  );
}
