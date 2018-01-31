// Enemies our player must avoid
var Enemy = function(x, y, speed = 50) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.location = (x, y);
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
      //setTimeout("Player.blink(false);",20000);
      player.reset();
      player.blink(true);
    }
    if (this.x >= 505) {
      this.x = 0;
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
    this.speed = speed
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.y > 383 ) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
    if (this.y + 63 <= 0) {
        this.x = 202.5;
        this.y = 383;
        console.log('Success!');
    }
};

Player.prototype.reset = function() {
    this.x = 202.5;
    this.y = 383;
};

//Player.prototype.blink = function() {
//    var player_image = Resources.get(this.sprite);
//   if (player_image.style.display === "block") {
//        player_image.style.display = "none";
//    } else {
//        player_image.style.display === "block";
//    }
//};

Player.prototype.blink = function(TF) {
    var player_image = Resources.get(this.sprite);
    if (TF === true) {
        var status = 1;
        var blinking = function () {
            if (status === 1) {
                player_image.style.display = "block";
                //player_image.style.visibility = 'visible';
                console.log("visible");
                status = 0;
            } else {
                player_image.style.display = "none";
                //player_image.style.visibility = 'hidden';
                console.log("hidden");
                status = 1;
            }
        };
        setInterval(blinking,100);
    } else {
        player_image.style.display = "block";
        //player_image.style.visibility = 'visible';
        console.log("visible");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(inputKeyb){
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50);
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);


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
