package main

import "fmt"

func lengthOfLongestSubstring(s string) int {
    if len(s) == 0 {
        return 0
    }

    substringMap := make(map[byte]int)
    max := 0
    currentByte := 0

    for i := 0; i < len(s); i++ {
        if substringMap[s[i]] != 0 {
            if currentByte < substringMap[s[i]] {
                currentByte = substringMap[s[i]]
            }
        }

        substringMap[s[i]] = i+1;

        if (i - currentByte + 1)  > max {
            max = i - currentByte + 1
        }
    }

    return max;
}

func main() {
  s := "abcabcbb"
  fmt.Println("LENGTH OF lengthOfLongestSubstring: ", lengthOfLongestSubstring(s))
}
