#!/usr/bin/env bash
set -e

SCOPE=$1
if [[ $SCOPE == "dict" ]]; then
  SCRIPT_PATH="bin/fetchDict.js"
elif [[ $SCOPE == "team" ]]; then
  SCRIPT_PATH="bin/fetchTeam.js"
else
  echo "[FAIL] bad fetch scope: '$SCOPE'"
  exit 1
fi

# load env
export $(cat .env | xargs)

if [[ $BABAJKA_GOOGLE_API_KEY = "" ]]; then
  echo "[FAIL] no Google API key"
  exit 1
fi

node $SCRIPT_PATH

echo "[OK] fetched $SCOPE"
