import { useEffect, useRef, useState } from "react";
import { usePolling } from "../hooks/usePolling.js";
import { useMotionPref } from "../hooks/useMotionPref.js";

// Gemeinsame Hülle aller Seiten: Kopfzeile mit Live-Status, Footer,
// Darstellungs-Panel und die Einstellungen dahinter.

export const STATUS = {
  operational: { bar: "Server: online", card: "Betriebsbereit", color: "#5cdd8b" },
  degraded: { bar: "Server: eingeschränkt", card: "Eingeschränkt", color: "#f5b942" },
  down: { bar: "Server: down", card: "Ausgefallen", color: "#ff5a5a" },
  maintenance: { bar: "Server: Wartung", card: "Wartung", color: "#a15bff" },
  unknown: { bar: "Server: unbekannt", card: "Unbekannt", color: "oklch(58% 0.01 290)" },
};

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try { return localStorage.getItem(key) ?? initial; } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, value); } catch {}
  }, [key, value]);
  return [value, setValue];
}

export function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setMatch(mql.matches);
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, [query]);
  return match;
}

// Textgröße, Kontrast, Motion — geteilt über localStorage, damit die
// Auswahl auf allen Seiten gilt. `rootProps` kommt auf das .v3-Element.
export function usePrefs() {
  const [textSize, setTextSize] = usePersisted("vv-textsize", "m");
  const [contrast, setContrast] = usePersisted("vv-contrast", "normal");
  const [motionOff, setMotionOff] = useMotionPref();
  const systemReduced = useMedia("(prefers-reduced-motion: reduce)");
  const staticMode = new URLSearchParams(window.location.search).has("static");
  const reduced = motionOff || systemReduced || staticMode;
  return {
    reduced,
    rootProps: { "data-textsize": textSize, "data-contrast": contrast, "data-motion": reduced ? "off" : "on" },
    panel: {
      values: { textSize, contrast, motion: motionOff ? "off" : "on" },
      setters: { textSize: setTextSize, contrast: setContrast, motion: (id) => setMotionOff(id === "off") },
    },
  };
}

export function useLiveData() {
  const { data: status } = usePolling("/api/status", 60_000);
  const { data: track } = usePolling("/api/spotify/now-playing", 30_000);
  return { status, track };
}

function useClock() {
  const fmt = () =>
    new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" }) + " Uhr";
  const [clock, setClock] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setClock(fmt()), 20_000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

const NAV = [
  ["/#replayhaven", "ReplayHaven"],
  ["/#projekte", "Projekte"],
  ["/#ueber", "Über"],
  ["/#stack", "Stack"],
];

export function TopBar({ status, track }) {
  const clock = useClock();
  const s = STATUS[status?.status] ?? STATUS.unknown;
  return (
    <div className="v3-top">
      <div className="v3-status">
        <div className="v3-status-left">
          <span>
            <span className="v3-dot" style={{ background: status ? s.color : "oklch(50% 0.01 290)" }} />
            {status ? s.bar : "Server: …"}
          </span>
          <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
          <span className="ellipsis">
            {track?.isPlaying && track.title ? `♫ ${track.title} – ${track.artist}` : "♫ Spotify: gerade nichts an"}
          </span>
        </div>
        <span style={{ whiteSpace: "nowrap" }}>Gelsenkirchen · {clock}</span>
      </div>
      <div className="v3-progress" data-progress aria-hidden="true" />
      <nav className="v3-nav" aria-label="Hauptnavigation">
        <a href="/#top" className="v3-brand fx">
          <img src="/logo-mark.png" alt="" width="26" height="26" />
          vvashed
        </a>
        <div className="v3-nav-links">
          {NAV.map(([href, label]) => <a key={href} className="fx" href={href}>{label}</a>)}
          <a className="v3-nav-cta fx" href="/#kontakt">Kontakt</a>
        </div>
      </nav>
    </div>
  );
}

export function SiteFooter() {
  const path = window.location.pathname;
  const current = (href) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  return (
    <footer className="v3-footer">
      <div>
        <img src="/logo-mark.png" alt="" width="22" height="22" />
        <span>© {new Date().getFullYear()} Timo Weiß · vvashed</span>
      </div>
      <nav aria-label="Rechtliches und Links">
        <a className="fx" href="/notes" aria-current={current("/notes")}>Notizen</a>
        <a className="fx" href="/impressum" aria-current={current("/impressum")}>Impressum</a>
        <a className="fx" href="/datenschutz" aria-current={current("/datenschutz")}>Datenschutz</a>
        <a className="fx" href="https://github.com/SauerExe/Portfolio">Quelltext ↗</a>
        <a className="fx" href="https://v1.vvashed.dev">Frühere Version ↗</a>
      </nav>
    </footer>
  );
}

const A11Y_ROWS = [
  ["textSize", "Textgröße", [["s", "A", "Kleine Schrift", 12], ["m", "A", "Normale Schrift", 15], ["l", "A", "Große Schrift", 19]]],
  ["contrast", "Kontrast", [["normal", "Normal", "Normaler Kontrast"], ["high", "Hoch", "Hoher Kontrast"]]],
  ["motion", "Motion", [["on", "An", "Animationen an"], ["off", "Aus", "Animationen aus"]]],
];

export function A11yPanel({ values, setters }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const buttons = () => [...(modalRef.current?.querySelectorAll("button") ?? [])];
    buttons()[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const list = buttons();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => { document.removeEventListener("keydown", onKey); toggle?.focus(); };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="v3-a11y-btn"
        aria-label="Darstellung anpassen: Textgröße, Kontrast, Motion"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
          <circle cx="15" cy="6" r="2.6" fill="oklch(17% 0.014 290)" />
          <circle cx="8" cy="12" r="2.6" fill="oklch(17% 0.014 290)" />
          <circle cx="17" cy="18" r="2.6" fill="oklch(17% 0.014 290)" />
        </svg>
      </button>
      {open && (
        <div className="v3-a11y-overlay" onClick={() => setOpen(false)}>
          <div
            ref={modalRef}
            className="v3-a11y-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Darstellung anpassen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="v3-a11y-head">
              <div>
                <span>Darstellung</span>
                <span>Bleibt lokal im Browser. Keine Cookies.</span>
              </div>
              <button type="button" className="v3-a11y-close" aria-label="Schließen" onClick={() => setOpen(false)}>×</button>
            </div>
            {A11Y_ROWS.map(([key, label, options]) => (
              <div className="v3-a11y-row" key={key}>
                <span id={`a11y-${key}`}>{label}</span>
                <div className="v3-seg" role="group" aria-labelledby={`a11y-${key}`}>
                  {options.map(([id, text, title, size]) => (
                    <button
                      key={id}
                      type="button"
                      title={title}
                      aria-pressed={values[key] === id}
                      style={size ? { fontSize: size } : undefined}
                      onClick={() => setters[key](id)}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
