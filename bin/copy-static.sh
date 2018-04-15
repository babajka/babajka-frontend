#!/usr/bin/env bash

DIST_PATH="node_modules/babajka-markup/dist/"

rm -rf static
mkdir static

for dir in "fonts" "images" "styles";
    do
        cp -R ${DIST_PATH}${dir} static/
    done
