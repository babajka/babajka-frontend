#!/usr/bin/env bash
set -e

MODE=$1

DEPLOYMENTS_PATH="/home/wir-$MODE/deployed"

rm -rf "${DEPLOYMENTS_PATH}/frontend"
mv "${DEPLOYMENTS_PATH}/swap-frontend/babajka-frontend" "${DEPLOYMENTS_PATH}/frontend"

cd "${DEPLOYMENTS_PATH}/frontend"

if [ $MODE == "dev" ]; then
  JOB="frontend-staging"
elif [ $MODE == "prod" ]; then
  JOB="frontend-production"
else
  exit 1
fi

# In order for the command below to work properly make sure that lines
# case $- in
#     *i*) ;;
#       *) return;;
# esac
# in ~/.bashrc file on remote machine are commented out.
#
# Short explanation is: pm2 is not using interactive ssh.
pm2 restart pm2-config.json --only=$JOB
