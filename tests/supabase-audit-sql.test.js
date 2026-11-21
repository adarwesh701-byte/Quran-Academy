import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sql = fs.readFileSync(new URL('../docs/audit/SUPABASE-READONLY-AUDIT.sql', import.meta.url), 'utf8');

test('Supabase audit inventory contains only read-only SELECT statements', () => {
  const withoutComments = sql.replace(/--[^\n]*/g, '').trim();
  const statements = withoutComments.split(';').map((s) => s.trim()).filter(Boolean);
  assert.ok(statements.length >= 6, 'Expected multiple metadata inventory queries');
  for (const statement of statements) {
    assert.match(statement, /^select\b/i, `Non-SELECT statement found: ${statement.slice(0, 80)}`);
    assert.doesNotMatch(statement, /\b(insert\s+into|update\s+[\w.]+\s+set|delete\s+from|alter\s+(table|role|policy|function|schema)|drop\s+(table|role|policy|function|schema)|create\s+(table|role|policy|function|schema)|grant\s+|revoke\s+|truncate\s+)/i);
  }
});
