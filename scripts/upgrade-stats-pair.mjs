/**
 * The two university statistics course-code pages (UBC STAT / Langara STAT).
 * DELIBERATELY split: UBC page = descriptive stats + probability foundations;
 * Langara page = inference + regression. Overlap gated against each other and the
 * university linear-algebra pair. Course codes already in slug/title; no NEW
 * institutional claims. Stats verified in scripts/verify-stats.mjs.
 */
import { applyPost, key, p, h2, h3, math, im, mp, mli, linked } from "./flagship-lib.mjs";

const UM = "/programs/university-mathematics";
const STAT_SIBS = ["university-mathematics-statistics-ubc-stat-200-203-241-251", "university-mathematics-statistics-langara-stat-1123-1124-1181", "university-mathematics-linear-algebra-ubc-math-152", "university-mathematics-linear-algebra-langara-math-2362"];

/* ===== UBC STAT: DESCRIPTIVE + PROBABILITY FOUNDATIONS ===== */
const ubc = [
  p("Introductory university statistics catches many students off guard, because it is not the arithmetic-heavy maths they expect — it is a course about reasoning under uncertainty, and it demands a way of thinking that earlier maths rarely taught. Before you can draw conclusions from data, you have to be able to describe it clearly and to reason about probability, and this foundation is where a surprising number of students quietly fall behind. Get the foundations of describing data and quantifying uncertainty right, and the rest of statistics has something solid to stand on."),
  p("This guide covers the foundations of university statistics — how to summarise and describe data, and the probability that underpins everything that follows — so you build the base the whole subject depends on."),

  h2("Describing data: centre, spread, and shape"),
  p("Statistics begins with describing data, and doing it well requires understanding what each summary actually tells you. The measures of centre — mean, median, and mode — each capture the 'typical' value differently, and knowing when to use which matters. For the data set 2, 4, 4, 4, 5, 5, 7, 9, the mean is 5, the median is 4.5, and the mode is 4; they differ because the mean is pulled by larger values while the median is not."),
  mp(["This difference is not a technicality — it is the key to choosing the right measure. When data is skewed or has outliers, the median often describes it more honestly than the mean, which is why incomes are usually reported as medians. Equally important is the spread: the variance and standard deviation measure how spread out the data is. For that same data set the standard deviation is 2, telling you how far, on average, the values sit from the mean. Understanding centre, spread, and the shape of a distribution together is what lets you genuinely describe data rather than just compute numbers about it."]),

  h2("Distributions and the bell curve"),
  p("Much of statistics revolves around distributions — the pattern of how data or outcomes are spread — and the normal distribution, the familiar bell curve, is the most important. Its significance comes from how often it appears and from a remarkably useful regularity: the empirical rule, which says that for normally-distributed data, about 68% of values fall within one standard deviation of the mean, 95% within two, and 99.7% within three."),
  mp(["This rule turns the standard deviation into a powerful ruler. It lets you say immediately how unusual a value is: a test score of 85 in a class with mean 70 and standard deviation 10 has a z-score of ", im(String.raw`(85-70)/10 = 1.5`), ", meaning it is one and a half standard deviations above average and better than roughly 93% of scores. The z-score standardises any value onto the normal scale, making different distributions comparable. Understanding the normal distribution and the empirical rule, and being fluent with z-scores, is foundational, because the entire machinery of statistical inference is built on how sample results behave relative to these distributions."]),

  h2("Probability: the logic of uncertainty"),
  p("Probability is the mathematical language of uncertainty, and it underpins everything statistics does — because statistics is fundamentally about drawing conclusions in the face of randomness. The core rules are more intuitive than they first appear. The probability of two independent events both happening is the product of their probabilities: two fair coins both landing heads is 0.5 times 0.5, which is 0.25. The probability of one or another of two mutually exclusive events is the sum: rolling a 1 or a 2 on a die is 1/6 plus 1/6."),
  p("These rules extend to richer situations — conditional probability (the chance of one event given another has occurred), and the way probabilities combine in more complex scenarios — but the foundation is this logic of how uncertain events combine. Many students find probability the hardest part of introductory statistics precisely because it requires careful reasoning rather than mechanical calculation, and small misreadings of a problem lead to wrong answers. Building genuine comfort with probabilistic reasoning is essential, because inference — the goal of the whole course — is applied probability, and shakiness here undermines everything downstream."),
  linked(["If the foundations of university statistics — describing data, distributions, or probability — are where you are struggling, that is exactly the base the rest of the course rests on, and shoring it up quickly changes everything. Our ", { text: "university statistics tutoring", href: UM }, " builds these foundations clearly, working from your actual course material."]),

  h2("Random variables and expectation"),
  p("A concept that bridges description and probability, and that university statistics leans on heavily, is the random variable — a quantity whose value depends on the outcome of a random process. Rather than a single number, a random variable has a distribution of possible values, each with a probability, and learning to reason about it is a step up in abstraction that some students find challenging. The expected value is its long-run average — what you would get, on average, over many repetitions."),
  p("Understanding random variables and their distributions is what connects the descriptive statistics of real data to the probability theory of idealised processes, and it is the conceptual pivot on which the course turns toward inference. A random variable's mean and standard deviation describe its distribution just as they describe a data set, which unifies the two halves of the foundations. Grasping that a sample of data is a realisation of underlying random variables, and that we use probability to reason from the sample back to the process, is the insight that makes statistical inference possible. Building this understanding is exactly the kind of conceptual work where clear guidance accelerates progress."),

  h2("Types of data shape everything that follows"),
  p("A foundational distinction that students often skip past, only to be tripped up later, is that data comes in different types, and the type determines what analysis is even valid. Categorical data sorts things into groups — colours, categories, yes or no — while numerical data measures quantities, and numerical data further splits into discrete counts and continuous measurements. This is not pedantry: the appropriate summary, graph, and statistical test all depend on what kind of data you have."),
  p("Using a method meant for one data type on another is a common and serious error — computing a mean of categorical codes, for instance, is meaningless, however tidy the number looks. Recognising the type of each variable, and knowing which summaries and analyses suit it, is a habit that prevents a whole class of mistakes and is quietly assumed throughout the course. Building the reflex to ask 'what kind of data is this?' before choosing how to analyse it is one of the most practical foundations you can establish, and it pays off across every later topic in statistics."),

  h2("Displaying data: choosing the right graph"),
  p("Statistics places real emphasis on visualising data, because a well-chosen graph reveals patterns that a table of numbers hides, and interpreting graphs is a tested skill in its own right. Different displays suit different purposes: histograms show the shape of a distribution, boxplots summarise centre and spread and flag outliers, scatterplots reveal relationships between two variables, and bar charts compare categories. Choosing the display that matches your data and your question is part of thinking statistically."),
  p("Just as important as making graphs is reading them critically. A histogram tells you whether data is symmetric or skewed and where it clusters; a boxplot shows at a glance how spread out the data is and whether unusual values are present. Being able to look at a distribution and describe its shape, centre and spread — and to spot when a graph is misleading — connects directly to the descriptive measures above and prepares you for interpreting the results of analyses later. Developing genuine fluency with statistical graphs, both creating and reading them, is a core foundational skill that supports everything from description to inference."),

  h2("Where students struggle with statistics foundations"),
  mli(["Computing mean, median and mode without knowing when each is appropriate."]),
  mli(["Underusing the standard deviation and the empirical rule to gauge how unusual a value is."]),
  mli(["Finding probability hard because it requires reasoning, not mechanical calculation."]),
  mli(["Misreading probability problems, leading to wrong combinations of events."]),
  mli(["Struggling with the abstraction of random variables and expectation."]),

  h2("How to master the foundations"),
  mli(["Learn to describe data by centre, spread and shape, choosing the right measure."]),
  mli(["Make the normal distribution, empirical rule and z-scores second nature."]),
  mli(["Build genuine comfort with probability as the logic of uncertainty."]),
  mli(["Practise reading probability problems carefully before calculating."]),
  mli(["Understand random variables as the bridge to statistical inference."]),

  h2("Build a solid statistics foundation"),
  linked(["If introductory statistics is proving harder than expected, the fix is usually the foundations — description, distributions, and probability — which everything else builds on. Our ", { text: "university mathematics and statistics tutoring in Burnaby and online", href: UM }, " builds these clearly, from your own course and past exams, for students in commerce, science, and social sciences alike."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where statistics is difficult, and we will show you the reasoning that clarifies it — online across Metro Vancouver and beyond, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

/* ===== LANGARA STAT: INFERENCE + REGRESSION ===== */
const langara = [
  p("The moment introductory statistics turns genuinely difficult for most students is when it stops describing data and starts drawing conclusions from it — the shift into statistical inference. Suddenly you are reasoning about an entire population from a small sample, quantifying uncertainty, and interpreting p-values and confidence intervals whose exact meaning is famously easy to get subtly wrong. This is the intellectual heart of the course, and it is where the marks are won and lost. Understanding the logic of inference, rather than mechanically applying procedures, is what separates a real grasp of statistics from a fragile one."),
  p("This guide covers the inferential heart of university statistics — how we reason from a sample to a population, hypothesis testing, confidence intervals, and regression — so the part of the course that defeats most students becomes something you can reason through."),

  h2("The idea that makes inference possible"),
  mp(["Statistical inference rests on one profound idea: although any single sample is subject to randomness, the behaviour of samples is predictable. If you took sample after sample and computed each one's mean, those means would themselves form a distribution — the sampling distribution — and its spread, the standard error, shrinks predictably as samples grow: it equals ", im(String.raw`\sigma/\sqrt{n}`), ". Quadruple your sample size and you halve the standard error, because the uncertainty falls with the square root of n."]),
  p("This is the engine of all inference. Because we know how sample statistics behave, we can quantify how much a single sample might differ from the truth, and therefore how much confidence to place in conclusions drawn from it. This is why larger samples give more precise estimates, and why the amount of data matters so much. Students who grasp that inference works by knowing the predictable behaviour of samples understand why the procedures work; those who skip it find hypothesis tests and confidence intervals a set of arbitrary recipes. This single idea is the foundation on which the rest of inference is built."),

  h2("Hypothesis testing: the logic students misstate"),
  p("Hypothesis testing is the most heavily tested and most misunderstood part of the course. The logic is a kind of proof by contradiction: you assume nothing interesting is happening (the null hypothesis), then ask how likely your observed data would be if that assumption were true. That likelihood is the p-value, and a small p-value means your data would be surprising under the null, so you reject it."),
  mp(["By convention, a p-value below 0.05 leads you to reject the null hypothesis, while a p-value above it means you fail to reject — a result of 0.03 is statistically significant at the 5% level, while 0.08 is not. But the precise meaning is where students go wrong constantly: the p-value is the probability of the data given the null, not the probability that the null is true, and 'failing to reject' is not the same as 'proving' the null. Stating these conclusions exactly, and in context, is precisely what exams reward and what careless study gets subtly wrong. Understanding the actual logic — not just the decision rule — is what makes hypothesis testing reliable."]),

  h2("Confidence intervals: estimation with honesty"),
  p("Where hypothesis testing gives a yes-or-no answer, confidence intervals give a range, and they are often the more useful and more honest tool. A confidence interval is a range of plausible values for an unknown population quantity, built from your sample, together with a level of confidence. A 95% confidence interval, for instance, is constructed so that the method captures the true value 95% of the time over many samples."),
  mp(["The construction follows from the sampling distribution: a 95% interval reaches roughly 1.96 standard errors on each side of the sample estimate, so with a standard error of 1 the interval extends about ", im(String.raw`\pm 1.96`), " around the estimate. The subtle point students must get right is the interpretation: the confidence is in the method over many samples, not a probability about the single interval you calculated. A wider interval reflects more uncertainty, a narrower one more precision, and larger samples give narrower intervals. Understanding confidence intervals as honest statements of uncertainty, and interpreting them precisely, is a core inferential skill and a frequent exam discriminator."]),
  linked(["If inference — p-values, confidence intervals, the whole logic of reasoning from a sample — is where your statistics course is defeating you, that is the norm, and understanding the underlying logic is what turns it around. Our ", { text: "university statistics tutoring", href: UM }, " builds exactly this reasoning, working from your real problems and past exams."]),

  h2("Regression: modelling relationships"),
  p("The other major inferential topic is regression, which models the relationship between variables and lets you make predictions. It builds on correlation — the correlation coefficient r measures how strongly two variables move together on a scale from −1 to 1 — and extends it by fitting a line that best captures the relationship. For the points (1,1), (2,2) and (3,2), the least-squares regression line has a slope of 0.5, and that slope has a real interpretation: how much the response changes per unit change in the predictor."),
  p("Regression is powerful and correspondingly easy to misuse, which is exactly what exams probe. The most important caution is that correlation does not imply causation — a strong regression relationship does not mean one variable causes the other, a distinction that is both a statistical principle and a life skill. Other cautions include not extrapolating a model beyond the range of the data, and checking whether a linear model is actually appropriate. Understanding regression as a tool for describing and predicting relationships, while respecting its limits, is the capstone of introductory inference, and reasoning honestly about what a model does and does not establish is precisely the statistical maturity the course aims to build."),

  h2("Comparing groups: the tests you will actually use"),
  p("Much of applied inference is about comparing groups — does a treatment differ from a control, do two populations have different means, are several groups all the same? The course equips you with a toolkit of tests for these situations, and the skill is choosing the right one and interpreting it correctly. Comparing two means uses a t-test; comparing several groups at once uses analysis of variance; comparing categorical outcomes uses a chi-square test. Each answers a specific kind of question."),
  p("The common thread is the same inferential logic: you compute how surprising your observed difference would be if there were really no difference, and reject the no-difference hypothesis if that is small enough. Students often struggle less with the mechanics than with matching the test to the situation — recognising, from the structure of the data and the question, which test applies. Understanding the family of tests as variations on one logic, rather than as separate recipes to memorise, is what makes this part of the course manageable. It also mirrors real statistical practice, where selecting an appropriate method is half the work, and it is exactly the judgement that guided practice develops."),

  h2("Study design: why the data was collected matters"),
  p("A theme that runs through applied statistics, and that exams increasingly emphasise, is that the conclusions you can draw depend on how the data was collected. A well-designed randomised experiment, with a control group and random assignment, can support a causal conclusion, because randomisation balances out other factors. An observational study, however careful, generally cannot establish causation, because lurking variables may explain any relationship you find."),
  p("This is why the correlation-versus-causation caution matters so much, and why it connects to study design rather than being an isolated warning. Understanding sampling — how a sample must be representative to support conclusions about a population, and how bias creeps in when it is not — is equally important, because inference from a biased sample is inference about the wrong thing. Being able to look at a study and judge what it can and cannot support, based on how it was designed and how its data was gathered, is one of the most valuable and most transferable skills the course teaches. It elevates statistics from calculation to genuine critical reasoning about evidence, which is exactly what makes it worth learning well."),

  h2("Where students struggle with statistical inference"),
  mli(["Not understanding the sampling distribution, so inference feels like arbitrary recipes."]),
  mli(["Misstating what a p-value means, or treating 'fail to reject' as proof."]),
  mli(["Misinterpreting confidence intervals as probabilities about a single interval."]),
  mli(["Confusing correlation with causation in regression."]),
  mli(["Extrapolating models beyond the data or ignoring whether a model fits."]),

  h2("How to master statistical inference"),
  mli(["Understand the sampling distribution as the engine that makes inference work."]),
  mli(["Learn the actual logic of hypothesis testing, and state conclusions precisely."]),
  mli(["Interpret confidence intervals as honest statements of uncertainty."]),
  mli(["Use regression to model relationships while respecting its limits."]),
  mli(["Never confuse correlation with causation, and never extrapolate carelessly."]),

  h2("Master the heart of statistics"),
  linked(["If statistical inference is the wall between you and a strong grade, understanding its logic — rather than memorising procedures — is what gets you over it, and it is exactly what focused tutoring builds. Our ", { text: "university mathematics and statistics tutoring in Burnaby and online", href: UM }, " develops the inferential reasoning your course rewards, from your own material and past exams."]),
  linked(["Start with a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where inference is hard, and we will show you the reasoning that makes it click — online across Metro Vancouver and beyond, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

await applyPost({ slug: "university-mathematics-statistics-ubc-stat-200-203-241-251", was: 753, body: ubc, siblingSlugs: STAT_SIBS.filter((s) => s !== "university-mathematics-statistics-ubc-stat-200-203-241-251") });
await applyPost({ slug: "university-mathematics-statistics-langara-stat-1123-1124-1181", was: 696, body: langara, siblingSlugs: STAT_SIBS.filter((s) => s !== "university-mathematics-statistics-langara-stat-1123-1124-1181") });
