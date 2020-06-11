package main

func backtrack(grid [][]int, row, col, wallCount int, visited map[string]bool) int {
    // before traveling check current x, y pair (spot) and see if it is an island
    visited[string(row) + string(col)] = true

    if grid[row][col] != 0 {
        // if it is an island
        // check to see if it has any walls or if it is
        // completely surrounded by other pieces of land
        // belonging to the same island land mass
        // check edge cases literally
        if row == 0 {
            wallCount += 1
        }

        if row == len(grid) - 1 {
            wallCount += 1
        }

        if col == 0 {
            wallCount += 1
        }

        if col == len(grid[row]) - 1 {
            wallCount += 1
        }

        // check inner cases
        // check to the left
        if row > 0 && grid[row - 1][col] == 0 {
            wallCount += 1
        }

        // check to the right
        if row < len(grid) - 1 && grid[row + 1][col] == 0 {
            wallCount += 1
        }

        // check top
        if col > 0 && grid[row][col - 1] == 0 {
            wallCount += 1
        }

        // check bottom
        if col < len(grid[row]) - 1 && grid[row][col + 1] == 0 {
            wallCount += 1
        }

        // finally sink the island to prevent infinite recursion
    }


    // basically go check each direction
    // travel to it
    directions := [][]int{
        []int{row - 1, col},
        []int{row, col - 1},
        []int{row + 1, col},
        []int{row, col + 1},
    }

    for _, dir := range directions {
        x := dir[0]
        y := dir[1]
        if x >= 0 && y >= 0 && x < len(grid) && y < len(grid[row]) && visited[string(x) + string(y)] != true {
            wallCount = backtrack(grid, x, y, wallCount, visited)
        }
    }

    return wallCount
}

func islandPerimeter(grid [][]int) int {
    if len(grid) == 0 {
        return 0
    }
    // is a perimter wall if it is the 0 or last index
    // or if the element to it's left or right is not part of the island aka not a 1
    // or if the element to it's top or bottom is not part of the island aka not a 1
    wallCount := 0
    visited := make(map[string]bool)
    wallCount = backtrack(grid, 0, 0, wallCount, visited)
    return wallCount
}

func main() {
  arr := []int{
    []int{0,1,0,0},
    []int{1,1,1,0},
    []int{0,1,0,0},
    []int{1,1,0,0},
  }
  fmt.Println(islandPerimeter(arr))
}
