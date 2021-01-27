package main

import (
	"fmt"
	"strconv"
)

func orangesRotting(grid [][]int) int {
	rows := len(grid)
	if rows == 0 {
		return 0
	}
	columns := len(grid[0])
	var steps int = 0
	var unvisited map[string]bool = make(map[string]bool) //store unvisit good oranges' position
	var depth [][]int                                     //store current step bad oranges
	for row := 0; row < rows; row++ {
		for col := 0; col < columns; col++ {
			if grid[row][col] == 1 {
				k := strconv.Itoa(row) + "," + strconv.Itoa(col)
				unvisited[k] = true
			}
			if grid[row][col] == 2 {
				depth = append(depth, []int{row, col})
			}
		}
	}
	if len(unvisited) == 0 { // If no good oranges exist,return 0
		return 0
	}
	for len(depth) > 0 {
		l := len(depth)
		var cur_depth [][]int = make([][]int, len(depth))
		copy(cur_depth, depth)
		depth = make([][]int, 0) //clear last level bad oranges
		for i := 0; i < l; i++ {
			r := cur_depth[i][0]
			c := cur_depth[i][1]
			//check  nearby oranges
			if r-1 >= 0 && grid[r-1][c] == 1 {
				grid[r-1][c] = 2
				k := strconv.Itoa(r-1) + "," + strconv.Itoa(c)
				delete(unvisited, k)
				depth = append(depth, []int{r - 1, c})
			}
			if r+1 < rows && grid[r+1][c] == 1 {
				grid[r+1][c] = 2
				k := strconv.Itoa(r+1) + "," + strconv.Itoa(c)
				delete(unvisited, k)
				depth = append(depth, []int{r + 1, c})
			}
			if c-1 >= 0 && grid[r][c-1] == 1 {
				grid[r][c-1] = 2
				k := strconv.Itoa(r) + "," + strconv.Itoa(c-1)
				delete(unvisited, k)
				depth = append(depth, []int{r, c - 1})
			}
			if c+1 < columns && grid[r][c+1] == 1 {
				grid[r][c+1] = 2
				k := strconv.Itoa(r) + "," + strconv.Itoa(c+1)
				delete(unvisited, k)
				depth = append(depth, []int{r, c + 1})
			}
		}
		steps++
		if len(unvisited) == 0 { // when there is no good oranges,return steps
			return steps
		}
	}
	if len(unvisited) > 0 {
		return -1
	}
	return steps
}

func main() {
	fmt.Println(orangesRotting([][]int{
		[]int{2, 1, 1}, []int{1, 1, 0}, []int{0, 1, 1},
	}))
}
