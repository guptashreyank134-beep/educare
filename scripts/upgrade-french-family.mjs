/**
 * French family: conversational/pronunciation, reading-writing-listening,
 * grammar-vocabulary-sentence-formation. Distinct angles, lead-gen, distinct CTAs.
 * Language content kept simple and correct (no code/math to verify numerically).
 */
import { applyPost, key, p, h2, h3, li, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["french-conversational-french-pronunciation", "french-reading-writing-listening-practice", "french-grammar-vocabulary-sentence-formation"];
const P = "/programs/french";
const ex = (fr, en) => ({ _type: "htmlBlock", _key: key(), html: `<div style="background:#f1f5f9;border-left:4px solid #3A5A98;padding:0.85rem 1.1rem;border-radius:0 8px 8px 0;margin:1.25rem 0;font-size:15px;"><span style="font-weight:600;color:#1f2937;">${fr}</span> <span style="color:#64748b;">— ${en}</span></div>` });

/* ============ 1. CONVERSATIONAL & PRONUNCIATION ============ */
const conversation = [
  p("You have studied French for months, you can read it and do the grammar exercises, but the moment a real French speaker talks to you, your mind goes blank and nothing comes out. This is one of the most common and frustrating experiences in learning French, and it has almost nothing to do with how much you know. Speaking is a separate skill from studying, and pronunciation and conversation are where most learners get stuck — not for lack of knowledge, but for lack of the right kind of practice. Understanding that is the first step to actually speaking."),
  p("Conversational French and good pronunciation are the goals most learners care about most, and also the ones traditional study neglects. This guide covers why French pronunciation works the way it does, how to build the confidence to actually speak, and the practical path from silent studier to genuine conversationalist."),

  h2("Why French sounds so different from how it looks"),
  p("The first shock for English speakers is that French is not pronounced the way it is spelled — at least not by English rules. French has its own consistent system, and once you learn it, French spelling actually becomes quite predictable. The biggest single rule: final consonants are usually silent. The word for 'and its friends' ends in letters you simply do not say, which is why French sounds so much smoother than it looks on the page."),
  ex("Comment allez-vous ?", "How are you? (formal)"),
  p("Silent final letters, nasal vowels that have no English equivalent, and the characteristic French 'r' made in the back of the throat are the features that make French sound French — and the features learners most need to practise deliberately. The good news is that French pronunciation, unlike English, is genuinely rule-based: once you internalise the patterns, you can pronounce words you have never seen. Learning these sound patterns early, rather than importing English habits, is the foundation of sounding natural and, just as importantly, of being understood."),

  h2("Liaison: why French flows together"),
  p("One reason spoken French can be hard to follow — and hard to produce — is liaison, the way words link together so that a normally-silent final consonant is pronounced when the next word begins with a vowel. This is why a phrase can sound like one long word rather than separate pieces, and why learners who know every word individually still cannot parse or produce fluent speech."),
  p("Liaison is a large part of what gives French its smooth, connected sound, and understanding it transforms both your listening and your speaking. When you know that words are meant to flow into each other, spoken French stops sounding impossibly fast and starts resolving into recognisable pieces. And when you apply liaison yourself, your own speech immediately sounds far more natural and fluent. It is one of those features that is rarely taught explicitly but makes an enormous difference, and it rewards focused attention with a big, quick improvement in how French you sound."),

  h2("The real barrier is confidence, not knowledge"),
  p("Here is the truth about conversational French that most courses will not tell you: the biggest obstacle is not vocabulary or grammar, it is the fear of making mistakes and speaking anyway. Learners who wait until they feel 'ready' to speak never start, because that feeling never fully arrives. The ones who become conversational are the ones who accept that they will make errors and speak regardless — because speaking is a skill, and skills only develop through doing."),
  p("This matters enormously for how you should learn. Silent study builds knowledge you cannot access when it counts; speaking practice builds the ability to actually produce French in real time. The single most valuable thing a French learner can do is speak early and often, even badly, ideally with someone who can gently correct and encourage. This is exactly why conversation-focused practice with a patient teacher accelerates spoken French so dramatically — it targets the real barrier, which is confidence and access, not knowledge. Overcoming the fear of speaking is the turning point in becoming conversational."),
  linked(["If you can read and study French but freeze when it is time to actually speak, that is the single most common plateau in language learning — and the fix is guided speaking practice, not more silent study. Our ", { text: "French tutoring", href: P }, " gives you a patient conversation partner who corrects gently and builds your confidence to speak for real."]),

  h2("Building conversational ability step by step"),
  p("Becoming conversational follows a learnable progression, and knowing it helps you practise the right things. It starts with the survival phrases — greetings, courtesies, simple questions — that let you begin any interaction. From there, you build the ability to talk about yourself and your immediate world, then to ask and answer questions, then to handle the unexpected turns a real conversation takes."),
  ex("Je voudrais un café, s'il vous plaît.", "I would like a coffee, please."),
  p("The key is that each stage is practised through actual use, not just study. You learn to handle a conversation by having conversations, gradually widening what you can discuss and improving how smoothly you can do it. Along the way, learning strategies for when you get stuck — asking someone to repeat, rephrasing, filling gaps gracefully — is what lets a conversation keep going even when your French is imperfect. These practical conversational skills, distinct from textbook knowledge, are what turn a studier into a speaker, and they develop fastest with real, guided practice."),

  h2("Tu or vous: getting the register right"),
  p("A feature of French with no direct English equivalent is that there are two ways to say 'you' — the informal tu and the formal vous — and choosing correctly is part of speaking appropriately. You use tu with friends, family, children and peers, and vous with strangers, elders, in professional settings, and to show respect. Getting this wrong is rarely disastrous, but it is noticeable, and understanding the distinction is part of sounding like a competent speaker rather than a textbook."),
  p("For learners, the safe default with anyone you do not know is vous, and you can shift to tu when the relationship warrants it, often at the other person's invitation. This social dimension of French — knowing not just the words but the appropriate register for the situation — is something that pure vocabulary study cannot teach, because it depends on context and culture. Developing a feel for when to use tu and vous, and for the levels of formality French speakers navigate, is part of becoming genuinely conversational, and it is exactly the kind of practical, cultural knowledge that comes from real conversation practice with someone who knows the language as it is actually spoken."),

  h2("The false friends that trip English speakers"),
  p("English and French share thousands of similar words, which is a huge advantage — but it comes with a trap. Some words look identical or nearly so, yet mean something different, and these 'false friends' catch learners constantly. Relying on a word looking English and assuming it means the same thing leads to genuine misunderstandings, sometimes embarrassing ones, and they are worth learning to watch for."),
  ex("Je suis excité(e)", "does NOT safely mean 'I'm excited' — it can imply arousal"),
  p("The classic examples are words that seem obvious but carry a different meaning in French, and part of learning the language well is becoming aware of the common ones. The broader lesson is not to trust surface similarity too much — the shared vocabulary is a gift, but it needs a little caution. Learning the frequent false friends, and developing the habit of checking rather than assuming when a word seems suspiciously English, prevents a category of mistake that even fairly advanced learners keep making. It is the kind of practical knowledge that a teacher flags at exactly the right moment, saving you from learning it the embarrassing way."),

  h2("Where French learners actually get stuck with speaking"),
  mli(["Applying English pronunciation rules instead of French's consistent system."]),
  mli(["Not understanding liaison, so fluent speech is impossible to parse or produce."]),
  mli(["Waiting to feel 'ready' to speak, which never happens."]),
  mli(["Studying silently, building knowledge they cannot access in real time."]),
  mli(["Fearing mistakes so much that they avoid speaking altogether."]),

  h2("How to become conversational in French"),
  mli(["Learn French's pronunciation patterns rather than importing English habits."]),
  mli(["Study liaison to unlock both understanding and natural-sounding speech."]),
  mli(["Speak early and often, accepting that mistakes are part of learning."]),
  mli(["Practise through real conversation, not just silent study."]),
  mli(["Build strategies for keeping a conversation going when you get stuck."]),

  h2("Find your voice in French"),
  linked(["If speaking French terrifies you despite all your studying, you do not need more grammar — you need guided practice with someone patient, which is exactly how the fear dissolves and real conversation begins. Our ", { text: "French tutoring in Burnaby and online", href: P }, " centres on speaking and pronunciation, giving you the confidence and the conversation practice that silent study never can."]),
  linked(["The first step is a free, relaxed conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where your spoken French is stuck, and we will show you the path to speaking with confidence — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

/* ============ 2. READING, WRITING & LISTENING ============ */
const rwl = [
  p("You can hold a basic French conversation, but faced with a French article you understand only fragments, French audio sounds like an impossibly fast blur, and writing anything beyond a simple sentence fills you with doubt. If speaking is one wall in learning French, reading, writing and listening are the others — and they are the skills that separate someone who can 'get by' from someone with genuine command of the language. The encouraging news is that each of these skills responds to specific, learnable techniques."),
  p("Reading, writing and listening are the three skills that build deep French competence beyond basic conversation, and each has its own methods. This guide covers how to develop all three efficiently — how to read for growth, listen through the speed, and write with confidence — so your French becomes complete rather than lopsided."),

  h2("Reading: your fastest route to fluency"),
  p("Reading is quietly the most powerful tool for building French, because it exposes you to enormous amounts of correct language — vocabulary, grammar, and natural phrasing — all in context, at your own pace. Unlike a live conversation, a text waits for you, so you can absorb how French actually works without pressure. Learners who read regularly build vocabulary and internalise grammar patterns far faster than those who only study rules."),
  p("The key is reading at the right level: material challenging enough to teach you something but easy enough to follow, so you are stretched without being overwhelmed. The temptation to look up every unknown word is worth resisting; often you can infer meaning from context, and this guessing skill is itself valuable. Starting with simpler texts and graded readers, then progressing to authentic material — news, stories, whatever genuinely interests you — builds both vocabulary and an intuitive feel for the language. Reading widely and regularly is one of the highest-return habits in all of language learning, and it is something you can do independently every day."),

  h2("Listening: training your ear for real speed"),
  p("Listening is the skill learners most often find discouraging, because real French — spoken at natural speed, full of liaison and contractions — can sound like an unbroken wall of sound even when you know the words. This is completely normal, and it is not a sign of failure; it is a sign that your ear has not yet been trained to the speed and connectedness of natural speech. The gap between the careful French of a textbook and the rapid French of real life catches everyone."),
  p("The solution is consistent, deliberate exposure to authentic French audio — podcasts, videos, music, anything spoken at natural speed. At first you will understand little, and that is expected; comprehension builds gradually as your ear adjusts. Listening to material slightly above your level, using subtitles as a bridge and then weaning off them, and re-listening to the same content are all effective techniques. The crucial mindset is patience: listening comprehension improves slowly but steadily with exposure, and the day real French suddenly starts resolving into words is one of the most satisfying moments in learning the language. It rewards persistence more than any other skill."),
  linked(["If French audio still sounds like a blur, or reading leaves you drowning in a dictionary, those are specific problems with specific techniques — and a good teacher can hand you the methods and the right-level material directly. Our ", { text: "French tutoring", href: P }, " builds your reading and listening efficiently, so your comprehension grows instead of stalling."]),

  h2("Writing: where accuracy is built"),
  p("Writing is where you consolidate everything you know about French and where errors become visible and fixable. Unlike speaking, writing gives you time to think, to apply grammar rules deliberately, and to notice what you do not actually know. This makes it a powerful learning tool as well as a skill in its own right — the act of composing French forces you to confront gaps that reading and listening let you skate over."),
  p("Effective writing practice progresses from simple, correct sentences to longer, more complex texts, with attention to the specific challenges French poses — agreement of adjectives, verb conjugations, the right connecting words. Crucially, writing benefits enormously from feedback: it is very hard to improve your writing without someone showing you your recurring errors, because you cannot see the mistakes you do not know you are making. This is one of the areas where a teacher's correction is most valuable, turning writing from a source of anxiety into a systematic way of building accuracy. Regular writing with feedback is how the vague sense of 'I think this is right' becomes genuine confidence."),

  h2("Active versus passive: making exposure count"),
  p("A crucial distinction that separates learners who improve quickly from those who plateau is the difference between passive and active engagement. Passively letting French wash over you — half-listening to a podcast while doing something else, skimming a text — produces slow results. Active engagement — genuinely trying to understand, noticing new words, pausing to work out a difficult sentence — produces fast ones. The same hour of French exposure can be nearly wasted or highly productive depending on how you engage with it."),
  p("This means quality of attention matters as much as quantity of exposure. Reading a shorter text closely, and truly understanding it, beats skimming a long one. Listening to a short clip several times until it makes sense beats hearing hours of French you never quite parse. Techniques like noting down useful new words and phrases you encounter, and coming back to review them, turn passive exposure into active learning. Understanding that engaged, attentive practice is what drives progress — and structuring your reading and listening to be active rather than passive — is one of the most impactful adjustments a learner can make, and it explains why guided practice, which keeps you actively engaged, works so well."),

  h2("The role of immersion, real or simulated"),
  p("The reason people who move to a French-speaking region often improve so fast is immersion — being surrounded by the language so that you are constantly reading, listening, and needing to respond. Immersion works because it provides the sheer volume of engaged exposure that the skills require, and because it forces active use rather than passive study. But you do not have to move to France to benefit from its principles."),
  p("You can build a degree of immersion wherever you are: changing your phone's language to French, following French media and creators you genuinely enjoy, listening to French music and podcasts during daily routines, reading French content on topics you already care about. The goal is to weave French into your life so that exposure happens regularly and naturally, not just in dedicated study sessions. Simulated immersion, combined with the active-engagement mindset above, dramatically accelerates all three receptive and productive skills. Building French into your everyday environment, so the language becomes a constant presence rather than an occasional task, is one of the most powerful things you can do to make steady, compounding progress."),

  h2("How the four skills reinforce each other"),
  p("The most important insight for building complete French is that the skills are not separate silos — they feed each other. Reading builds the vocabulary and structures you draw on when writing and speaking. Listening trains the ear that makes conversation possible. Writing consolidates the grammar that makes all your French more accurate. A learner who develops all four together progresses far faster than one who focuses narrowly on just speaking or just grammar."),
  p("This is why a balanced approach works best: reading widely, listening regularly, writing with feedback, and speaking often, all reinforcing one another. Many learners neglect the skills they find harder or less immediately rewarding — often listening and writing — and end up with lopsided French that lets them down in real situations. Developing all four deliberately, with attention to your weaker areas, is what produces genuine, well-rounded command of the language. Understanding how the skills connect helps you build them efficiently, rather than pouring all your effort into one and wondering why your French stays uneven."),

  h2("Where French learners actually get stuck"),
  mli(["Reading material at the wrong level, or looking up every single word."]),
  mli(["Giving up on listening because real French sounds impossibly fast at first."]),
  mli(["Avoiding writing, and so never confronting their real gaps."]),
  mli(["Writing without feedback, repeating the same invisible errors."]),
  mli(["Developing the skills unevenly, ending up with lopsided French."]),

  h2("How to build complete French skills"),
  mli(["Read regularly at a level that stretches you without overwhelming you."]),
  mli(["Expose yourself to authentic audio consistently, and be patient with your ear."]),
  mli(["Write regularly, and get feedback so your errors become visible."]),
  mli(["Use subtitles as a bridge for listening, then wean off them."]),
  mli(["Develop all four skills together, giving extra attention to your weakest."]),

  h2("Build French that actually works"),
  linked(["If your French is lopsided — decent at one skill, weak at others — that unevenness will let you down in real situations, and a structured approach with feedback fixes it faster than solo study. Our ", { text: "French tutoring in Burnaby and online", href: P }, " builds all four skills together, with the feedback on your writing and the right-level material for your reading and listening that make comprehension actually grow."]),
  linked(["Start with a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us which French skills you want to strengthen, and we will show you the most efficient path — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

/* ============ 3. GRAMMAR, VOCABULARY & SENTENCE FORMATION ============ */
const grammar = [
  p("French grammar has a fearsome reputation — genders for every noun, verbs that change their endings constantly, agreement rules that seem endless — and many learners either avoid it or drown in it. Both responses hold you back. Grammar is not an obstacle to communicating in French; it is the structure that makes communication possible, and approached the right way it is far more logical and learnable than its reputation suggests. Understanding grammar as a tool rather than a hurdle changes everything about how you learn French."),
  p("Grammar, vocabulary and sentence formation are the structural foundation of French — the system that lets you build and understand any sentence, not just memorised phrases. This guide covers how to approach French grammar so it makes sense, how to build vocabulary that sticks, and how to form correct sentences with confidence."),

  h2("Grammar is a system, not a list of rules"),
  p("The mistake most learners make with French grammar is treating it as a huge collection of unrelated rules to memorise. It is not; it is a coherent system, and once you see the patterns, much of it follows logically. French, like all languages, has an internal logic, and understanding that logic is far more powerful than memorising isolated rules. When you grasp why French works the way it does, the individual rules stop being arbitrary and start making sense."),
  p("This shift in approach is transformative. Instead of drowning in exceptions, you learn the core patterns and how they extend, which makes the whole language feel manageable rather than overwhelming. Grammar approached as understanding rather than memorisation also sticks far better, because understood patterns are remembered while memorised lists fade. This is exactly the kind of conceptual, pattern-based learning that a good teacher provides and that self-study from grammar tables often misses. Seeing French grammar as a logical system is the single most important reframe for anyone who finds it intimidating."),

  h2("Gender and agreement: the pattern behind the fear"),
  p("The feature English speakers find strangest is that every French noun has a gender — masculine or feminine — and that this gender ripples out to affect the words around it. Articles, adjectives and more must 'agree' with the noun's gender and number. This causes anxiety, but it follows consistent patterns, and much of it can be learned by absorbing gender along with each noun rather than as a separate fact."),
  ex("le petit chat / la petite maison", "the small cat (m.) / the small house (f.)"),
  p("Notice how the adjective changes form to agree — this is the agreement system in miniature, and it is regular enough to become automatic with practice. The practical advice is to learn every noun together with its article, so that its gender is part of how you remember the word, not an afterthought. Agreement then becomes a pattern you apply rather than a rule you anxiously recall. Understanding that gender and agreement form a consistent, learnable system — rather than a minefield of arbitrary choices — removes much of the fear this feature provokes."),

  h2("Verbs: the engine of French"),
  p("Verbs are where much of French grammar's complexity lives, because French verbs change their endings depending on who is doing the action and when. This conjugation system is substantial, but it is also highly patterned: most verbs fall into regular groups that follow predictable rules, and mastering those patterns lets you conjugate huge numbers of verbs correctly."),
  ex("je parle, tu parles, il parle, nous parlons", "I speak, you speak, he speaks, we speak"),
  p("The regular patterns cover the majority of verbs, so learning them well is high-leverage; the irregular verbs, while they must be learned individually, are relatively few and are the most common ones you will use constantly, so they stick through sheer repetition. Approaching conjugation by mastering the patterns first, then absorbing the key irregular verbs through use, makes what looks like an impossible amount of memorisation entirely manageable. Verbs are the engine of the language, and a systematic, pattern-based approach to them is one of the best investments a French learner can make."),
  linked(["If French grammar feels like an overwhelming pile of rules and exceptions, the problem is the approach, not your ability — seeing the patterns underneath makes it click, and that is exactly what good teaching provides. Our ", { text: "French tutoring", href: P }, " teaches grammar as a logical system, so it finally makes sense instead of intimidating you."]),

  h2("Tenses: talking about time"),
  p("Beyond conjugating verbs in the present, French uses different tenses to express when something happens — past, present, future — and learning to navigate them is a major step in gaining real expressive power. The good news is that you do not need all of them at once. A small number of core tenses lets you handle the vast majority of everyday communication, and you can add the more specialised ones as you progress rather than confronting them all upfront."),
  ex("j'ai mangé / je mange / je mangerai", "I ate / I eat / I will eat"),
  p("French has a couple of past tenses that English speakers must learn to distinguish — one for completed actions and one for ongoing or habitual past situations — and understanding the difference in meaning, rather than just the forms, is what lets you use them correctly. Approaching tenses by mastering the most useful ones first, and understanding what each one actually expresses about time, makes the system far less daunting than a full conjugation table suggests. Being able to place your ideas correctly in time — to say not just what happens but what happened and what will happen — is essential to expressing yourself fully, and it develops naturally once you have the core patterns and use them in real sentences."),

  h2("Vocabulary that actually sticks"),
  p("Building vocabulary is essential — you cannot express ideas without words — but how you build it matters enormously. Memorising long lists of isolated words is inefficient and forgettable; words learned in context, in phrases and sentences, stick far better because they come with the information about how they are actually used. Learning a word inside a useful phrase gives you not just its meaning but its grammar and its natural companions."),
  p("Effective vocabulary building also uses the power of spaced repetition — reviewing words at increasing intervals so they move into long-term memory — and prioritises the most useful words first, since a relatively small core vocabulary covers most everyday communication. French also offers English speakers a gift: thousands of words are similar in both languages, giving you a large vocabulary you partly already know. Building vocabulary strategically, in context and by frequency rather than in random lists, is what turns vocabulary from a memorisation chore into steady, durable growth that directly expands what you can say."),

  h2("Sentence formation: putting it together"),
  p("Grammar and vocabulary come together in sentence formation — the ability to construct your own correct sentences to say exactly what you mean, rather than relying on memorised phrases. This is the real goal, because it is generative: once you can build sentences from the system, you can express an infinite range of ideas, not just the ones you have rehearsed. French word order mostly follows patterns familiar from English, with some important differences, such as where certain adjectives and pronouns go."),
  p("Learning to form sentences is where all the pieces connect: you take your vocabulary, apply the grammar for agreement and conjugation, arrange the words correctly, and produce original French. This ability develops through practice — building sentences, getting them corrected, and gradually handling more complex structures. It is deeply empowering, because it is the difference between reciting phrases and genuinely speaking the language. Developing the capacity to form your own correct sentences, confidently and increasingly automatically, is the true measure of French competence, and it is exactly what a systematic, well-guided approach to grammar and vocabulary is building toward."),

  h2("Where French learners actually get stuck with grammar"),
  mli(["Treating grammar as isolated rules rather than a coherent, logical system."]),
  mli(["Fearing gender and agreement instead of learning them as consistent patterns."]),
  mli(["Trying to memorise every verb instead of mastering the regular patterns first."]),
  mli(["Memorising vocabulary in isolated lists rather than in context."]),
  mli(["Relying on memorised phrases instead of learning to form original sentences."]),

  h2("How to master French grammar and vocabulary"),
  mli(["Approach grammar as a logical system, learning core patterns and how they extend."]),
  mli(["Learn each noun with its article, so gender becomes automatic."]),
  mli(["Master the regular verb patterns, then absorb key irregulars through use."]),
  mli(["Build vocabulary in context and by frequency, using spaced repetition."]),
  mli(["Practise forming your own sentences, with feedback, until it becomes automatic."]),

  h2("Make French grammar finally make sense"),
  linked(["If French grammar overwhelms you, you do not need to memorise harder — you need to see the system underneath, and that is exactly what turns intimidation into understanding. Our ", { text: "French tutoring in Burnaby and online", href: P }, " teaches grammar and sentence formation as a logical, learnable system, so you can build any sentence you want with confidence."]),
  linked(["The first step is free and low-pressure. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us what about French grammar is tripping you up, and we will show you the patterns that make it click — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

await applyPost({ slug: "french-conversational-french-pronunciation", was: 374, body: conversation, siblingSlugs: SIBS.filter((s) => s !== "french-conversational-french-pronunciation") });
await applyPost({ slug: "french-reading-writing-listening-practice", was: 389, body: rwl, siblingSlugs: SIBS.filter((s) => s !== "french-reading-writing-listening-practice") });
await applyPost({ slug: "french-grammar-vocabulary-sentence-formation", was: 399, body: grammar, siblingSlugs: SIBS.filter((s) => s !== "french-grammar-vocabulary-sentence-formation") });
