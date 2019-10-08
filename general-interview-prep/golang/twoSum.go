package main

import (
  "fmt"
)

type Index struct {
  Val int
}

func twoSum(nums []int, target int) []int {
    seen := make(map[int]*Index)
    result := make([]int, 0, 2)
    result = []int{-1, -1}

    for i := 0; i < len(nums); i++ {
      sumPartner := target - nums[i]

      if seen[sumPartner] != nil {
        return []int{seen[sumPartner].Val, i}
      } else {
        seen[nums[i]] = &Index{Val: i}
      }
    }

    return result
}

func main() {
  nums := []int{2, 7, 11, 15}
  nums2 := []int{3, 2, 4}
  nums3 := []int{-1,-2,-3,-4,-5}
  nums4 := []int{-10,7,19,15}

  fmt.Println(twoSum(nums, 9))
  fmt.Println(twoSum(nums2, 6))
  fmt.Println(twoSum(nums3, -8))
  fmt.Println(twoSum(nums4, 9))
}
