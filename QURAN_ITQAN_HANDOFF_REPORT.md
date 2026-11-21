# QURAN ITQAN — HANDOFF REPORT (v301, 2026-11-21)

## 1. Project Status
Single-file SPA (`index.html`, vanilla JS). v296–v301 are built and tested locally; **nothing is pushed or deployed**. UI_VERSION `2026-11-21-v301`, SW cache `itqan-v301`. All 7 tests + `scripts/quality-gate.mjs` pass. Overflow audit (owner, ar, 360px): 0 overflowing routes.

## 2. Completed
- T1 Audit of existing state (v300 base kept; nothing redone).
- T2 Root-cause horizontal overflow fix (CSS; no blanket overflow-x:hidden).
- T3 Exam Builder (`exam301`, route `Exam-Builder`): unit/lesson/topic tree, checkboxes, expand/collapse, all/none/clear/completed/invert, counts, coverage, expected count, exam kinds incl. comprehensive-on-completed.
- T4 Exam engine: selection-only questions, up to 50/session, no dupes, balance, difficulty, avoid-seen, honest shortage message, history.
- T5 Placement test: 50 questions, windowed level, per-unit strengths/weaknesses, level report card (report-hidden bug fixed).
- T6 Timer-skin CSS fix (container-query sizing).
- T7 Docs: CHANGELOG, MASTER_BACKLOG, this report.

## 3. Partial
- Timer skins: CSS fix applied, **no visual check of all 13 skins yet**.
- Placement: language tracks only (eg/fu/gu/pa).
- Overflow: owner/guest at 360/390 verified; teacher/student and 768–1280 not re-run after the final change.

## 4. Remaining
- Readable `Library_<uuid>` links.
- Tools dropdown glitch (screenshot 1).
- Navigation overhaul; section-display consistency pass.
- Question-bank growth (blocked on reviewed content).
- Node unit test for the pure exam engine.
- `tools/e2e/crawl.py` full run.

## 5. Current Bugs
- Tools dropdown: narrow box, label outside menu (not reproduced).
- `Library_<uuid>` URL not human-readable.

## 6. Files Modified
`index.html`, `sw.js`, `CHANGELOG.md`, `MASTER_BACKLOG.md`, `docs/blocks/v288.js` (slug `exam301`), `v293.js` (`ce293._x`), `v300.js` (exports `mkQ,newGame,SJ`; `tm300.watch`).

## 7. Files Added
`docs/blocks/v301.js`, `tools/e2e/exam301-builder.check.js`, `tools/e2e/placement301-report.check.js`, this report.

## 8. Tests
Existing 7 node tests pass; quality gate passes (incl. Fusha guard, question-bank validation). Playwright checks: exam selection/dupes/avoid-seen/mobile 390px layout; placement 50 unique questions, level 8 → report card renders.

## 9. Known Issues
Real question supply is limited by reviewed content: 10 abyb lessons (L2U01–02), 6 balagha lessons, 57 general Q&A (~291 total). ~241 lessons are audio-only drafts without questions. The builder shows the true count and never pads or invents religious content.

## 10. Next Steps
1) Visual check of 13 timer skins. 2) Reproduce/fix Tools dropdown. 3) Slug system for Library. 4) Re-run overflow for all roles/widths. 5) Add reviewed questions as content is approved. 6) Push/deploy only on owner's go-ahead.

## 11. Instructions for the Next AI
Never start from scratch; add on top. Blocks are IIFEs `/* ===== vNNN ===== */` before `// بدء التشغيل`, mirrored in `docs/blocks/`. Bump `UI_VERSION` and SW cache each version; don't touch the update-check regex. Test students as owner (`state.auth.profile.role='owner'`) since `/lang` is paywalled. Replies in Egyptian Arabic ending with "📌 المطلوب منك"; UI text Fusha; no AI Quran recitation; no source names/links on content; don't ask "shall I continue".
