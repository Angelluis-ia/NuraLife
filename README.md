# NuraLife

NuraLife is currently in its bootstrap phase. This repository now includes a clean project foundation so development can start with consistent standards from day one.

## Current status

- ✅ Repository initialized
- ✅ Contribution and collaboration guidelines added
- ✅ Baseline CI checks added
- ⏳ Product code pending

## Getting started

For now, this repository is documentation and process-first while the first application module is defined.

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


## Vista previa con `.exe`

Se agregó un lanzador llamado `run-nuralife.exe` para abrir una vista previa web local del estado actual del proyecto.

```bash
./run-nuralife.exe
```

Opcionalmente puedes indicar puerto:

```bash
./run-nuralife.exe 9090
```

> Nota: este `.exe` es un script ejecutable para entornos bash (Linux/macOS/WSL).

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
