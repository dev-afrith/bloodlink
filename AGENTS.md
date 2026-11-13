# BloodLink Architecture & Development Guidelines

## Brand & Mission
- **Brand**: BloodLink – Every Drop Connects a Life.
- **Identity**: Premium healthcare technology platform with deep crimson tones, clinical precision, and compassionate community design.

## Application Architecture
- Keep navigation on TanStack file routes and shared navigation/footer in the root shell; this preserves the framework's typed navigation and page metadata.
- Keep fictional records and pure filters in a browser-safe data module, and prototype submissions only in temporary React state; no backend or real medical coordination is part of this prototype.
- Define visual roles and reusable layout styles in `src/styles.css`; use design-system buttons and reduced-motion-aware Framer Motion for consistent interactions.
- Pre-optimize animation and form dependencies in Vite while preserving the template's React deduplication; late dependency discovery can split React module identity in an already-open preview.
- Self-host the chosen typefaces through Fontsource CSS imports; external font availability must not change the application's hierarchy or font weights.
