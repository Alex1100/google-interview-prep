package main

import "fmt"

func maxProfit(prices []int) int {
    maxP := 0

    for i, element := range prices {
        if i < len(prices) - 1 {
            if prices[i + 1] > element {
                curr := i + 1
                for curr != len(prices) {
                    if prices[i] < prices[curr] && maxP < (prices[curr] - prices[i]) {
                        maxP = prices[curr] - prices[i]
                    }
                    curr++;
                }
            }
        }
    }


    fmt.Printf("`maxProfit.go`\nMax Profit is %d\n\n", maxP)
    return maxP
}

func main() {
  var stockWindow []int
  stockWindow = []int{7, 1, 5, 3, 6, 4}
  maxProfit(stockWindow)
}
