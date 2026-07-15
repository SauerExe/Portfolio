import { useEffect } from "react";
import StatusBar from "../components/StatusBar.jsx";
import Nav from "../components/Nav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import A11yWidget from "../components/A11yWidget.jsx";

// Gemeinsame Hülle für Unterseiten (Impressum, Datenschutz, Notizen, 404):
// gleiche Statusleiste, Nav und Footer wie die Startseite, aber ohne
// Smooth Scroll und Scroll-Animationen — kurze Seiten brauchen das nicht
// („JavaScript nur wo nötig").
export default function SubPage({ title, children }) {
  useEffect(() => {
    document.title = `${title} · vvashed`;
  }, [title]);

  return (
    <>
      <a className="skip-link" href="#top">Zum Inhalt springen</a>
      <StatusBar />
      <Nav />
      <main id="top" tabIndex={-1} className="subpage">
        {children}
      </main>
      <SiteFooter />
      <A11yWidget />
    </>
  );
}
