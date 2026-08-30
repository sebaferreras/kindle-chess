var t = require('./helpers');
var C = t.loadModules(['chess.js']).Chess;

function play(state, moves) {
  moves.forEach(function (m) {
    state = C.applyMove(state, m[0], m[1]);
  });

  return state;
}

var s = C.initialPosition();
t.equal(C.legalMoves(s, 'e2').sort(), ['e3', 'e4'], 'pawn double step');
t.equal(C.legalMoves(s, 'b1').sort(), ['a3', 'c3'], 'knight');
t.equal(C.legalMoves(s, 'e7'), [], 'not your turn');
t.equal(C.legalMoves(s, 'a1'), [], 'blocked rook');

s = play(C.initialPosition(), [['f2', 'f3'], ['e7', 'e5'], ['g2', 'g4'], ['d8', 'h4']]);
t.equal(C.status(s), 'checkmate', "fool's mate");

s = play(C.initialPosition(), [['e2', 'e4'], ['e7', 'e5'], ['g1', 'f3'], ['b8', 'c6'], ['f1', 'c4'], ['f8', 'c5']]);
t.check(C.legalMoves(s, 'e1').indexOf('g1') !== -1, 'castling available');
s = C.applyMove(s, 'e1', 'g1');
t.equal([s.pieces.g1, s.pieces.f1, s.pieces.e1, s.pieces.h1], ['wK', 'wR', undefined, undefined], 'castling moves rook');

s = play(C.initialPosition(), [['e2', 'e4'], ['a7', 'a6'], ['e4', 'e5'], ['d7', 'd5']]);
t.check(C.legalMoves(s, 'e5').indexOf('d6') !== -1, 'en passant available');
s = C.applyMove(s, 'e5', 'd6');
t.equal(s.pieces.d5, undefined, 'en passant captures');

s = C.fromFen('7k/7P/8/8/8/8/8/K7 w - - 0 1');
s = C.applyMove(s, 'h7', 'h8');
t.equal(s.pieces.h8, 'wQ', 'promotion');

s = play(C.initialPosition(), [['e2', 'e4'], ['d7', 'd5'], ['e4', 'd5'], ['d8', 'd5'], ['b1', 'c3'], ['d5', 'e5']]);
t.equal(C.status(s), 'check', 'check detection');
t.equal(C.legalMoves(s, 'a2'), [], 'must resolve check');

var notation = [];
s = C.initialPosition();
[['e2', 'e4'], ['e7', 'e5'], ['g1', 'f3'], ['b8', 'c6'], ['f1', 'c4'], ['g8', 'f6'], ['f3', 'g5'], ['d7', 'd5'], ['e4', 'd5'], ['f6', 'd5'], ['g5', 'f7'], ['e8', 'f7'], ['d1', 'f3']].forEach(function (m) {
  notation.push(C.notation(s, m[0], m[1]));
  s = C.applyMove(s, m[0], m[1]);
});
t.equal(notation.join(' '), 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7 Qf3+', 'SAN notation');

var start = C.fromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
t.equal(C.legalMoves(start, 'e2').sort(), ['e3', 'e4'], 'FEN start position');

t.summary();
