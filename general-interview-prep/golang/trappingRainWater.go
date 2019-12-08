package main

import "fmt"

func trap(height []int) int {
    leftMost := 0
    rightMost := 0
    left := 0
    right := len(height) - 1
    trappedWater := 0

    for left < right {
        if height[left] < height[right] {
            if height[left] < leftMost {
                trappedWater = trappedWater + leftMost - height[left]
            } else {
                leftMost = height[left]
            }
            left++
        } else {
            if height[right] < rightMost {
                trappedWater = trappedWater + rightMost - height[right]
            } else {
                rightMost = height[right]
            }
            right--
        }
    }

    return trappedWater
}


func main() {
  var elevatedMap = []int{0,1,0,2,1,0,1,3,2,1,2,1}

  fmt.Println("TRAPPED WATER: ", trap(elevatedMap))
}
