var fs = require('fs'), vm = require('vm');
var ctx = { parseInt: parseInt, Math: Math, Infinity: Infinity, JSON: JSON, Date: Date };
vm.runInNewContext(fs.readFileSync(__dirname + '/../chess.js', 'utf8'), ctx);
var C = ctx.Chess;

var OPENINGS = [
  ['italian-giuoco-piano', 'w', 'Italian Game: Giuoco Piano', 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O',
   'Quiet development with c3 and d3, preparing a slow d4 push. Both sides castle early and fight for the center later.'],
  ['evans-gambit', 'w', 'Italian Game: Evans Gambit', 'e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O d6',
   'White gives up a pawn with b4 to gain time: c3 and d4 open the center while Black is still moving the bishop.'],
  ['ruy-lopez-closed', 'w', 'Ruy Lopez: Closed', 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O',
   'The classic Spanish setup: pressure on e5, then c3 and d4 to build a strong center. A long strategic battle.'],
  ['scotch-game', 'w', 'Scotch Game', 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7',
   'White opens the center immediately with d4. Black attacks the d4 knight with the bishop and queen; Be3 and c3 hold it.'],
  ['four-knights-spanish', 'w', 'Four Knights Game: Spanish Variation', 'e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6',
   'Symmetrical and solid. Both sides develop the knights first, pin each other with the bishops and castle.'],
  ['vienna-gambit', 'w', 'Vienna Game: Vienna Gambit', 'e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7',
   'Nc3 first, then f4 like a delayed King\'s Gambit. Black\'s correct reply is d5, striking back in the center.'],
  ['kings-gambit-accepted', 'w', 'King\'s Gambit Accepted', 'e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 Bc4 d5 exd5 Bd6',
   'White sacrifices the f-pawn to open the f-file and build a big center. Sharp and tactical from move two.'],
  ['sicilian-english-attack', 'w', 'Sicilian Defense: Najdorf, English Attack', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f3 Be7 Qd2 O-O',
   'Against the Najdorf, White sets up Be3, f3, Qd2 and castles long, preparing a pawn storm with g4 on the kingside.'],
  ['french-advance', 'w', 'French Defense: Advance Variation', 'e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 a3 Nh6 b4 cxd4 cxd4 Nf5',
   'White grabs space with e5 and defends the d4 chain with c3. Black piles up on d4 with c5, Nc6 and Qb6.'],
  ['caro-kann-advance', 'w', 'Caro-Kann Defense: Advance, Short Variation', 'e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 Be3 Nd7 O-O Ne7',
   'White pushes e5 and develops calmly with Nf3, Be2 and O-O. Black gets the bishop out to f5 and plays c5.'],
  ['qgd-white', 'w', 'Queen\'s Gambit Declined: Classical', 'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 Nbd7 Rc1 c6 Bd3 dxc4 Bxc4',
   'The main line of the Queen\'s Gambit: Bg5 pins the knight, e3 and Nf3 develop, Rc1 prepares play on the c-file.'],
  ['london-system', 'w', 'London System', 'd4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6 Bg3 O-O Bd3 b6',
   'A reliable setup you can play against almost anything: Bf4, e3, c3, Nd2, Nf3 and Bd3 in nearly any order.'],
  ['catalan-open', 'w', 'Catalan Opening: Open', 'd4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2 Bb7',
   'White fianchettoes the bishop on g2 and puts long-term pressure on the queenside and the long diagonal.'],
  ['english-four-knights', 'w', 'English Opening: Four Knights', 'c4 e5 Nc3 Nf6 Nf3 Nc6 g3 d5 cxd5 Nxd5 Bg2 Nb6 O-O Be7',
   'A reversed Sicilian. White develops the knights, fianchettoes on g2 and aims at the d5 square.'],
  ['sicilian-najdorf', 'b', 'Sicilian Defense: Najdorf Variation', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O',
   'The most popular Sicilian: a6 keeps White\'s pieces off b5, then e5 grabs the center and Black castles safely.'],
  ['sicilian-dragon', 'b', 'Sicilian Defense: Dragon Variation', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6 Bc4 Bd7',
   'Black fianchettoes the bishop on g7, where it dominates the long diagonal. Expect a race of attacks on both wings.'],
  ['french-classical', 'b', 'French Defense: Classical Variation', 'e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 f4 O-O Nf3 c5',
   'Black challenges the center with d5 and develops the knight to f6. After e5, the plan is c5 to attack White\'s pawn chain.'],
  ['caro-kann-classical', 'b', 'Caro-Kann Defense: Classical Variation', 'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7 h5 Bh7 Bd3 Bxd3 Qxd3 e6',
   'A rock-solid structure: c6 and d5, then the bishop comes to f5 and retreats along the diagonal when chased.'],
  ['scandinavian', 'b', 'Scandinavian Defense: Main Line', 'e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5 Bd2 e6',
   'Black trades the d-pawn immediately and brings the queen out to a5. Simple development with c6, Bf5 and e6.'],
  ['pirc-classical', 'b', 'Pirc Defense: Classical Variation', 'e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O c6',
   'Black lets White build a center and fianchettoes on g7, planning to strike later with e5 or c5.'],
  ['petrov', 'b', 'Russian Game: Classical Attack', 'e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Nc6 O-O Be7 c4 Nb4',
   'Instead of defending e5, Black counterattacks e4. Leads to a symmetrical, solid position.'],
  ['slav-main', 'b', 'Slav Defense: Main Line', 'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4 O-O O-O',
   'Black supports d5 with c6 instead of e6, keeping the c8 bishop free to develop to f5.'],
  ['qga', 'b', 'Queen\'s Gambit Accepted', 'd4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5',
   'Black takes the pawn, gives it back, and plays c5 and b5 to gain space on the queenside.'],
  ['kid-classical', 'b', 'King\'s Indian Defense: Classical Variation', 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7',
   'Black gives White the center and then hits it with e5. After d5, Black attacks on the kingside with f5.'],
  ['nimzo-rubinstein', 'b', 'Nimzo-Indian Defense: Rubinstein System', 'd4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6',
   'Bb4 pins the knight and fights for e4 without pawns. Black follows up with d5 and c5.'],
  ['grunfeld-exchange', 'b', 'Grünfeld Defense: Exchange Variation', 'd4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5 Rb1 O-O Be2 cxd4 cxd4 Qa5+',
   'Black lets White build a big center and attacks it with the g7 bishop and c5. Very dynamic.'],
  ['queens-indian', 'b', 'Queen\'s Indian Defense', 'd4 Nf6 c4 e6 Nf3 b6 g3 Ba6 b3 Bb4+ Bd2 Be7 Bg2 c6 Bc3 d5',
   'Black controls e4 from a distance with the b6 bishop. Ba6 is an annoying way to pressure c4.'],
  ['sicilian-alapin', 'w', 'Sicilian Defense: Alapin Variation', 'e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6 Bc4 Nb6 Bb5',
   'c3 prepares d4 and avoids main-line Sicilian theory. White gets a strong center and easy development.'],
  ['sicilian-rossolimo', 'w', 'Sicilian Defense: Rossolimo Variation', 'e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7 h3 Nf6 Nc3 O-O Be3',
   'Bb5 sidesteps Open Sicilian theory: White trades on c6, doubles Black\'s pawns and plays a calm positional game.'],
  ['smith-morra', 'w', 'Sicilian Defense: Smith-Morra Gambit', 'e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 d6 Bc4 e6 O-O Nf6 Qe2',
   'White sacrifices a pawn for fast development and open c- and d-files. Great practical attacking chances.'],
  ['ruy-exchange', 'w', 'Ruy Lopez: Exchange Variation', 'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4 c5 Nb3 Qxd1 Rxd1',
   'White trades on c6 to damage Black\'s pawns, then heads for an endgame where the healthy kingside majority counts.'],
  ['two-knights-ng5', 'w', 'Italian Game: Two Knights, Knight Attack', 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 Bb5+ c6 dxc6 bxc6 Be2 h6 Nf3 e4 Ne5',
   'Ng5 hits f7 immediately and wins a pawn, but Black gets a big lead in development. Sharp play for both sides.'],
  ['qg-exchange-carlsbad', 'w', 'Queen\'s Gambit Declined: Exchange Variation', 'd4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Be7 Qc2 O-O Bd3 Nbd7 Nf3 Re8 O-O Nf8',
   'The Carlsbad structure: White takes on d5 and later plays for the minority attack with b4-b5 on the queenside.'],
  ['torre-attack', 'w', 'Torre Attack', 'd4 Nf6 Nf3 e6 Bg5 c5 e3 Be7 Nbd2 b6 c3 Bb7 Bd3',
   'A solid system: Bg5, e3, c3 and Bd3. Easy to learn, hard to attack, with ideas of e4 or Ne5 later.'],
  ['trompowsky', 'w', 'Trompowsky Attack', 'd4 Nf6 Bg5 Ne4 Bf4 c5 f3 Qa5+ c3 Nf6 d5',
   'Bg5 on move two avoids all Indian defenses. If Black grabs the bishop pair with Ne4, White builds a big center.'],
  ['kia', 'w', 'King\'s Indian Attack', 'Nf3 d5 g3 Nf6 Bg2 e6 O-O Be7 d3 O-O Nbd2 c5 e4 Nc6',
   'The same setup against everything: g3, Bg2, d3, Nbd2 and e4, then a kingside attack with e5 and Nf1-h2-g4.'],
  ['ruy-berlin', 'b', 'Ruy Lopez: Berlin Defense', 'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8',
   'The famous "Berlin Wall": Black gives up castling but reaches a very solid queenless middlegame.'],
  ['sicilian-sveshnikov', 'b', 'Sicilian Defense: Sveshnikov Variation', 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6 Na3 b5',
   'Black plays e5 at once, accepting a weak d5 square in exchange for very active pieces and the d6-e5 pawn duo.'],
  ['sicilian-taimanov', 'b', 'Sicilian Defense: Taimanov Variation', 'e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Be2 Nf6 O-O Bb4',
   'A flexible Sicilian: e6 and Qc7 keep every plan available while avoiding the sharpest theory.'],
  ['french-winawer', 'b', 'French Defense: Winawer Variation', 'e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4 Qc7',
   'Bb4 pins the knight and Black takes the fight to White: doubled c-pawns for White, dark squares for Black.'],
  ['alekhine', 'b', 'Alekhine Defense: Modern Variation', 'e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 e6 O-O Be7 c4 Nb6 Nc3 O-O',
   'Nf6 provokes White\'s pawns forward so Black can attack the overextended center later.'],
  ['modern-benoni', 'b', 'Benoni Defense: Modern Variation', 'd4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8',
   'Black concedes space but gets a queenside pawn majority and a monster bishop on g7. Play c5-c4 or b5 later.'],
  ['benko-gambit', 'b', 'Benko Gambit: Accepted', 'd4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6',
   'Black gives a pawn for permanent pressure on the a- and b-files. The initiative often lasts into the endgame.'],
  ['bogo-indian', 'b', 'Bogo-Indian Defense', 'd4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Nc3 Bxc3 Bxc3 Ne4 Rc1 O-O',
   'The check on b4 develops with tempo. Black keeps a compact, safe position with pressure on e4.'],
  ['semi-slav-meran', 'b', 'Semi-Slav Defense: Meran Variation', 'd4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 a6',
   'Black combines c6 and e6, then grabs the c4 pawn and expands with b5 and c5.'],
  ['tarrasch', 'b', 'Tarrasch Defense', 'd4 d5 c4 e6 Nc3 c5 cxd5 exd5 Nf3 Nc6 g3 Nf6 Bg2 Be7 O-O O-O',
   'Black accepts an isolated d-pawn in return for free, active piece play. Ideal if you like open positions.'],
  ['dutch-stonewall', 'b', 'Dutch Defense: Stonewall Variation', 'd4 f5 g3 Nf6 Bg2 e6 Nf3 d5 O-O Bd6 c4 c6 b3 Qe7',
   'Pawns on f5, e6, d5 and c6 form a wall: Black owns e4 and attacks on the kingside with Qe8-h5 ideas.']
,
  ['dutch-leningrad', 'b', 'Dutch Defense: Leningrad Variation', 'd4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8',
   'f5 fights for e4 right away. Black fianchettoes on g7 and prepares e5 with Qe8.']
];

