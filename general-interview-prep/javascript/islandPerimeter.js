/**
 * @param {number[][]} grid
 * @return {number}
 */

 const backtrack = (grid, row, col, borderCount, visited) => {
    visited[`${row}_${col}`] = 1;
    if (grid[row][col] !== 0) {
        // top
        if (row === 0) {
            borderCount++;
        }
        if (row > 0 && grid[row - 1][col] === 0) {
            borderCount++;
        }
                
        // left
        if (col === 0) {
            borderCount++;
        }
        if (col > 0 && grid[row][col - 1] === 0) {
            borderCount++;
        }

        // right
        if (col === grid[row].length - 1) {
            borderCount++;
        }
        if (col < grid[0].length - 1 && grid[row][col + 1] === 0) {
            borderCount++;
        }
        
        // bottom
        if (row === grid.length - 1) {
            borderCount++;
        }
        if (row < grid.length - 1 && grid[row + 1][col] === 0) {
            borderCount++;
        }
    }
    
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    
    for (let [dx, dy] of directions) {
        let x = dx + row, y = dy + col;
        if (x >= 0 && y >= 0 && x < grid.length && y < grid[0].length && !visited[`${x}_${y}`]) {
            return backtrack(grid, x, y, borderCount, visited);
        }
    }
    return borderCount;
}

var islandPerimeter = function(grid) {
    return backtrack(grid, 0, 0, 0, {});
};