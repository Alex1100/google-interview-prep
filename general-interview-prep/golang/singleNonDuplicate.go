package main

import "fmt"

func singleNonDuplicate(nums []int) int {
    intMapCounter := make(map[int]int)

    for i := 0; i < len(nums); i++ {
        intMapCounter[nums[i]] += 1
    }

    for key, val := range intMapCounter {
        if val == 1 {
            return key
        }
    }

    return 1
}

func main() {
  var nums = []int{1,1,2,3,3,4,4,8,8}
  fmt.Println("NON DUPLICATE NUMBER IS: ", singleNonDuplicate(nums))
}
