package main

import (
  "fmt"
  "sort"
)



// Linear
func intersectLinear(nums1 []int, nums2 []int) []int {
	m := make(map[int]int)
	for _, n := range nums1 {
		if count, ok := m[n]; !ok {
			m[n] = 1
		} else {
			m[n] = count + 1
		}
	}

	var res []int
	for _, n := range nums2 {
		if count, ok := m[n]; ok && count > 0 {
			res = append(res, n)
			m[n] = count - 1
		}
	}
	return res
}


/*
  If arrays are sorted, we can use binary search method.
  Iterate through nums1, then find lower bound
  in nums2 that is equal or larger than nums1[i]
  and if lower bound value is equal to nums1[i],
  then we can add that to a result.
  Whenever we find one, we can discard the lower bound.
*/

func intersectWithBinarySearch(nums1 []int, nums2 []int) []int {
	sort.Ints(nums1)
	sort.Ints(nums2)

	var res []int
	for _, n := range nums1 {
		if index := find(nums2, n); index >= 0 && index < len(nums2) && nums2[index] == n {
			res = append(res, n)
			nums2 = nums2[index+1:]
		}
	}
	return res
}

// Binary Search
func find(nums []int, n int) int {
	left, right := 0, len(nums)-1
	var mid int
	for left < right {
		mid = left + (right-left)/2
		switch {
		case nums[mid] >= n:
			right = mid
		case nums[mid] < n:
			left = mid + 1
		}
	}
	return right
}


// Brute Force
func indexOfInt(collection []int, item int) int {
    for i, el := range collection {
        if el == item {
            return i
        }
    }

    return -1
}

func contains(collection []int, item int) bool {
    for _, el := range collection {
        if el == item {
            return true
        }
    }

    return false
}

func sliceOff(collection []int, index int) []int {
  if index == 0 {
      collection = collection[1:]
  } else if index > 0 && index != len(collection) - 1 {
      temp := collection[index + 1:]
      collection = collection[0:index]
      collection = append(collection, temp...)
  } else {
      collection = collection[0:len(collection) - 1]
  }

  return collection
}

func intersect(nums1 []int, nums2 []int) []int {
    result := make([]int, 0)

    for _, num2 := range nums2 {
        if contains(nums1, num2) {
            result = append(result, num2)
            index := indexOfInt(nums1, num2)
            nums1 = sliceOff(nums1, index)
        }
    }

    return result
}

func main() {
  var arr1, arr2, arr3, arr4 []int

  arr1 = []int{1, 3, 8, 1}
  arr2 = []int{8, 4, 2, 8}
  arr3 = []int{1, 2, 2, 1}
  arr4 = []int{2, 4, 2, 8}
  fmt.Println("Intersection of arr1 and arr2 is ", intersect(arr1, arr2))
  fmt.Println("Intersection of arr1 and arr2 is ", intersect(arr3, arr4))
}
