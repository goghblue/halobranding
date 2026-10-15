# MASTER v7.7 — MEDILYN Selected Work image only

Base: v7.6.

- Replaced `assets/selected-medilyn.webp` with the user-supplied original brochure image byte-for-byte (747 × 596), including its original visible edge/border and lighting.
- Updated only the MEDILYN image element in `index.html` with `object-fit:contain` and a neutral background, so its full original edges remain visible rather than cropped by the shared 4:3 tile.
- No other existing files changed. All other Selected Work imagery and case-study pages remain untouched.

Static checks: image path exists, MEDILYN card still links to case-medilyn.html, unrelated existing files are byte-identical. Browser testing not performed.
