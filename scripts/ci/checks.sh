#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "README.md"
  "CONTRIBUTING.md"
  "CODE_OF_CONDUCT.md"
  "LICENSE"
  ".env.example"
  ".github/workflows/ci.yml"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

# Ensure all shell scripts are executable where expected.
if [[ -f "scripts/ci/checks.sh" ]] && [[ ! -x "scripts/ci/checks.sh" ]]; then
  echo "scripts/ci/checks.sh must be executable"
  exit 1
fi

echo "Baseline checks passed."
