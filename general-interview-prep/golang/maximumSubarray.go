package main

import (
    "fmt"
    "math"
)

func maxSubArray(nums []int) int {
    maxSum := int(math.Inf(-1))
    sum := 0

    for i := 0; i < len(nums); i++ {
        if sum < 0 {
            sum = 0
        }

        sum += nums[i]

        if sum > maxSum {
            maxSum = sum
        }
    }

    return maxSum
}


func main() {
  var arr []int
  arr = []int{-2, 1, -3, 4, -1, 2, 1, -5, 4}
  fmt.Println("MAX SUBARRAY SUM IS: ", maxSubArray(arr))
}
