#!/usr/bin/env bash
# Starts the legacy app (repo root) on :3000 with its own Node version (root .nvmrc), for the
# visual-parity baseline (`npm run visual:baseline`). Needs the root `npm ci` and root `.env`.
set -euo pipefail

# nvm is a shell function, so source it. Its location depends on how it was installed.
candidates=(
  "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  "/opt/homebrew/opt/nvm/nvm.sh"
  "/usr/local/opt/nvm/nvm.sh"
)
if command -v brew >/dev/null 2>&1; then
  candidates+=("$(brew --prefix nvm 2>/dev/null)/nvm.sh")
fi

for nvm_sh in "${candidates[@]}"; do
  if [[ -s "$nvm_sh" ]]; then
    export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    # shellcheck disable=SC1090
    . "$nvm_sh"
    cd "$(dirname "$0")/../.."
    # `nvm` is a shell function, so it can't be exec'd: switch Node, then exec npm (one process
    # for Playwright to stop).
    nvm use >/dev/null
    exec npm run dev
  fi
done

echo "start-legacy: nvm not found (tried: ${candidates[*]}). Start legacy on :3000 yourself, or set LEGACY_URL." >&2
exit 1
