// Dependency-free checks for the embedded data and pure decision-tool functions.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script); // Parse the entire script, including boot and render paths.
const context = vm.createContext({
  URLSearchParams,
  localStorage: { getItem: () => null },
  document: { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null },
  location: { hash: '' },
});
vm.runInContext(script.replace(/boot\(\);\s*$/, ''), context);
vm.runInContext('view="relationships"', context); // Existing database regression checks.
let checks = 0;
function check(expression) {
  assert.equal(vm.runInContext(expression, context), true, expression);
  checks++;
}
check('CO.length===430 && CO.filter(c=>!c.prod).length===418 && organizationCount(CO)===422');
check('!CO.some(c=>c.n==="Suzhou Green Harmonic")');
check('CO.find(c=>c.n==="RLWRLD").l==="B6" && bmOf(CO.find(c=>c.n==="RLWRLD"))==="soft"');
check('CO.filter(c=>c.l==="A6").length>24 && roleOf(CO.find(c=>c.n==="Sunday Robotics"))==="S"');
check('Object.values(EVIDENCE).every(e=>e.url.startsWith("https://") && ["2026-10-11","2026-11-08"].includes(e.checked) && e.claim && e.kind)');
check('Object.keys(VALUATIONS).length===29 && Object.entries(VALUATIONS).every(([n,f])=>CO.some(c=>c.n===n&&(c.val||"")===f.value))');
check('Object.values(VALUATIONS).every(f=>/^\\d{4}-\\d{2}-\\d{2}$/.test(f.date)&&f.date<=f.checked&&["2026-10-11","2026-11-08"].includes(f.checked)&&f.sources.length&&f.sources.every(x=>x.url.startsWith("https://")))');
check('CO.find(c=>c.n==="Physical Intelligence").val==="$11.7B" && !CO.find(c=>c.n==="Physical Intelligence").est');
check('CO.find(c=>c.n==="World Labs").est===1 && valuationStatus(CO.find(c=>c.n==="World Labs"))==="Announced acquisition"');
check('CO.find(c=>c.n==="1X").g==="US" && valuationStatus(CO.find(c=>c.n==="1X"))==="Acquisition rumor" && matOf(CO.find(c=>c.n==="Skild AI"))==="comm"');
check('csvText([CO.find(c=>c.n==="World Labs")],false).includes("2026-09-28") && csvText([CO.find(c=>c.n==="World Labs")],false).includes("Financial source URLs") && !csvText([CO.find(c=>c.n==="World Labs")],false).includes("Private note")');
check('CO.find(c=>c.n==="Unitree").pub===1 && !CO.find(c=>c.n==="Unitree").val && valuationStatus(CO.find(c=>c.n==="Unitree"))==="Listed"');
check('CO.find(c=>c.n==="Atoms").l==="A11" && LAYER[CO.find(c=>c.n==="Atoms").l].n.toLowerCase().includes("mining") && !CO.find(c=>c.n==="Atoms").val && CO.find(c=>c.n==="Helsing").val==="$18B" && CO.find(c=>c.n==="Skydio").val==="$4.4B"');
check('CO.filter(c=>c.val).length===27 && CO.filter(c=>c.val).every(c=>VALUATIONS[c.n])');
check('esc(`"<>&\'`)==="&quot;&lt;&gt;&amp;&#39;"');
check('safeDecode("%ZZ")==="" && safeDecode("a%26b")==="a&b"');
check('valNum("$126B")>valNum("$600M") && valNum("$5.1-6.4B")===5100');
assert.equal(vm.runInContext('csvCell("=1+1")', context), '"\'=1+1"');
assert.equal(vm.runInContext('csvCell("  @SUM(A1)")', context), '"\'  @SUM(A1)"');
assert.equal(vm.runInContext('csvCell(`a"b,c\n`)', context), '"a""b,c\n"');
checks += 3;
check('csvText([CO[0]],false).startsWith("\ufeff")');
check('!csvText([CO[0]],false).includes("Private note") && csvText([CO[0]],true).includes("Private note")');
check('matched().length===430');
vm.runInContext('state.g.add("KR")', context);
check('matched().length>0 && matched().every(c=>c.g==="KR")');
vm.runInContext('state.g.clear();state.q="welding"', context);
check('matched().some(c=>c.n==="Persona AI")');
vm.runInContext('location.hash="#view=workbench&workload=warehouse&g=CN,INVALID&sort=val&dir=-1";readHash()',context);
check('view==="chain"&&state.g.size===1&&state.g.has("CN")&&sortKey==="val"&&sortDir===-1');
vm.runInContext('location.hash="";readHash()',context);
check('view==="summary"&&state.g.size===0&&state.q===""&&sortKey==="n"&&sortDir===1');
vm.runInContext('location.hash="#q=%E0%A4%A&s=missing&view=INVALID";readHash()',context);
check('view==="summary"&&state.q===""');

