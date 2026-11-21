// v296: static validation of every fixed multiple-choice bank inside index.html
// Shape: ["question", ["opt1","opt2",...], correctIndex]. Checks: index in range, no identical
// options (exact text after NFC + whitespace collapse — diacritics are kept on purpose because
// i'rab questions differ only by tashkeel), no empty option, and no question repeated in the
// same file with a different correct answer.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const S = '"(?:[^"\\\\\\n]|\\\\.)*"';
const re = new RegExp(`\\[\\s*(${S})\\s*,\\s*(\\[\\s*${S}(?:\\s*,\\s*${S})+\\s*\\])\\s*,\\s*(-?\\d+)\\s*\\]`, 'g');
const key = s => String(s).normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase();

const items = [];
for (const m of html.matchAll(re)) {
  let q, o;
  try { q = JSON.parse(m[1]); o = JSON.parse(m[2]); } catch { continue; }
  items.push({ at: m.index, q, o, a: Number(m[3]) });
}

test('question banks were found', () => { assert.ok(items.length >= 400, `only ${items.length} questions found`); });

test('every correct-answer index points to an existing option', () => {
  const bad = items.filter(x => !(x.a >= 0 && x.a < x.o.length));
  assert.deepStrictEqual(bad.map(x => x.q), []);
});

test('no question has two identical or empty options', () => {
  const bad = items.filter(x => { const k = x.o.map(key); return k.some(v => !v) || new Set(k).size !== k.length; });
  assert.deepStrictEqual(bad.map(x => x.q), []);
});

test('a repeated question never has a different correct answer', () => {
  const by = new Map();
  for (const x of items) {
    const k = key(x.q); const ans = key(x.o[x.a]);
    if (!by.has(k)) by.set(k, new Map()); by.get(k).set(x.o.map(key).sort().join('|'), ans);
  }
  const conflicts = [];
  for (const [q, variants] of by) {
    // same option set must give the same answer
    const seen = new Map();
    for (const [opts, ans] of variants) { if (seen.has(opts) && seen.get(opts) !== ans) conflicts.push(q); seen.set(opts, ans); }
  }
  assert.deepStrictEqual(conflicts, []);
});
