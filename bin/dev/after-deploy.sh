#!/usr/bin/env bash

npm run gds -- --token $GH_TOKEN -a success -e $1 -r $(git rev-parse HEAD) -l http://dev.wir.by
