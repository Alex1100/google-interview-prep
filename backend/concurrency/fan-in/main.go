package main

import (
  "fmt"
  "math/rand"
  "time"
)


// Channel directions
// ch chan <- int we are only writing
// to the channel
// ch <- chan int we are only reading
// from the channel
// ch chan int we are able to both
// read and write from and to the channel
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
    fmt.Printf("Channel %s -> %d\n", name, n)
    ch <- n
  }
}

func consumer(ch <- chan int, name string) {
  for n := range ch {
    fmt.Printf("<- %d\n", n)
  }
}

func fanIn(chA, chB <- chan int, chC chan <- int) {
  var n int
  for {
    select {
      case n = <- chA:
        chC <- n
      case n = <- chB:
        chC <- n
    }
  }
}

func main() {
  chA := make(chan int)
  chB := make(chan int)
  chC := make(chan int)

  go producer(chA, "A")
  go producer(chB, "B")
  go consumer(chC, "C")

  fanIn(chA, chB, chC)
}
