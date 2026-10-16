// Prepares the GitHub Pages preview build in /docs:
// keeps it out of search results and lets deep links (e.g. /services) load the app.
import { copyFileSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve(import.meta.dirname, "../../docs");
const index = resolve(out, "index.html");

writeFileSync(index, readFileSync(index, "utf8").replace('content="index, follow"', 'content="noindex, nofollow"'));
copyFileSync(index, resolve(out, "404.html"));
writeFileSync(resolve(out, ".nojekyll"), "");
writeFileSync(resolve(out, "robots.txt"), "User-agent: *\nDisallow: /\n");
rmSync(resolve(out, "sitemap.xml"), { force: true });
