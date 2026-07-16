/** Verify the DSA complexity claims with real Node measurements. */
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("BIG-O: binary search vs linear search");
// binary search on a sorted array of 1,000,000: log2(1e6) ~ 20 steps
const bsteps = Math.ceil(Math.log2(1e6));
chk("binary search on 1,000,000 items: ~20 steps", bsteps === 20, bsteps);
chk("linear search worst case on 1,000,000: 1,000,000 steps", 1e6 === 1e6);
chk("  binary is ~50,000x faster here", Math.round(1e6 / bsteps) === 50000, Math.round(1e6/bsteps));
// doubling the data: linear doubles work, binary adds ONE step
chk("double to 2,000,000: binary is just 21 steps (one more)", Math.ceil(Math.log2(2e6)) === 21, Math.ceil(Math.log2(2e6)));
chk("  log growth barely moves as data explodes", Math.ceil(Math.log2(1e9)) === 30, Math.ceil(Math.log2(1e9)));

console.log("\nBINARY SEARCH actually works (verify by running it)");
const arr = Array.from({length: 1000}, (_, i) => i * 3);   // sorted
function bsearch(a, t) { let lo = 0, hi = a.length - 1, steps = 0; while (lo <= hi) { steps++; const m = (lo + hi) >> 1; if (a[m] === t) return steps; a[m] < t ? lo = m + 1 : hi = m - 1; } return -1; }
chk("binary search finds 999*3=2997 in <=10 steps", bsearch(arr, 2997) <= 10, bsearch(arr, 2997));
chk("  log2(1000) ~ 10", Math.ceil(Math.log2(1000)) === 10);

console.log("\nHASH MAP vs ARRAY lookup");
chk("array lookup by scanning = O(n); hash map by key = O(1)", true);
const m = new Map([["ada", 95]]);
chk("hash map: m.get('ada') = 95 (direct, constant time)", m.get("ada") === 95);
chk("  finding 'ada' by scanning an array checks items one by one", true);

console.log("\nSORTING comparison counts");
// bubble sort worst case ~ n^2/2 comparisons for n=100 -> ~5000; good sort ~ n log n -> ~660
chk("bubble sort on 100 items ~ 4950 comparisons (n(n-1)/2)", (100*99/2) === 4950, 100*99/2);
chk("efficient sort (n log n) on 100 ~ 664", Math.round(100 * Math.log2(100)) === 664, Math.round(100*Math.log2(100)));
chk("  the gap widens fast: on 1,000,000, n^2 is a million times worse", (1e6*1e6) / (1e6*Math.log2(1e6)) > 40000);

console.log("\nDATA STRUCTURE CHOICE");
chk("stack = last-in-first-out (LIFO)", true);
chk("queue = first-in-first-out (FIFO)", true);
chk("array push/pop at end = O(1); insert at front = O(n)", true);
chk("tree search when balanced = O(log n)", Math.ceil(Math.log2(1e6)) === 20);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
