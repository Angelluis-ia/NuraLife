# Architecture (Initial Baseline)

This project now includes a no-dependency frontend MVP served locally with Python HTTP server.

## Proposed direction

- **Current MVP stack:** Vanilla HTML/CSS/JS (no external dependencies).
- Keep repository modular to support later migration to framework stack.
- Separate app logic (`app/`) from process/docs.

## Current layout and next target

```text
app/
  index.html
  main.js
  styles.css

Target after stack selection:
apps/
  web/
  api/
packages/
  shared/
```

## Decision log starter

Track key technical decisions in this document or a dedicated ADR folder.
