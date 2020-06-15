package main

import "fmt"

func wiggleSort(nums []int)  {
    // have two pointers
    // curr and next
    // and if the current index is even
    // we need it to be less than it's next
    // if the current index is odd
    // we need it to be greater than the next

    // swap as needed

    //return nothing at the end


    current := 0
    next := 1
    if len(nums) < 2 {
        return
    }

    for next != len(nums) {
        // if current index is even
        if current % 2 == 0 {
            if nums[current] > nums[next] {
                swap(current, next, nums)
            }
        } else if current % 2 != 0 {
            // if it is odd
            if nums[current] < nums[next] {
                swap(current, next, nums)
            }
        }

        current++
        next++
    }

    return
}

func swap(a, b int, arr []int) {
    temp := arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}

func main() {
  fmt.Println(wiggleSort([]int{3, 5, 2, 1, 6, 4})) // [3, 5, 1, 6, 2, 4]
}
