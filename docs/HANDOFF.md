# Itqan Academy — handoff for a new session

Anyone (a new chat, another account) can continue from here.

- Site: https://quran-academy-nine-dusky.vercel.app (Vercel auto-deploys `main`)
- Repo: adarwesh701-byte/Quran-Academy — the whole app is `index.html` (single-file SPA)
- Database: Supabase project `ymycfxmigvvermsdnagm`
- Edge functions: `ai` (Gemini → Pollinations, owner only), `art-gen`, `tts`, `vclone`, `book-import`

## How releases are made
1. Write a block `/* ===== vNNN ... */ (function(){ ... })();` and insert it right before the line `// بدء التشغيل` in `index.html`.
2. Bump `const UI_VERSION = "YYYY-MM-DD-vNNN"` and the cache name `itqan-vNNN` in `sw.js`.
3. Extract the main `<script>` (the one after the supabase-js tag) and run `node --check` on it.
4. Commit and push to `main`.

Globals worth knowing: `state`, `render`, `navigate`, `go16(route,arg)`, `useData(key,fn)`, `sb` (Supabase client), `setv(key,default)` / `saveSetting16(key,value)` (site-wide settings), `ownerSettings()` (owner settings page, wrapped by each version), `realRole()`, `toast`, `esc`, `L()`.

## Rules the owner set
- Egyptian Arabic in chat, questions numbered.
- English content must read as original English. Quran, text in «» or ﴿﴾, and Arabic lesson words stay Arabic.
- Nothing AI-generated reaches students before the owner approves it (`art_assets` status `review` → owner approves).
- The Quran is never AI-generated. Modern copyrighted books are never published in full.

## Latest work (v157–v159)
- Layout editor: classic / side rail / mixed / bottom dock, full width, numbered-grid dragging, per-page layouts, saved and preset designs (`shell158`, `snaps158` settings).
- Background image (`bgimg158`), custom icons and pages (`cust158`, route `cp158`).
- Wording requests table `text_requests` with owner approval.
- Word-by-word recitation audio from quran.com in the mushaf, plus richer mistake marking.

## Still open
- About 7,700 English UI strings in `en_natural.json`: continue from `mid.json` index 1650.
- Private per-student voice notes that auto-delete after 3 days.
- Classroom annotation overlay.
- Publishing centre (PPT/PDF/Drive).
- Payment gateway (Paymob suggested).
- Voice clone: Colab notebook `docs/itqan_voice_colab.ipynb`. The owner uploads the generated zips from Dashboard → Simulator → «🎙️ صوتك».
