export const meta = {
  slug: "kein-login-trotzdem-rechte",
  title: "Kein Login, trotzdem Rechte",
  date: "August 2026",
  teaser:
    "Der Urlaubsplaner hat keine Accounts. Wer was darf, hängt am Link — und der Organisator-Schlüssel wird von der öffentlichen API nie ausgeliefert.",
};

export default function Post() {
  return (
    <>
      <p>
        Sommerfrische kommt ohne Accounts aus: Link teilen genügt. Trotzdem
        darf nicht jeder alles — Antworten löschen und die Umfrage schließen
        kann nur, wer den Organisator-Schlüssel hat.
      </p>
      <pre>{`/u/<id>                      → jeder mit dem Link
/u/<id>/ergebnis?admin=<key> → nur der Organisator

POST /api/polls    → { id, adminKey }   einmalig beim Anlegen
GET  /api/polls/id → publicPoll(poll)   adminKey rausgelöscht`}</pre>
      <p>
        Der Schlüssel entsteht beim Anlegen, steht genau einmal im
        Ergebnis-Link und geht danach nie wieder über die öffentliche API
        raus. Wer geantwortet hat, behält ein eigenes Geheimnis im Browser
        und darf damit die eigene Antwort ändern oder löschen — mehr Rollen
        braucht eine Urlaubsumfrage nicht.
      </p>
    </>
  );
}