check('landscapeStats(CO).planes.length===5 && landscapeStats(CO).planes.reduce((s,p)=>s+p.count,0)===CO.length');
check('landscapeStats(CO).geos.reduce((sum,g)=>sum+g.count,0)===CO.length && landscapeStats(CO).geos.every(g=>g.planes.reduce((sum,p)=>sum+p.count,0)===g.count)');
check('landscapeStats(CO).models.reduce((sum,g)=>sum+g.count,0)===CO.length');
check('landscapeStats(CO).stages.every(p=>p.values.reduce((sum,v)=>sum+v.count,0)===p.count)');
check('landscapeStats(CO).layers.length===22 && landscapeStats(CO).layers.reduce((sum,l)=>sum+l.count,0)===CO.length');
check('landscapeStats([]).total===0 && landscapeStats([]).planes.every(p=>p.count===0) && chartWidth(0,0)===0');
check('chartWidth(3,12)===25 && chartWidth(12,12)===100');
check('landscapeStats(CO.filter(c=>c.g==="KR")).geos.filter(g=>g.count).every(g=>g.id==="KR")');
vm.runInContext('location.hash="#view=overview&p=B";readHash()',context);
check('view==="overview" && state.p.has("B") && matched().every(c=>c.l[0]==="B")');
vm.runInContext('location.hash="#view=chain";readHash()',context);
check('view==="chain" && state.p.size===0');


check('typeof WORKLOADS==="undefined" && typeof viewWorkbench==="undefined"');
check('Object.keys(COVER_NAMES).length===22 && PLANES.every(p=>p.layers.every(l=>COVER_NAMES[l.c]))');
check('Math.abs(fundingStats().other-31.4)<1e-9 && Math.abs(fundingStats().growth-3.95)<1e-9');
check('Math.abs(fundingStats().share-33.755274261603375)<1e-9 && Math.abs(fundingStats().adjustedGrowth-2.6166666666666667)<1e-9');
check('FUNDING.periods.map(p=>p.deals).join(",")==="436,470,521" && FUNDING.periods.every(p=>p.label.startsWith("H"))');
check('Math.abs(revenueStats().total-10.0647)<1e-9 && Math.abs(REVENUE_MIX.items.reduce((sum,x)=>sum+x.value/revenueStats().total*100,0)-100)<1e-9');
check('revenueStats().nonSystemShare>75.42 && revenueStats().nonSystemShare<75.43');
// Check the rendered association of category, amount, share and bar length.
const revenueHost={innerHTML:''};
const previousGetElement=context.document.getElementById;
context.document.getElementById=id=>id==='revenue-mix'?revenueHost:null;
vm.runInContext('drawRevenueMix()',context);
context.document.getElementById=previousGetElement;
const revenueRows=revenueHost.innerHTML.split('<div class="revenue-row"').slice(1);
assert.equal(revenueRows.length,3);checks++;
const expectedRevenue=[
  ['instruments','Instruments &amp; accessories',6.0189,'59.8'],
  ['systems','Systems',2.4737,'24.6'],
  ['services','Services',1.5721,'15.6'],
];
expectedRevenue.forEach(([id,label,value,share],index)=>{
  const row=revenueRows[index];
  assert.ok(row.includes(`data-revenue="${id}"`)&&row.includes(label));
  assert.ok(row.includes(`USD ${value.toFixed(4)}B`)&&row.includes(`${share}% of total`));
  const width=Number(row.match(/style="width:([\d.]+)%"/)[1]);
  assert.ok(Math.abs(width-value/10.0647*100)<1e-9,'Bar length matches its own category value');
  checks++;
});
check('Math.abs(reliabilityCase(.98,450,4,480).events-9)<1e-9 && Math.abs(reliabilityCase(.98,450,4,480).minutes-36)<1e-9 && Math.abs(reliabilityCase(.98,450,4,480).share-7.5)<1e-9');
check('Math.abs(reliabilityCase(.999,450,4,480).minutes-1.8)<1e-9 && Math.abs(reliabilityCase(.98,450,4,480).minutes/reliabilityCase(.999,450,4,480).minutes-20)<1e-9');
check('reliabilityCase(1,450,4,480).events===0 && reliabilityCase(.98,0,4,480).minutes===0');
assert.throws(()=>vm.runInContext('reliabilityCase(1.1,450,4,480)',context));checks++;
check('FUNDING.source.startsWith("https://") && REVENUE_MIX.source.startsWith("https://")');


