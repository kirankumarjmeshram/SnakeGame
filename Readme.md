


# Project Title: Terminal-Based Snake Game with DSA Enhancements


### Objective:

To develop a terminal-based Snake game where the snake moves around a grid, eats food to grow in size, and increases in speed with each piece of food consumed. The project will emphasize the application of data structures and algorithms to manage the game's dynamics and logic efficiently, providing a hands-on experience with practical DSA usage.

### Background:

The Snake game is a classic arcade game that has seen various implementations over the years. The simplicity of its gameplay mechanics, combined with the need for efficient data handling and real-time responsiveness, makes it an excellent project for applying DSA principles in a fun and engaging way.


* **Running the Game:**

1. Ensure you have Node.js installed on your system.
2. Download or clone the Snake game code from the repository.
3. Open your terminal and navigate to the directory containing the game files.
4. Run the game using the command: `node snakeTerminal.js`.
5. Use the arrow keys (up, down, left, right) to control the snake's movement.
6. Press 'c' to exit the game at any time.



* **Features:**

  * The snake moves continuously in the grid.
  * Eating food increases the snake's length
  * The game ends if the snake collides with itself or the grid's boundaries.
  * A clear, terminal-based display shows the snake, food, and score.
  * Responsive control of the snake's direction using keyboard inputs.
* **DSA Concepts Applied:**

  * **Arrays and Object:** Utilized for grid representation and tracking the positions of food and snake segments, enabling constant-time access and updates. (food, sneakArr)
  * **Queues:** Employed for managing the snake's body segments efficiently, facilitating easy additions (growth) and removals (movement).
  * **Randomized Algorithms:** Utilized for generating food positions on the grid in a way that avoids the snake's current position. (generateFood function)
* **Algorithms used**

  * Randomized Food Generating Algorithms
  * Collision Detection Algorithm
  * Game loop algorithm

referance : (Coding Snake Game In JavaScript) [https://www.youtube.com/watch?v=2ZDnw6ifdSI]
