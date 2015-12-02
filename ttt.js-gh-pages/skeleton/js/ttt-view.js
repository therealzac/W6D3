var _ = require('underscore');

var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $(".grid").on("click", ".grid-cell", function(e) {
    this.makeMove(e);
  }.bind(this));
};

View.prototype.makeMove = function (e) {
  var $square = $(e.currentTarget);
  try {
    this.game.playMove($square.data("pos"));
  }
  catch(MoveError) {
    alert("Invalid Move!");
  }

  $square.text(this.game.currentPlayer);
  $square.addClass(this.game.currentPlayer);

  if (this.game.isOver()) {
    if (!this.game.winner()) {
      alert("Cat's game!");
    } else {
      alert(this.game.currentPlayer + " wins!");
    }
    $(".grid").off("click");
  }
};

View.prototype.setupBoard = function () {
  var $grid = $("<ul>").addClass("grid group");
  this.$el.append($grid);
  var index = 0;
  _(9).times(function(){
    var i = Math.floor(index / 3);
    var j = index % 3;
    $grid.append($("<li>").addClass("grid-cell").data("pos", [i, j]));
    index ++;
  });
};

module.exports = View;
