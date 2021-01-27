package main

import "fmt"

func permuteUnique(nums []int) [][]int {
    retSlice := [][]int{}
    restMap := map[string][][]int{}
    permuteDo(nums, 0, len(nums) - 1, &retSlice, restMap)
    return retSlice
}

func permuteDo(nums []int, start, end int, retSlice *[][]int, restMap map[string][][]int)  {
    if start == end {
        copyNums := []int{}
        copyNums = append(copyNums, nums...)
        key := ""
        for i := 0; i < len(nums); i++ {
            key += string(nums[i])
        }
        restMap[key] = append(restMap[key], nums)
        if len(restMap[key]) == 1 {
            *retSlice = append(*retSlice, copyNums)
        }
        return
    } else {
        for i := start; i <= end; i++ {
            nums[i], nums[start] = nums[start], nums[i]
            permuteDo(nums, start+1, end, retSlice, restMap)
            nums[i], nums[start] = nums[start], nums[i]

        }
    }

}

func main() {
  fmt.Println("PERMUTE: ", permuteUnique([]int{1, 2, 3, 4}))
}
