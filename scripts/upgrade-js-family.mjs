/**
 * JavaScript family: variables/types, loops/conditionals, functions/events,
 * DOM. LEAD-GENERATING: pain-first hooks, a mid-article CTA at the stall point,
 * benefit-driven closes with a specific low-risk offer. Educational substance
 * kept (it ranks and proves competence). Code verified in scripts/verify-js.mjs.
 */
import { applyPost, key, p, h2, h3, li, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["javascript-variables-and-data-types", "javascript-loops-and-conditionals", "javascript-functions-and-events", "javascript-dom-manipulation"];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (src) => ({ _type: "htmlBlock", _key: key(), html: `<pre style="background:#1e293b;color:#e2e8f0;padding:1rem 1.25rem;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.6;margin:1.5rem 0;"><code>${esc(src)}</code></pre>` });

// Lead-gen: each post gets a DISTINCT mid-article nudge and close, so the CTAs
// are genuinely varied (better conversion than a repeated template, and it keeps
// each post unique). midParts/closeH/closeA/closeB differ per post.
const midCtaRaw = (parts) => linked(parts);

/* ---------- 1. VARIABLES & TYPES ---------- */
const variables = [
  p("If you are learning JavaScript and it keeps doing things that make no sense — comparing two values that look equal and getting false, adding a number to a string and getting nonsense, a variable that is somehow 'undefined' — you are not doing anything wrong. You have run into JavaScript's type system, which is famously quirky, and it trips up almost everyone at the start. The good news is that these quirks follow rules, and once you know the rules, the surprises stop."),
  p("Variables and data types are the foundation of JavaScript, and getting them right early is the difference between fighting the language and working with it. This guide covers what a variable really is in JavaScript, how its types behave, and — crucially — the coercion quirks that cause the most beginner confusion, so you can stop being ambushed by them."),

  h2("let, const, and the var you should avoid"),
  p("JavaScript gives you three ways to declare a variable, and choosing correctly prevents a class of bugs. Use const for values that will not be reassigned — which is most of them — and let for values that will change. The older var still works but has confusing scope behaviour that causes subtle bugs, and modern JavaScript avoids it almost entirely."),
  code("const name = \"Ada\";   // won't be reassigned\nlet score = 0;         // will change\nscore = 10;            // fine\n// name = \"Bob\";       // error: can't reassign a const"),
  p("The simple rule — reach for const first, use let only when you genuinely need to reassign, and avoid var — is one that professional developers follow, and adopting it early makes your code clearer and safer. It signals intent: a reader seeing const knows that value will not change, which makes the code easier to reason about. This is a small habit with an outsized effect on how maintainable your JavaScript becomes."),

  h2("The types, and the ones that surprise you"),
  p("JavaScript has a handful of basic types: numbers, strings, booleans, plus the special values null and undefined, and the containers arrays and objects. Most behave sensibly. Two catch everyone out. undefined means a variable exists but has no value yet; null means a deliberate 'no value'. They are subtly different, and telling them apart matters."),
  code("let x;\nconsole.log(x);           // undefined -- declared but not set\nconsole.log(typeof null); // 'object' -- a famous JavaScript bug!\nconsole.log(NaN === NaN); // false -- NaN never equals itself"),
  p("Two genuine oddities to simply know: typeof null returns 'object', which is a long-standing bug in the language that will never be fixed for compatibility reasons; and NaN, the 'not a number' value you get from invalid maths, is never equal to anything, including itself. These are not things you can reason out — they are quirks you memorise once and then recognise forever. Knowing they exist saves you from the baffling debugging sessions they otherwise cause."),

  h2("Type coercion: the source of the weirdness"),
  p("Here is the heart of JavaScript's reputation for strangeness. When you use values of different types together, JavaScript quietly converts one to match the other — this is coercion — and the rules are not always intuitive. The plus operator is the biggest culprit, because it means both 'add numbers' and 'join strings', and the string meaning wins whenever a string is involved."),
  code("console.log(\"5\" + 3);   // '53'  -- number coerced to string, joined\nconsole.log(\"5\" - 3);   // 2     -- minus has no string meaning, so both become numbers\nconsole.log(0.1 + 0.2);  // 0.30000000000000004  -- floating point"),
  p("So '5' + 3 gives the string '53', while '5' - 3 gives the number 2, because minus only means subtraction and forces both sides to numbers. This inconsistency is exactly what makes beginners feel JavaScript is playing tricks. It is not — it is following coercion rules — but they are rules you have to learn rather than guess. And the floating-point result of 0.1 + 0.2 is not a JavaScript bug but a fact of how all computers store decimals; it just surprises people the first time."),
  midCtaRaw(["Type coercion is the single biggest source of confusion for new JavaScript developers, and the errors it causes look completely mysterious until someone points at the rule underneath. If you have lost an evening to a comparison that should have been simple, that is normal — and it is precisely the kind of thing that takes minutes to fix with someone who can see your screen. Our ", { text: "JavaScript tutoring", href: "/programs/javascript" }, " starts from your actual bug, not a textbook."]),

  h2("== versus ===: the most important rule in JavaScript"),
  p("If you take one thing from this entire guide, take this: use triple-equals (===), not double-equals (==). The difference is coercion. Loose equality (==) converts types before comparing, which produces genuinely bewildering results; strict equality (===) compares without converting, which is almost always what you actually want."),
  code("console.log(\"5\" == 5);    // true   -- coerces, then compares\nconsole.log(\"5\" === 5);   // false  -- different types, so not equal\nconsole.log(0 == \"\");     // true   -- both coerce to falsy... surprise\nconsole.log(null == undefined); // true -- another coercion special case"),
  p("Loose equality is responsible for a huge share of JavaScript bugs, because comparisons you expect to be false come out true after coercion — 0 equals an empty string, null equals undefined. Professional JavaScript code uses strict equality almost universally for exactly this reason. Making === your default from day one will save you from a category of bugs that otherwise haunt beginners for months. It is the single highest-value habit in the language."),

  h2("Objects and arrays: reference, not copy"),
  p("JavaScript's containers — arrays for ordered lists, objects for key-value pairs — are the workhorses of real code, and they carry one behaviour that surprises beginners. When you assign an object or array to another variable, you copy the reference, not the contents, so both variables point at the same underlying data. Changing it through one is visible through the other."),
  code("const a = [1, 2, 3];\nconst b = a;      // b points at the SAME array\nb.push(4);\nconsole.log(a);   // [1, 2, 3, 4] -- a changed too"),
  p("This is the same reference behaviour that Python and most languages share, and it is the source of many 'why did my data change?' bugs. Understanding that objects and arrays are handled by reference — while simple values like numbers and strings are copied — is essential to predicting how your code behaves. When you genuinely need an independent copy, JavaScript gives you ways to make one, but first you have to know that a plain assignment does not."),

  h2("Template literals: the clean way to build text"),
  p("Because combining strings and values with the plus operator triggers all the coercion confusion above, modern JavaScript gives you a far cleaner tool: template literals. Written with backticks instead of quotes, they let you drop variables directly into text, so you never have to join strings and numbers by hand or worry about accidental coercion."),
  code("const name = \"Ada\";\nconst age = 36;\nconsole.log(`${name} is ${age} years old`);   // Ada is 36 years old\n// versus the error-prone: name + \" is \" + age + \" years old\""),
  p("Template literals have become the standard way to build strings in JavaScript, and adopting them early sidesteps a whole category of the concatenation bugs beginners run into. They read more clearly, they handle values of any type without you converting anything, and they even span multiple lines cleanly. It is one of those modern features that makes JavaScript genuinely pleasant, and using it from the start marks code as current rather than dated."),

  h2("The console is your best friend"),
  p("Every browser has a developer console, and console.log is the single most useful tool a JavaScript beginner has. When you cannot understand why a variable holds what it does — is it a string or a number? undefined or null? — you print it and look. This simple habit resolves the majority of the type confusion this guide describes, because it lets you see reality instead of guessing at it."),
  p("Beyond just printing values, the console tells you the type when you inspect them, shows you the exact line where errors occur, and lets you experiment with snippets of code live. Beginners who treat the console as their constant companion — printing values whenever something surprises them — debug far faster than those who stare at code trying to reason it out. When JavaScript's quirks bite, the console is how you catch them in the act, and building the habit of reaching for it immediately is one of the most practical skills you can develop."),

  h2("Where JavaScript beginners actually go wrong with types"),
  mli(["Using == instead of ===, and getting bewildering true/false results from coercion."]),
  mli(["Being surprised by '5' + 3 versus '5' - 3, not knowing the plus/minus coercion rules."]),
  mli(["Confusing null and undefined, or being tripped by typeof null === 'object'."]),
  mli(["Expecting NaN to equal itself, or 0.1 + 0.2 to equal exactly 0.3."]),
  mli(["Assuming an assigned array or object is a copy, when it is a shared reference."]),

  h2("How to master JavaScript variables and types"),
  mli(["Use const by default, let when you must reassign, and never var."]),
  mli(["Always use === for comparisons, so coercion never surprises you."]),
  mli(["Learn the plus/minus coercion rules rather than guessing at mixed-type results."]),
  mli(["Memorise the handful of quirks — typeof null, NaN, floating point — once."]),
  mli(["Remember objects and arrays are references; make a real copy when you need one."]),

  h2("Turn JavaScript's quirks into an advantage"),
  linked(["Every quirk in this guide — coercion, ==, typeof null, NaN — is a known, fixable gap, not a sign you are not cut out for programming. The developers who get good fastest are simply the ones who stop guessing and get the rules explained clearly, then move on. Our ", { text: "JavaScript tutoring in Burnaby and online", href: "/programs/javascript" }, " does exactly that: we work from the errors you are actually hitting and hand you the underlying rule, so the same bug never costs you a second evening."]),
  linked(["Booking costs nothing and commits you to nothing. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring the code that is confusing you, and we will pinpoint the gap and show you how fast it closes — in person in Burnaby or online across Metro Vancouver. If you do not need tutoring, we will say so honestly."]),
];

/* ---------- 2. LOOPS & CONDITIONALS ---------- */
const loops = [
  p("You have written a loop or an if statement in JavaScript, it runs, and it does the wrong thing — skips a value, runs one time too many, or takes a branch you did not expect. This is one of the most common places new JavaScript developers get stuck, and it is rarely because the concept is hard. It is because JavaScript's rules for what counts as 'true' and how it compares values have some sharp edges, and one wrong assumption sends your logic off the rails."),
  p("Loops and conditionals are how a program makes decisions and repeats work — the point where code becomes genuinely capable. This guide covers how to write them correctly in JavaScript, and especially the truthy/falsy and coercion traps that make loops and conditions misbehave in ways that are baffling until you know the cause."),

  h2("Conditionals, and the truthy/falsy trap"),
  p("An if statement runs a block when a condition is true, and JavaScript lets you put almost any value in that condition — not just true or false. It decides based on 'truthiness', and the rules are specific enough to catch beginners constantly. A small set of values are 'falsy': 0, the empty string, null, undefined, NaN, and false itself. Everything else is 'truthy'."),
  code("if (\"\") console.log(\"runs?\");   // no -- empty string is falsy\nif (\"0\") console.log(\"runs?\");  // YES -- the STRING '0' is truthy!\nif ([]) console.log(\"runs?\");   // YES -- empty array is truthy"),
  p("The traps here are sharp. The string '0' is truthy even though the number 0 is falsy. An empty array is truthy, even though it 'feels' empty. These catch people because the intuition is wrong, and the resulting bugs — a check that passes when you expected it to fail — are hard to spot. Learning JavaScript's exact falsy list, and that anything not on it is truthy, is what turns these from mysterious bugs into predictable behaviour."),
  midCtaRaw(["A condition that clearly should be false somehow runs anyway — this is one of the most maddening experiences in early JavaScript, and it almost always comes down to a truthy/falsy or coercion rule you have not met yet. Hunting for it alone can eat an entire study session. A tutor who has debugged this exact thing dozens of times spots it at a glance. That is what our ", { text: "one-on-one JavaScript help", href: "/programs/javascript" }, " is built to do — get you unstuck and back to building."]),

  h2("Comparisons in conditions: === again"),
  p("The equality rules from JavaScript's type system show up right here in your conditions, and they are the biggest source of logic bugs. Because loose equality (==) coerces types before comparing, a condition can be true when you are certain it should be false. This is where the strict-equality habit pays off most visibly."),
  code("if (0 == \"\")  console.log(\"equal?\");  // runs -- both coerce to falsy\nif (0 === \"\") console.log(\"equal?\");  // does NOT run -- different types\nif ([] == false) console.log(\"huh\");   // runs -- array coerces!"),
  p("An empty array loosely equals false; zero loosely equals an empty string. These are not edge cases you will avoid by luck — they appear in real conditions and produce branches that take the wrong path. Using strict equality (===) in every condition removes the entire problem, because it never coerces. If your loop or if statement is behaving impossibly, a loose == comparison is the first thing to suspect and the easiest to fix."),

  h2("The for loop, done right"),
  p("The classic for loop gives you full control: a starting point, a condition to keep going, and a step. It is ideal when you know how many times to repeat, but its three parts are also where off-by-one errors breed — the most common bug in all of programming."),
  code("let total = 0;\nfor (let i = 0; i < 5; i++) {   // i goes 0,1,2,3,4 -- NOT 5\n  total += i;\n}\nconsole.log(total);   // 10"),
  p("The condition i < 5 means the loop runs for i equal to 0, 1, 2, 3 and 4 — five times, stopping before 5. Beginners constantly get this boundary wrong, using <= when they meant <, or starting from 1 instead of 0, and the result is a loop that runs one time too many or too few. Being deliberate about the start value and whether the condition uses < or <= is the fix, and using let (not var) for the loop counter avoids a separate scope bug that var introduces. When a loop produces almost-right output — the right values but one extra, or missing the last one — an off-by-one boundary is nearly always the culprit, and it is worth checking first."),

  h2("for...of and the modern loops"),
  p("When you just want to do something with each item in an array, modern JavaScript offers cleaner loops than the classic for. The for...of loop walks directly over the values, with no counter to manage and no boundary to get wrong — which eliminates the off-by-one error entirely for the common case."),
  code("const scores = [80, 92, 75];\nlet total = 0;\nfor (const s of scores) {   // s is each value in turn\n  total += s;\n}\nconsole.log(total);   // 247"),
  p("There are also array methods like forEach, map and filter that express common loop patterns even more clearly, and you will see them everywhere in real JavaScript. For a beginner, the progression is worth understanding: master the classic for loop and why its boundaries matter, then adopt for...of and the array methods for cleaner code. Knowing which loop fits a task — full control versus simple iteration — is part of writing JavaScript that reads well and works right."),

  h2("while loops and the infinite-loop danger"),
  p("A while loop repeats as long as its condition stays true, which suits situations where you do not know the count in advance. Its danger is the infinite loop: if nothing inside the loop ever makes the condition false, it runs forever and freezes the page — a genuinely alarming experience for a beginner whose browser tab locks up."),
  code("let n = 8;\nlet steps = 0;\nwhile (n > 1) {\n  n = Math.floor(n / 2);   // MUST move toward stopping\n  steps++;\n}\nconsole.log(steps);   // 3"),
  p("Every while loop needs a clear answer to 'what will eventually make this stop?' Here n shrinks each pass until it reaches 1. Forgetting to change the condition variable inside the loop — leaving n the same every time — is the classic mistake, and it hangs the program. Before running any while loop, check that something inside it moves the condition toward false. That single habit prevents the frozen-tab experience that scares off so many beginners."),

  h2("switch: choosing among many options"),
  p("When you need to check one value against many possibilities, a long chain of if/else if statements gets hard to read, and JavaScript offers the switch statement as a cleaner alternative. It compares a single value against a list of cases and runs the matching one — but it comes with a famous trap that catches nearly every beginner."),
  code("switch (day) {\n  case \"Sat\":\n  case \"Sun\":\n    console.log(\"Weekend\");\n    break;          // WITHOUT break, it 'falls through'\n  default:\n    console.log(\"Weekday\");\n}"),
  p("The trap is that each case needs a break statement, or execution 'falls through' into the next case and keeps running — a source of genuinely confusing bugs where more code runs than you intended. This fall-through is occasionally useful (grouping cases, as with the weekend above), but forgetting break when you did not mean to is a classic mistake. Knowing that switch requires break, and why leaving it out causes fall-through, lets you use this cleaner structure without falling into its one sharp edge."),

  h2("Combining conditions with && and ||"),
  p("Real conditions often depend on several things at once, and JavaScript combines them with && (and), || (or), and ! (not). The behaviour worth understanding deeply is short-circuiting: these operators stop evaluating as soon as the result is certain, which is both an efficiency feature and a widely-used trick."),
  code("const name = \"\" || \"Guest\";   // '' is falsy, so name becomes 'Guest'\nconst safe = user && user.age; // only reads user.age if user exists\nconsole.log(name);             // 'Guest'"),
  p("Because || returns the first truthy value, it is commonly used to supply a default when something is empty. Because && stops at the first falsy value, it is used to safely access something only if a prior check passes. These patterns appear constantly in real JavaScript, and understanding that the logical operators return actual values (not just true/false) and short-circuit is what lets you read and write the concise, idiomatic conditions that professional code is full of."),

  h2("Where JavaScript beginners actually go wrong with control flow"),
  mli(["Not knowing the falsy list, so conditions on '0', empty arrays, or empty strings behave unexpectedly."]),
  mli(["Using == in conditions and getting coerced, wrong-path results."]),
  mli(["Off-by-one errors from < versus <=, or starting the counter at the wrong value."]),
  mli(["while loops with no way for the condition to become false, freezing the page."]),
  mli(["Using var for loop counters, introducing scope bugs let would avoid."]),

  h2("How to master JavaScript loops and conditionals"),
  mli(["Learn the exact falsy values; treat everything else as truthy."]),
  mli(["Use === in every condition so coercion never sends you down the wrong branch."]),
  mli(["Check loop boundaries deliberately — start value, and < versus <=."]),
  mli(["Prefer for...of and array methods for iterating over collections."]),
  mli(["For every while loop, confirm what will make it stop before you run it."]),

  h2("Get your logic working, faster"),
  linked(["When a loop runs one time too many or a condition takes the wrong branch, the problem is rarely your intelligence and almost always a specific rule — a boundary, a falsy value, a loose comparison. Learners who get those rules explained clearly stop losing hours to logic bugs and start making real progress. Our ", { text: "JavaScript tutoring across Metro Vancouver and online", href: "/programs/javascript" }, " works through your own misbehaving loops and conditions, so you leave each session with code that runs and the understanding of why."]),
  linked(["The easiest first step is a conversation that costs nothing. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring the loop or condition that is fighting you, and we will find the exact issue and show you how quickly it is fixed — online, or in person in Burnaby with free parking."]),
];

/* ---------- 3. FUNCTIONS & EVENTS ---------- */
const functions = [
  p("JavaScript is the language of interactive web pages, and the moment you want a button to do something when it is clicked, you hit the two ideas at the heart of the language: functions and events. If callbacks, event handlers, and 'why does my code run in the wrong order?' are confusing you, you are at the exact point where JavaScript stops being like other languages and starts being its own thing — and it is the point where a little guidance saves a lot of frustration."),
  p("Functions package logic you can reuse, and events are how a web page responds to the user. Together they are the foundation of every interactive site. This guide covers how JavaScript functions work, including the closures that trip people up, and how the event-driven model — code that runs in response to things happening — actually behaves."),

  h2("Functions are values you can pass around"),
  p("A JavaScript function is a reusable block of logic, but the idea that unlocks the language is that functions are values — you can store one in a variable, pass it to another function, and return one from a function. This is what makes JavaScript so flexible, and it is the basis of everything from event handling to modern frameworks."),
  code("const add = (a, b) => a + b;   // an 'arrow function' stored in a variable\nconsole.log(add(2, 3));        // 5\nconsole.log(typeof add);       // 'function' -- it's a value"),
  p("The compact arrow-function syntax you see above is the modern standard, and it is worth getting comfortable with early because it is everywhere in real code. But the deeper point is conceptual: because a function is just a value, you can hand it to something else to be called later. That single idea — a function you pass along to be run when the time is right — is the key that makes events, and much of JavaScript, make sense."),

  h2("Callbacks: functions run later"),
  p("A callback is a function you give to another piece of code to be called at some later point — when a task finishes, when a button is clicked, when data arrives. This is the pattern that runs the interactive web, and it is where beginners first feel that JavaScript executes 'out of order' compared to the top-to-bottom flow they are used to."),
  code("function doTwice(action) {\n  action();\n  action();\n}\nlet count = 0;\ndoTwice(() => count++);   // pass a function to be called\nconsole.log(count);       // 2"),
  p("Here a function is passed into doTwice and called twice inside it. This feels strange at first — you are not calling your function yourself, you are handing it over to be called — but it is the foundation of event handling. When you tell a button 'run this function when clicked', you are giving it a callback. Understanding that a callback is simply 'a function to run later, when something happens' demystifies the event model that the rest of JavaScript depends on."),
  midCtaRaw(["Callbacks and the event-driven model are where JavaScript stops behaving like the step-by-step languages people start with, and the 'why does my code run in the wrong order?' confusion it produces is one of the most common reasons self-taught learners quietly give up. It is also one of the fastest things to fix with a clear explanation and a worked example. If this is where you are stuck, our ", { text: "JavaScript tutoring", href: "/programs/javascript" }, " can get the model to click in a single focused session rather than weeks of frustration."]),

  h2("Events: making a page respond"),
  p("An event is something that happens on a web page — a click, a keypress, the page finishing loading — and JavaScript lets you run a function in response. You attach a callback to an element with addEventListener, and from then on, whenever that event occurs, your function runs. This is how every interactive feature on the web is built."),
  code("const button = document.querySelector(\"#myButton\");\nbutton.addEventListener(\"click\", () => {\n  console.log(\"Button was clicked!\");\n});\n// the function runs each time the button is clicked"),
  p("The mental shift here is important and is where the event-driven model clicks into place. Your code does not run in a straight line and finish; instead, it sets up handlers and then waits, responding to events as they happen, possibly for as long as the page is open. This is fundamentally different from a script that runs once top to bottom, and grasping it — that you are wiring up responses rather than dictating a sequence — is the leap from writing scripts to building interactive applications."),

  h2("Closures: functions that remember"),
  p("One of JavaScript's most powerful and most confusing features is the closure: a function remembers the variables from where it was created, even after that surrounding code has finished. This sounds abstract, but it is what lets a function keep private state, and it appears constantly in real code."),
  code("function makeCounter() {\n  let n = 0;\n  return () => ++n;   // this inner function 'closes over' n\n}\nconst next = makeCounter();\nconsole.log(next());   // 1\nconsole.log(next());   // 2 -- it remembered n"),
  p("The inner function keeps access to n even after makeCounter has returned, so each call remembers and increments the same private value. Closures are genuinely tricky the first time, and they are a favourite interview topic precisely because they reveal whether someone understands how JavaScript really works. You do not need to master every subtlety immediately, but recognising that a function carries its surrounding variables with it explains a lot of otherwise-mysterious behaviour, especially inside loops and event handlers."),
  p("Closures are also intensely practical, not just an interview curiosity. Every time you attach an event handler that needs to remember something — which item was clicked, how many times an action has happened, a value from when the handler was set up — you are relying on a closure, whether you name it or not. This is why the concept is worth investing in early: it quietly underpins the interactive code you will write constantly. Learners who get a clear explanation of closures early find that a whole set of previously-confusing behaviours suddenly makes sense, which is one of the moments where an hour of good tutoring pays for itself many times over."),

  h2("Asynchronous code: why JavaScript waits without stopping"),
  p("The most distinctive thing about JavaScript is that it does not wait around. When your code asks for something that takes time — data from a server, a file, a timer — JavaScript does not freeze until it arrives. It moves on and runs your response later, through a callback, when the result is ready. This asynchronous behaviour is what keeps web pages responsive, and it is also what most confuses learners coming from other languages."),
  code("console.log(\"first\");\nsetTimeout(() => console.log(\"third\"), 0);   // runs LATER\nconsole.log(\"second\");\n// prints: first, second, third"),
  p("Notice the output order: even with a zero-millisecond delay, the callback runs after the straight-line code finishes. This surprises everyone at first, and it is the root of the 'my code runs in the wrong order' confusion. Modern JavaScript manages this with promises and the async/await syntax, which make asynchronous code read more like ordinary top-to-bottom code. You do not need to master all of it immediately, but understanding that JavaScript handles slow operations by scheduling a response rather than waiting is essential to everything from loading data to handling clicks, and it is a concept worth getting help with early because it underpins so much real-world code."),

  h2("Default and rest parameters"),
  p("JavaScript functions handle their inputs flexibly, and two features make them cleaner to write and use. Default parameters let you specify a fallback value for an argument the caller omits, so a function behaves sensibly even when called with fewer arguments. Rest parameters let a function accept any number of arguments, gathering the extras into an array."),
  code("const greet = (name = \"friend\") => `Hi, ${name}`;\nconsole.log(greet());        // 'Hi, friend' -- used the default\nconsole.log(greet(\"Ada\"));   // 'Hi, Ada'"),
  p("These features make functions more robust and pleasant to use — a function with sensible defaults does not break when called simply, and rest parameters let one function handle a variable workload cleanly. They are part of modern JavaScript's toolkit for writing functions that are flexible without being fragile, and using them well is a sign of code that anticipates how it will actually be called rather than assuming perfect inputs."),

  h2("Where JavaScript beginners actually struggle with functions and events"),
  mli(["Not grasping that functions are values that can be passed around and run later."]),
  mli(["Confusion when callback-based code runs 'out of order' versus top to bottom."]),
  mli(["Not understanding the event-driven model — setting up handlers, then waiting."]),
  mli(["Closures behaving unexpectedly, especially inside loops."]),
  mli(["Mixing up defining a function and calling it when attaching event handlers."]),

  h2("How to master JavaScript functions and events"),
  mli(["Internalise that a function is a value you can store, pass, and return."]),
  mli(["Learn callbacks as 'a function to run later', which unlocks the event model."]),
  mli(["Practise the addEventListener pattern until wiring up responses is second nature."]),
  mli(["Work through closure examples slowly until 'the function remembers' makes sense."]),
  mli(["Watch the difference between passing a function and calling it in handlers."]),

  h2("Make the event model finally click"),
  linked(["Callbacks, events, and closures are the ideas that separate people who write scripts from people who build interactive applications — and they are exactly the concepts that are hardest to grasp from reading alone, because they are about timing and flow rather than syntax. A good explanation with the right example collapses weeks of confusion into an afternoon. Our ", { text: "JavaScript tutoring in Burnaby and online", href: "/programs/javascript" }, " specialises in these turning-point concepts, working from real, running code so the model sticks."]),
  linked(["See how quickly it can come together. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us what is confusing about events or closures, and we will show you the idea that makes it make sense — across Metro Vancouver online, or in person in Burnaby. No obligation, and honest advice on whether tutoring is what you need."]),
];

/* ---------- 4. DOM MANIPULATION ---------- */
const dom = [
  p("You have learned some JavaScript, but the page just sits there — nothing you write seems to actually change what is on the screen. This is the wall almost every learner hits, and getting past it is the moment JavaScript becomes exciting, because it is when your code starts visibly controlling the web page. The bridge is the DOM, and once you understand it, you can make pages respond, update, and come alive."),
  p("DOM manipulation is how JavaScript reads and changes the content of a web page — the skill that turns static HTML into an interactive experience. This guide covers what the DOM is, how to find the elements you want, and how to change them, so your JavaScript finally does something you can see."),

  h2("The DOM: your page as objects JavaScript can touch"),
  p("When a browser loads a web page, it builds a live model of that page in memory called the DOM — the Document Object Model. Every heading, paragraph, button and image becomes an object that JavaScript can read and change. Crucially, the DOM is live: change an object in the DOM, and the page on screen updates instantly. This is the mechanism behind every dynamic web page you have ever used."),
  p("Understanding this connection is the whole game. Your HTML defines the initial page; the browser turns it into the DOM; and your JavaScript manipulates the DOM to change what the user sees, without reloading. Grasping that 'the page you see is a reflection of the DOM, and JavaScript edits the DOM' is the mental model that makes everything else in this topic fall into place. It is the single idea that separates learners who can build interactive pages from those who are stuck writing code that never visibly does anything."),

  h2("Selecting elements: finding what to change"),
  p("Before you can change part of a page, you have to find it, and JavaScript's main tool for this is querySelector, which uses the exact same selectors you already know from CSS. This is a gift for anyone who has written any CSS: a class selector, an id selector, a tag — they all work identically to find elements in JavaScript."),
  code("const title = document.querySelector(\"#main-title\");   // by id\nconst buttons = document.querySelectorAll(\".btn\");      // all matching a class\nconst firstPara = document.querySelector(\"p\");          // first paragraph"),
  p("querySelector finds the first element matching a CSS selector, and querySelectorAll finds all of them. Because the selector syntax is identical to CSS, this is one of the easier parts of the DOM to learn, and it is worth practising until finding any element on a page is quick and instinctive. Most DOM bugs for beginners start with selecting the wrong element or nothing at all, so getting confident with selectors first makes everything that follows smoother."),
  midCtaRaw(["The gap between 'I can follow a DOM tutorial' and 'I can build my own interactive feature' is where an enormous number of self-taught learners stall — they can copy along but freeze in front of a blank file, because a few key patterns never quite clicked into place. This is the most common plateau in front-end learning, and it is very fixable. Our ", { text: "one-on-one JavaScript tutoring", href: "/programs/javascript" }, " is designed to get you over exactly this hump, building real features from scratch with guidance until you can do it alone."]),

  h2("Changing content and style"),
  p("Once you have selected an element, you can change almost anything about it — its text, its HTML, its styling, its attributes — and the page updates immediately. This is where your JavaScript finally becomes visible, and it is deeply satisfying the first time it works."),
  code("const title = document.querySelector(\"#main-title\");\ntitle.textContent = \"Updated by JavaScript!\";   // change the text\ntitle.style.color = \"blue\";                     // change the style\ntitle.classList.add(\"highlight\");               // add a CSS class"),
  p("You can set textContent to change the words, adjust style properties directly, or — the cleaner professional approach — add and remove CSS classes with classList to change how something looks. That last technique is worth adopting early: rather than setting individual styles in JavaScript, you define the look in CSS and just toggle a class, which keeps your styling and your logic properly separated. Learning to change content and appearance is the moment DOM manipulation pays off, because your code is now doing something you can point at on the screen."),

  h2("Putting it together: interactivity"),
  p("The real power comes from combining the DOM with the events from JavaScript's event model: find an element, listen for an event on it, and change the page in response. This three-step pattern — select, listen, change — is the foundation of essentially every interactive feature on the web, from a menu that opens to a form that validates as you type."),
  code("const button = document.querySelector(\"#toggle\");\nconst box = document.querySelector(\"#box\");\nbutton.addEventListener(\"click\", () => {\n  box.classList.toggle(\"hidden\");   // show/hide on each click\n});"),
  p("Here a click on a button toggles whether a box is hidden — a complete interactive feature in a few lines. This select-listen-change pattern is genuinely most of front-end JavaScript, and once it is second nature you can build a surprising amount. It is also the point where learners who understand it pull decisively ahead of those still copying tutorials, because they can now assemble their own features rather than only reproducing examples. Mastering this one pattern is the practical goal of learning the DOM."),

  h2("Creating and removing elements"),
  p("Changing existing elements is one half of the DOM; the other is creating new ones and removing old ones on the fly. This is how a page grows a new to-do item, shows a search result, or clears a list — content that was never in the original HTML, added by JavaScript in response to what the user does."),
  code("const list = document.querySelector(\"#items\");\nconst item = document.createElement(\"li\");   // make a new element\nitem.textContent = \"New task\";\nlist.appendChild(item);                       // add it to the page"),
  p("The pattern is: create an element, set its content, then attach it to the page where you want it. Removing works similarly. This ability to build page content dynamically is what powers everything from social media feeds to shopping carts, where what you see is assembled by JavaScript rather than written into the original file. Understanding that you can construct the page in code, not just edit what is already there, opens up the full range of what interactive web applications can do — and it is the point where a learner's projects start to look like real applications."),
  p("A subtlety worth knowing early: there is a security and a performance dimension to building content this way. When you insert content that came from a user, using textContent rather than raw HTML protects your page from a common class of attack, because it treats the input as plain text rather than executable markup. And when you add many elements at once, doing it thoughtfully rather than one-at-a-time keeps the page fast. You do not need to master these nuances immediately, but knowing they exist is what separates code that merely works from code that is safe and responsive — and they are exactly the kind of professional detail a tutor can introduce at the right moment."),

  h2("Event delegation: handling many elements efficiently"),
  p("A common real-world problem reveals a deeper DOM skill: what if you have a list of fifty items and want each to respond to a click? Attaching fifty separate handlers is wasteful and breaks for items added later. The elegant solution is event delegation — attach one handler to the parent, and use the fact that events 'bubble up' from the clicked element to its ancestors."),
  p("When you click an item, the event travels up through its parent elements, so a single listener on the container can detect clicks on any child, including ones added after the page loaded. This is a genuinely important pattern in professional JavaScript, and it is the kind of thing that is hard to discover alone but obvious once shown. It builds on understanding how events flow through the DOM, and mastering it is a clear step from writing basic interactivity toward building real, scalable interfaces — exactly the kind of leap that a focused session with a tutor can turn from weeks of confusion into an afternoon of clarity."),

  h2("Where JavaScript beginners actually struggle with the DOM"),
  mli(["Not understanding that the page reflects the DOM, so editing the DOM changes the page."]),
  mli(["Selecting the wrong element, or nothing, and not realising that is the problem."]),
  mli(["Setting many individual styles instead of toggling CSS classes."]),
  mli(["Trying to manipulate elements before the page has finished loading."]),
  mli(["Following tutorials fine but freezing when building their own interactive feature."]),

  h2("How to master DOM manipulation"),
  mli(["Hold the model firmly: HTML builds the DOM, JavaScript edits the DOM, the page reflects it."]),
  mli(["Practise selectors until finding any element is instant — they are just CSS selectors."]),
  mli(["Prefer toggling CSS classes over setting individual styles in JavaScript."]),
  mli(["Drill the select-listen-change pattern until you can build features without a tutorial."]),
  mli(["Build small interactive things of your own, not just follow along."]),

  h2("Build something interactive, with guidance"),
  linked(["If your JavaScript still is not visibly changing the page, you are one or two patterns away from it clicking — the select-listen-change loop, the DOM model, dynamically creating elements. These are the moments where learning front-end development goes from frustrating to genuinely fun, and getting there faster is exactly what good tutoring provides. Our ", { text: "JavaScript tutoring in Burnaby and online", href: "/programs/javascript" }, " builds real, interactive features alongside you, so the patterns become yours rather than something you copied."]),
  linked(["Take the first step for free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", bring the page or feature you are trying to build, and we will show you the patterns that make it work — online across Metro Vancouver, or in person in Burnaby. If tutoring is not the right fit, we will tell you honestly."]),
];

await applyPost({ slug: "javascript-variables-and-data-types", was: 452, body: variables, siblingSlugs: SIBS.filter((s) => s !== "javascript-variables-and-data-types") });
await applyPost({ slug: "javascript-loops-and-conditionals", was: 396, body: loops, siblingSlugs: SIBS.filter((s) => s !== "javascript-loops-and-conditionals") });
await applyPost({ slug: "javascript-functions-and-events", was: 441, body: functions, siblingSlugs: SIBS.filter((s) => s !== "javascript-functions-and-events") });
await applyPost({ slug: "javascript-dom-manipulation", was: 404, body: dom, siblingSlugs: SIBS.filter((s) => s !== "javascript-dom-manipulation") });
