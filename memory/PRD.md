# THE DENIM ARCHIVE — Evidence of Living

## Problem Statement
Premium, interactive, award-quality single-page site for fictional denim brand "THE DENIM ARCHIVE",
campaign "Evidence of Living". Archival / forensic / quiet-luxury aesthetic. Every pair of denim
records a life; users upload worn-denim photos and receive an Archive Entry + Life Index.

## User Choices
- Video: placeholder poster, drop-in ready at /public/hero-film.mp4
- Backend: not required; Archive data static, Life Index generation mocked client-side
- 3D: CSS-3D transforms + framer-motion + lenis smooth scroll (no WebGL, per budget)

## Architecture
- React 19 SPA (no backend routes used). App.js composes 11 sections + footer.
- Design system in index.css: navy/kraft/denim/rust palette, Fraunces serif + IBM Plex Mono/Sans,
  grain + paper textures, custom pixel cursor, stamped buttons, torn edges.
- Key components (src/components/site): Nav, Hero, Manifesto, Insight, Film, Archive, ArchiveCard,
  Upload, CaseFile, Ooh, Retail, Social, Footer, CustomCursor, Placeholder.
- exportCard.js: canvas PNG export for "Download Evidence Card".
- data.js: 24 archive entries, taglines, insight tiles, OOH copy (all verbatim from brief).

## Implemented (2025)
- Hero: masked line-by-line headline reveal, 3D denim tilt on mouse, muted-loop bg video slot,
  count-up counter (42,817), stamped CTAs.
- Manifesto: numbered chapters, slow scroll reveals (verbatim copy).
- Insight: 6 macro tiles with 3D hover tilt + mono captions.
- Film: click-to-play modal, unmuted-on-open, full controls, close.
- Archive: counter block, filters (Stains/Tears/Fades/Repairs), sort dropdown, scroll-parallax tiles,
  detail modal with draggable 3D flip Archive Card + PNG download.
- Upload: drag/drop + browse, mocked Life Index generation with loading states, result card + reset.
- Case File, OOH horizontal strip, Retail pop-up, Instagram-style Social wall with click-to-unmute reel.
- Footer: rotating taglines + editorial marquee.
- Custom pixel magnifying-glass cursor site-wide (desktop), touch-safe on mobile.
- All image slots are labeled placeholder blocks with exact filenames + dimensions from the manifest.

## Testing
- iteration_1.json: frontend 100%, no blocking issues. Only benign framer-motion scroll warning.

## Backlog (P1/P2)
- P1: Drop in real hero-film.mp4 + real macro-denim photography into placeholder slots.
- P1: Optional real backend to persist community uploads + global counter.
- P2: WebGL upgrade for hero denim plane; share-to-social of Evidence Card.
