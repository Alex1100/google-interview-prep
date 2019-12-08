package main

import "fmt"

func lengthOfLongestSubstring(s string) int {
    if len(s) == 0 {
        return 0
    }

    substringMap := make(map[byte]int)
    max := 0
    p1 := 0

    for i := 0; i < len(s); i++ {
        if substringMap[s[i]] != 0 {
            if p1 < substringMap[s[i]] {
                p1 = substringMap[s[i]]
            }
        }

        substringMap[s[i]] = i+1;

        if (i - p1 + 1)  > max {
            max = i - p1 + 1
        }
    }

    return max;
}

func main() {
  s := "abcabcbb"
  fmt.Println("LENGTH OF lengthOfLongestSubstring: ", lengthOfLongestSubstring(s))
}