var STARTERS = { 'italian-giuoco-piano': 1, 'london-system': 1, 'caro-kann-classical': 1, 'scandinavian': 1, 'slav-main': 1, 'qgd-white': 1 };

var NOTES = {};

NOTES['italian-giuoco-piano'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "the Italian bishop: eyes f7, the weakest square",
  "Black mirrors: the bishop takes the a7-g1 diagonal",
  "a quiet but strong move: prepares d4 later",
  "develops and attacks e4",
  "defends e4 and keeps the center flexible",
  "supports e5 and opens the c8 bishop",
  "the king goes to safety",
  "Black castles too: a calm, classical position"
];
NOTES['evans-gambit'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "the Italian bishop: eyes f7, the weakest square",
  "Black mirrors on the same diagonal",
  "the gambit: a pawn to deflect the bishop",
  "Black accepts — declining is also fine",
  "gains another tempo on the bishop and prepares d4",
  "keeps the pin on the a5-e1 diagonal",
  "builds the big center White paid a pawn for",
  "Black takes again — greedy but critical",
  "castles and leaves the pawns for later: development first",
  "gives back material to blunt the initiative"
];
NOTES['ruy-lopez-closed'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "the Spanish bishop: pressures the knight that defends e5",
  "puts the question to the bishop right away",
  "keeps the pressure; Bxc6 was also possible",
  "develops and counterattacks e4",
  "castles: e4 is poisoned because of Re1 next",
  "solid development; Nxe4 was the sharp Open variation",
  "overprotects e4 and clears f1 for maneuvers",
  "gains space and finally breaks the pin",
  "the bishop keeps aiming at f7 from b3",
  "solidifies e5 and blocks the b3 bishop",
  "prepares d4 and a retreat square on c2",
  "Black castles; the long strategic battle begins"
];
NOTES['scotch-game'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "opens the center immediately — the Scotch",
  "practically forced: everything else loses a pawn",
  "recaptures; the knight is strong but exposed on d4",
  "develops with tempo: hits the d4 knight",
  "defends the knight and develops",
  "adds an attacker: now f2 and d4 are both hit",
  "defends d4 again and blunts the c5 bishop",
  "reroutes: from e7 the knight can go to g6 or d5"
];
NOTES['four-knights-spanish'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "develops and defends e4",
  "the fourth knight: total symmetry",
  "pressures the knight that guards e5",
  "Black mirrors: pins the c3 knight",
  "castles before starting anything in the center",
  "Black keeps copying — safe for now",
  "defends e4 and opens the c1 bishop",
  "the symmetry ends soon: White moves first"
];
NOTES['vienna-gambit'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops first and keeps f4 in reserve",
  "develops and attacks e4",
  "the Vienna Gambit: a delayed King's Gambit",
  "the right answer: strike the center, don't take f4",
  "wins the e5 pawn and attacks the f6 knight",
  "the knight escapes to a strong central square",
  "develops and covers h4 against the queen check",
  "calm development; the e4 knight is surprisingly stable"
];
NOTES['kings-gambit-accepted'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "the King's Gambit: a pawn for the f-file and the center",
  "accepting is the critical test",
  "develops and stops Qh4+",
  "Black clings to the extra pawn with g5",
  "attacks the g5 chain before it settles",
  "keeps the pawn but weakens the kingside",
  "the Kieseritzky: the knight sits on a strong central square",
  "develops and hits e4",
  "targets f7 and d5",
  "counterattacks in the center — the modern antidote",
  "wins a pawn back and opens lines",
  "develops with threats against e5"
];
NOTES['sicilian-english-attack'] = [
  "grabs the center and frees the bishop and queen",
  "the Sicilian: fights for d4 from the side",
  "prepares d4 and develops",
  "controls e5 and opens the c8 bishop",
  "opens the center — the Open Sicilian",
  "trades a wing pawn for a center pawn: Black's bargain",
  "recaptures with a strong centralized knight",
  "develops and attacks e4",
  "defends e4 and develops",
  "the Najdorf move: takes b5 from White's pieces",
  "the English Attack setup begins: Be3, f3, Qd2, O-O-O",
  "strikes the center and gains space",
  "steps back to b3, avoiding trades and keeping pieces on",
  "develops and fights for the d5 square",
  "supports g4 and solidifies e4",
  "develops and prepares to castle",
  "connects with Be3 and prepares queenside castling",
  "Black castles short: opposite-side attacks are coming"
];
NOTES['french-advance'] = [
  "grabs the center and frees the bishop and queen",
  "the French: solid, plans d5 next",
  "builds the full pawn center",
  "the point of the French: challenges e4 immediately",
  "gains space and fixes the pawn chain",
  "attacks d4, the base of White's pawn chain",
  "defends d4 with a pawn",
  "piles up on d4",
  "defends d4 a third time",
  "adds the queen: d4 is under heavy fire and b2 is hit too",
  "stops Bb4+ and prepares b4 expansion",
  "heads for f5 via h6 to hit d4 once more",
  "expands on the queenside and shields b2",
  "releases the tension at the right moment",
  "keeps the chain intact",
  "the knight lands on f5: maximum pressure on d4"
];
NOTES['caro-kann-advance'] = [
  "grabs the center and frees the bishop and queen",
  "the Caro-Kann: prepares d5 with a pawn, keeping the c8 bishop free",
  "builds the full pawn center",
  "challenges e4, as planned",
  "gains space; unlike the French, Black's bishop is still free",
  "the bishop gets out before e6 locks it in",
  "develops naturally",
  "completes the French-like structure with the bishop outside",
  "modest but flexible: prepares O-O and c4 ideas",
  "strikes the base of the chain",
  "develops and keeps d4 defended",
  "develops and supports the c5 break",
  "castles: a healthy space advantage",
  "reroutes toward f5 or g6"
];
NOTES['sicilian-alapin'] = [
  "grabs the center and frees the bishop and queen",
  "the Sicilian: fights for d4 from the side",
  "the Alapin: prepares to recapture on d4 with a pawn",
  "attacks e4 at once, the main reply",
  "gains space and pushes the knight around",
  "the knight is safe on d5: c3 already took the c3 square from White's knight",
  "builds the center",
  "trades before White gets everything for free",
  "develops before recapturing on d4",
  "develops and pressures d4",
  "recaptures: White has the ideal pawn center",
  "chips at the center from behind",
  "develops and attacks the d5 knight",
  "steps back and hits the c4 bishop",
  "keeps the bishop active and pins the c6 knight"
];
NOTES['sicilian-rossolimo'] = [
  "grabs the center and frees the bishop and queen",
  "the Sicilian: fights for d4 from the side",
  "prepares d4 and develops",
  "develops and defends against Nd4 jumps",
  "the Rossolimo: pressures c6 and avoids Open Sicilian theory",
  "prepares to recapture toward the center with the g7 bishop",
  "takes: doubles Black's pawns for the rest of the game",
  "recaptures toward the center",
  "a modest center: the doubled pawns are the long-term target",
  "the bishop takes the long diagonal",
  "stops Bg4 before castling",
  "develops and hits e4",
  "defends e4 and develops",
  "castles into safety",
  "completes development; White will trade dark-square bishops"
];
NOTES['smith-morra'] = [
  "grabs the center and frees the bishop and queen",
  "the Sicilian: fights for d4 from the side",
  "offers the gambit: a pawn for open lines",
  "takes — declining with d3 is safer",
  "recaptures is not the point: c3 offers a second pawn to open files",
  "accepts; now White develops with fury",
  "recaptures: knight out, c- and d-files open",
  "develops and controls the central dark squares",
  "develops toward e5 and d4",
  "solid: blunts the e5 ideas",
  "the bishop eyes f7 down the open diagonal",
  "blocks the diagonal and prepares Be7",
  "develops and attacks e4",
  "castles quickly — every tempo matters a pawn down",
  "prepares Rd1 with heavy pressure on the d-file"
];
NOTES['ruy-exchange'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "the Spanish bishop: pressures the knight that defends e5",
  "puts the question to the bishop",
  "the Exchange: gives the bishop pair to wreck the pawns",
  "recaptures toward the center, keeping the bishop pair",
  "castles and threatens Nxe5 for real now",
  "defends e5 the solid way",
  "opens the center to reach a favorable endgame",
  "trades pawns",
  "recaptures: White's 4-3 kingside majority is the whole point",
  "hits the knight to trade pieces",
  "retreats, avoiding trades that help Black",
  "trades queens on White's terms",
  "recaptures: a better endgame thanks to the pawn majority"
];
NOTES['two-knights-ng5'] = [
  "grabs the center and frees the bishop and queen",
  "Black stakes an equal claim in the center",
  "develops and attacks the e5 pawn",
  "develops and defends e5 in one move",
  "the Italian bishop: eyes f7, the weakest square",
  "the Two Knights: develops instead of defending with Bc5",
  "the aggressive try: knight and bishop both hit f7",
  "the only good defense: blocks the diagonal",
  "wins a pawn; Black must not take back yet",
  "the main line: kicks the bishop instead of recapturing",
  "check: keeps the extra pawn a while longer",
  "blocks and attacks the bishop",
  "grabs a second pawn — but development is on hold",
  "recaptures at last; Black is down a pawn with a big lead in development",
  "retreats to safety",
  "gains space and time on the knight",
  "back to base; White will castle and consolidate",
  "the pawn cramps White and opens lines for the initiative",
  "reroutes to a safer, central square"
];

