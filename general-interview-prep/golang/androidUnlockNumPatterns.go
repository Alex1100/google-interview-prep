package main

import "fmt"

func helper(num, size, res, m, n int, jumps [][]int, visited []bool) int {
    if size >= m {
        res++
    }
    size++

    if size > n {
        return res
    }
    visited[num] = true;
    for next := 1; next <= 9; next++ {
        jump := jumps[num][next]
        if !visited[next] && (jump == 0 || visited[jump]) {
            res = helper(next, size, res, m, n, jumps, visited)
        }
    }

    visited[num] = false
    return res
}

func androidUnlockNumberOfPatterns(m int, n int) int {
    res := 0;
    visited := make([]bool, 0)
    jumps := make([][]int, 0)
    for i := 0; i < 10; i++ {
        visited = append(visited, false)
    }

    for i := 0; i < 10; i++ {
        arr := make([]int, 0)
        for j := 0; j < 10; j++ {
            arr = append(arr, 0)
        }
        jumps = append(jumps, arr)
    }
    jumps[1][3] = 2
    jumps[3][1] = 2
    jumps[4][6] = 5
    jumps[6][4] = 5
    jumps[7][9] = 8
    jumps[9][7] = 8
    jumps[1][7] = 4
    jumps[7][1] = 4
    jumps[2][8] = 5
    jumps[8][2] = 5
    jumps[3][9] = 6
    jumps[9][3] = 6
    jumps[1][9] = 5
    jumps[9][1] = 5
    jumps[3][7] = 5
    jumps[7][3] = 5

    res += helper(1, 1, 0, m, n, jumps, visited) * 4
    res += helper(2, 1, 0, m, n, jumps, visited) * 4
    res += helper(5, 1, 0, m, n, jumps, visited)
    fmt.Println("RES: ", res)
    return res
}

func main() {
  androidUnlockNumberOfPatterns(1, 1)
  androidUnlockNumberOfPatterns(2, 5)
  androidUnlockNumberOfPatterns(3, 6)
  androidUnlockNumberOfPatterns(1, 8)
  androidUnlockNumberOfPatterns(1, 9)
}
