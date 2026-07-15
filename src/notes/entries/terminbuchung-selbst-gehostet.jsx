export const meta = {
  slug: "terminbuchung-selbst-gehostet",
  title: "Terminbuchung selbst gehostet",
  date: "Juli 2026",
  teaser:
    "Meetergo-Embed durch eine eigene Lösung ersetzt — keine fremde Domain mehr, die im Booking-Flow Daten sieht.",
};

export default function Post() {
  return (
    <>
      <p>
        Meetergo-Embed durch eine eigene Lösung ersetzt: Slots, Bestätigung,
        <code>.ics</code>-Datei, rotierender Nextcloud-Talk-Raum — alles im
        eigenen System statt bei einem Drittanbieter.
      </p>
      <pre>{`BEGIN:VEVENT
SUMMARY:Erstgespräch
LOCATION:Nextcloud Talk — Raum wechselt pro Termin
END:VEVENT`}</pre>
      <p>
        Mehr Aufwand beim Bauen, aber keine fremde Domain mehr, die im
        Booking-Flow Daten sieht.
      </p>
    </>
  );
}
