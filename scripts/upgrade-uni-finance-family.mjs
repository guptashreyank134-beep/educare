/**
 * University-finance family: BCom/MBA, CFA/CSC/IFC, MSc/PhD. Higher-level than the
 * intro finance family (valuation / certification curriculum / quant finance).
 * Verified in scripts/verify-uni-finance.mjs. Shared applyPost gate.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["university-finance-bcom-mba-finance", "university-finance-cfa-csc-ifc-certifications", "university-finance-msc-phd-finance-studies"];
const help = (lead) => linked([lead, { text: "university finance tutoring in Burnaby and online", href: "/programs/university-finance" }, ", for commerce degrees, MBA courses and professional exams."]);
const book = linked(["Sessions run in person in Burnaby or online across Metro Vancouver and beyond, which suits working professionals and graduate students. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring a problem set, case, or past paper."]);

/* ---------- 1. BCom / MBA: valuation ---------- */
const dcfSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 180" role="img" aria-label="Discounted cash flow valuation. Future free cash flows of one hundred dollars a year are each discounted back to the present at the weighted average cost of capital, and summed to a present value. Cash flows further in the future are worth less today." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="30" y1="110" x2="415" y2="110" stroke="#CBD5E1" stroke-width="1.5"/>
    ${[1, 2, 3, 4].map((t) => { const x = 90 + t * 75, pv = 100 / 1.09 ** t, h = pv * 0.85; return `<rect x="${x - 16}" y="${110 - h}" width="32" height="${h}" rx="2" fill="#3A5A98"/><text x="${x}" y="126" font-size="10" fill="#64748B" text-anchor="middle">yr ${t}</text><text x="${x}" y="${110 - h - 5}" font-size="9.5" fill="#475569" text-anchor="middle">$${pv.toFixed(0)}</text><text x="${x}" y="${110 - h - 17}" font-size="8.5" fill="#94A3B8" text-anchor="middle">of $100</text>`; }).join("")}
    <text x="220" y="24" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="700">Each future $100 of cash flow, discounted to today at 9%</text>
    <text x="220" y="160" font-size="11.5" fill="#B45309" text-anchor="middle" font-weight="600">value = the sum of all these present values</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    A company is worth the present value of the cash it will generate. Later cash counts for less, because
    of the time value of money — which is why the discount rate you choose matters enormously.
  </figcaption>
