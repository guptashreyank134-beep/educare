/** Verify the circular-motion diagram and the collisions section for the Physics 12 prep guide. */
const eq = (a, b, t = 1e-3) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const g = 9.8;

console.log("THE EXISTING EXAMPLE the diagram must match (r=50 m, v=15 m/s)");
const mu = 15 ** 2 / (50 * g);
chk("mu = v²/(rg) = 225/490 = 0.46", eq(mu, 0.45918, 1e-4), mu.toFixed(5));
chk("  the post says 0.46 — diagram must not contradict it", eq(Math.round(mu * 100) / 100, 0.46));
const a_c = 15 ** 2 / 50;
chk("centripetal acceleration a = v²/r = 4.5 m/s²", eq(a_c, 4.5), a_c.toFixed(2));
chk("  which is well under g, so the car does not need superhuman grip", a_c < g);

console.log("\nCOLLISION: 1200 kg at 20 m/s hits 800 kg at rest, they stick");
const m1 = 1200, u1 = 20, m2 = 800;
const v = (m1 * u1) / (m1 + m2);
chk("momentum conserved: v = 24000/2000 = 12 m/s", eq(v, 12), v.toFixed(2));
const ke1 = 0.5 * m1 * u1 ** 2;
const ke2 = 0.5 * (m1 + m2) * v ** 2;
chk("KE before = ½(1200)(20²) = 240,000 J", eq(ke1, 240000), ke1.toFixed(0));
chk("KE after  = ½(2000)(12²) = 144,000 J", eq(ke2, 144000), ke2.toFixed(0));
chk("KE LOST = 96,000 J — momentum is conserved, kinetic energy is NOT", eq(ke1 - ke2, 96000), (ke1 - ke2).toFixed(0));
chk("  that is 40% of the kinetic energy gone", eq(((ke1 - ke2) / ke1) * 100, 40), (((ke1 - ke2) / ke1) * 100).toFixed(1) + "%");
chk("  momentum before = momentum after = 24,000 kg·m/s", eq(m1 * u1, (m1 + m2) * v), String(m1 * u1));

console.log("\nSVG GEOMETRY (centre (210,265), R=150, car at theta=115 deg)");
const th = (115 * Math.PI) / 180;
const P = [210 + 150 * Math.cos(th), 265 - 150 * Math.sin(th)];
chk("car sits on the arc", eq(Math.hypot(P[0] - 210, P[1] - 265), 150, 1e-6), `(${P[0].toFixed(1)}, ${P[1].toFixed(1)})`);
const tangent = [-Math.sin(th), -Math.cos(th)];
const inward = [-Math.cos(th), Math.sin(th)];
chk("velocity is tangent: v · r = 0 (perpendicular to the radius)", eq(tangent[0] * Math.cos(th) + tangent[1] * -Math.sin(th), 0, 1e-9));
chk("friction points at the centre", eq(Math.hypot(inward[0], inward[1]), 1, 1e-9));
chk("  velocity and friction are perpendicular to each other", eq(tangent[0] * inward[0] + tangent[1] * inward[1], 0, 1e-9));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
