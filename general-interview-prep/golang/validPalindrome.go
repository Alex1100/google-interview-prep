package main

// ValidPalindrome II

import (
  "fmt"
)

func validPalindrome(s string) bool {
    if len(s) < 2 {
        return true
    }

    n := len(s)
    for i := 0; i < (n / 2); i++ {
        if s[i] != s[n-1-i] {
            return isPalindrome(s[i:n-1-i]) || isPalindrome(s[i+1:n-i])
        }
    }

    return true
}

func isPalindrome(s string) bool {
	left, right := 0, len(s)-1
	for left < right {
		if s[left] != s[right] {
			return false
		}

		left++
		right--
	}

	return true
}


func main() {
  fmt.Println(validPalindrome("ara"))
}
