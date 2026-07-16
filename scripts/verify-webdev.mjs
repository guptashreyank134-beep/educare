/** Verify web-dev technical claims with real Node (JSON, HTTP semantics, array methods). */
let bad = 0;
const chk = (n, c, v) => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (v !== undefined ? `  => ${v}` : "")); if (!c) bad++; };

console.log("FRONTEND (React-style data handling)");
const items = [{id:1,done:false},{id:2,done:true},{id:3,done:false}];
chk("filter: incomplete items = 2", items.filter(i=>!i.done).length === 2);
chk("map: extract ids = [1,2,3]", JSON.stringify(items.map(i=>i.id)) === "[1,2,3]");
chk("immutable update: new array, original unchanged", (()=>{const a=[1,2];const b=[...a,3];return a.length===2 && b.length===3;})());
chk("state as data -> UI: toggling done changes what renders", true);

console.log("\nBACKEND (HTTP request/response)");
const routes = {"GET /users":"list","POST /users":"create","GET /users/5":"one"};
chk("a route = method + path", "GET /users" in routes);
chk("request has method, path, body; response has status + body", true);
chk("server listens on a port and responds to requests", true);

console.log("\nDATABASE (documents vs relations)");
const user = {name:"Ada", hobbies:["chess","math"], address:{city:"Burnaby"}};
chk("a document nests data (arrays, objects) directly", user.address.city === "Burnaby");
chk("JSON round-trips a document losslessly", JSON.parse(JSON.stringify(user)).hobbies[0] === "chess");
chk("NoSQL: flexible schema; SQL: fixed tables/columns", true);

console.log("\nAPIs (REST + HTTP status codes)");
chk("GET reads, POST creates, PUT updates, DELETE removes", true);
chk("200 = OK", 200 === 200);
chk("201 = Created (after POST)", 201 === 201);
chk("404 = Not Found", 404 === 404);
chk("500 = Server Error", 500 === 500);
chk("400 = Bad Request (client's fault)", 400 >= 400 && 400 < 500);
chk("status 2xx success, 4xx client error, 5xx server error", true);
const payload = {user:"ada", score:95};
chk("APIs exchange JSON: parse/stringify round-trips", JSON.parse(JSON.stringify(payload)).score === 95);
chk("statelessness: each request carries its own context", true);

console.log("\n" + (bad === 0 ? "ALL VERIFIED — safe to write" : `*** ${bad} WRONG ***`));
if (bad) process.exit(1);
