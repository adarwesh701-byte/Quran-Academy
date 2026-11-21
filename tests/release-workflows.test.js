import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/apps.yml'), 'utf8');
const config = JSON.parse(fs.readFileSync(path.join(root, 'apps/android/capacitor.config.json'), 'utf8'));
const desktop = JSON.parse(fs.readFileSync(path.join(root, 'apps/desktop/package.json'), 'utf8'));

test('Android packaging creates webDir and copies all app assets before Capacitor add', () => {
  const androidJob = workflow.split('  android:')[1]?.split('  desktop:')[0] ?? '';
  assert.ok(androidJob, 'Android workflow job is missing');
  const mkdir = androidJob.indexOf('mkdir -p www');
  const copy = androidJob.indexOf('cp ../../index.html www/index.html');
  const capAdd = androidJob.indexOf('npx cap add android');
  assert.ok(mkdir >= 0 && copy > mkdir && capAdd > copy, 'Expected mkdir, asset copy, then Capacitor Android add');
  assert.equal(config.webDir, 'www');
  for (const rel of ['index.html', 'sw.js', 'manifest.json', 'icons', 'qr']) {
    assert.ok(fs.existsSync(path.join(root, rel)), `Missing Android web asset source: ${rel}`);
  }
  assert.ok(androidJob.includes('cp ../desktop/icon.png /tmp/icon.png'), 'Android icon source path must resolve from apps/android');
  assert.ok(androidJob.includes('$GITHUB_WORKSPACE/apps/itqan-academy-android-debug.apk'), 'APK must be copied to the artifact upload path');
  assert.ok(androidJob.includes('actions/upload-artifact@v4'), 'Android build must upload an artifact');
});

test('desktop package includes offline site directory and each OS uploads build artifacts', () => {
  const desktopJob = workflow.split('  desktop:')[1]?.split('  publish-preview:')[0] ?? '';
  assert.ok(desktopJob.includes('mkdir -p site'), 'Desktop workflow must create its site directory');
  assert.ok(desktop.build.files.includes('site/**/*'), 'Electron package must include site/**/*');
  assert.ok(desktopJob.includes('actions/upload-artifact@v4'), 'Desktop builds must upload artifacts');
  assert.ok(desktopJob.includes('path: apps/desktop/dist/**'), 'Desktop artifact path must match build output');
});

test('app builds are manual preview releases, published once after all builds complete', () => {
  const triggers = workflow.split('jobs:')[0];
  assert.match(triggers, /workflow_dispatch:/);
  assert.doesNotMatch(triggers, /^\s{2}(push|pull_request):/m);
  assert.match(workflow, /needs: \[android, desktop\]/);
  assert.match(workflow, /tag_name: apps-preview/);
  assert.match(workflow, /prerelease: true/);
  assert.match(workflow, /Android APK is a debug build/);
});
