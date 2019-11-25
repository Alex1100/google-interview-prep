let oldNNMatrix =
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

// Works for NxN matrixes
const rotateNxNMatrix = (matrix) => matrix.map((column, element) => matrix.map((row) => row[element]).reverse());

console.log(rotateNxNMatrix(oldNNMatrix));



/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    for (let i = 0; i < matrix.length / 2; i++) {
        for (let j = i; j < matrix.length - i - 1; j++) {
            // Swap elements of each cycle
            // in clockwise direction
            let temp = matrix[i][j];
            matrix[i][j] = matrix[matrix.length - 1 - j][i];
            matrix[matrix.length - 1 - j][i] = matrix[matrix.length - 1 - i][matrix.length - 1 - j];
            matrix[matrix.length - 1 - i][matrix.length - 1 - j] = matrix[j][matrix.length - 1 - i];
            matrix[j][matrix.length - 1 - i] = temp;
        }
    }
    return matrix;
};
