#!/usr/bin/env bash
set -e

bold=$(tput bold)
normal=$(tput sgr0)

MODE=$1
if [[ $MODE == "dev" ]]; then
  ENV="staging"
elif [[ $MODE == "prod" ]]; then
  ENV="production"
else
  echo '[FAIL] Mode (dev or prod) must be provided.'
  exit 1
fi

if [[ $MODE == "prod" ]]; then
  echo "You're about to deploy to ${bold}prod${normal}. Are you sure? (put the number)"
  select yn in "Yes" "No"; do
    case $yn in
      "Yes" ) break;;
      "No" ) exit 0;;
    esac
  done
fi

# load env
export $(cat .env | xargs)
bash bin/deploy/before-deploy.sh $MODE

echo "Building with ENV=$ENV"
WIR_ENV=$ENV npm run build

FRONTEND_REMOTE_SWAP_PATH="/home/wir-$MODE/deployed/swap-frontend/babajka-frontend/"
HOST="wir-$MODE@$MODE.wir.by"

ssh $HOST "mkdir -p \"${FRONTEND_REMOTE_SWAP_PATH}\""
rsync -r --delete-after --exclude=.git --exclude=node_modules . \
  $HOST:"${FRONTEND_REMOTE_SWAP_PATH}"
echo "[OK] Frontend pushed to $MODE server"

ssh $HOST 'bash -s' < bin/deploy/install-deps.sh $MODE
echo "[OK] Dependencies are installed"

ssh $HOST 'bash -s' < bin/deploy/postdeploy.sh $MODE
echo "[OK] Deployed to $MODE"

bash bin/deploy/after-deploy.sh $MODE
