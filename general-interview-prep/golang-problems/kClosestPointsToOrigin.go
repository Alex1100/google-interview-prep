package main

import (
  "fmt"
  "sort"
)

// More efficient approach
func kClosest(points [][]int, K int) [][]int {
  n := len(points)
  vals := make([]int,n)
    for i := 0; i < n; i++ {
      vals[i]= retrieveVal(points[i])
    }

  sort.Ints(vals)
  distK := vals[K-1]

  ans := make([][]int,K)
  for i, t := 0, 0; i < n && t < K; i++ {
    if retrieveVal(points[i]) <= distK{
      ans[t] = points[i]
      t++
    }
  }

  return ans
}

func retrieveVal(point []int)int{
  return point[0]*point[0]+point[1]*point[1]
}


// Less efficient approach
func kClosest(points [][]int, K int) [][]int {
  //sorts the array in place
  sort.Slice(points, func(i, j int) bool {
    distanceFromOrigin1 := getDistanceFromOrigin(points[i])
    distanceFromOrigin2 := getDistanceFromOrigin(points[j])
    return distanceFromOrigin1 < distanceFromOrigin2
	})

  //returns first k elements
  return points[0:K];
}

func getDistanceFromOrigin(point []int) int {
  x := point[0]
  y := point[1]
  return (x*x) + (y*y);
}


func main() {
  points1 := [][]int{
    []int{1, 3},
    []int{-2, 2},
  }

  points2 := [][]int{
    []int{3, 3},
    []int{5, -1},
    []int{-2, 4},
  }

  fmt.Println("FIRST K NEIGHBORS FROM ORIGIN ARE: ", kClosest(points1, 1))
  fmt.Println("SECOND K NEIGHBORS FROM ORIGIN ARE: ", kClosest(points2, 2))
}
