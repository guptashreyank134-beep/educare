/**
 * Python family: syntax/structure, variables/types, loops/conditionals,
 * functions/logic. Every code snippet was run in scripts/verify-python.py.
 * Code blocks are htmlBlock <pre> (not counted toward the word floor, so prose
 * must stand alone at 1,500+). Shared applyPost gate.
 */
import { applyPost, key, p, h2, h3, li, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["python-basic-syntax-and-structure", "python-variables-and-data-types", "python-loops-and-conditionals", "python-functions-logic-building"];
const help = (lead) => linked([lead, { text: "Python tutoring in Burnaby and online", href: "/programs/python" }, ", for beginners, high-school computer science and university courses."]);
const book = linked(["Sessions run in person in Burnaby or online across Metro Vancouver. ", { text: "Book a free 30-minute consultation", href: "/contact" }, " and bring the code or concept you are stuck on."]);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (src) => ({ _type: "htmlBlock", _key: key(), html: `<pre style="background:#1e293b;color:#e2e8f0;padding:1rem 1.25rem;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.6;margin:1.5rem 0;"><code>${esc(src)}</code></pre>` });

/* ---------- 1. SYNTAX & STRUCTURE ---------- */
const syntax = [
  p("Python has a reputation as the friendliest first programming language, and it is deserved — but that friendliness rests on a design choice that trips up almost every beginner at first: in Python, the layout of your code is not decoration. It is the code. Where other languages use brackets and semicolons to mark structure, Python uses whitespace, and understanding that from day one prevents a huge share of early frustration."),
  p("Learn how Python reads your code — how it decides what belongs to what — and the syntax stops feeling like a set of arbitrary rules and starts feeling like the readable language it was designed to be. That shift is the foundation everything else is built on."),
  help("This is where we start beginners in "),

  h2("Indentation is the structure"),
  p("In most languages, indenting your code is a courtesy to human readers; the computer ignores it. In Python, indentation is how the computer itself groups statements. The lines indented under an if statement are the lines that run when the condition is true — the indentation is the block."),
  code("x = 5\nif x > 0:\n    result = \"positive\"    # this line belongs to the if\n    print(result)          # so does this one\nprint(\"done\")              # this runs regardless — not indented"),
  p("This is why a misplaced space or an inconsistent indent produces an error where other languages would not care. It feels strict at first, but there is a genuine payoff: Python code from any two programmers looks structurally similar, because the language forces consistent layout. The rule 'the indentation shows what belongs to what' is the single most important thing to internalise, and once it clicks, reading Python becomes remarkably natural. Use four spaces per level — the near-universal convention — and be consistent, because mixing tabs and spaces is a classic source of baffling errors."),

  h2("A colon opens a block, and the block is indented"),
  p("The pattern repeats everywhere in Python: a line that starts a new block ends with a colon, and the block it introduces is indented beneath it. An if statement, a for loop, a function definition, a class — all follow the same shape. Recognising this one pattern means you can read the skeleton of any Python program even before you know what every line does."),
  code("def greet(name):        # colon, then indented body\n    message = \"Hi \" + name\n    return message\n\nfor i in range(3):      # colon, then indented body\n    print(greet(\"there\"))"),
  p("Seeing that def and for share the same colon-then-indent structure is a small realisation that makes the whole language feel coherent. There is one structural idea, applied consistently, rather than a dozen special cases to memorise. Beginners who grasp this stop guessing at where colons and indents go and start placing them by understanding."),

  h2("Comments, and writing for humans"),
  p("Anything after a hash symbol on a line is a comment — Python ignores it entirely, and it exists purely for the humans reading the code. Good comments explain why a piece of code does what it does, not what it does, since the what is usually visible in the code itself. This distinction matters more than beginners expect, because code is read far more often than it is written, including by your future self."),
  p("Python's whole design philosophy leans toward readability — its guiding principles explicitly value clear, simple code over clever, compact code. This is why Python reads almost like structured English, and why it is such a good teaching language. Adopting that mindset early, writing code meant to be understood rather than merely to work, is a habit that pays off through an entire programming career and is exactly what good courses try to instil."),

  h2("Statements, and one thing per line"),
  p("Python code is made of statements, and the default is one statement per line — no semicolons needed to end them, unlike many other languages. This is part of what makes Python clean to read: each line does one clear thing, and the line break itself marks where a statement ends. Beginners coming from other languages often add semicolons out of habit; Python tolerates them but they are unnecessary and considered poor style."),
  p("This one-statement-per-line default reinforces the language's readability. When a single line would grow too long, Python has clean ways to break it across lines, but the guiding instinct is that a reader should be able to scan down the left edge of your code and follow the logic one step at a time. Writing short, clear statements rather than cramming several operations onto one line is a habit that makes code easier to read, easier to debug, and easier for a marker or a teammate to follow."),

  h2("Printing and input: talking to the user"),
  p("The two functions a beginner uses first are print, which displays a value, and input, which reads a line typed by the user. Together they let a program have a simple conversation — ask a question, receive an answer, respond — and they are how most first programs make themselves visible. Print can show text, numbers, or the contents of variables, and it is also a beginner's most useful debugging tool: printing a value mid-program to see what it actually holds."),
  p("The crucial subtlety with input is that it always returns text, even when the user types digits. A program that reads a number and tries to do arithmetic with it without converting it first will either error or, worse, treat the number as text and concatenate instead of add. This trips up nearly every beginner once, and it connects directly to understanding types. Getting into the habit of converting input to the type you actually need, right where you read it, prevents a bug that is otherwise confusing to diagnose."),

  h2("Naming and style: code that reads well"),
  p("Python has a widely-followed style guide, and adopting its conventions early makes your code look professional and read clearly. Names should be descriptive — total_score rather than ts — and use lowercase words joined by underscores, the Python convention. Good names are a form of documentation: well-chosen names can make code almost self-explanatory, reducing the need for comments and the chance of confusion."),
  p("Beyond names, consistent spacing around operators, blank lines to separate logical sections, and keeping lines to a readable length all contribute to code that is a pleasure rather than a chore to read. This matters because programming is a collaborative, long-lived activity — code is read far more than it is written, by teammates and by your future self. Students who adopt clean style habits from the start find that their code is easier to debug and that others, including markers, can follow it, which is a genuine and lasting advantage."),

  h2("The interpreter: how Python actually runs your code"),
  p("Python is an interpreted language, which means your code is read and executed line by line by a program called the interpreter, rather than being translated all at once into machine code ahead of time. This has practical consequences a beginner feels immediately. You can type a single line and see its result instantly in the interactive shell, which makes experimenting and learning fast. And when something goes wrong, execution stops at the offending line and tells you where, rather than failing mysteriously."),
  p("Understanding that Python runs top to bottom, one statement at a time, demystifies a lot of early confusion. A variable does not exist until the line that creates it has run; a function cannot be called before the line that defines it has executed. Thinking of the interpreter as a careful reader working down your file in order, doing exactly what each line says as it reaches it, is the mental model that makes program behaviour predictable instead of magical."),

  h2("Reading error messages instead of fearing them"),
  p("Beginners often panic at error messages, but in Python they are one of your most useful tools, and learning to read them is a genuine skill. An error tells you its type (a SyntaxError means the code is not valid Python; a NameError means you used a variable that does not exist), and it points to the line where the problem surfaced. The most common early error, IndentationError, is the language telling you your block structure is inconsistent — exactly the indentation rule from above, being enforced."),
  p("The habit worth building is to read the last line of an error first, since that names what actually went wrong, then look at the line number. Far from being failures, errors are the interpreter helping you — they are precise, they are located, and they are almost always fixable in seconds once you learn to read them. Students who treat errors as information rather than as judgement progress dramatically faster."),

  h2("Where beginners actually struggle with Python syntax"),
  mli(["Inconsistent indentation, or mixing tabs and spaces — the number-one early error."]),
  mli(["Forgetting the colon at the end of an if, for, while or def line."]),
  mli(["Not understanding that code runs top to bottom, so using something before it is defined."]),
  mli(["Fearing error messages instead of reading them for the specific, located help they give."]),
  mli(["Writing code only to work, rather than to be read, and paying for it later."]),

  h2("How to build good Python habits"),
  mli(["Indent with four spaces, consistently, and let your editor help enforce it."]),
  mli(["Read the colon-then-indent pattern as one idea that appears everywhere."]),
  mli(["Use the interactive shell to test single lines and build intuition fast."]),
  mli(["Read the last line of every error message first, then fix from there."]),
  mli(["Comment the why, not the what, and write code you could re-read in a month."]),

  h2("Getting help with Python fundamentals"),
  help("If Python's rules feel finicky, seeing the few consistent ideas underneath — indentation as structure, colon-then-block, top-to-bottom execution — turns the finickiness into logic. Our "),
  book,
];

/* ---------- 2. VARIABLES & DATA TYPES ---------- */
const variables = [
  p("Variables and data types are where beginners either build a solid foundation or acquire misconceptions that haunt them for years. The trouble is that most people arrive with a mental picture of a variable as a labelled box you put a value into — and in Python, that picture is subtly wrong in a way that causes real, confusing bugs. Getting the right model early is one of the highest-value things a new Python programmer can do."),
  p("Python's approach to variables and types is flexible and powerful, but that flexibility comes with a handful of gotchas. Understanding what a variable actually is, and how Python's core types behave, turns those gotchas from mysterious crashes into predictable, avoidable behaviour."),
  help("This is a foundation we make sure of early in "),

  h2("A variable is a name, not a box"),
  p("Here is the reframe that prevents years of confusion: in Python, a variable is not a container that holds a value. It is a name that refers to a value. The value lives in memory, and the variable is simply a label pointing at it. This sounds like a philosophical nicety, but it has concrete consequences the moment you have two names pointing at the same thing."),
  code("a = [1, 2, 3]\nb = a          # b points at the SAME list, not a copy\nb.append(4)\nprint(a)       # [1, 2, 3, 4] -- a changed too!"),
  p("If a variable were a box, changing b could not affect a. But because both names refer to the same underlying list, a change through one name is visible through the other. This is the single most common source of baffling bugs for beginners, and the name-not-box model is the only thing that makes it predictable. Once you think of assignment as 'point this name at that value' rather than 'put this value in this box', the behaviour stops being surprising."),

  h2("Dynamic typing: names are not tied to a type"),
  p("Python is dynamically typed, which means a variable's type is not fixed — the same name can refer to a number now and a string later. The type belongs to the value, not to the name."),
  code("n = 3            # n refers to an integer\nn = \"now text\"    # the same name now refers to a string -- allowed\nprint(type(n))   # <class 'str'>"),
  p("This flexibility makes Python quick to write, but it puts responsibility on the programmer: nothing stops you from accidentally putting the wrong type of value in a name, and the error may only surface later when you try to use it. Beginners benefit from mentally tracking what type each name currently refers to, because the language will not track it for them. Dynamic typing is a convenience and a hazard at once, and knowing which is which is part of writing reliable Python."),

  h2("The core data types, and what each is for"),
  p("Python has a small set of built-in types that cover most needs, and knowing the right one for a job is half of writing clean code. Numbers come in two main kinds — integers for whole numbers and floats for decimals — and the distinction matters more than beginners expect."),
  code("print(7 // 2)   # 3    integer (floor) division\nprint(7 / 2)    # 3.5  true division always gives a float\nprint(7 % 2)    # 1    modulo -- the remainder"),
  p("Strings hold text and support intuitive operations — concatenation with plus, repetition with multiply, and a length with the len function. Booleans hold True or False and, in a quirk worth knowing, behave like the integers 1 and 0. Then come the containers: lists for ordered, changeable sequences; tuples for ordered but fixed ones; and dictionaries for key-value lookups. Choosing the right container is a recurring design decision, and understanding what each offers is what separates clean code from a tangle."),
  code("greeting = \"ab\" * 3        # 'ababab'\nprint(len(\"hello\"))        # 5\nscores = {\"math\": 95}      # a dictionary: key -> value\nprint(scores[\"math\"])      # 95"),

  h2("Mutability: the distinction that causes the most bugs"),
  p("This is the concept that ties the whole topic together and causes the most trouble when missed. Some Python types are mutable — they can be changed in place — and others are immutable — once created, they cannot be altered. Lists and dictionaries are mutable; numbers, strings and tuples are immutable."),
  code("s = \"abc\"\nprint(s.upper())   # 'ABC' -- a NEW string\nprint(s)           # 'abc' -- the original is unchanged\n\nnums = [1, 2, 3]\nnums.append(4)     # the list itself is modified\nprint(nums)        # [1, 2, 3, 4]"),
  p("Combine mutability with the name-not-box model and you have the explanation for most beginner bugs. Two names pointing at the same mutable list means a change through either is seen by both — but two names pointing at the same string are safe, because a string can never be modified, only replaced. Knowing which types are mutable, and why that interacts with shared references, is the difference between code that behaves as expected and code that mysteriously changes data you thought was safe."),

  h2("Strings in depth: text is its own skill"),
  p("Text handling deserves special attention because so much real programming is about manipulating strings, and Python gives them a rich set of abilities. A string is a sequence of characters you can index into, slice into pieces, search, split apart and join back together. Because strings are immutable, every operation that seems to change a string actually produces a new one — a point that connects directly to the mutability idea and prevents a common misconception."),
  code("name = \"Ada Lovelace\"\nprint(name.upper())        # 'ADA LOVELACE'\nprint(name.split(\" \"))     # ['Ada', 'Lovelace']\nprint(name[0:3])           # 'Ada' -- slicing"),
  p("Modern Python also offers f-strings, a clean way to build text with values embedded directly in it, which has become the standard approach. Rather than clumsily joining strings and numbers with plus signs — which fails anyway unless you convert the numbers first — an f-string lets you drop a variable straight into the text. Learning the common string methods and f-strings early pays off constantly, because text processing appears in almost every program a beginner writes, from formatting output to reading files."),

  h2("None: the value that means 'nothing'"),
  p("Python has a special value, None, that represents the deliberate absence of a value — not zero, not an empty string, but genuinely nothing. It is what a function returns when it does not return anything else, and it is the conventional way to signal 'no result yet' or 'not found'. Understanding None as its own distinct thing prevents a category of confusing bugs, because it behaves differently from the empty or zero values it is easy to confuse it with."),
  p("The practical importance is that you often need to check whether something is None before using it — a lookup that found nothing, an optional value that was never set. Doing this check correctly, and understanding that None is falsy but distinct from zero or an empty string, is part of writing robust code that handles the 'nothing here' case gracefully rather than crashing on it. None is a small concept with an outsized role in real Python programs."),

  h2("Choosing the right container"),
  p("Much of writing clean Python is picking the right structure to hold your data, and the choice is not arbitrary — each container is suited to a different job. A list is for an ordered collection you will change: adding, removing, reordering. A tuple is for an ordered collection that should not change, like a coordinate pair, and its immutability is a feature that signals intent and prevents accidental modification. A dictionary is for looking things up by a key rather than a position, which is enormously faster than searching a list for what you need."),
  p("Beginners often reach for a list by default and force it to do everything, producing code that is slower and harder to read than it needs to be. Learning to ask 'do I need order? will it change? do I look things up by position or by name?' and choosing accordingly is a design skill that separates clean code from a tangle. The right container often makes a problem almost solve itself, while the wrong one makes easy tasks awkward — which is exactly why this choice is worth thinking about deliberately."),

  h2("Type conversion, and when Python won't guess"),
  p("Because types matter, converting between them is a constant task, and Python is deliberately strict about it. It will happily convert when you ask — turning a string of digits into a number, or a number into a string — but it will refuse to guess. Trying to add a number to a string of text raises an error rather than silently doing something surprising, which is Python protecting you from a whole class of bugs that looser languages allow."),
  p("The practical skill is knowing when a conversion is needed, especially at the boundaries of a program. Input typed by a user always arrives as a string, even if it looks like a number, so it must be explicitly converted before you can do arithmetic with it — a classic beginner trap that produces either an error or, worse, string concatenation where you wanted addition. Being deliberate about types at these boundaries prevents bugs that are otherwise very hard to track down."),

  h2("Where Python beginners actually go wrong with types"),
  mli(["Thinking of a variable as a box, so shared-reference bugs seem impossible."]),
  mli(["Forgetting that lists and dictionaries are mutable and shared, while strings and numbers are not."]),
  mli(["Losing track of what type a name currently refers to under dynamic typing."]),
  mli(["Forgetting that user input is a string, and mixing it up with numbers."]),
  mli(["Confusing integer division // with true division /."]),

  h2("How to master Python variables and types"),
  mli(["Adopt the name-not-box model and reason about assignment as pointing a name at a value."]),
  mli(["Learn which core types are mutable and which are immutable, and why it matters."]),
  mli(["Track the current type of each variable in your head as you read code."]),
  mli(["Convert types explicitly at the edges of your program, especially with input."]),
  mli(["Pick the right container — list, tuple or dictionary — for what the data needs to do."]),

  h2("Getting help with Python variables and data types"),
  help("If shared-reference or mutability bugs keep surprising you, the name-not-box model and the mutable-versus-immutable split make them predictable. Our "),
  book,
];

/* ---------- 3. LOOPS & CONDITIONALS ---------- */
const loops = [
  p("Loops and conditionals are where a program stops being a fixed list of steps and starts making decisions and repeating work — where code becomes genuinely powerful. They are also where beginners most often write code that runs but does the wrong thing, because the logic is subtly off. Building a clear mental model of how Python makes choices and repeats actions is what turns fragile, guessed-at code into reliable programs."),
  p("The good news is that control flow in Python is small and consistent: a couple of ways to make decisions, a couple of ways to repeat, and a set of boolean rules underneath. Understanding those rules — rather than pattern-matching examples — is what lets you write loops and conditions that do exactly what you intend."),
  help("This is a core skill we build carefully in "),

  h2("Conditionals: making the code decide"),
  p("An if statement runs a block only when a condition is true, and it is the basic unit of decision-making. Adding elif and else lets a program choose between several paths, checking each condition in order and taking the first that matches. The order matters, because once a branch is taken the rest are skipped."),
  code("score = 75\nif score >= 90:\n    grade = \"A\"\nelif score >= 70:      # checked only if the first was false\n    grade = \"B\"\nelse:\n    grade = \"C\"\nprint(grade)           # B"),
  p("The common beginner mistake is getting the order or the boundaries wrong, so a value falls into the wrong branch. Because Python checks conditions top to bottom and stops at the first true one, arranging them correctly — usually most specific or most extreme first — is essential. Thinking through which branch a given input should take, and tracing it against your conditions, is the habit that eliminates a whole category of logic bugs."),

  h2("Boolean logic: the rules underneath every condition"),
  p("Every condition ultimately reduces to True or False, and Python combines these with and, or and not. The subtlety that catches beginners is short-circuiting: Python stops evaluating as soon as the answer is certain. In an and, if the first part is false, the whole thing is false and the second part is never checked; in an or, a true first part means the rest is skipped."),
  code("# short-circuiting prevents the crash:\nx = 0\nif x != 0 and 10 / x > 1:   # second part skipped when x is 0\n    print(\"big\")\nprint(\"no crash\")            # runs fine"),
  p("This is not a curiosity — it is used constantly to write safe conditions, like checking that a value is valid before using it. Python also allows chained comparisons that read like mathematics, so 1 < x < 10 means exactly what it looks like. Understanding that conditions are evaluated left to right and abandoned as soon as the outcome is known lets you both avoid crashes and write conditions that are efficient and clear."),

  h2("The for loop: repeating over a collection"),
  p("A for loop repeats an action once for each item in a collection, and it is the workhorse of Python iteration. Crucially, Python's for loop is built to walk directly over the items of a list, the characters of a string, or the keys of a dictionary — you rarely need to manage a counter by hand, which is a common source of errors in other languages."),
  code("total = 0\nfor n in [4, 8, 15]:\n    total += n\nprint(total)          # 27\n\nfor i in range(5):    # 0, 1, 2, 3, 4\n    print(i)"),
  p("When you do need numbers, the range function generates them — range(5) gives 0 through 4, and range(2, 8, 2) gives 2, 4, 6. The most frequent beginner error is an off-by-one mistake, because range stops one before its end value, so range(5) does not include 5. Understanding that range goes up to but not including its endpoint prevents a bug that otherwise appears constantly, and thinking of a for loop as 'do this once for each of these' keeps the intent clear."),

  h2("The while loop, and the infinite-loop trap"),
  p("A while loop repeats as long as a condition stays true, which makes it the right tool when you do not know in advance how many repetitions you need — keep asking for input until it is valid, keep processing until a total is reached. Its power is also its danger: if the condition never becomes false, the loop runs forever."),
  code("k = 10\ncount = 0\nwhile k > 1:\n    k //= 2       # 10 -> 5 -> 2 -> 1\n    count += 1\nprint(count)      # 3"),
  p("The classic beginner disaster is a while loop whose condition never changes inside the body, so it spins endlessly and freezes the program. The discipline is to make sure that something inside the loop moves the condition toward becoming false — here, k shrinks each pass until it drops to 1. Every while loop should have a clear answer to the question 'what will eventually make this stop?', and being able to state that answer is how you avoid infinite loops."),

  h2("List comprehensions: the Pythonic loop"),
  p("Once the basics are solid, Python offers a compact, elegant way to build a list from a loop in a single line — the list comprehension. It expresses 'make a new list by doing something to each item, optionally keeping only some' in a form that reads almost like its description."),
  code("evens = [n for n in range(10) if n % 2 == 0]\nprint(evens)      # [0, 2, 4, 6, 8]"),
  p("This is not just shorthand; it is considered the idiomatic, readable way to transform collections in Python, and you will see it everywhere in real code. Beginners should first understand it as the ordinary loop it replaces — build the list step by step, then learn to compress it — so that the comprehension is a clear expression of intent rather than a magic incantation. Reading and writing comprehensions fluently is a mark of moving from beginner toward genuine Python fluency."),

  h2("break and continue: steering a loop"),
  p("Two keywords give you finer control inside a loop. break exits the loop immediately, no matter how many iterations were left — useful when you have found what you were looking for and there is no reason to keep going. continue skips the rest of the current iteration and jumps straight to the next one, useful when you want to ignore certain items but keep looping. Together they let a loop respond to what it finds rather than blindly running to the end."),
  code("for n in [3, 7, 0, 4]:\n    if n == 0:\n        continue      # skip zeros\n    if n > 5:\n        break         # stop at the first big number\n    print(n)          # prints 3, then stops at 7"),
  p("The beginner's task is to use these deliberately rather than as a tangle. A well-placed break can make a search loop clean and efficient — stop the moment you succeed — while overusing them makes a loop hard to follow. Understanding exactly what each does, that break leaves the loop entirely while continue only skips one pass, prevents the confusion of a loop that ends earlier or processes fewer items than expected. They are precise tools, and used well they make loops both faster and clearer."),

  h2("Nested loops: loops inside loops"),
  p("A loop can contain another loop, and this nesting is how you work with grids, tables, and combinations — for each row, do something for each column. It is powerful and appears constantly, from processing a spreadsheet to comparing every item against every other. The key to reading nested loops is to recognise that the inner loop runs completely for each single pass of the outer one."),
  p("The thing to watch is that the work multiplies: an outer loop of ten and an inner loop of ten means a hundred iterations, so nested loops can become slow if the collections are large. Beginners should understand both how to write them — keeping clear which loop is which, often by naming the loop variables meaningfully — and why they can be expensive. Recognising that the total work is the product of the loop sizes is an early, valuable step toward thinking about efficiency, which becomes important as programs grow."),

  h2("Truthiness: what counts as true"),
  p("Python lets you use non-boolean values directly in conditions, and it has clear rules for what counts as true or false. Zero, an empty string, an empty list and the special value None are all treated as false; almost everything else is true. This enables clean, idiomatic checks — testing whether a list has items by writing 'if the list' rather than 'if the length of the list is greater than zero'."),
  p("This is convenient and very common in real Python, but it can surprise beginners who do not know the rules, producing conditions that behave unexpectedly on empty or zero values. Learning what Python considers false — the empties and the zeros and None — lets you both read idiomatic code and write conditions that handle edge cases correctly. It is a small set of rules with an outsized effect on how natural your Python looks."),

  h2("Where beginners actually go wrong with control flow"),
  mli(["Ordering if/elif conditions wrongly, so values land in the wrong branch."]),
  mli(["Off-by-one errors with range, forgetting it stops before its end value."]),
  mli(["Writing while loops with no way for the condition to become false — infinite loops."]),
  mli(["Not knowing short-circuiting, and so writing conditions that crash on edge cases."]),
  mli(["Being surprised by truthiness on empty or zero values."]),

  h2("How to master loops and conditionals"),
  mli(["Trace each input through your if/elif/else by hand to check it lands in the right branch."]),
  mli(["Remember range stops one before its endpoint, and check your boundaries deliberately."]),
  mli(["For every while loop, answer 'what will make this stop?' before running it."]),
  mli(["Learn short-circuiting and use it to guard conditions safely."]),
  mli(["Build a list comprehension by first writing the plain loop it replaces."]),

  h2("Getting help with Python loops and conditionals"),
  help("If your loops run but do the wrong thing, the fix is usually the logic underneath — boundaries, boolean rules, and stopping conditions. Our "),
  book,
];

/* ---------- 4. FUNCTIONS & LOGIC ---------- */
const functions = [
  p("Functions are the point where beginners become programmers. Up to now, code is a single sequence of instructions; functions let you package a piece of logic, give it a name, and reuse it — which is how real programs are built, out of small, well-named pieces rather than one long script. Learning to think in functions is the biggest single step in a beginner's development, and it changes how you approach every problem."),
  p("Beyond the mechanics, functions teach the core skill of programming: breaking a big problem into smaller, solvable ones. This decomposition — logic building — is what a good computer science course is really developing, and functions are the tool that makes it concrete."),
  help("This is the step we focus on most in "),

  h2("A function packages logic you can reuse"),
  p("A function is a named block of code that performs a task, optionally takes inputs (parameters), and optionally returns a result. The value is reuse: write the logic once, then call it whenever you need it, instead of copying the same lines around your program. This is the single most important principle in writing maintainable code — don't repeat yourself — and functions are how you honour it."),
  code("def add(a, b=10):      # b has a default value\n    return a + b\n\nprint(add(5))         # 15  (uses the default)\nprint(add(5, 1))      # 6   (overrides it)"),
  p("Parameters let a function work on different inputs, and a return value hands a result back to whoever called it. The distinction between a function that returns a value and one that just prints something is one beginners must grasp early: printing shows a result to a human, while returning gives it back to the program to use further. Confusing the two — printing when you meant to return — is among the most common early mistakes, and understanding the difference is essential to composing functions together."),

  h2("Scope: where a variable lives"),
  p("When you create a variable inside a function, it exists only inside that function — this is called local scope, and it is a feature, not a limitation. It means a function is a self-contained unit whose internal variables cannot accidentally interfere with the rest of the program, which is exactly what makes functions safe to reuse and reason about."),
  code("def compute():\n    result = 42        # local to compute\n    return result\n\ncompute()\n# print(result)      # would be an error: result doesn't exist out here"),
  p("A function can read variables from the surrounding program, but the safe, clean practice is to pass everything a function needs in as parameters and hand results back with return, rather than reaching out to grab external variables. This keeps functions independent and predictable. Understanding scope — that each function has its own private workspace — is what lets you build large programs from many functions without them tripping over each other, and it is a concept that rewards getting right early."),

  h2("Decomposition: the real skill functions teach"),
  p("The deepest reason functions matter is that they let you break a hard problem into a set of easy ones. Faced with a large task, you do not solve it all at once; you identify the sub-tasks, write a small function for each, and then combine them. Each function does one thing well, has a clear name, and can be tested on its own — and the main program becomes a readable sequence of well-named steps."),
  p("This is logic building, and it is what separates someone who can write code from someone who can build software. A beginner who learns to ask 'what are the smaller pieces of this problem?' and to express each as a function will handle problems that would overwhelm someone writing one long script. Employers and exams alike are really testing this decomposition skill, because it is the difference between code that grows into a tangle and code that stays clear as it gets bigger. Practising it deliberately — always looking for the natural sub-functions in a problem — is the most valuable habit a programmer can build."),

  h2("Recursion: a function that calls itself"),
  p("Some problems are naturally defined in terms of smaller versions of themselves, and for these, a function can call itself — recursion. The classic example is the factorial: the factorial of a number is that number times the factorial of one less, until you reach a base case that stops the recursion."),
  code("def factorial(n):\n    if n <= 1:          # base case -- stops the recursion\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))    # 120"),
  p("Recursion elegantly expresses problems that break into self-similar pieces, and it appears throughout computer science, from searching data structures to certain kinds of maths. The critical detail, and the beginner's classic trap, is the base case: a recursive function must have a condition that stops it calling itself, or it recurses forever and crashes. Understanding recursion as 'solve a smaller version of the same problem, until the problem is trivial' both makes it approachable and reveals why the base case is non-negotiable."),

  h2("Arguments in depth: flexibility with care"),
  p("Python functions accept arguments in several flexible ways, and knowing them makes your functions both easier to use and easier to misuse. Beyond simple positional arguments, you can give parameters default values so callers can omit them, and you can pass arguments by name to make a call self-documenting. Python can also collect an arbitrary number of arguments, which is how functions like print accept any number of values."),
  code("def describe(name, age=0, *hobbies):\n    print(name, age, hobbies)\n\ndescribe(\"Sam\", 20, \"chess\", \"piano\")\n# Sam 20 ('chess', 'piano')"),
  p("This flexibility is powerful, but the beginner's discipline is to keep function signatures clear and predictable. A function with sensible defaults and well-named parameters is a pleasure to use; one with a confusing tangle of optional arguments is a liability. Passing arguments by name, especially when a function takes several, makes calling code far more readable — describe(name=\"Sam\", age=20) tells the reader exactly what each value means. Using these features to make functions clearer, not cleverer, is the mark of good design."),

  h2("Docstrings: functions that explain themselves"),
  p("A well-written function should say what it does, and Python has a built-in mechanism for this: the docstring, a string placed at the very start of a function that describes its purpose, its inputs, and what it returns. Unlike an ordinary comment, a docstring is attached to the function and can be read by tools and by other programmers through Python's help system, making it the standard way to document code."),
  p("The habit of writing a one-line docstring for every function you define pays off enormously as programs grow. It forces you to articulate, in a sentence, exactly what the function is responsible for — and if you cannot state that clearly, it is often a sign the function is trying to do too much and should be split. Good documentation is part of good decomposition, and students who document their functions from the start write code that others, and their future selves, can actually use. It is a small discipline with a large payoff in readable, maintainable programs."),

  h2("Building programs from functions"),
  p("The culmination of learning functions is realising that a whole program is best built as a collection of them, with a small main section that ties them together. Instead of one long script that does everything in sequence, you write a set of focused functions — one to read the data, one to process it, one to display the result — and a short piece of code that calls them in order. The program becomes readable at a glance, because the main section reads like a summary of what the program does."),
  p("This structure has practical benefits beyond readability. Each function can be tested on its own, so bugs are easier to isolate. Functions can be reused across the program, or even across different programs. And when a requirement changes, you often only need to modify one small function rather than untangling a monolithic script. This is how real software is built, and learning to think this way — as an assembler of small, reliable, well-named pieces — is the genuine goal of learning functions. It is the habit that lets a programmer take on problems far larger than they could ever hold in their head at once."),

  h2("The mutable-default-argument trap"),
  p("One Python-specific gotcha is worth flagging because it catches even intermediate programmers and produces genuinely baffling bugs. If you give a function a mutable default value — like an empty list — that default is created once and shared across every call, so changes accumulate between calls in a way that looks like the function is remembering things it should not."),
  code("def add_item(item, lst=[]):    # DANGER: shared default list\n    lst.append(item)\n    return lst\n\nadd_item(1)               # [1]\nprint(add_item(2))        # [1, 2]  -- not [2]!"),
  p("This surprises everyone the first time, because it violates the reasonable expectation that each call starts fresh. The fix is a standard pattern — default to None and create a new list inside the function — but the deeper lesson connects back to the variables topic: mutable values and shared references interact in ways you must actively watch for. Knowing this trap exists, and why it happens, is a mark of someone who understands Python's model rather than just its syntax."),

  h2("Where beginners actually struggle with functions"),
  mli(["Confusing printing a result with returning it, so functions can't be composed."]),
  mli(["Not understanding scope, and expecting a function's internal variables to exist outside it."]),
  mli(["Writing one long function instead of decomposing a problem into small ones."]),
  mli(["Forgetting the base case in recursion, causing infinite recursion."]),
  mli(["Falling into the mutable-default-argument trap and getting shared state across calls."]),

  h2("How to master functions and logic building"),
  mli(["Always be clear whether a function should return a value or just print one."]),
  mli(["Pass what a function needs as parameters and hand results back with return."]),
  mli(["For any problem, first ask what the smaller sub-tasks are, and write a function for each."]),
  mli(["When using recursion, define the base case first, before the recursive step."]),
  mli(["Default mutable arguments to None and create the value inside the function."]),

  h2("Getting help with Python functions and logic"),
  help("If functions, scope or decomposition feel unclear, they are the exact skills that turn code-writing into software-building. Our "),
  book,
];

await applyPost({ slug: "python-basic-syntax-and-structure", was: 452, body: syntax, siblingSlugs: SIBS.filter((s) => s !== "python-basic-syntax-and-structure") });
await applyPost({ slug: "python-variables-and-data-types", was: 392, body: variables, siblingSlugs: SIBS.filter((s) => s !== "python-variables-and-data-types") });
await applyPost({ slug: "python-loops-and-conditionals", was: 403, body: loops, siblingSlugs: SIBS.filter((s) => s !== "python-loops-and-conditionals") });
await applyPost({ slug: "python-functions-logic-building", was: 424, body: functions, siblingSlugs: SIBS.filter((s) => s !== "python-functions-logic-building") });
