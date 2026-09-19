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
      <h2>Eine Umfrage braucht keine Anmeldung</h2>
      <p>
        Sommerfrische kommt ohne Accounts aus: Link teilen genügt. Trotzdem
        darf nicht jeder alles — Antworten löschen und die Umfrage schließen
        kann nur, wer den Organisator-Schlüssel hat.
      </p>
      <p>
        Für eine Gruppe, die nur gemeinsame Urlaubstage sucht, wäre ein Konto
        eine zusätzliche Aufgabe vor der eigentlichen Aufgabe: registrieren,
        anmelden, Zugang wiederfinden. Ganz ohne Zugriffsprüfung geht es aber
        auch nicht. Wer einen Teilnahmelink bekommt, soll dadurch keine
        fremden Antworten löschen oder die ganze Planung schließen können.
      </p>
      <h2>Drei Zugänge, klar getrennt</h2>
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
      <p>
        Im Code ist diese Grenze ausdrücklich sichtbar. Die öffentliche
        Antwort läuft durch <code>publicPoll()</code>; diese Funktion entfernt
        den Admin-Schlüssel aus dem gespeicherten Umfrageobjekt. Änderungen an
        der Umfrage vergleichen den mitgeschickten Schlüssel auf dem Server.
        Beim Löschen einer Antwort reicht entweder der Organisator-Schlüssel
        oder das Geheimnis genau dieser Antwort. Ein ausgeblendeter Button
        allein würde diese Trennung nicht leisten.
      </p>
      <h2>Was die Einfachheit kostet</h2>
      <p>
        Der Link ist damit selbst ein Zugang. Wer den Organisator-Link
        weitergibt, gibt auch dessen Rechte weiter. Das lässt sich nicht durch
        eine freundlichere Beschriftung wegdesignen. Teilnahmelink und
        Verwaltungslink müssen deshalb unterscheidbar bleiben, auch wenn
        beide zur gleichen Umfrage gehören.
      </p>
      <p>
        Ohne Benutzerkonto gibt es außerdem keinen klassischen
        Passwort-zurücksetzen-Weg. Der Browser kann einen Zugang behalten;
        daraus wird aber keine Identität, die sich auf einem anderen Gerät
        einfach wieder anmelden lässt. Die technische Arbeit verschwindet
        also nicht: Sie steckt in der Ausgabe der Daten, der Prüfung jeder
        schreibenden Anfrage und dem verständlichen Umgang mit den Links.
        Für diese kleine, geteilte Urlaubsplanung ist das ein passender
        Tausch. Für ein Produkt mit dauerhaften Teams und wechselnden Rollen
        würde ich diese Entscheidung neu treffen.
      </p>
    </>
  );
}
