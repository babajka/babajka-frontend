#!/usr/bin/env bash

MARKUP_DIST="styles"

rm -rf static
mkdir static
mkdir static/stubs

# Please, be aware! cp -R implementation is different between Linux and macOS.
# The way it is written below works equally on both platforms.
cp -R "${MARKUP_DIST}/static/." "static/"
cp -R "${MARKUP_DIST}/stubs/." "static/stubs/"

cp -R node_modules/Dante2/dist/ static/Dante2
cp -R node_modules/react-datetime/css/ static/react-datetime
