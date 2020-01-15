#!/usr/bin/env bash
set -e

MODE=$1

npm run gds -- --token $GH_TOKEN -a success -e $MODE -r $(git rev-parse HEAD) -l "https://$MODE.wir.by"
