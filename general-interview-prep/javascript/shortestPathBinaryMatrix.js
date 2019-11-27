/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    let ans = 10001;
    if (!grid || grid[0][0] === 1) {
        return -1
    }

    let [rows, columns] = [grid.length, grid[0].length];
    let queue = [[0, 0, 1]];

    while (queue.length) {
        let [x, y, path] = queue.shift();

        if (x === y && y === rows - 1) {
            ans = path;
            break;
        }
        let adjacent = [
            [x+1,y],
            [x-1,y],
            [x,y+1],
            [x,y-1],
            [x+1,y+1],
            [x+1,y-1],
            [x-1,y+1],
            [x-1,y-1],
        ];

        for (let [i,j] of adjacent) {
            if (0 <= i && i < rows && 0 <= j && j < columns && grid[i][j] === 0) {
                queue.push([i,j,path+1]);
                grid[i][j] = 'X';
            }
        }

    }
    return ans < 10001 ? ans : -1;
};
