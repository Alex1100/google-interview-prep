package main

import (
    "fmt"
)

// reverse diagonal elements first, then reverse each row
func rotate(matrix [][]int) {
    size := len(matrix)
	for i := 1; i < size; i++ {
		for j := 0; j < i; j++ {
			tmp := matrix[i][j]
			matrix[i][j] = matrix[j][i]
			matrix[j][i] = tmp
		}
	}


	for i := 0; i < size; i++ {
		for j := 0; j < size/2; j++ {
			tmp := matrix[i][j]
			matrix[i][j] = matrix[i][size-1-j]
			matrix[i][size-1-j] = tmp
		}
	}
}

func main() {
  var matrix [][]int

  matrix = [][]int{
    []int{1, 2, 3, 4},
    []int{5, 6, 7, 8},
    []int{9, 10, 11, 12},
    []int{13, 14, 15, 16},
  }
  fmt.Println("MATRIX BEFORE: ", matrix)
  rotate(matrix)
  fmt.Println("MATRIX IS NOW: ", matrix)
}
