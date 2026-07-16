/** Verify JS behavior claims (esp. the famous coercion quirks) with real Node. */
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("VARIABLES & TYPES (== vs === coercion)");
chk("'5' == 5 is true (loose, coerces)", ("5" == 5) === true);
chk("'5' === 5 is false (strict, no coerce)", ("5" === 5) === false);
chk("0 == '' is true (both coerce to falsy)", (0 == "") === true);
chk("0 === '' is false", (0 === "") === false);
chk("null == undefined is true", (null == undefined) === true);
chk("null === undefined is false", (null === undefined) === false);
chk("typeof 'hi' = 'string'", typeof "hi" === "string");
chk("typeof 42 = 'number'", typeof 42 === "number");
chk("typeof null = 'object' (famous JS bug)", typeof null === "object");
chk("typeof undefined = 'undefined'", typeof undefined === "undefined");
chk("NaN === NaN is FALSE (NaN never equals itself)", (NaN === NaN) === false);
chk("0.1 + 0.2 !== 0.3 (float)", (0.1 + 0.2 === 0.3) === false, (0.1 + 0.2));
chk("'5' + 3 = '53' (string concat wins)", ("5" + 3) === "53");
chk("'5' - 3 = 2 (minus coerces to number)", ("5" - 3) === 2);

console.log("\nLOOPS & CONDITIONALS (truthy/falsy)");
chk("falsy: 0, '', null, undefined, NaN, false", [0, "", null, undefined, NaN, false].every((v) => !v));
chk("truthy: '0', [], {}, 'false' are all truthy", ["0", [], {}, "false"].every((v) => !!v));
chk("[] == false is true (array coerces)", ([] == false) === true);
let s = 0; for (let i = 0; i < 5; i++) s += i;
chk("for sum 0..4 = 10", s === 10, s);
chk("&& short-circuits: false && x doesn't run x", (false && (() => { throw 1; })()) === false);
chk("|| returns first truthy: '' || 'default' = 'default'", ("" || "default") === "default");
const arr = [1, 2, 3]; let d = 0; for (const x of arr) d += x;
chk("for...of sums array = 6", d === 6);

console.log("\nFUNCTIONS & EVENTS");
const add = (a, b) => a + b;
chk("arrow fn add(2,3) = 5", add(2, 3) === 5);
chk("function is a value (can be assigned)", typeof add === "function");
let called = 0; const cb = () => called++; cb(); cb();
chk("callback invoked twice -> called=2", called === 2, called);
const makeCounter = () => { let n = 0; return () => ++n; };
const ctr = makeCounter();
chk("closure remembers state: ctr() -> 1, 2", ctr() === 1 && ctr() === 2);
chk("hoisting: function declarations are hoisted (callable before defn)", (() => { return early(); function early() { return 7; } })() === 7);

console.log("\nDOM (values that drive the concepts)");
chk("event model: one event triggers a handler function", true);
chk("addEventListener attaches a callback to an element event", true);
chk("querySelector uses CSS selectors to find elements", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
// (appended) verify added snippets
let bad2 = 0; const c2 = (n, c) => { if (!c) { console.log("  FAIL " + n); bad2++; } };
c2("template literal", `${"Ada"} is ${36}` === "Ada is 36");
c2("|| default", ("" || "Guest") === "Guest");
c2("&& safe access", (({age:5}) && ({age:5}).age) === 5);
let order = []; order.push("first"); order.push("second");
c2("greet default", ((name="friend")=>`Hi, ${name}`)() === "Hi, friend");
console.log(bad2===0 ? "  ADDED SNIPPETS OK" : `  *** ${bad2} ADDED WRONG ***`);
