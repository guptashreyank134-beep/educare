/**
 * Mandarin family (3): conversational/pronunciation (tones), reading-writing-vocab
 * (characters), grammar-listening-cultural. Distinct angles, lead-gen, distinct
 * CTAs. Chinese kept correct (pinyin, tones, characters).
 */
import { applyPost, key, p, h2, h3, li, mli, linked } from "./flagship-lib.mjs";

const SIBS = ["mandarin-conversational-mandarin-pronunciation", "mandarin-reading-writing-vocabulary-building", "mandarin-grammar-listening-cultural-understanding"];
const P = "/programs/mandarin";
const ex = (zh, py, en) => ({ _type: "htmlBlock", _key: key(), html: `<div style="background:#f1f5f9;border-left:4px solid #3A5A98;padding:0.85rem 1.1rem;border-radius:0 8px 8px 0;margin:1.25rem 0;font-size:15px;"><span style="font-weight:600;color:#1f2937;font-size:18px;">${zh}</span> &nbsp;<span style="color:#3A5A98;">${py}</span> <span style="color:#64748b;">— ${en}</span></div>` });

/* ===== 1. CONVERSATIONAL & PRONUNCIATION (TONES) ===== */
const conv = [
  p("If you have started learning Mandarin and feel like you are getting nowhere with speaking — you know words, but native speakers do not understand you, or you cannot make out what they say — you have almost certainly run into the tones. Mandarin is a tonal language, and this one feature, more than any other, is what makes it feel so different and so daunting to English speakers. But tones are learnable, and the learners who master them early are the ones who go on to speak Mandarin well. Understanding how tones and pronunciation actually work is the key to speaking a language that a fifth of the world speaks."),
  p("Conversational Mandarin depends above all on getting the tones and sounds right, because in Mandarin, pronunciation is not a detail — it changes meaning. This guide covers how the tones work, how to build the confidence to speak, and the path from silent studier to genuine conversationalist."),

  h2("Tones change the meaning of the word"),
  p("The single most important thing to understand about Mandarin is that the tone — the pitch pattern with which you say a syllable — is part of the word, not optional expression. Mandarin has four main tones plus a neutral tone, and the same syllable said with different tones is different words entirely. The classic example makes this vivid: 'ma' can mean mother, hemp, horse, or scold, depending purely on the tone."),
  ex("妈 麻 马 骂", "mā má mǎ mà", "mother, hemp, horse, scold"),
  p("This is why English speakers, who use pitch only for emphasis and emotion, find tones so challenging — they are using pitch for a completely new job. Getting a tone wrong does not just sound like an accent; it can produce an entirely different word, which is why native speakers may genuinely not understand a learner who ignores tones. The encouraging news is that tones follow consistent patterns and can absolutely be learned with focused practice. Treating tones as an integral part of every word from the very beginning, rather than an afterthought to add later, is the foundation of speaking Mandarin intelligibly."),

  h2("Pinyin: your bridge to correct pronunciation"),
  p("Learning Mandarin pronunciation is made far more approachable by pinyin, the system that writes Mandarin sounds using the Roman alphabet, with tone marks above the vowels. Pinyin lets you learn to pronounce words and read tones without first having to learn Chinese characters, which is why nearly every learner starts with it. It is a scaffold that makes the sounds accessible from day one."),
  p("The important thing to know is that pinyin's letters do not always sound the way an English speaker expects — several letters represent sounds different from their English values, so learning pinyin means learning what each letter actually represents in Mandarin, not assuming it matches English. Some Mandarin sounds have no English equivalent and need deliberate practice. Using pinyin properly, and learning the true sound each symbol stands for, gives you a reliable guide to pronouncing any word correctly, tones included. It is one of the most valuable early investments a Mandarin learner can make, and it removes much of the guesswork from pronunciation."),

  h2("The four tones, one at a time"),
  p("Breaking the tones down individually makes them far less intimidating. The first tone is high and level, held steady like a sustained musical note. The second tone rises, like the questioning intonation of 'what?' in English. The third tone dips down and then rises again, a falling-then-rising contour. The fourth tone falls sharply, like a firm, emphatic command. The neutral tone is light and quick, with no strong pitch of its own."),
  p("Learning to produce each tone deliberately, and then to recognise it when you hear it, is a skill that builds with focused practice. It helps to exaggerate the tones at first — overdoing the pitch movements until they become natural — because learners tend to under-produce them, leaving their speech ambiguous. The genuine challenge comes when tones combine in real speech, where they flow together and where certain tone combinations shift according to consistent rules. But mastering the individual tones first, so that each is solid on its own, is the foundation. Practising the tones as distinct, producible pitch patterns — rather than a vague notion of 'saying it with the right tone' — is what makes them reliable in actual speech."),

  h2("Beyond tones: the sounds that need practice"),
  p("Tones get the most attention, but Mandarin also has individual sounds that differ from English and need deliberate work. Several consonant sounds, in particular, are produced differently or do not exist in English, and English speakers tend to substitute the nearest English sound, which can make their Mandarin unclear. A handful of vowel sounds and combinations also require practice to produce accurately."),
  p("The practical approach is to identify the specific sounds that are new or difficult for an English speaker and practise them deliberately, rather than assuming Mandarin sounds map onto English ones. Careful listening and imitation of native speakers, ideally with feedback, is how these sounds are acquired, because you must first hear the difference before you can produce it. Combining accurate individual sounds with correct tones is what produces clear, intelligible Mandarin. Neglecting the sounds while focusing only on tones, or vice versa, leaves gaps in pronunciation; attending to both together is what builds speech that native speakers understand easily and that sounds genuinely Mandarin."),

  h2("The real barrier is confidence"),
  p("As with any language, the biggest obstacle to speaking Mandarin is not knowledge but the fear of getting it wrong — and with tones adding an extra layer of self-consciousness, this fear is especially strong. Learners worry about mangling a tone and saying the wrong word, so they hesitate, and hesitation means they never build the speaking skill that only comes from speaking. The learners who become conversational are the ones who accept they will make tone mistakes and speak anyway."),
  p("This is why silent study, however diligent, does not produce a speaker. Speaking Mandarin — producing the tones and sounds in real time — is a physical skill that develops only through use, ideally with someone who can correct your tones gently and encourage you to keep going. Native speakers are generally patient and appreciative with learners who try. The single most valuable thing you can do is speak early and often, tones and all, and let the corrections refine you. Overcoming the fear of speaking, and getting real practice with feedback, is the turning point in becoming conversational."),
  linked(["If you are studying Mandarin but freeze when it is time to speak, or your tones are not landing, guided speaking practice with tone feedback is the fix — not more silent study. Our ", { text: "Mandarin tutoring", href: P }, " gives you a patient conversation partner who corrects your tones and builds the confidence to actually speak."]),

  h2("Building conversational ability step by step"),
  p("Becoming conversational in Mandarin follows a learnable path, and the good news is that Mandarin grammar is relatively simple, so once pronunciation is under control, progress can be quick. It starts with the essential courtesies and simple phrases that let you begin any interaction, spoken with correct tones from the start."),
  ex("你好", "nǐ hǎo", "hello"),
  p("From there you build the ability to talk about yourself, to ask and answer simple questions, and gradually to handle real conversations. Each stage is developed through actual speaking, not just study, with constant attention to tones so that good habits form early rather than bad ones needing correction later. Learning strategies for when you get stuck — asking someone to repeat, rephrasing — keeps a conversation going even when your Mandarin is imperfect. These practical speaking skills, built on a solid foundation of tones and pronunciation, are what turn a studier into a speaker, and they develop fastest with real, guided practice."),

  h2("Where Mandarin learners get stuck with speaking"),
  mli(["Treating tones as optional, so words come out as the wrong words entirely."]),
  mli(["Assuming pinyin letters sound like English, mispronouncing from the start."]),
  mli(["Fear of tone mistakes leading to avoiding speaking altogether."]),
  mli(["Studying silently, building knowledge they cannot produce in real time."]),
  mli(["Leaving tones to 'fix later', letting bad habits set in."]),

  h2("How to become conversational in Mandarin"),
  mli(["Learn the tone of every word as part of the word, from the beginning."]),
  mli(["Use pinyin properly, learning the true Mandarin sound of each symbol."]),
  mli(["Speak early and often, accepting that tone mistakes are part of learning."]),
  mli(["Practise with feedback so your tones are refined in real use."]),
  mli(["Build strategies to keep a conversation going when you get stuck."]),

  h2("Find your voice in Mandarin"),
  linked(["If speaking Mandarin feels impossible because of the tones, you do not need more vocabulary — you need guided practice that trains your ear and voice, which is exactly how the tones stop being a barrier. Our ", { text: "Mandarin tutoring in Burnaby and online", href: P }, " centres on tones, pronunciation and real conversation, building the confidence that silent study never can."]),
  linked(["The first step is a free, relaxed conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us where your spoken Mandarin is stuck, and we will show you the path to speaking with confidence — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will say so honestly."]),
];

