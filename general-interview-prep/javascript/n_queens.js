
// Write an algorithm to print all ways of arranging n queens on an nxn chess board
// so that none of them share the same row, column, or diagonal. in this case, "diagonal" means all
// diagonals, not just the two that bisect the board

let columns = [0, 1, 2, 3, 4, 5, 6, 7];
let row = 0;

const n_queens = (row, columns, valid_pos = {}, queens = []) => {
  if (queens.length === columns.length) {
    return queens;
  }

  let result = [];

  columns.forEach(col => {
    let pos = [row, col];
    let temp_valid_pos = {...valid_pos};
    let temp_queens = [...queens];
    let temp_columns = [...columns];

    if (temp_queens.every(queen_pos => (Math.abs(queen_pos[0]) - Math.abs(pos[0]) !== (queen_pos[1] - Math.abs(pos[1]))))) {
      temp_queens.push(pos);
      temp_columns = temp_columns.filter(el => el !== col);

      new_queens = n_queens(row+1, temp_columns, temp_valid_pos, temp_queens);

      if (new_queens.length > 0) {
        result.push(new_queens);
        result = result.filter((el, i, arr) => arr.indexOf(el) === i);
      }

    }
  })
  return result.filter((el, i, arr) => arr.indexOf(el) === i);
}

n_queens(row, columns).forEach(el => console.log("\n\n\n", JSON.stringify(el)))
