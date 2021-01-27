package main

import (
	"fmt",
	"sort"
)


func contains(num int, arr []int) bool {
		for i := 0; i < len(arr); i++ {
				if arr[i] == num {
						return true
				}
		}
		
		return false
}
	
func relativeSortArray(arr1 []int, arr2 []int) []int {
		countMap := map[int]int{}
		result := make([]int, 0)
		end := make([]int, 0)

		for _, num := range arr1 {
				if contains(num, arr2) == true {
						countMap[num]++
				} else {
						end = append(end, num)
				}
		}
		
		for _, num := range arr2 {
				count := countMap[num]
				for i := 0; i < count; i++ {
						result = append(result, num)
				}
		}
		
		sort.Ints(end)
		result = append(result, end...)
		
		return result
}

func main() {
	fmt.Println(relativeSortArray([]int{1, 2, 3, 4}, []int{2, 3}))
}