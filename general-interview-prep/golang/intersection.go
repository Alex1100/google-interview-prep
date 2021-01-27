package main

import "fmt"

func intersection(nums1 []int, nums2 []int) []int {
    seen := map[int]bool{}
    result := []int{}

    for i := 0; i < len(nums2); i++ {
        seen[nums2[i]] = true
    }

    for j := 0; j < len(nums1); j++ {
        if seen[nums1[j]] {

            result = append(result, nums1[j])
            delete(seen, nums1[j])
        }
    }

    return result
}

func main() {
  fmt.Println(intersection([]int{1, 2, 3, 4, 5}, []int{2, 4}))
}
