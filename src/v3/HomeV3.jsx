import { useCallback, useEffect, useRef, useState } from "react";
import { usePolling } from "../hooks/usePolling.js";
import { useMotionPref } from "../hooks/useMotionPref.js";
import { useScrollFx } from "./useScrollFx.js";
import {
  EMAIL,
  GITHUB,
  buildPath,
  marqueeItems,
  principles,
  projects,
  replayHaven,
  skillGroups,
} from "./content.js";
import "../styles/v3.css";

const pad = (n) => String(n).padStart(2, "0");

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try { return localStorage.getItem(key) ?? initial; } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, value); } catch {}
  }, [key, value]);
  return [value, setValue];
}

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setMatch(mql.matches);
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, [query]);
  return match;
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

const STATUS = {
  operational: { bar: "Server: online", card: "Betriebsbereit", color: "#5cdd8b" },
  degraded: { bar: "Server: eingeschränkt", card: "Eingeschränkt", color: "#f5b942" },
  down: { bar: "Server: down", card: "Ausgefallen", color: "#ff5a5a" },
  maintenance: { bar: "Server: Wartung", card: "Wartung", color: "#a15bff" },
  unknown: { bar: "Server: unbekannt", card: "Unbekannt", color: "oklch(58% 0.01 290)" },
};

function SpotBar() {
  return <span className="v3-spotbar" aria-hidden="true" />;
}

function TopBar({ status, track, clock }) {
  const s = STATUS[status?.status] ?? STATUS.unknown;
  const barText = status ? s.bar : "Server: …";
  return (
    <div className="v3-top">
      <div className="v3-status">
        <div className="v3-status-left">
          <span>
            <span className="v3-dot" style={{ background: status ? s.color : "oklch(50% 0.01 290)" }} />
            {barText}
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
        <a href="#top" className="v3-brand fx">
          <img src="/logo-mark.png" alt="" width="26" height="26" />
          vvashed
        </a>
        <div className="v3-nav-links">
          <a className="fx" href="#replayhaven">ReplayHaven</a>
          <a className="fx" href="#projekte">Projekte</a>
          <a className="fx" href="#ueber">Über</a>
          <a className="fx" href="#stack">Stack</a>
          <a className="v3-nav-cta fx" href="#kontakt">Kontakt</a>
        </div>
      </nav>
    </div>
  );
}

const CLAIM = ["Software,", "die", "im", "Betrieb", "läuft.", "Nicht", "nur", "in", "der", "Demo."];

