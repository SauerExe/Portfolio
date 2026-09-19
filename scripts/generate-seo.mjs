import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import { pageMeta, noteMeta, siteUrl } from "../src/data/seo.js";

// Load the actual JSX registry through Vite, so new notes need no second list.
const vite = await createServer({ server: { hmr: false, watch: null }, appType: "custom" });
try {
  const { posts } = await vite.ssrLoadModule("/src/notes/posts.js");
  const pages = { ...pageMeta };
  for (const post of posts) {
    if (!/^[\w-]+$/.test(post.slug) || pages[`/notes/${post.slug}`]) {
      throw new Error(`Invalid or duplicate note slug: ${post.slug}`);
    }
    pages[`/notes/${post.slug}`] = noteMeta(post);
  }

  const template = await readFile("dist/index.html", "utf8");
  const escape = (text) => text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);

  for (const [route, meta] of Object.entries(pages)) {
    const url = siteUrl + route;
    const html = template
      .replace(/<title>.*?<\/title>/s, () => `<title>${escape(meta.title)}</title>`)
      .replace(/<link\s+rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${url}" />`)
      .replace(/<meta\s+(name|property)="(description|og:title|og:description|og:url|og:type)"[^>]*>/g,
        (_, attr, name) => {
          const values = { description: meta.description, "og:title": meta.title,
            "og:description": meta.description, "og:url": url, "og:type": meta.type ?? "website" };
          return `<meta ${attr}="${name}" content="${escape(values[name])}" />`;
        });
    const dir = path.join("dist", route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html);
  }
  const urls = Object.keys(pages).map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`);
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
  await writeFile("dist/routes.json", JSON.stringify(Object.keys(pages)));
  console.log(`SEO: ${urls.length} pages with individual metadata and sitemap entries.`);
} finally {
  await vite.close();
}
