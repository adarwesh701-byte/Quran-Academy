import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

function getFetchHandler(options = {}) {
  const listeners = new Map();
  const puts = [];
  const cache = { addAll: () => Promise.resolve(), match: () => Promise.resolve(null), put: (key) => { puts.push(key); return Promise.resolve(); } };
  const sandbox = {
    self: { addEventListener: (name, fn) => listeners.set(name, fn), skipWaiting: () => Promise.resolve(), clients: { claim: () => Promise.resolve() } },
    caches: { open: () => Promise.resolve(cache), keys: () => Promise.resolve([]), delete: () => Promise.resolve(true), match: () => Promise.resolve(null) },
    fetch: options.fetch || (() => Promise.resolve({ ok: true, clone() { return this; } })),
    URL, Response, Promise, setTimeout, clearTimeout, Math, location: { origin: 'https://itqan.example' }
  };
  vm.runInNewContext(source, sandbox, { filename: 'sw.js' });
  return { handler: listeners.get('fetch'), puts };
}

function makeRequest(requestUrl, headers = {}) {
  const values = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  return { method: 'GET', url: requestUrl, mode: 'cors', headers: { get: (key) => values[key.toLowerCase()] || null }, clone() { return this; } };
}
function wasIntercepted(handler, request) {
  let intercepted = false;
  handler({ request, respondWith() { intercepted = true; } });
  return intercepted;
}

test('configured Supabase project REST reads are handled by the data/API policies', () => {
  const { handler } = getFetchHandler();
  assert.equal(wasIntercepted(handler, makeRequest('https://ymycfxmigvvermsdnagm.supabase.co/rest/v1/sections?select=*', { apikey: 'public-anon-key', authorization: 'Bearer public-anon-key' })), true);
});

test('unrelated domains ending in supabase.co are not treated as the project API', () => {
  const { handler } = getFetchHandler();
  assert.equal(wasIntercepted(handler, makeRequest('https://attacker-supabase.co/rest/v1/sections?select=*')), false);
  assert.equal(wasIntercepted(handler, makeRequest('https://ymycfxmigvvermsdnagm.supabase.co.attacker.example/rest/v1/sections?select=*')), false);
});

test('nested attacker subdomains are not treated as the configured Supabase project', () => {
  const { handler } = getFetchHandler();
  assert.equal(wasIntercepted(handler, makeRequest('https://attacker.ymycfxmigvvermsdnagm.supabase.co/rest/v1/sections?select=*')), false);
});

test('authenticated RLS-scoped reads bypass the shared offline cache', async () => {
  const { handler, puts } = getFetchHandler();
  const request = makeRequest('https://ymycfxmigvvermsdnagm.supabase.co/rest/v1/contents?select=*', {
    apikey: 'public-anon-key', authorization: 'Bearer student-session-jwt'
  });
  assert.equal(wasIntercepted(handler, request), false);
  await Promise.resolve();
  assert.deepEqual(puts, []);
});

test('public anon-key reads remain eligible for offline caching', async () => {
  const { handler, puts } = getFetchHandler();
  const request = makeRequest('https://ymycfxmigvvermsdnagm.supabase.co/rest/v1/sections?select=*', {
    apikey: 'public-anon-key', authorization: 'Bearer public-anon-key'
  });
  let responsePromise;
  handler({ request, respondWith(promise) { responsePromise = promise; } });
  assert.ok(responsePromise);
  await responsePromise;
  await Promise.resolve();
  assert.deepEqual(puts, [request.url]);
});
