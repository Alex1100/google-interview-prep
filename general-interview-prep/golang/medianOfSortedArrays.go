package main

import (
  "fmt"
  "math"
)

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	x, y := len(nums1), len(nums2)
	if x > y {
		return findMedianSortedArrays(nums2, nums1)
	}
	if y == 0 {
		return 0.0
	}

	// (x+y+1) is prepared for odd length arrays
	// [1, 2] & [4, 5, 6] => (3+2+1)/2 = 3
	// you can think there is a place holder on the shorter array
	// [1, 2, -]
	// [4, 5, 6]
	// that will make sure we can partition evenly on both left and right parts
	low, high, halfLen := 0, x, (x+y+1)/2
	for low <= high {
		partitionX := (low + high) / 2
		partitionY := halfLen - partitionX

		// edge cases
		maxLeftX, minRightX, maxLeftY, minRightY := math.MinInt64, math.MaxInt64, math.MinInt64, math.MaxInt64
		// has nums on nums left side
		if partitionX > 0 {
			maxLeftX = nums1[partitionX-1]
		}
		// has nums on the right side
		if partitionX < x {
			minRightX = nums1[partitionX]
		}
		if partitionY > 0 {
			maxLeftY = nums2[partitionY-1]
		}
		if partitionY < y {
			minRightY = nums2[partitionY]
		}

		if maxLeftX <= minRightY && maxLeftY <= minRightX {
			// check if length is odd or even
			if (x+y)&1 == 0 {
				return (math.Max(float64(maxLeftX), float64(maxLeftY)) + math.Min(float64(minRightX), float64(minRightY))) / 2
			}
			return math.Max(float64(maxLeftX), float64(maxLeftY))
		}
		if maxLeftX > minRightY {
			high = partitionX - 1
		} else {
			low = partitionX + 1
		}
	}

  return 0.0
}

func main() {
  arr1 := []int{1, 3, 8, 9, 15}
  arr2 := []int{7, 11, 18, 19, 21, 25}

  fmt.Println(findMedianSortedArrays(arr1, arr2))
}
