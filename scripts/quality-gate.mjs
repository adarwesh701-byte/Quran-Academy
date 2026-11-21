import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const failures = [];
function run(label, command, args) {
  const r = spawnSync(command, args, { cwd: root, encoding: 'utf8' });
  if (r.status !== 0) {
    failures.push(label);
    process.stderr.write(`\n[FAIL] ${label}\n${r.stdout || ''}${r.stderr || ''}`);
  } else console.log(`[PASS] ${label}`);
}
function walk(dir, predicate, out=[]) {
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    if (['.git','node_modules','dist','android'].includes(e.name)) continue;
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p,predicate,out); else if(predicate(p)) out.push(p);
  }
  return out;
}
const jsonFiles=walk(root,p=>p.endsWith('.json'));
for(const f of jsonFiles){ try{JSON.parse(fs.readFileSync(f,'utf8'));}catch(e){failures.push(`JSON ${path.relative(root,f)}: ${e.message}`);} }
console.log(`[${failures.length?'FAIL':'PASS'}] JSON parse (${jsonFiles.length} files)`);
const jsFiles=walk(root,p=>p.endsWith('.js') && !p.includes(`${path.sep}docs${path.sep}`));
for(const f of jsFiles) run(`JS syntax ${path.relative(root,f)}`,'node',['--check',f]);
const pyFiles=walk(root,p=>p.endsWith('.py'));
if(pyFiles.length) run(`Python syntax (${pyFiles.length} files)`,'python3',['-c','import ast,pathlib,sys; [ast.parse(pathlib.Path(p).read_text(encoding=\"utf-8\"), filename=p) for p in sys.argv[1:]]',...pyFiles]);
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const scriptTags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
let inlineChecked = 0;
for (const [,attrs,body] of scriptTags) {
  if (/\bsrc\s*=/.test(attrs) || !body.trim()) continue;
  if (/type\s*=\s*[\"']application\/ld\+json[\"']/i.test(attrs)) {
    try { JSON.parse(body); } catch (e) { failures.push(`JSON-LD: ${e.message}`); }
    continue;
  }
  inlineChecked++;
  const r = spawnSync('node',['--check','-'],{cwd:root,input:body,encoding:'utf8'});
  if (r.status !== 0) { failures.push('Inline JavaScript syntax in index.html'); process.stderr.write(r.stderr || ''); }
}
console.log(`[${failures.length?'FAIL':'PASS'}] index.html inline scripts (${inlineChecked} JS blocks + JSON-LD)`);
run('Desktop URL security unit tests','node',['--test','apps/desktop/test/security.test.js']);
run('Service worker request-routing security tests','node',['--test','tests/service-worker-security.test.js']);
run('PWA manifest and precache asset tests','node',['--test','tests/pwa-assets.test.js']);
run('Android/Desktop release workflow consistency tests','node',['--test','tests/release-workflows.test.js']);
run('Archived payment validation tests','node',['--test','tests/payment-validation.test.js']);
run('Read-only Supabase audit SQL safety test','node',['--test','tests/supabase-audit-sql.test.js']);
run('Question bank validation (single correct answer, no duplicate options)','node',['--test','tests/question-bank-validation.test.js']);
run('Fusha UI language guard (Egyptian markers outside dialect curricula)','node',['--test','tests/fusha-ui-language.test.js']);
if(failures.length){console.error(`\nQuality gate failed: ${failures.length} issue(s)`);process.exit(1)}
console.log('\nQuality gate passed. This is static validation, not a production/security certification.');