</figure>`;

const bcomMba = [
  p("BCom and MBA finance is where the introductory ideas — the time value of money, risk and return — get pointed at one central, career-defining question: what is a company actually worth? Corporate finance and valuation are the heart of the degree, and they intimidate students because the models look elaborate. They are not, once you see that nearly all of them answer that single question in slightly different ways."),
  p("Master the logic of valuation and the cost of capital, and the case studies, spreadsheets and exam problems stop being separate techniques and become one method applied to different companies."),
  help("This is the core we focus on in "),

  h2("A company is worth its future cash, discounted"),
  p("The foundational idea of valuation is that a business is worth the cash it will generate for its owners over its life — brought back to today's value, because future money is worth less than money now. This is discounted cash flow, or DCF, and it is the model every other valuation method is measured against."),
  { _type: "htmlBlock", _key: key(), html: dcfSvg },
  mp(["You forecast a company's free cash flows, then discount each back to the present and add them up. For a stable business generating a steady $100 million a year, discounted at 9%, the perpetuity value is simply ", im(String.raw`100 / 0.09 = \$1{,}111`), " million. The mechanics can grow complex, but the principle never changes: value is the present value of future cash. Every line of a DCF model is serving that one sentence, and students who hold that sentence firmly never get lost in the spreadsheet."]),

  h2("The cost of capital: WACC, and why it decides everything"),
  p("A DCF is only as good as its discount rate, and that rate is the weighted average cost of capital — WACC. It blends the returns demanded by the two groups who fund the company: shareholders, who want a high return for their risk, and lenders, who accept less because they are repaid first."),
  math(String.raw`WACC = \frac{E}{V}r_e + \frac{D}{V}r_d(1 - t)`),
  mp(["With 60% equity at a 12% cost, 40% debt at 6%, and a 25% tax rate, the WACC is ", im(String.raw`0.6(12\%) + 0.4(6\%)(0.75) = 9.0\%`), ". The tax term matters: interest on debt is tax-deductible, which makes debt cheaper than it first appears — the single most important reason companies borrow at all. A student who understands why the ", im(String.raw`(1-t)`), " sits only on the debt term understands most of capital-structure theory."]),
  p("The reason WACC is so consequential is that it is the discount rate in every valuation and the hurdle rate for every project. A small change in it swings a company's estimated value dramatically, which is why so much of an MBA finance course is really an argument about what the right cost of capital is."),

  h2("Capital structure: how much debt is right?"),
  p("If debt is cheaper than equity, why not fund everything with debt? This is the capital-structure question, and it is a staple of the degree. The answer is a trade-off. More debt lowers the WACC at first, because of that tax advantage, and can boost returns to shareholders through leverage. But debt must be repaid regardless of how the business performs, so beyond a point it raises the risk of financial distress — and that rising risk eventually outweighs the tax saving."),
  p("So there is an optimal capital structure that minimises the cost of capital and maximises firm value, somewhere between all-equity and dangerously-indebted. Where exactly depends on the stability of the business: a utility with predictable cash flows can safely carry far more debt than a volatile tech startup. Framing capital structure as balancing the tax shield against the cost of distress turns a cluster of theories into one intuition."),

  h2("Dividend policy and returning cash to owners"),
  p("Once a company generates cash, it faces a decision the degree examines closely: reinvest it, or return it to shareholders as dividends or share buybacks? The classic theory says that in a perfect market the choice does not affect firm value — a dividend simply moves value out of the share price and into the shareholder's pocket. But real markets are not perfect, and that is where it gets interesting."),
  mp(["Taxes, signalling and investor preferences all bend the decision. A company that raises its dividend signals confidence in future cash flows, which the market often rewards; cutting one signals trouble. The dividend-discount model even values a share directly as the present value of its future dividends — for a stock paying $2 next year, growing at 4%, discounted at 10%, the value is ", im(String.raw`2/(0.10 - 0.04) = \$33.33`), ". Understanding when dividend policy matters and when it does not is a favourite exam theme, because it forces students to reason about market imperfections rather than recite a rule."]),

  h2("Mergers, acquisitions and the value of synergy"),
  p("Corporate finance courses build toward the biggest decisions a company makes — buying another company. An acquisition is a valuation problem with a twist: the buyer must value the target, but also estimate the synergies, the extra value created by combining the two businesses, since that is what justifies paying a premium over the target's standalone worth."),
  p("The recurring lesson, and the exam's favourite trap, is that most acquisitions destroy value because buyers overpay — they are too optimistic about synergies and pay the premium up front while the benefits are uncertain and slow to arrive. Valuing a deal correctly means being ruthless about what the combination is really worth, not what the excitement of the moment suggests. It ties together everything else in the course: DCF for the target, WACC for the discount rate, and hard judgement about risk. This is corporate finance at its most consequential, and its most tested."),

  h2("Financial modelling: where the theory becomes a spreadsheet"),
  p("The practical skill that ties an MBA finance course together is building financial models — projecting a company's statements and cash flows into the future to value it or test a decision. A model is only as good as its assumptions, and the most important habit is sensitivity analysis: changing the key inputs, especially the growth rate and the discount rate, to see how much the answer moves."),
  p("This matters because a DCF can produce almost any valuation depending on those two inputs, so a single-point answer is misleading. A serious analysis presents a range and identifies which assumptions the value is most sensitive to. Employers and examiners alike look for students who treat a model as a tool for structured thinking about uncertainty, not a machine that spits out a precise truth. Learning to build and, more importantly, to stress-test a model is the applied culmination of the whole subject."),

  h2("The valuation shortcut: multiples"),
  p("Alongside DCF, practitioners use relative valuation — comparing a company to similar ones using multiples like price-to-earnings or enterprise-value-to-EBITDA. If comparable firms trade at 15 times earnings and your company earns $40 million, a first estimate of its value is $600 million. It is faster than a full DCF and grounded in what the market is actually paying."),
  p("The exam point is knowing the trade-off. DCF is rigorous but depends heavily on assumptions about the future; multiples are quick and market-based but assume the comparison companies are fairly priced and genuinely similar. Good analysts use both and investigate why they disagree. Understanding that valuation is a range and a judgement, not a single true number, is the mark of finance maturity that graduate courses are trying to develop."),
  p("There is also a discipline in choosing the right multiple. Price-to-earnings suits stable, profitable firms but breaks down for a company with no earnings yet, where revenue or user multiples may be all there is. Enterprise-value multiples strip out the effect of how a company is financed, which makes them better for comparing firms with different debt levels. Picking a multiple that actually fits the business, and knowing why a naive one would mislead, is precisely the kind of judgement that separates a competent valuation from a mechanical one."),

  h2("Where BCom and MBA finance marks are actually lost"),
  mli(["Getting lost in DCF mechanics while losing sight that value is just the present value of future cash."]),
  mli(["Misbuilding WACC — forgetting the tax shield on debt, or using book values where market values belong."]),
  mli(["Treating more debt as simply better, ignoring the rising cost of financial distress."]),
  mli(["Applying a multiple without checking the comparison firms are truly comparable."]),
  mli(["Reporting a single valuation figure instead of a reasoned range with sensitivities."]),

  h2("How to study corporate finance"),
  mli(["Anchor every model to 'value = present value of future cash', and check each step serves it."]),
  mli(["Build WACC from its parts by hand until the tax shield and the market-value weights are second nature."]),
  mli(["For capital structure, always frame it as tax shield versus distress risk."]),
  mli(["Value a real company with both DCF and multiples, then explain the gap between them."]),

  h2("Getting help with BCom and MBA finance"),
  help("If corporate finance feels like a maze of models, valuation and the cost of capital are the spine that connects them. Our "),
  book,
];

/* ---------- 2. CFA / CSC / IFC: the certification curriculum ---------- */
const bondSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 420 190" role="img" aria-label="The inverse relationship between bond prices and yields. As the market yield rises, the price of an existing bond falls below its par value; as the yield falls, the price rises above par. A five percent coupon bond priced at a six percent yield trades at a discount of about 973 dollars." style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="55" y1="30" x2="55" y2="155" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="55" y1="155" x2="400" y2="155" stroke="#CBD5E1" stroke-width="1.5"/>
    ${(() => { let d = ""; for (let y = 3; y <= 9; y += 0.25) { const x = 55 + (y - 3) * 55, price = 50 / (1 + y / 100) + 50 / (1 + y / 100) ** 2 + 1050 / (1 + y / 100) ** 3, py = 155 - (price - 950) / 120 * 120; d += `${d ? " L" : "M"} ${x.toFixed(1)} ${py.toFixed(1)}`; } return `<path d="${d}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>`; })()}
    <line x1="55" y1="${(155 - (1000 - 950) / 120 * 120).toFixed(0)}" x2="400" y2="${(155 - (1000 - 950) / 120 * 120).toFixed(0)}" stroke="#94A3B8" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="405" y="${(155 - (1000 - 950) / 120 * 120).toFixed(0)}" font-size="10" fill="#64748B">par $1000</text>
    <text x="230" y="20" font-size="12" fill="#1F2937" text-anchor="middle" font-weight="700">Bond price falls as yield rises</text>
    <text x="230" y="178" font-size="11" fill="#64748B" text-anchor="middle">market yield →</text>
    <text x="40" y="90" font-size="11" fill="#64748B" text-anchor="middle" transform="rotate(-90 40 90)">price →</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Bond prices and yields move in opposite directions — the single most important relationship in fixed
    income. When rates rise, existing bonds paying old, lower coupons become worth less.
  </figcaption>
