package main

import (
  "fmt"
)

/*
  Given a 2d grid map of '1's (land) and '0's (water),
  count the number of islands.
  An island is surrounded by water and is formed by
  connecting adjacent lands horizontally or vertically.
  You may assume all four edges of the grid are
  all surrounded by water.

  Example 1:

  Input:
  [
    [11110],
    [11010],
    [11000],
    [00000],
  ]

  Output: 1
________________

  Example 2:

  Input:
  [
    [11000],
    [11000],
    [00100],
    [00011],
  ]

  Output: 3
*/

func sinkIsland(grid [][]byte, r, c int) {
  if grid[r][c] == 1 {
    grid[r][c] = 0
  } else {
    return
  }

  if r + 1 < len(grid) {
    sinkIsland(grid, r + 1, c)
  }

  if r - 1 >= 0 {
    sinkIsland(grid, r - 1, c)
  }

  if c + 1 < len(grid[0]) {
    sinkIsland(grid, r, c + 1)
  }

  if c - 1 >= 0 {
    sinkIsland(grid, r, c - 1)
  }
}

func numIslands(grid [][]byte) int {
  counter := 0

  for i, row := range grid {
    for j, _ := range row {
      if grid[i][j] == 1 {
        counter++
        sinkIsland(grid, i, j)
      }
    }
  }

  return counter
}

// LeetCode version
func sinkIslandLeet(grid [][]byte, r, c int) {
  if grid[r][c] == 49 {
    grid[r][c] = 48
  } else {
    return
  }

  if r + 1 < len(grid) {
    sinkIslandLeet(grid, r + 1, c)
  }

  if r - 1 >= 0 {
    sinkIslandLeet(grid, r - 1, c)
  }

  if c + 1 < len(grid[0]) {
    sinkIslandLeet(grid, r, c + 1)
  }

  if c - 1 >= 0 {
    sinkIslandLeet(grid, r, c - 1)
  }
}

func numIslandsLeet(grid [][]byte) int {
  counter := 0

  for i, row := range grid {
    for j, _ := range row {
      if grid[i][j] == 49 {
        counter++
        sinkIslandLeet(grid, i, j)
      }
    }
  }

  return counter
}

func main() {
  grid1 := [][]byte{
    []byte{1, 1, 1, 1, 0},
    []byte{1, 1, 0, 1, 0},
    []byte{1, 1, 0, 0, 0},
    []byte{0, 0, 0, 0, 0},
  }

  grid2 := [][]byte {
    []byte{1, 1, 0, 0, 0},
    []byte{1, 1, 0, 0, 0},
    []byte{0, 0, 1, 0, 0},
    []byte{0, 0, 0, 1, 1},
  }

  // Leet code takes in
  // an input to the byte array
  // of a rune and not a string
  // so 49 is 1 and 48 is 0

  grid3 := [][]byte{
    []byte{'1', '1', '1', '1', '0'},
    []byte{'1', '1', '0', '1', '0'},
    []byte{'1', '1', '0', '0', '0'},
    []byte{'0', '0', '0', '0', '0'},
  }

  grid4 := [][]byte {
    []byte{'1', '1', '0', '0', '0'},
    []byte{'1', '1', '0', '0', '0'},
    []byte{'0', '0', '1', '0', '0'},
    []byte{'0', '0', '0', '1', '1'},
  }

  fmt.Println("NUMBER OF ISLANDS: ", numIslands(grid1))
  fmt.Println("NUMBER OF ISLANDS: ", numIslands(grid2))
  fmt.Println("NUMBER OF ISLANDS: ", numIslandsLeet(grid3))
  fmt.Println("NUMBER OF ISLANDS: ", numIslandsLeet(grid4))
}
