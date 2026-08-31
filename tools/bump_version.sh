#!/bin/sh
set -e
cd "$(dirname "$0")/.."
current=$(grep -ohE 'style\.css\?v=[0-9]+' index.html | sed 's/.*v=//')
next=$((current + 1))
sed -i '' -E "s/\.(js|css)\?v=[0-9]+/.\1?v=$next/g" *.html
echo "v=$next"
