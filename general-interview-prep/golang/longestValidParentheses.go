package main

import "fmt"

func longestValidParentheses(s string) int {
    left := 0
    right := 0
    maxlength := 0
    for i := 0; i < len(s); i++ {
        if s[i] == '(' {
            left++
        } else {
            right++
        }

        if left == right {
            maxlength = int(math.Max(float64(maxlength), 2.0 * float64(right)))
        } else if right >= left {
            left = 0
            right = 0
        }
    }
    left = 0
    right = 0
    for i := len(s) - 1; i >= 0; i-- {
        if s[i] == '(' {
            left++
        } else {
            right++
        }

        if left == right {
            maxlength = int(math.Max(float64(maxlength), 2.0 * float64(left)))
        } else if left >= right {
            left = 0
            right = 0
        }
    }
    return maxlength;
}

func main() {
  fmt.Println(longestValidParentheses("((())()((())))"))
}
