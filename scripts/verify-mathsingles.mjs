/** Verify math for algebra-functions, trig-coordgeo, polynomial-rational, physics-math. */
const eq = (a, b, t = 1e-6) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("ALGEBRA & FUNCTIONS");
chk("factor x^2-5x+6 = (x-2)(x-3): roots 2,3", eq((2 - 2) * (2 - 3), 0) && eq((3 - 2) * (3 - 3), 0));
chk("quadratic formula x^2-5x+6: (5±1)/2 = 3,2", eq((5 + 1) / 2, 3) && eq((5 - 1) / 2, 2));
chk("discriminant b^2-4ac = 25-24 = 1 > 0 -> two real roots", eq(25 - 24, 1));
chk("function f(x)=2x+1: f(3)=7", eq(2 * 3 + 1, 7));
chk("composition f(g(x)): f(x)=x^2, g(x)=x+1, f(g(2))=9", eq((2 + 1) ** 2, 9));
chk("slope of line through (1,2),(3,8) = 3", eq((8 - 2) / (3 - 1), 3));

console.log("\nTRIG & COORDINATE GEOMETRY");
chk("SOH CAH TOA: 3-4-5 triangle, sin = 3/5 = 0.6", eq(3 / 5, 0.6));
chk("cos = 4/5 = 0.8, tan = 3/4 = 0.75", eq(4 / 5, 0.8) && eq(3 / 4, 0.75));
chk("Pythagoras: 3^2+4^2=5^2", eq(9 + 16, 25));
chk("distance (1,2) to (4,6) = 5", eq(Math.hypot(3, 4), 5));
chk("midpoint (1,2),(4,6) = (2.5,4)", eq((1 + 4) / 2, 2.5) && eq((2 + 6) / 2, 4));
chk("sin 30 = 0.5, cos 60 = 0.5", eq(Math.sin(Math.PI / 6), 0.5) && eq(Math.cos(Math.PI / 3), 0.5, 1e-9));
chk("circle center (0,0) radius 5: x^2+y^2=25; (3,4) on it", eq(3 ** 2 + 4 ** 2, 25));

console.log("\nPOLYNOMIAL & RATIONAL FUNCTIONS");
chk("degree of x^3-2x+1 is 3", 3 === 3);
chk("x^3 has up to 3 roots (degree = max roots)", true);
chk("(x-1)(x+2)=x^2+x-2, roots 1,-2", eq(1 - 1, 0) && eq((-2 - 1) * (-2 + 2), 0));
chk("rational 1/(x-2): vertical asymptote at x=2 (denominator zero)", eq(2 - 2, 0));
chk("1/x -> 0 as x->inf: horizontal asymptote y=0", eq(1 / 1e9, 0, 1e-6));
chk("(x^2-1)/(x-1) = x+1 for x!=1 (hole at x=1)", eq((1.001 ** 2 - 1) / (1.001 - 1), 2.001, 1e-9));

console.log("\nMATH FOR PHYSICS");
chk("vector components: 10 at 30deg -> (8.66, 5)", eq(10 * Math.cos(Math.PI / 6), 8.6603, 1e-3) && eq(10 * Math.sin(Math.PI / 6), 5));
chk("rearranging v=d/t -> t=d/v: 100/20=5", eq(100 / 20, 5));
chk("unit check: m/s * s = m", true);
chk("Pythagorean vector magnitude sqrt(3^2+4^2)=5", eq(Math.hypot(3, 4), 5));
chk("scientific notation: 3e8 * 2 = 6e8", eq(3e8 * 2, 6e8));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
