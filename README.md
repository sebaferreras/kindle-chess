# Kindle Chess

A chess web app built for the Kindle Paperwhite browser: plain HTML + CSS + ES5 JavaScript, no dependencies, no build step.

Live: https://sebaferreras.github.io/kindle-chess/

## Pages

- `index.html` — menu
- `play.html` — play against the bot (levels 1–8, offer draw, resign)
- `puzzles.html` — tactical puzzles with your own puzzle rating; `?daily=1` serves one fixed puzzle per day with a solve streak (no rating impact)
- `games.html` — finished games, opening each one in a move-by-move review with verdicts; any reviewed position can be played out against the bot as a practice game (no rating)
- `export.html` — full-screen QR code for a finished game: scanning opens the PGN in Lichess's import form
- `training.html` — training hub: endgames (curated positions with a goal), opening lines to practice with spaced repetition (a clean run doubles the review interval up to 30 days, a slip resets it to 1; due lines are flagged in the list), and a coordinates trainer (tap the named square, best score saved)
- `stats.html` — results per level and puzzle progress

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

Before pushing to `main` (GitHub Pages serves from it), bump the asset version so the Kindle browser re-downloads the JS/CSS instead of using its cache:

    ./tools/bump_version.sh

## Tests

    ./test/run.sh

Runs the rules engine tests, validates every puzzle solution and every endgame position, and checks for ES6 syntax.

## Regenerate puzzles

Download `lichess_db_puzzle.csv.zst` from https://database.lichess.org/#puzzles and sample it,
filtering by popularity, number of plays and solution length (≤ 6 moves, queen promotions only).

## License and credits

The code is MIT licensed (see `LICENSE`). Third-party material:

- **Pieces**: "Cburnett" set from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces), by Colin M.L. Burnett, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Embedded as SVG in `style.css`.
- **Puzzles**: [Lichess puzzle database](https://database.lichess.org/#puzzles), CC0.
- **Opening names and ECO codes**: [lichess-org/chess-openings](https://github.com/lichess-org/chess-openings), CC0.
- **Bot evaluation tables**: values from the "Simplified Evaluation Function" on the [Chess Programming Wiki](https://www.chessprogramming.org/Simplified_Evaluation_Function).
