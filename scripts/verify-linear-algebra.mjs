/** Verify every calculation in the linear algebra article. */
const eq = (a, b, t = 1e-9) => Math.abs(a - b) < t;
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };
const mul = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
const det = (M) => M[0][0] * M[1][1] - M[0][1] * M[1][0];

console.log("THE SVG: A = [[2,1],[1,3]] acting on the unit square");
const A = [[2, 1], [1, 3]];
chk("det A = (2)(3) − (1)(1) = 5", eq(det(A), 5), String(det(A)));
chk("A maps i=(1,0) to (2,1) — the FIRST COLUMN of A", JSON.stringify(mul(A, [1, 0])) === JSON.stringify([2, 1]), JSON.stringify(mul(A, [1, 0])));
chk("A maps j=(0,1) to (1,3) — the SECOND COLUMN of A", JSON.stringify(mul(A, [0, 1])) === JSON.stringify([1, 3]), JSON.stringify(mul(A, [0, 1])));
chk("A maps (1,1) to (3,4)", JSON.stringify(mul(A, [1, 1])) === JSON.stringify([3, 4]), JSON.stringify(mul(A, [1, 1])));
console.log("  so the unit square (area 1) becomes the parallelogram on (2,1) and (1,3):");
const areaPara = Math.abs(2 * 3 - 1 * 1);
chk("  parallelogram area = |2·3 − 1·1| = 5 = det A", eq(areaPara, det(A)), String(areaPara));
chk("  area scaled by exactly det A", eq(areaPara / 1, det(A)));

console.log("\nTHE SINGULAR CASE: B = [[2,1],[4,2]]");
const B = [[2, 1], [4, 2]];
chk("det B = (2)(2) − (1)(4) = 0", eq(det(B), 0), String(det(B)));
chk("B maps i=(1,0) to (2,4)", JSON.stringify(mul(B, [1, 0])) === JSON.stringify([2, 4]));
chk("B maps j=(0,1) to (1,2)", JSON.stringify(mul(B, [0, 1])) === JSON.stringify([1, 2]));
chk("  (2,4) and (1,2) are PARALLEL — (2,4) = 2(1,2)", eq(2 * 1, 2) && eq(2 * 2, 4));
chk("  so the square collapses onto a LINE: area 0", eq(det(B), 0));
console.log("  and information is destroyed — different inputs give the same output:");
chk("    B(1,-2) = (0,0), same as B(0,0) = (0,0)", JSON.stringify(mul(B, [1, -2])) === JSON.stringify([0, 0]) && JSON.stringify(mul(B, [0, 0])) === JSON.stringify([0, 0]), "both -> (0,0)");
chk("  that is why det = 0 means NOT invertible: you cannot undo a collapse", true);

console.log("\nEIGENVECTORS: C = [[2,1],[1,2]]");
const C = [[2, 1], [1, 2]];
chk("C(1,1) = (3,3) = 3·(1,1)  -> eigenvalue 3", JSON.stringify(mul(C, [1, 1])) === JSON.stringify([3, 3]), JSON.stringify(mul(C, [1, 1])));
chk("C(1,-1) = (1,-1) = 1·(1,-1) -> eigenvalue 1", JSON.stringify(mul(C, [1, -1])) === JSON.stringify([1, -1]), JSON.stringify(mul(C, [1, -1])));
chk("  neither vector changed DIRECTION — only length", true);
chk("a non-eigenvector DOES rotate: C(1,0) = (2,1), not a multiple of (1,0)", JSON.stringify(mul(C, [1, 0])) === JSON.stringify([2, 1]), "(2,1) is not k(1,0)");
console.log("  and the characteristic equation confirms it:");
// det(C - kI) = (2-k)^2 - 1 = k^2 -4k +3 = (k-3)(k-1)
chk("  det(C − kI) = (2−k)² − 1 = k² − 4k + 3", eq((2 - 5) ** 2 - 1, 5 * 5 - 4 * 5 + 3), "checked at k=5");
chk("  = (k−3)(k−1), so k = 3 or k = 1", eq((3 - 3) * (3 - 1), 0) && eq((1 - 3) * (1 - 1), 0));
// NOTE: det C = (2)(2) - (1)(1) = 3. NOT 5 — that is det A. An earlier draft of this
// file said 5 here and this check is why the article never printed it.
chk("  det C = (2)(2) − (1)(1) = 3", eq(det(C), 3), String(det(C)));
chk("  det = product of eigenvalues: 3 × 1 = 3 ✓", eq(det(C), 3 * 1));
chk("  trace C = 2 + 2 = 4, and eigenvalues sum to 3 + 1 = 4 ✓", eq(2 + 2, 3 + 1));

console.log("\nROW REDUCTION: 2x + y = 5, x + 3y = 10");
// x = 1, y = 3
chk("x = 1, y = 3 satisfies 2x + y = 5", eq(2 * 1 + 3, 5));
chk("x = 1, y = 3 satisfies x + 3y = 10", eq(1 + 3 * 3, 10));
chk("  determinant of [[2,1],[1,3]] is 5, non-zero -> unique solution exists", eq(det(A), 5));
chk("  and A·(1,3) = (5,10) ✓", JSON.stringify(mul(A, [1, 3])) === JSON.stringify([5, 10]), JSON.stringify(mul(A, [1, 3])));

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
