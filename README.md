# NuraLife

NuraLife is currently in its bootstrap phase. This repository now includes a clean project foundation so development can start with consistent standards from day one.

## Current status

- ✅ Repository initialized
- ✅ Contribution and collaboration guidelines added
- ✅ Baseline CI checks added
- ✅ Basic static landing page added for Vercel deployments
- ⏳ Product application module pending

## Getting started

This repository is still documentation and process-first, but now includes a minimal static landing page so deployments (for example, in Vercel) do not return 404 while the first application module is defined.

### 1) Clone repository

```bash
git clone <your-repo-url>
cd NuraLife
```

### 2) Create your local environment file

```bash
cp .env.example .env
```

### 3) Validate baseline checks

```bash
bash scripts/ci/checks.sh
```

## Recommended next implementation steps

1. Define target stack (e.g. Next.js, FastAPI, or Node API).
2. Create initial app skeleton under a clear folder structure.
3. Add linter/test commands for the selected stack.
4. Extend CI to run lint/test/build.

## Repository structure

```text
.
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
├── docs/
│   └── architecture.md
├── scripts/
│   └── ci/
│       └── checks.sh
├── .editorconfig
├── .env.example
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```
