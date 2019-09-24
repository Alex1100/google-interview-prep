package main

import (
    "fmt"
    "math"
)

func maxProductSubarray(nums []int) int {
    res := math.Inf(-1)
    min := 1.0
    max := 1.0

    for _, num := range nums {
        n := float64(num)
        tempMax := max
        tempMin := min
        min = math.Min(math.Min(n, tempMin * n), tempMax * n)
        max = math.Max(math.Max(n, tempMin * n), tempMax * n)
        res = math.Max(res, max)
    }

    return int(res);
}


func main() {
  var nums []int

  nums = []int{2, 3, -2, 4}
  fmt.Println("MAX PRODUCT SUBARRAY SUM IS: ", maxProductSubarray(nums))
}
