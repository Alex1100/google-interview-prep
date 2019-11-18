/**
 * @param {character[][]} grid
 * @return {number}
 */

// sink the islands while backtracking
// whenever the call stack runs out
// increment island counter;

const backtrack = (grid, row, cell) => {
    if (grid[row][cell] == 0) {
        return;
    }

    grid[row][cell] = "0";

    // left
    if (cell - 1 >= 0) {
        backtrack(grid, row, cell - 1);
    }

    // top
    if (row - 1 >= 0) {
        backtrack(grid, row - 1, cell);
    }

    // right
    if (cell + 1 < grid[0].length) {
        backtrack(grid, row, cell + 1);
    }

    // bottom
    if (row + 1 < grid.length) {
        backtrack(grid, row + 1, cell);
    }
}
var numIslands = function(grid) {
    let islands = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) {
                backtrack(grid, i, j);
                islands++;
            }
        }
    }

    return islands;
};