function Hero() {
  return (
    <section id="top" data-hero className="v3-hero" aria-label="Intro">
      <div className="v3-hero-stage">
        <div className="v3-hero-grid" data-herogrid aria-hidden="true" />
        <div className="v3-hero-inner" data-hero-inner>
          <h1 className="v3-hero-name" aria-label="Timo Weiß">
            <span className="v3-hero-line" data-hx="-1" aria-hidden="true">
              <span className="v3-rise">Timo</span>
            </span>
            <span className="v3-hero-line" data-hx="1" aria-hidden="true">
              <span className="v3-rise v3-outline">Weiß</span>
            </span>
          </h1>
          <div className="v3-hero-rule" aria-hidden="true" />
          <div className="v3-hero-side">
            <p className="v3-hero-role">
              <span>Full-Stack Developer</span>
              <span>CTO · SimpleAct</span>
            </p>
            <nav className="v3-hero-jump" aria-label="Sprungnavigation">
              <a className="fx" href="#projekte"><span className="acc">→</span>Projekte ansehen</a>
              <a className="fx" href={GITHUB}><span className="acc">→</span>GitHub</a>
              <a className="fx" href={`mailto:${EMAIL}`}><span className="acc">→</span>Kontakt</a>
            </nav>
          </div>
        </div>
        <div className="v3-hero-claim" aria-hidden="true">
          <p>
            {CLAIM.map((w, i) => (
              <span key={i}>
                <span className="v3-word">
                  <span data-sw style={w === "Betrieb" ? { color: "var(--acc)" } : undefined}>{w}</span>
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
        <p className="v3-cue" data-cue aria-hidden="true">↓ scrollen</p>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="v3-marquee" aria-hidden="true">
      <div className="v3-marquee-track" data-mq>
        {[0, 1].map((k) => (
          <div className="v3-marquee-group" key={k}>
            {marqueeItems.map((t) => (
              <span key={t} style={{ display: "contents" }}>
                <span className="v3-marquee-item">{t}</span>
                <span className="v3-marquee-sep">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReplayHaven() {
  return (
    <section id="replayhaven" className="v3-rh">
      <div className="v3-inner">
        <div className="v3-rh-card" data-spot data-reveal="up">
          <SpotBar />
          <div className="v3-rh-text">
            <div className="v3-rh-head">
              <img data-drift="-0.05" src={replayHaven.icon} alt="ReplayHaven Icon" width="44" height="44" />
              <span>01 · Neu · Quellcode offen</span>
            </div>
            <h2 data-drift="0.06" data-reveal="clip">Replay<span>Haven</span></h2>
            <p>
              Ein selbst gehostetes Archiv für Game-Clips. Eine lokale KI benennt jeden Clip nach dem, was
              darin passiert. Die Originale bleiben auf dem eigenen Server und lassen sich in einer
              Web-Bibliothek ansehen.
            </p>
            <div className="v3-links">
              <a className="fx" href={replayHaven.url}>Projektseite ↗</a>
              <a className="fx" href={replayHaven.repo}>GitHub ↗</a>
            </div>
          </div>
          <a className="v3-rh-shot" href={replayHaven.url} tabIndex={-1}>
            <img src={replayHaven.screenshot} alt="ReplayHaven Web-Bibliothek" width="1440" height="900" loading="lazy" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Projects({ active, scrolly, onSelect, reduced }) {
  const p = projects[active];
  const imgRef = useRef(null);
  const detailRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduced) return;
    imgRef.current?.animate?.(
      [{ clipPath: "inset(0 0 0 100%)", opacity: 0.4 }, { clipPath: "inset(0 0 0 0%)", opacity: 1 }],
      { duration: 700, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    detailRef.current?.querySelectorAll("[data-ptext]").forEach((el, i) =>
      el.animate?.(
        [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }],
        { duration: 600, delay: 120 + i * 80, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" },
      ),
    );
  }, [active, reduced]);

  return (
    <section id="projekte" className="v3-section v3-projects">
      <div className="v3-inner">
        <div className="v3-head-row">
          <h2 className="v3-h2" data-drift="0.06" data-reveal="clip">
            Weitere Projekte<span className="v3-acc">.</span>
          </h2>
          <span className="v3-kicker" data-drift="-0.04">
            02 — {pad(projects.length + 1)} · Im Betrieb und in Arbeit
          </span>
        </div>
        <div
          className={`v3-proj-track${scrolly ? " is-scrolly" : ""}`}
          data-proj-track
          style={{ "--n": projects.length }}
        >
          <div className="v3-proj-layout">
            <div className="v3-proj-list">
              {projects.map((proj, i) => (
                <button
                  key={proj.title}
                  type="button"
                  data-reveal="up"
                  className={`v3-proj-row${i === active ? " is-active" : ""}`}
                  aria-pressed={i === active}
                  onClick={() => onSelect(i)}
                >
                  <span className="v3-rowbar" data-rowbar aria-hidden="true" />
                  <span className="v3-proj-num">{pad(i + 2)}</span>
                  <span className="v3-proj-main">
                    <span className="v3-proj-title">{proj.title}</span>
                    <span className="v3-proj-ctx">{proj.context}</span>
                  </span>
                  <span className="v3-proj-status">
                    <span className="v3-dot" style={{ background: proj.live ? "var(--live)" : "var(--wip)" }} />
                    {proj.status}
                  </span>
                </button>
              ))}
            </div>
            <div className="v3-proj-detail" data-reveal="up" ref={detailRef} aria-live="polite">
              <div className={`v3-proj-media${p.secret ? " is-secret" : ""}`}>
                <img ref={imgRef} src={p.screenshot} alt={p.title} />
                {p.secret && (
                  <div className="v3-stamp-wrap">
                    <div className="v3-stamp">
                      <span>VERTRAULICH</span>
                      <span>Internes Verwaltungs-Dashboard</span>
                    </div>
                  </div>
                )}
              </div>
              {p.caption && <span className="v3-proj-caption">{p.caption}</span>}
              <div className="v3-proj-block" data-ptext>
                <span className="v3-label">Ausgangslage</span>
                <p>{p.desc}</p>
              </div>
              <div className="v3-proj-block" data-ptext>
                <span className="v3-label">Ergebnis</span>
                <p>{p.outcome}</p>
              </div>
              <div className="v3-proj-foot">
                <div className="v3-proj-tech">
                  {p.tech.map((t) => <span key={t}>{t}</span>)}
                </div>
                {p.url && <a className="fx" href={p.url} style={{ fontSize: 15, color: "var(--ink)" }}>Live ansehen ↗</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="ueber" className="v3-section v3-about v3-fade-down">
      <div className="v3-inner">
        <p className="v3-about-lead" data-drift="0.05" data-reveal="clip">
          Seit 2018 schreibe ich Code. Erst Spiele in Unity, heute{" "}
          <span className="v3-acc">SaaS-Plattformen</span> und die Server darunter.
        </p>
        <div className="v3-about-grid">
          <div className="v3-portrait" data-reveal="up">
            <img data-parallax="0.07" src="/me.webp" alt="Portrait von Timo Weiß" loading="lazy" />
            <span className="v3-tag">Timo Weiß · Gelsenkirchen</span>
          </div>
          <div className="v3-about-text" data-reveal="up">
            <p>
              Ich bin <strong>Timo Weiß</strong>, aus Gelsenkirchen. 2023 habe ich die Ausbildung zum
              Fachinformatiker für Anwendungsentwicklung angefangen, mit Schwerpunkt auf{" "}
              <strong>C#/.NET und TypeScript</strong>. Seit Juli 2026 bin ich ausgelernt und arbeite fest bei
              der <a className="fx" href="https://www.gkd-el.de/">gkd-el</a>.
            </p>
            <p>
              2025 habe ich{" "}
              <a className="fx" href="https://simpleact.de" style={{ fontWeight: 600 }}>SimpleAct</a>{" "}
              mitgegründet, ein B2B-SaaS für EU-AI-Act-Compliance. Als CTO verantworte ich dort Architektur,
              Plattform und Automatisierung.
            </p>
            <p>
              Meine Infrastruktur betreibe ich selbst: <strong>TrueNAS, Coolify und n8n</strong> auf eigenen
              Servern, abgesichert über Cloudflare Tunnel und Authelia. Auch diese Seite läuft darauf.
            </p>
            <dl className="v3-facts">
              {[
                ["Standort", "Gelsenkirchen, NRW"],
                ["Status", "Festangestellt + CTO"],
                ["Projekte", "Auf Anfrage"],
                ["Seit", "2018"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="v3-label">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="v3-section v3-stack v3-fade-up">
      <div className="v3-inner">
        <div className="v3-stack-aside">
          <div className="v3-stack-photo" data-reveal="up">
            <img src="/images/setup/setup-photo.webp" alt="Homelab-Setup mit Server und NAS" loading="lazy" />
          </div>
          <div className="v3-stack-meta">
            <span>Homelab · Gelsenkirchen</span>
            <span>TrueNAS · Coolify · n8n</span>
          </div>
        </div>
        <div className="v3-stack-main">
          <p className="v3-stack-lead" data-reveal="clip">
            Vom Interface bis zur Platte im Rack — <span>alles aus einer Hand, alles selbst betrieben.</span>
          </p>
          <div>
            {skillGroups.map((g, i) => (
              <div className="v3-skill" data-reveal="up" key={g.label}>
                <div className="v3-skill-head">
                  <span className="v3-label">{pad(i + 1)}</span>
                  <h3>{g.label}</h3>
                  <p>{g.claim}</p>
                </div>
                <ul>
                  {g.items.map(([name, note]) => (
                    <li key={name}><span>{name}</span><span>{note}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildLog() {
  return (
    <section id="weg" className="v3-section v3-bp v3-fade-down" aria-label="Werdegang">
      <div className="v3-inner">
        <span className="v3-kicker">Build-Log</span>
        <h2 className="v3-h2" data-drift="0.06" data-reveal="clip">
          Der Weg bis hier<span style={{ color: "oklch(52% 0.014 290)" }}>.</span>
        </h2>
        <div className="v3-bp-track" data-bp-track>
          <div className="v3-bp-line" data-bp-line aria-hidden="true" />
          <ol>
            {buildPath.map(([period, title, text], i) => {
              const isNow = i === buildPath.length - 1;
              return (
                <li
                  key={period}
                  data-bp
                  className={`v3-bp-item ${i % 2 === 0 ? "is-left" : "is-right"}${isNow ? " is-now" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="v3-bp-year">
                    {period}
                    <span className="v3-bp-dot" aria-hidden="true" />
                    <span className="v3-bp-conn" aria-hidden="true" />
                    {isNow && (
                      <span className="v3-bp-now">
                        <span className="v3-dot" style={{ background: "currentColor" }} />heute
                      </span>
                    )}
                  </span>
                  <div className="v3-bp-body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="v3-section v3-principles v3-fade-up" aria-label="Arbeitsweise">
      <div className="v3-inner">
        <p className="v3-principles-intro" data-reveal="up">
          Sechs Regeln, nach denen ich baue — und nach denen auch diese Seite gebaut ist.
        </p>
        <ol>
          {principles.map(([title, text], i) => (
            <li className="v3-principle" data-reveal="up" key={title}>
              <span className="v3-principle-num" aria-hidden="true">{pad(i + 1)}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StatusCard({ data }) {
  const s = STATUS[data?.status] ?? STATUS.unknown;
  const pings = data?.pings ?? [];
  const uptime = data?.uptime24h == null ? "—" : (data.uptime24h * 100).toFixed(data.uptime24h >= 0.99 ? 2 : 1);
  return (
    <a
      className="v3-card v3-live"
      href={data?.pageUrl || "https://status.vvashed.dev/status/vvashed"}
      target="_blank"
      rel="noopener noreferrer"
      data-spot
      data-reveal="up"
      style={{ "--acc": s.color, "--hover-border": s.color }}
    >
      <SpotBar />
      <div className="v3-live-head">
        <span>Server-Status</span>
        <span className="v3-dot" style={{ background: s.color }} aria-hidden="true" />
      </div>
      <span className="v3-live-state" style={{ color: s.color }}>{data ? s.card : "Lädt …"}</span>
      <div className="v3-live-metrics">
        <div className="v3-live-value">
          <span>{uptime}<small>%</small></span>
          <span className="v3-label">Uptime 24h</span>
        </div>
        <div className="v3-beats" aria-hidden="true">
          {pings.map((ms, i) => (
            <span
              key={i}
              title={`${ms} ms`}
              style={{ background: s.color, opacity: (0.55 + 0.45 * (i / Math.max(1, pings.length - 1))).toFixed(2) }}
            />
          ))}
        </div>
        <span className="v3-ping">{data?.ping != null ? `${data.ping} ms` : "—"}</span>
      </div>
      <span className="visually-hidden">Öffnet die öffentliche Status-Seite</span>
    </a>
  );
}

function SpotifyCard({ data }) {
  const playing = Boolean(data?.isPlaying && data?.title);
  return (
    <a
      className="v3-card v3-live v3-spotify"
      href={playing && data.songUrl ? data.songUrl : "https://open.spotify.com/"}
      target="_blank"
      rel="noopener noreferrer"
      data-spot
      data-reveal="up"
      style={{ "--acc": "#1DB954", "--hover-border": "#1DB954" }}
    >
      <SpotBar />
      <div className="v3-live-head">
        <span>Spotify</span>
        <span className="v3-dot" style={{ background: playing ? "#1DB954" : "oklch(58% 0.01 290)" }} aria-hidden="true" />
      </div>
      <div className="v3-track">
        <div className="v3-track-art" aria-hidden="true">
          {playing && data.albumImageUrl ? (
            <img src={data.albumImageUrl} alt="" loading="lazy" />
          ) : (
            [0, 1, 2, 3].map((k) => <span className="v3-eq" key={k} />)
          )}
        </div>
        <div className="v3-track-info">
          <span>{playing ? data.title : "Gerade nichts am Laufen"}</span>
          <span>{playing ? data.artist : "Aktualisiert sich alle 30 s"}</span>
        </div>
      </div>
      <span className="visually-hidden">Öffnet Spotify</span>
    </a>
  );
}

function Contact({ status, track }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <section id="kontakt" className="v3-contact v3-fade-down">
      <div className="v3-inner">
        <span className="v3-kicker">Kontakt</span>
        <p className="v3-contact-lead" data-reveal="up">Kein Formular, kein Calendly. Eine Mail reicht.</p>
        <button type="button" className="v3-mail" data-reveal="clip" onClick={copy}>
          <span>contact@<wbr />vvashed.dev</span>
          <span className="v3-mail-hint" aria-live="polite">{copied ? "✓ kopiert" : "Klicken zum Kopieren"}</span>
        </button>
        <div className="v3-cards">
          <div className="v3-card" data-spot data-reveal="up">
            <SpotBar />
            <span className="v3-label">Passt gut</span>
            <p>Klar geschnittene Web-Projekte — Portal, Buchung, Admin — gern mit Anbindung an ein Bestandssystem. Ein Zeitplan, der Sorgfalt zulässt.</p>
          </div>
          <div className="v3-card" data-spot data-reveal="up">
            <SpotBar />
            <span className="v3-label">Passt nicht</span>
            <p>Vorhaben, die ein ganzes Team oder 24/7-Bereitschaft brauchen — ich arbeite solo, neben Job und CTO-Rolle. Das sage ich lieber vorher als mittendrin.</p>
          </div>
          <div className="v3-card is-cta" data-spot data-reveal="up">
            <SpotBar />
            <span className="v3-label">Der erste Schritt</span>
            <p>Zwei Sätze Kontext reichen: was entstehen soll, was bereits existiert und bis wann.</p>
            <div className="v3-links is-tight">
              <a className="fx" href={`mailto:${EMAIL}`}>Mail öffnen ↗</a>
              <a className="fx" href={GITHUB}>GitHub ↗</a>
            </div>
          </div>
        </div>

        <div className="v3-engine">
          <div className="v3-engine-head" data-reveal="up">
            <span className="v3-kicker">Maschinenraum</span>
            <p>Live-Daten aus externen APIs: Server-Status über Uptime Kuma, Musik über die Spotify Web API.</p>
          </div>
          <div className="v3-engine-grid">
            <StatusCard data={status} />
            <SpotifyCard data={track} />
          </div>
        </div>

        <div className="v3-wordmark" data-wordmark aria-hidden="true">
          <div>
            {"vvashed".split("").map((c, i) => <span data-wm key={i}>{c}</span>)}
          </div>
          <div className="v3-wordmark-fade" />
        </div>
        <footer className="v3-footer">
          <div>
            <img src="/logo-mark.png" alt="" width="22" height="22" />
            <span>© {new Date().getFullYear()} Timo Weiß · vvashed</span>
          </div>
          <nav aria-label="Rechtliches und Links">
            <a className="fx" href="/notes">Notizen</a>
            <a className="fx" href="/impressum">Impressum</a>
            <a className="fx" href="/datenschutz">Datenschutz</a>
            <a className="fx" href="https://github.com/SauerExe/Portfolio">Quelltext ↗</a>
            <a className="fx" href="https://v1.vvashed.dev">Frühere Version ↗</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}

const A11Y_ROWS = [
  ["textSize", "Textgröße", [["s", "A", "Kleine Schrift", 12], ["m", "A", "Normale Schrift", 15], ["l", "A", "Große Schrift", 19]]],
  ["contrast", "Kontrast", [["normal", "Normal", "Normaler Kontrast"], ["high", "Hoch", "Hoher Kontrast"]]],
  ["motion", "Motion", [["on", "An", "Animationen an"], ["off", "Aus", "Animationen aus"]]],
];

function A11yPanel({ values, setters }) {
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
                <span>Bleibt lokal im Browser. Keine Cookies, kein Tracking.</span>
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

export default function HomeV3() {
  const rootRef = useRef(null);
  const [textSize, setTextSize] = usePersisted("vv-textsize", "m");
  const [contrast, setContrast] = usePersisted("vv-contrast", "normal");
  const [motionOff, setMotionOff] = useMotionPref();
  const systemReduced = useMedia("(prefers-reduced-motion: reduce)");
  const staticMode = new URLSearchParams(window.location.search).has("static");
  const reduced = motionOff || systemReduced || staticMode;
  const projNarrow = useMedia("(max-width: 999px), (max-height: 559px)");
  const scrolly = !projNarrow && !reduced;

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const clock = useClock();
  const { data: status } = usePolling("/api/status", 60_000);
  const { data: track } = usePolling("/api/spotify/now-playing", 30_000);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const onProject = useCallback((i) => setActive(i), []);
  useScrollFx(rootRef, { reduced, scrolly, onProject });

  const selectProject = (i) => {
    const track = rootRef.current?.querySelector("[data-proj-track]");
    if (!scrolly || !track) return setActive(i);
    const vh = window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({
      top: top + ((i + 0.5) / projects.length) * (track.offsetHeight - vh + 100),
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={rootRef}
      className={`v3${ready ? " is-ready" : ""}`}
      data-textsize={textSize}
      data-contrast={contrast}
      data-motion={reduced ? "off" : "on"}
    >
      <a className="v3-skip" href="#main">Zum Inhalt springen</a>
      <TopBar status={status} track={track} clock={clock} />
      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        <Hero />
        <Marquee />
        <ReplayHaven />
        <Projects active={active} scrolly={scrolly} onSelect={selectProject} reduced={reduced} />
        <About />
        <Stack />
        <BuildLog />
        <Principles />
        <Contact status={status} track={track} />
      </main>
      <A11yPanel
        values={{ textSize, contrast, motion: motionOff ? "off" : "on" }}
        setters={{ textSize: setTextSize, contrast: setContrast, motion: (id) => setMotionOff(id === "off") }}
      />
    </div>
  );
}
