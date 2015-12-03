/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function HanoiView (game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.setupTowers();
	  this.selectedTower;
	  this.towers = this.$el.find("ul");
	  this.render();
	  this.registerEvents();
	}
	
	$.extend(HanoiView.prototype, {
	  setupTowers: function(){
	    var $tower;
	    var $disk;
	    for (var i = 0; i < 3; i++){
	      $tower = $("<ul>").attr("id", i);
	      for (var j = 0; j < 3; j++){
	        $disk = $("<li>").addClass("empty");
	        $tower.append($disk);
	      }
	      this.$el.append($tower);
	    }
	  },
	
	  render: function() {
	    this.towers.find("li").removeClass().addClass("empty");
	    var gameTowers = this.game.towers;
	    var className;
	    for (var i = 0; i < gameTowers.length; i++) {
	      for (var j = 0; j < gameTowers[i].length; j++) {
	        className = "disk-" + gameTowers[i][j];
	        this.towers.eq(i).find(".empty").last().addClass(className).removeClass("empty");
	      }
	    }
	
	  },
	
	  registerEvents: function() {
	    this.towers.on("click", this.clickTower.bind(this));
	  },
	
	  clickTower: function(e) {
	    var target = $(e.target);
	    if (!this.selectedTower) {
	      this.selectedTower = target.attr("id");
	      target.addClass("selected");
	    } else {
	
	      if (this.game.move(this.selectedTower, target.attr("id"))) {
	        this.render();
	        if (this.game.isWon()) {
	          var $win = $("<h1>").addClass("win");
	          $win.text("You win!");
	          this.$el.append($win);
	          this.towers.off("click");
	        }
	      } else {
	        alert("Invalid move!");
	      }
	
	      this.selectedTower = false;
	      this.towers.removeClass("selected");
	    }
	  },
	});
	
	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  startTowerIdx = parseInt(startTowerIdx);
	  endTowerIdx = parseInt(endTowerIdx);
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map