/* ===== 2. READING, WRITING & VOCABULARY (CHARACTERS) ===== */
const rwv = [
  p("The moment most learners realise Mandarin is a serious commitment is when they confront the characters — thousands of them, each a small picture to be recognised and written, with no alphabet to fall back on. It is genuinely one of the most distinctive and challenging aspects of learning Mandarin, and it stops many learners in their tracks. But characters are far more logical and learnable than they first appear, and approaching them the right way turns an impossible-looking mountain into a manageable, even fascinating, climb. Understanding how Chinese writing actually works is the key to reading and writing a language with no alphabet."),
  p("Reading, writing and vocabulary in Mandarin all revolve around the characters, and how you approach them determines your progress. This guide covers why characters are more systematic than they look, how to build a durable vocabulary, and how to develop real reading and writing ability — so the writing system becomes a doorway into the language rather than the wall that stops you."),

  h2("Characters are built from components, not memorised whole"),
  p("The mistake that makes characters feel impossible is trying to memorise each one as a random collection of strokes. They are not random. The vast majority of Chinese characters are built from a manageable set of recurring components, including radicals — building blocks that often hint at a character's meaning or sound. Learn these components, and you begin to see characters as combinations of familiar parts rather than unique pictures to memorise from scratch."),
  p("This changes everything about how efficiently you can learn. A radical might tell you a character relates to water, or to speech, or to the heart, giving you a foothold on its meaning; another part might hint at its pronunciation. Understanding this structure means that each new character often contains parts you already know, so your learning accelerates as your knowledge of components grows. Approaching characters systematically — learning the common radicals and components, and seeing how characters are constructed from them — is dramatically more effective than rote memorisation, and it is the single most important shift for anyone daunted by Chinese writing."),

  h2("Building vocabulary that sticks"),
  p("Vocabulary in Mandarin means learning characters, their pronunciations (with tones), and their meanings, and doing it efficiently requires strategy rather than brute force. Learning characters in the context of words and phrases, rather than in isolation, helps them stick, because you absorb how they are actually used. Many Mandarin words are combinations of two characters whose meanings combine logically, so understanding the characters helps you understand and remember the words."),
  p("Spaced repetition — reviewing characters at increasing intervals — is especially powerful for Mandarin, because the sheer number of characters makes durable long-term memory essential, and spaced review is what moves them there reliably. Prioritising the most frequent characters and words first is also key: a few thousand characters cover the vast majority of everyday text, and a smaller core covers most conversation, so frequency-based learning gives you the most useful knowledge fastest. Building vocabulary strategically — in context, by frequency, with spaced repetition — turns the daunting scale of Mandarin vocabulary into steady, compounding progress."),

  h2("Reading: from characters to comprehension"),
  p("Reading Mandarin is a distinct skill that grows as your character knowledge does, and it is one of the most rewarding milestones in learning the language. At first, reading is slow and effortful, decoding character by character, but as recognition becomes automatic, you begin to read for meaning rather than decoding. Starting with simple, level-appropriate texts and progressing gradually is what builds this fluency without overwhelming you."),
  p("Reading is also one of the best ways to reinforce and expand everything else: it consolidates the characters you know, exposes you to new ones in context, and builds a feel for how the language fits together. Graded readers designed for learners, and later authentic material on topics that genuinely interest you, provide the exposure that steadily improves reading ability. The key is consistency and the right level — challenging enough to grow, accessible enough to follow. As your reading develops, a written language that once looked like an impenetrable wall of symbols becomes something you can actually understand, which is a deeply satisfying transformation."),
  linked(["If Chinese characters feel like an impossible mountain, the systematic approach — components, radicals, frequency, and spaced practice — makes them genuinely learnable, and that is exactly what good guidance provides. Our ", { text: "Mandarin tutoring", href: P }, " teaches characters the efficient way and builds your reading and writing steadily."]),

  h2("Writing: reinforcing what you know"),
  p("Writing characters by hand, while less essential in a digital age than it once was, remains a powerful learning tool because the act of writing reinforces memory in a way that recognition alone does not. Physically producing a character — following the correct stroke order, feeling its structure — cements it far more deeply than merely seeing it. Even if you will mostly type Mandarin, learning to write characters strengthens your grasp of them."),
  p("There is a logic to writing, too: characters follow consistent stroke-order rules, which make them easier and more natural to write once learned, and which reflect the structure that helps you remember them. In the digital world, typing Mandarin generally uses pinyin — you type the pronunciation and select the character — which means strong pronunciation and recognition skills transfer directly to typing. Understanding both handwriting, for its learning benefits, and typing, for practical use, gives you a complete grasp of written Mandarin. Deciding how much handwriting to prioritise depends on your goals, but even some handwriting practice significantly strengthens your overall command of the characters."),

  h2("Simplified and traditional characters"),
  p("A practical decision every Mandarin learner faces is which set of characters to learn, because there are two systems in use. Simplified characters, used in mainland China and Singapore, streamlined many characters to have fewer strokes. Traditional characters, used in Taiwan, Hong Kong and many overseas communities, preserve the older, more complex forms. Which you learn depends on your goals — where you plan to use Mandarin, and which communities you want to connect with."),
  p("The good news is that the two systems share a great deal, and many characters are identical or nearly so, so learning one gives you a substantial head start on the other. Most learners choose one to focus on based on their purpose and can pick up the other later if needed. Being aware of the distinction from the start, and choosing deliberately according to your goals, prevents confusion and ensures your effort is aimed at the characters you will actually use. For learners in Canada, either choice is reasonable depending on the communities and resources most relevant to them, and a tutor can help you decide based on your specific situation."),

  h2("Reading and writing in the digital age"),
  p("Technology has transformed how Mandarin is written and read, and understanding this shapes a sensible learning strategy. In practice, most written Mandarin today is typed, not handwritten, and typing generally works through pinyin: you type the pronunciation and choose the correct character from a list. This means that strong pronunciation and character-recognition skills — being able to recognise the right character even if you could not write it by hand — are what matter most for practical digital communication."),
  p("This has a liberating implication for learners: you can become functionally literate in typed Mandarin through recognition, which is easier than production, even if your handwriting lags. That said, handwriting practice retains real value for learning, because producing characters cements them in memory more deeply than recognition alone. A balanced modern approach emphasises recognition and pinyin typing for practical use, while using some handwriting as a powerful learning tool. Understanding how the digital reality of Mandarin shapes what skills you most need lets you direct your effort efficiently toward genuine, usable literacy rather than an outdated ideal of writing everything by hand."),

  h2("Where learners struggle with characters"),
  mli(["Trying to memorise characters as random strokes instead of components."]),
  mli(["Learning characters in isolation rather than in words and context."]),
  mli(["Not using spaced repetition for a volume that demands it."]),
  mli(["Ignoring frequency and learning characters in an inefficient order."]),
  mli(["Skipping handwriting entirely, losing its memory-reinforcing benefit."]),

  h2("How to master Mandarin reading and writing"),
  mli(["Learn characters as combinations of radicals and components."]),
  mli(["Build vocabulary in context, by frequency, with spaced repetition."]),
  mli(["Read level-appropriate material consistently to build fluency."]),
  mli(["Use some handwriting to reinforce characters, and pinyin typing for practical use."]),
  mli(["Prioritise the high-frequency characters that cover most text."]),

  h2("Conquer Chinese characters"),
  linked(["If the characters are what is holding your Mandarin back, the systematic, component-based approach turns an impossible-seeming task into steady progress, and it is exactly what focused tutoring builds. Our ", { text: "Mandarin tutoring in Burnaby and online", href: P }, " teaches characters efficiently and develops the reading and writing that unlock the written language."]),
  linked(["Start with a free conversation. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us how you are finding the characters, and we will show you the efficient path — online across Metro Vancouver, or in person in Burnaby. Honest advice included on whether tutoring fits your goals."]),
];

