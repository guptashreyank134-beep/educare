/**
 * Web-development family: frontend, backend, database, APIs. LEAD-GENERATING with
 * DISTINCT CTAs per post (no shared template -- lesson from the JS family).
 * Code verified in scripts/verify-webdev.mjs. Shared applyPost gate.
 */
import { applyPost, key, p, h2, h3, li, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["web-development-frontend-development-html-css-react", "web-development-backend-development-node-js-express", "web-development-database-management-mongodb-firebase", "web-development-api-development-integration"];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (src) => ({ _type: "htmlBlock", _key: key(), html: `<pre style="background:#1e293b;color:#e2e8f0;padding:1rem 1.25rem;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.6;margin:1.5rem 0;"><code>${esc(src)}</code></pre>` });
const P = "/programs/web-development";

/* ================= 1. FRONTEND ================= */
const frontend = [
  p("You have built a web page, it looks fine, and then you try to make it actually do something — respond to a click, update without reloading, manage a form — and suddenly it feels like you have hit a wall you cannot climb. This is the exact point where learning front-end development gets hard, and where a lot of self-taught developers stall for months. The wall has a name, and getting over it is mostly about understanding three layers and how they fit together."),
  p("Front-end development is everything the user sees and touches in a website, built from three technologies: HTML for structure, CSS for style, and JavaScript — increasingly through a framework like React — for interactivity. This guide covers how those three layers cooperate, and the modern component model that trips up beginners, so you can build interfaces that work rather than just look right."),

  h2("Three layers, three jobs"),
  p("The foundation of all front-end work is understanding that a web page is built in three separate layers, each with one job, and that keeping them separate is what makes code maintainable. HTML provides the structure and content — the headings, paragraphs, buttons and images. CSS provides the presentation — colours, spacing, fonts, layout. JavaScript provides the behaviour — what happens when the user interacts."),
  code("<!-- HTML: structure -->\n<button class=\"cta\">Sign up</button>\n\n/* CSS: appearance */\n.cta { background: blue; color: white; padding: 12px; }\n\n// JavaScript: behaviour\nbutton.addEventListener(\"click\", () => submitForm());"),
  p("Beginners often blur these together — styling inside their HTML, behaviour tangled with structure — and end up with code that is impossible to maintain. The professional discipline, called separation of concerns, keeps each layer focused on its own job. Getting this right from the start is one of the highest-value habits in front-end development, because it is what lets a project grow without collapsing into chaos. When you can point at any piece of your code and say which of the three jobs it does, you are thinking like a front-end developer."),

  h2("HTML: meaning, not just boxes"),
  p("HTML is where every page begins, and the mistake beginners make is treating it as a pile of generic containers. Good HTML is semantic — it uses elements that describe what content means, not just how it looks. A navigation section, a heading, an article, a button: each has a proper element, and using it correctly matters more than beginners realise."),
  p("Semantic HTML pays off in three concrete ways that are easy to overlook. It makes your site accessible to people using screen readers, who rely on the meaning of elements to navigate. It helps search engines understand your content, which affects how you rank. And it makes your own code far easier to read and maintain. Treating HTML as a meaningful description of your content, rather than a set of anonymous boxes to style, is a mark of a developer who understands the platform rather than fighting it — and it is the kind of foundational habit that is much easier to build correctly with guidance than to unlearn later."),

  h2("CSS: the layer everyone underestimates"),
  p("CSS looks simple and is deceptively deep, and it is where a huge amount of beginner frustration lives — the element that will not centre, the layout that breaks on mobile, the mysterious spacing. The truth most tutorials skip is that modern CSS has powerful layout systems, Flexbox and Grid, that solve almost all of these problems cleanly, and that not knowing them is why so many beginners struggle with layout."),
  p("The other essential idea is responsive design: your site must work on a phone, a tablet and a desktop, which means layouts that adapt to the screen size rather than assuming one fixed width. Beginners who learn Flexbox, Grid and responsive techniques properly find that layout stops being a fight and becomes straightforward; those who do not spend years wrestling with it. CSS rewards learning its systems rather than guessing, and it is one of the areas where a clear explanation of the underlying model saves the most time."),
  linked(["If CSS layout is where you keep getting stuck — and for most beginners it is — that is not a reflection of your ability; it is a set of specific systems no one explained clearly. A single focused session on Flexbox and Grid often replaces weeks of guesswork. Our ", { text: "web development tutoring", href: P }, " starts from the layouts you are actually trying to build."]),

  h2("React and the component model"),
  p("Modern front-end development increasingly means using a framework, and React is the most popular. The big idea that trips up beginners is the component model: instead of thinking about a page as one long document, you break the interface into reusable, self-contained pieces — a button, a card, a form — each managing its own structure, style and behaviour together."),
  p("This is a genuine mental shift from writing plain HTML and JavaScript, and it is where learners coming from the basics often feel lost. But the payoff is enormous: components can be reused, tested and reasoned about independently, which is how large, complex interfaces get built without becoming unmanageable. Understanding that a React app is a tree of components, each responsible for one piece of the interface, is the foundation everything else in React builds on. It is decomposition — the same skill that matters everywhere in programming — applied to user interfaces."),

  h2("State: the concept that makes React click"),
  p("The single most important idea in React, and the one worth investing the most in understanding, is state. State is the data that can change over time — what the user has typed, whether a menu is open, which items are in a cart. The React revelation is that you do not manually update the page when data changes; instead, you change the state, and React automatically re-renders the interface to match."),
  code("// You change the DATA, not the page:\nconst [count, setCount] = useState(0);\n// clicking calls setCount(count + 1);\n// React re-renders the display automatically"),
  p("This is a profound shift from directly manipulating the DOM as in plain JavaScript. Instead of 'when the button is clicked, find this element and change its text', you say 'the display always reflects this state', and React handles keeping them in sync. Grasping that the UI is a function of state — change the state and the interface follows — is the concept that separates people who can use React from people who fight it. It is genuinely one of the trickiest leaps in learning modern front-end development, and one of the most rewarding to get help with, because once it clicks, an enormous amount of React suddenly makes sense."),

  h2("Forms: where the user talks back"),
  p("Almost every real application needs forms — login, signup, search, checkout — and they are a surprisingly deep source of beginner difficulty. A form is where the user gives your application data, and handling that well means capturing what they type, validating it, giving feedback when something is wrong, and doing something with the result. Each of those steps has its own pitfalls, which is why forms trip up learners more than they expect."),
  p("In React especially, forms introduce the concept of controlled inputs, where the form's contents are tied to state, so the interface and the data stay in sync as the user types. This connects directly to the state idea above, and it is where that concept becomes concrete and practical. Validation — checking that an email looks like an email, that a required field is not empty — is another layer, and doing it in a way that guides the user rather than frustrating them is a real skill. Forms are a small topic that touches everything, which is why getting them right is a good measure of whether the fundamentals have clicked, and a common place where a little guidance saves a lot of frustration."),

  h2("Where front-end beginners actually get stuck"),
  mli(["Blurring HTML, CSS and JavaScript together instead of keeping the three layers separate."]),
  mli(["Treating HTML as anonymous boxes rather than semantic, meaningful elements."]),
  mli(["Fighting CSS layout without knowing Flexbox, Grid and responsive design."]),
  mli(["Struggling with React's component model coming from plain HTML/JS."]),
  mli(["Not grasping state, and trying to manually update the page instead of updating data."]),

  h2("How to learn front-end development"),
  mli(["Keep structure, style and behaviour in their own layers from day one."]),
  mli(["Use semantic HTML elements for what content means, not just how it looks."]),
  mli(["Learn Flexbox, Grid and responsive design properly rather than guessing at layout."]),
  mli(["Approach React as a tree of reusable components, one job each."]),
  mli(["Invest heavily in understanding state — the UI is a function of it."]),

  h2("Get past the front-end wall"),
  linked(["If your pages look right but will not behave — or React's state and components are not clicking — you are at the exact plateau where most self-taught front-end learners stall, and it is very fixable. The developers who break through fastest are the ones who get the mental models explained clearly instead of grinding through tutorials that never quite address their confusion. Our ", { text: "web development tutoring in Burnaby and online", href: P }, " works from the interfaces you are trying to build, so every session moves your real project forward."]),
  linked(["The first step is free and low-pressure. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", show us the front-end code or feature that is frustrating you, and we will pinpoint the gap and how quickly it closes — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so."]),
];

/* ================= 2. BACKEND ================= */
const backend = [
  p("You have built a front-end that looks great, but now it needs to actually save data, log users in, or talk to a database — and you realise everything you have learned so far only runs in the browser. Welcome to the back end, the part of web development that happens on the server, and the part that most front-end learners find genuinely disorienting at first because it is a completely different environment with different rules."),
  p("Back-end development is the server-side half of a web application: the code that runs on a computer somewhere else, handles requests from browsers, works with databases, and sends responses back. This guide covers how servers work with Node.js and Express, the request-response cycle at the heart of the web, and the concepts that make the back end click, so the server stops being a mysterious black box."),

  h2("The request-response cycle: how the web actually works"),
  p("Everything on the back end revolves around one cycle, and understanding it deeply is the foundation of all server-side development. A browser sends a request to a server — 'give me the home page', 'save this form', 'log me in'. The server receives it, does whatever work is needed, and sends back a response. That is the entire web, repeated billions of times a day."),
  p("What makes this feel foreign to front-end developers is that the server code runs on a different machine, at a different time, with no access to the browser or the page. It receives a request as data, produces a response as data, and knows nothing about buttons or clicks. Internalising this cycle — a request comes in, your code runs, a response goes out — is the mental model that makes the entire back end comprehensible. Every route you write, every database query, every login check is just something that happens between a request arriving and a response leaving."),

  h2("Node.js: JavaScript escapes the browser"),
  p("For years, JavaScript only ran in web browsers. Node.js changed that by letting JavaScript run directly on a server, which is why it has become so popular: you can use one language, JavaScript, for both the front end and the back end. For someone who already knows JavaScript from front-end work, this is a huge advantage — you are not learning a whole new language, just a new environment and new capabilities."),
  p("Those new capabilities are what make server-side work possible: reading and writing files, connecting to databases, handling network requests — things a browser deliberately forbids for security. Understanding that Node.js is 'JavaScript, but on a server with server powers' demystifies a lot of early confusion. The language you know still works; what is new is where it runs and what it can now touch. This is genuinely one of the gentler transitions in learning to be a full-stack developer, and recognising that is reassuring for learners who fear the back end is a foreign country."),

  h2("Express and routing: directing traffic"),
  p("Writing a server in raw Node.js is tedious, so almost everyone uses Express, a framework that makes building servers straightforward. Its central concept is routing: matching an incoming request to the code that should handle it, based on the request's method and path."),
  code("app.get(\"/users\", (req, res) => {\n  res.json(listAllUsers());       // GET /users -> list them\n});\napp.post(\"/users\", (req, res) => {\n  createUser(req.body);           // POST /users -> create one\n  res.status(201).json({ ok: true });\n});"),
  p("Each route says 'when a request of this method arrives at this path, run this function'. The function receives the request (with its data) and a response object it uses to reply. This maps directly onto the request-response cycle: a route is simply how you decide what to do with a particular kind of request. Once routing clicks — that your whole server is a collection of routes, each handling one kind of request — building a back end becomes methodical rather than mysterious, and you can reason clearly about what your server does."),
  linked(["Routing and the request-response cycle are where front-end developers most often feel lost moving to the back end — and it is exactly the kind of thing that clicks fast with a clear explanation and a working example. Our ", { text: "web development tutoring", href: P }, " can take you from confused to comfortable with server-side code in a focused session or two, working from a real app you are building."]),

  h2("Middleware: the assembly line"),
  p("A concept that puzzles beginners but is genuinely powerful is middleware: functions that run in sequence between a request arriving and your route handling it. Each one can inspect or modify the request, do a job, and pass control to the next — like an assembly line every request travels down before reaching its destination."),
  p("This is how cross-cutting concerns are handled cleanly: checking that a user is logged in, parsing the incoming data, logging the request, handling errors. Rather than repeating that code in every route, you write it once as middleware and apply it across many routes. Understanding middleware as a pipeline the request flows through — each step doing one job and handing off to the next — explains a huge amount of how real Express applications are structured. It is decomposition again, applied to the flow of a request, and it is a pattern worth understanding early because professional back-end code is full of it."),

  h2("Authentication: proving who you are"),
  p("Almost every real application needs to know who a user is, and authentication — verifying identity — is a core back-end responsibility that beginners often find intimidating. The essential idea is manageable: when a user logs in successfully, the server gives them a token, and the browser sends that token with every subsequent request to prove who it is, since each request otherwise arrives with no memory of the last."),
  p("This connects to a defining feature of the web: it is stateless, meaning the server does not automatically remember anything between requests. Each request must carry its own proof of identity, which is what the token provides. Getting authentication right also means understanding security — never storing passwords as plain text, protecting tokens, validating everything a user sends. This is an area where mistakes have real consequences, and where learning the correct patterns from someone who knows them, rather than copying insecure code from the internet, genuinely matters."),

  h2("Error handling: planning for things going wrong"),
  p("Front-end code that breaks inconveniences one user; back-end code that breaks can take down the whole application for everyone. This raises the stakes on error handling, and it is an area beginners routinely neglect until it bites them. A robust server anticipates what can go wrong — a database that is unreachable, a request with missing data, a user asking for something that does not exist — and responds gracefully rather than crashing."),
  p("A large part of this is responding with the right information. When something fails, the server should send back a clear status code and message so the caller knows what happened and why — was the request invalid, was the user not allowed, or did the server itself fail? Beginners often write only the 'happy path' where everything works, and their applications fall over the moment reality intrudes. Learning to think defensively — to ask 'what could go wrong here, and how should the server respond?' — is a mark of maturity in back-end development, and it is one of the differences between code that works in a demo and code that survives real users."),

  h2("From your machine to the world: deployment"),
  p("A back end running on your own computer is invisible to everyone else; to become a real application, it has to be deployed — put on a server that is always on and reachable from the internet. Deployment is often where beginners feel a fresh wave of intimidation, because it involves concepts that are new again: hosting, environment configuration, domains, keeping the application running reliably."),
  p("The encouraging reality is that modern hosting platforms have made deployment far simpler than it used to be, handling much of the hard infrastructure work for you. But there are still important ideas to grasp — keeping secret keys out of your code, configuring the application differently for development versus production, and ensuring it restarts if it crashes. Understanding that deployment is a distinct stage with its own concerns, rather than an afterthought, helps you build applications that are actually usable by others. It is the final bridge from 'code that runs for me' to 'a service other people can rely on', and it is a natural place to want experienced guidance."),

  h2("Where back-end beginners actually get stuck"),
  mli(["Not internalising the request-response cycle as the core of everything."]),
  mli(["Expecting server code to behave like browser code, and being confused when it does not."]),
  mli(["Struggling with routing — not seeing the server as a collection of route handlers."]),
  mli(["Finding middleware baffling instead of a request-processing pipeline."]),
  mli(["Underestimating authentication and security, and copying insecure patterns."]),

  h2("How to learn back-end development"),
  mli(["Anchor everything to the request-response cycle: request in, code runs, response out."]),
  mli(["Treat Node.js as the JavaScript you know, running on a server with new powers."]),
  mli(["Learn routing as matching requests to handlers by method and path."]),
  mli(["Understand middleware as a pipeline each request flows through."]),
  mli(["Learn authentication and security patterns properly, given the stakes."]),

  h2("Make the server side make sense"),
  linked(["If the back end feels like a black box — requests, routes, middleware, tokens all blurring together — that is completely normal for someone crossing over from front-end work, and it clears up remarkably fast once the request-response model is solid. Our ", { text: "web development tutoring in Burnaby and online", href: P }, " builds your understanding from the cycle outward, working through a real server you are trying to build rather than abstract theory."]),
  linked(["Start with a free, no-pressure conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us what is confusing about the server side, and we will show you the model that makes it click — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring is right for you."]),
];

/* ================= 3. DATABASE ================= */
const database = [
  p("Your application works, but every time it restarts, all the data vanishes — the users, the posts, everything. This is the moment beginners realise they need a database, and it is often where a promising project stalls, because databases introduce a whole new set of concepts that feel intimidating from the outside. They are more approachable than they look, and understanding a few core ideas turns the database from a scary black box into a tool you can reason about."),
  p("Database management is how an application stores data permanently, so it survives restarts and is available to every user. This guide covers how modern databases like MongoDB and Firebase work, the crucial difference between document and relational databases, and the concepts that make data storage make sense, so your application can finally remember things."),

  h2("Why applications need a database at all"),
  p("The first thing to understand is what problem a database solves. Code running in memory forgets everything when it stops — that is fine for calculations, but useless for anything a user expects to persist. A database is a program dedicated to storing data reliably on disk, organising it so it can be searched and retrieved quickly, and letting many users access it safely at once. Those three jobs — persistence, fast retrieval, safe shared access — are harder than they sound, which is why databases are specialised tools rather than something you build yourself."),
  p("Recognising that a database exists to do these specific difficult things makes it far less mysterious. You are not learning arbitrary complexity; you are learning a tool that solves real, hard problems you would otherwise have to solve badly on your own. Every feature of a database — its query language, its indexes, its guarantees — exists to serve persistence, speed, or safe concurrent access. Keeping those three purposes in mind gives you a framework for understanding why databases work the way they do, which is far more useful than memorising commands."),

  h2("Documents versus tables: the fundamental split"),
  p("The single most important thing to understand about modern databases is that there are two major families, and they organise data differently. Relational databases (SQL) store data in tables of rows and columns, like a set of connected spreadsheets, with a fixed structure. Document databases (NoSQL, like MongoDB) store data as flexible documents that look essentially like JSON — the same format used everywhere in JavaScript."),
  code("// A MongoDB document -- nested, flexible, JSON-like:\n{\n  name: \"Ada\",\n  hobbies: [\"chess\", \"math\"],\n  address: { city: \"Burnaby\", province: \"BC\" }\n}"),
  p("The document model feels natural to JavaScript developers because a document is basically a JavaScript object — it can nest arrays and objects directly, without splitting data across multiple tables. This is why MongoDB and Firebase are popular for JavaScript projects. Understanding this split — rigid tables with a fixed schema versus flexible, nested documents — is the foundation for every database decision you will make, because the two families suit different problems and thinking clearly about which fits your data is a genuine skill."),

  h2("When to choose which"),
  p("The natural question is which family to use, and the answer depends on your data, not on which is 'better'. Document databases shine when your data is naturally nested and your structure may evolve — a user profile with varying fields, content that differs from item to item. Their flexibility lets you move fast, especially early in a project when the shape of your data is still changing."),
  p("Relational databases shine when your data has clear, consistent structure and many relationships that must stay perfectly consistent — financial records, inventory, anything where a fixed schema and strong guarantees matter more than flexibility. The mistake beginners make is treating this as a matter of fashion rather than fit; the right choice comes from understanding your data's shape and how it will be used. Being able to reason about that trade-off, rather than defaulting to whatever a tutorial used, is exactly the kind of judgement that separates a developer who understands databases from one who merely operates one."),
  linked(["Choosing and structuring a database is a decision beginners often get stuck on for weeks, second-guessing themselves — and it is a fast conversation with someone experienced. Our ", { text: "web development tutoring", href: P }, " can help you pick the right database for your actual project and design it well, saving you from a painful restructure later."]),

  h2("Modelling data well: the skill that matters most"),
  p("Whatever database you choose, the skill that determines whether your application is fast and maintainable or slow and painful is data modelling — deciding how to structure and organise your information. This is genuinely the hardest and most important database skill, and it is where good decisions early save enormous pain later. It means thinking about what data you have, how the pieces relate, and how you will need to retrieve them."),
  p("Beginners often model data thoughtlessly and pay for it when their application grows — queries become slow, updates become error-prone, the same information ends up stored in several places and drifts out of sync. Learning to model data deliberately, thinking ahead about how it will be accessed, is a skill that pays dividends throughout a project's life. It rewards experience and good judgement, which is exactly why it is one of the most valuable things to learn from someone who has designed real databases rather than discovering the pitfalls the hard way."),

  h2("Firebase and the managed approach"),
  p("Firebase deserves special mention because it takes a different approach that many beginners find empowering. Rather than running your own database and server, Firebase is a managed platform that handles the infrastructure for you, providing a database, authentication and hosting through simple tools. This lets a solo developer or small team build a full application without managing servers, which is why it is popular for getting projects off the ground quickly."),
  p("The trade-off, and the thing worth understanding, is that convenience comes with less control and a dependence on the platform. For learning, for prototypes and for many real applications, that is an excellent trade; for others, running your own database gives flexibility Firebase cannot. Knowing that managed platforms like Firebase exist, and understanding what you gain and give up by using them, lets you make an informed choice rather than either avoiding them out of fear or adopting them without understanding the implications. That informed judgement is what good guidance provides."),

  h2("Querying: getting your data back out"),
  p("Storing data is only half the job; the other half is retrieving exactly what you need, quickly, and this is where queries come in. A query is a request to the database — 'give me all users in Burnaby', 'find the most recent ten posts', 'count the completed orders'. Learning to query effectively is a core skill, because an application constantly asks its database questions, and how you ask affects how fast the answer comes."),
  p("This is where a concept called indexing becomes important, and it explains a mystery beginners often hit: why a query that was instant with a hundred records crawls with a million. An index is like the index of a book — it lets the database jump straight to what you want instead of scanning everything. Without the right indexes, queries that felt fine in testing become painfully slow in production. Understanding that queries should be designed with retrieval speed in mind, and that indexes are the main tool for that, is what keeps an application responsive as its data grows. It is a great example of a database idea that is invisible until it hurts, and much better learned before that happens."),

  h2("Keeping data safe: backups and integrity"),
  p("Because a database holds the information an application cannot function without, protecting it is a responsibility beginners often do not think about until a disaster teaches them to. Data can be lost to a mistake, a bug, or a hardware failure, and without backups, that loss is permanent and potentially catastrophic. A professional habit is regular, tested backups — tested, because a backup you have never restored from is only a hope, not a guarantee."),
  p("Beyond backups, there is data integrity — ensuring the data stays correct and consistent. This means validating data before it goes in, so bad values do not corrupt your store, and structuring things so related data cannot drift into contradiction. These concerns feel less exciting than building features, but they are what separates a hobby project from something trustworthy. Understanding that a database needs protecting, and building good habits around backups and validation early, is the kind of professionalism that is far easier to learn as a habit from the start than to bolt on after a painful loss."),

  h2("Where database beginners actually get stuck"),
  mli(["Not understanding why a database is needed, or what specific problems it solves."]),
  mli(["Confusing document (NoSQL) and relational (SQL) databases, or choosing by fashion."]),
  mli(["Modelling data thoughtlessly, then paying for it as the application grows."]),
  mli(["Storing the same data in several places and letting it drift out of sync."]),
  mli(["Adopting a managed platform without understanding the trade-offs."]),

  h2("How to learn database management"),
  mli(["Keep the three jobs in mind: persistence, fast retrieval, safe shared access."]),
  mli(["Understand the document-versus-relational split, and choose by data shape."]),
  mli(["Invest in data modelling — it is the skill that determines everything downstream."]),
  mli(["Avoid duplicating data; structure it so each fact lives in one place."]),
  mli(["Understand what managed platforms like Firebase give you and cost you."]),

  h2("Design your data the right way"),
  linked(["If your project needs to store data and you are unsure how to structure it — or which database even to use — that uncertainty is completely normal and genuinely worth resolving early, because a poorly-modelled database is painful to fix later. Our ", { text: "web development tutoring in Burnaby and online", href: P }, " helps you choose and design a database that fits your real application, so it stays fast and manageable as it grows."]),
  linked(["A free conversation is the easiest way to start. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", describe the data your app needs to store, and we will help you see the right structure — online across Metro Vancouver, or in person in Burnaby. If you do not need tutoring, we will tell you honestly."]),
];

/* ================= 4. APIs ================= */
const apis = [
  p("You want your app to show live weather, accept payments, log in with Google, or let its own front end talk to its own back end — and you keep hearing that you need an 'API', but every explanation assumes you already know what that means. APIs are the connective tissue of the modern web, and not understanding them is one of the biggest things holding back learners who otherwise know how to code. The good news is that the core idea is simple once someone explains it plainly."),
  p("An API — application programming interface — is a defined way for two pieces of software to talk to each other. This guide covers how web APIs work, the REST conventions and HTTP methods that structure them, and how to both use other people's APIs and build your own, so the connected, service-driven modern web finally makes sense."),

  h2("What an API actually is"),
  p("Strip away the jargon and an API is just a contract: a defined set of requests one program can make to another, and the responses it will get back. When your weather app shows the forecast, it is making a request to a weather service's API and displaying the response. When you 'log in with Google', your app is talking to Google's API. The API is the agreed-upon menu of what you can ask for and what you will receive."),
  p("This is genuinely one of the most empowering concepts in all of web development, because it means you do not have to build everything yourself. Need maps? Use a maps API. Payments? A payments API. Your own front end talking to your own back end? That connection is an API too. Understanding that an API is simply a well-defined way to request something from another program, and get a structured answer back, unlocks the entire ecosystem of services the modern web is built on. It is the idea that turns you from someone who builds isolated apps into someone who assembles powerful applications from connected parts."),

  h2("HTTP methods: the verbs of the web"),
  p("Web APIs communicate over HTTP, the same protocol your browser uses, and HTTP has a small set of methods — verbs — that express what you want to do. Learning these four is most of what you need, because they map neatly onto the things you do with any data."),
  code("GET    /users      -> read (fetch the list of users)\nPOST   /users      -> create (add a new user)\nPUT    /users/5    -> update (change user 5)\nDELETE /users/5    -> remove (delete user 5)"),
  p("GET reads data, POST creates it, PUT updates it, DELETE removes it. This is the entire vocabulary of most APIs, and its consistency is what makes APIs learnable: once you know the four verbs, you can guess how a new API probably works. This maps onto the fundamental operations you perform on any collection of data — create, read, update, delete — which is why the pattern appears everywhere. Understanding that an API request is a verb plus a target ('read the users', 'delete user 5') makes both using and building APIs far more intuitive."),

  h2("REST: the conventions that make APIs predictable"),
  p("Most modern web APIs follow a style called REST, which is less a strict technology than a set of sensible conventions for organising an API so it is predictable. The core ideas are that everything is a resource with a logical address (a URL), that you act on those resources with the standard HTTP verbs, and that each request is self-contained — carrying everything the server needs, because the server remembers nothing between requests."),
  p("That last point, statelessness, is important and worth understanding: because each request stands alone, APIs scale well and behave predictably, but it also means every request must include its own context, such as who is making it. REST's real value is consistency — when APIs follow the same conventions, learning a new one is quick because it works like the others you know. Grasping REST as 'resources at URLs, acted on with HTTP verbs, one self-contained request at a time' gives you a template for understanding the vast majority of APIs you will ever encounter."),
  linked(["APIs are the concept that most often stands between a learner and building genuinely useful applications — and they click fast with a clear explanation and a real example of calling one. If 'you need an API' has been a source of quiet confusion, our ", { text: "web development tutoring", href: P }, " can make the whole model clear in a single focused session, working from an API you actually want to use."]),

  h2("JSON: the language APIs speak"),
  p("APIs need a shared format for the data they exchange, and that format is almost always JSON — the same JavaScript-object-like structure that appears throughout web development. When you request data from an API, you get back JSON; when you send data, you send JSON. Its ubiquity is a gift, because it means one simple, readable format works across virtually every API and language."),
  code("// A typical JSON response from an API:\n{\n  \"user\": \"ada\",\n  \"score\": 95,\n  \"active\": true\n}"),
  p("JSON is human-readable, maps directly onto the objects and arrays you already use in JavaScript, and is supported everywhere, which is why it won out as the web's data-exchange format. For a beginner, the reassuring news is that if you understand JavaScript objects, you already understand JSON — it is essentially the same thing as text. Knowing that APIs speak JSON, and that JSON is just structured data you can read and work with easily, removes much of the mystery from how programs actually exchange information across the internet."),

  h2("Building your own API"),
  p("Once you can use other people's APIs, the natural next step is building your own — which is exactly what a back end does when it serves your front end. Your own API is the set of routes your server exposes, following the same REST conventions and HTTP verbs, returning JSON. Everything from the back-end and REST concepts comes together here: you are creating the contract that your front end, or other developers, will use to talk to your application."),
  p("This is where full-stack development truly connects — your front end makes API requests, your back end answers them, and JSON flows between them. Designing a good API, with sensible resources, correct HTTP verbs and clear responses, is a real skill that makes your application pleasant to build on and easy for others to use. It also involves handling errors properly, using the right status codes so that callers know whether a request succeeded, was rejected as invalid, or hit a server problem. Learning to design and build clean APIs is one of the most valuable and marketable skills in web development, and one where good guidance dramatically accelerates progress."),

  h2("API keys, authentication and limits"),
  p("Once you start using and building real APIs, you meet the practical realities of controlling access, and they puzzle beginners who have only seen open examples. Most useful APIs require an API key — a unique identifier that says who is making the request — so the provider can track usage and prevent abuse. Learning to use keys correctly, and crucially to keep them secret rather than exposing them in front-end code where anyone can steal them, is an early and important lesson."),
  p("APIs also commonly enforce rate limits, capping how many requests you can make in a period, which is why an integration that worked in testing can suddenly start failing under real use. And APIs that handle private data require proper authentication, so only authorised callers can access it. These practical concerns — keys, limits, authentication — are where using APIs moves from the tutorial world to the real one, and they are exactly the kind of thing that causes confusing failures for beginners working alone. Knowing they exist, and how to handle them properly, turns baffling errors into understood, manageable steps."),

  h2("Where API beginners actually get stuck"),
  mli(["Not understanding what an API fundamentally is — a defined request-and-response contract."]),
  mli(["Confusing the HTTP verbs, or not seeing them as create/read/update/delete."]),
  mli(["Finding REST abstract rather than a set of predictable conventions."]),
  mli(["Being intimidated by JSON, not realising it is just structured data they already know."]),
  mli(["Building APIs without proper error handling or correct status codes."]),

  h2("How to learn APIs and integration"),
  mli(["Hold the core idea: an API is a defined way to request something and get a structured answer."]),
  mli(["Learn the four HTTP verbs as create, read, update, delete."]),
  mli(["Understand REST as resources at URLs, acted on with verbs, one self-contained request each."]),
  mli(["Get comfortable with JSON — it is the JavaScript objects you already know."]),
  mli(["Practise both calling existing APIs and building your own with clean responses."]),

  h2("Unlock the connected web"),
  linked(["If APIs have been the thing standing between you and building genuinely useful, connected applications, you are closer than you think — the model is simple once it is explained clearly, and then a whole world of services opens up. Our ", { text: "web development tutoring in Burnaby and online", href: P }, " makes APIs concrete by working through real examples, both calling existing APIs and building your own, so you can finally assemble the applications you have been picturing."]),
  linked(["See how quickly it clicks, for free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us what you are trying to connect or build, and we will show you the API concepts that make it possible — online across Metro Vancouver, or in person in Burnaby. Honest guidance included on whether tutoring fits your goals."]),
];

await applyPost({ slug: "web-development-frontend-development-html-css-react", was: 445, body: frontend, siblingSlugs: SIBS.filter((s) => s !== "web-development-frontend-development-html-css-react") });
await applyPost({ slug: "web-development-backend-development-node-js-express", was: 397, body: backend, siblingSlugs: SIBS.filter((s) => s !== "web-development-backend-development-node-js-express") });
await applyPost({ slug: "web-development-database-management-mongodb-firebase", was: 391, body: database, siblingSlugs: SIBS.filter((s) => s !== "web-development-database-management-mongodb-firebase") });
await applyPost({ slug: "web-development-api-development-integration", was: 403, body: apis, siblingSlugs: SIBS.filter((s) => s !== "web-development-api-development-integration") });
