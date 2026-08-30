(function (global) {
  'use strict';

  var FILES = 'abcdefgh';
  var VALUES = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };
  var MATE_SCORE = 100000;

  var LEVELS = {
    1: { depth: 1, timeMs: 0, candidates: 5, positional: false },
    2: { depth: 1, timeMs: 0, candidates: 3, positional: false },
    3: { depth: 2, timeMs: 0, candidates: 2, positional: true },
    4: { depth: 2, timeMs: 0, candidates: 1, positional: true },
    5: { depth: 6, timeMs: 2000, candidates: 1, positional: true },
    6: { depth: 6, timeMs: 4000, candidates: 1, positional: true },
    7: { depth: 8, timeMs: 6000, candidates: 1, positional: true },
    8: { depth: 8, timeMs: 10000, candidates: 1, positional: true }
  };

  var PAWN = [
    0, 0, 0, 0, 0, 0, 0, 0,
    5, 10, 10, -20, -20, 10, 10, 5,
    5, -5, -10, 0, 0, -10, -5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, 5, 10, 25, 25, 10, 5, 5,
    10, 10, 20, 30, 30, 20, 10, 10,
    50, 50, 50, 50, 50, 50, 50, 50,
    0, 0, 0, 0, 0, 0, 0, 0
  ];
  var KNIGHT = [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50
  ];
  var BISHOP = [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -10, -10, -10, -10, -20
  ];
  var ROOK = [
    0, 0, 0, 5, 5, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    5, 10, 10, 10, 10, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0
  ];
  var QUEEN = [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -10, 5, 5, 5, 5, 5, 0, -10,
    0, 0, 5, 5, 5, 5, 0, -5,
    -5, 0, 5, 5, 5, 5, 0, -5,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20
  ];
  var KING_MIDDLE = [
    20, 30, 10, 0, 0, 10, 30, 20,
    20, 20, 0, 0, 0, 0, 20, 20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30
  ];
  var KING_END = [
    -50, -30, -30, -30, -30, -30, -30, -50,
    -30, -30, 0, 0, 0, 0, -30, -30,
    -30, -10, 20, 30, 30, 20, -10, -30,
    -30, -10, 30, 40, 40, 30, -10, -30,
    -30, -10, 30, 40, 40, 30, -10, -30,
    -30, -10, 20, 30, 30, 20, -10, -30,
    -30, -20, -10, 0, 0, -10, -20, -30,
    -50, -40, -30, -20, -20, -30, -40, -50
  ];
  var TABLES = { P: PAWN, N: KNIGHT, B: BISHOP, R: ROOK, Q: QUEEN };

  function tableIndex(sq, color) {
    var file = FILES.indexOf(sq.charAt(0));
    var rank = parseInt(sq.charAt(1), 10) - 1;

    if (color === 'b') rank = 7 - rank;

    return rank * 8 + file;
  }

  function isEndgame(state) {
    var queens = 0;
    var minorAndMajor = 0;

    for (var sq in state.pieces) {
      var type = state.pieces[sq].charAt(1);

      if (type === 'Q') queens++;

      if (type === 'N' || type === 'B' || type === 'R') minorAndMajor++;
    }

    return queens === 0 || minorAndMajor <= 2;
  }

  function evaluate(state, color, positional) {
    var score = 0;
    var kingTable = positional && isEndgame(state) ? KING_END : KING_MIDDLE;

    for (var sq in state.pieces) {
      var piece = state.pieces[sq];
      var pieceColor = piece.charAt(0);
      var type = piece.charAt(1);
      var value = VALUES[type];

      if (positional) {
        var table = type === 'K' ? kingTable : TABLES[type];
        value += table[tableIndex(sq, pieceColor)];
      }

      score += pieceColor === color ? value : -value;
    }

    return score;
  }

  function allMoves(state) {
    var moves = [];

    for (var from in state.pieces) {
      var targets = Chess.legalMoves(state, from);

      for (var i = 0; i < targets.length; i++) {
        var victim = state.pieces[targets[i]];
        moves.push({ from: from, to: targets[i], gain: victim ? VALUES[victim.charAt(1)] : 0 });
      }
    }

    moves.sort(function (a, b) {
      return b.gain - a.gain;
    });

    return moves;
  }

  function Search(color, positional, deadline) {
    this.color = color;
    this.positional = positional;
    this.deadline = deadline;
    this.timedOut = false;
  }

  Search.prototype.checkTime = function () {
    if (this.deadline && Date.now() > this.deadline) this.timedOut = true;
  };

  Search.prototype.negamax = function (state, depth, alpha, beta) {
    if (depth === 0) return evaluate(state, this.color, this.positional);

    var moves = allMoves(state);

    if (!moves.length) {
      if (!Chess.inCheck(state, state.turn)) return 0;

      return state.turn === this.color ? -MATE_SCORE - depth : MATE_SCORE + depth;
    }

    var maximizing = state.turn === this.color;
    var best = maximizing ? -Infinity : Infinity;

    for (var i = 0; i < moves.length; i++) {
      this.checkTime();

      if (this.timedOut) return best;

      var score = this.negamax(Chess.applyMove(state, moves[i].from, moves[i].to), depth - 1, alpha, beta);

      if (maximizing) {
        best = Math.max(best, score);
        alpha = Math.max(alpha, score);
      } else {
        best = Math.min(best, score);
        beta = Math.min(beta, score);
      }

      if (beta <= alpha) break;
    }

    return best;
  };

  Search.prototype.rankMoves = function (state, depth) {
    var moves = allMoves(state);
    var ranked = [];

    for (var i = 0; i < moves.length; i++) {
      var score = this.negamax(Chess.applyMove(state, moves[i].from, moves[i].to), depth - 1, -Infinity, Infinity);

      if (this.timedOut) return null;

      ranked.push({ move: moves[i], score: score });
    }

    ranked.sort(function (a, b) {
      return b.score - a.score;
    });

    return ranked;
  };

  function iterativeDeepening(state, level) {
    var deadline = level.timeMs ? Date.now() + level.timeMs : 0;
    var search = new Search(state.turn, level.positional, deadline);
    var best = null;

    for (var depth = 1; depth <= level.depth; depth++) {
      var ranked = search.rankMoves(state, depth);

      if (!ranked) break;

      best = ranked;

      if (Math.abs(best[0].score) >= MATE_SCORE) break;
    }

    return best;
  }

  function pickCandidate(ranked, candidates) {
    var pool = Math.min(candidates, ranked.length);
    var index = Math.floor(Math.random() * pool);

    return ranked[index].move;
  }

  function bestMove(state, levelNumber) {
    var level = LEVELS[levelNumber] || LEVELS[4];
    var ranked = iterativeDeepening(state, level);

    return pickCandidate(ranked, level.candidates);
  }

  function acceptsDraw(state, color) {
    var search = new Search(color, true, Date.now() + 1500);
    var ranked = search.rankMoves(state, 2);

    if (!ranked) return false;

    return bestScoreFor(ranked, state.turn === color) <= 0;
  }

  function bestScoreFor(ranked, botToMove) {
    return botToMove ? ranked[0].score : ranked[ranked.length - 1].score;
  }

  function analyze(state, depth, timeMs) {
    for (var d = depth; d >= 1; d--) {
      var search = new Search(state.turn, true, Date.now() + timeMs);
      var ranked = search.rankMoves(state, d);

      if (ranked) return ranked;
    }

    return [];
  }

  global.Bot = { bestMove: bestMove, acceptsDraw: acceptsDraw, analyze: analyze, LEVELS: LEVELS };
})(this);
