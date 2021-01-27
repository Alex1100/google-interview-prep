package main

import (
	"fmt"
)

func dietPlanPerformance(calories []int, k int, lower int, upper int) int {
	totalPoints := 0
	sum := 0
	for i := 0; i <= len(calories)-k; i++ {
		for j := i; j < i+k; j++ {
			sum = sum + calories[j]
		}

		if sum >= lower && sum > upper {
			totalPoints++
		} else if sum < lower {
			totalPoints--
		}

		sum = 0
	}

	return totalPoints
}

func main() {
	fmt.Println(dietPlanPerformance([]int{1, 2, 3, 4, 5}, 1, 3, 3))
}
