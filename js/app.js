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

// Gem class which gives more points to player
var Gem = function() {
    this.sprite = 'images/Star.png';
    this.xGemArray = [0, 100, 200, 300, 400];
    this.yGemArray = [70, 155, 240];
    this.xVal = choice(this.xGemArray);
    this.yVal = choice(this.yGemArray);
}

// Update gem
Gem.prototype.update = function() {
    this.xVal = choice(this.xGemArray);
    this.yVal = choice(this.yGemArray);
};

// Render gem on the board
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xVal, this.yVal);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.score = 0;
    this.lives = 5;
    this.alive = true;
    this.x = 100;
    this.y = 410;
    this.xSpeed = 100;
    this.ySpeed = 84;
    this.sprite = 'images/char-boy.png';
}

// Update the player depending on the key pressed
Player.prototype.update = function() {
    this.handleInput();
};

// Render the player on the board
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The keys to mo move the player up, down, right and left
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
            this.score -= 1;
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
var gema = new Gem();
var player = new Player();
//var gema = new Gem();

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
