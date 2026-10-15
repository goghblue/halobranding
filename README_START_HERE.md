# HALO v10 — MASTER (2026-10-14) — 작업 규칙 (GPT에게 수정 요청 전 이 파일을 먼저 붙여넣기)

Open `index.html` to start. `assets/` = images. `_archive/` = old files, not loaded.

## Layout lives in ONE place: `halo-standard.css`
- The MAIN PAGE (`index.html`) is the standard. It is FIXED — do not edit it.
- `halo-standard.css` copies the main page's header, footer, logo, menu, button, page width (1240px) and fonts
  (Arial body, Poppins headings) and loads on EVERY page incl. index.html, so it overrides older CSS.
- Top menu: links 14px, button 13px, gap 28px (v10 nav size update).
- Header / logo / menu / width / footer changes for ALL pages → edit `halo-standard.css` only.

## Case-study hero format (all 6 case pages, Hanwha format)
Eyebrow "Client / Project · Year" → title → lead → facts row (`.case-meta`: Client · Year · Role · Sector) | one 4:3 image right.
New case page = copy this hero markup; never invent a different hero layout.

## v10: typography & rhythm system — `halo-type-system.css`
Loads LAST on every page (after halo-standard.css). It owns ALL text sizes and vertical spacing:
- 9 type tiers: display / h2 / h3 / h4 / lead / body 16 / small 14 / caption 12 / label 12 (uppercase)
- 8px spacing grid; every section 120px top & bottom (72px mobile); title → text 24px; paragraph gap 16px
- Body line length max 65 characters; one eyebrow label per section, no "01 /" numbering
- Scroll comfort: anchors clear the sticky header, reading-progress bar on case pages, faster reveal
To change a size or gap: edit the variable at the top of halo-type-system.css, never a page file.

## Rules for any edit
1. Change layout ONLY in `halo-standard.css`. Never add header, logo, width or font-size CSS inside a `case-*.html` file.
2. Edit only the ONE file named in the request. Do not rewrite, regenerate or omit any other file.
3. Never delete a page, section, link or `<script>`. Ask first.
   Never change the header HTML (`<header class="navhead">…`) — page scripts depend on it.
   Every page uses the SAME footer HTML as index.html. To change the footer, change it on all pages identically.
4. Reply with only the changed lines ("before → after"), not the whole file.
5. Every case page must keep: `<header class="navhead">` → `<div class="case-back">` → `<main>`, and load `halo-standard.css` then `halo-type-system.css` as the LAST two lines before `</head>`.
6. Never create a new override CSS file (no more master-vX / page-consistency-vX). Edit `halo-standard.css` instead.

## Pages that must always exist
index, method, services, cases, insights, about, contact, diagnostic, privacy,
case-samsung, case-hanwha, case-cheonseo, case-medilyn, case-dobano, case-saju
(case-sajugpt / saju / sajugpt are redirects to case-saju).

## Clients & partners logos
- Static 6-column grid (index.html `.brandstrip .logos`). Add a logo = one `<div class="logo-item"><img …></div>` line; it aligns into the next row automatically.
- Logo files: single grey #585858 on transparent, PNG ≥ 800px wide or SVG. Per-logo optical size tweaks live in halo-type-system.css (SajuGPT 22px, Hanwha Intelligence 52px).
- When logos exceed 12 (more than 2 rows): switch to the auto-flow marquee. Reference build: `_archive/logo-marquee-reference.html` (copy its <style> block and the `.marquee-track` wrapper with duplicated, aria-hidden logos).

