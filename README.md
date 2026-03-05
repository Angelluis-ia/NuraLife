# NuraLife

NuraLife is currently in its bootstrap phase. The repository now includes a first runnable MVP module (daily wellness check-in) on top of the initial project standards.

## Current status

- ✅ Repository initialized
- ✅ Contribution and collaboration guidelines added
- ✅ Baseline CI checks added
- ✅ First MVP module available (`app/` check-in diario)

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


## Deploy en Vercel (fix de 404 NOT_FOUND)

Si Vercel muestra `404: NOT_FOUND`, normalmente es porque la app está en `app/` y no en la raíz.

Este repositorio incluye `vercel.json` para reescribir `/` hacia `app/index.html`.

Pasos:

1. Vuelve a desplegar el último commit.
2. En Vercel, asegúrate de que **Root Directory** sea la raíz del repo (`.`).
3. Framework preset: **Other** (sitio estático).

## Recommended next implementation steps

1. Add testing for `app/main.js` behavior (form + storage).
2. Split UI into reusable components when migrating to a framework.
3. Add backend API for persisting check-ins.
4. Extend CI to run lint/test/build for the selected final stack.

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
├── app/
│   ├── index.html
│   ├── main.js
│   └── styles.css
├── run-nuralife.exe
└── README.md
```
