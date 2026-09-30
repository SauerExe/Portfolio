import { useEffect } from "react";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Alle scroll-gekoppelten Effekte der v3-Startseite in einem rAF-Handler:
// Fortschrittsbalken, Hero-Übergang (Name → Claim), Drift/Parallax,
// Projekt-Scrollytelling, Build-Log-Linie und die Wortmarke im Footer.
// Bewusst imperativ über data-Attribute, damit Scrollen keine React-Renders
// auslöst — nur der Wechsel des aktiven Projekts geht über onProject.
export function useScrollFx(rootRef, { reduced, scrolly, onProject }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (sel) => root.querySelector(sel);
    const qa = (sel) => root.querySelectorAll(sel);

    const bar = q("[data-progress]");
    const hero = q("[data-hero]");
    const heroInner = q("[data-hero-inner]");
    const heroGrid = q("[data-herogrid]");
    const cue = q("[data-cue]");
    const claim = q(".v3-hero-claim");
    const words = qa("[data-sw]");
    const drifts = qa("[data-drift]");
    const parallax = qa("[data-parallax]");
    const projTrack = q("[data-proj-track]");
    const rowbars = qa("[data-rowbar]");
    const bpTrack = q("[data-bp-track]");
    const bpLine = q("[data-bp-line]");
    const wordmark = q("[data-wordmark]");
    const wmLetters = qa("[data-wm]");
    let bpMax = 0;
    // Noch verdeckte Reveal-Elemente. Bewusst im Scroll-Handler geprüft statt
    // per IntersectionObserver: der meldet bei CSS-zoom (Textgröße „L“) nicht
    // zuverlässig, und die Elemente blieben dann unsichtbar.
    const pending = new Set();
    const pendingBp = new Set();
    const reveal = (el) => {
      pending.delete(el);
      el.classList.remove("is-pending");
      if (el.dataset.reveal === "clip") el.style.clipPath = "inset(-20% -5% -25% -5%)";
    };
    let lastIdx = -1;

    const update = () => {
      const vh = window.innerHeight;
      pending.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.9) reveal(el); });
      pendingBp.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.86) { el.classList.add("is-in"); pendingBp.delete(el); }
      });
      const max = document.documentElement.scrollHeight - vh;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp01(window.scrollY / max) : 0})`;

      if (hero && heroInner) {
        const total = hero.offsetHeight - vh;
        const p = reduced || total <= 0 ? 0 : clamp01(-hero.getBoundingClientRect().top / total);
        const k = clamp01(p / 0.3);
        if (heroGrid) heroGrid.style.transform = `translateY(${(p * 12).toFixed(2)}%)`;
        heroInner.style.opacity = 1 - k;
        heroInner.style.transform = `translateY(${-10 * k}%)`;
        if (cue) cue.style.opacity = 1 - clamp01(p / 0.08);
        // Erst beim Scrollen sichtbar — sonst wertet der Browser den noch
        // weggeklappten Claim als größtes Element (LCP) statt des Namens.
        if (claim) claim.style.visibility = p > 0.15 ? "visible" : "";
        if (!reduced) {
          words.forEach((w, i) => {
            const t = clamp01((p - 0.22 - i * 0.03) / 0.4);
            const e = 1 - (1 - t) * (1 - t);
            w.style.transform = `translateY(${115 * (1 - e)}%)`;
          });
        }
      }

      if (!reduced) {
        // Erst alle Maße lesen, dann schreiben — sonst erzwingt jedes
        // Element ein eigenes Layout pro Frame.
        const writes = [];
        drifts.forEach((el) => {
          const host = el.closest("section") || el.parentElement;
          const r = host.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          const c = el.getBoundingClientRect();
          const current = parseFloat(el.style.translate?.split(" ")[1]) || 0;
          const off = (c.top + c.height / 2 - current - vh / 2) * parseFloat(el.dataset.drift);
          writes.push(() => { el.style.translate = `0 ${off.toFixed(1)}px`; });
        });
        parallax.forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
          writes.push(() => { el.style.transform = `translateY(${off.toFixed(1)}px) scale(1.14)`; });
        });
        writes.forEach((w) => w());
      }

      if (projTrack && scrolly) {
        const r = projTrack.getBoundingClientRect();
        const n = rowbars.length;
        const p = clamp01((100 - r.top) / Math.max(1, r.height - vh + 100));
        const idx = Math.min(n - 1, Math.floor(p * n));
        if (idx !== lastIdx) {
          lastIdx = idx;
          onProject(idx);
        }
        rowbars.forEach((b, i) => { b.style.transform = `scaleX(${clamp01(p * n - i)})`; });
      }

      if (bpTrack && bpLine && !reduced && bpMax < 1) {
        const r = bpTrack.getBoundingClientRect();
        const prog = clamp01((0.8 * vh - r.top) / (0.15 * vh + r.height));
        if (prog > bpMax) {
          bpMax = prog;
          bpLine.style.transform = `scaleY(${prog})`;
        }
      }

      if (wordmark && !reduced) {
        const r = wordmark.getBoundingClientRect();
        if (r.top < vh + 100) {
          const p = clamp01((vh - r.top) / (r.height * 0.9 + vh * 0.25));
          wmLetters.forEach((l, i) => {
            const t = clamp01(p * 1.7 - i * 0.1);
            const e = 1 - Math.pow(1 - t, 3);
            l.style.transform = `translateY(${(1 - e) * 55}%)`;
            l.style.opacity = e;
            l.style.filter = `blur(${((1 - e) * 14).toFixed(1)}px)`;
          });
        }
      }
    };

    // Beim Umschalten auf "Motion aus" gesetzte Inline-Werte zurücknehmen
    if (reduced) {
      drifts.forEach((el) => { el.style.translate = ""; });
      parallax.forEach((el) => { el.style.transform = ""; });
      words.forEach((w) => { w.style.transform = ""; });
      wmLetters.forEach((l) => { l.style.transform = ""; l.style.opacity = ""; l.style.filter = ""; });
      if (bpLine) bpLine.style.transform = "";
    }
    if (!scrolly) rowbars.forEach((b) => { b.style.transform = ""; });

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    // Reveals: Elemente unterhalb des ersten Viewports starten verdeckt
    if (!reduced) {
      const vh = window.innerHeight;
      const ease = "cubic-bezier(.16,1,.3,1)";
      qa("[data-reveal]").forEach((el) => {
        // Schon sichtbar: sofort zeigen — auch falls ein früherer Lauf
        // (z. B. vor dem Einlesen gespeicherter Einstellungen) es versteckt hat
        if (el.getBoundingClientRect().top < vh * 0.92) {
          el.classList.remove("is-pending");
          return;
        }
        const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
        const d = Math.min(sibs.indexOf(el), 5) * 80;
        el.style.transition = `opacity .9s ${ease} ${d}ms, transform 1.1s ${ease} ${d}ms, clip-path 1.2s ${ease} ${d}ms, background .25s`;
        el.classList.add("is-pending");
        pending.add(el);
      });
    } else {
      qa("[data-reveal]").forEach((el) => { el.classList.remove("is-pending"); el.style.clipPath = ""; });
    }

    // Build-Log-Einträge (gleiche Prüfung wie die Reveals)
    qa("[data-bp]:not(.is-in)").forEach((el) => pendingBp.add(el));
    update();

    // Hero-Name folgt leicht dem Mauszeiger
    const lines = qa("[data-hx]");
    const onMove = (e) => {
      if (reduced || !hero || hero.getBoundingClientRect().top < -hero.offsetHeight * 0.3) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      lines.forEach((l) => { l.style.translate = `${(nx * 28 * parseFloat(l.dataset.hx)).toFixed(1)}px 0`; });
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) window.addEventListener("mousemove", onMove, { passive: true });
    if (reduced) lines.forEach((l) => { l.style.translate = ""; });

    // Marquee beschleunigt mit der Scroll-Geschwindigkeit
    // Läuft nur, solange gescrollt wird, und schläft ein, sobald die
    // Geschwindigkeit wieder bei 1 angekommen ist.
    const mq = q("[data-mq]");
    let loopId = 0;
    let rate = 1;
    let lastY = window.scrollY;
    const loop = () => {
      const y = window.scrollY;
      const v = Math.abs(y - lastY);
      lastY = y;
      rate += (1 + Math.min(v * 0.35, 7) - rate) * 0.08;
      const anim = mq?.getAnimations?.()[0];
      if (anim) anim.playbackRate = rate;
      loopId = v === 0 && Math.abs(rate - 1) < 0.01 ? 0 : requestAnimationFrame(loop);
      if (!loopId && anim) anim.playbackRate = 1;
    };
    const kickMarquee = () => { if (!loopId && !reduced) loopId = requestAnimationFrame(loop); };
    window.addEventListener("scroll", kickMarquee, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", kickMarquee);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loopId);
      pending.clear();
      qa("[data-reveal].is-pending").forEach((el) => el.classList.remove("is-pending"));
      const anim = mq?.getAnimations?.()[0];
      if (anim) anim.playbackRate = 1;
      rowbars.forEach((b) => { b.style.transform = ""; });
      pendingBp.clear();
    };
  }, [rootRef, reduced, scrolly, onProject]);
}
