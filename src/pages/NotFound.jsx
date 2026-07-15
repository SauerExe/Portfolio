import SubPage from "./SubPage.jsx";

// Client-seitiges Gegenstück zu public/404.html: Da Server und Vercel für
// unbekannte Pfade index.html ausliefern (SPA-Fallback), landet ein Tippfehler
// in der URL hier statt auf der statischen 404-Seite.
export default function NotFound() {
  return (
    <SubPage title="404 – Seite nicht gefunden">
      <section className="section notfound" aria-label="Seite nicht gefunden">
        <div className="section-inner">
          <p className="notfound-code">
            404<span className="accent">.</span>
          </p>
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
