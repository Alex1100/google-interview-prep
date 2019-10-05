package main

import (
  "strconv"
  "strings"
  "fmt"
)

func nextClosestTime(time string) string {
  hours, err := strconv.Atoi(time[:2])

  if err != nil {
    return "00:00"
  }

  minutes, err := strconv.Atoi(time[3:])
  if err != nil {
    return "00:00"
  }

  cur := 60 * hours
  cur += minutes
  allowed := make(map[int]int)

  for _, c := range strings.Split(time, "") {
    if c != ":" {
      allowed[int([]byte(c)[0] - '0')] = 1
    }
  }

  for (true) {
    cur = (cur + 1) % (24 * 60);
    digits := []int{cur / 60 / 10, cur / 60 % 10, cur % 60 / 10, cur % 60 % 10}
    search := true

    for search {
      for _, d := range digits {
        if allowed[d] != 1 {
          search = false
          break
        }
      }

      if search {
        return fmt.Sprintf("%02d:%02d", cur / 60, cur % 60)
      }
    }
  }

  return "00:00"
}

func main() {
  fmt.Println(nextClosestTime("19:34"))
  fmt.Println(nextClosestTime("23:59"))
  fmt.Println(nextClosestTime("00:12"))
}
