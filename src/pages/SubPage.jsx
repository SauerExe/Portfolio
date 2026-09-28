import { useEffect } from "react";
import { A11yPanel, SiteFooter, TopBar, useLiveData, usePrefs } from "../v3/chrome.jsx";
import { pageMeta, siteUrl } from "../data/seo.js";
import "../styles/v3.css";

// Gemeinsame Hülle für Unterseiten (Impressum, Datenschutz, Notizen, 404):
// dieselbe Kopfzeile, derselbe Footer und dasselbe Darstellungs-Panel wie
// die Startseite, aber ohne Scroll-Animationen — kurze Seiten brauchen das nicht.
export default function SubPage({ title, description, article = false, noindex = false, children }) {
  const { rootProps, panel } = usePrefs();
  const { status, track } = useLiveData();

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
    <div className="v3 v3-sub" {...rootProps}>
      <a className="v3-skip" href="#top">Zum Inhalt springen</a>
      <TopBar status={status} track={track} />
      <main id="top" tabIndex={-1} style={{ outline: "none" }}>
        {children}
      </main>
      <div className="v3-footer-wrap">
        <SiteFooter />
      </div>
      <A11yPanel {...panel} />
    </div>
  );
}
