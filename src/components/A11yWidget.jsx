import { useEffect, useState } from "react";
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

export default function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [textSize, setTextSize] = usePersistedSetting("vv-textsize", "m");
  const [contrast, setContrast] = usePersistedSetting("vv-contrast", "normal");
  const [reduced, setReduced] = useMotionPref();

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

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="a11y-toggle"
        aria-expanded={open}
        aria-controls="a11y-modal"
        aria-label="Darstellung anpassen: Textgröße, Kontrast, Motion"
        onClick={() => setOpen(true)}
      >
        Aa
      </button>

      <div
        className={`a11y-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div
          id="a11y-modal"
          className="a11y-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Darstellung anpassen"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="a11y-modal-head">
            <span className="a11y-modal-title mono">Darstellung</span>
            <button
              type="button"
              className="a11y-close"
              aria-label="Schließen"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="a11y-row">
            <span className="a11y-label mono">Textgröße</span>
            <div className="a11y-options">
              {TEXT_SIZES.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  title={size.title}
                  className={`a11y-opt a11y-opt--${size.id}${textSize === size.id ? " is-active" : ""}`}
                  aria-pressed={textSize === size.id}
                  onClick={() => setTextSize(size.id)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <div className="a11y-row">
            <span className="a11y-label mono">Kontrast</span>
            <div className="a11y-options">
              <button
                type="button"
                className={`a11y-opt${contrast !== "high" ? " is-active" : ""}`}
                aria-pressed={contrast !== "high"}
                onClick={() => setContrast("normal")}
              >
                Normal
              </button>
              <button
                type="button"
                className={`a11y-opt${contrast === "high" ? " is-active" : ""}`}
                aria-pressed={contrast === "high"}
                onClick={() => setContrast("high")}
              >
                Hoch
              </button>
            </div>
          </div>

          <div className="a11y-row">
            <span className="a11y-label mono">Motion</span>
            <div className="a11y-options">
              <button
                type="button"
                className={`a11y-opt${!reduced ? " is-active" : ""}`}
                aria-pressed={!reduced}
                onClick={() => setReduced(false)}
              >
                An
              </button>
              <button
                type="button"
                className={`a11y-opt${reduced ? " is-active" : ""}`}
                aria-pressed={reduced}
                onClick={() => setReduced(true)}
              >
                Aus
              </button>
            </div>
          </div>

          <p className="a11y-note mono">
            Wird lokal im Browser gespeichert.
          </p>
        </div>
      </div>
    </>
  );
}
