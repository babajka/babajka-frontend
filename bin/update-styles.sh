#!/usr/bin/env bash
set -e

git -C styles checkout -f master
git -C styles pull origin master
git add styles
npm i --prefix styles
