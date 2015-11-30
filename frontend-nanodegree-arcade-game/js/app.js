//Array of all possible character assets

var character = ["images/char-boy.png", "images/char-cat-girl.png","images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];

var enemyStartRow = [60, 140, 220];    //Height of row for enemies in pixels.
var collisionThreshold = 30;      //Minimum number of px for collision. 
var gameWidth = 505;      //Width of game board. To check when enemies crossed

//function to generate random integer. Added num1 to include minimum number if num1 !=0. This logic excludes num2 but includes num1.
function getRandomNumber(num1, num2){
    return Math.floor((num2 - num1) * Math.random()) + num1; 
};

//function to load a random character

var startCharacter = function() {
    return character[getRandomNumber(0, character.length)];
};





// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //enemy start position x axis
    this.x = -100;                      
    //starts enemy y axis position on one of the 3 rows specified in enemyStartRow array
    this.y = enemyStartRow[getRandomNumber(0, enemyStartRow.length)]; 
    //determines the speed of the enemies
    this.speed = getRandomNumber(1,4)*100;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;

    //check for collision

    if (Math.abs(this.x - player.x) < collisionThreshold && Math.abs(this.y-player.y) <collisionThreshold){
            player.reset();
    }

    //reset enemy if it makes it across with no collision
    if (this.x > gameWidth){
        this.x = -100;  
        this.y = enemyStartRow[getRandomNumber(0, enemyStartRow.length)];
        this.speed = getRandomNumber(1,4)*100;                     
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //calls function to determine which character asset is loaded
    this.sprite = startCharacter();
    //initial positioning of the character
    this.x = 200;
    this.y = 400;

};

Player.prototype.reset = function() {
    this.sprite = startCharacter();
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys){
    if (allowedKeys === "up"){
        if(this.y > 83){
            this.y -=83;
        }
        else {
                this.reset();
        }
    }
    else if (allowedKeys ==="down"){
        if(this.y <400) {
            this.y +=83;
        }
    }
    else if (allowedKeys === "right"){
        if(this.x <400) {
            this.x +=100;
        }
    }
    else if (allowedKeys ==="left"){
        if(this.x>99) {
            this.x -=100;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];

for(var i = 0; i<3; i++){
    allEnemies.push(new Enemy());
};

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
