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
    id: 'philidor',
    name: 'Philidor position (defend)',
    description: 'Put your rook on the sixth rank to keep the king out; when the pawn advances, check from behind.',
    fen: '4k3/R7/8/4PK2/8/8/8/r7 b - - 0 1',
    goal: 'hold',
    maxMoves: 20
  }
];
