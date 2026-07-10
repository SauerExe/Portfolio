import { useEffect, useRef, useState } from "react";
import { useMotionPref } from "../hooks/useMotionPref.js";

// Barrierefreiheits-Einstellungen als Modal, Trigger unten rechts.
// Werte landen als data-Attribute auf <html> und in localStorage.
function usePersistedSetting(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

const TEXT_SIZES = [
  { id: "s", label: "A", title: "Kleine Schrift" },
  { id: "m", label: "A", title: "Normale Schrift" },
  { id: "l", label: "A", title: "Große Schrift" },
];

function SlidersIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <circle cx="15" cy="6" r="2.6" fill="var(--bg-surface)" />
      <circle cx="8" cy="12" r="2.6" fill="var(--bg-surface)" />
      <circle cx="17" cy="18" r="2.6" fill="var(--bg-surface)" />
    </svg>
  );
}

function Segmented({ labelId, label, options, value, onChange }) {
  return (
    <div className="a11y-row">
      <span className="a11y-label mono" id={labelId}>
        {label}
      </span>
      <div className="a11y-seg" role="group" aria-labelledby={labelId}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            title={opt.title}
            className={`a11y-seg-btn${opt.className ? ` ${opt.className}` : ""}${
              value === opt.id ? " is-active" : ""
            }`}
            aria-pressed={value === opt.id}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [textSize, setTextSize] = usePersistedSetting("vv-textsize", "m");
  const [contrast, setContrast] = usePersistedSetting("vv-contrast", "normal");
  const [reduced, setReduced] = useMotionPref();
  const modalRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === "m") delete root.dataset.textsize;
    else root.dataset.textsize = textSize;
  }, [textSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (contrast === "high") root.dataset.contrast = "high";
    else delete root.dataset.contrast;
  }, [contrast]);

  // Focus-Trap: Fokus bleibt im Modal, Escape schließt,
  // beim Schließen geht der Fokus zurück auf den Trigger.
  useEffect(() => {
    if (!open) return;
    const modal = modalRef.current;
    const focusables = () =>
      Array.from(modal?.querySelectorAll("button") ?? []);
    focusables()[0]?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="a11y-toggle"
        aria-expanded={open}
        aria-controls="a11y-modal"
        aria-label="Darstellung anpassen: Textgröße, Kontrast, Motion"
        onClick={() => setOpen(true)}
      >
        <SlidersIcon />
      </button>

      <div
        className={`a11y-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div
          ref={modalRef}
          id="a11y-modal"
          className="a11y-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Darstellung anpassen"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="a11y-modal-head">
            <div className="a11y-modal-titles">
              <p className="a11y-modal-title mono">Darstellung</p>
              <p className="a11y-modal-sub">
                Bleibt lokal im Browser. Keine Cookies, kein Tracking.
              </p>
            </div>
            <button
              type="button"
              className="a11y-close"
              aria-label="Schließen"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </header>

          <Segmented
            labelId="a11y-label-textsize"
            label="Textgröße"
            value={textSize}
            onChange={setTextSize}
            options={TEXT_SIZES.map((s) => ({
              ...s,
              className: `a11y-seg-btn--${s.id}`,
            }))}
          />

          <Segmented
            labelId="a11y-label-contrast"
            label="Kontrast"
            value={contrast}
            onChange={setContrast}
            options={[
              { id: "normal", label: "Normal", title: "Normaler Kontrast" },
              { id: "high", label: "Hoch", title: "Hoher Kontrast" },
            ]}
          />

          <Segmented
            labelId="a11y-label-motion"
            label="Motion"
            value={reduced ? "off" : "on"}
            onChange={(id) => setReduced(id === "off")}
            options={[
              { id: "on", label: "An", title: "Animationen an" },
              { id: "off", label: "Aus", title: "Animationen aus" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
