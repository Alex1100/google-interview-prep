// https://leetcode.com/problems/cherry-pickup-ii/description/

// You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] 
// represents the number of cherries that you can collect from the (i, j) cell.

// You have two robots that can collect cherries for you:

// Robot #1 is located at the top-left corner (0, 0), and
// Robot #2 is located at the top-right corner (0, cols - 1).
// Return the maximum number of cherries collection using both robots by following the rules below:

// From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
// When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
// When both robots stay in the same cell, only one takes the cherries.
// Both robots cannot move outside of the grid at any moment.
// Both robots should reach the bottom row in grid.

// Example 1:
//
// Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
// Output: 24
// Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
// Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
// Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
// Total of cherries: 12 + 12 = 24.

// Example 2:
//
// Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
// Output: 28
// Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
// Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
// Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
// Total of cherries: 17 + 11 = 28.


// Constraints:
// 
// rows == grid.length
// cols == grid[i].length
// 2 <= rows, cols <= 70
// 0 <= grid[i][j] <= 100


// Hint 1:
// Use dynamic programming, define DP[i][j][k]: 
// The maximum cherries that both robots can take starting on the ith row, 
// and column j and k of Robot 1 and 2 respectively.

/**
 * @param {number[][]} grid
 * @return {number}
 */

var cherryPickup = function(grid) {
  // get m, n
  const [m, n] = [grid.length, grid[0].length];
  // memo object for storing max cherries
  const memo = {};
  // helper dfs method that takes row, and col positions of both robots
  function dfs(row, col1, col2) {
      // bounds check (no cherries to be picked up)
      if (row === m || col1 < 0 || col1 === n || col2 < 0 || col2 === n) return 0;
      // check memo
      if (`${row},${col1},${col2}` in memo) return memo[`${row},${col1},${col2}`];

      // get current cherries to be picked up (only add them if both not on same cell)
      const cherries = grid[row][col1] + (col1 !== col2 ? grid[row][col2] : 0);

      // max cherries that can be picked in next row
      let max = 0;

      // get all possible configurations (left, stay put, right for both robots)
      for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
              // set new max
              max = Math.max(max, dfs(row + 1, col1 + i, col2 + j));
          }
      }

      // cherries picked, plus the max of the next row
      const ans = cherries + max;
      // store in memo and return
      memo[`${row},${col1},${col2}`] = ans;
      return ans;
  }

  // start dfs, and this will have max cherries
  // start at row 0, robot1 in [0,0] and robot 2 in [0,n-1]
  return dfs(0, 0, n - 1);
};