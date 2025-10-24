// https://leetcode.com/problems/search-a-2d-matrix-ii/


/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}

  Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

  Integers in each row are sorted in ascending from left to right.
  Integers in each column are sorted in ascending from top to bottom.

  Example:

  Consider the following matrix:

  Brute force: Linear Search


  Starter: Needs Binary Search on Rows
  [
    [10, 13, 14, 17, 24],
    [2,   5,  8, 12, 19],
    [1,   4,  7, 11, 15],
    [18, 21, 23, 26, 30],
    [3,   6,  9, 16, 22],
  ]

  Sorted Follow Up: Needs Optomized Search from Top Right Corner
  
  Integers in each row are sorted in ascending from left to right.
  Integers in each column are sorted in ascending from top to bottom.
  
  [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
  ]

  All Cases:

  Given target = 5, return true.

  Given target = 20, return false.

  Constraints:

  m == matrix.length
  n == matrix[i].length
  1 <= n, m <= 300
  -109 <= matrix[i][j] <= 109
  All the integers in each row are sorted in ascending order.
  All the integers in each column are sorted in ascending order.
  -109 <= target <= 109
 */

  var searchMatrix = function(matrix, target) {
    if (matrix.length == 0 || matrix[0].length == 0) {
        return false;
    }

    let m = matrix.length - 1;
    let n = 0;

    while (m >= 0 && n < matrix[0].length) {
        if (matrix[m][n] == target) {
            return true;
        } else if (matrix[m][n] < target) {
            n++;
        } else {
            m--;
        }
    }

    return false;
};
