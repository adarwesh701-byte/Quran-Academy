import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

test('PWA manifest icons exist in the release tree', () => {
  for (const icon of manifest.icons ?? []) {
    const iconPath = path.join(root, icon.src.replace(/^\//, ''));
    assert.ok(fs.existsSync(iconPath), `Missing PWA icon: ${icon.src}`);
    assert.ok(fs.statSync(iconPath).isFile(), `PWA icon is not a file: ${icon.src}`);
  }
});

test('service worker precache shell entries exist in the release tree', () => {
  const match = sw.match(/const SHELL = \[([^\]]+)\];/);
  assert.ok(match, 'Could not locate the service worker SHELL list');
  const entries = [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  assert.ok(entries.length > 0, 'Service worker SHELL list is empty');
  for (const entry of entries) {
    const diskPath = entry === '/' ? path.join(root, 'index.html') : path.join(root, entry.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Missing service worker shell asset: ${entry}`);
    assert.ok(fs.statSync(diskPath).isFile(), `Service worker shell entry is not a file: ${entry}`);
  }
});

test('PWA start URL remains within the declared application scope', () => {
  const scope = new URL(manifest.scope, 'https://itqan.example');
  const start = new URL(manifest.start_url, 'https://itqan.example');
  assert.equal(start.origin, scope.origin);
  assert.ok(start.pathname.startsWith(scope.pathname));
});