NOTES['qgd-white'] = [
  "takes the center; d4 is defended by the queen, unlike e4",
  "Black answers symmetrically",
  "the Queen's Gambit: not a real sacrifice — c4 pressures d5",
  "declines and keeps a solid center",
  "develops and adds pressure on d5",
  "develops and defends d5",
  "pins the knight: d5 feels the squeeze",
  "breaks the pin calmly",
  "solidifies d4 and opens the f1 bishop",
  "castles into safety",
  "develops the last minor piece",
  "supports f6 and prepares dxc4 or c5 later",
  "the rook comes to the c-file before the position opens",
  "extra protection for d5 and a waiting move",
  "develops the bishop to its best diagonal",
  "takes now that the bishop moved: wins a tempo",
  "recaptures — White is fully mobilized"
];
NOTES['london-system'] = [
  "takes the center",
  "Black answers symmetrically",
  "the London bishop: out before e3 closes the door",
  "develops and controls e4",
  "supports d4 and opens the f1 bishop",
  "strikes at d4 from the side",
  "reinforces d4: the London triangle c3-d4-e3",
  "develops with pressure on d4",
  "flexible: this knight belongs on d2 in the London",
  "frees the f8 bishop",
  "the other knight develops; everything defends d4",
  "challenges the strong f4 bishop",
  "sidesteps: keeps the bishop and h2 is covered",
  "castles",
  "completes the setup: rock solid",
  "prepares Bb7 and queenside play"
];
NOTES['catalan-open'] = [
  "takes the center",
  "flexible development",
  "gains space and hits d5-plans",
  "solid: prepares d5",
  "the Catalan: the g2 bishop will rake the long diagonal",
  "claims the center anyway",
  "the Catalan bishop arrives",
  "simple development",
  "develops toward castling",
  "castles",
  "castles too",
  "the Open Catalan: grabs the pawn while it's loose",
  "attacks c4 and prepares e4",
  "defends the extra pawn for now",
  "wins the pawn back",
  "expands and hits the queen",
  "retreats to the ideal square",
  "develops, but the g2 bishop stares down the same diagonal"
];
NOTES['english-four-knights'] = [
  "the English: fights for d5 without committing the center",
  "claims the center classically",
  "develops and pressures d5",
  "develops and defends e5",
  "develops; a Sicilian with colors reversed and a move up",
  "the symmetrical knight",
  "prepares the fianchetto",
  "grabs the center — the critical reply",
  "trades to keep the g2 bishop's diagonal open",
  "recaptures with the knight, active but loose",
  "the bishop hits the d5 knight and b7 beyond it",
  "steps out of the diagonal's fire",
  "castles",
  "catches up in development"
];
NOTES['qg-exchange-carlsbad'] = [
  "takes the center",
  "Black answers symmetrically",
  "the Queen's Gambit",
  "declines and stays solid",
  "develops and pressures d5",
  "develops and defends d5",
  "the Exchange: fixes the pawn structure on White's terms",
  "recaptures — the Carlsbad structure appears",
  "pins the knight",
  "solidifies d5 and prepares Bd6 or Be7",
  "opens the bishop; the plan is the minority attack b4-b5",
  "develops and breaks the pin",
  "takes the b1-h7 diagonal, aiming at Black's king",
  "castles",
  "the bishop joins the same diagonal as the queen",
  "develops and covers the kingside",
  "develops the last minor piece",
  "the rook takes the half-open file: a useful preparing move",
  "castles: everything is ready for b4",
  "the standard defensive reroute toward g6"
];
NOTES['torre-attack'] = [
  "takes the center",
  "develops and controls e4",
  "develops toward e5 outposts",
  "solid and flexible",
  "the Torre bishop: pins ideas against e7 and f6",
  "counterattacks the center",
  "supports d4 and opens the bishop",
  "develops and questions the g5 bishop",
  "supports e4 ideas and keeps everything defended",
  "prepares the light-squared bishop's fianchetto",
  "the triangle: c3 keeps d4 rock solid",
  "the bishop finds the long diagonal",
  "completes the setup, ready to castle"
];
NOTES['trompowsky'] = [
  "takes the center",
  "develops and controls e4",
  "the Trompowsky: threatens to double Black's pawns",
  "jumps in to grab the bishop pair",
  "steps back, safe from the knight, still eyeing c7",
  "hits d4 from the side",
  "blunts the c5 pressure and asks the knight to decide",
  "an annoying check that pokes at White's queenside",
  "blocks with tempo",
  "retreats with the mission accomplished: White's pawns are committed",
  "clamps the center with a big space advantage"
];
NOTES['kia'] = [
  "the flexible knight: no central commitment yet",
  "takes the center",
  "prepares the fianchetto",
  "develops",
  "the g2 bishop watches the long diagonal",
  "solid: builds a small center",
  "castles very early — the KIA priority",
  "develops",
  "modest center: e4 is coming later",
  "castles",
  "flexible development that supports the coming e4",
  "expands on the queenside",
  "the thematic break: the center finally moves",
  "develops; White will play e5 and attack the kingside"
];

