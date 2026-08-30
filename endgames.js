var ENDGAMES = [
  {
    id: 'queen-vs-king',
    name: 'Queen vs king',
    description: 'Drive the king to the edge with the queen, bring your king closer, then mate.',
    fen: '8/8/8/3k4/8/8/8/2Q1K3 w - - 0 1',
    goal: 'mate',
    maxMoves: 10
  },
  {
    id: 'rook-vs-king',
    name: 'Rook vs king',
    description: 'Cut the king off with the rook, use opposition, and push it to the edge.',
    fen: '8/8/8/3k4/8/8/8/R3K3 w - - 0 1',
    goal: 'mate',
    maxMoves: 16
  },
  {
    id: 'two-bishops',
    name: 'Two bishops vs king',
    description: 'Restrict the king with both bishops working together and force it into a corner.',
    fen: '8/8/8/3k4/8/8/8/2B1KB2 w - - 0 1',
    goal: 'mate',
    maxMoves: 19
  },
  {
    id: 'king-pawn-opposition',
    name: 'King and pawn: opposition',
    description: 'Gain the opposition with your king before pushing the pawn.',
    fen: '8/8/4k3/8/4P3/4K3/8/8 w - - 0 1',
    goal: 'promote',
    maxMoves: 12
  },
  {
    id: 'lucena',
    name: 'Lucena position',
    description: 'Build a bridge: cut the king off with the rook, then shelter your king from checks.',
    fen: '1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1',
    goal: 'promote',
    maxMoves: 10
  },
  {
    id: 'two-rooks-ladder',
    name: 'Two rooks: ladder mate',
    description: 'Use the rooks in turns, one rank at a time, to push the king to the edge. Keep them far from the enemy king.',
    fen: '8/8/8/3k4/8/8/8/R4RK1 w - - 0 1',
    goal: 'mate',
    maxMoves: 8
  },
  {
    id: 'queen-vs-center-pawn',
    name: 'Queen vs pawn on the 2nd',
    description: 'Check to force the king in front of its pawn, gain a tempo to bring your king closer, and repeat.',
    fen: 'Q7/8/8/8/8/2K5/4p3/4k3 w - - 0 1',
    goal: 'mate',
    maxMoves: 10
  },
  {
    id: 'square-rule',
    name: 'The rule of the square',
    description: 'The enemy king is outside the square of your pawn: run! Count the squares before you push.',
    fen: '8/8/8/1P6/8/7k/8/K7 w - - 0 1',
    goal: 'promote',
    maxMoves: 5
  },
  {
    id: 'connected-passers',
    name: 'Connected passed pawns',
    description: 'Advance the pawns together, never letting the king win one of them, and escort them with your king.',
    fen: '8/8/8/4k3/8/8/5PP1/6K1 w - - 0 1',
    goal: 'promote',
    maxMoves: 18
  },
  {
    id: 'outside-passer',
    name: 'Outside passed pawn',
    description: 'Push the b-pawn as a decoy: while the enemy king chases it, your king eats the kingside pawns.',
    fen: '8/8/4k1pp/8/1P2K3/6PP/8/8 w - - 0 1',
    goal: 'promote',
    maxMoves: 16
  },
  {
    id: 'rook-pawn-corner',
    name: 'Rook pawn: corner defense',
    description: 'Head to the corner in front of the pawn. With your king on h1, the position is a fortress.',
    fen: '8/8/8/8/7p/6k1/8/6K1 w - - 0 1',
    goal: 'hold',
    maxMoves: 16
  },
  {
    id: 'queen-vs-rook-pawn',
    name: 'Rook pawn vs queen (defend)',
    description: 'Your a2 pawn saves the game: hide the king next to it — if the queen ever takes, it is stalemate.',
    fen: '7K/8/8/8/8/8/p2Q4/1k6 b - - 0 1',
    goal: 'hold',
    maxMoves: 14
  },
  {
    id: 'philidor',
    name: 'Philidor position (defend)',
    description: 'Put your rook on the sixth rank to keep the king out; when the pawn advances, check from behind.',
    fen: '4k3/R7/8/4PK2/8/8/8/r7 b - - 0 1',
    goal: 'hold',
    maxMoves: 20
  }
];
