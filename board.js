(function (global) {
  'use strict';

  var FILES = 'abcdefgh';

  function Board(tableEl, onTap) {
    this.tableEl = tableEl;
    this.onTap = onTap;
    this.cells = {};
    this.pieces = {};
    this.selected = null;
    this.flipped = false;
    this.marked = [];
    this.build();
    this.listen();
  }

  Board.prototype.build = function () {
    var table = this.tableEl;
    var ranks = this.flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
    var files = this.flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    this.cells = {};

    for (var r = 0; r < 8; r++) {
      var tr = document.createElement('tr');
      tr.appendChild(label(String(ranks[r])));

      for (var f = 0; f < 8; f++) {
        var square = FILES[files[f]] + ranks[r];
        var td = document.createElement('td');
        td.setAttribute('data-sq', square);
        td.setAttribute('data-shade', (files[f] + ranks[r]) % 2 === 0 ? 'dark' : '');
        this.cells[square] = td;
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }

    var footer = document.createElement('tr');
    footer.className = 'files';
    footer.appendChild(label(''));

    for (var i = 0; i < 8; i++) {
      footer.appendChild(label(FILES[files[i]]));
    }

    table.appendChild(footer);
    this.renderAll();
  };

  Board.prototype.listen = function () {
    var self = this;

    this.tableEl.onclick = function (event) {
      var target = event.target || event.srcElement;
      var square = target.getAttribute && target.getAttribute('data-sq');

      if (square && self.onTap) self.onTap(square);
    };
  };

  Board.prototype.setFlipped = function (flipped) {
    if (this.flipped === flipped) return;

    this.flipped = flipped;
    this.build();
  };

  Board.prototype.setPosition = function (pieces) {
    var previous = this.pieces;
    this.pieces = pieces;

    for (var square in this.cells) {
      if (previous[square] !== pieces[square]) this.renderSquare(square);
    }
  };

  Board.prototype.select = function (square) {
    var previous = this.selected;
    this.selected = square;

    if (previous) this.renderSquare(previous);

    if (square) this.renderSquare(square);
  };

  Board.prototype.mark = function (squares) {
    var previous = this.marked;
    this.marked = squares || [];

    for (var i = 0; i < previous.length; i++) {
      this.renderSquare(previous[i]);
    }

    for (var j = 0; j < this.marked.length; j++) {
      this.renderSquare(this.marked[j]);
    }
  };

  Board.prototype.renderSquare = function (square) {
    var cell = this.cells[square];
    var classes = [cell.getAttribute('data-shade')];

    if (this.pieces[square]) classes.push(this.pieces[square]);

    if (square === this.selected) classes.push('selected');

    if (this.marked.indexOf(square) !== -1) classes.push('marked');

    cell.className = classes.join(' ');
  };

  Board.prototype.renderAll = function () {
    for (var square in this.cells) {
      this.renderSquare(square);
    }
  };

  Board.prototype.fitToScreen = function () {
    var viewport = window.innerHeight || document.documentElement.clientHeight;
    var used = document.body.offsetHeight;

    if (!viewport || !used) return;

    var sample = this.cells.a1;
    var current = sample.offsetHeight;
    var spare = viewport - used - 8;
    var maxSquare = Math.floor(this.tableEl.offsetWidth / 9);
    var target = Math.min(maxSquare, current + Math.floor(spare / 8));

    if (target <= 0 || target === current) return;

    var style = document.createElement('style');
    style.textContent = '#board td { height: ' + target + 'px; }';
    document.getElementsByTagName('head')[0].appendChild(style);
  };

  function label(text) {
    var th = document.createElement('th');
    th.textContent = text;

    return th;
  }

  global.Board = Board;
})(this);
