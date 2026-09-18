/** Redirect invariants: no conflicting sources, no chains, no self-redirects. */

// Dynamic import: the project has no "type": "module", so a static import of a
// .ts data module is linked as CommonJS and its named exports are not visible.
const { redirectPairs, redirectSources } = await import("../data/redirects.ts");

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

const seen = new Map<string, string>();
const conflicts: string[] = [];
for (const [from, to] of redirectPairs) {
  const prior = seen.get(from);
  if (prior !== undefined && prior !== to) {
    conflicts.push(`${from} -> ${prior} AND ${to}`);
  }
  seen.set(from, to);
}

const chains = redirectPairs.filter(([, to]) => redirectSources.has(normalize(to)));
const selfRefs = redirectPairs.filter(([from, to]) => normalize(from) === normalize(to));

const fanIn = new Map<string, number>();
for (const [, to] of redirectPairs) fanIn.set(to, (fanIn.get(to) ?? 0) + 1);
const topFanIn = [...fanIn.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

console.log(`total redirects:      ${redirectPairs.length}`);
console.log(`distinct targets:     ${fanIn.size}`);
console.log(`conflicting sources:  ${conflicts.length}`);
conflicts.forEach((c) => console.log(`   ${c}`));
console.log(`chains:               ${chains.length}`);
chains.forEach(([from, to]) => console.log(`   ${from} -> ${to} -> ${seen.get(normalize(to))}`));
console.log(`self-redirects:       ${selfRefs.length}`);
console.log(`top fan-in:           ${topFanIn.map(([t, n]) => `${t}=${n}`).join("  ")}`);

if (conflicts.length || chains.length || selfRefs.length) process.exit(1);
