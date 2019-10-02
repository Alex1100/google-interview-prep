const getStatus = (board, columnLength, rowLength, x, y) => {
  let live = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let newX = x + i;
      let newY = y + j;
      if (newX == x && newY == y) {
        continue;
      }
      if (newX >= 0 && newY >= 0 && newX < columnLength && newY < rowLength) {
        if (board[newX][newY] == 1 || board[newX][newY] == 3) {
          live++;
        }
      }
    }
  }

  return live;
}

var gameOfLife = function(board) {
  let columnLength = board.length;
  let rowLength = board[0].length;

  for (let i = 0; i < columnLength; i++) {
    for (let j = 0; j < rowLength; j++) {
      let status = getStatus(board, columnLength, rowLength, i, j);
      if (
        (board[i][j] == 1 || board[i][j] == 3) &&
        (status == 2 || status == 3)
      ) {
        board[i][j] = 3;
      } else {
        board[i][j] =
            status == 3 ?
                2 :
                board[i][j];
      }
    }
  }
  for (let i = 0; i < columnLength; i++) {
    for (let j = 0; j < rowLength; j++) {
      board[i][j] >>= 1;
    }
  }

  return board;
};



