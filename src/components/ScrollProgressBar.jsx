import { useEffect, useRef } from "react";
import { getLenisInstance, onLenisChange } from "../hooks/useLenisController.js";

// Custom draggable scroll-progress bar, synced to Lenis when smooth scroll
// is active and falling back to native `window.scrollTo` otherwise
// (`T2` in the original bundle).
export default function ScrollProgressBar() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    let rafId = 0;
    let thumbHeight = 40;
    let isDragging = false;
    let grabOffset = thumbHeight / 2;

    // Layout-Werte cachen: Reads wie scrollHeight bei jedem Scroll-Frame
    // erzwingen sonst Reflows, während GSAP parallel Styles schreibt.
    let docHeight = 0;
    let viewportHeight = 0;
    let trackHeight = 0;

    const measure = () => {
      docHeight = document.documentElement.scrollHeight;
      viewportHeight = window.innerHeight;
      trackHeight = track.clientHeight;
    };

    const scrollableHeight = () => docHeight - viewportHeight;

    const currentScrollFraction = () => {
      const scrollable = scrollableHeight();
      return scrollable > 0 ? window.scrollY / scrollable : 0;
    };

    const update = () => {
      rafId = 0;
      const scrollable = scrollableHeight();
      thumbHeight = Math.max(trackHeight * (viewportHeight / docHeight), 40);
      const fraction = currentScrollFraction();
      const offset = (trackHeight - thumbHeight) * fraction;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${offset}px)`;
      track.style.opacity = scrollable > 40 ? "1" : "0";
      track.style.pointerEvents = scrollable > 40 ? "auto" : "none";
    };

    const requestUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const scrollTo = (targetY) => {
      const clamped = Math.min(Math.max(targetY, 0), scrollableHeight());
      const lenis = getLenisInstance();
      if (lenis) lenis.scrollTo(clamped, { immediate: true });
      else window.scrollTo(0, clamped);
    };

    const scrollToPointer = (clientY) => {
      const rect = track.getBoundingClientRect();
      const travel = rect.height - thumbHeight;
      const pointerOffsetInTrack = clientY - rect.top - grabOffset;
      const fraction = travel > 0 ? pointerOffsetInTrack / travel : 0;
      scrollTo(fraction * scrollableHeight());
    };

    const onPointerDown = (event) => {
      event.preventDefault();
      const rect = track.getBoundingClientRect();
      const thumbTop = rect.top + (rect.height - thumbHeight) * currentScrollFraction();
      const clientY = event.clientY;
      grabOffset = clientY >= thumbTop && clientY <= thumbTop + thumbHeight
        ? clientY - thumbTop
        : thumbHeight / 2;
      isDragging = true;
      track.setPointerCapture(event.pointerId);
      document.body.style.userSelect = "none";
      scrollToPointer(clientY);
    };

    const onPointerMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();
      scrollToPointer(event.clientY);
    };

    const onPointerUp = (event) => {
      if (!isDragging) return;
      isDragging = false;
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      document.body.style.userSelect = "";
    };

    let unsubscribeScroll;
    const attachToActiveLenis = () => {
      unsubscribeScroll?.();
      unsubscribeScroll = undefined;
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.on("scroll", requestUpdate);
        unsubscribeScroll = () => lenis.off("scroll", requestUpdate);
      }
    };
    attachToActiveLenis();
    const unsubscribeLenisChange = onLenisChange(attachToActiveLenis);

    const onResize = () => {
      measure();
      requestUpdate();
    };
    // Dokumenthöhe ändert sich auch ohne Resize (z. B. Projekt-Accordion):
    // ResizeObserver auf <body> hält den Cache aktuell.
    const bodyObserver = new ResizeObserver(onResize);
    bodyObserver.observe(document.body);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize);
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    measure();
    update();

    return () => {
      unsubscribeLenisChange();
      unsubscribeScroll?.();
      bodyObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", onResize);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      document.body.style.userSelect = "";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={trackRef} className="scrollbar" aria-hidden="true">
      <div ref={thumbRef} className="scrollbar-thumb" />
    </div>
  );
}
