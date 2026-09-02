# Development

Plain HTML + CSS + ES5 JavaScript, no dependencies, no build step. Everything must run in the Kindle Paperwhite's WebKit browser, which is why the code stays ES5 and the styles avoid animations, flexbox and grid.

## Modules

- `chess.js` — rules (legal moves, check, castling, en passant, promotion, mate/stalemate, FEN, SAN)
- `bot.js` — alpha-beta minimax with piece-square tables and time-bounded iterative deepening
- `board.js` — shared board (rendering, selection, orientation, move markers)
- `puzzles.js` — 2123 puzzles sampled from the Lichess CC0 database (rating 600–2400)
- `endgames.js` — endgame training positions (FEN, goal, move limit)
- `openings.js` — opening main lines (ECO codes from the CC0 lichess-org/chess-openings database)
- `style.css` — e-ink friendly styles: no animations, high contrast, no flexbox/grid
- `qr.js` — vendored qrcode-generator by Kazuhiko Arase (MIT), used by the export page

## Run locally

    cd ~/Dev/HalfCookieApps/KindleChess
    python3 -m http.server 8000
    ipconfig getifaddr en0

On the Kindle: Menu → Web Browser → `http://<IP>:8000/`

## Deploy

GitHub Pages serves the site from `main`. Before pushing, bump the asset version:

    ./tools/bump_version.sh

The Kindle browser caches aggressively (and GitHub Pages sends `max-age=600`), so every JS/CSS reference **and every internal page link** carries a `?v=N`/`&v=N` query. The bump script increments all of them plus the visible version in the menu footer, so each deploy turns every URL into a fresh one. Keep any new internal link versioned the same way.

## Tests

    ./test/run.sh

Runs the rules engine tests, validates every puzzle solution and every endgame position, and checks for ES6 syntax.

## Regenerate puzzles

Download `lichess_db_puzzle.csv.zst` from https://database.lichess.org/#puzzles and sample it,
filtering by popularity, number of plays and solution length (≤ 6 moves, queen promotions only).