/* ===== 3. GRAMMAR, LISTENING & CULTURE ===== */
const glc = [
  p("Here is a genuine surprise for many Mandarin learners: after the intimidation of tones and characters, the grammar turns out to be one of the easiest of any major language. Mandarin has no verb conjugations, no noun genders, no plurals to worry about in the way European languages demand. Yet learners still struggle with putting sentences together correctly, understanding rapid speech, and grasping the cultural context that gives the language meaning. Understanding how Mandarin grammar actually works, how to train your listening, and how culture shapes communication is what turns isolated words into real understanding."),
  p("Mandarin grammar, listening skill, and cultural understanding together turn vocabulary into genuine communication. This guide covers why the grammar is more approachable than you fear, how to train your ear for real Mandarin, and how cultural context shapes the language."),

  h2("The grammar is simpler than you expect"),
  p("The reassuring truth about Mandarin grammar is that it lacks many of the features that make other languages hard. Verbs do not change their form for tense or subject — the verb stays the same whether it is I, you, or they, and whether it is past, present, or future. Nouns do not change for number or gender. This absence of conjugation and agreement removes a huge amount of the memorisation that burdens learners of European languages."),
  p("What Mandarin has instead is a reliance on word order and on small helper words that indicate meaning. The basic sentence structure is subject-verb-object, familiar from English, which gives learners a comfortable starting point. Time and aspect — when something happens, or whether it is completed — are shown by adding words or particles rather than by changing the verb. Understanding that Mandarin builds meaning through word order and helper words, rather than through changing word forms, is the key to its grammar, and it makes constructing correct sentences more approachable than the language's fearsome overall reputation suggests."),

  h2("The features that do take getting used to"),
  p("While Mandarin grammar is broadly simple, a few features are genuinely different from English and take deliberate attention. Measure words are one: when counting nouns, Mandarin requires a specific classifier word between the number and the noun, chosen according to the type of object, with no English equivalent. Getting used to selecting the right measure word is a distinctive part of learning Mandarin grammar."),
  p("Other features include the particles that convey nuances of meaning, tone, and aspect — small words at the end of sentences or after verbs that carry a great deal of information about how a statement should be understood. These do not fit neatly into English categories, so they must be learned as their own thing rather than translated. Recognising which parts of Mandarin grammar map easily onto English and which require a new way of thinking lets you focus your effort where it is actually needed. The overall grammar remains far more approachable than tones or characters, but attending to these distinctive features is what makes your Mandarin accurate and natural rather than merely understandable."),

  h2("Listening: training your ear for real Mandarin"),
  p("Listening is often the skill learners find most humbling, because real spoken Mandarin — at natural speed, with tones flowing together and colloquial expressions — sounds very different from the careful audio of a textbook. Even learners with good vocabulary can find themselves lost when native speakers talk at normal pace. This is completely normal, and it is a matter of training the ear, not of ability."),
  p("The solution is consistent, deliberate exposure to authentic Mandarin audio — podcasts, shows, music, conversations — at natural speed. At first you will understand little, and that is expected; comprehension builds gradually as your ear adjusts to the rhythm, the tones in connected speech, and the speed. Listening to material slightly above your level, re-listening to the same content, and using subtitles as a bridge before weaning off them are all effective. Because tones are central to Mandarin, listening practice also sharpens your own tone production. Patient, consistent listening practice is what turns the wall of sound into comprehensible speech, and it is one of the most rewarding breakthroughs in learning the language."),
  linked(["If Mandarin grammar confuses you or real speech sounds like a blur, targeted guidance on the language's actual structure and focused listening practice make both click faster than solo study. Our ", { text: "Mandarin tutoring", href: P }, " builds correct grammar and trained listening, working from where you actually are."]),

  h2("Putting sentences together correctly"),
  p("Even with simple grammar, learners make characteristic mistakes when constructing Mandarin sentences, and knowing them helps you avoid them. A common one is imposing English structures onto Mandarin — trying to translate word-for-word rather than using the natural Mandarin pattern, which produces sentences that are technically decodable but sound wrong. Mandarin has its own preferred ways of ordering information, particularly around time, place, and manner, that differ from English word order."),
  p("Another frequent difficulty is knowing where the small helper words and particles go, and which to use, since these carry meaning that English handles differently. The way to build correct sentence construction is through plenty of practice producing sentences and getting feedback, so that the natural Mandarin patterns become instinctive rather than laboriously assembled from English. Reading and listening to real Mandarin also builds an intuitive feel for how sentences should sound. Learning to construct sentences the Mandarin way — following its patterns rather than translating from English — is what makes your Mandarin sound natural, and it is a skill that develops steadily with guided practice and exposure."),

  h2("How listening and speaking reinforce each other"),
  p("Listening and speaking in Mandarin are deeply connected, and developing them together is more effective than treating them separately. Because tones are central, training your ear to hear tones accurately directly improves your ability to produce them, and vice versa — the more clearly you can hear the difference between tones, the more precisely you can say them. This tight link means listening practice is also pronunciation practice, and speaking practice sharpens your listening."),
  p("Practically, this means the most effective learning involves lots of both: listening to native speakers and imitating them, and speaking while paying attention to how you sound. Shadowing — listening to a phrase and immediately repeating it, matching the tones and rhythm — is a particularly powerful technique that trains ear and voice at once. Understanding that in Mandarin, perhaps more than in other languages, listening and speaking are two sides of the same tonal coin encourages you to develop them together, which accelerates both. This integrated practice, ideally with feedback from someone who can catch your tone errors, is what builds genuine spoken fluency and comprehension in tandem."),

  h2("Culture: the context that gives language meaning"),
  p("Language and culture are inseparable, and this is especially true for Mandarin, where cultural understanding is essential to communicating well rather than just correctly. Chinese communication is shaped by cultural values — around politeness, indirectness, respect, and relationships — that affect how things are said and understood. A sentence that is grammatically perfect can still be inappropriate or confusing if it ignores the cultural context, which is why culture is part of genuinely learning the language, not an optional add-on."),
  p("Understanding this cultural dimension enriches your Mandarin enormously and helps you avoid misunderstandings. It includes knowing the levels of formality and how to show appropriate respect, understanding the importance of relationships in Chinese communication, and appreciating the cultural references and idioms that pepper the language. Learning Mandarin with attention to its cultural context — rather than as a mechanical code to translate — is what lets you communicate not just accurately but appropriately and warmly. This cultural fluency is often what distinguishes a learner who can produce correct sentences from one who can genuinely connect with Mandarin speakers, and it makes learning the language far more rewarding."),

  h2("Where learners struggle with grammar, listening and culture"),
  mli(["Overcomplicating grammar that is actually simpler than European languages."]),
  mli(["Forgetting measure words, or choosing the wrong classifier."]),
  mli(["Missing the meaning carried by particles that do not map onto English."]),
  mli(["Finding real speech a blur, and giving up on listening too early."]),
  mli(["Ignoring cultural context, producing correct but inappropriate Mandarin."]),

  h2("How to master Mandarin grammar, listening and culture"),
  mli(["Learn the grammar as word order plus helper words, not changing word forms."]),
  mli(["Give measure words and particles the specific attention they need."]),
  mli(["Train your ear with consistent authentic listening, patiently."]),
  mli(["Learn the cultural context that makes communication appropriate."]),
  mli(["Treat culture as part of the language, not an optional extra."]),

  h2("Communicate, not just translate, in Mandarin"),
  linked(["If your Mandarin is stuck at correct-but-not-natural, or real speech and cultural nuance elude you, guided learning that integrates grammar, listening and culture is what turns words into genuine communication. Our ", { text: "Mandarin tutoring in Burnaby and online", href: P }, " builds all three together, so you can connect with Mandarin speakers rather than just produce sentences."]),
  linked(["The first step is free. ", { text: "Book a free 30-minute consultation", href: "/contact" }, ", tell us what about Mandarin you want to strengthen, and we will show you the most effective path — online across Metro Vancouver, or in person in Burnaby. If tutoring is not what you need, we will tell you honestly."]),
];

await applyPost({ slug: "mandarin-conversational-mandarin-pronunciation", was: 396, body: conv, siblingSlugs: SIBS.filter((s) => s !== "mandarin-conversational-mandarin-pronunciation") });
await applyPost({ slug: "mandarin-reading-writing-vocabulary-building", was: 364, body: rwv, siblingSlugs: SIBS.filter((s) => s !== "mandarin-reading-writing-vocabulary-building") });
await applyPost({ slug: "mandarin-grammar-listening-cultural-understanding", was: 383, body: glc, siblingSlugs: SIBS.filter((s) => s !== "mandarin-grammar-listening-cultural-understanding") });
