func getNeighbors(maze [][]int, row, col int) [][]int {
	directions := [][]int{
			[]int{-1, -1},
			[]int{-1, 0},
			[]int{-1, 1},
			[]int{0, -1},
			[]int{0, 1},
			[]int{1, -1},
			[]int{1, 0},
			[]int{1, 1},
	}
	
	neighbors := make([][]int, 0)
	
	for _, dir := range directions {
			rowDiff, colDiff := dir[0], dir[1]
			newRow := row + rowDiff
			newCol := col + colDiff
			
			if newRow >= 0 && newRow < len(maze) && newCol >= 0 && newCol < len(maze[0]) && maze[newRow][newCol] == 0 {
					neighbors = append(neighbors, []int{newRow, newCol})
			}
	}
	
	return neighbors
}

func shortestPathBinaryMatrix(grid [][]int) int {
	if grid[0][0] != 0 || grid[len(grid) - 1][len(grid[0]) - 1] != 0 {
			return -1
	}
	
	queue := [][]int{[]int{0, 0}}
	grid[0][0] = 1
	
	for len(queue) > 0 {
			current := queue[0]
			queue = queue[1:]
			row, col := current[0], current[1]
			distance := grid[row][col]
			if row == len(grid) - 1 && col == len(grid[0]) - 1 {
					return distance
			}
			
			for _, neighbor := range getNeighbors(grid, row, col) {
					nRow, nCol := neighbor[0], neighbor[1]
					grid[nRow][nCol] = distance + 1
					queue = append(queue, []int{nRow, nCol})
			}
	}
	
	return -1
}