// v297: the Arabic UI must be Modern Standard Arabic (Fusha). Egyptian (and other dialect) teaching
// material is exempt. This guard counts strong Egyptian markers in quoted UI strings outside the
// dialect-curriculum blocks and fails if the count grows above the reviewed baseline.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
// Blocks whose content is dialect teaching material (or the v208 dialect->Fusha dictionary).
const DIALECT_BLOCKS = new Set(['v22', 'v25', 'v28', 'v71', 'v76', 'v88', 'v108', 'v109', 'v116', 'v208', 'v265']);
const marks = [...html.matchAll(/\/\*\s*=+\s*(v\d+)/g)].map(m => [m.index, m[1]]);
const blockAt = i => { let b = 'core'; for (const [p, v] of marks) { if (p > i) break; b = v; } return b; };
const lcStart = html.indexOf('const LC_RAW = {'), lcEnd = html.indexOf('LC = {}', lcStart);
const fuStart = html.indexOf('fu: { name', lcStart), guStart = html.indexOf('gu: { name', lcStart);
const inDialectData = i => (i > lcStart && i < fuStart) || (i > guStart && i < lcEnd);
const A = 'ء-ي';
const STRONG = new RegExp(`(?<![${A}])(مش|دلوقتي|عشان|علشان|إزاي|ازاي|عايز|عاوز|مفيش|مافيش|دوس|بتاعك|بتاعي|إمتى|ليه|فين|كده|لسه|بيتحفظ|هيظهر|اتحفظ|اتبعت)(?![${A}])`, 'g');

function count() {
  let n = 0; const samples = [];
  for (const m of html.matchAll(/"((?:[^"\\\n]|\\.)*[؀-ۿ](?:[^"\\\n]|\\.)*)"/g)) {
    if (inDialectData(m.index) || DIALECT_BLOCKS.has(blockAt(m.index))) continue;
    const hits = m[1].match(STRONG);
    if (hits) { n += hits.length; if (samples.length < 15) samples.push(m[1].slice(0, 80)); }
  }
  return { n, samples };
}

test('Fusha UI: no growth of Egyptian-dialect markers outside the dialect curricula', () => {
  const { n, samples } = count();
  const BASELINE = Number(process.env.FUSHA_BASELINE || 18);
  assert.ok(n <= BASELINE, `dialect markers in UI strings: ${n} > baseline ${BASELINE}\n` + samples.join('\n'));
});
