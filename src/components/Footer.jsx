import { useMotionPref } from "../hooks/useMotionPref.js";

export default function Footer() {
  const [reduced, setReduced] = useMotionPref();

  return (
    <footer className="footer">
      <div className="footer-schicht-sep" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="footer-inner">
        <span className="footer-coords" aria-label="Standort: Gelsenkirchen">
          51.5177° N, 7.0857° E
        </span>
        <div className="footer-motion">
          <button
            className="footer-motion-btn"
            type="button"
            aria-pressed={reduced}
            onClick={() => setReduced((v) => !v)}
            title={reduced ? "Animationen einschalten" : "Animationen deaktivieren"}
          >
            {reduced ? "Motion: aus" : "Motion: an"}
          </button>
        </div>
        <span>
          © {new Date().getFullYear()} Timo Weiß
        </span>
      </div>
    </footer>
  );
}
