/** Verify every calculation in the trig identities article before writing it. */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const { sin, cos, tan, PI: π } = Math;

console.log("IDENTITIES");
[0.3, 1.1, 2.7, 4.9].forEach((θ) =>
  chk(`sin²θ + cos²θ = 1 at θ=${θ}`, eq(sin(θ) ** 2 + cos(θ) ** 2, 1))
);
[0.3, 1.1, 2.7].forEach((θ) =>
  chk(`1 + tan²θ = sec²θ at θ=${θ}`, eq(1 + tan(θ) ** 2, 1 / cos(θ) ** 2, 1e-9))
);
[0.4, 1.9].forEach((θ) =>
  chk(`sin2θ = 2sinθcosθ at θ=${θ}`, eq(sin(2 * θ), 2 * sin(θ) * cos(θ)))
);
[0.4, 1.9].forEach((θ) => {
  chk(`cos2θ = cos²θ − sin²θ at θ=${θ}`, eq(cos(2 * θ), cos(θ) ** 2 - sin(θ) ** 2));
  chk(`  = 2cos²θ − 1`, eq(cos(2 * θ), 2 * cos(θ) ** 2 - 1));
  chk(`  = 1 − 2sin²θ`, eq(cos(2 * θ), 1 - 2 * sin(θ) ** 2));
});

console.log("\nWORKED EXAMPLE: simplify (1 − cos²θ)/sinθ  ->  sinθ");
[0.7, 2.2].forEach((θ) => chk(`at θ=${θ}`, eq((1 - cos(θ) ** 2) / sin(θ), sin(θ))));

console.log("\nWORKED EXAMPLE: solve 2sin²x + sinx − 1 = 0, 0 ≤ x < 2π");
// (2u − 1)(u + 1) = 0 with u = sin x  ->  sin x = 1/2 or sin x = −1
const f = (x) => 2 * sin(x) ** 2 + sin(x) - 1;
[[π / 6, "π/6"], [5 * π / 6, "5π/6"], [3 * π / 2, "3π/2"]].forEach(([x, n]) =>
  chk(`x = ${n} satisfies it`, eq(f(x), 0, 1e-12), f(x).toExponential(1))
);
chk("factoring is right: (2u−1)(u+1) = 2u² + u − 1", (() => {
  for (const u of [-0.9, 0.2, 0.7]) if (!eq((2 * u - 1) * (u + 1), 2 * u * u + u - 1)) return false;
  return true;
})());
chk("sin x = −1 gives ONLY 3π/2 in range", eq(sin(3 * π / 2), -1) && !eq(sin(π / 2), -1));

console.log("\nPRACTICE: solve 2cos²x − 3cosx + 1 = 0, 0 ≤ x < 2π");
// (2u − 1)(u − 1) = 0  ->  cos x = 1/2  or  cos x = 1
const g = (x) => 2 * cos(x) ** 2 - 3 * cos(x) + 1;
[[0, "0"], [π / 3, "π/3"], [5 * π / 3, "5π/3"]].forEach(([x, n]) =>
  chk(`x = ${n}`, eq(g(x), 0, 1e-12))
);
chk("factoring: (2u−1)(u−1) = 2u² − 3u + 1", (() => {
  for (const u of [-0.4, 0.3, 0.9]) if (!eq((2 * u - 1) * (u - 1), 2 * u * u - 3 * u + 1)) return false;
  return true;
})());

console.log("\nPRACTICE: prove tanθ·cosθ = sinθ");
[0.5, 2.0].forEach((θ) => chk(`at θ=${θ}`, eq(tan(θ) * cos(θ), sin(θ))));

console.log("\nUNIT CIRCLE COORDINATES used in the SVG");
const pts = [[π / 6, "π/6", Math.sqrt(3) / 2, 0.5], [π / 4, "π/4", Math.SQRT1_2, Math.SQRT1_2], [π / 3, "π/3", 0.5, Math.sqrt(3) / 2]];
pts.forEach(([θ, n, x, y]) => {
  chk(`cos(${n}) = ${x.toFixed(4)}`, eq(cos(θ), x));
  chk(`sin(${n}) = ${y.toFixed(4)}`, eq(sin(θ), y));
});

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
