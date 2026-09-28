import SubPage from "./SubPage.jsx";
import { EMAIL } from "../v3/content.js";

// Die Du-Form ist Absicht — die ganze Seite duzt, die Datenschutzerklärung
// soll kein Stilbruch sein. Inhaltlich deckt sie ab, was technisch
// tatsächlich passiert: kein Tracking, keine Cookies, aber Spotify-Cover
// und Verbindungsdaten beim Hosting.
export default function Datenschutz() {
  return (
    <SubPage title="Datenschutz">
      <section className="section legal" aria-label="Datenschutzerklärung">
        <div className="section-inner">
          <span className="kicker">Rechtliches</span>
          <h1 className="section-title">
            Datenschutz<span className="accent">.</span>
          </h1>

          <div className="legal-body">
            <div className="legal-block">
              <h2>Das Wichtigste zuerst</h2>
              <p>
                Diese Seite kommt ohne Tracking, ohne Analyse-Tools, ohne
                Werbenetzwerke und ohne Cookies aus. Es gibt keine Zählung,
                wie viele Leute sie besuchen. Was technisch trotzdem an Daten
                anfällt, steht vollständig hier.
              </p>
            </div>

            <div className="legal-block">
              <h2>Verantwortlicher</h2>
              <p className="legal-address">
                Timo Weiß
                <br />
                Gelsenkirchen, Deutschland
                <br />
                E-Mail:{" "}
                <a className="text-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
            </div>

            <div className="legal-block">
              <h2>Hosting und Server-Logs</h2>
              <p>
                Diese Seite liegt bei keinem Hosting-Anbieter — sie läuft auf
                meinem eigenen Server. Beim Aufruf fallen technisch
                notwendige Daten an: IP-Adresse, Datum und Uhrzeit des
                Abrufs, aufgerufene Seite, User-Agent. Ohne diese Daten lässt
                sich eine Website nicht ausliefern.
              </p>
              <p>
                Erreichbar ist der Server über einen Cloudflare Tunnel. Dabei
                verarbeitet Cloudflare (Cloudflare, Inc., 101 Townsend St,
                San Francisco, CA 94107, USA) als technischer Dienstleister
                die Verbindungsdaten, um die Anfrage weiterzuleiten und den
                Server abzusichern.
              </p>
              <p>
                <strong>Zweck:</strong> Auslieferung und Absicherung der
                Seite. <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f
                DSGVO (berechtigtes Interesse an einem stabilen, sicheren
                Betrieb). <strong>Speicherdauer:</strong> Ich betreibe kein
                Zugriffs-Logging und werte keine Server-Logs aus;
                Verbindungsdaten fallen nur flüchtig an, soweit sie für die
                Auslieferung technisch nötig sind.
              </p>
            </div>

            <div className="legal-block">
              <h2>Live-Widgets (Status, Musik)</h2>
              <p>
                Die Statusleiste und die Karten im „Maschinenraum" zeigen
                Daten <em>meiner</em> Infrastruktur (Server-Status, gerade
                laufende Musik). Dein Browser ruft dafür nur meine eigene API
                unter dieser Domain auf — dabei fallen keine anderen Daten an
                als beim normalen Seitenaufruf. Läuft gerade Musik, lädt dein
                Browser das Album-Cover vom Spotify-CDN (i.scdn.co); dabei
                wird deine IP-Adresse an Spotify übertragen (Art. 6 Abs. 1
                lit. f DSGVO, keine Speicherung durch mich).
              </p>
            </div>

            <div className="legal-block">
              <h2>Kontakt per E-Mail</h2>
              <p>
                Es gibt kein Kontaktformular. Wenn du mir eine E-Mail
                schreibst, verarbeite ich deine Adresse und den Inhalt der
                Nachricht, um dir zu antworten.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                (Anbahnung/Durchführung eines Vertrags), sonst Art. 6 Abs. 1
                lit. f DSGVO (berechtigtes Interesse an der Beantwortung).{" "}
                <strong>Speicherdauer:</strong> bis die Anfrage erledigt ist;
                darüber hinaus nur, soweit gesetzliche Aufbewahrungspflichten
                bestehen.
              </p>
            </div>

            <div className="legal-block">
              <h2>Lokale Einstellungen (kein Cookie)</h2>
              <p>
                Das Darstellungs-Panel (Textgröße, Kontrast, Motion) speichert
                deine Auswahl im localStorage deines Browsers. Diese Werte
                enthalten keine personenbezogenen Daten, verlassen deinen
                Browser nie und lassen sich dort jederzeit löschen.
              </p>
            </div>

            <div className="legal-block">
              <h2>Deine Rechte</h2>
              <p>
                Du hast gegenüber mir das Recht auf Auskunft (Art. 15 DSGVO),
                Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
                Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und{" "}
                <strong>
                  Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6
                  Abs. 1 lit. f DSGVO (Art. 21 DSGVO)
                </strong>
                . Eine formlose E-Mail an{" "}
                <a className="text-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>{" "}
                reicht. Außerdem kannst du dich bei einer
                Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO) — für
                NRW: Landesbeauftragte für Datenschutz und
                Informationsfreiheit Nordrhein-Westfalen.
              </p>
            </div>

            <div className="legal-block">
              <h2>Stand</h2>
              <p>
                September 2026. Wenn sich an der Seite technisch etwas ändert, wird
                diese Erklärung angepasst.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPage>
  );
}
