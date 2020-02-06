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


func efficientSingleNonDuplicate(nums []int) int {   
    if len(nums) == 1 {
        return nums[0]
    }

    for i := 1; i < len(nums) - 1; i++ {
        prev := nums[i - 1]
        current := nums[i]
        next := nums[i + 1]

        if current != next && current != prev {
            return current
        }
    }

    if nums[0] != nums[1] {
        return nums[0]
    }

    return nums[len(nums) - 1]
}

func main() {
  var nums = []int{1,1,2,3,3,4,4,8,8}
  fmt.Println("NON DUPLICATE NUMBER IS: ", singleNonDuplicate(nums))
}
