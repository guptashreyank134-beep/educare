/**
 * Verify that every LaTeX expression used in the flagship articles compiles
 * cleanly with KaTeX. A malformed equation renders as red error text on the
 * live page, so this runs before any article is written.
 *
 * Usage: node scripts/verify-latex.mjs
 */
import katex from "katex";

export const EQUATIONS = [
  // Pre-Calculus 12
  String.raw`y = f(2x - 6) = f\bigl(2(x - 3)\bigr)`,
  String.raw`\log_2(16) = 4 \neq \log_2 8 + \log_2 8 = 6`,
  String.raw`\log_2\bigl(x(x-2)\bigr) = 3 \;\Longrightarrow\; x^2 - 2x - 8 = 0`,
  String.raw`\sin x\,(2\cos x - 1) = 0`,
  String.raw`\frac{x^2 - 4}{x - 2} = \frac{(x-2)(x+2)}{x-2} = x + 2, \quad x \neq 2`,
  String.raw`f^{-1}(x) = \frac{x-3}{2} \neq \frac{1}{f(x)} = \frac{1}{2x+3}`,
  String.raw`S_\infty = \frac{a}{1-r}, \quad \text{valid only when } |r| < 1`,
  String.raw`f\bigl(f^{-1}(x)\bigr) = 2\left(\frac{x-3}{2}\right) + 3 = x`,
  String.raw`\cos x = \tfrac{1}{2} \;\Longrightarrow\; x = \tfrac{\pi}{3},\ \tfrac{5\pi}{3}`,
  // Physics 12
  String.raw`F_c = \frac{mv^2}{r}`,
  String.raw`\mu m g = \frac{mv^2}{r} \;\Longrightarrow\; \mu = \frac{v^2}{rg}`,
  String.raw`\mu = \frac{(15\ \mathrm{m/s})^2}{(50\ \mathrm{m})(9.8\ \mathrm{m/s^2})} = 0.46`,
  String.raw`R = \frac{v_0^2 \sin(2\theta)}{g}`,
  // Chemistry 11
  String.raw`\mathrm{CH_4} + 2\,\mathrm{O_2} \rightarrow \mathrm{CO_2} + 2\,\mathrm{H_2O}`,
  String.raw`n = \frac{m}{M}`,
  String.raw`n_{\mathrm{CH_4}} = \frac{32.0\ \mathrm{g}}{16.04\ \mathrm{g/mol}} = 1.995\ \mathrm{mol}`,
  String.raw`2\,\mathrm{H_2} + \mathrm{O_2} \rightarrow 2\,\mathrm{H_2O}`,
  // UBC Calculus
  String.raw`\frac{d}{dx}\sin(x^2) = 2x\cos(x^2)`,
  String.raw`\frac{d}{dx}\left[x^2 e^{3x}\right] = e^{3x}\left(2x + 3x^2\right)`,
  String.raw`\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} (x + 2) = 4`,
  String.raw`x^2 + y^2 = 25 \;\Longrightarrow\; 2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0`,
  String.raw`\frac{dy}{dt} = -\frac{x}{y}\cdot\frac{dx}{dt} = -\frac{3}{4}(0.5) = -0.375\ \mathrm{m/s}`,
];

let bad = 0;
for (const eq of EQUATIONS) {
  try {
    const html = katex.renderToString(eq, { displayMode: true, throwOnError: true, output: "html", strict: false });
    if (/katex-error/.test(html)) throw new Error("rendered as error");
    console.log("  OK    " + eq.slice(0, 62));
  } catch (e) {
    bad++;
    console.log("  FAIL  " + eq.slice(0, 62) + "\n          -> " + (e.message || e).slice(0, 70));
  }
}
console.log(`\n${EQUATIONS.length - bad}/${EQUATIONS.length} compile cleanly.`);
if (bad) process.exit(1);
