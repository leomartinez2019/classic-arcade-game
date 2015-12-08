// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speedList = [50, 150, 250, 350];
    this.yList = [65, 145, 230];
    this.xList = [-150, -120, -90, -60, -30];
    this.xValue = choice(this.xList);
    this.yValue = choice(this.yList);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// TODO: comment this
var lives = 5;
//var score = 0;

// A pythonic function in javascript
// to position the enemy randomly
// This function is called by the update function
function choice(container) {
    // Returns the possible y coordinates of the enemies
    var indx = Math.floor(Math.random() * container.length);
        return container[indx];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.xValue += choice(this.speedList) * dt;
    if (this.xValue > 505) {
        this.xValue = choice(this.xList);
        this.yValue = choice(this.yList);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xValue, this.yValue);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.score = 0;
    this.alive = true;
    this.x = 100;
    this.y = 410;
    this.xSpeed = 100;
    this.ySpeed = 84;
    this.sprite = 'images/char-boy.png';
}

// TODO: comment this
Player.prototype.update = function() {
    this.handleInput();
};

// TODO: comment this
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// TODO: comment this
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'right') {
        this.x += this.xSpeed;
        if (this.x > 415) {
            this.x = 415;
        }
    }
    else if (keyPressed == 'left') {
        this.x -= this.xSpeed;
        if (this.x < -5) {
            this.x = -5;
        }
    }
    else if (keyPressed == 'up') {
        this.y -= this.ySpeed;
        if (this.y < -5) {
            this.y = 410;
            this.x = 100;
        }
    }
    else if (keyPressed == 'down') {
        this.y += this.ySpeed;
        if (this.y > 410) {
            this.y = 410;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
