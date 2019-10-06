package main

import (
  "fmt"
  "net/http"
  "sync"
)

func startWorking(in <- chan string, wg *sync.WaitGroup) {
  for {
    url := <- in
    res, err := http.Get(url)
    if err != nil {
      fmt.Println(err.Error())
    } else {
      fmt.Printf("GET %s: %d\n", url, res.StatusCode)
    }

    wg.Done()
  }
}

// Example of a Round-Robbin approach to
// dealing with concurrency and go routines
func main() {
  work := make(chan string, 1024)
  numWorkers := 10
  var wg sync.WaitGroup

  for i := 0; i < numWorkers; i++ {
    go startWorking(work, &wg)
  }

  urls := [6]string{"https://alex1100.software", "https://www.github.com/alex1100", "https://google.com", "https://youtube.com", "https://www.linkedin.com/in/alex1100", "https://toptal.com"}

  for i := 0; i < numWorkers; i++ {
    for _, url := range urls {
      wg.Add(1)
      work <- url
    }
  }

  wg.Wait()
}
