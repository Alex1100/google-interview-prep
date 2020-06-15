package main

import (
  "fmt"
  "math"
)

func backtrack(grid [][]int, row, col, addToX, addToY int) float64 {
    if row < 0 || col < 0 || row > len(grid) - 1 || col > len(grid[row]) -1 {
        return 0
    }

    count := 0.0

    if grid[row][col] == 1 {
        count = 1.0 + backtrack(grid, row + addToX, col + addToY, addToX, addToY)
    }

    return count
}

func longestLine(M [][]int) int {
    maximumLen := 0.0

    for i := 0; i < len(M); i++ {
        for j := 0; j < len(M[i]); j++ {
            if i == 0 || (i - 1 >= 0 && j - 1 >= 0 && M[i-1][j-1] == 0) {
                maximumLen = math.Max(maximumLen, backtrack(M, i, j, 1, 1))
            }
            if j == 0 || (i + 1 < len(M) && j - 1 >= 0 && M[i+1][j-1] == 0) {
                maximumLen = math.Max(maximumLen, backtrack(M, i, j, -1, 1))
            }
            if j == 0 || (j - 1 >= 0 && M[i][j-1] == 0) {
                maximumLen = math.Max(maximumLen, backtrack(M, i, j, 0, 1))
            }
            if i == 0 || (i - 1 >= 0 && M[i-1][j] == 0) {
                maximumLen = math.Max(maximumLen, backtrack(M, i, j, 1, 0))
            }

        }
    }

    return int(maximumLen)
}

func main() {
  matrix := [][]int{
    []int{0, 1, 1, 0},
    []int{0, 1, 1, 1},
    []int{0, 0, 1, 1},
  }
  fmt.Println(longestLine(matrix))
}
