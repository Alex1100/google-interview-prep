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
