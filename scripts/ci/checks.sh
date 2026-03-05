#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "README.md"
  "CONTRIBUTING.md"
  "CODE_OF_CONDUCT.md"
  "LICENSE"
  ".env.example"
  ".github/workflows/ci.yml"
  "app/index.html"
  "app/styles.css"
  "app/main.js"
  "run-nuralife.exe"
  "vercel.json"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

if [[ ! -x "scripts/ci/checks.sh" ]]; then
  echo "scripts/ci/checks.sh must be executable"
  exit 1
fi

if [[ ! -x "run-nuralife.exe" ]]; then
  echo "run-nuralife.exe must be executable"
  exit 1
fi

echo "Baseline checks passed."
