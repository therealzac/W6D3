var key = require('./keymaster');


function SnakeView(board, $el) {
  this.board = board;
  this.$el = $el;
  this.setUpBoard();
  this.renderSnake();
}

SnakeView.prototype.setUpBoard = function() {
  var $grid = $("<ul>").addClass("grid group");
  var $cell;
  this.$el.append($grid);
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      $cell = $("<li>").addClass("grid-cell");
      $cell.attr("data-pos", [i, j]);
      $grid.append($cell);
    }
  }
};

SnakeView.prototype.renderSnake = function() {
  var snake = this.board.snake;
  var location;
  var string;
  var $cell;
  for (var i = 0; i < snake.segments.length; i++) {
    location = snake.segments[i].pos;
    string = "[data-pos=" + "'" + location + "']";
    $cell = $(string);
    $cell.addClass("snake-segment");
  }
};

SnakeView.prototype.bindEvents = function(e) {
  var snake = this.board.snake;
  key('w', snake.changeDirection('N'));
  key('a', snake.changeDirection('W'));
  key('s', snake.changeDirection('S'));
  key('d', snake.changeDirection('D'));
};


module.exports = SnakeView;
