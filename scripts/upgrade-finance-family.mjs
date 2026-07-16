/**
 * Finance family: financial-basics, business-concepts, practical-application.
 * Each distinct: TVM / financial statements & ratios / investment decisions.
 * Verified in scripts/verify-finance.mjs. Uses shared applyPost gate.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const FIN_SIBS = ["finance-financial-basics", "finance-business-concepts", "finance-practical-application-of-finance"];
const help = (lead) => linked([lead, { text: "finance tutoring in Burnaby and online", href: "/programs/finance" }, ", for high-school business, university commerce and professional exams."]);
const book = linked(["Sessions run in person in Burnaby or online across Metro Vancouver. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring the topic or problem set you are stuck on."]);

/* ---------- 1. FINANCIAL BASICS: time value of money ---------- */
const tvmSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 200" role="img" aria-label="Growth of one thousand dollars at six percent compound interest over ten years, rising from one thousand to about one thousand seven hundred ninety-one dollars. The curve steepens over time because interest earns interest." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="55" y1="160" x2="420" y2="160" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="55" y1="30" x2="55" y2="160" stroke="#CBD5E1" stroke-width="1.5"/>
    ${(() => { let d = ""; for (let t = 0; t <= 10; t += 0.5) { const x = 55 + t * 36.5, y = 160 - (1000 * 1.06 ** t - 1000) / 791 * 120; d += `${d ? " L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`; } return `<path d="${d}" fill="none" stroke="#3A5A98" stroke-width="2.5"/>`; })()}
    <circle cx="55" cy="160" r="3.5" fill="#94A3B8"/><text x="55" y="176" font-size="11" fill="#64748B" text-anchor="middle">now</text>
    <text x="35" y="164" font-size="11" fill="#64748B" text-anchor="end">$1000</text>
    <circle cx="420" cy="40" r="4" fill="#3A5A98"/><text x="420" y="176" font-size="11" fill="#64748B" text-anchor="middle">10 yr</text>
    <text x="410" y="34" font-size="11.5" fill="#3A5A98" text-anchor="end" font-weight="700">$1,790.85</text>
    <text x="240" y="22" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">$1,000 at 6% — the curve bends up as interest earns interest</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Money today is worth more than the same money later, because it can grow. The whole of finance is
    built on this one curve — and it bends, it does not slope, because you earn interest on your interest.
  </figcaption>
