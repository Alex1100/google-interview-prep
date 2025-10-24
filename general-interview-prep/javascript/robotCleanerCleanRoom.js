/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * function Robot() {
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     @return {boolean}
 *     this.move = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnLeft = function() {
 *         ...
 *     };
 * 
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void} 
 *     this.turnRight = function() {
 *         ...
 *     };
 *
 *     // Clean the current cell.
 *     @return {void}
 *     this.clean = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {Robot} robot
 * @return {void}
 */

 const backtrack = (row, col, d, robot, visited) => {
  const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
  ];
  
  visited[`${row}_${col}`] = true;
  robot.clean();
  
  for (let i = 0; i < 4; ++i) {
      let newD = (d + i) % 4;
      let x = row + directions[newD][0];
      let y = col + directions[newD][1];
      if (visited[`${x}_${y}`] === undefined && robot.move()) {
          backtrack(x, y, newD, robot, visited);
          robot.turnRight();
          robot.turnRight();
          robot.move();
          robot.turnRight();
          robot.turnRight();
      }
      
      robot.turnRight();
  }
}

var cleanRoom = function(robot) {
  backtrack(0, 0, 0, robot, {});
};