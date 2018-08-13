let oldNNMatrix =
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

// Works for NxN matrixes
const rotateNxNMatrix = (matrix) => matrix.map((column, element) => matrix.map((row) => row[element]).reverse());

console.log(rotateNxNMatrix(oldNNMatrix));
