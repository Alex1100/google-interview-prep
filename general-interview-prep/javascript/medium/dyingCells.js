/*
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a healthy cell, or
2 representing a sick cell.
Every minute, any healthy cell that is 4-directionally adjacent to a sick cell becomes sick.

Return the minimum number of minutes that must elapse until no cell has a healthy cell. If this is impossible, return -1.

Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The cell in the bottom left corner (row 2, column 0) is never sick, because getting sick only happens 4-directionally.

Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no healthy cells at minute 0, the answer is just 0.


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
*/

// bfs
/**
 * @param {number[][]} grid
 * @return {number}
 */
var dyingCells = function(grid) {
  let row = grid.length;
  let col = grid[0].length;
  let healthy = 0;
  let queue = [];
  let minutes = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 1) {
        healthy += 1;
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  let movement = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length !== 0 && healthy) {
    let size = queue.length;
    
    while (size--) {
      let curCell = queue.shift();
      const x = curCell[0];
      const y = curCell[1];
      for (let d = 0; d < 4; d++) {
        const tx = x + movement[d][0];
        const ty = y + movement[d][1];
        if (tx < 0 || tx >= row || ty < 0 || ty >= col || grid[tx][ty] !== 1) {
          continue;
        }
        healthy--;
        grid[tx][ty] = 2;
        queue.push([tx, ty]);
      }
    }
    minutes++;
  }
  return healthy ? -1 : minutes;
};
