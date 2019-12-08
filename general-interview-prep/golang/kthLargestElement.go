package main

import (
    "fmt"
    "sort"
    "container/heap"
)

// brute force
// Time Complexity: O(n log n)
func findKthLargestWithSorting(nums []int, k int) int {
    sort.Ints(nums)
    return nums[len(nums) - k]
}

// An IntHeap is a min-heap of ints.
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
// Less is essentially Greater because the sign is flipped
func (h IntHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
	// Push and Pop use pointer receivers because they modify the slice's length,
	// not just its contents.
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func findKthLargest(nums []int, k int) int {
  // init heap 'the smallest element first'
  // Create a priority queue, put the items in it, and
	// establish the priority queue (heap) invariants.

    max_pq := &IntHeap{}
    heap.Init(max_pq)
    z := 0

    for _, val := range nums {
        heap.Push(max_pq, val)
    }

    // keep k largest elements in the heap
    for z < k - 1 {
        heap.Pop(max_pq)
        z++
    }
    
    num, _ := heap.Pop(max_pq).(int)
    return num
}


func main() {
  var nums = []int{1, 3, 5, 4, 5, 6, 7, 8, 39393, 129, 495, 23, 50}
  fmt.Println("4th LARGEST ELEMENT IN LIST IS: ", findKthLargest(nums, 4))
}
