package main

import (
  "fmt"
  "math"
)

func reverse(x int) int {
  if x > math.MaxInt32 {
    return 0
  }
  multiplier := 1
  if x < 0 {
    multiplier = -1
    x = x * -1
  }
  new_int := 0
  for x > 0 {
    remainder := x % 10
    new_int *= 10
    new_int += remainder
    x /= 10
  }

  if new_int * multiplier > math.MaxInt32 || new_int * multiplier < math.MinInt32 {
    return 0
  }

  return new_int * multiplier
}

func main() {
  fmt.Println("signed int32 reverse of 321 is ", reverse(321))
  fmt.Println("signed int32 reverse of 1029320230230320 is ", reverse(1029320230230320))
  fmt.Println("signed int32 reverse of -194923023349923 is ", reverse(-194923023349923))
}
