package main

// Given an array of integers with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.
//
// Note:
// The array size can be very large. Solution that uses too much extra space will not pass the judge.
//
// Example:
//
// int[] nums = new int[] {1,2,3,3,3};
// Solution solution = new Solution(nums);
//
// // pick(3) should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
// solution.pick(3);
//
// // pick(1) should return 0. Since in the array only nums[0] is equal to 1.
// solution.pick(1);

// https://www.geeksforgeeks.org/reservoir-sampling/

import (
  "fmt"
  "math/rand"
)

type Solution struct {
    numz []int
}


func Constructor(nums []int) Solution {
    return Solution{nums}
}


func (this *Solution) Pick(target int) int {
    total := 0
    res := -1
    for i:=0; i <len(this.numz); i++ {
        if this.numz[i] == target {
            total++
            if rand.Intn(total) == 0 {
                res = i
            }

        }
    }
    return res
}

func main() {
  arr := []int{1,2,3,3,3};
  fmt.Println(Constructor().Pick(arr))
}
