// Generate the shareable vector map from the same data and renderer as the site.
const fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/boot\(\);\s*$/,'');
const context=vm.createContext({localStorage:{getItem:()=>null},document:{querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null},location:{hash:''}});
vm.runInContext(script,context);
const svg=vm.runInContext('summarySvg(summaryRows())',context);
fs.writeFileSync('physical-ai-overview-100.svg',svg);
console.log('Generated the 100-company vector overview.');