</figure>`;

const cfa = [
  p("The professional finance certifications — the CFA charter, the Canadian Securities Course, the Investment Funds course — are a different challenge from a university degree. They are broad, standardised, and unforgiving of gaps, testing a defined body of knowledge across the whole of investing rather than the depth of any one topic. Passing is less about brilliance than about disciplined coverage of a large, well-defined curriculum."),
  p("The good news is that the syllabus is knowable, and a handful of core relationships carry a large share of the marks. Understanding those pillars — rather than memorising thousands of facts — is what separates candidates who pass from those who grind and fail."),
  help("This is how we prepare candidates in "),

  h2("Fixed income: the inverse relationship that governs bonds"),
  p("Bonds and fixed income are among the highest-weighted topics across these exams, and they rest on one relationship that must become instinctive: bond prices and interest rates move in opposite directions."),
  { _type: "htmlBlock", _key: key(), html: bondSvg },
  mp(["A bond is a stream of fixed payments, valued by discounting them at the market yield. When yields rise, those fixed payments are discounted more harshly, so the price falls. A 5% coupon bond, when the market demands 6%, trades below par — about ", im(String.raw`\$973`), " on a $1,000 bond — because no one pays full price for old, below-market payments. The exam tests this relentlessly: yield above coupon means a discount, yield below coupon means a premium. Candidates who feel this in their bones save minutes on every fixed-income question."]),
  p("Duration extends the idea by measuring how sensitive a bond's price is to rate changes — longer-maturity bonds swing more. It is the single most practical risk measure in fixed income, and understanding it as 'how much does this bond move when rates move' is worth more than any formula."),

  h2("Portfolio theory: risk you can and cannot diversify away"),
  p("Investment management on these exams is built on modern portfolio theory, and its central insight is that risk comes in two kinds. Some risk is specific to individual companies and can be diversified away by holding many of them; the rest is market-wide and cannot be escaped, because it affects everything at once. You are compensated only for bearing the risk you cannot diversify away — a subtle point the exams test repeatedly."),
  mp(["This is measured with tools like beta, which captures how much a stock moves with the market, and the Sharpe ratio, which measures return earned per unit of risk. A portfolio returning 12% above a 3% risk-free rate with 15% volatility has a Sharpe ratio of ", im(String.raw`(12-3)/15 = 0.6`), " — and comparing investments by risk-adjusted return, not raw return, is exactly the discipline the certifications are designed to instil."]),

  h2("Ethics: the section candidates underestimate"),
  p("The CFA in particular weights ethics heavily, and it is where many strong quantitative candidates lose their pass. Ethics is not common sense — it is a specific code of professional conduct with defined rules on conflicts of interest, disclosure, and the priority of client interests. The questions are subtle scenarios where several answers look defensible and only one matches the standard precisely."),
  p("The mistake is treating ethics as easy marks to skim. It cannot be crammed the night before, because it requires knowing the exact standard, not merely having good instincts. Candidates who study it as rigorously as the quantitative material — learning the code's specific requirements and practising the scenario questions — protect a block of marks that sink many otherwise-capable people."),

  h2("Equity valuation and financial reporting"),
  p("Equity analysis carries heavy weight, and it reuses the valuation logic from corporate finance but from the investor's seat: is this stock worth its price? Candidates must value companies with discounted cash flow and with multiples, and — crucially — read the reasoning behind a price target rather than just produce a number. The exams reward analysts who can say why a stock is mispriced, not merely that it is."),
  p("Underneath equity analysis sits financial reporting, and it is tested hard because everything else depends on it. Candidates must read income statements, balance sheets and cash-flow statements critically, spot where accounting choices flatter the numbers, and adjust for differences between accounting standards. The recurring skill is scepticism: reported earnings can be managed, and a strong candidate knows where to look — revenue recognition, off-balance-sheet items, one-time charges dressed as recurring. Reading statements as a detective rather than a clerk is exactly the professional judgement the charter certifies."),

  h2("Quantitative methods and economics"),
  p("The certifications assume a working command of quantitative methods — probability, hypothesis testing, regression and the time value of money — because they underpin every other topic. Candidates who are shaky here struggle everywhere else, since a fixed-income or portfolio question is often a statistics question in disguise. Building genuine fluency with these tools, rather than memorising formulas, pays off across the whole exam."),
  p("Economics rounds out the curriculum, connecting interest rates, inflation, exchange rates and the business cycle to the markets candidates will work in. The exam does not want abstract theory; it wants the links — how a central-bank rate change ripples through bond prices, currencies and equity valuations. Seeing economics as the environment every investment decision lives inside, rather than a separate subject, is what turns scattered facts into usable understanding and answers the integrative questions these exams increasingly favour."),

  h2("Derivatives and the rest of the curriculum"),
  p("The exams also cover derivatives, corporate finance, financial reporting, economics and alternative investments — a genuinely broad sweep. Derivatives reduce to understanding that options and futures derive their value from an underlying asset, and that they can hedge risk or amplify it. Financial reporting tests whether you can read statements critically across different accounting standards. The breadth is the difficulty: no single topic is impossibly hard, but the volume demands a study plan that covers everything rather than over-investing in favourites."),

  h2("Three certifications, three purposes"),
  p("The slug covers three credentials, and knowing what each is for shapes how you prepare. The Canadian Securities Course (CSC) is the entry point to the Canadian investment industry — broad, foundational, and required to sell most securities. It is demanding in breadth but not depth, and it rewards steady, systematic coverage. The Investment Funds in Canada course (IFC) is narrower, focused on mutual funds, and is the lighter of the three, aimed at those advising retail fund clients."),
  p("The CFA charter is a different order of commitment entirely — three sequential exams, hundreds of hours each, and a global standard for investment analysis and portfolio management. It goes far deeper into valuation, ethics and quantitative methods than the Canadian courses, and it is the credential for aspiring analysts and portfolio managers rather than front-line advisors. Matching your study intensity to the certification is half the battle: the CSC rewards disciplined breadth over a few months, while the CFA demands a multi-year campaign. Treating them the same — under-preparing for the CFA or over-engineering the IFC — is a common and costly mistake."),

  h2("How the CFA levels build on each other"),
  p("The CFA charter's three levels are not three copies of the same test at rising difficulty; they progress in the kind of thinking they demand, and preparing well means preparing differently for each. Level I is largely about knowledge and recall across the whole curriculum — the tools, the definitions, the formulas — tested in short, standalone questions. It is broad and shallow, and it rewards systematic coverage more than deep insight."),
  p("Level II shifts to application and analysis, especially valuation, delivered through item-set questions built around a shared case — you must apply the Level I tools to messy, realistic situations. Level III moves again, toward portfolio management and synthesis, and adds written constructed-response questions where you must justify a recommendation in prose, not just pick an option. The progression from knowing, to applying, to judging mirrors how a real analyst develops, and candidates who prepare for each level as if it were just a harder version of the last tend to stumble. Recognising that the skill being tested changes at each stage is one of the most useful things a candidate can internalise early."),

  h2("Exam-day strategy: managing a broad, timed test"),
  p("Because these exams are broad and time-pressured, strategy matters as much as knowledge. The reliable approach is to bank the questions you know quickly, flag the uncertain ones, and never let a single hard question consume the time of five easy ones — the marks are equal, so the fastest points come first. On multiple-choice formats, disciplined elimination and educated guessing on the remainder beat leaving blanks, since there is no penalty for a wrong answer on most of these tests."),
  p("The deeper strategic point is coverage over perfection. You do not need to master every corner of the syllabus; you need to be solid across all of it and to avoid catastrophic gaps in high-weight areas. A candidate who is excellent at equities but ignored fixed income and ethics is far more likely to fail than one who is competent everywhere. Building that even, gap-free preparation — and practising under real timed conditions so the pace becomes automatic — is what turns knowledge into a pass."),

  h2("Where certification candidates actually fail"),
  mli(["Underestimating ethics and treating it as easy marks — it is neither easy nor small."]),
  mli(["Getting the bond price-yield relationship backwards under time pressure."]),
  mli(["Comparing investments by raw return instead of risk-adjusted return."]),
  mli(["Over-studying strong topics and leaving gaps in weaker ones the exam still weights."]),
  mli(["Cramming rather than covering the full, defined curriculum systematically."]),

  h2("How to prepare for finance certifications"),
  mli(["Build a coverage plan across the whole syllabus and track it — breadth is the real test."]),
  mli(["Make the bond price-yield relationship and duration instinctive with drilled practice."]),
  mli(["Study ethics as rigorously as the quantitative sections, using scenario questions."]),
  mli(["Always reason in risk-adjusted terms, and know beta and the Sharpe ratio cold."]),

  h2("Getting help with CFA, CSC and IFC"),
  help("If a certification's breadth feels overwhelming, a plan built around the high-weight pillars turns it into a manageable campaign. Our "),
  book,
];

/* ---------- 3. MSc / PhD: quantitative finance ---------- */
const optionSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 420 200" role="img" aria-label="The payoff of a call option at expiry. Below the strike price of one hundred the payoff is zero; above it the payoff rises one for one with the stock price. At a stock price of one hundred twenty the payoff is twenty. The line is flat then bends upward at the strike, giving options their asymmetric shape." style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="50" y1="30" x2="50" y2="160" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="50" y1="160" x2="400" y2="160" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="50" y1="160" x2="215" y2="160" stroke="#3A5A98" stroke-width="3"/>
    <line x1="215" y1="160" x2="380" y2="50" stroke="#3A5A98" stroke-width="3"/>
    <line x1="215" y1="30" x2="215" y2="165" stroke="#94A3B8" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="215" y="178" font-size="11" fill="#64748B" text-anchor="middle">strike $100</text>
    <circle cx="345" cy="70" r="4" fill="#B45309"/><text x="345" y="60" font-size="10.5" fill="#B45309" text-anchor="middle" font-weight="600">S=120 → $20</text>
    <text x="130" y="150" font-size="10.5" fill="#64748B" text-anchor="middle">payoff = 0</text>
    <text x="215" y="20" font-size="12" fill="#1F2937" text-anchor="middle" font-weight="700">Call option payoff: max(S − K, 0)</text>
    <text x="30" y="95" font-size="11" fill="#64748B" text-anchor="middle" transform="rotate(-90 30 95)">payoff</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    An option's payoff is bent, not straight — nothing below the strike, then rising one-for-one above it.
    That kink is the whole reason options are mathematically rich and pricing them won a Nobel Prize.
  </figcaption>
</figure>`;

