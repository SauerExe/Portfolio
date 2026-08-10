// Notizen-Registry: ein Eintrag pro Post, neueste zuerst.
// Jeder Post ist ein eigenes Modul unter src/notes/entries/ und exportiert
// `meta` (slug, title, date, teaser) plus die Komponente als Default-Export.
//
// Neuer Post in drei Schritten:
//   1. Datei unter src/notes/entries/ anlegen (bestehenden Post kopieren)
//   2. Hier importieren und oben in die Liste eintragen
//   3. Fertig — Listing und Route ergeben sich daraus
//
// MDX-Upgrade-Pfad (bewusst noch nicht umgesetzt, weil @mdx-js/rollup eine
// neue Dependency wäre → Rücksprache): Vite-Plugin ergänzen, Einträge als
// .mdx-Dateien schreiben, dieser Registry-Mechanismus bleibt identisch.
import KeinLogin, { meta as keinLoginMeta } from "./entries/kein-login-trotzdem-rechte.jsx";
import VercelFallback, { meta as vercelFallbackMeta } from "./entries/fallback-der-auf-vercel-nicht-geht.jsx";
import TagZuFrueh, { meta as tagZuFruehMeta } from "./entries/einen-tag-zu-frueh.jsx";
import NpmAudit, { meta as npmAuditMeta } from "./entries/ein-nachmittag-npm-audit.jsx";
import Terminbuchung, { meta as terminbuchungMeta } from "./entries/terminbuchung-selbst-gehostet.jsx";
import Turnstile, { meta as turnstileMeta } from "./entries/die-turnstile-saga.jsx";
import Csp, { meta as cspMeta } from "./entries/csp-verdoppelt-sich-selbst.jsx";
import DsgvoWizard, { meta as dsgvoWizardMeta } from "./entries/dsgvo-formulare-als-wizard.jsx";
import Badge, { meta as badgeMeta } from "./entries/ein-badge-rausgenommen.jsx";
import Postgres, { meta as postgresMeta } from "./entries/postgres-camelcase-spalten.jsx";
import Encoding, { meta as encodingMeta } from "./entries/encoding-bug.jsx";
import Impressum, { meta as impressumMeta } from "./entries/impressum-aber-lesbar.jsx";
import GoLiveGate, { meta as goLiveGateMeta } from "./entries/go-live-gate.jsx";

export const posts = [
  { ...keinLoginMeta, Component: KeinLogin },
  { ...vercelFallbackMeta, Component: VercelFallback },
  { ...tagZuFruehMeta, Component: TagZuFrueh },
  { ...npmAuditMeta, Component: NpmAudit },
  { ...terminbuchungMeta, Component: Terminbuchung },
  { ...turnstileMeta, Component: Turnstile },
  { ...cspMeta, Component: Csp },
  { ...dsgvoWizardMeta, Component: DsgvoWizard },
  { ...badgeMeta, Component: Badge },
  { ...postgresMeta, Component: Postgres },
  { ...encodingMeta, Component: Encoding },
  { ...impressumMeta, Component: Impressum },
  { ...goLiveGateMeta, Component: GoLiveGate },
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}
