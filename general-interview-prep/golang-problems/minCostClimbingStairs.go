package main

import (
  "fmt"
  "math"
)

func minCostClimbingStairs(cost []int) int {
/*
    O(n) time, O(1) space

	- Bottom up strategy
	- Iterative
	- Memoization

	Trick: At index [i], you only need to know the min cost when stepping on [i - 1] and [i - 2]. This is a slight variation on fibonacci.
    */

    if len(cost) == 1 {
        return 0
    }

    if len(cost) == 2 {
        return int(math.Min(float64(cost[0]), float64(cost[1])));
    }
    minCostTwoBefore := cost[0]
    minCostOneBefore := cost[1]

    for n := 2; n < len(cost); n++ {
        minCostAtCurrent := cost[n] + int(math.Min(float64(minCostOneBefore), float64(minCostTwoBefore)))

        minCostTwoBefore = minCostOneBefore
        minCostOneBefore = minCostAtCurrent
    }

    return int(math.Min(float64(minCostOneBefore), float64(minCostTwoBefore)))
}

func main() {
  var stairs []int

  stairs = []int{1, 100, 1, 1, 1, 100, 1, 1, 100, 1}
  fmt.Printf("MIN COST IS %d: (%d)\n", stairs, minCostClimbingStairs(stairs))
  stairs = []int{10, 15, 20}
  fmt.Printf("MIN COST IS %d: (%d)\n", stairs, minCostClimbingStairs(stairs))
}