NOTES['sicilian-najdorf'] = [
  "White grabs the center",
  "the Sicilian: fights for d4 without symmetry",
  "White prepares d4",
  "controls e5 and frees the c8 bishop",
  "White opens the center",
  "trade a wing pawn for a center pawn: your structural edge",
  "White centralizes the knight",
  "develop with an attack on e4",
  "White defends e4",
  "the Najdorf move: b5 is denied to White's pieces forever",
  "quiet development from White",
  "the point: grab central space now that Nb5 is impossible",
  "the knight retreats — d5 looks weak but is hard to use",
  "develop and prepare to castle",
  "White castles",
  "castle: your structure is healthy and c-file play is coming"
];
NOTES['sicilian-dragon'] = [
  "White grabs the center",
  "the Sicilian: fights for d4 without symmetry",
  "White prepares d4",
  "controls e5 and frees the c8 bishop",
  "White opens the center",
  "trade a wing pawn for a center pawn",
  "White centralizes the knight",
  "develop with an attack on e4",
  "White defends e4",
  "the Dragon: the g7 bishop will breathe fire down the long diagonal",
  "White starts the Yugoslav setup",
  "the Dragon bishop takes its diagonal",
  "White supports e4 and prepares g4",
  "castle — yes, into the coming storm: your counterplay is faster than it looks",
  "White connects queen and bishop, eyeing h6",
  "develop and prepare Rc8: the c-file is your highway",
  "White eyes f7 and defends against d5 breaks",
  "connect the rooks and prepare Rc8xc3 sacrifices"
];
NOTES['french-classical'] = [
  "White grabs the center",
  "the French: solid, and d5 comes with force",
  "White builds the full center",
  "the French break: challenge e4 immediately",
  "White defends e4 with a piece",
  "develop and pile on e4",
  "White pins your knight",
  "break the pin immediately",
  "White gains space and hits the knight",
  "the standard retreat: from d7 the knight supports c5",
  "White trades the dark-squared bishops",
  "recapture with the queen, staying flexible",
  "White supports e5 with everything",
  "castle before the center explodes",
  "White develops",
  "the thematic strike at the base of the chain"
];
NOTES['caro-kann-classical'] = [
  "White grabs the center",
  "the Caro-Kann: prepare d5 while keeping the c8 bishop free",
  "White builds the full center",
  "challenge e4 as planned",
  "White defends e4 with a piece",
  "capture: simple and sound",
  "White recaptures, centralizing the knight",
  "the whole point: the bishop develops before e6",
  "White attacks the bishop",
  "slide back along the diagonal — the bishop stays active",
  "White grabs kingside space with tempo",
  "h6 secures the bishop's retreat square before h5-h6 hits",
  "White develops",
  "flexible: the knight supports e5 breaks and Ngf6",
  "White keeps pushing the h-pawn",
  "tuck the bishop into its pocket on h7",
  "White offers the light-square trade",
  "take: each trade eases your slightly cramped game",
  "White recaptures with the queen",
  "finally e6: the classical Caro structure, solid as stone"
];
NOTES['scandinavian'] = [
  "White grabs the center",
  "the Scandinavian: challenge e4 on move one",
  "White takes the pawn",
  "recapture immediately — the queen comes out early, but with a plan",
  "White develops with tempo on your queen",
  "the standard retreat: active on a5, still eyeing the c3 knight",
  "White builds the center",
  "develop and control e4",
  "White develops",
  "the key move: c6 gives the queen a retreat and controls d5",
  "White develops the bishop actively",
  "the c8 bishop gets out before e6 — the point of the move order",
  "White unpins the c3 knight with the bishop",
  "complete the structure: e6 makes a fortress"
];
NOTES['pirc-classical'] = [
  "White grabs the center",
  "the Pirc: let White build, then strike the center down",
  "White takes the full center",
  "develop and attack e4",
  "White defends e4",
  "prepare the fianchetto: g7 is your bishop's home",
  "White develops calmly — the Classical setup",
  "the Pirc bishop arrives on the long diagonal",
  "White develops",
  "castle early: your king is safest behind the fianchetto",
  "White castles",
  "flexible: c6 supports b5 and d5 breaks to come"
];
NOTES['petrov'] = [
  "White grabs the center",
  "Black stakes an equal claim",
  "White attacks e5",
  "the Petrov: counterattack e4 instead of defending",
  "White takes first",
  "chase the knight before recapturing — never Nxe4 at once",
  "White retreats; the trap Nxf7 goes nowhere here",
  "now recapture the pawn safely",
  "White claims the center",
  "match it: d5 protects your knight",
  "White targets the e4 knight",
  "develop and defend the knight again",
  "White castles",
  "solid development",
  "White strikes at d5",
  "the active reply: the knight hits the d3 bishop"
];
NOTES['ruy-berlin'] = [
  "White grabs the center",
  "Black stakes an equal claim",
  "White attacks e5",
  "develop and defend e5",
  "the Spanish bishop pressures c6",
  "the Berlin: develop and counterattack e4 immediately",
  "White castles and dares you to grab e4",
  "take it: the Berlin endgame holds up",
  "White opens the center",
  "the knight retreats, hitting the b5 bishop",
  "White takes: your structure bends but doesn't break",
  "recapture toward the center",
  "White wins the e-pawn back",
  "the knight settles on a fine square",
  "White forces the queen trade",
  "recapture with the king: no castling, but no danger either — the famous Berlin Wall"
];
NOTES['sicilian-sveshnikov'] = [
  "White grabs the center",
  "the Sicilian",
  "White prepares d4",
  "develop the knight first — the Sveshnikov move order",
  "White opens the center",
  "trade a wing pawn for a center pawn",
  "White centralizes",
  "develop with tempo on e4",
  "White defends e4",
  "the Sveshnikov: e5 hits the knight and grabs the center, accepting a hole on d5",
  "the knight jumps toward the d6 entry square",
  "shut the door: d6 covers the entry square",
  "White pins the f6 knight, fighting for d5",
  "kick the b5 knight before it settles",
  "White's knight is pushed to the rim",
  "gain space and hit the a3 knight's return square"
];
NOTES['sicilian-taimanov'] = [
  "White grabs the center",
  "the Sicilian",
  "White prepares d4",
  "the Taimanov move: flexible, keeps every setup available",
  "White opens the center",
  "trade a wing pawn for a center pawn",
  "White centralizes",
  "develop and pressure d4",
  "White develops",
  "the queen slides to c7: eyes e5 and supports the c-file",
  "White develops",
  "deny b5 to White's pieces",
  "White develops calmly",
  "develop with a hit on e4",
  "White castles",
  "the bishop pins and adds to the pressure on e4"
];
NOTES['french-winawer'] = [
  "White grabs the center",
  "the French",
  "White builds the full center",
  "the French break",
  "White defends e4 with the knight",
  "the Winawer: pin the knight so d5xe4 is a real threat",
  "White closes the center and gains space",
  "strike the base of the chain immediately",
  "White asks the bishop",
  "take: White gets doubled pawns, you give the bishop pair",
  "White recaptures — the c-pawns are doubled for life",
  "develop toward f5 or g6",
  "White goes for the throat: the queen hits g7",
  "cover g7 with the queen and keep the c-file plans alive"
];
NOTES['alekhine'] = [
  "White grabs the center",
  "the Alekhine: provoke White's pawns forward to attack them later",
  "White accepts the invitation and gains a tempo",
  "the knight hops to the center",
  "White builds a broad center",
  "chip at e5 right away",
  "White defends e5",
  "pin the defender — pressure without commitment",
  "White breaks the pin",
  "solid: prepare Be7 and O-O",
  "White castles",
  "develop and castle next",
  "White gains more space, pushing the knight again",
  "b6: the knight watches c4 and d5 from the side",
  "White develops",
  "castle: now start dismantling the big center"
];

