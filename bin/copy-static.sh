#!/usr/bin/env bash

rm -rf static
mkdir static

cp -R "node_modules/babajka-markup/dist/static/" "static/"
