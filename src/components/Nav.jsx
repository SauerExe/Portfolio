export default function Nav() {
  return (
    <header className="nav">
      <a className="nav-logo" href="#top" aria-label="Zum Seitenanfang">
        vv<span className="accent">.</span>
      </a>
      <nav aria-label="Hauptnavigation">
        <a href="#ueber">Über</a>
        <a href="#projekte">Projekte</a>
        <a href="#skills">Skills</a>
        <a href="#weg">Weg</a>
        <a href="#kontakt" className="nav-contact">
          Kontakt
        </a>
      </nav>
    </header>
  );
}
