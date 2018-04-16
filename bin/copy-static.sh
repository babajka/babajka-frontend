#!/usr/bin/env bash

rm -rf static
mkdir static

# Please, be aware! cp -R implementation is different in Linux and macOS.
# The way it is written below works equally on both platforms.
cp -R "node_modules/babajka-markup/dist/static/." "static/"