</figure>`;

const basics = [
  p("Finance intimidates students who assume it is about memorising markets and jargon. It is not. Underneath the vocabulary sits a single idea, and almost every calculation in an introductory finance course is an application of it: money has a time value. A dollar today is worth more than a dollar next year, because the dollar today can be put to work and grow."),
  p("Grasp the time value of money and compound interest genuinely — not as a formula to plug into, but as an idea — and financial basics stop being a collection of tricks and become one principle applied over and over."),
  help("This is where we start in "),

  h2("The one equation finance is built on"),
  p("If you invest an amount today at an interest rate, it grows. The future value is:"),
  math(String.raw`FV = PV(1 + r)^n`),
  mp(["Invest $1,000 at 6% for ten years and it becomes ", im(String.raw`1000 \times 1.06^{10} = \$1{,}790.85`), ". The reverse question — what is a future sum worth today — just rearranges it, and that operation, discounting, is the single most important tool in all of finance."]),
  { _type: "htmlBlock", _key: key(), html: tvmSvg },
  p("The reason the curve bends upward rather than rising in a straight line is the heart of the matter. In year one you earn interest on your $1,000. In year two you earn interest on the $1,060 — including interest on the interest. That compounding is why the line curves, and it is the closest thing finance has to a superpower: given enough time, it does extraordinary things with ordinary amounts."),

  h2("The Rule of 72, and why time beats amount"),
  mp(["A shortcut worth carrying for life: divide 72 by the interest rate to get the number of years for money to double. At 6%, that is ", im(String.raw`72 / 6 = 12`), " years — and checking, ", im(String.raw`1.06^{12} = 2.01`), ", almost exactly double. At 8% it is nine years; at 12%, six."]),
  p("This little rule teaches the deepest lesson in personal finance better than any lecture: time is the dominant variable, not the amount you start with. Someone who invests a modest sum in their twenties and leaves it alone routinely ends up ahead of someone who invests far more but starts twenty years later, because the early money gets more doublings. Compounding rewards patience over size, and understanding why is worth more than any single formula."),

  h2("Compounding frequency: the detail in the fine print"),
  mp(["How often interest is added matters, and it is a favourite exam point. The same 12% annual rate compounds differently depending on frequency. Compounded once a year, $1,000 becomes $1,120. Compounded monthly — ", im(String.raw`1000(1 + 0.12/12)^{12}`), " — it becomes $1,126.83, because each month's interest starts earning its own interest sooner."]),
  p("That gap is why the fine print on a loan or a savings account quotes both a nominal rate and an effective annual rate. The effective rate captures the compounding frequency, and it is the number that actually tells you what you will pay or earn. On a credit card, where compounding is often daily, the difference between the advertised rate and the true cost is substantial — and knowing to look for the effective rate is a piece of practical financial literacy the exam rewards and life demands."),

  h2("Annuities: the maths of regular payments"),
  p("Most real finance is not a single lump sum but a stream of equal payments — a monthly loan repayment, a regular contribution to savings, a pension. Finance calls this an annuity, and it is just the time value of money applied to a series instead of one amount. Each payment happens at a different time, so each is discounted or compounded by a different number of periods, and the total is the sum of them all."),
  p("You do not need to memorise the compact annuity formula to understand the idea, and understanding beats memorising here. The reason a savings plan of $200 a month grows so much over decades is that the early contributions have the most time to compound — the same lesson as before, now applied to a stream. And it explains a fact that surprises people: contributing a fixed amount every month for forty years, most of your final balance is growth, not the money you put in. The payments are modest; time and compounding do the heavy lifting."),

  h2("Loans are the time value of money in reverse"),
  p("A loan is the same machinery seen from the borrower's side. The lender gives you money now, and you repay more later — the extra being interest, the price of using someone else's money for a while. Every mortgage, car loan and student loan is an annuity of repayments whose present value equals the amount borrowed."),
  p("This view explains the single most important fact about borrowing: on a long loan, the early payments are almost all interest and barely touch the amount you owe. Because interest is charged on the outstanding balance, and the balance starts high, the lender takes its return first. Only as the balance falls do your payments start clearing the principal. Understanding that a loan is a discounted stream of payments — and why the interest front-loads — turns amortisation from a mysterious table into something you can reason about, and it is exactly the practical literacy these courses aim to build."),

  h2("Simple versus compound, and inflation the other way"),
  p("Two contrasts finish the foundation. Simple interest is paid only on the original amount and grows in a straight line; compound interest is paid on the accumulated total and curves upward. Over short periods the difference is small, but over decades it is enormous, and almost all real finance is compound."),
  p("Inflation is the same mechanism working against you. If prices rise 3% a year, money loses value at a compounding rate, so a dollar stuffed under a mattress is quietly shrinking. This is why 'keeping your money safe' by not investing it is not actually safe — it guarantees a slow loss to inflation. The time value of money cuts both ways, and seeing that money left idle decays as surely as invested money grows is the insight that makes the whole topic click."),
  p("This is also why finance distinguishes nominal returns from real returns. A savings account paying 4% while inflation runs at 3% is really earning you only about 1% in genuine purchasing power — the real return, which is what actually matters. A student who reports the nominal figure and stops has missed the point of the question; the exam wants you to notice that beating inflation, not just earning a positive number, is the true test of whether money is growing. Reasoning in real terms rather than nominal ones is one of the clearest signs of financial understanding, and it recurs throughout the subject."),

  h2("Opportunity cost: why interest exists at all"),
  p("Step back and ask the question the whole topic answers: why is money today worth more than money later? The deepest reason is opportunity cost. Every dollar you have can be doing something — earning interest, paying down debt, funding a business. Money you will not receive until next year is money you cannot put to work this year, and that lost opportunity is real."),
  p("Interest is simply the price that compensates for it. A lender gives up the use of their money for a period, and interest is what they charge for that sacrifice; a saver is paid interest as a reward for delaying their own spending. Seeing interest as the price of time, rather than an arbitrary percentage, makes the entire subject coherent — discount rates, loan rates and returns are all the same thing measured from different sides. It also sharpens everyday decisions: choosing to pay off a 20% credit-card debt is, in opportunity-cost terms, a guaranteed 20% return, which almost no investment can match. Understanding opportunity cost is what turns finance from calculation into judgement, and it is the idea these courses are ultimately trying to instil."),

  h2("Where finance marks are actually lost"),
  mli(["Treating money as static — forgetting that a sum today and the same sum later are not equal."]),
  mli(["Confusing simple and compound interest, or missing that compounding frequency changes the effective rate."]),
  mli(["Forgetting to discount future values back to the present when comparing options."]),
  mli(["Ignoring inflation, and so overstating what a future sum is really worth."]),
  mli(["Plugging into FV = PV(1+r)^n without understanding why the curve bends, which fails the moment a question is phrased differently."]),

  h2("How to study financial basics"),
  mli(["Work every problem as a timeline — money in, money out, and when — before touching a formula."]),
  mli(["Learn the Rule of 72 and use it to sanity-check every compound-interest answer."]),
  mli(["Always ask whether a rate is nominal or effective, and whether interest is simple or compound."]),
  mli(["Practise discounting future sums to the present until it is as natural as compounding them forward."]),

  h2("Getting help with financial basics"),
  help("If finance feels like memorising formulas, the time value of money is the one idea that makes the rest follow. Our "),
  book,
];

/* ---------- 2. BUSINESS CONCEPTS: statements & ratios ---------- */
const equationSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 150" role="img" aria-label="The accounting equation: assets equal liabilities plus equity. A bar of twelve hundred for assets equals a bar of four hundred for liabilities joined to a bar of eight hundred for equity." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <rect x="30" y="55" width="150" height="46" rx="4" fill="#3A5A98"/><text x="105" y="83" font-size="13" fill="#fff" text-anchor="middle" font-weight="700">Assets 1200</text>
    <text x="200" y="83" font-size="20" fill="#1F2937" text-anchor="middle">=</text>
    <rect x="230" y="55" width="60" height="46" rx="4" fill="#B45309"/><text x="260" y="83" font-size="12" fill="#fff" text-anchor="middle" font-weight="700">Liab 400</text>
    <text x="300" y="83" font-size="18" fill="#1F2937" text-anchor="middle">+</text>
    <rect x="315" y="55" width="100" height="46" rx="4" fill="#5578b8"/><text x="365" y="83" font-size="12" fill="#fff" text-anchor="middle" font-weight="700">Equity 800</text>
    <text x="220" y="30" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="600">What you own = what you owe + what is truly yours</text>
    <text x="220" y="128" font-size="11.5" fill="#64748B" text-anchor="middle">the equation that must always balance — the whole of the balance sheet</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Every balance sheet ever written obeys this one line. Assets are funded either by borrowing
    (liabilities) or by owners (equity), so the two sides can never disagree.
  </figcaption>
</figure>`;

