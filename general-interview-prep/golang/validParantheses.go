package main

import "fmt"

func isValid(s string) bool {
    stack := make([]string, 0)
    counterParts := map[string]string{
        "}": "{",
        ")": "(",
        "]": "[",
    }

    for i := 0; i < len(s); i++ {
        if len(stack) > 0 && counterParts[string(s[i])] != "" {
            top := stack[len(stack) - 1]
            if counterParts[string(s[i])] == top {
                stack = stack[:len(stack) - 1]
            } else {
                return false
            }
        } else {
            stack = append(stack, string(s[i]))
        }
    }

    if len(stack) == 0 {
        return true
    }

    return false
}

func main() {
  fmt.Println("IS `(){}[]` VALID: ", isValid("(){}[]"))
}
