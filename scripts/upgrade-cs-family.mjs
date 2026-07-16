/**
 * Computer-science family: programming-basics, computational-thinking,
 * data-structures-algorithms, logic-building. Distinct angles (high overlap risk),
 * lead-gen with distinct per-post CTAs. DSA numbers verified in verify-cs.mjs.
 */
import { applyPost, key, p, h2, h3, li, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["computer-science-programming-basics", "computer-science-computational-thinking", "computer-science-data-structures-algorithms", "computer-science-logic-building"];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (src) => ({ _type: "htmlBlock", _key: key(), html: `<pre style="background:#1e293b;color:#e2e8f0;padding:1rem 1.25rem;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.6;margin:1.5rem 0;"><code>${esc(src)}</code></pre>` });
const P = "/programs/computer-science";

/* ================= 1. PROGRAMMING BASICS ================= */
const basics = [
  p("You have decided to learn to code, opened a tutorial, and immediately drowned in syntax — semicolons, brackets, keywords — with no sense of the bigger picture. This is how most people start, and it is why so many give up early: they are memorising the vocabulary of a language without understanding what programming actually is. The reassuring truth is that underneath every programming language sits the same small set of ideas, and once you understand those, learning any specific language becomes far easier."),
  p("Programming basics are the universal building blocks that every language shares — the concepts that transfer whether you write Python, JavaScript, Java or anything else. This guide covers what a program fundamentally is and the handful of core ideas it is built from, so you learn to program rather than just memorising one language's syntax."),

  h2("A program is a precise set of instructions"),
  p("At its core, a program is nothing more than a list of instructions for a computer to follow, one after another, exactly as written. The computer does precisely what you say — no more, no less — with none of the judgement or assumption a human would apply. This is the first and most important mental shift: the computer is not smart, it is obedient, and every unexpected result is the computer faithfully doing exactly what you actually told it, rather than what you meant."),
  p("Internalising this changes how you think about bugs. When your program misbehaves, it is not being difficult; it is following your instructions literally, and somewhere those instructions do not match your intention. This is why programming demands precision and why debugging is really the skill of finding where what you said and what you meant diverged. Understanding that a program is exact, literal instruction-following is the foundation that makes everything else, including the frustrating parts, make sense."),

  h2("Variables: naming the things you work with"),
  p("The first building block is the variable — a named place to store a piece of information so you can use and change it later. Every language has variables, and while the exact syntax differs, the concept is identical everywhere: give a value a name, and refer to it by that name."),
  code("score = 0        # store a number under the name 'score'\nname = \"Ada\"     # store some text\nscore = score + 10   # use and update it"),
  p("Variables are how a program remembers things as it runs — a running total, a user's name, whether a game is over. The idea that transfers to every language is that a variable is a name attached to a value that can change over time. Once you understand variables conceptually, you will find them in Python, JavaScript, Java and everywhere else, wearing slightly different syntax but doing exactly the same job. Learning the concept, not just one language's version of it, is what makes you a programmer rather than a user of one language."),

  h2("Control flow: making decisions and repeating"),
  p("A program that only runs straight down its list of instructions is limited. The two building blocks that give programs their power are conditionals — doing something only if a condition is true — and loops — repeating an action. Every useful program is built from these, combined in endless ways."),
  code("if score > 100:          # a decision\n    print(\"You win!\")\n\nfor i in range(5):       # a repetition\n    print(\"Hello\")"),
  p("Conditionals let a program respond differently to different situations; loops let it handle repetition without you writing the same thing a thousand times. These two ideas — decision and repetition — appear in every programming language and are enough, in principle, to express any computation at all. When you can see a problem in terms of 'what decisions need making?' and 'what needs repeating?', you are thinking in the terms that all programming shares, and picking up a new language becomes a matter of learning how it writes these familiar ideas."),
  linked(["If the syntax of your first language is overwhelming you and the bigger picture is not coming together, that is the single most common reason beginners stall — and it clears up fast when someone shows you the universal concepts underneath. Our ", { text: "computer science tutoring", href: P }, " teaches you to program, not just to memorise one language, so everything you learn transfers."]),

  h2("Functions: packaging and reusing logic"),
  p("As programs grow, you need a way to organise them and avoid repeating yourself, and the building block for this is the function — a named, reusable piece of logic that does one job. You write it once and use it whenever you need it, which keeps programs manageable as they grow beyond a few lines."),
  p("Functions are how real programs are structured: rather than one enormous list of instructions, a program becomes a collection of named functions that each handle a piece of the task, assembled together. This is the same idea in every language, and it introduces the crucial skill of breaking a big problem into smaller, named pieces. Understanding that functions let you build complex programs out of simple, reusable parts is the concept that scales — it is what lets programmers tackle problems far too large to hold in their head all at once, in any language they choose."),

  h2("Data types: different kinds of information"),
  p("Programs work with different kinds of information, and every language distinguishes between them — this is the idea of data types. Numbers, text, and true/false values are the basic kinds, and the distinction matters because the computer handles each differently. You can do arithmetic on numbers but not on text; you can join pieces of text together in ways that make no sense for numbers. Understanding that a value has a type, and that the type determines what you can do with it, prevents a whole category of beginner confusion."),
  p("This concept transfers across every language, even though the details vary. The classic beginner trap it explains is the difference between the number 5 and the text '5' — they look the same but behave completely differently, and mixing them up causes errors that baffle newcomers. Grasping that information comes in types, and that keeping track of what type you are working with is part of the job, is a fundamental idea that makes the behaviour of programs far more predictable. It is one of those foundations that seems minor but underlies a surprising amount of what confuses people early on."),

  h2("Errors are part of programming, not a sign of failure"),
  p("One mindset shift matters enormously for anyone learning to program: errors are completely normal, and they happen to everyone constantly, including professionals. Beginners often feel that an error message means they have failed or are not cut out for this, when in reality writing code and then fixing the errors is simply how programming works. Nobody writes flawless code the first time; the process is inherently iterative."),
  p("Error messages, far from being rebukes, are the computer trying to help you — telling you what went wrong and often where. Learning to read them calmly, rather than panicking, is one of the most valuable early skills, and it changes the whole experience of learning to code. The programmers who progress fastest are not the ones who make no mistakes; they are the ones who treat each error as useful information and fix it methodically. Reframing errors from failures into feedback is a small mental change that makes learning to program dramatically less discouraging and far more effective."),

  h2("Input and output: programs that interact"),
  p("Finally, a program that cannot communicate is not much use, so every language has ways to take in information (input) and give back results (output). This might be reading what a user types and printing a response, reading a file, or displaying something on screen. Input and output are how a program connects to the world outside itself."),
  p("The concept that transfers is that a program generally follows a shape: take in some input, process it using variables, decisions, loops and functions, and produce some output. This input-process-output pattern underlies an enormous range of programs, from a simple calculator to a complex application. Seeing programs through this lens — something comes in, work happens, something comes out — gives you a framework for understanding and structuring almost anything you build, regardless of the language you build it in."),

  h2("Where beginners actually go wrong learning to program"),
  mli(["Memorising one language's syntax without grasping the universal concepts underneath."]),
  mli(["Expecting the computer to infer intent, rather than following instructions literally."]),
  mli(["Not seeing problems in terms of variables, decisions, repetition and functions."]),
  mli(["Writing long straight-line code instead of organising it into functions."]),
  mli(["Getting lost in details before understanding the input-process-output shape."]),

  h2("How to learn programming the right way"),
  mli(["Focus on the concepts — variables, control flow, functions, I/O — not just syntax."]),
  mli(["Remember the computer is literal; every bug is a gap between what you said and meant."]),
  mli(["Frame problems as decisions and repetitions, the universal building blocks."]),
  mli(["Break programs into functions, each doing one clear job."]),
  mli(["Think in input-process-output as a structure for almost anything you build."]),

  h2("Learn to program, not just to memorise"),
  linked(["If you are drowning in syntax and the fundamentals are not clicking, you are not bad at this — you are missing the conceptual map that makes a language make sense, and it is exactly what good teaching provides. Our ", { text: "computer science tutoring in Burnaby and online", href: P }, " builds your understanding from the universal ideas up, so your first language comes easily and every language after it comes faster."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where you are getting stuck, and we will show you the concepts that turn confusion into clarity — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

/* ================= 2. COMPUTATIONAL THINKING ================= */
const thinking = [
  p("You can write code that runs, but faced with a real problem — one that is not a tutorial exercise — you freeze, unsure where even to begin. This is one of the most common and frustrating experiences in learning computer science, and it reveals something important: coding and problem-solving are different skills. Knowing a language is not the same as knowing how to think through a problem, and the second skill, computational thinking, is the one that actually matters."),
  p("Computational thinking is the structured approach to problem-solving that underlies all of computer science — and it applies far beyond coding. This guide covers its four pillars: breaking problems down, spotting patterns, focusing on what matters, and designing step-by-step solutions. Master these and you will know how to approach any problem, which is worth more than knowing any single language."),

  h2("Why thinking beats coding"),
  p("Here is the insight that reframes learning to program: the hard part is almost never writing the code. It is figuring out what code to write — understanding the problem, and designing an approach before you type a single line. Beginners who dive straight into coding without this thinking stage produce tangled, broken solutions, and then blame their knowledge of the language when the real gap is in their approach."),
  p("Computational thinking is the deliberate, learnable method for that crucial thinking stage. It is not mystical talent; it is a set of techniques that experienced programmers apply, often without naming them, to break down and solve problems systematically. The best part is that these techniques are general — they help with mathematics, planning, and everyday problem-solving, not just coding. Learning to think computationally is genuinely one of the most valuable skills a student can develop, and it is teachable in a way that raw 'being good at coding' is not."),

  h2("Decomposition: break the problem apart"),
  p("The first and most important pillar is decomposition — breaking a big, intimidating problem into smaller, manageable pieces. A problem that feels impossible as a whole becomes a series of solvable steps once you break it down. This is the single most powerful problem-solving technique in existence, and it applies far beyond computing."),
  p("Consider building something like a simple game. As one giant task it is overwhelming; decomposed, it becomes a set of smaller problems — display the screen, handle player input, move the character, check for collisions, keep score — each of which you can tackle on its own. The skill is learning to see the natural seams in a problem, the places where it divides into independent pieces. Beginners who cannot do this freeze in front of big problems; those who can approach anything, because they never actually face the whole thing at once. Practising decomposition deliberately is the highest-leverage thing you can do to become a better problem-solver."),
  linked(["If you can code but freeze when facing a real problem, decomposition is almost certainly the missing skill — and it is far easier to learn with a guide who can work through real problems with you than from a textbook. Our ", { text: "computer science tutoring", href: P }, " focuses on exactly this: how to break a problem down so you always know where to start."]),

  h2("Pattern recognition: you have seen this before"),
  p("The second pillar is pattern recognition — noticing similarities between problems, so that a problem you have never seen turns out to resemble one you have. Much of becoming a strong programmer is building a mental library of patterns and learning to recognise which one a new problem fits. Experienced developers rarely solve problems from scratch; they recognise a familiar shape and adapt a known approach."),
  p("This is why practice matters so much in learning to code: every problem you solve adds to your pattern library, making the next one easier. When you notice that sorting a list of names and sorting a list of numbers are really the same problem, or that many different tasks all involve searching through data, you are recognising patterns — and it lets you reuse solutions instead of reinventing them. Developing this ability is a gradual process that rewards exposure to many problems, which is exactly why working through varied problems with guidance accelerates it so effectively."),

  h2("Abstraction: focus on what matters"),
  p("The third pillar is abstraction — the skill of ignoring irrelevant detail to focus on what actually matters for the problem at hand. Real problems are cluttered with details, and abstraction is deciding which ones you can safely set aside. A map is a perfect example: it leaves out almost everything about the real world and keeps only what helps you navigate, which is exactly what makes it useful."),
  p("In programming, abstraction lets you manage complexity that would otherwise be overwhelming. You use a function without knowing exactly how it works inside; you think about 'a user' without tracking every detail of every person. Learning to abstract — to work at the right level of detail, hiding complexity you do not currently need — is what makes it possible to build large systems, because no one can hold every detail in mind at once. It is a subtle skill that distinguishes people who can build big things from those who drown in detail, and it is one that benefits greatly from being pointed out and practised."),

  h2("Algorithms: designing the steps"),
  p("The fourth pillar is algorithmic thinking — designing a clear, step-by-step procedure to solve a problem. An algorithm is just a precise recipe: a sequence of steps that, followed exactly, produces the desired result. Before writing any code, a good programmer works out the algorithm — the plan — because code is merely the translation of an algorithm into a language the computer understands."),
  p("This is why experienced programmers often plan on paper before typing, sketching the steps in plain language first. The thinking is in the algorithm; the coding is just expressing it. Beginners who skip this and try to think and type at once produce muddled solutions, while those who design the algorithm first write cleaner code faster. Understanding that the real work is designing the sequence of steps, and that coding comes after, is the habit that ties all of computational thinking together and turns problem-solving from guesswork into method."),

  h2("Evaluation: is your solution actually good?"),
  p("Solving a problem is not the end of computational thinking; a further skill is evaluation — judging whether your solution is actually good, and whether it could be better. A solution that works is not automatically the right one. Is it correct in all cases, including the awkward edge cases? Is it efficient enough? Is it clear enough that someone else, or you in a month, could understand it? Evaluation is the habit of asking these questions rather than stopping the moment something appears to work."),
  p("This matters because the first solution that comes to mind is often not the best one, and the discipline of stepping back to assess it separates thoughtful problem-solvers from those who grab the first thing that works. Evaluating a solution also means testing it deliberately, especially against the tricky inputs — the empty list, the zero, the unexpected — where naive solutions break. Learning to critically assess your own work, and to improve it rather than settling, is a mark of maturity in problem-solving that pays off in cleaner, more reliable results. It is also exactly the kind of judgement that develops fastest with feedback from someone experienced."),

  h2("Putting the pillars together"),
  p("The real power of computational thinking comes from using the pillars together, fluidly, on a single problem. Faced with something hard, you decompose it into parts, recognise which parts resemble problems you have solved before, abstract away the irrelevant details, design an algorithm for each piece, and evaluate the result — often looping back to refine your approach. It is not a rigid sequence but a toolkit you draw on as needed."),
  p("This integrated way of thinking is what experienced programmers and computer scientists do almost automatically, and it is why they can tackle problems that would overwhelm someone who only knows syntax. The encouraging truth is that every one of these skills improves with deliberate practice, especially when you practise them consciously rather than hoping they develop by accident. Working through varied problems while explicitly naming which pillar you are using is one of the fastest ways to build genuine problem-solving ability — and it is exactly the kind of guided practice that turns a frustrated coder into a confident one."),

  h2("Where students actually struggle with problem-solving"),
  mli(["Diving into code before understanding the problem or designing an approach."]),
  mli(["Freezing on big problems because they cannot decompose them into pieces."]),
  mli(["Solving everything from scratch instead of recognising familiar patterns."]),
  mli(["Drowning in irrelevant detail for lack of abstraction."]),
  mli(["Skipping the algorithm and trying to think and type simultaneously."]),

  h2("How to build computational thinking"),
  mli(["Always understand and plan before you code — the thinking is the hard part."]),
  mli(["Practise decomposition until breaking problems into pieces is automatic."]),
  mli(["Solve many varied problems to build your library of recognisable patterns."]),
  mli(["Work at the right level of abstraction, hiding detail you do not need."]),
  mli(["Design the algorithm in plain language first, then translate it to code."]),

  h2("Learn to think, not just to code"),
  linked(["If you know a language but freeze in front of real problems, computational thinking is the skill you are missing — and it is the one that unlocks everything else, because it applies to every problem in every language. Our ", { text: "computer science tutoring in Burnaby and online", href: P }, " works through real problems with you, building the decompose-recognise-abstract-design habit until approaching any problem feels natural."]),
  linked(["Start with a free, no-pressure conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring a problem that has stumped you, and we will show you how to approach it — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring is right for you."]),
];

/* ================= 3. DATA STRUCTURES & ALGORITHMS ================= */
const bigoSvg = `
<figure style="margin:2rem 0;">
  <svg viewBox="0 0 440 240" role="img" aria-label="A graph comparing how work grows with data size for different algorithm complexities. Constant time stays flat, logarithmic grows very slowly, linear grows steadily, and quadratic shoots upward steeply. This is why the difference between an efficient and an inefficient algorithm becomes enormous as data grows." style="width:100%;max-width:440px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
    <line x1="45" y1="200" x2="420" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="45" y1="30" x2="45" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
    <path d="M 45 190 L 420 178" fill="none" stroke="#94A3B8" stroke-width="2"/>
    <text x="360" y="172" font-size="11" fill="#64748B">O(1), O(log n)</text>
    <path d="M 45 195 L 420 60" fill="none" stroke="#3A5A98" stroke-width="2.5"/>
    <text x="370" y="55" font-size="11" fill="#3A5A98" font-weight="600">O(n)</text>
    <path d="M 45 200 Q 250 195 340 35" fill="none" stroke="#B45309" stroke-width="2.5"/>
    <text x="300" y="45" font-size="11" fill="#B45309" font-weight="600">O(n²)</text>
    <text x="230" y="223" font-size="11.5" fill="#64748B" text-anchor="middle">size of data →</text>
    <text x="30" y="115" font-size="11.5" fill="#64748B" text-anchor="middle" transform="rotate(-90 30 115)">work done →</text>
    <text x="232" y="20" font-size="12" fill="#1F2937" text-anchor="middle" font-weight="700">Why algorithm choice matters more as data grows</text>
  </svg>
  <figcaption style="text-align:center;font-size:14px;color:#64748B;margin-top:.75rem;">
    On a million items, an O(log n) search takes about 20 steps while an O(n²) approach takes a
    trillion. Choosing the right structure and algorithm is not a nicety — it is the difference between
    instant and unusable.
  </figcaption>
</figure>`;

const dsa = [
  p("Your code works on the small example, you are proud of it, and then it grinds to a halt the moment you give it real amounts of data — or a technical interview asks about 'Big-O' and 'hash maps' and you have no idea what they mean. Data structures and algorithms are the part of computer science that separates people who can make code work from people who can make it work well, and they are what technical interviews test above almost everything else. They have a fearsome reputation, but the core ideas are genuinely graspable."),
  p("Data structures are ways of organising data, and algorithms are step-by-step methods for solving problems with that data. This guide covers the essential structures, how to reason about efficiency with Big-O notation, and why choosing the right structure often matters more than any other decision you make, so this crucial and interview-critical topic finally makes sense."),

  h2("Why the same task can be fast or catastrophically slow"),
  p("The reason this topic matters comes down to one fact: how you organise and process data can make the difference between a program that responds instantly and one that takes hours, on the exact same task. A solution that is fine for a hundred items can become completely unusable at a million if you chose a poor structure or algorithm. This is not a small optimisation; it is often the difference between a working product and a broken one."),
  { _type: "htmlBlock", _key: key(), html: bigoSvg },
  p("This is why data structures and algorithms are so heavily emphasised in computer science education and in technical interviews. They are the tools for handling data at scale, and understanding them is what lets you write code that stays fast as it grows. The good news is that you do not need to memorise dozens of them; a handful of core structures and the ability to reason about efficiency cover the vast majority of what you will encounter, in study and in interviews alike."),

  h2("Big-O: measuring how work grows"),
  p("The key idea for reasoning about efficiency is Big-O notation, which sounds intimidating but expresses something simple: how does the amount of work grow as the amount of data grows? It ignores exact timings and focuses on the shape of the growth, because that is what determines whether something scales."),
  p("The common cases tell a clear story. O(1), constant time, means the work stays the same no matter how much data there is — the gold standard. O(log n), logarithmic, grows extremely slowly: on a million items it takes about twenty steps, and doubling the data adds just one step. O(n), linear, grows in step with the data. And O(n²), quadratic, grows catastrophically — on a million items it is a trillion operations. Understanding these categories lets you look at an approach and predict whether it will scale or collapse, which is exactly the reasoning interviews probe and real performance demands. You do not need heavy mathematics; you need to recognise which category an approach falls into."),

  h2("Arrays and hash maps: the everyday workhorses"),
  p("The two structures you will use most are worth understanding deeply. An array is an ordered list of items in a row, excellent when you want to keep things in order or access them by position — but finding a specific value means scanning through, which is slow on large data. A hash map (also called a dictionary or object) stores data as key-value pairs and can retrieve a value by its key almost instantly, in constant time, regardless of size."),
  code("// Finding 'ada' in an ARRAY: scan every item -- O(n)\n[\"bob\", \"cy\", \"ada\"].find(x => x === \"ada\");\n\n// Finding 'ada' in a HASH MAP: jump straight to it -- O(1)\nnew Map([[\"ada\", 95]]).get(\"ada\");   // instant"),
  p("That difference — scanning a list versus jumping straight to what you want — is enormous at scale, and choosing the hash map when you need fast lookups is one of the most impactful decisions a programmer makes. This is the recurring theme of the whole topic: the same data, stored two different ways, gives wildly different performance. Knowing that a hash map trades a little memory for near-instant lookup, and reaching for it when lookup speed matters, is a genuinely high-value habit that appears constantly in real code and interviews."),

  h2("Searching and sorting: the classic algorithms"),
  p("Certain algorithms appear everywhere and are worth understanding as examples of the principles. Binary search is the star: to find something in a sorted list, you repeatedly halve the search space, checking the middle and discarding the half that cannot contain your target. On a million items, this finds anything in about twenty steps instead of a million — an astonishing difference that comes purely from a smarter method."),
  p("Sorting shows the same lesson. A naive sort might compare every item with every other, taking on the order of n² operations — about five thousand comparisons for a hundred items, and a catastrophic trillion for a million. Efficient sorting algorithms bring that down to around n log n, which for a million items is a few tens of millions rather than a trillion. You do not need to memorise every algorithm, but understanding why binary search is so fast, and why an n log n sort crushes an n² one at scale, teaches you the reasoning that the whole field rests on and that interviews reliably test."),
  linked(["If Big-O, hash maps and algorithms feel abstract or interview-terrifying, they become concrete fast when someone works real examples with you and shows you the reasoning rather than the memorisation. Our ", { text: "computer science tutoring", href: P }, " demystifies data structures and algorithms and prepares you specifically for the technical interviews that test them."]),

  h2("Choosing the right structure for the job"),
  p("Beyond arrays and hash maps, a few specialised structures solve specific problems elegantly, and knowing they exist is half the battle. A stack handles things in last-in-first-out order, like a pile of plates, and is perfect for undo features or tracking nested operations. A queue handles them first-in-first-out, like a line of people, ideal for processing tasks in order. Trees organise data hierarchically and, when balanced, allow fast searching. Each exists because it makes certain operations efficient."),
  p("The real skill this topic builds is matching the structure to the problem — recognising that 'I need fast lookups by name' means a hash map, 'I need to process things in order' means a queue, 'I need to undo the last action' means a stack. This is a design decision that shapes everything downstream, and making it well is what separates elegant, efficient solutions from awkward, slow ones. Learning to ask 'what operations does this problem need to be fast, and which structure makes them fast?' is the practical heart of data structures, and it is exactly the judgement that experience and good guidance develop."),

  h2("Divide and conquer: the pattern behind the fast algorithms"),
  p("There is a beautiful idea running underneath many of the fastest algorithms, and recognising it makes them far less mysterious: divide and conquer. The strategy is to break a problem into smaller versions of itself, solve those, and combine the results — which is exactly why binary search and efficient sorting are so fast. Binary search halves the problem each step; efficient sorts split the data, sort the halves, and merge them back together."),
  p("This connects algorithms to the recursion idea, where a solution is defined in terms of smaller instances of the same problem. The reason divide-and-conquer approaches achieve that magical logarithmic or n-log-n performance is precisely that repeatedly halving a problem reaches the answer in remarkably few steps — twenty steps to search a million items, because you can only halve a million about twenty times. Understanding this single strategy illuminates a whole class of efficient algorithms at once, and it is one of the genuinely elegant ideas in computer science. Seeing that 'break it in half, solve each half, combine' is why these algorithms crush their naive alternatives is the kind of insight that makes the whole topic click rather than feeling like disconnected facts to memorise."),

  h2("Where students actually struggle with data structures and algorithms"),
  mli(["Ignoring efficiency until their code collapses on real amounts of data."]),
  mli(["Finding Big-O intimidating instead of a simple way to reason about growth."]),
  mli(["Scanning arrays for lookups where a hash map would be instant."]),
  mli(["Memorising algorithms instead of understanding why the fast ones are fast."]),
  mli(["Not matching the data structure to what the problem actually needs."]),

  h2("How to master data structures and algorithms"),
  mli(["Learn to reason in Big-O categories — is this constant, log, linear, or quadratic?"]),
  mli(["Understand arrays versus hash maps deeply; reach for hash maps when lookups matter."]),
  mli(["Study binary search and efficient sorting as lessons in why method matters."]),
  mli(["Learn what stacks, queues and trees are for, so you recognise when to use them."]),
  mli(["Always ask which operations must be fast, then choose the structure that makes them fast."]),

  h2("Master the interview-critical topic"),
  linked(["If data structures and algorithms feel like a wall between you and a computer science course or a technical interview, that wall is thinner than it looks — the core ideas are graspable, and the interview patterns are learnable. Our ", { text: "computer science tutoring in Burnaby and online", href: P }, " makes the concepts concrete with worked examples and prepares you directly for the interviews and exams that hinge on them."]),
  linked(["A free conversation is the easiest first step. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us whether you are preparing for a course or an interview, and we will show you how approachable this really is — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will tell you."]),
];

/* ================= 4. LOGIC BUILDING ================= */
const logic = [
  p("You understand the syntax, you know what loops and functions are, but when you sit down to actually solve a problem, your mind goes blank — you simply cannot see how to turn the problem into working code. This is one of the most disheartening experiences in learning to program, and it is incredibly common. The missing skill is logic building: the practical craft of constructing a working solution step by step, and it is entirely learnable."),
  p("Logic building is the bridge between knowing a language and being able to solve problems with it — the ability to take a problem and systematically build the logic that solves it. This guide covers the concrete techniques for doing that: planning before coding, working in small steps, tracing your logic, and debugging methodically, so you stop staring at a blank screen and start solving."),

  h2("Why knowing syntax is not enough"),
  p("The frustrating gap many learners hit is this: they finish a course, they can read and understand code, but faced with a blank editor and a problem to solve, they are stuck. This is because reading code and writing solutions are different skills, and most courses teach the first while assuming the second develops on its own. It often does not, which is why so many people who 'know how to code' still cannot build things."),
  p("Logic building is the deliberate practice of that second skill, and the encouraging news is that it is a craft with techniques, not a talent you either have or lack. The programmers who make it look easy are applying learnable methods for turning a fuzzy problem into precise, working logic. Once you learn these methods, the blank-screen paralysis lifts, and you gain the confidence that you can work your way to a solution even when you do not see the whole answer at once. That confidence, that you can always make progress, is what logic building really gives you."),

  h2("Plan before you type"),
  p("The most important habit in logic building is to resist the urge to start coding immediately. Before writing any code, work out your approach in plain language — often called pseudocode. Describe the steps you will take to solve the problem, in ordinary words, without worrying about syntax. This separates the thinking from the typing, so you can get the logic right before wrestling with a language's rules."),
  code("# Pseudocode -- the PLAN, before any real code:\n# 1. get the list of numbers\n# 2. set a running total to 0\n# 3. for each number, add it to the total\n# 4. after the loop, the total is the answer"),
  p("Writing out the steps first feels slow, but it is dramatically faster overall, because you catch flaws in your thinking before they become tangled code. It also breaks the paralysis: even if you cannot see the whole solution, you can usually write down the first step, then the next, building the plan piece by piece. This is where decomposition meets the keyboard — turning a problem into a numbered list of steps you can then translate one at a time. Learning to plan in plain language first is the single habit that most reliably cures blank-screen paralysis."),

  h2("Build in small, tested steps"),
  p("The second technique is to build your solution incrementally rather than trying to write it all at once. Write a small piece, run it, confirm it works, then add the next piece. This keeps you always standing on solid ground, and it means that when something breaks, you know it was the small thing you just added — not somewhere in a hundred lines you wrote blind."),
  p("Beginners often write a large amount of code and then run it for the first time, only to face a cascade of errors with no idea which part is at fault. Building in small, verified steps avoids this entirely and keeps progress steady and motivating. It also embodies a professional mindset: real developers work in small increments, checking constantly, because it is far easier to keep something working than to fix something thoroughly broken. Adopting this rhythm early makes coding less stressful and far more productive, and it is one of the clearest markers of a developing programmer."),

  h2("Trace your logic like the computer would"),
  p("A powerful and underused technique is tracing — stepping through your logic by hand, exactly as the computer would, keeping track of what each variable holds at each step. When your code does not work and you cannot see why, tracing through it with a specific example almost always reveals where reality diverges from your intention."),
  p("This skill is invaluable both for finding bugs and for building logic in the first place. By mentally running through your plan with a real example, you catch errors in your thinking before you even write the code. Beginners often stare at broken code hoping the problem will reveal itself; experienced programmers trace through it methodically, watching the values change, until they find the exact step that goes wrong. Learning to trace — to become the computer for a moment and follow your own instructions literally — is one of the most practical debugging and logic-building skills there is, and it demystifies code that otherwise seems to fail for no reason."),
  linked(["If you know the language but freeze when it is time to actually build a solution, logic building is the missing skill — and it is far faster to develop by working through real problems with someone than by struggling alone. Our ", { text: "computer science tutoring", href: P }, " focuses specifically on this: the techniques that turn a blank screen into a working solution, practised on real problems."]),

  h2("Debug methodically, not by guessing"),
  p("Every programmer's code has bugs; the difference between beginners and experienced developers is how they find them. Beginners tend to change things randomly and hope, which usually makes things worse. The skilled approach is methodical: figure out what the code actually does versus what you expected, narrow down where they diverge, form a specific guess about the cause, and test it."),
  p("Debugging is really detective work, and it draws on tracing, on understanding that the computer is literal, and on breaking the problem down to isolate the fault. Printing out values to see what is really happening, testing small pieces in isolation, and changing one thing at a time are the core methods. Learning to debug systematically rather than by frantic trial and error is a skill that pays off every single day of programming, and it transforms bugs from panic-inducing mysteries into solvable puzzles. It is also deeply reassuring, because it means you are never truly stuck — there is always a next methodical step to take."),

  h2("What to do when you are genuinely stuck"),
  p("Even with good habits, every programmer hits moments of being truly stuck, and how you handle them is itself a logic-building skill worth developing. The worst response is to keep staring, growing more frustrated. Better moves are concrete: simplify the problem to an easier version you can solve, then build back up; solve a small specific example by hand to understand what the solution should even look like; or explain the problem out loud, step by step, as if to another person."),
  p("That last technique is so effective it has a name — rubber-duck debugging — because explaining your logic aloud, even to an inanimate object, forces you to articulate your assumptions, and the flaw often reveals itself mid-sentence. Taking a genuine break helps too, because the mind keeps working in the background and solutions frequently arrive after you step away. The key realisation is that being stuck is not a dead end but a normal state with reliable ways out, and knowing those techniques means you never stay stuck for long. This resilience — always having a next thing to try — is one of the most valuable and confidence-building things logic building provides, and it is exactly what turns a frustrating hobby into a rewarding one."),

  h2("Where students actually struggle with logic building"),
  mli(["Freezing at a blank screen because they jump straight to code without a plan."]),
  mli(["Writing lots of code before running any of it, then drowning in errors."]),
  mli(["Staring at broken code instead of tracing through it with a real example."]),
  mli(["Debugging by random changes and hope rather than methodical investigation."]),
  mli(["Believing logic building is innate talent rather than a learnable craft."]),

  h2("How to build your logic-building skill"),
  mli(["Plan in plain-language pseudocode before writing any real code."]),
  mli(["Build in small steps, running and checking each before adding the next."]),
  mli(["Trace your logic by hand with a real example to find where it goes wrong."]),
  mli(["Debug methodically: what happened, where it diverged, one change at a time."]),
  mli(["Treat logic building as a craft to practise, not a talent you lack."]),

  h2("Turn a blank screen into a solution"),
  linked(["If you know a language but cannot build with it, you are not missing talent — you are missing the concrete techniques of logic building, and they are exactly what a good tutor can hand you. Our ", { text: "computer science tutoring in Burnaby and online", href: P }, " works through real problems with you, building the plan-first, small-steps, trace-and-debug habits until solving problems feels natural rather than paralysing."]),
  linked(["See how quickly it changes, for free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring a problem you could not solve, and we will show you the method for working through it — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring is right for you."]),
];

await applyPost({ slug: "computer-science-programming-basics", was: 406, body: basics, siblingSlugs: SIBS.filter((s) => s !== "computer-science-programming-basics") });
await applyPost({ slug: "computer-science-computational-thinking", was: 401, body: thinking, siblingSlugs: SIBS.filter((s) => s !== "computer-science-computational-thinking") });
await applyPost({ slug: "computer-science-data-structures-algorithms", was: 417, body: dsa, siblingSlugs: SIBS.filter((s) => s !== "computer-science-data-structures-algorithms") });
await applyPost({ slug: "computer-science-logic-building", was: 390, body: logic, siblingSlugs: SIBS.filter((s) => s !== "computer-science-logic-building") });