const business = [
  p("Business and financial-accounting topics scare students with their vocabulary — assets, liabilities, equity, a wall of ratios — and the instinct is to memorise definitions. That approach collapses under exam pressure, because the terms only make sense in relation to one another. There is a better organising idea: a business's financial statements tell a single connected story, and one equation holds the whole thing together."),
  p("Learn to read that story — where a company's money comes from, where it goes, and what is left — and business concepts turn from a glossary into logic you can reason through."),
  help("This is how we teach it in "),

  h2("The accounting equation: the line that must balance"),
  p("Everything in financial accounting rests on one identity, and it is worth understanding rather than reciting:"),
  math(String.raw`\text{Assets} = \text{Liabilities} + \text{Equity}`),
  { _type: "htmlBlock", _key: key(), html: equationSvg },
  p("It says something almost obvious once stated plainly: everything a business owns had to be paid for somehow — either with borrowed money (liabilities) or with the owners' own money (equity). There is no third source. So the value of what a company owns must always equal the claims against it, and the two sides of a balance sheet can never disagree. When they do, something is wrong. This is why it is called a balance sheet, and why 'the books must balance' is a law, not a saying."),

  h2("The three statements, and what each one answers"),
  p("A company reports through three statements, and confusion evaporates once you know the single question each one answers."),
  mli(["The balance sheet is a snapshot: at one moment, what does the company own and owe? It answers 'how healthy is it right now?'"]),
  mli(["The income statement covers a period: over the quarter or year, did it make a profit? Revenue minus expenses equals net income — it answers 'is the business actually making money?'"]),
  mli(["The cash flow statement tracks the actual cash moving in and out over the period, which is not the same as profit. It answers 'can it pay its bills?' — because a profitable company can still run out of cash, and a struggling one can look fine for a while on borrowed money."]),
  p("The insight examiners test is that profit and cash are different things. A firm can report a healthy profit while its bank account empties, because sales made on credit count as revenue before the cash arrives. Understanding why the three statements can tell different-looking stories about the same company is the mark of someone who gets accounting rather than memorising it."),

  h2("Ratios: turning statements into judgements"),
  p("Raw numbers mean little on their own — is $400,000 of debt a lot? It depends entirely on the size of the business. Ratios put figures in context, and a handful cover most of what an introductory course asks. Group them by the question they answer and they stop being a list to memorise."),
  h3("Can it pay its short-term bills? (liquidity)"),
  mp(["The current ratio is current assets over current liabilities. At ", im(String.raw`300{,}000 / 150{,}000 = 2.0`), ", the company has twice the short-term assets it needs to cover its short-term debts — comfortable. Below 1.0 would be a warning sign."]),
  h3("How much does it rely on borrowing? (solvency)"),
  mp(["Debt-to-equity compares what a company owes to what the owners have put in. At ", im(String.raw`400{,}000 / 800{,}000 = 0.5`), ", it is funded twice as much by owners as by debt — conservative. A high ratio means more risk, because debt must be repaid whether or not the business does well."]),
  h3("Is it actually profitable? (profitability)"),
  mp(["Gross margin, ", im(String.raw`(500{,}000 - 300{,}000)/500{,}000 = 40\%`), ", shows how much of each sales dollar survives the direct cost of the goods. Return on equity, ", im(String.raw`120{,}000 / 800{,}000 = 15\%`), ", shows how much profit the owners' investment generates — the number an investor cares about most."]),

  h2("Fixed and variable costs: the split that drives decisions"),
  p("Before a business can judge profitability, it has to understand the shape of its costs, and they come in two kinds. Fixed costs stay the same regardless of how much you produce — rent, salaries, insurance are owed whether you sell one unit or ten thousand. Variable costs rise with output — materials and per-unit labour scale directly with how much you make. Almost every business decision depends on knowing which of your costs are which."),
  p("The reason this matters is that fixed costs create both risk and reward. A business with high fixed costs loses heavily when sales are low, because those costs must be paid regardless — but once sales pass a certain point, every extra unit is highly profitable, because the fixed costs are already covered. This is operating leverage, and it is why a factory-heavy business swings between big losses and big profits while a lean one stays steadier. Recognising a cost as fixed or variable is the first step in nearly every quantitative business question."),

  h2("Break-even: the number every business needs"),
  p("Put the cost split to work and you get the single most practical calculation in business studies: how much must you sell just to cover your costs? The key quantity is the contribution margin — the price of a unit minus its variable cost — which is what each sale contributes toward the fixed costs."),
  mp(["Say a product sells for $25 and costs $15 in materials to make, against $10,000 of fixed costs. Each unit contributes ", im(String.raw`25 - 15 = \$10`), ". To cover the fixed costs you need ", im(String.raw`10{,}000 / 10 = 1{,}000`), " units. Sell fewer and you lose money; sell more and you profit — at 1,500 units the profit is ", im(String.raw`1500 \times 10 - 10{,}000 = \$5{,}000`), "."]),
  p("Break-even analysis answers questions a business genuinely asks: is this product viable, what happens if costs rise, how many customers do we need? It also shows why cutting price is dangerous — a lower price shrinks the contribution margin, so the break-even volume jumps, sometimes to a level that is unreachable. This one calculation ties revenue, costs and profit together, and it is among the most reliably examined tools in the subject."),

  h2("Depreciation and working capital: two ideas exams love"),
  mp(["Two more concepts round out the picture. Depreciation spreads the cost of a long-lived asset over its useful life rather than charging it all at once — a $50,000 machine with a $5,000 salvage value over five years depreciates at ", im(String.raw`(50{,}000 - 5{,}000)/5 = \$9{,}000`), " a year on the straight-line method. This matters because it explains how a profitable company shows a large expense with no cash leaving that year, one of the reasons profit and cash flow differ."]),
  p("Working capital — current assets minus current liabilities — is the money a business has available to run its day-to-day operations. A company can be profitable on paper yet fail because its cash is tied up in unsold stock or unpaid invoices while its bills come due. This is why managing working capital is a survival skill, not an accounting detail, and why exam questions increasingly test whether students see that a growing, profitable business can still run out of cash if it manages its working capital badly. It circles back to the same lesson: profit and liquidity are different things."),

  h2("Where business-concepts marks are actually lost"),
  mli(["Memorising ratio formulas without knowing what question each one answers."]),
  mli(["Confusing profit with cash, and so missing why a profitable company can fail."]),
  mli(["Forgetting the accounting equation must balance, which is the fastest check on any balance-sheet error."]),
  mli(["Reading a ratio without context — a number is only high or low relative to the industry and the company's history."]),
  mli(["Mixing up the three statements, or which period versus snapshot each covers."]),

  h2("Reading a company as a whole"),
  p("The reason all of this fits together is that a business is a single system, and the statements, ratios and costs are different windows onto it. Money comes in from customers, flows out to suppliers, staff and lenders, and what remains belongs to the owners — the accounting equation keeps score of the stocks while the income and cash-flow statements track the flows. A ratio is just a way of asking whether one part of that system is in a healthy proportion to another."),
  p("Examiners increasingly ask students to interpret rather than calculate: given these figures, is this business healthy, and what should it do? Answering well means putting the pieces together — a strong profit margin means little if cash flow is negative and debt is high, while a modest margin can be fine in a stable, low-risk business. This holistic reading, weighing profitability against liquidity against risk, is the skill a good business course is really building, and it is what separates a top answer from one that merely computes the right numbers."),

  h2("How to study business concepts"),
  mli(["Anchor everything to Assets = Liabilities + Equity, and check it balances on every problem."]),
  mli(["For each statement, write the one question it answers before working with its numbers."]),
  mli(["Group ratios by liquidity, solvency and profitability rather than as a flat list."]),
  mli(["Always interpret a ratio, do not just calculate it — say what it means for the business."]),

  h2("Getting help with business concepts"),
  help("If accounting feels like a glossary to memorise, the accounting equation and the three-statement story turn it into logic. Our "),
  book,
];

