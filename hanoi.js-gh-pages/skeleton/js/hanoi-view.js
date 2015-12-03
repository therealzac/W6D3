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
