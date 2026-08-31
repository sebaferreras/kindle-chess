#!/bin/sh
set -e
cd "$(dirname "$0")/.."
for f in test/*.test.js; do
  echo "== $f"
  node "$f"
done
echo "== ES5 check"
if grep -nE '=>|`|(^|[;{}(=,])[[:space:]]*(const|let)[[:space:]]' *.html board.js bot.js chess.js endgames.js openings.js; then
  echo "ES6 syntax found"; exit 1
fi
echo "ok"