/* ---------- 3. PRACTICAL APPLICATION: investment decisions ---------- */
const npvSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 190" role="img" aria-label="A net present value timeline. An investment of one thousand dollars today returns six hundred dollars in year one and six hundred in year two. Discounted back to today at ten percent, those returns are worth 545 and 496 dollars, for a net present value of positive 41 dollars, so the project is accepted." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="40" y1="95" x2="410" y2="95" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="60" y1="95" x2="60" y2="150" stroke="#B45309" stroke-width="2.5"/><text x="60" y="168" font-size="11" fill="#B45309" text-anchor="middle" font-weight="600">−$1000</text><text x="60" y="86" font-size="10" fill="#64748B" text-anchor="middle">now</text>
    <line x1="220" y1="95" x2="220" y2="55" stroke="#3A5A98" stroke-width="2.5"/><text x="220" y="46" font-size="11" fill="#3A5A98" text-anchor="middle" font-weight="600">+$600</text><text x="220" y="110" font-size="10" fill="#64748B" text-anchor="middle">yr 1</text><text x="220" y="128" font-size="10" fill="#94A3B8" text-anchor="middle">=$545 today</text>
    <line x1="380" y1="95" x2="380" y2="60" stroke="#3A5A98" stroke-width="2.5"/><text x="380" y="51" font-size="11" fill="#3A5A98" text-anchor="middle" font-weight="600">+$600</text><text x="380" y="110" font-size="10" fill="#64748B" text-anchor="middle">yr 2</text><text x="380" y="128" font-size="10" fill="#94A3B8" text-anchor="middle">=$496 today</text>
    <text x="220" y="20" font-size="12.5" fill="#1F2937" text-anchor="middle" font-weight="700">NPV = −1000 + 545 + 496 = +$41  → accept</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    Future returns are discounted back to today before comparing them with today's cost. Because the
    discounted returns ($1,041) exceed the $1,000 outlay, the project adds value and is worth doing.
  </figcaption>
