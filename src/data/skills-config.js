// Repo-Belege für die Skills-Sektion: „Vorführen statt behaupten".
// `skill` muss exakt dem `name` eines Eintrags in skillGroups (content.js)
// entsprechen (Groß-/Kleinschreibung und Leerzeichen werden beim Abgleich
// ignoriert). Leere repoUrl = kein Link, der Skill bleibt reiner Text.
//
// Zum Eintragen einfach die URL ergänzen, z. B.:
//   { skill: "React / Next.js", repoUrl: "https://github.com/SauerExe/vvashed-dev" },
export const skillRepos = [
  // Interface
  { skill: "TypeScript / JavaScript", repoUrl: "" },
  { skill: "React / Next.js", repoUrl: "" },
  { skill: "Tailwind CSS", repoUrl: "" },
  { skill: "Motion", repoUrl: "" },

  // Backend & Daten
  { skill: "C# / .NET 10", repoUrl: "" },
  { skill: "EF Core", repoUrl: "" },
  { skill: "JWT / LDAP", repoUrl: "" },
  { skill: "Supabase", repoUrl: "" },
  { skill: "zod", repoUrl: "" },

  // Infrastruktur & Automation
  { skill: "TrueNAS", repoUrl: "" },
  { skill: "Coolify", repoUrl: "" },
  { skill: "n8n", repoUrl: "" },
  { skill: "Cloudflare Tunnel", repoUrl: "" },
  { skill: "Authelia", repoUrl: "" },

  // Werkzeuge
  { skill: "Git & GitHub", repoUrl: "" },
  { skill: "Vercel", repoUrl: "" },
];

const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

export function repoForSkill(name) {
  const entry = skillRepos.find((r) => normalize(r.skill) === normalize(name));
  return entry?.repoUrl || null;
}

export function hasAnyRepoLinks() {
  return skillRepos.some((r) => r.repoUrl);
}
