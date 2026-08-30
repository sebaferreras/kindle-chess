var t = require('./helpers');
var ctx = t.loadModules(['chess.js', 'endgames.js']);
var C = ctx.Chess;

ctx.ENDGAMES.forEach(function (endgame) {
  var state = C.fromFen(endgame.fen);
  var other = state.turn === 'w' ? 'b' : 'w';
  var kings = 0;
  var hasMoves = false;

  for (var sq in state.pieces) {
    if (state.pieces[sq].charAt(1) === 'K') kings++;

    if (C.legalMoves(state, sq).length) hasMoves = true;
  }

  t.check(kings === 2, endgame.id + ': two kings');
  t.check(!C.inCheck(state, other), endgame.id + ': side not to move is not in check');
  t.check(C.status(state) === 'playing' && hasMoves, endgame.id + ': game is playable');
  t.check(['mate', 'promote', 'hold'].indexOf(endgame.goal) !== -1, endgame.id + ': known goal');
});

t.summary();
