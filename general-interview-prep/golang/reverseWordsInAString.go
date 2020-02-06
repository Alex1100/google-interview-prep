package main

import (
  "fmt"
  "strings"
)

// Time: O(N)
// Space: O(N)
func reverseWords(s string) string {
    left, right := 0, len(s) - 1

    // remove leading spaces
    for left <= right && s[left] == ' ' {
        left += 1
    }

    // remove trailing spaces
    for left <= right && s[right] == ' ' {
        right -= 1
    }

    d, word := make([]string, 0), make([]string, 0)

    // push word by word in front of deque
    for left <= right {
        if s[left] == ' ' && len(word) != 0 {
            z := make([]string, 0)
            z = append(z, strings.Join(word, ""))
            z = append(z, d...)
            d = z
            word = make([]string, 0)
        } else if s[left] != ' ' {
            word = append(word, string(s[left]))
        }

        left += 1

    }
    x := make([]string, 0)
    x = append(x, strings.Join(word, ""))
    x = append(x, d[:len(d)]...)
    d = x

    return strings.Join(d, " ")
}

func main() {
  fmt.Printf("The Sky is Blue REVERSED IS: %s\n", reverseWords("The Sky is Blue"))
  fmt.Printf("   Hello  World!   is Blue REVERSED IS: %s\n", reverseWords("   Hello  World!  "))
}
