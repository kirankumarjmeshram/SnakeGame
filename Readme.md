# Project Title: Terminal-Based Snake Game with DSA Enhancements

### Objective:

To develop a terminal-based Snake game where the snake moves around a grid, eats food to grow in size, and increases in speed with each piece of food consumed. The project will emphasize the application of data structures and algorithms to manage the game's dynamics and logic efficiently, providing a hands-on experience with practical DSA usage.

### Background:

The Snake game is a classic arcade game that has seen various implementations over the years. The simplicity of its gameplay mechanics, combined with the need for efficient data handling and real-time responsiveness, makes it an excellent project for applying DSA principles in a fun and engaging way.

### Running the Game:

1. Ensure you have Node.js installed on your system.
2. Download or clone the Snake game code from the repository.
3. Open your terminal and navigate to the directory containing the game files.
4. Run the game using the command: `node snakeTerminal.js`.
5. Use the arrow keys (up, down, left, right) to control the snake's movement.
6. Press 'c' to exit the game at any time.

### Features:

* The snake moves continuously in the grid.
* Eating food increases the snake's length
* The game ends if the snake collides with itself or the grid's boundaries.
* A clear, terminal-based display shows the snake, food, and score.
* Responsive control of the snake's direction using keyboard inputs.

### DSA Concepts Applied:

* **Arrays and Object:** Utilized for grid representation and tracking the positions of food and snake segments, enabling constant-time access and updates. (food, sneakArr)
* **Queues:** Employed for managing the snake's body segments efficiently, facilitating easy additions (growth) and removals (movement).

### Algorithms used

* Randomized Food Generating Algorithms
* Collision Detection Algorithm
* Game loop algorithm

### How the Game Works

* The game starts with a snake of length 1 positioned at a random point on the grid.
* The snake continuously moves in the direction specified by the player (up, down, left, right).
* If the snake eats food (denoted by '*'), its length increases by 1 and a new piece of food is randomly generated.
* When each time the snake eats food the player's score increases by 1.
* The game ends if the snake collides with itself or with the boundaries of the grid.
* The final score is displayed when the game ends.

### Score Calculation

* The player's score increases by 1 each time the snake eats food.
* There are no penalties for collisions or time taken.

### Code Explanation
##### Game Constants & Variables:
```js
let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let lastTime = 0;
```
**inputDir**: Represents the direction in which the snake is moving.
**speed**: Represents the initial speed of the snake.
**score**: Tracks the player's score.
**lastTime**: Tracks the last time the game state was updated.

#### Arrays and Objects:
```js
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 6, y: 7 };

```
**snakeArr**: An array of objects representing the snake's body segments.
**food**: An object representing the position of the food on the grid.

#### Update function
This function updates the game state, including the snake's movement, food consumption, and collision detection.
```js
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
```
#### Randomized Food Generating Algorithm:
This function generates food at random positions on the grid, ensuring it does not overlap with the snake's current position.
```js
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
```

#### Collision Detection Algorithm
Checks for collisions with the walls or the snake itself. If a collision occurs, the game ends.
```js
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
```

#### Draw Function
This function clears the terminal and displays the game grid, including the snake, food, and score.
```js
// Function to display the game state
function draw() {
    // Clear terminal
    process.stdout.write('\x1Bc');

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
```

#### Main Game Loop
```js
// Main game loop 
// Game loop algo
setInterval(() => {
    update();
    draw();
}, 100); // Adjust speed here
```

####  Movement Detection Algorithm:
Listens for user input to change the direction of the snake's movement using arrow keys. Also, it handles the exit command ('c') to terminate the game.
```js
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

```


### referance :
[Coding Snake Game In JavaScript](https://www.youtube.com/watch?v=2ZDnw6ifdSI)

### Conclusion
This Snake game implementation effectively demonstrates the application of DSA concepts such as arrays, objects, queues (implicitly with the snake array), and randomized algorithms. By understanding and modifying this code, developers can gain practical experience in implementing game logic efficiently while reinforcing their knowledge of fundamental DSA principles.
