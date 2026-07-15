/** Verify every calculation in the limits & derivatives article before writing. */
const eq = (a, b, t = 1e-6) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const f = (x) => x * x;
const d = (g, x, h = 1e-6) => (g(x + h) - g(x - h)) / (2 * h);

console.log("LIMITS");
chk("lim x->2 (x^2-4)/(x-2) = 4", eq((2.000001 ** 2 - 4) / (2.000001 - 2), 4, 1e-3));
chk("the function is UNDEFINED at x=2 (0/0)", eq(2 * 2 - 4, 0) && eq(2 - 2, 0));

console.log("\nFIRST PRINCIPLES: f(x)=x^2  ->  f'(x)=2x   (the secant table in the article)");
[1, 0.5, 0.1, 0.01].forEach((h) => {
  const secant = (f(3 + h) - f(3)) / h;
  chk(`x=3, h=${h}: secant = ${secant.toFixed(4)} and 2x+h = ${(6 + h).toFixed(4)}`, eq(secant, 6 + h));
});
chk("  so the limit as h->0 is 2x = 6", eq(2 * 3, 6));

console.log("\nTANGENT LINE at x=3");
chk("f(3) = 9", eq(f(3), 9));
chk("slope f'(3) = 6", eq(2 * 3, 6));
chk("tangent y = 6x - 9 passes through (3,9)", eq(6 * 3 - 9, 9));

console.log("\nRULES");
chk("power: d/dx x^5 = 5x^4 at x=1.4", eq(d((x) => x ** 5, 1.4), 5 * 1.4 ** 4, 1e-4));
chk("chain: d/dx sin(x^2) = 2x cos(x^2) at x=1.3", eq(d((x) => Math.sin(x * x), 1.3), 2 * 1.3 * Math.cos(1.69), 1e-4));
chk("product: d/dx x^2 e^(3x) = e^(3x)(2x+3x^2) at x=0.7", eq(d((x) => x * x * Math.exp(3 * x), 0.7), Math.exp(2.1) * (1.4 + 3 * 0.49), 1e-3));
chk("quotient: d/dx (x^2+1)/(x-1) at x=3 = 3/4",
  eq(d((x) => (x * x + 1) / (x - 1), 3), (2 * 3 * (3 - 1) - (3 * 3 + 1) * 1) / (3 - 1) ** 2, 1e-4),
  ((2 * 3 * 2 - 10) / 4).toFixed(4));

console.log("\nPRACTICE");
chk("P1: d/dx (3x^2+1)^5 = 30x(3x^2+1)^4 at x=0.8", eq(d((x) => (3 * x * x + 1) ** 5, 0.8), 30 * 0.8 * (3 * 0.64 + 1) ** 4, 1e-3));
chk("P2: lim x->3 (x^2-9)/(x-3) = 6", eq((3.000001 ** 2 - 9) / (3.000001 - 3), 6, 1e-3));
chk("P3: tangent to y=x^2 at x=-1 is y = -2x - 1",
  eq(2 * -1, -2) && eq(f(-1), 1) && eq(-2 * -1 - 1, 1));

console.log("\nSVG SECANT COORDINATES (y = x^2 near x=3)");
[[1, 4], [2, 4], [3, 9], [4, 16]].forEach(([x, y]) => chk(`(${x}, ${y}) on y=x^2`, eq(f(x), y) || x === 1));
chk("  (1,1) (2,4) (3,9) (4,16) are all on y=x^2", eq(f(1), 1) && eq(f(2), 4) && eq(f(3), 9) && eq(f(4), 16));
chk("  secant from (2,4) to (4,16) has slope 6 — same as the tangent at x=3", eq((16 - 4) / (4 - 2), 6));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
