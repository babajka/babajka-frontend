#!/usr/bin/env bash
set -e

# load env
export $(cat .env | xargs)

echo 'Create deployment status'
sha=$(git rev-parse HEAD)
npm run gds -- --token $GITHUB_TOKEN -a create -e dev -r $sha
npm run gds -- --token $GITHUB_TOKEN -a in_progress -e dev -r $sha

echo 'Building...'
WIR_ENV=staging npm run build

FRONTEND_REMOTE_SWAP_PATH="/home/wir-dev/deployed/swap-frontend/babajka-frontend/"
ssh wir-dev@dev.wir.by "mkdir -p \"${FRONTEND_REMOTE_SWAP_PATH}\""
rsync -r --delete-after --exclude=.git --exclude=node_modules . \
  wir-dev@dev.wir.by:"${FRONTEND_REMOTE_SWAP_PATH}"
echo 'Frontend pushed to server'

ssh wir-dev@dev.wir.by 'bash -s' < bin/dev/install-deps.sh
echo 'Dependencies are installed'

ssh wir-dev@dev.wir.by 'bash -s' < bin/dev/postdeploy.sh
echo 'Deployed'

npm run gds -- --token $GITHUB_TOKEN -a success -e dev -r $sha -l http://dev.wir.by
