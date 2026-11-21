const test = require('node:test');
const assert = require('node:assert/strict');
const {
  parseUrl, isAllowedInApp, isAcademyOrigin, isPermissionAllowed, safeExternalUrl,
} = require('../security');

test('allows the configured Academy HTTPS origins', () => {
  assert.equal(isAllowedInApp('https://quran-itqan.com/'), true);
  assert.equal(isAllowedInApp('https://itqan-maqamat-academy.vercel.app/'), true);
  assert.equal(isAcademyOrigin('https://www.quran-itqan.com'), true);
});

test('rejects lookalike hosts, subdomains and insecure URLs', () => {
  assert.equal(isAllowedInApp('https://quran-itqan.com.attacker.example'), false);
  assert.equal(isAllowedInApp('https://evil.quran-itqan.com'), false);
  assert.equal(isAllowedInApp('http://quran-itqan.com'), false);
  assert.equal(isAllowedInApp('javascript:alert(1)'), false);
});

test('rejects credentials embedded in URLs', () => {
  assert.equal(isAllowedInApp('https://user:pass@quran-itqan.com'), false);
  assert.equal(safeExternalUrl('https://user:pass@example.com'), null);
});

test('only explicit trusted service hosts can open in-app', () => {
  assert.equal(isAllowedInApp('https://ymycfxmigvvermsdnagm.supabase.co'), true);
  assert.equal(isAllowedInApp('https://evil.paypal.com'), false);
  assert.equal(isAllowedInApp('https://paypal.com'), true);
});

test('permissions are limited to the Academy origin and allowlist', () => {
  assert.equal(isPermissionAllowed('https://quran-itqan.com', 'media'), true);
  assert.equal(isPermissionAllowed('https://evil.example', 'media'), false);
  assert.equal(isPermissionAllowed('https://quran-itqan.com', 'geolocation'), false);
  assert.equal(isPermissionAllowed('http://quran-itqan.com', 'media'), false);
});

test('external URLs allow HTTPS and mailto only', () => {
  assert.equal(safeExternalUrl('https://example.com/a'), 'https://example.com/a');
  assert.equal(safeExternalUrl('mailto:support@example.com'), 'mailto:support@example.com');
  assert.equal(safeExternalUrl('http://example.com'), null);
  assert.equal(safeExternalUrl('file:///etc/passwd'), null);
  assert.equal(safeExternalUrl('data:text/html,hi'), null);
});

test('parser rejects non-string and oversized inputs', () => {
  assert.equal(parseUrl(null), null);
  assert.equal(parseUrl('x'.repeat(4097)), null);
});
