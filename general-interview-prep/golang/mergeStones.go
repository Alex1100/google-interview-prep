package main

import "fmt"


// this only works if we have an upper Bound on
// the length of stones and the upper bound on K
func mergeStones(stones []int, K int) int {
  // initial size of length of however many stones
	size := len(stones)

  // if the size - 1 % K - 1 != 0 return -1 because K isn't big enough
	if (size-1)%(K-1) != 0 {
		return -1
	}

  // make an int array with length of 31
	sum := [31]int{}

  // set next of sum with current of sum + current of stones
	for i := 0; i < size; i++ {
		sum[i+1] = sum[i] + stones[i]
	}

  // create dynamic programming table
  // with length of 31
  // and each array has 31 integers within it
	dp := [31][31]int{}


  // keep increasing width or K until it
  // is greater than the initial size of the stones
  // slice/array
	for width := K; width <= size; width++ {
    // keep increasing l while l + width(K) is not greater than size
    // of original stones slice/array
		for l := 0; l+width <= size; l++ {
			r := l + width - 1
			dp[l][r] = 1 << 32
			for m := l; m < r; m += K - 1 {
				dp[l][r] = min(dp[l][r], dp[l][m]+dp[m+1][r])
			}
			if (r-l)%(K-1) == 0 {
				dp[l][r] += sum[r+1] - sum[l]
			}
		}
	}

	return dp[0][size-1]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}


func main() {

}