</figure>`;

const practical = [
  p("The practical side of finance is where the concepts meet real decisions: should a company build the factory, should you take the investment, is this risk worth the return? These questions feel like judgement calls, but finance turns most of them into calculations — and the exam rewards students who know which calculation applies and why."),
  p("Two ideas do most of the work: discounting future money to compare it fairly with money today, and the trade-off between risk and return. Master those and practical finance stops being guesswork and becomes a method."),
  help("This is the applied core we focus on in "),

  h2("Net present value: the decision rule finance is built on"),
  p("Almost every investment decision reduces to one question: are the future returns worth more than the cost today? You cannot simply add up future cash, because — from the time value of money — future dollars are worth less than present ones. So you discount each future return back to today, then compare."),
  { _type: "htmlBlock", _key: key(), html: npvSvg },
  mp(["Suppose a project costs $1,000 now and returns $600 in each of the next two years, with a 10% discount rate. Discount each return: ", im(String.raw`600/1.1 = 545`), " and ", im(String.raw`600/1.1^2 = 496`), ". The net present value is:"]),
  math(String.raw`NPV = -1000 + 545 + 496 = +\$41`),
  p("The rule is simple and it is the backbone of corporate finance: if the NPV is positive, the investment creates value — do it. If negative, it destroys value — walk away. The $41 here means the project is worth $41 more than it costs in today's money, so it clears the bar. Understanding that a positive NPV means 'the discounted returns beat the cost' turns a whole category of decisions into one calculation, and it is the single most examined idea in applied finance."),

  h2("Risk and return: the trade-off that governs everything"),
  p("The second pillar is the relationship between risk and return, and it is not a vague warning — it is a structural fact of markets. Investors will only accept more risk if they are compensated with a higher expected return. That is why a government bond pays little and a startup promises a lot: the extra return is the price of bearing the extra uncertainty."),
  p("The exam trap is to treat a high expected return as simply 'better'. It is not better; it is riskier, and the two are inseparable. A useful way to see it: a bet that doubles your money or loses it all on a coin flip has an expected value exactly equal to not betting, yet it is wildly risky. Return alone never tells you whether an investment is good — you must weigh it against the risk taken to earn it. Questions that ask you to compare investments are almost always testing whether you understand that pairing."),

  h2("Diversification: the closest thing to a free lunch"),
  p("Here is the one place finance offers something for nothing, and it follows directly from the risk-return idea. If you spread money across several investments that do not move in lockstep, their ups and downs partly cancel, so the overall risk falls — while the expected return does not. You reduce risk without sacrificing return, which is why 'don't put all your eggs in one basket' is not folk wisdom but a mathematical result."),
  p("This is the reasoning behind portfolios, index funds and the advice to hold a mix of assets. A single stock can collapse; a broad basket rarely does, because it is unlikely that everything falls at once. The key exam point is precise: diversification reduces the risk that is specific to individual investments, though it cannot remove the risk that affects the whole market. Understanding what diversification can and cannot do separates a real grasp of investing from a slogan."),

  h2("IRR and payback: the other two decision tools"),
  mp(["NPV is the gold standard, but exams expect two companions. The internal rate of return (IRR) is the discount rate at which a project's NPV equals exactly zero — the project's own built-in rate of return. For our $1,000 project returning $600 twice, the IRR is about ", im(String.raw`13.07\%`), ". The rule mirrors NPV: accept the project if its IRR exceeds your cost of capital. Here 13% beats a 10% cost of capital, so it clears the bar — the same verdict NPV gave, which is reassuring and usually the case."]),
  mp(["The payback period is cruder: how long until the returns repay the initial cost? At $600 a year against $1,000, that is about ", im(String.raw`1.67`), " years. It is popular because it is intuitive and quick, but the exam wants you to know its two flaws — it ignores the time value of money entirely, and it ignores everything that happens after the payback point, so a project with huge later returns can look worse than a mediocre one that pays back fast. Payback is a useful screen, never the final word."]),

  h2("The cost of capital: the hurdle every project must clear"),
  p("All of these rules compare a project's return against a benchmark — the cost of capital — and understanding that benchmark is what makes the rules meaningful rather than mechanical. The cost of capital is what it costs the business to fund the investment, blending the interest demanded by lenders and the return expected by shareholders. It is the minimum acceptable return, the hurdle rate."),
  p("This is why the same project can be worth doing for one company and not another: a business that can raise money cheaply has a low hurdle and accepts investments a higher-cost rival must reject. It also connects back to risk and return — riskier projects and riskier companies face higher costs of capital, because investors demand more to fund them, which automatically holds risky ventures to a tougher standard. Seeing the cost of capital as the bar that every NPV and IRR calculation is implicitly measured against turns a set of separate formulas into one coherent decision framework, and that coherence is exactly what distinguishes a strong finance student."),

  h2("Comparing investments the finance way"),
  p("Put the tools together and you can evaluate almost any opportunity. Convert future cash to present value so you are comparing like with like. Check the return against the risk rather than in isolation. Ask whether it diversifies or concentrates your existing holdings. A simple return calculation — a $1,000 investment worth $1,200 later is a 20% return — is only the starting point; the finance-literate question is whether that 20% is generous or stingy for the risk involved, and whether the timing makes it worth more or less than an alternative. That layered comparison is what practical finance actually is, and it is a method anyone can learn."),

  h2("Why smart people still invest badly"),
  p("A modern applied-finance course usually touches on why real investors, knowing all of the above, still make poor decisions — and it is worth understanding because the exam increasingly asks about it. The tools assume people act rationally; behavioural finance studies the ways they predictably do not. Loss aversion makes people feel a loss about twice as strongly as an equivalent gain, so they hold failing investments too long, hoping to break even. Herd behaviour drives bubbles, as people buy simply because prices are rising and others are buying. Overconfidence leads to under-diversifying, because an investor is sure their chosen stock is the exception."),
  p("The practical lesson is that a sound method protects you from your own instincts. Diversification, a discipline of judging return against risk, and discounting future cash rather than chasing recent performance are not just exam techniques — they are guardrails against the predictable mistakes above. This is why the calculations matter beyond the classroom: they impose the rationality that human psychology tends to abandon at exactly the wrong moment. Being able to explain why an investor might irrationally reject a positive-NPV project, or pile into an overvalued one, is the kind of integrated reasoning that earns top marks."),

  h2("Where practical-finance marks are actually lost"),
  mli(["Adding future cash flows without discounting them to present value."]),
  mli(["Judging an investment by return alone, ignoring the risk taken to earn it."]),
  mli(["Misapplying the NPV rule — accepting negative-NPV projects or rejecting positive ones."]),
  mli(["Thinking diversification removes all risk, rather than the investment-specific part."]),
  mli(["Comparing options with different timings without bringing them to a common point in time."]),

  h2("How to study practical finance"),
  mli(["Draw every decision as a cash-flow timeline, then discount to today before comparing."]),
  mli(["State the risk alongside the return for any investment — never quote one without the other."]),
  mli(["Apply the NPV rule explicitly: positive means accept, negative means reject, and say why."]),
  mli(["Reason through diversification with concrete examples of what it does and does not protect against."]),

  h2("Getting help with practical finance"),
  help("If investment decisions feel like judgement calls, discounting and the risk-return trade-off turn most of them into method. Our "),
  book,
];

await applyPost({ slug: "finance-financial-basics", was: 409, body: basics, siblingSlugs: FIN_SIBS.filter((s) => s !== "finance-financial-basics") });
await applyPost({ slug: "finance-business-concepts", was: 377, body: business, siblingSlugs: FIN_SIBS.filter((s) => s !== "finance-business-concepts") });
await applyPost({ slug: "finance-practical-application-of-finance", was: 411, body: practical, siblingSlugs: FIN_SIBS.filter((s) => s !== "finance-practical-application-of-finance") });
