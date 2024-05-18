
const readline = require('readline');

// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let lastTime = 0;

// Arrays or Hash Tables: 
// For the grid representation and to track the positions of food and snake segments, 
// allowing for constant-time access and updates.

let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 6, y: 7 };

// Function to update game state (movement and collision detection)
function update() {
    // Update lastTime
    const currentTime = Date.now();
    if ((currentTime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = currentTime;

    // Update snake position
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Check for collisions
    if (isCollide(snakeArr)) {
        gameOver();
        return;
    }

    // Check if snake eats food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score++;
        food = generateFood();
        snakeArr.unshift({ ...snakeArr[0] }); // Grow the snake
    }
}

// Randomized Food Generating Algorithms: For generating food positions on the grid in a way that avoids the snake's current position.
// Function to generate food at random position
function generateFood() {
    const newFood = { x: Math.floor(Math.random() * 18) + 1, y: Math.floor(Math.random() * 18) + 1 };
    // Ensure food doesn't overlap with snake
    if (snakeArr.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        return generateFood(); // Try again
    }
    return newFood;
}


// Function to check for collisions
// Collision Detection Algorithm
function isCollide(snake) {
    // Check if snake hits the wall
    if (snake[0].x <= 0 || snake[0].x >= 19 || snake[0].y <= 0 || snake[0].y >= 19) {
        return true;
    }
    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Function to display the game state
function draw() {
    // Clear terminal
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);

    // Display game elements
    for (let y = 0; y < 20; y++) {
        let row = '';
        for (let x = 0; x < 20; x++) {
            if (y === 0 || y === 19 || x === 0 || x === 19) {
                row += '# '; // Border
            } else if (snakeArr.some(segment => segment.x === x && segment.y === y)) {
                row += 'O '; // Snake
            } else if (food.x === x && food.y === y) {
                row += '* '; // Food
            } else {
                row += '  '; // Empty space
            }
        }
        console.log(row);
    }

    // Display score
    console.log('Score: ' + score);
}

// Function to handle game over
function gameOver() {
    console.log('Game Over! Final Score: ' + score);
    process.exit(0);
}

// Main game loop 
// Game loop algo
setInterval(() => {
    update();
    draw();
}, 100); // Adjust speed here

// Listen for user input
//  Movement Detection Algorithm
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
// dont use library  ie => process.stdin.on('keypress'
process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
        case 'up':
            if (inputDir.y !== 1) {
                inputDir = { x: 0, y: -1 };
            }
            break;
        case 'down':
            if (inputDir.y !== -1) {
                inputDir = { x: 0, y: 1 };
            }
            break;
        case 'left':
            if (inputDir.x !== 1) {
                inputDir = { x: -1, y: 0 };
            }
            break;
        case 'right':
            if (inputDir.x !== -1) {
                inputDir = { x: 1, y: 0 };
            }
            break;
        case 'c':
            process.exit(0); 
            break;
    }
});
