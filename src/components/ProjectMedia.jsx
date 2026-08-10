import { useRef, useState } from "react";

// Screenshot/GIF-Slot für Projekte ohne Live-Link: Thumbnail in der
// Projekt-Card, Klick öffnet ein Lightbox-Modal (natives <dialog>,
// Escape und Klick auf den Backdrop schließen).
// Existiert das Bild unter src (noch) nicht, fällt die Komponente auf
// fallbackSrc zurück; fehlt auch das, steht ein sichtbarer Platzhalter da.
// width/height sind nur das Seitenverhältnis für die Platzreservierung — die
// CSS-Regel (width: 100%, height: auto) bestimmt die echte Größe. Bilder, die
// nicht 16:10 sind, geben ihre Maße mit, sonst springt das Layout beim Laden.
export default function ProjectMedia({ src, alt, fallbackSrc, width = 640, height = 400 }) {
  const dialogRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [broken, setBroken] = useState(false);

  const onError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
    else setBroken(true);
  };

  if (broken) {
    return (
      <div className="project-media-missing mono" role="img" aria-label={alt}>
        Bild folgt: {src}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="project-media"
        aria-haspopup="dialog"
        aria-label={`${alt} – vergrößert anzeigen`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <img
          src={currentSrc}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          onError={onError}
        />
        <span className="project-media-hint mono" aria-hidden="true">
          Klicken zum Vergrößern
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="project-media-lightbox"
        aria-label={alt}
        onClick={(event) => {
          // Klick auf den Backdrop (= das dialog-Element selbst) schließt.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <img src={currentSrc} alt={alt} loading="lazy" />
        <button
          type="button"
          className="project-media-close mono"
          onClick={() => dialogRef.current?.close()}
        >
          Schließen ×
        </button>
      </dialog>
    </>
  );
}
