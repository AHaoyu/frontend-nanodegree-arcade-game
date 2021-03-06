// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
    if (player.y + 55 >= this.y
      && player.x <= this.x + 78
      && player.y <= this.y + 71
      && player.x + 70 >= this.x) {
      console.log('collison detected!');
      hearts.pop();
      player.reset();
      //heartCheck,if there is no heart left, game over.
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
    //modified enemy's speed.
    if (this.x >= 505) {
      this.x = 0;
      this.speed = (arr.sort(() => Math.random() - 0.5).slice(0,1))*gameLevel*10;
    }
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
    if (keyUp1 != keyUp2 && keyUp1 > keyUp2){
        if (this.y > 400 ) {
        this.y = 400;
        }
        if (this.x > 402.5) {
            this.x = 402.5;
        }
        if (this.x < 2.5) {
            this.x = 2.5;
        }
        //if player reach the river, you win the round, add one star.
        //next level round will be more difficult.
        if (this.y + 40 <= 0) {
            this.reset();
            console.log('Success!');
            var i = stars.length;
            gameLevel += 1;
            stars[i] = new Star(380.5+40*i, 525);
            enemyReset();
            //if you have 3 stars, you win the game.
            if (stars.length >= 3) {
              console.log('You win the Game!!!');
              gameWin();
            }
        }
        keyUp2 += 1;
    }
};

Player.prototype.reset = function() {
    this.x = 202.5;
    this.y = 400;
};

//this function make player blinking if collision takes place.
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

//this funtion enable your arrow keys to move the player
Player.prototype.handleInput = function(inputKeyb){
  if (inputAvailable === 1) {
    switch (inputKeyb) {
      case 'left':
        this.x -= this.speed;
        break;
      case 'up':
        this.y -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
      case 'down':
        this.y += this.speed;
        break;
      default:
        console.log("your inut is invaild!!");
     }
  }
};

//set heart obj.
var Heart = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Heart.png';
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 60);
};

//set star obj.
var Star = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Star.png';
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 60);
};

//the function produce the enemys with different levels of speed.
//more faster the enemys are, more difficult game could become.
var enemyReset = function() {
  allEnemies = [];
  var speedFactor = arr.sort(() => Math.random() - 0.5).slice(0,4);
  for (var i=0;i<4;i++) {
    var enemy = new Enemy(0, Ylocation[i], speedFactor[i]*gameLevel*10);
    allEnemies.push(enemy);
  }
};

//this function defines the winning window popping up.
var gameWin = function() {
  layer.classList.add("show");
  layer.classList.remove("hide");
  youWin.classList.add("show");
  youWin.classList.remove("hide");
  inputAvailable = 0;
  //gameReset();
};

//this function defines the game over window popping up.
var gameOver = function() {
  layer.classList.add("show");
  layer.classList.remove("hide");
  youLose.classList.add("show");
  youLose.classList.remove("hide");
  inputAvailable = 0;
  //gameReset();
};

//initiaize the game and produce the obj on the board.
var gameInitialization = function() {
  youWin = document.querySelector(".youWin");
  youLose = document.querySelector(".youLose");
  layer = document.querySelector(".backLayer");
  inputAvailable = 1;
  blinkOrnot = 1;
  interval = null;
  player = new Player(202.5, 400, 40);
  hearts = [];
};

//reset the game in the next round or if you want try and play again.
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
  keyUp1 = 0;
  keyUp2 = 0;
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
    keyUp1 += 1;
    player.handleInput(allowedKeys[e.keyCode]);
});
