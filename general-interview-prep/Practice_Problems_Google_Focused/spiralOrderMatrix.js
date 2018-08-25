let matrixA =
  [
    [1, 2, 4],
    [7, 9, 0],
    [9, 8, 5]
  ];


// n x n matrix only
const spiralTraversal = (arr) => {
  if (arr.length < 1) {
    return arr;
  }

  let resultArray = [];
  let count = arr[0].length - 1; // signifies n
  let rowCount = 0; // row
  let columnCount = 0; // column
  let currentDirection = 'right';

  while(resultArray.length < arr.length * arr.length) {
    if (currentDirection === 'right') {
      if (resultArray.length < arr.length * arr.length) {
        if (columnCount <= count) {
          resultArray.push(arr[rowCount][columnCount]);
          columnCount++;
        }

        if (columnCount > count) {
          // change direction to 'down'
          // increment our rowCounter
          currentDirection = 'down';
          rowCount++;
          columnCount--;
        }
      }
    }
    if (currentDirection === 'down') {
      if (resultArray.length < arr.length * arr.length) {
        if (rowCount <= count) {
          resultArray.push(arr[rowCount][columnCount]);
          rowCount++;
        }

        if (rowCount > count) {
          // change direction to 'left'
          // decrement our columnCount
          currentDirection = 'left';
          columnCount--;
          rowCount--;
        }
      }
    }
    if (currentDirection === 'left') {
      if (resultArray.length < arr.length * arr.length) {
        if (columnCount > -1) {
          resultArray.push(arr[rowCount][columnCount]);
          columnCount--;
        }

        if (columnCount === -1) {
          // change direction to 'up'
          // decrement our rowCount
          // columnCount = 0;
          currentDirection = 'up';
          rowCount--;
          columnCount = 0;
        }
      }
    }
    if (currentDirection === 'up') {
      // we need to reset count or n to be n - 1 or count - 1;
      if (resultArray.length < arr.length * arr.length) {
        if (columnCount < (count - 1)) {
          resultArray.push(arr[rowCount][columnCount]);
          columnCount++;
        }

        if (columnCount === (count - 1)) {
          count--;
          currentDirection = 'right';
        }
      }
    }
  }

  return resultArray;
}

console.log("\n", spiralTraversal(matrixA));


// m x n  and n x n matrix
const spiralOrder = (matrix) => {
  const solution = [];
  if(!matrix.length) return solution;

  let totalValues = matrix.length * matrix[0].length;
  let xPosition = 0;
  let yPosition = 0;
  let xIncrease = 1;
  let yIncrease = 0;
  let direction = 'Right';

  while(totalValues > 0){

    solution.push(matrix[yPosition][xPosition]);
    matrix[yPosition][xPosition] = null;
    totalValues--;

    xPosition += xIncrease;
    yPosition += yIncrease;

    if(!matrix[yPosition] || !matrix[yPosition][xPosition]){
      if(direction === 'Right'){
        xPosition--; //move back one position
        direction = 'Down';
        xIncrease = 0;
        yIncrease = 1;
        yPosition += yIncrease; //move to next element
      }else if (direction === 'Down'){
        yPosition--;
        direction = 'Left';
        xIncrease = -1;
        xPosition += xIncrease;
        yIncrease = 0;
      }else if (direction === 'Left'){
        xPosition++;
        direction = 'Up';
        xIncrease = 0;
        yIncrease = -1;
        yPosition += yIncrease;
      }else if (direction ==='Up'){
        yPosition++;
        direction = 'Right';
        xIncrease = 1;
        xPosition += xIncrease;
        yIncrease = 0;
      }
    }
  }
  return solution;
};

console.log("\n", spiralOrder(matrixA));

