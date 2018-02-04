// Enemies our player must avoid
var Enemy = function(x, y, speed = 50) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //collison detection
    if (player.y + 131 >= this.y + 90
      && player.x + 25 <= this.x + 88
      && player.y + 73 <= this.y + 135
      && player.x + 76 >= this.x + 11) {
      console.log('collison detected!');
      hearts.pop();
      player.reset();
      if (hearts.length === 0) {
        gameOver();
      } else {
        inputAvailable = 0;
        player.blink();
        setTimeout(function () {
            inputAvailable = 1;
            blinkOrnot = 1;
        }, 1200);
      }
    }
    if (this.x >= 505) {
      this.x = 0;
      this.speed = (arr.sort(() => Math.random() - 0.5).slice(0,1))*gameLevel*10;
    }
    //heartCheck();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.y > 400 ) {
        this.y = 400;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
    if (this.y + 63 <= 0) {
        player.reset();
        console.log('Success!');
        var i = stars.length;
        gameLevel += 1;
        stars[i] = new Star(380.5+40*i, 525);
        enemyReset();
        if (stars.length >= 3) {
          console.log('You win the Game!!!');
          gameWin();
        }
    }
};

Player.prototype.reset = function() {
    this.x = 202.5;
    this.y = 400;
};

Player.prototype.blink = function() {
    var player_image = Resources.get(this.sprite);
    var status = 1;
    var blinkTime = 0;
    var blinking = function () {
        if (status === 1) {
            blinkOrnot = 1;
            //console.log("visible");
            status = 0;
            blinkTime += 1;
        } else {
            blinkOrnot = 0;
            //console.log("hidden");
            status = 1;
            blinkTime += 1;
        }
    };
    interval = setInterval(blinking,100);
    setTimeout(function () {
        clearInterval(interval);
        blinkOrnot = 1;
    }, 1200);
};

Player.prototype.render = function() {
    if (blinkOrnot === 1) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Player.prototype.handleInput = function(inputKeyb){
  if (inputAvailable === 1) {
    switch (inputKeyb) {
      case 'left':
        player.x -= player.speed;
        break;
      case 'up':
        player.y -= player.speed;
        break;
      case 'right':
        player.x += player.speed;
        break;
      case 'down':
        player.y += player.speed;
        break;
      default:
        console.log("your inut is invaild!!");
     }
  }
};

var Heart = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Heart.png';
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 60);
};

var Star = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Star.png';
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 60);
};

var enemyReset = function() {
  allEnemies = [];
  var speedFactor = arr.sort(() => Math.random() - 0.5).slice(0,4);
  for (var i=0;i<4;i++) {
    var enemy = new Enemy(0, Ylocation[i], speedFactor[i]*gameLevel*10);
    allEnemies.push(enemy);
  }
};

var gameWin = function() {
  layer.classList.add("show");
  layer.classList.remove("hide");
  youWin.classList.add("show");
  youWin.classList.remove("hide");
  inputAvailable = 0;
  //gameReset();
};

var gameOver = function() {
  layer.classList.add("show");
  layer.classList.remove("hide");
  youLose.classList.add("show");
  youLose.classList.remove("hide");
  inputAvailable = 0;
  //gameReset();
};

var gameInitialization = function() {
  youWin = document.querySelector(".youWin");
  youLose = document.querySelector(".youLose");
  layer = document.querySelector(".backLayer");
  inputAvailable = 1;
  blinkOrnot = 1;
  interval = null;
  player = new Player(202.5, 400, 80);
  hearts = [];
};

var gameReset = function() {
  layer.classList.remove("show");
  youWin.classList.remove("show");
  youLose.classList.remove("show");
  layer.classList.add("hide");
  youWin.classList.add("hide");
  youLose.classList.add("hide");
  player.reset();
  inputAvailable = 1;
  stars = [];
  for (var i=0;i<3;i++) {
    hearts[i] = new Heart(5.5+40*i, 530);
  }
  gameLevel = 1;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
gameInitialization();
gameReset();
var arr = [2, 4, 6, 8, 10];
var Ylocation = [60, 145, 228, 310];
enemyReset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
