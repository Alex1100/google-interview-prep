package main

import "fmt"

func missingNumber(nums []int) int {
    sum := 0
    expectedSum := len(nums) * (len(nums) + 1) / 2

    for i := 0; i < len(nums); i++ {
        sum += nums[i]
    }

    return expectedSum - sum

}

func main() {
  var nums = []int{9,6,4,2,3,5,7,0,1}
  fmt.Println("MISSING NUMBER IS: ", missingNumber(nums))
}
