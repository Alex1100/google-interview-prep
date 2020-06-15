package main

import (
    "fmt"
    "bytes"
    "strconv"
)

func findMissingRanges(nums []int, lower int, upper int) []string {
   	// lower and upper are inclusive, so lower - 1, upper + 1
	prev := lower - 1
	numbers := append(nums, upper + 1)
	var result []string

	for i := 0; i < len(numbers); i++ {
		num := numbers[i]
		diff := num - prev
		if diff == 2 {
			str := strconv.Itoa(prev + 1)
			result = append(result, str)
		} else if diff > 2 {
			var buf bytes.Buffer
			buf.WriteString(strconv.Itoa(prev + 1))
			buf.WriteString("->")
			buf.WriteString(strconv.Itoa(num - 1))
			result = append(result, buf.String())
		}
		prev = num
	}

	return result
}

func main() {
  fmt.Println(findMissingRanges([]int{1, 3, 5, 7}, 1, 9))
}
