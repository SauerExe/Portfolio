export const meta = {
  slug: "csp-verdoppelt-sich-selbst",
  title: "CSP verdoppelt sich selbst",
  date: "Juni 2026",
  teaser:
    "Die Content-Security-Policy kam doppelt: einmal vom Reverse Proxy, einmal von der App. Jetzt gibt es eine Quelle der Wahrheit.",
};

export default function Post() {
  return (
    <>
      <p>
        Header-Debugging: die Content-Security-Policy wurde doppelt
        ausgeliefert. Browser haben das teils stillschweigend
        zusammengeführt, teils nicht.
      </p>
      <pre>{`$ curl -sI https://… | grep -ci content-security-policy
2

← einmal vom Reverse Proxy, einmal von der App`}</pre>
      <p>Jetzt gibt's nur noch eine Quelle der Wahrheit dafür.</p>
    </>
  );
}
