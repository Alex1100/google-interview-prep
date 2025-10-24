// You are given an image represented by an m x n grid of integers image, 
// where image[i][j] represents the pixel value of the image. 

// You are also given three integers sr, sc, and color. 

// Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill:

// Begin with the starting pixel and change its color to color.

// Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, 
// either horizontally or vertically) and shares the same color as the starting pixel.

// Keep repeating this process by checking neighboring pixels of the updated pixels 
// and modifying their color if it matches the original color of the starting pixel.

// The process stops when there are no more adjacent pixels of the original color to update.

// Return the modified image after performing the flood fill.

// Example 1:
// Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2

// Output: [[2,2,2],[2,2,0],[2,0,1]]

// Example 2:
// Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0

// Output: [[0,0,0],[0,0,0]]

// Constraints:

// m == image.length
// n == image[i].length
// 1 <= m, n <= 50
// 0 <= image[i][j], color < 216
// 0 <= sr < m
// 0 <= sc < n


// Hint 1:
// Write a recursive function that paints the pixel if it's the correct color, then recurses on neighboring pixels.


/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
  let start = Number(image[sr][sc]);
  backtrack(image, sr, sc, start, newColor);
  return image;
};

const backtrack = (grid, row, col, target, updated) => {
  let isSame = grid[row][col] === target;
  let notUpdated = grid[row][col] !== updated;

  if (isSame) {
      grid[row][col] = updated;

      //left
      if (col - 1 >= 0 && notUpdated) {
          backtrack(grid, row, col - 1, target, updated);
      }

      //top
      if (row - 1 >= 0 && notUpdated) {
          backtrack(grid, row - 1, col, target, updated);
      }

      //right
      if (col + 1 < grid[row].length && notUpdated) {
          backtrack(grid, row, col + 1, target, updated);
      }

      //bottom
      if (row + 1 < grid.length && notUpdated) {
          backtrack(grid, row + 1, col, target, updated);
      }
  }
}
