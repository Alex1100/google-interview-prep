// Build a grid game where every square is sea, if you click one square it turns into land. 
// 1. Calculate how many pieces of land there are.
// 
// Note: If 2 lands squares are adjacent, they count as one. 


// Follow up:
// 2. Calculate the total area of all the land




const sinkIsland = (grid, i, j, visited) => {
  if (visited[`${i}_${j}`] !== undefined) return;
  visited[`${i}_${j}`] = 1;
  grid[i][j] = "x";
  // check left
  if (j - 1 >= 0 && grid[i][j - 1] === "1") {
      sinkIsland(grid, i, j - 1, visited);
  }
  // check right
  if (j + 1 < grid[i].length && grid[i][j + 1] === "1") {
      sinkIsland(grid, i, j + 1, visited);
  }
  // check down
  if (i + 1 < grid.length && grid[i + 1][j] === "1") {
      sinkIsland(grid, i + 1, j, visited);
  }
  // check up
  if (i - 1 >= 0 && grid[i - 1][j] === "1") {
      sinkIsland(grid, i - 1, j, visited);
  }
  return
}

/**
* @param {character[][]} grid
* @return {number}
*/
var numIslands = function(grid) {
  // call sinkIsland method
  // it should recursively change 1's to 2's
  // once the entire recursive call stack is done
  // we should increment the totalCount of islands
  
  // iterate through the matrix and wherever we find a 1 keep calling sinkIsland
  
  // at the end of the numIslands method we should
  // return the totalCount as the answer
  
  let islandCount = 0;
  let visited = {};
  
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] == 1) {
              sinkIsland(grid, i, j, visited);
              islandCount++;
          }
      }
  }
  return islandCount;
};