const staticMarkup=html.slice(0,html.indexOf('<script>'));
const staticIds=[...staticMarkup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(staticIds).size,staticIds.length,'Static element IDs must be unique');checks++;
for(const match of staticMarkup.matchAll(/data-scroll-target="([^"]+)"/g))assert.ok(staticIds.includes(match[1]),'Chapter navigation target exists');checks++;
assert.ok(!staticMarkup.includes('data-workload')&&!staticMarkup.includes('data-start-workload')&&!staticMarkup.includes('Partner workbench'));checks++;
assert.equal((staticMarkup.match(/class="essay-body"/g)||[]).length,6,'All Insights and Method chapters use the same reading structure');checks++;

// Simulate unavailable storage; browsing must still boot without an exception.
const blocked = vm.createContext({ ...context, localStorage: { getItem(){ throw Error('blocked'); } } });
vm.runInContext(script.replace(/boot\(\);\s*$/, ''), blocked);
assert.equal(vm.runInContext('storageAvailable', blocked), false);
// Relationship data must not silently expand the canonical roster or conflate roles.
check('CO.length===430 && RA_DATA.edges.length===150 && RA_DATA.edges.filter(e=>e.reviewed).length===70');
check('!RA_NODES.has("Uber") && !RA_DATA.edges.some(e=>e.a==="Uber"||e.b==="Uber")');
check('RA_DATA.edges.every(e=>RA_NODES.has(e.a)&&RA_NODES.has(e.b)&&e.s.startsWith("https://"))');
check('new Set(RA_DATA.edges.map(e=>e.a+"|"+e.b+"|"+e.t)).size===RA_DATA.edges.length');
check('RA_DATA.edges.filter(e=>e.a==="Mercedes-Benz"&&e.b==="Apptronik").map(e=>e.t).sort().join(",")==="cust,inv"');
check('RA_DATA.edges.find(e=>e.a==="NVIDIA"&&e.b==="Hugging Face").st==="pending"');
vm.runInContext('location.hash="#view=dependencies&follow=Apptronik&evidence=all&ties=inv,cust&context=0&compare=plane";readHash()',context);
check('view==="dependencies"&&ra.company==="Apptronik"&&ra.scope==="all"&&!ra.context&&ra.matrix==="plane"&&ra.types.size===2');
check('raEdges(CO).every(e=>["inv","cust"].includes(e.t)&&RA_NODES.get(e.a).p!=="X"&&RA_NODES.get(e.b).p!=="X")');
vm.runInContext('location.hash="";readHash()',context);
check('view==="summary"&&ra.company===null&&ra.scope==="checked"&&ra.types.size===5&&ra.context');
check('raEdges(CO).length===70&&raEdges([]).length===0');
// Routes preserve actual station endpoints, including reverse, same-column and long routes.
check('raRouteGeometry({x:50,y:80},{x:450,y:220},{left:0,right:100},{left:400,right:500}).startsWith("M50 80 ")');
check('raRouteGeometry({x:50,y:80},{x:450,y:220},{left:0,right:100},{left:400,right:500}).endsWith("220 H450")');
check('raRouteGeometry({x:450,y:220},{x:50,y:80},{left:400,right:500},{left:0,right:100}).endsWith("80 H50")');
check('raRouteGeometry({x:50,y:80},{x:60,y:220},{left:0,right:100},{left:0,right:100}).endsWith("220 H60")');
check('raRouteGeometry({x:50,y:80},{x:850,y:220},{left:0,right:100},{left:800,right:900},{long:true,bottom:1000}).includes(" V1000 ")');
check('raRouteGeometry({x:50,y:80},{x:850,y:220},{left:0,right:100},{left:800,right:900},{long:true,bottom:1000}).endsWith(" V220 H850")');
// Reader-facing encodings must match the current view, not leak from the atlas.
const realBind=vm.runInContext('raBind',context);
context.raBind=()=>{};
context.requestAnimationFrame=()=>0;
context.document.body={classList:{contains:()=>false}};
context.reviewHost={innerHTML:''};
vm.runInContext('ra.company=null;ra.edge=null;ra.scope="checked";ra.types=new Set(Object.keys(RA_TYPES));ra.matrix="company"',context);
for(const mode of ['relationships','territories','dependencies','connections']){
  vm.runInContext(`view=${JSON.stringify(mode)};viewRelationships(reviewHost,CO)`,context);
  const markup=context.reviewHost.innerHTML;
  assert.equal((markup.match(/class="ra-direction-guide"/g)||[]).length,mode==='relationships'?1:0,'Arrowhead guidance is specific to routed lines');checks++;
  assert.equal((markup.match(/class="ra-line /g)||[]).length,mode==='relationships'?5:0,'Only atlas filters use line-pattern samples');checks++;
  assert.equal((markup.match(/class="ra-symbol /g)||[]).length,mode==='connections'?5:0,'Only company-matrix filters use cell symbols');checks++;
}
check('raDependencies(raEdges(CO)).includes("Choose a company to inspect") && !raDependencies(raEdges(CO)).includes("ra-focus")');
vm.runInContext('view="connections";ra.company="NVIDIA";ra.matrix="plane";viewRelationships(reviewHost,CO)',context);
assert.ok(!context.reviewHost.innerHTML.includes('class="ra-symbol '),'Plane counts do not use a symbol legend');checks++;
const matrixMarkup=vm.runInContext('raMatrix(raEdges(CO))',context);
const countedRecords=[...matrixMarkup.matchAll(/data-ra-pair="[A-Z]+"[^>]*>(\d+)</g)].reduce((sum,m)=>sum+Number(m[1]),0);
assert.equal(countedRecords,vm.runInContext('raEdges(CO).filter(e=>e.a===ra.company||e.b===ra.company).length',context),'Follow applies to both matrix levels and counts');checks++;
vm.runInContext('ra.edge=RA_DATA.edges.findIndex(e=>e.t==="tech"&&e.reviewed);ra.types.delete("tech");viewRelationships(reviewHost,CO)',context);
check('ra.edge===null && ra.company==="NVIDIA" && !reviewHost.innerHTML.includes("<small>Relationship evidence</small>")');
context.raBind=realBind;
check('CO.some(c=>c.n==="Eka Robotics") && CO.some(c=>c.n==="Dream Labs") && roleOf(CO.find(c=>c.n==="Dream Labs"))==="I"');
check('CO.every(c=>ROLE_AUDIT[c.n] && LAYER[posOf(c)] && INFO[c.n] && BIZ[c.n])');
check('roleOf(CO.find(c=>c.n==="NVIDIA"))==="H" && roleOf(CO.find(c=>c.n==="Figure AI"))==="S" && roleOf(CO.find(c=>c.n==="Waymo"))==="O"');
check('roleOf(CO.find(c=>c.n==="Foxglove"))==="D" && roleOf(CO.find(c=>c.n==="Pilz"))==="H" && roleOf(CO.find(c=>c.n==="Formic"))==="O"');
vm.runInContext('location.hash="#p=I&view=chain";readHash()',context);
check('matched().length>0 && matched().every(c=>roleOf(c)==="I")');
vm.runInContext('location.hash="#lay=A6";readHash()',context);
check('matched().length>0 && matched().every(c=>c.l==="A6")');
vm.runInContext('location.hash="#lay=I1";readHash()',context);
check('matched().length>0 && matched().every(c=>posOf(c)==="I1")');
check('matOf(CO.find(c=>c.n==="Dream Labs"))==="unknown" && FINANCING["Eka Robotics"].source.startsWith("https://my.pitchbook.com/")');
check('CO.filter(c=>c.n==="Ultra").length===1 && !CO.some(c=>c.n==="Ultra Robotics")');
check('CO.every(c=>formsOf(c).length && formsOf(c).every(f=>FORM_LABELS[f]))');
vm.runInContext('location.hash="#form=humanoid&view=chain";readHash()',context);
check('matched().length>0 && matched().every(c=>formsOf(c).includes("humanoid"))');
check('RA_DATA.edges.filter(e=>e.a==="Dream Labs").length===5 && RA_DATA.edges.filter(e=>e.a==="Dream Labs").every(e=>e.t==="tech"&&e.caveat.includes("beta"))');
check('CO.every(c=>RA_NODES.get(c.n).p===roleOf(c) && RA_NODES.get(c.n).l===posOf(c))');
check('TOP100.length===100 && new Set(TOP100.map(x=>x.n)).size===100 && new Set(TOP100.map(x=>x.label)).size===100');
check('TOP100.every(x=>CO.some(c=>c.n===x.n&&roleOf(c)===x.role)&&x.why&&x.offer&&x.segment)');
check('TOP100.filter(x=>x.role==="H").length===20 && TOP100.filter(x=>x.role==="D").length===13 && TOP100.filter(x=>x.role==="I").length===18 && TOP100.filter(x=>x.role==="S").length===38 && TOP100.filter(x=>x.role==="O").length===11');
vm.runInContext('location.hash="#view=summary&spotlight=Eka%20Robotics";readHash()',context);
check('view==="summary" && summaryCompany==="Eka Robotics" && matched().length===100');
check('matched().some(c=>c.n==="Eka Robotics")&&matched().some(c=>c.n==="Dream Labs")&&!matched().some(c=>c.n==="Walden Robotics")');
vm.runInContext('location.hash="#view=table&q=walden";readHash()',context);
check('matched().some(c=>c.n==="Walden Robotics")');
vm.runInContext('location.hash="#view=summary";readHash()',context);
check('summaryConnections("Dream Labs",summaryRows()).every(e=>e.reviewed&&TOP100_BY_NAME.has(e.a)&&TOP100_BY_NAME.has(e.b))');
check('summaryConnections("Dream Labs",summaryRows()).length===3');
check('TOP100.filter(x=>x.label==="Google DeepMind").length===1 && TOP100_BY_NAME.get("Gemini Robotics").label==="Google DeepMind"');
const poster=vm.runInContext('summarySvg(summaryRows())',context);
assert.equal((poster.match(/<a xlink:href=/g)||[]).length,100,'SVG contains exactly 100 company links');checks++;
assert.ok(poster.includes('Editorial selection')&&poster.includes('Google DeepMind')&&!poster.includes('undefined'));checks++;
// Parent-company views retain projects without inflating company counts or manufacturing ownership claims.
check('Object.keys(PRODUCT_CATALOG).length===12 && CO.filter(c=>c.prod).length===12 && organizationCount(CO)===422');
check('Object.entries(PRODUCT_CATALOG).every(([n,p])=>CO.find(c=>c.n===n).prod && RA_DATA.edges.filter(e=>e.a===p.owner&&e.b===n&&e.t==="platform"&&e.reviewed&&e.s===p.url).length===1)');
check('!RA_DATA.edges.some(e=>e.t==="own"&&PRODUCT_CATALOG[e.b])');
check('organizationCount(CO.filter(c=>organizationOf(c)==="NVIDIA"))===1 && CO.filter(c=>organizationOf(c)==="NVIDIA").length===6');
check('summaryProductRows("NVIDIA").map(p=>p.n).sort().join("|")===["Isaac ROS","NVIDIA Cosmos","NVIDIA GR00T","NVIDIA Halos","NVIDIA Isaac Sim / Omniverse"].sort().join("|")');
check('summaryProductRows("Gemini Robotics").length===3 && summaryProductRows("ROS 2 / OSRF").length===2');
check('summaryAnchor("Isaac ROS")==="NVIDIA" && summaryAnchor("MuJoCo")==="Gemini Robotics" && summaryAnchor("Open Robotics / Gazebo")==="ROS 2 / OSRF"');
check('summaryConnections("NVIDIA",summaryRows()).some(e=>e.a==="NVIDIA Cosmos"&&e.b==="Sereact") && !summaryConnections("NVIDIA",summaryRows()).some(e=>summaryAnchor(e.a)===summaryAnchor(e.b))');
check('summaryConnections("ROS 2 / OSRF",summaryRows()).some(e=>e.a==="Isaac ROS"&&e.b==="ROS 2 / OSRF")');
check('summaryProductRows("NVIDIA").every(p=>platformPortfolioHtml("NVIDIA").includes(`data-platform-product="${p.n}"`)) && platformPortfolioHtml("NVIDIA").includes("do not add companies")');
check('!PRODUCT_CATALOG["Pollen Robotics"] && !PRODUCT_CATALOG["Boston Dynamics"]');
check('RA_DATA.edges.every(e=>RA_TYPES[e.t]&&RA_SYMBOL[e.t]) && new Set(Object.values(RA_SYMBOL)).size===Object.keys(RA_TYPES).length');
vm.runInContext('location.hash="#view=relationships&follow=NVIDIA&ties=own,inv,tech,cust";readHash()',context);
check('ra.types.has("platform") && raEdges(CO).filter(e=>e.a==="NVIDIA"&&e.t==="platform").length===5');
vm.runInContext('location.hash="#view=relationships&follow=NVIDIA&ties=own,inv,tech,cust&rels=2";readHash()',context);
check('!ra.types.has("platform") && !raEdges(CO).some(e=>e.t==="platform")');
vm.runInContext('location.hash="#view=relationships&follow=Google%20DeepMind";readHash()',context);
check('raLayerAtlas(CO,raEdges(CO)).includes(`data-ra-station="Google DeepMind"`) && raEdges(CO).filter(e=>e.a==="Google DeepMind"&&e.t==="platform").length===3');
const googleDependencies=vm.runInContext('raDependencies(raEdges(CO))',context);
assert.ok(googleDependencies.includes('Products &amp; governed projects')&&googleDependencies.includes('MuJoCo'));checks++;
check('csvText([CO.find(c=>c.n==="Isaac ROS")],false).includes("Organization identity") && csvText([CO.find(c=>c.n==="Isaac ROS")],false).includes("Open-source robotics software")');
vm.runInContext('location.hash="#view=summary&spotlight=NVIDIA";readHash()',context);
check('summaryFocusHtml(summaryRows()).includes(`data-platform-product="Isaac ROS"`) && summaryFocusHtml(summaryRows()).includes(`data-platform-product="NVIDIA Halos"`)');
check('Math.abs(quarterlyFundingStats().growthPct-130.2325581395349)<1e-9 && Math.abs(quarterlyFundingStats().increase-5.6)<1e-9');
check('QUARTERLY_FUNDING.periods.every(p=>p.start.slice(5)==="07-01"&&p.end.slice(5)==="09-30") && QUARTERLY_FUNDING.scope.includes("excluding defense")');
check('QUARTERLY_FUNDING.ytdGrowthPctApprox===185 && QUARTERLY_FUNDING.ytdComparison.startsWith("January–September")');
const quarterlyHost={innerHTML:''};
context.document.getElementById=id=>id==='quarterly-funding-chart'?quarterlyHost:null;
vm.runInContext('drawFunding()',context);
assert.ok(quarterlyHost.innerHTML.includes('+130%') && quarterlyHost.innerHTML.includes('+USD 5.6B') && !quarterlyHost.innerHTML.includes('185%') && !/\d+ deals/.test(quarterlyHost.innerHTML));checks++;
context.document.getElementById=previousGetElement;
check('Object.keys(OPERATING_DISCLOSURES).length===7 && Object.keys(OPERATING_DISCLOSURES).every(n=>CO.some(c=>c.n===n))');
check('OPERATING_DISCLOSURES["Agility Robotics"].status.includes("Listed via SPAC") && CO.find(c=>c.n==="Agility Robotics").pub===1 && VALUATIONS["Agility Robotics"].date==="2026-11-04"');
check('OPERATING_DISCLOSURES["GrayMatter Robotics"].tier==="statement" && OPERATING_DISCLOSURES["GrayMatter Robotics"].detail.includes("not guaranteed backlog") && OPERATING_DISCLOSURES["GrayMatter Robotics"].metrics[0].period.includes("GrayMatter + Path")');
check('OPERATING_DISCLOSURES["AgiBot"].tier==="statement" && OPERATING_DISCLOSURES["AgiBot"].basis.includes("not an audited filing")');
check('OPERATING_DISCLOSURES["Unitree"].metrics[0].period.startsWith("Jul–Sep") && OPERATING_DISCLOSURES["FANUC"].period==="April–September 2026"');
check('Object.values(OPERATING_DISCLOSURES).every(d=>d.sources.length&&d.sources.every(s=>s.url.startsWith("https://"))&&d.basis&&d.takeaway.startsWith("Author interpretation:"))');
const operatingHost={innerHTML:''};context.document.getElementById=id=>id==='operating-disclosures'?operatingHost:null;
vm.runInContext('drawOperatingDisclosures()',context);
assert.equal((operatingHost.innerHTML.match(/data-operating-company=/g)||[]).length,7);checks++;
assert.ok(operatingHost.innerHTML.includes('Filed financials') && operatingHost.innerHTML.includes('Public statement') && operatingHost.innerHTML.includes('data-financial-profile="Dobot"'));checks++;
context.document.getElementById=previousGetElement;
// End-to-end content consistency and identity regressions from the detailed product review.
const investorSection=html.match(/<section id="investor"[\s\S]*?<\/section>/)[0];
assert.ok(!investorSection.includes('The deal has not closed')&&!investorSection.includes('IPO filed')&&!investorSection.includes('Implied multiple'));checks++;
assert.ok(investorSection.includes('SPAC completed')&&investorSection.includes('Public prospectus / listing not verified')&&investorSection.includes('investor-disclosure-summary'));checks++;
const investorSummaryHost={innerHTML:''};context.investorSummaryHost=investorSummaryHost;context.document.getElementById=id=>id==='investor-disclosure-summary'?investorSummaryHost:null;
vm.runInContext('drawInvestorDisclosures()',context);
assert.equal((investorSummaryHost.innerHTML.match(/data-financial-profile=/g)||[]).length,7);checks++;
check('Object.values(OPERATING_DISCLOSURES).every(d=>investorSummaryHost.innerHTML.includes(esc(d.metrics[0].value))&&investorSummaryHost.innerHTML.includes(esc(d.period)))');
context.document.getElementById=previousGetElement;
check('csvText([CO.find(c=>c.n==="Isaac ROS")],false).includes("Not a company maturity rating") && !csvText([CO.find(c=>c.n==="Isaac ROS")],false).includes(`"Listed"`)');
check('!depOf(CO.find(c=>c.n==="Dobot")) && csvText([CO.find(c=>c.n==="Dobot")],false).includes("See scoped operating disclosures")');
vm.runInContext('location.hash="#view=connections&follow=NVIDIA";readHash()',context);
const nvidiaMatrix=vm.runInContext('raMatrix(raEdges(CO))',context);
const nvidiaTargets=vm.runInContext('[...new Set(raEdges(CO).filter(e=>e.a===ra.company||e.b===ra.company).map(e=>e.b))]',context);
assert.ok(nvidiaTargets.every(n=>nvidiaMatrix.includes(escForCheck(n))),'Followed matrices must include every counterparty');checks++;
function escForCheck(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
assert.ok(nvidiaMatrix.includes('All ')&&nvidiaMatrix.includes('active evidence scope'));checks++;
const ecosystemSection=html.match(/<section id="ecosystem"[\s\S]*?<h3 id="ecosystem-platform">/)[0];
assert.equal((ecosystemSection.match(/class="exchange-lane"/g)||[]).length,3);checks++;
assert.equal((ecosystemSection.match(/class="exchange-route cash/g)||[]).length,3);checks++;
assert.ok(ecosystemSection.includes('cash left')&&ecosystemSection.includes('return right')&&ecosystemSection.includes('data-scroll-after-chapter="capital-operating"'));checks++;
const staticHtml=html.replace(/<script>[\s\S]*?<\/script>/g,'');
const reviewStaticIds=[...staticHtml.matchAll(/\bid="([^"<>]+)"/g)].map(m=>m[1]);
assert.equal(reviewStaticIds.length,new Set(reviewStaticIds).size,'Static IDs must be unique');checks++;
assert.ok([...staticHtml.matchAll(/data-scroll-target="([^"]+)"/g)].every(m=>reviewStaticIds.includes(m[1])),'Every chapter jump must resolve');checks++;
assert.ok(staticHtml.includes('<main id="main-content"')&&staticHtml.includes('Skip to content')&&staticHtml.includes('data-scroll-target="method-summary"'));checks++;
assert.equal((staticHtml.match(/class="role-tax-sections"/g)||[]).length,5);checks++;

check('friendlyHash("view=summary&ties=platform,own,inv,tech,cust&rels=2").startsWith("#overview")');
check('friendlyHash("view=relationships&follow=NVIDIA")==="#atlas?company=NVIDIA"');
check('friendlyHash("tab=insights&s=ecosystem")==="#insights/ecosystem" && friendlyHash("tab=method&s=method")==="#method/sources"');
check('parseLinkHash("#atlas?company=AMD&relationships=technology,customers&roles=hardware,intelligence").ties==="tech,cust" && parseLinkHash("#atlas?company=AMD&relationships=technology,customers&roles=hardware,intelligence").p==="H,I"');
check('parseLinkHash("#overview?profile=Isaac%20ROS").co==="Isaac ROS" && parseLinkHash("#relationship-matrix?compare=roles").compare==="plane"');
check('parseLinkHash("#overview?relationships=").ties==="" && parseLinkHash("#overview?relationships=").rels==="2"');
check('RA_DATA.edges.filter(e=>e.a==="AMD"&&e.reviewed).length===5 && RA_DATA.edges.some(e=>e.a==="AMD"&&e.b==="Kodiak Robotics"&&e.reviewed)');
check('summaryFocusHtml(CO).includes("Research coverage:") || summaryCompany===null');
check('Object.entries(VIEW_ROUTES).every(([view,route])=>parseLinkHash(friendlyHash("view="+view)).view===view)');
check('parseLinkHash(friendlyHash("view=table&q=robot%20%26%20vision&g=KR,US&sort=val&dir=-1")).q==="robot & vision"');
check('parseLinkHash(friendlyHash("view=relationships&ties=own,inv,tech,cust")).rels==="2" && !parseLinkHash(friendlyHash("view=relationships&ties=own,inv,tech,cust")).ties.includes("platform")');
console.log(`Done — ${checks} checks passed; JavaScript syntax valid.`);
