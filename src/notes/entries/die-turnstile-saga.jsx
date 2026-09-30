export const meta = {
  slug: "die-turnstile-saga",
  title: "Die Turnstile-Saga",
  date: "Juni 2026",
  project: "SimpleAct",
  teaser:
    "Fast eine Woche Cloudflare Turnstile: kleines Detail, unverhältnismäßig viel Zeit gekostet.",
};

export default function Post() {
  return (
    <>
      <p>
        Fast eine Woche mit Cloudflare Turnstile verbracht: erst sichtbar,
        dann unsichtbar, dann Token-Refresh bei Retries kaputt, dann eigene
        Hinweise versehentlich mitversteckt.
      </p>
      <pre>{`.cf-turnstile { visibility: hidden; }  /* Cloudflares Box */
.verify-hint  { /* bleibt */ }          /* unsere Zeile */`}</pre>
      <p>
        Am Ende genau das: nur Cloudflares Box ist unsichtbar, unsere
        Verifizierungs-Zeile steht. Kleines Detail, unverhältnismäßig viel
        Zeit gekostet.
      </p>
    </>
  );
}
