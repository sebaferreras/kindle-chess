var t = require('./helpers');
var ctx = t.loadModules(['chess.js', 'puzzles.js']);
var C = ctx.Chess;
var illegal = 0;
var notMate = 0;

ctx.PUZZLES.forEach(function (p) {
  var state = C.fromFen(p.fen);
  var moves = p.moves.split(' ');

  for (var i = 0; i < moves.length; i++) {
    var from = moves[i].substr(0, 2);
    var to = moves[i].substr(2, 2);

    if (C.legalMoves(state, from).indexOf(to) === -1) {
      illegal++;
      return;
    }

    state = C.applyMove(state, from, to);
  }

  var mateTheme = p.themes.indexOf('mateIn1') !== -1 || p.themes.indexOf('mateIn2') !== -1;

  if (mateTheme && C.status(state) !== 'checkmate') notMate++;
});

t.check(illegal === 0, 'all puzzle solutions are legal (' + ctx.PUZZLES.length + ' puzzles)');
t.check(notMate === 0, 'all mate-in-N puzzles end in checkmate');
t.summary();
