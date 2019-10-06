package main

import (
  "fmt"
)

func lucasoid(a, b, n int) int {
  if n == 0 {
    return a
  }

  if n == 1 {
    return b
  }
  return lucasoid(a, b, n - 1) + lucasoid(a, b, n - 2)
}

func main() {
  ch1 := make(chan int)
  ch2 := make(chan int)
  ch3 := make(chan int)

  go func() { ch1 <- lucasoid(0, 1, 20) }()
  go func() { ch2 <- lucasoid(0, 1, 20) }()
  go func() { ch3 <- lucasoid(0, 1, 20) }()

  select {
    case <- ch1:
      fmt.Printf("First finisher is %d\n", 1)
    case <- ch2:
      fmt.Printf("First finisher is %d\n", 2)
    case <- ch3:
      fmt.Printf("First finisher is %d\n", 3)
  }
}
