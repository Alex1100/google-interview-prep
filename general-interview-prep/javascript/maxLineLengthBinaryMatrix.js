/**
 * @param {number[][]} M
 * @return {number}
 */

 let isInBounds = (grid, row, col) => {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

let dfs = (grid, row, col, xDir, yDir, currentLength, maxLineLength) => {
  if (grid[row][col] === 1) {
      currentLength += 1;
      maxLineLength = Math.max(maxLineLength, currentLength);
  } else {
      maxLineLength = Math.max(maxLineLength, currentLength);
      return maxLineLength;
  }
  
  let x = row + xDir, y = col + yDir;
  if (isInBounds(grid, x, y)) {
      maxLineLength = dfs(grid, x, y, xDir, yDir, currentLength, maxLineLength);
  }
  return maxLineLength;
}

var longestLine = function(M) {
  let maxLineLength = 0;
  for (let i = 0; i < M.length; i++) {
      for (let j = 0; j < M[i].length; j++) {
          let directions = [
              [0, 1],
              [1, 0],
              [0, -1],
              [-1, 0],
              [1, 1],
              [1, -1],
              [-1, 1],
              [-1, -1],
          ];
          for (let [x, y] of directions) {
              maxLineLength = Math.max(maxLineLength, dfs(M, i, j, x, y, 0, maxLineLength));
          }
      }
  }
  return maxLineLength;
};