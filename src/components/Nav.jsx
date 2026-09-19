// Anker absolut (/#…) statt relativ (#…), damit dieselbe Nav auch auf
// Unterseiten (Impressum, Datenschutz, Notizen) funktioniert: dort führt
// der Klick zurück zur Startseite an die richtige Sektion, auf der
// Startseite bleibt es ein normaler Anker-Sprung.
export default function Nav() {
  const onNotes = window.location.pathname.startsWith("/notes");

  return (
    <header className="nav">
      <a className="nav-logo" href="/#top" aria-label="vv. Zum Seitenanfang">
        <img
          className="nav-logo-mark"
          src="/logo-mark.png"
          alt=""
          width={26}
          height={26}
        />
        vv<span className="accent">.</span>
      </a>
      <nav aria-label="Hauptnavigation">
        <a href="/#ueber">Über</a>
        <a href="/#projekte">Projekte</a>
        <a href="/#skills">Stack</a>
        <a href="/#weg">Weg</a>
        <a href="/notes" aria-current={onNotes ? "page" : undefined}>
          Notizen
        </a>
        <a href="/#kontakt" className="nav-contact">
          Kontakt
        </a>
      </nav>
    </header>
  );
}
