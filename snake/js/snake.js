var DIR = {N: [-1, 0], E: [0, -1], S: [1, 0], W: [0, 1]};

function Coord(pos) {
  this.pos = pos;
}

Coord.prototype.plus = function(difference){
  this.pos[0] += difference[0];
  this.pos[1] += difference[1];
};

Coord.prototype.equals = function(otherCoord) {
  var equal = false;
  if (this.pos[0] === otherCoord.pos[0] && this.pos[1] === otherCoord.pos[1]) {
    equal = true;
  }
  return equal;
};


function Snake(){
  this.dir = "N";
  this.segments = [];
  this.buildSegments();
}

Snake.prototype.buildSegments = function() {
  for (var i = 80; i < 85; i++) {
    this.segments.push(new Coord([80, i]));
  }
};


function Board() {
  this.snake = new Snake();
  this.grid = [];
}

Board.prototype.buildGrid = function() {
  for (var i = 0; i < 100; i++) {
    this.grid.push([]);
    for (var j = 0; j < 100; j++) {
      this.grid[i].push("");
    }
  }
};

module.exports = Board;