NOTES['slav-main'] = [
  "White takes the center",
  "match it in the center",
  "the Queen's Gambit",
  "the Slav: defend d5 with c6 and keep the c8 bishop free",
  "White develops",
  "develop and hold d5",
  "White adds pressure on d5",
  "take at the right moment: White must spend time regaining the pawn",
  "White stops b5, which would defend the extra pawn",
  "the freed bishop develops actively — the point of the Slav",
  "White prepares to take on c4",
  "solidify and open your own bishop",
  "White regains the pawn",
  "pin the knight and develop with tempo",
  "White castles",
  "castle: a comfortable, healthy position"
];
NOTES['qga'] = [
  "White takes the center",
  "match it in the center",
  "the Queen's Gambit",
  "accept it: you can't keep the pawn, but you gain time to strike with c5",
  "White develops and stops e5",
  "develop naturally",
  "White prepares to recapture on c4",
  "open the f8 bishop's path",
  "White regains the pawn",
  "the key break: hit d4 before White is fully set",
  "White castles",
  "a6 prepares b5, gaining time on the bishop",
  "White avoids the queen trade lines",
  "expand with tempo: the bishop must move again"
];
NOTES['kid-classical'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "prepare the fianchetto — the King's Indian",
  "White develops",
  "the KID bishop takes the long diagonal",
  "White builds the perfect center — let it",
  "d6 holds e5 in reserve",
  "White develops",
  "castle first, strike later",
  "White develops",
  "the strike: e5 challenges the big center",
  "White castles",
  "pile another piece on d4",
  "White closes the center, claiming the queenside",
  "the knight steps back to e7, ready for f5: the kingside attack begins"
];
NOTES['nimzo-rubinstein'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "flexible: e6 frees the bishop",
  "White develops toward e4",
  "the Nimzo: pin the knight and fight for e4 without a pawn",
  "White plays it safe — the Rubinstein",
  "castle quickly",
  "White develops and dreams of e4",
  "hit the center before e4 arrives",
  "White develops",
  "the second central break: White's center is under siege",
  "White castles",
  "develop with more pressure on d4"
];
NOTES['grunfeld-exchange'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "prepare the fianchetto",
  "White develops toward e4",
  "the Grünfeld: strike with d5 before White plays e4",
  "White trades in the center",
  "recapture with the knight",
  "White builds the dream center — your target",
  "trade and pull a pawn to c3",
  "White recaptures: a huge center, but it needs constant defense",
  "the Grünfeld bishop bites into d4 from g7",
  "White develops and defends d4",
  "hit d4 again",
  "White activates the rook, defending b2 and eyeing b7",
  "castle before the tactics start",
  "White develops",
  "trade on d4 to fix the target",
  "White recaptures",
  "an active check with tempo — White's king stays uneasy"
];
NOTES['queens-indian'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "flexible: e6 frees the bishop",
  "White develops",
  "the Queen's Indian: b6 prepares Bb7, controlling e4 from afar",
  "White fianchettoes to fight on the same diagonal",
  "the sideline star: Ba6 attacks c4 directly",
  "White defends c4 the modest way",
  "a clever check to misplace White's pieces",
  "White blocks with the bishop",
  "retreat: mission accomplished, Bd2 is passive",
  "White completes the fianchetto",
  "support d5 before playing it",
  "White reroutes the bishop to a better diagonal",
  "the freeing break: your position is fully comfortable"
];
NOTES['dutch-leningrad'] = [
  "White takes the center",
  "the Dutch: f5 fights for e4 from move one",
  "White fianchettoes — the main antidote",
  "develop and cover e4",
  "White's bishop takes the long diagonal",
  "the Leningrad: your bishop mirrors on g7",
  "White develops",
  "the Leningrad bishop arrives",
  "White castles",
  "castle: the f5-g6 wall protects the king",
  "White stakes the queenside",
  "d6 prepares the central e5 break",
  "White develops",
  "the Leningrad queen move: supports e5 and swings to h5 later"
];
NOTES['modern-benoni'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "the Benoni jab: c5 pokes the center",
  "White pushes past, gaining space",
  "trade e6 for the half-open e-file",
  "White develops",
  "complete the trade",
  "White recaptures — note your 2-1 queenside majority",
  "d6 fixes the structure: the Benoni wall",
  "White claims the center",
  "prepare the fianchetto: g7 is the Benoni bishop's home",
  "White develops",
  "the bishop lands on the long diagonal",
  "White develops",
  "castle",
  "White castles",
  "the rook joins: e-file pressure plus b5 is your whole plan"
];
NOTES['benko-gambit'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "the Benoni jab",
  "White pushes past",
  "the Benko: sacrifice the b-pawn for eternal queenside pressure",
  "White accepts",
  "offer the a-pawn too: files matter more than pawns here",
  "White takes everything",
  "recapture with the bishop, aiming straight at f1",
  "White develops",
  "d6 completes the structure",
  "White builds the center",
  "trade off the defender of the light squares",
  "White must recapture with the king — no castling",
  "fianchetto: the g7 bishop joins the a- and b-file rooks"
];
NOTES['bogo-indian'] = [
  "White takes the center",
  "develop and control e4",
  "White grabs more space",
  "flexible: e6 frees the bishop",
  "White develops the kingside knight",
  "the Bogo check: develop with tempo",
  "White blocks with the modest bishop",
  "defend the b4 bishop and keep every option open",
  "White prepares the fianchetto",
  "develop with pressure on d4",
  "White develops and covers e4",
  "trade: Bd2 was passive, Nc3 was better — remove it",
  "White recaptures",
  "the knight lands actively on e4",
  "White activates the rook",
  "castle: a solid, easy-to-play position"
];
NOTES['semi-slav-meran'] = [
  "White takes the center",
  "match it in the center",
  "the Queen's Gambit",
  "the Slav move: c6 defends d5",
  "White develops",
  "develop and hold d5",
  "White adds pressure",
  "the Semi-Slav: e6 adds a third defender of d5",
  "White plays the quiet system",
  "flexible development: the knight supports c5 and e5",
  "White develops the bishop",
  "the Meran: take now that the bishop moved, winning a tempo",
  "White recaptures",
  "expand with tempo on the bishop",
  "White retreats",
  "a6 prepares c5 with a grand queenside plan"
];
NOTES['tarrasch'] = [
  "White takes the center",
  "match it in the center",
  "the Queen's Gambit",
  "decline solidly first",
  "White develops",
  "the Tarrasch: c5 frees your game at the cost of an isolated pawn",
  "White trades toward the isolani",
  "recapture: the d5 pawn is isolated but your pieces fly",
  "White develops",
  "develop toward the center",
  "White fianchettoes: the g2 bishop is the isolani's worst enemy",
  "develop",
  "White's bishop lands on g2",
  "develop and castle next",
  "White castles",
  "castle: activity must compensate the weak pawn — keep pieces on"
];
NOTES['dutch-stonewall'] = [
  "White takes the center",
  "the Dutch: f5 fights for e4",
  "White fianchettoes",
  "develop and cover e4",
  "White's bishop takes the long diagonal",
  "e6 prepares the wall",
  "White develops",
  "the Stonewall: d5 completes the f5-e6-d5 wall — e4 is yours",
  "White castles",
  "the bishop takes the strong diagonal toward h2",
  "White pressures d5",
  "c6 finishes the wall",
  "White prepares Ba3 to trade your good bishop",
  "the Stonewall queen: heads for h5 via e8 with mating ideas"
];

