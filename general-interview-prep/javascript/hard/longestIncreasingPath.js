/**
 * @param {number[][]} matrix
 * @return {number}
 */

const walkPath = (grid, row, col, visited) => {
  let directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
  ];
  if (visited[row][col]) {
      return visited[row][col];
  }
  
  for (let [dx, dy] of directions) {
      let x = dx + row, y = dy + col;
      if (x >= 0 && y >= 0 && x < grid.length && y < grid[0].length && grid[row][col] < grid[x][y]) {
          visited[row][col] = Math.max(visited[row][col], walkPath(grid, x, y, visited));
      }
  }

  return ++visited[row][col];
};

// https://leetcode.com/problems/longest-increasing-path-in-a-matrix

// Given an m x n integers matrix, return the length of the longest increasing path in matrix.

// From each cell, you can either move in four directions: left, right, up, or down.
// You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

// Example 1:
// 
// Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
// Output: 4
// Explanation: The longest increasing path is [1, 2, 6, 9].

// Example 2:

// Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
// Output: 4
// Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

// Example 3:

// Input: matrix = [[1]]
// Output: 1

var longestIncreasingPath = function(matrix) {
  // each next cell must be of greater value then the prior
  // find the longest possible path that follows this simple rule.
  
  let maxPathSum = 0;
  // dfs
  // uses a double for loop    
  let visited = Array.from({length: matrix.length}, () => new Array(matrix[0].length).fill(0));

  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
          maxPathSum = Math.max(maxPathSum, walkPath(matrix, i, j, visited));
      }
  }
  
  return maxPathSum;
};