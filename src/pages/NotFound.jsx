import SubPage from "./SubPage.jsx";

// Client-seitiges Gegenstück zur statischen 404-Seite, auch für den Dev-Server.
export default function NotFound() {
  return (
    <SubPage title="404 – Seite nicht gefunden" noindex>
      <section className="section notfound" aria-label="Seite nicht gefunden">
        <div className="section-inner">
          <h1 className="notfound-code">
            404<span className="accent">.</span>
          </h1>
          <p className="notfound-text">
            Diese Seite gibt es nicht.
          </p>
          <a className="note-back mono" href="/">
            → Zur Startseite
          </a>
        </div>
      </section>
    </SubPage>
  );
}
