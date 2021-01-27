package main

import "fmt"

func generateMatrix(n int) [][]int {
	out := make([][]int, n)
	for k := range out {
		out[k] = make([]int, n)
	}
	dirx, diry := 1, 0
	x, y := 0, 0
	for i := 1; i <= n*n; i++ {
		out[y][x] = i
		if !(x+dirx < n && y+diry < n && x+dirx >= 0 && y+diry >= 0 && out[y+diry][x+dirx] == 0) {
			dirx, diry = -diry, dirx
		}
		x, y = x+dirx, y+diry
	}
	return out
}

func main() {
	fmt.Println(generateMatrix(9))
}
