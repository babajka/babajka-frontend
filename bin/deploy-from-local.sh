#!/usr/bin/env bash

npm run build

rsync -r --delete-after --exclude=.git --exclude=node_modules --exclude=styles . wir-dev@dev.wir.by:/home/wir-dev/deployed/swap-frontend/babajka-frontend/

echo 'pushed to server'

ssh wir-dev@dev.wir.by 'bash -s' < bin/install-prod-deps.sh

echo 'dependencies are installed'

ssh wir-dev@dev.wir.by 'bash -s' < bin/postdeploy-dev.sh

echo 'deployed'
