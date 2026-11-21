// Pure payment-validation helpers shared with the archived Edge Function and Node tests.
export function isExactPayPalCapture(capture, orderId, expectedUsd) {
  if (!capture || typeof capture !== 'object') return false;
  const expected = Number(Number(expectedUsd).toFixed(2));
  const paid = Number(capture.amount?.value);
  return capture.status === 'COMPLETED'
    && capture.custom_id === orderId
    && capture.amount?.currency_code === 'USD'
    && Number.isFinite(paid)
    && paid === expected;
}

export function isValidPaymobTransaction(obj, expectedCents, allowedIntegrationIds) {
  if (!obj || typeof obj !== 'object') return false;
  const paidCents = Number(obj.amount_cents);
  const integrationId = Number(obj.integration_id);
  return obj.success === true
    && obj.pending === false
    && !obj.is_refunded
    && !obj.is_voided
    && String(obj.currency || '').toUpperCase() === 'EGP'
    && Number.isSafeInteger(paidCents)
    && paidCents === expectedCents
    && Number.isSafeInteger(integrationId)
    && allowedIntegrationIds.includes(integrationId)
    && expectedCents > 0;
}
