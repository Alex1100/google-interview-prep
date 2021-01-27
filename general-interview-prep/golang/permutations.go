package main

import "fmt"

func permute(nums []int) [][]int {
    retSlice := [][]int{}
    permuteDo(nums, 0, len(nums) - 1, &retSlice)
    return retSlice
}

func permuteDo(nums []int, start, end int, retSlice *[][]int)  {
    if start == end {
        copyNums := []int{}
        copyNums = append(copyNums, nums...)
        *retSlice = append(*retSlice, copyNums)
        return
    } else {
        for i := start; i <= end; i++ {
            nums[i], nums[start] = nums[start], nums[i]
            permuteDo(nums, start+1, end, retSlice)
            nums[i], nums[start] = nums[start], nums[i]

        }
    }

}

func main() {
  fmt.Println("permutations: ", permute([]int{1, 2, 3}))
}
