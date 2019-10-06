package main

import (
  "fmt"
  "math/rand"
  "time"
)

func sleep() {
  // sleep for 0 - 3 seconds
  time.Sleep(time.Duration(rand.Intn(3000)) * time.Millisecond)
}

func producer(ch chan <- int, name string) {
  for {
    // sleep some random time
    sleep()

    // generate a random number
    n := rand.Intn(100)

    // send the message
    fmt.Printf("Producer %s -> %d\n", name, n)
    ch <- n
  }
}

func consumer(ch <- chan int, name string) {
  for n := range ch {
    fmt.Printf("Consumer %s <- %d\n", name, n)
  }
}


// When fanning out data
// make sure to partition the data
// according to some relevant
// business logic, aka
// by regions, date, or
// some other heuristic
func fanOut(chA <- chan int, chB, chC chan <- int) {
  for n := range chA {
    if n < 50 {
      chB <- n
    } else {
      chC <- n
    }
  }
}

func main() {
  chA := make(chan int)
  chB := make(chan int)
  chC := make(chan int)

  go producer(chA, "A")
  go consumer(chB, "B")
  go consumer(chC, "C")

  fanOut(chA, chB, chC)
}
