import { useRef, useState } from "react";

// Screenshot/GIF-Slot für Projekte ohne Live-Link: Thumbnail in der
// Projekt-Card, Klick öffnet ein Lightbox-Modal (natives <dialog>,
// Escape und Klick auf den Backdrop schließen).
// Existiert das Bild unter src (noch) nicht, fällt die Komponente auf
// fallbackSrc zurück; fehlt auch das, steht ein sichtbarer Platzhalter da.
export default function ProjectMedia({ src, alt, fallbackSrc }) {
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
          width={640}
          height={400}
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
