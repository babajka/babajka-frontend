#!/usr/bin/env bash
set -e

cd "/home/wir-$1/deployed/swap-frontend/babajka-frontend"

npm ci --ignore-scripts || true # HACK to ignore failing postinstall script.
npm run fetch-data
