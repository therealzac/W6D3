var Board = require('./snake');
var SnakeView = require('./snake-view');
var keyMaster = require('./keymaster');

$(function(){
    var board = new Board();
    new SnakeView(board, $(".snake"));
});