function sanToMove(state, san) {
  var clean = san.replace(/[+#]/g, '');
  var candidates = [];
  for (var from in state.pieces) {
    if (state.pieces[from].charAt(0) !== state.turn) continue;
    C.legalMoves(state, from).forEach(function (to) { candidates.push({ from: from, to: to }); });
  }
  var matches = candidates.filter(function (m) {
    var n = C.notation(state, m.from, m.to).replace(/[+#]/g, '');
    if (n === clean) return true;
    // disambiguated SAN like Nbd2 / R1e2 / Ngf3
    var d = /^([KQRBN])([a-h]?[1-8]?)(x?)([a-h][1-8])$/.exec(clean);
    if (!d) return false;
    var piece = state.pieces[m.from].charAt(1);
    if (piece !== d[1] || m.to !== d[4]) return false;
    var hint = d[2];
    return hint.split('').every(function (ch) { return m.from.indexOf(ch) !== -1; });
  });
  if (matches.length !== 1) throw new Error('SAN ' + san + ' -> ' + matches.length + ' matches');
  return matches[0];
}

var tsv = fs.readFileSync(__dirname + '/openings_all.tsv', 'utf8').split('\n').filter(Boolean).map(function (l) { var p = l.split('\t'); return { eco: p[0], name: p[1], pgn: p[2] }; });
function pgnFromSan(sans) {
  var out = [];
  sans.forEach(function (s, i) { if (i % 2 === 0) out.push((i / 2 + 1) + '.'); out.push(s); });
  return out.join(' ');
}
function ecoFor(sans) {
  var pgn = pgnFromSan(sans), best = null;
  tsv.forEach(function (e) { if (pgn.indexOf(e.pgn) === 0 && (!best || e.pgn.length > best.pgn.length)) best = e; });
  return best;
}

var result = OPENINGS.map(function (o) {
  var sans = o[3].split(' '), state = C.initialPosition(), moves = [];
  sans.forEach(function (san) {
    var m = sanToMove(state, san);
    var actual = C.notation(state, m.from, m.to);
    moves.push(m.from + m.to);
    state = C.applyMove(state, m.from, m.to);
    if (actual.replace(/[+#]/g, '') !== san.replace(/[+#]/g, '') && !/^[KQRBN][a-h1-8]/.test(san)) throw new Error(o[0] + ': ' + san + ' vs ' + actual);
  });
  var eco = ecoFor(sans);
  var notes = NOTES[o[0]];
  if (!notes) throw new Error(o[0] + ': missing notes');
  if (notes.length !== sans.length) throw new Error(o[0] + ': ' + notes.length + ' notes for ' + sans.length + ' moves');
  return { id: o[0], side: o[1], name: o[2], eco: eco ? eco.eco : '', book: eco ? eco.name : '', moves: moves, san: sans, notes: notes, starter: !!STARTERS[o[0]], description: o[4] };
});
result.forEach(function (r) { console.log(r.eco, '|', r.name, '|', r.book, '|', r.san.length, 'plies'); });
fs.writeFileSync(__dirname + '/../openings.js', 'var OPENINGS = ' + JSON.stringify(result.map(function (r) { return { id: r.id, eco: r.eco, name: r.name, side: r.side, starter: r.starter, moves: r.moves, san: r.san, notes: r.notes, description: r.description }; }), null, 0) + ';\n');
console.log('written', result.length);
