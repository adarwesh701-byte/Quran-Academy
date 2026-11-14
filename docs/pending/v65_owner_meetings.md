# v65 — owner group meeting with guest approval (pending database approval)

The database migration for this feature was not applied: the database tool asked for the owner's confirmation and no answer came.
It adds: `owner_meetings` table, `approved/display_name/knocked_at` columns on `room_guests`,
RPCs `meet_knock`, `meet_admit`, `meet_waiting`, and a `meet` branch in `room_access` (owner = host, approved guests only).
Also needs "Allow anonymous sign-ins" enabled in Supabase → Authentication → Sign In / Providers so guests can join without an account.
