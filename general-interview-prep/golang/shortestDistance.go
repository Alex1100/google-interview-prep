package main

import (
  "fmt"
  "math"
)

func shortestDistance(maze [][]int, start []int, destination []int) int {
    // make an associative array of length of original maze/grid
    distance := make([][]int, len(maze))

    // populate each cell in the matrix
    // to have a value of maximum safe int64 number
    for i := range distance {
        distance[i] = make([]int, len(maze[0]))
        for j := 0; j < len(distance[i]); j++ {
            distance[i][j] = math.MaxInt64
        }
    }

    // set the starting cell position to be marked as zero or visited
    distance[start[0]][start[1]] = 0

    // do a search
    dfs(maze, start, distance)

    // if the destination is still max int64
    // that means we did not have a means of arriving
    // to that destination
    // so we return -1

    // else we return the distance it took to arrive at
    // the destination
    if distance[destination[0]][destination[1]] == math.MaxInt64 {
        return -1
    } else {
        return distance[destination[0]][destination[1]]
    }

    return -1
}

func dfs(maze [][]int, start []int, distance [][]int) {
    var dirs = [][]int{
        []int{0, 1},
        []int{0, -1},
        []int{-1, 0},
        []int{1, 0},
    }

    for _, dir := range dirs {
        // for each direction
        // we set the starting position
        // to add or subtract the corresponding row and Column
        // values
        x := start[0] + dir[0]
        y := start[1] + dir[1]
        count := 0
        // we check to see how many steps/times we could move in the same direction
        // without hitting a wall in any of the four directions
        for x >= 0 && y >= 0 && x < len(maze) && y < len(maze[0]) && maze[x][y] == 0 {
            x += dir[0]
            y += dir[1]
            count++
        }

        // if the distance at the starting position/cell + the count of steps we could have taken
        // is less than the distance at the second to last step we take
          // then we set the distance at the second to last step to equal
          // the distance at the starting position/cell + the count of steps
          // we could have taken

          // we set nextStarting position to be equal to the second to last step
          // and we do another depth first search with the nextStating position
          // our starting position

          // essentially at each cell/position we will end up with the
          // minimum distance required to reach each position/cell
          // from a given starting location
        if distance[start[0]][start[1]] + count < distance[x - dir[0]][y - dir[1]] {
            distance[x - dir[0]][y - dir[1]] = distance[start[0]][start[1]] + count
            var nextStart = []int{x - dir[0], y - dir[1]}
            dfs(maze, nextStart, distance)
        }
    }
}

func main() {

}
