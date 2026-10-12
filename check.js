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
check('CO.filter(c=>c.l==="A6").length===24 && CO.filter(c=>c.l==="A6").every(c=>bmOf(c)==="plat")');
check('Object.values(WORKLOADS).every(w=>w.partners.every(p=>CO.some(c=>c.n===p.company)&&EVIDENCE[p.company]))');
check('Object.values(EVIDENCE).every(e=>e.url.startsWith("https://") && e.checked==="2026-10-11" && e.claim && e.kind)');
check('Object.keys(VALUATIONS).length===29 && Object.entries(VALUATIONS).every(([n,f])=>CO.some(c=>c.n===n&&(c.val||"")===f.value))');
check('Object.values(VALUATIONS).every(f=>/^\\d{4}-\\d{2}-\\d{2}$/.test(f.date)&&f.date<=f.checked&&f.checked==="2026-10-11"&&f.sources.length&&f.sources.every(x=>x.url.startsWith("https://")))');
check('CO.find(c=>c.n==="Physical Intelligence").val==="$11.7B" && !CO.find(c=>c.n==="Physical Intelligence").est');
check('CO.find(c=>c.n==="World Labs").est===1 && valuationStatus(CO.find(c=>c.n==="World Labs"))==="Announced acquisition"');
check('CO.find(c=>c.n==="1X").g==="US" && valuationStatus(CO.find(c=>c.n==="1X"))==="Acquisition rumor" && matOf(CO.find(c=>c.n==="Skild AI"))==="comm"');
check('csvText([CO.find(c=>c.n==="World Labs")],false).includes("2026-09-28") && csvText([CO.find(c=>c.n==="World Labs")],false).includes("Financial source URLs") && !csvText([CO.find(c=>c.n==="World Labs")],false).includes("Private note")');
check('CO.find(c=>c.n==="Unitree").pub===1 && !CO.find(c=>c.n==="Unitree").val && valuationStatus(CO.find(c=>c.n==="Unitree"))==="Listed"');
check('CO.find(c=>c.n==="Atoms").l==="A11" && LAYER[CO.find(c=>c.n==="Atoms").l].n.toLowerCase().includes("mining") && !CO.find(c=>c.n==="Atoms").val && CO.find(c=>c.n==="Helsing").val==="$18B" && CO.find(c=>c.n==="Skydio").val==="$4.4B"');
check('CO.filter(c=>c.val).length===27 && CO.filter(c=>c.val).every(c=>VALUATIONS[c.n])');
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
