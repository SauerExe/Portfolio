import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { once } from "node:events";

const child = spawn(process.execPath, ["server.js"], {
  env: { ...process.env, PORT: "0" }, stdio: ["ignore", "pipe", "inherit"],
});
try {
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Server startup timed out")), 10000);
    child.once("exit", (code) => { clearTimeout(timer); reject(new Error(`Server exited: ${code}`)); });
    child.once("error", reject);
    child.stdout.on("data", (data) => {
      const match = String(data).match(/Port (\d+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  const base = `http://localhost:${port}`;
  const routes = JSON.parse(await readFile("dist/routes.json", "utf8"));
  const titles = new Set();
  const sitemap = await fetch(`${base}/sitemap.xml`).then((res) => res.text());
  for (const route of routes) {
    const res = await fetch(base + route);
    assert.equal(res.status, 200, route);
    assert.ok(res.headers.get("cache-control").includes("no-transform"), `${route}: proxy script injection protection`);
    for (const header of ["content-security-policy", "strict-transport-security", "x-content-type-options", "referrer-policy"]) {
      assert.ok(res.headers.get(header), `${route}: missing ${header}`);
    }
    const html = await res.text();
    assert.ok(html.includes(`href="https://vvashed.dev${route}"`), `${route}: canonical`);
    assert.ok(html.includes(`property="og:url" content="https://vvashed.dev${route}"`), `${route}: OG URL`);
    assert.ok(sitemap.includes(`<loc>https://vvashed.dev${route}</loc>`), `${route}: sitemap`);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `${route}: duplicate title`);
    titles.add(title);
    if (route.startsWith("/notes/")) assert.ok(html.includes('property="og:type" content="article"'));
  }
  for (const route of ["/media/missing.png", "/missing.js", "/api/missing", "/api", "/unknown", "/notes/unknown"]) {
    const res = await fetch(base + route);
    assert.equal(res.status, 404, route);
    if (route.includes(".") || route.startsWith("/api")) {
      assert.ok(!res.headers.get("content-type").includes("text/html"), `${route}: unexpected HTML`);
    } else {
      assert.equal(res.headers.get("x-robots-tag"), "noindex");
    }
  }
  const trailingSlash = await fetch(`${base}/notes/`).then((res) => res.text());
  assert.ok(trailingSlash.includes('href="https://vvashed.dev/notes"'));
  console.log(`Passed: ${routes.length} pages, metadata, sitemap, security headers, trailing slash and 6 negative route cases.`);
} finally {
  child.kill();
  if (child.exitCode === null) await once(child, "exit");
}
