# Kindle Chess

A complete chess app that runs in the Kindle Paperwhite's web browser.

**Live: https://sebaferreras.github.io/kindle-chess/**

Everything is designed for e-ink — high contrast, no animations — and everything you do (games, ratings, streaks, review schedules) is stored on the device itself. No account, no server, nothing leaves your Kindle.

## Play vs bot

Play full games against a bot with 8 difficulty levels. You get your own Elo rating that goes up and down with each rated game, and the app suggests the level that best matches it. You can offer a draw (the bot only accepts when the position justifies it) or resign.

## Puzzles

Tactical puzzles matched to your own puzzle rating, which adjusts as you solve or fail them. A theme selector lets you drill one motif at a time — mate in 1, mate in 2, forks, pins, skewers, discovered attacks, endgames and more. If you're stuck, "Show solution" reveals the line (solving with help doesn't count for rating).

## Daily puzzle

One fixed puzzle per day. Solving it keeps your streak alive — miss a day and the streak resets, but your best streak is remembered. The daily puzzle never affects your puzzle rating, so it's a ritual, not a gamble.

## My games & review

Every finished game is saved and can be reviewed move by move:

- Each move — yours **and** the bot's — gets a verdict (Good, Inaccuracy, Mistake, Blunder, Brilliant) plus the evaluation of what you played vs. the best move, so you can see exactly how much a mistake cost.
- **Play from here**: continue any position of a reviewed game against the bot as a practice game. Great for retrying the game from just before a blunder. Practice games don't affect your rating.
- **QR export**: one tap shows a full-screen QR code; scan it with your phone and the game opens in Chess.com's analysis board, ready for a Game Review with every move graded (best, inaccuracy, mistake, blunder…).

## Training

- **Openings**: guided lessons that explain each move of a line, then a practice mode where you play it from memory. Practice uses **spaced repetition**: a clean run doubles the review interval (1 → 2 → 4 → … → 30 days), a slip brings the line back tomorrow. The openings list shows "Due for review today: N" and flags the lines waiting for you. Recommended starter lines are marked with ★.
- **Endgames**: curated positions with a concrete goal (mate with a queen, promote the pawn, hold the draw…) within a move limit.
- **Coordinates**: a trainer that names a square and asks you to tap it — rounds of 10, from both sides of the board, with your best score saved.

## Statistics

Results per bot level, your Elo rating with its peak, puzzle rating with solved/failed counts, and your daily-puzzle streak.

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for the architecture, running locally, tests and deploy.

## License and credits

The code is MIT licensed (see `LICENSE`). Third-party material:

- **Pieces**: "Cburnett" set from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces), by Colin M.L. Burnett, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Embedded as SVG in `style.css`.
- **Puzzles**: [Lichess puzzle database](https://database.lichess.org/#puzzles), CC0.
- **Opening names and ECO codes**: [lichess-org/chess-openings](https://github.com/lichess-org/chess-openings), CC0.
- **Bot evaluation tables**: values from the "Simplified Evaluation Function" on the [Chess Programming Wiki](https://www.chessprogramming.org/Simplified_Evaluation_Function).
- **QR codes**: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase, MIT (vendored as `qr.js`).
