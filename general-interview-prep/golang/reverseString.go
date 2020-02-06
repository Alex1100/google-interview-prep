package main

import "fmt"

func reverseString(s []byte) {
    left := 0
    right := len(s) - 1

    for left < right {
        temp := s[left]
        s[left] = s[right]
        s[right] = temp
        left++
        right--
    }
}

func main() {
  s := []byte{97, 98, 99}
  reverseString(s)
  fmt.Printf("abc <=> %s\n", s)
}
