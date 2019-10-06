package main

import (
  "fmt"
  "math/rand"
  "time"
)

func process2(ch chan int) {
  n := rand.Intn(10000)
  time.Sleep(time.Duration(n) * time.Millisecond)
  ch <- n
}

func process3() int {
  n := rand.Intn(10000)
  time.Sleep(time.Duration(n) * time.Millisecond)
  return n
}

func main() {
  ch := make(chan int)
  go process2(ch)
  go process2(ch)
  x := process3()
  fmt.Println("BLOCKING PROCESS FINALLY FINISHED: ", x)
  fmt.Println("WAITING FROM PROCESS...")
  n := <- ch
  fmt.Printf("PROCESS TOOK %dms\n", n)
  z := <- ch
  fmt.Printf("PROCESS TOOK %dms\n", z)
}
