# 7-day free trial — server design (v296, NOT deployed)

The UI card exists (v296, `plans296.trial`). The start button only appears when `site_settings.plans296.trial = { on: true, server: true }`, and it only calls the Edge Function `trial7`. **The browser never unlocks content.** Until `trial7` exists the card says "Coming soon".

## Rules (from the owner's master prompt, page 12)
- Monthly free hour stays as is; the trial is offered after it has been used.
- Never auto-start: the user ticks "I agree" and presses Start.
- Valid card required through Paymob/PayPal (tokenized). No card/CVV stored in Supabase.
- Optional small authorization hold (e.g. 1 USD / provider minimum) shown **before** confirmation, then voided by the provider. Never claim a refund that the provider did not confirm.
- Access opens only after a verified server-side webhook; failure → clear message, nothing opens.
- No paid subscription charge before the trial ends without explicit consent.
- One trial per user (and per card fingerprint if the provider returns one).

## Proposed schema
```sql
create table public.trials7 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','verified','active','failed','ended','cancelled')),
  provider text, provider_ref text, card_fingerprint text,
  hold_amount numeric, hold_currency text, hold_voided boolean default false,
  starts_at timestamptz, ends_at timestamptz,
  created_at timestamptz default now(),
  unique (user_id)
);
alter table public.trials7 enable row level security;
create policy trials7_own_read on public.trials7 for select using (user_id = auth.uid() or public.is_owner());
-- no insert/update policy: only the Edge Function (service role) writes.
```
Access: on `verified` webhook the function inserts `content_access(user_id, scope='all', expires_at=now()+7 days, source='trial7')` in the **same transaction** (RPC `trial7_activate(p_id)` `security definer`, `revoke execute from anon, authenticated`).

## Edge Function `trial7`
- `POST {action:"start"}` (JWT required): refuse if a row exists for the user; create `pending` row; create provider verification intent (Paymob card verification / PayPal vault setup); return `{url}`.
- `POST ?webhook=paymob|paypal` (no JWT): verify HMAC/signature (constant-time), amount, currency, idempotency on `provider_ref`; call `trial7_activate`; void the hold through the provider API; record `hold_voided` only from the provider response.
- Cron: mark `ended` after `ends_at`.

## Needed from the owner
Payment gateway account with card-verification/tokenization enabled (Paymob or PayPal), sandbox credentials stored by the owner in `private_settings` (never in chat), and approval to deploy.
