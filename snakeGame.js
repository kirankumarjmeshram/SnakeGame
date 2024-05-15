const readline = require('readline');

// Define constants
const GRID_WIDTH = 40;
const GRID_HEIGHT = 20;
const EMPTY_CELL = ' ';
const SNAKE_CELL = 'O';
const FOOD_CELL = '*';

// Define game state
let snake = [{ x: 5, y: 5 }];
let direction = 'right';
let food = generateFood();

// Function to generate food at random position
function generateFood() {
    const x = Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1; // Avoid food on border
    const y = Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1;
    return { x, y };
}

// Function to update game state
function update() {
    // Update snake position
    let head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    // Check for collisions
    if (head.x <= 0 || head.x >= GRID_WIDTH - 1 || head.y <= 0 || head.y >= GRID_HEIGHT - 1) {
        gameOver();
        return;
    }
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // Check for food
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        food = generateFood();
    } else {
        snake.pop();
        snake.unshift(head);
    }
}

// Function to draw game state
function draw() {
    const grid = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
        let row = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (y === 0 || y === GRID_HEIGHT - 1) {
                row.push('#'); // Draw horizontal borders
            } else if (x === 0 || x === GRID_WIDTH - 1) {
                row.push('#'); // Draw vertical borders
            } else {
                row.push(EMPTY_CELL);
            }
        }
        grid.push(row);
    }
    snake.forEach(segment => {
        grid[segment.y][segment.x] = SNAKE_CELL;
    });
    grid[food.y][food.x] = FOOD_CELL;

    // Clear terminal and print grid
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(grid.map(row => row.join(' ')).join('\n'));
}

// Function to handle game over
function gameOver() {
    console.log('Game over!');
    process.exit(0);
}

// Function to handle user input
function handleInput(key) {
    switch (key) {
        case 'up':
            if (direction !== 'down') direction = 'up';
            break;
        case 'down':
            if (direction !== 'up') direction = 'down';
            break;
        case 'left':
            if (direction !== 'right') direction = 'left';
            break;
        case 'right':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

setInterval(() => {
    update();
    draw();
}, 200);

// Listen for user input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (_, key) => {
    handleInput(key.name);
});
