// Dependency-free checks for the embedded data and pure decision-tool functions.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script); // Parse the entire script, including boot and render paths.
const context = vm.createContext({
  localStorage: { getItem: () => null },
  document: { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null },
  location: { hash: '' },
});
vm.runInContext(script.replace(/boot\(\);\s*$/, ''), context);
let checks = 0;
function check(expression) {
  assert.equal(vm.runInContext(expression, context), true, expression);
  checks++;
}
check('CO.length===252 && CO.filter(c=>!c.prod).length===244');
check('!CO.some(c=>c.n==="Suzhou Green Harmonic")');
check('CO.find(c=>c.n==="RLWRLD").l==="B6" && bmOf(CO.find(c=>c.n==="RLWRLD"))==="soft"');
check('CO.filter(c=>c.l==="A6").length===25 && CO.filter(c=>c.l==="A6").every(c=>bmOf(c)==="plat")');
check('Object.values(WORKLOADS).every(w=>w.partners.every(p=>CO.some(c=>c.n===p.company)&&EVIDENCE[p.company]))');
check('Object.values(EVIDENCE).every(e=>e.url.startsWith("https://") && e.checked==="2026-10-11" && e.claim && e.kind)');
check('new Set(WORKLOADS.welding.partners.map(p=>p.company)).size===WORKLOADS.welding.partners.length');
check('esc(`"<>&\'`)==="&quot;&lt;&gt;&amp;&#39;"');
check('safeDecode("%ZZ")==="" && safeDecode("a%26b")==="a&b"');
check('valNum("$126B")>valNum("$600M") && valNum("$5.1-6.4B")===5100');
assert.equal(vm.runInContext('csvCell("=1+1")', context), '"\'=1+1"');
assert.equal(vm.runInContext('csvCell("  @SUM(A1)")', context), '"\'  @SUM(A1)"');
assert.equal(vm.runInContext('csvCell(`a"b,c\n`)', context), '"a""b,c\n"');
checks += 3;
check('csvText([CO[0]],false).startsWith("\ufeff")');
check('!csvText([CO[0]],false).includes("Private note") && csvText([CO[0]],true).includes("Private note")');
check('matched().length===252');
vm.runInContext('state.g.add("KR")', context);
check('matched().length>0 && matched().every(c=>c.g==="KR")');
vm.runInContext('state.g.clear();state.q="welding"', context);
check('matched().some(c=>c.n==="Persona AI")');
vm.runInContext('location.hash="#view=workbench&workload=warehouse&g=CN,INVALID&sort=val&dir=-1";readHash()',context);
check('view==="workbench"&&workload==="warehouse"&&state.g.size===1&&state.g.has("CN")&&sortKey==="val"&&sortDir===-1');
vm.runInContext('location.hash="";readHash()',context);
check('view==="chain"&&state.g.size===0&&state.q===""&&sortKey==="n"&&sortDir===1');
vm.runInContext('location.hash="#q=%E0%A4%A&s=missing&view=INVALID";readHash()',context);
check('view==="chain"&&state.q===""');
// Simulate unavailable storage; browsing must still boot without an exception.
const blocked = vm.createContext({ ...context, localStorage: { getItem(){ throw Error('blocked'); } } });
vm.runInContext(script.replace(/boot\(\);\s*$/, ''), blocked);
assert.equal(vm.runInContext('storageAvailable', blocked), false);
console.log(`Done — ${checks + 1} data, filter, URL, CSV and storage checks passed; full JavaScript syntax valid.`);
