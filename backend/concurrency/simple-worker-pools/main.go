package main

import (
  "fmt"
  "math/rand"
  "time"
)

// This pattern is great
// for concurrent proccessing of
// incoming network/http traffic

// Think of the worker as a cashier
// in a store/bank w/e
func echoWorker(in, out chan int) {
  for {
    n := <- in
    time.Sleep(time.Duration(rand.Intn(500)) * time.Millisecond)

    out <- n
  }
}

func produce(ch chan <- int) {
  i := 0
  for {
    fmt.Printf("-> Send job: %d\n", i)
    ch <- i
    i++
  }
}

func consume(out <- chan int) {
  for n := range out {
    fmt.Printf("<- Received job: %d\n", n)
  }
}

func main() {
  in := make(chan int)
  out := make(chan int)

  // make 100,000 workers
  // in our worker pool
  for i := 0; i < 100000; i++ {
    go echoWorker(in, out)
  }

  go produce(in)
  consume(out)
}
