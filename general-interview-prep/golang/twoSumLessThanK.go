package main

import (
  "fmt"
  "sort"
  "math"
)

func twoSumLessThanK(A []int, K int) int {
    sort.Ints(A)
    left := 0
    right := len(A) - 1
    max := math.MinInt64

    for left < right {
        if A[left] + A[right] < K {
            max = int(math.Max(float64(max), float64(A[left] + A[right])))
            left++
        } else {
            right--
        }
    }

    if max == math.MinInt64 {
        return -1
    }

    return max
}

func main() {
  fmt.Println("ANS: ", twoSumLessThanK([]int{34,23,1,24,75,33,54,8}, 60))
}
