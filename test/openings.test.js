var t = require('./helpers');
var ctx = t.loadModules(['chess.js', 'openings.js']);
var C = ctx.Chess;
var ids = {};

ctx.OPENINGS.forEach(function (o) {
  var state = C.initialPosition();
  var legal = true;
  var sanMatches = true;

  for (var i = 0; i < o.moves.length; i++) {
    var from = o.moves[i].substr(0, 2);
    var to = o.moves[i].substr(2, 2);

    if (C.legalMoves(state, from).indexOf(to) === -1) legal = false;

    if (legal && C.notation(state, from, to).replace(/[+#]/g, '') !== o.san[i].replace(/[+#]/g, '') && !/^[KQRBN][a-h1-8][a-h]/.test(o.san[i])) sanMatches = false;

    if (!legal) break;

    state = C.applyMove(state, from, to);
  }

  t.check(legal, o.id + ': all moves legal');
  t.check(sanMatches && o.san.length === o.moves.length, o.id + ': SAN matches moves');
  t.check(o.side === 'w' || o.side === 'b', o.id + ': side is w or b');
  t.check(o.moves.length % 2 === 0 || o.side === 'w', o.id + ': line ends after human move or bot reply');
  t.check(!ids[o.id], o.id + ': unique id');
  ids[o.id] = true;
});

t.summary();
