(function (global) {
  'use strict';

  var FILES = 'abcdefgh';
  var KNIGHT_STEPS = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
  var KING_STEPS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  var ROOK_DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  var BISHOP_DIRS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  function square(file, rank) {
    if (file < 0 || file > 7 || rank < 1 || rank > 8) return null;

    return FILES[file] + rank;
  }

  function fileOf(sq) {
    return FILES.indexOf(sq.charAt(0));
  }

  function rankOf(sq) {
    return parseInt(sq.charAt(1), 10);
  }

  function colorOf(piece) {
    return piece.charAt(0);
  }

  function typeOf(piece) {
    return piece.charAt(1);
  }

  function opposite(color) {
    return color === 'w' ? 'b' : 'w';
  }

  function initialPosition() {
    var backRank = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    var pieces = {};

    for (var i = 0; i < 8; i++) {
      pieces[FILES[i] + '8'] = 'b' + backRank[i];
      pieces[FILES[i] + '7'] = 'bP';
      pieces[FILES[i] + '2'] = 'wP';
      pieces[FILES[i] + '1'] = 'w' + backRank[i];
    }

    return {
      pieces: pieces,
      turn: 'w',
      castling: { wK: true, wQ: true, bK: true, bQ: true },
      enPassant: null
    };
  }

  function fromFen(fen) {
    var parts = fen.split(' ');
    var rows = parts[0].split('/');
    var pieces = {};

    for (var r = 0; r < 8; r++) {
      var file = 0;

      for (var i = 0; i < rows[r].length; i++) {
        var ch = rows[r].charAt(i);

        if (ch >= '1' && ch <= '8') {
          file += parseInt(ch, 10);
        } else {
          var color = ch === ch.toUpperCase() ? 'w' : 'b';
          pieces[FILES[file] + (8 - r)] = color + ch.toUpperCase();
          file++;
        }
      }
    }

    var rights = parts[2] || '-';

    return {
      pieces: pieces,
      turn: parts[1] === 'b' ? 'b' : 'w',
      castling: {
        wK: rights.indexOf('K') !== -1,
        wQ: rights.indexOf('Q') !== -1,
        bK: rights.indexOf('k') !== -1,
        bQ: rights.indexOf('q') !== -1
      },
      enPassant: parts[3] && parts[3] !== '-' ? parts[3] : null
    };
  }

  function toFen(state) {
    var rows = [];

    for (var rank = 8; rank >= 1; rank--) {
      var row = '';
      var empty = 0;

      for (var f = 0; f < 8; f++) {
        var piece = state.pieces[FILES[f] + rank];

        if (!piece) {
          empty++;
          continue;
        }

        if (empty) {
          row += empty;
          empty = 0;
        }

        row += piece.charAt(0) === 'w' ? piece.charAt(1) : piece.charAt(1).toLowerCase();
      }

      if (empty) row += empty;

      rows.push(row);
    }

    var rights = (state.castling.wK ? 'K' : '') + (state.castling.wQ ? 'Q' : '') +
      (state.castling.bK ? 'k' : '') + (state.castling.bQ ? 'q' : '');

    return rows.join('/') + ' ' + state.turn + ' ' + (rights || '-') + ' ' + (state.enPassant || '-') + ' 0 1';
  }

  function clone(state) {
    var pieces = {};

    for (var sq in state.pieces) {
      pieces[sq] = state.pieces[sq];
    }

    return {
      pieces: pieces,
      turn: state.turn,
      castling: {
        wK: state.castling.wK,
        wQ: state.castling.wQ,
        bK: state.castling.bK,
        bQ: state.castling.bQ
      },
      enPassant: state.enPassant
    };
  }

  function slide(state, from, dirs, out) {
    var color = colorOf(state.pieces[from]);

    for (var d = 0; d < dirs.length; d++) {
      var f = fileOf(from) + dirs[d][0];
      var r = rankOf(from) + dirs[d][1];
      var to = square(f, r);

      while (to) {
        var target = state.pieces[to];

        if (!target) {
          out.push(to);
        } else {
          if (colorOf(target) !== color) out.push(to);
          break;
        }

        f += dirs[d][0];
        r += dirs[d][1];
        to = square(f, r);
      }
    }
  }

  function step(state, from, steps, out) {
    var color = colorOf(state.pieces[from]);

    for (var i = 0; i < steps.length; i++) {
      var to = square(fileOf(from) + steps[i][0], rankOf(from) + steps[i][1]);

      if (to && (!state.pieces[to] || colorOf(state.pieces[to]) !== color)) out.push(to);
    }
  }

  function pawnTargets(state, from, out) {
    var color = colorOf(state.pieces[from]);
    var dir = color === 'w' ? 1 : -1;
    var startRank = color === 'w' ? 2 : 7;
    var file = fileOf(from);
    var rank = rankOf(from);
    var one = square(file, rank + dir);
    var two = square(file, rank + 2 * dir);

    if (one && !state.pieces[one]) {
      out.push(one);

      if (rank === startRank && two && !state.pieces[two]) out.push(two);
    }

    var captures = [square(file - 1, rank + dir), square(file + 1, rank + dir)];

    for (var i = 0; i < 2; i++) {
      var to = captures[i];

      if (!to) continue;

      var target = state.pieces[to];

      if ((target && colorOf(target) !== color) || to === state.enPassant) out.push(to);
    }
  }

  function attackTargets(state, from) {
    var out = [];
    var type = typeOf(state.pieces[from]);

    if (type === 'P') pawnTargets(state, from, out);

    if (type === 'N') step(state, from, KNIGHT_STEPS, out);

    if (type === 'K') step(state, from, KING_STEPS, out);

    if (type === 'R' || type === 'Q') slide(state, from, ROOK_DIRS, out);

    if (type === 'B' || type === 'Q') slide(state, from, BISHOP_DIRS, out);

    return out;
  }

  function isAttacked(state, sq, byColor) {
    for (var from in state.pieces) {
      if (colorOf(state.pieces[from]) !== byColor) continue;

      if (attackTargets(state, from).indexOf(sq) !== -1) return true;
    }

    return false;
  }

  function kingSquare(state, color) {
    for (var sq in state.pieces) {
      if (state.pieces[sq] === color + 'K') return sq;
    }

    return null;
  }

  function inCheck(state, color) {
    var king = kingSquare(state, color);

    return king ? isAttacked(state, king, opposite(color)) : false;
  }

  function castlingTargets(state, from, out) {
    var color = colorOf(state.pieces[from]);
    var rank = color === 'w' ? 1 : 8;
    var enemy = opposite(color);

    if (from !== 'e' + rank || inCheck(state, color)) return;

    var sides = [
      { flag: color + 'K', empty: ['f', 'g'], rook: 'h', to: 'g' },
      { flag: color + 'Q', empty: ['d', 'c', 'b'], rook: 'a', to: 'c' }
    ];

    for (var i = 0; i < sides.length; i++) {
      var side = sides[i];

      if (!state.castling[side.flag]) continue;

      if (state.pieces[side.rook + rank] !== color + 'R') continue;

      var clear = true;

      for (var j = 0; j < side.empty.length; j++) {
        if (state.pieces[side.empty[j] + rank]) clear = false;
      }

      if (!clear) continue;

      var pathSafe = !isAttacked(state, side.empty[0] + rank, enemy) && !isAttacked(state, side.to + rank, enemy);

      if (pathSafe) out.push(side.to + rank);
    }
  }

  function applyMove(state, from, to) {
    var next = clone(state);
    var piece = next.pieces[from];
    var color = colorOf(piece);
    var type = typeOf(piece);
    var rank = rankOf(from);

    if (type === 'P' && to === next.enPassant) {
      delete next.pieces[to.charAt(0) + rank];
    }

    if (type === 'K' && Math.abs(fileOf(to) - fileOf(from)) === 2) {
      var rookFrom = (fileOf(to) === 6 ? 'h' : 'a') + rank;
      var rookTo = (fileOf(to) === 6 ? 'f' : 'd') + rank;
      next.pieces[rookTo] = next.pieces[rookFrom];
      delete next.pieces[rookFrom];
    }

    delete next.pieces[from];
    next.pieces[to] = piece;

    var promotionRank = color === 'w' ? 8 : 1;

    if (type === 'P' && rankOf(to) === promotionRank) next.pieces[to] = color + 'Q';

    next.enPassant = null;

    if (type === 'P' && Math.abs(rankOf(to) - rank) === 2) {
      next.enPassant = to.charAt(0) + (rank + rankOf(to)) / 2;
    }

    if (type === 'K') {
      next.castling[color + 'K'] = false;
      next.castling[color + 'Q'] = false;
    }

    var corners = { a1: 'wQ', h1: 'wK', a8: 'bQ', h8: 'bK' };

    if (corners[from]) next.castling[corners[from]] = false;

    if (corners[to]) next.castling[corners[to]] = false;

    next.turn = opposite(color);

    return next;
  }

  function legalMoves(state, from) {
    var piece = state.pieces[from];

    if (!piece || colorOf(piece) !== state.turn) return [];

    var candidates = attackTargets(state, from);

    if (typeOf(piece) === 'K') castlingTargets(state, from, candidates);

    var legal = [];

    for (var i = 0; i < candidates.length; i++) {
      if (!inCheck(applyMove(state, from, candidates[i]), state.turn)) legal.push(candidates[i]);
    }

    return legal;
  }

  function hasLegalMoves(state) {
    for (var from in state.pieces) {
      if (legalMoves(state, from).length) return true;
    }

    return false;
  }

  function status(state) {
    var check = inCheck(state, state.turn);
    var moves = hasLegalMoves(state);

    if (!moves) return check ? 'checkmate' : 'stalemate';

    return check ? 'check' : 'playing';
  }

  var LETTERS = { K: 'K', Q: 'Q', R: 'R', B: 'B', N: 'N', P: '' };

  function notation(state, from, to) {
    var piece = state.pieces[from];
    var type = typeOf(piece);
    var after = applyMove(state, from, to);
    var captured = state.pieces[to] || (type === 'P' && to === state.enPassant);
    var text;

    if (type === 'K' && Math.abs(fileOf(to) - fileOf(from)) === 2) {
      text = fileOf(to) === 6 ? 'O-O' : 'O-O-O';
    } else {
      text = LETTERS[type] + (captured ? (type === 'P' ? from.charAt(0) : '') + 'x' : '') + to;

      if (type === 'P' && after.pieces[to] !== piece) text += '=Q';
    }

    var result = status(after);

    if (result === 'checkmate') text += '#';

    if (result === 'check') text += '+';

    return text;
  }

  global.Chess = {
    notation: notation,
    initialPosition: initialPosition,
    fromFen: fromFen,
    toFen: toFen,
    legalMoves: legalMoves,
    applyMove: applyMove,
    inCheck: inCheck,
    status: status
  };
})(this);
