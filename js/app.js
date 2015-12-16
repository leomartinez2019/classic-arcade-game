// The superclass from which Enemy, Player and Gem inherit
// It has two functions: choice and render
var Entity = function(url) {
    this.sprite = url;
};

// A pythonic function in javascript
// to position the enemy and gem randomly
// This function is called by the update function
// Returns the possible y coordinates of the enemies
Entity.prototype.choice = function(entityArray) {
    var indx = Math.floor(Math.random() * entityArray.length);
        return entityArray[indx];
};

// This function is used by all the three entities
// Renders (draws) the sprite to the board
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xValue, this.yValue);
};

// Enemies our player must avoid
var Enemy = function(url) {
    Entity.call(this, url);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // This is an array of different speeds for the enemy to choose from
    this.speedList = [50, 150, 250, 350];
    // The three different y locations from which the enemies appear
    this.yList = [65, 145, 230];
    // This list is used to avoid enemies to clutter all the time
    this.xList = [-150, -120, -90, -60, -30];
    this.xValue = this.choice(this.xList);
    this.yValue = this.choice(this.yList);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = 'images/enemy-bug.png';
};

// Inheritance of parent prototype
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.xValue += this.choice(this.speedList) * dt;
    if (this.xValue > 505) {
        this.xValue = this.choice(this.xList);
        this.yValue = this.choice(this.yList);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Gem class which gives points to player
// Inherits from Entity
var Gem = function(url) {
    Entity.call(this, url);
    this.xGemArray = [0, 100, 200, 300, 400];
    this.yGemArray = [70, 155, 240];
    this.xValue = this.choice(this.xGemArray);
    this.yValue = this.choice(this.yGemArray);
}

// Parent inheritance 
Gem.prototype = Object.create(Entity.prototype);
Gem.prototype.constructor = Gem;

// Update Gem, this function is called when the reset button is pressed
// Or the player touches this object
Gem.prototype.update = function() {
    this.xValue = this.choice(this.xGemArray);
    this.yValue = this.choice(this.yGemArray);
};

// Now write your own player class
// This class inherits from Entity
var Player = function(url) {
    Entity.call(this, url);
    this.score = 0;
    this.lives = 5;
    this.alive = true;
    this.message = "";
    this.xValue = 100;
    this.yValue = 410;
    this.xSpeed = 100;
    this.ySpeed = 84;
}

// Prototype inheritance from parent class
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Reset the player's attributes lives, alive, speed, score and message
// This function is called by the reset button
Player.prototype.reset = function() {
    this.xSpeed = 100;
    this.ySpeed = 84;
    this.alive = true;
    this.lives = 5;
    this.score = 0;
    this.message = "";
}

// Function to determine the player's lives
// It updates the score at the top of the game board
Player.prototype.countLives = function() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.clearRect(0,0,canvas.width,40);
    ctx.font ="bold 24px Arial";
    ctx.fillText("Lives: " + this.lives, 10, 20);
    ctx.fillText(this.message, 170, 20);
    ctx.fillText("Score: " + this.score, 380, 20);
    ctx.restore();
}

// Check if player runs out of lives in which case the message "game over" appears
Player.prototype.checkGameOver = function() {
    if (!this.alive) {
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.message = "GAME OVER!";
        }
}

// Update the player depending on the key pressed
Player.prototype.update = function() {
    this.handleInput();
    this.countLives();
    this.checkGameOver();
};

// The keys to mo move the player up, down, right and left
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'right') {
        this.xValue += this.xSpeed;
        if (this.xValue > 415) {
            this.xValue = 415;
        }
    }
    else if (keyPressed == 'left') {
        this.xValue -= this.xSpeed;
        if (this.xValue < -5) {
            this.xValue = -5;
        }
    }
    else if (keyPressed == 'up') {
        this.yValue -= this.ySpeed;
        if (this.yValue < -5) {
            this.yValue = 410;
            this.xValue = 100;
            this.score -= 1;
        }
    }
    else if (keyPressed == 'down') {
        this.yValue += this.ySpeed;
        if (this.yValue > 410) {
            this.yValue = 410;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var allEnemies = [new Enemy('images/enemy-bug.png'), new Enemy('images/enemy-bug.png'), new Enemy('images/enemy-bug.png')];
var allEnemies = [];
for (var indx = 0; indx < 3; indx++) {
    allEnemies.push(new Enemy('images/enemy-bug.png'));
}

var gema = new Gem('images/Star.png');
var player = new Player('images/char-boy.png');

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
