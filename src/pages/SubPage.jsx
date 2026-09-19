import { useEffect } from "react";
import StatusBar from "../components/StatusBar.jsx";
import Nav from "../components/Nav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import A11yWidget from "../components/A11yWidget.jsx";
import { pageMeta, siteUrl } from "../data/seo.js";

// Gemeinsame Hülle für Unterseiten (Impressum, Datenschutz, Notizen, 404):
// gleiche Statusleiste, Nav und Footer wie die Startseite, aber ohne
// Smooth Scroll und Scroll-Animationen — kurze Seiten brauchen das nicht
// („JavaScript nur wo nötig").
export default function SubPage({ title, description, article = false, noindex = false, children }) {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const summary = description ?? pageMeta[path]?.description ?? title;
    document.title = `${title} · vvashed`;
    document.querySelector('link[rel="canonical"]').href = siteUrl + path;
    const values = {
      'name="description"': summary,
      'property="og:title"': document.title,
      'property="og:description"': summary,
      'property="og:url"': siteUrl + path,
      'property="og:type"': article ? "article" : "website",
      'name="robots"': noindex ? "noindex, follow" : "index, follow",
    };
    for (const [selector, content] of Object.entries(values)) {
      let meta = document.querySelector(`meta[${selector}]`);
      if (!meta) {
        meta = document.createElement("meta");
        const [attribute, value] = selector.replaceAll('"', "").split("=");
        meta.setAttribute(attribute, value);
        document.head.append(meta);
      }
      meta.content = content;
    }
  }, [title, description, article, noindex]);

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
