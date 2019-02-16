#!/usr/bin/env bash
set -e

git -C styles checkout -f develop
git -C styles pull origin develop
git add styles
npm i --prefix styles