const mscPhd = [
  p("Graduate finance — an MSc, and especially a PhD — is a different subject from the undergraduate one, and students crossing into it are often surprised by how mathematical it becomes. It is where finance stops being about reading statements and starts being about stochastic processes, continuous-time models and rigorous econometrics. The valuation intuition remains, but it is now expressed in the language of probability and calculus."),
  p("The transition is the challenge: strong undergraduate finance students can struggle not because the finance is harder but because the mathematics is unfamiliar. Bridging that gap — connecting the financial intuition to the formal machinery — is what graduate-level study, and good graduate tutoring, is really about."),
  help("This is the level we work at in "),

  h2("Derivatives: why a bent payoff changes everything"),
  p("Derivatives are the gateway to quantitative finance, and options are the key example. An option gives the right, but not the obligation, to buy or sell an asset at a set price, and that optionality gives it a payoff unlike any stock or bond."),
  { _type: "htmlBlock", _key: key(), html: optionSvg },
  mp(["A call option's payoff at expiry is ", im(String.raw`\max(S - K, 0)`), " — nothing if the stock finishes below the strike, and rising dollar-for-dollar above it. At a strike of $100, a stock at $120 pays $20, while a stock at $80 pays nothing. That kink is what makes options mathematically deep: because the payoff is asymmetric and depends on an uncertain future price, valuing it requires modelling the entire probability distribution of where the stock might end up."]),
  p("This is what the Black-Scholes model does, and pricing options this way earned a Nobel Prize. You do not need the full derivation to grasp the idea: the value of an option today is the discounted expected value of its uncertain future payoff, computed under a specific set of assumptions about how prices move. Graduate finance is largely the study of those assumptions and what happens when they fail."),

  h2("Randomness done rigorously: stochastic processes"),
  p("The mathematical heart of quantitative finance is modelling how asset prices evolve randomly through time. Prices are treated as stochastic processes — think of a value that drifts upward on average while being buffeted by continuous random shocks. The standard model, geometric Brownian motion, captures exactly this: a steady expected growth plus proportional random noise."),
  p("This is why graduate finance leans on stochastic calculus, a form of calculus built for functions driven by randomness, where the familiar rules bend. It is genuinely difficult mathematics, and it is the most common place students hit a wall. The way through is to keep the financial meaning attached to every symbol — the drift term is the expected return, the volatility term is the risk — so the mathematics stays anchored to intuition you already have rather than becoming abstract for its own sake."),

  h2("Portfolio mathematics: diversification, made precise"),
  mp(["The diversification idea from earlier finance becomes fully quantitative here. The risk of a portfolio is not the average of its parts' risks — it depends on how the assets move together, captured by their covariance. For two equally-weighted assets each with 20% volatility and zero correlation, the portfolio volatility is ", im(String.raw`\sqrt{0.5^2(0.2^2) + 0.5^2(0.2^2)} = 14.1\%`), ", well below either asset alone."]),
  p("If the assets were perfectly correlated, the benefit would vanish and the portfolio volatility would stay at 20%. This is the precise, mathematical version of 'don't put your eggs in one basket', and it generalises into the optimisation problems at the core of modern portfolio management — finding the mix of assets that minimises risk for a target return. Graduate courses turn this into constrained optimisation, but the intuition is the same one, sharpened."),

  h2("Risk-neutral valuation: the trick that makes pricing work"),
  p("One idea deserves singling out because it underlies most of derivatives pricing and reliably confuses newcomers: risk-neutral valuation. It sounds paradoxical — you price an option by pretending investors do not care about risk, discounting expected payoffs at the risk-free rate — yet it gives the correct real-world price. The resolution is that the technique is a mathematical device, not a claim about investor psychology."),
  p("The deeper justification is no-arbitrage: because an option can be replicated by a continuously-adjusted mix of the underlying asset and cash, its price is pinned down by the cost of that replicating strategy, regardless of anyone's risk preferences. This is one of the most elegant results in all of finance, and grasping it — that pricing rests on replication and the absence of free lunches, not on forecasting attitudes to risk — is a genuine turning point in a graduate course. Students who see it stop finding derivatives mysterious; those who do not tend to memorise formulas that never quite cohere."),

  h2("Computation: finance that has to run"),
  p("Modern quantitative finance is also computational. Many models have no clean closed-form solution, so they are solved numerically — Monte Carlo simulation, which prices a derivative by simulating thousands of possible price paths and averaging the payoffs, and finite-difference methods that solve the underlying equations on a grid. Graduate students are increasingly expected to implement these in code, not just derive them on paper."),
  p("This is why programming has become part of the finance skill set, and why an MSc or PhD candidate who can both derive a model and implement it efficiently is far ahead of one who can only do the algebra. The computation is not a side skill; it is how the mathematics meets real data and real markets. Learning to translate a stochastic model into working, tested code is one of the most valuable things a graduate finance student can develop, and it is where quantitative finance most clearly becomes a craft as well as a theory."),

  h2("Econometrics: testing theories against data"),
  p("The other pillar of graduate finance is empirical: using econometrics to test whether theories actually hold in real markets. This means regression models, hypothesis testing, and confronting the messy statistical realities of financial data — which is famously badly behaved, with volatility that clusters and fat-tailed distributions that produce extreme events far more often than a normal distribution predicts."),
  p("For a PhD especially, this is the daily work: forming a hypothesis about how markets behave, and testing it rigorously against data without fooling yourself. The 2008 crisis was in part a failure to respect fat tails — models assumed extreme events were vanishingly unlikely when they were not. Understanding both the statistical tools and their limits is central to research-level finance, and it is where quantitative skill and financial judgement have to work together."),

  h2("From coursework to original research"),
  p("The defining shift of a PhD, and the part no coursework fully prepares you for, is the move from solving set problems to posing your own. Graduate finance research means finding a question no one has answered, building or borrowing a model to address it, testing it against data, and defending the result against every objection a committee can raise. It demands the mathematics and econometrics above, but also something harder to teach: judgement about which questions are both important and tractable."),
  p("This is where many technically strong students stall — not on the tools, but on the transition to independent, self-directed work. The habits that carry a PhD are relentless clarity about what a result does and does not show, comfort with long stretches of uncertainty, and the discipline to test your own ideas as sceptically as you would a rival's. Good graduate mentoring focuses as much on this research maturity as on any equation, because the mathematics is the entry ticket while the judgement is what actually produces a thesis. Recognising that the hardest part of a research degree is intellectual independence, not computation, is itself a useful orientation for anyone considering the path."),

  h2("Where graduate finance students struggle"),
  mli(["Underestimating the mathematical jump — the finance intuition is not enough on its own."]),
  mli(["Losing the financial meaning of the mathematics, so stochastic calculus becomes abstract symbol-pushing."]),
  mli(["Treating models as truth rather than as assumptions that can and do fail."]),
  mli(["Ignoring the bad behaviour of real financial data — fat tails, clustering, non-stationarity."]),
  mli(["Weak econometrics foundations, so empirical work rests on misapplied statistics."]),

  h2("Where quantitative finance leads"),
  p("The reason the mathematical difficulty is worth pushing through is where it goes. Graduate quantitative finance opens doors that undergraduate finance does not: quant roles at hedge funds and investment banks building trading and pricing models, risk-management positions measuring and controlling exposures that can sink an institution, and research careers in academia or at central banks. Each of these leans directly on the stochastic modelling, derivatives pricing and econometrics that make the coursework hard."),
  p("What unites these paths is that they pay for the rare combination of financial understanding and genuine mathematical and computational skill. Plenty of people have one or the other; the value is in holding both, and in being able to move between the intuition and the formalism fluently. This is also why the field keeps evolving toward data science and machine learning, as the tools for finding structure in financial data grow more powerful. A graduate student who builds a durable foundation in the mathematics, keeps it tied to financial meaning, and learns to implement it in code is preparing not for a single job but for a field that will keep rewarding that blend of skills for a long time."),

  h2("How to study graduate finance"),
  mli(["Shore up the mathematics — probability, calculus, linear algebra — before the finance builds on it."]),
  mli(["Keep the financial interpretation attached to every term in every model."]),
  mli(["Learn each model's assumptions as carefully as its formula, and know when they break."]),
  mli(["Build genuine econometrics skill, and respect how badly financial data misbehaves."]),

  h2("Getting help with MSc and PhD finance"),
  help("If the leap into quantitative finance feels steep, the fix is bridging the mathematics to the financial meaning you already understand. Our "),
  book,
];

await applyPost({ slug: "university-finance-bcom-mba-finance", was: 388, body: bcomMba, siblingSlugs: SIBS.filter((s) => s !== "university-finance-bcom-mba-finance") });
await applyPost({ slug: "university-finance-cfa-csc-ifc-certifications", was: 413, body: cfa, siblingSlugs: SIBS.filter((s) => s !== "university-finance-cfa-csc-ifc-certifications") });
await applyPost({ slug: "university-finance-msc-phd-finance-studies", was: 381, body: mscPhd, siblingSlugs: SIBS.filter((s) => s !== "university-finance-msc-phd-finance-studies") });
