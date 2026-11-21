import test from 'node:test';
import assert from 'node:assert/strict';
import { isExactPayPalCapture, isValidPaymobTransaction } from '../backup/edge-functions/payments/security.js';

test('PayPal capture requires exact order, completed state, USD and exact cents', () => {
  const good = { status: 'COMPLETED', custom_id: 'order-1', amount: { currency_code: 'USD', value: '10.00' } };
  assert.equal(isExactPayPalCapture(good, 'order-1', 10), true);
  assert.equal(isExactPayPalCapture({ ...good, amount: { ...good.amount, value: '10.01' } }, 'order-1', 10), false);
  assert.equal(isExactPayPalCapture({ ...good, amount: { ...good.amount, value: '100.00' } }, 'order-1', 10), false);
  assert.equal(isExactPayPalCapture(good, 'order-2', 10), false);
  assert.equal(isExactPayPalCapture({ ...good, amount: { ...good.amount, currency_code: 'EGP' } }, 'order-1', 10), false);
  assert.equal(isExactPayPalCapture({ ...good, status: 'PENDING' }, 'order-1', 10), false);
});

test('Paymob transaction requires exact amount, EGP, terminal success and approved integration', () => {
  const good = { success: true, pending: false, is_refunded: false, is_voided: false, currency: 'EGP', amount_cents: 12500, integration_id: 77 };
  assert.equal(isValidPaymobTransaction(good, 12500, [77]), true);
  assert.equal(isValidPaymobTransaction({ ...good, integration_id: 88 }, 12500, [77]), false);
  assert.equal(isValidPaymobTransaction({ ...good, amount_cents: 12501 }, 12500, [77]), false);
  assert.equal(isValidPaymobTransaction({ ...good, currency: 'USD' }, 12500, [77]), false);
  assert.equal(isValidPaymobTransaction({ ...good, pending: true }, 12500, [77]), false);
  assert.equal(isValidPaymobTransaction({ ...good, is_refunded: true }, 12500, [77]), false);
});
