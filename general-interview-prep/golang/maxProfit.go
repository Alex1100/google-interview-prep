package main

import (
  "fmt"
  "math"
)

// brute force
//
// func maxProfit(prices []int) int {
//     maxP := 0
//
//     for i, element := range prices {
//         if i < len(prices) - 1 {
//             if prices[i + 1] > element {
//                 curr := i + 1
//                 for curr != len(prices) {
//                     if prices[i] < prices[curr] && maxP < (prices[curr] - prices[i]) {
//                         maxP = prices[curr] - prices[i]
//                     }
//                     curr++;
//                 }
//             }
//         }
//     }
//
//
//     fmt.Printf("`maxProfit.go`\nMax Profit is %d\n\n", maxP)
//     return maxP
// }


// linear
func maxProfit(prices []int) int {
    minPrice := math.MaxInt64
    fmt.Println(minPrice)
    max := 0

    for i := 0; i < len(prices); i++ {
        if (prices[i] < minPrice) {
            minPrice = prices[i]
        } else if ((prices[i] - minPrice) > max) {
            max = prices[i] - minPrice
        }
    }

    return max
}

func main() {
  var stockWindow []int
  stockWindow = []int{7, 1, 5, 3, 6, 4}
  maxProfit(stockWindow)
}
