package main

import "fmt"

func backtrack(s string, result []string, n, left, right int) []string {
    if len(s) >= 2*n {
        result = append(result, s)
        return result
    }

    if left < n {
        result = backtrack(s + "(", result, n, left + 1, right)
    }

    if left > right {
        result = backtrack(s + ")", result, n, left, right + 1)
    }

    return result
}

func generateParenthesis(n int) []string {
    result := make([]string, 0)
    s := ""

    return backtrack(s, result, n,  0, 0)
}



/*
 * another option

     func backtrack (ans []string, cur string, open, closed, max int) []string {
        if len(cur) == (max * 2) {
            ans = append(ans, cur);
            return ans;
        }

        if open < max {
            ans = backtrack(ans, cur + "(", open + 1, closed, max)
        }

        if closed < open {
            ans = backtrack(ans, cur + ")", open, closed + 1, max)
        }

        return ans
    }

    func generateParenthesis(n int) []string {
        ans := make([]string, 0)
        return backtrack(ans, "", 0, 0, n)
    }
 */

func main() {
  fmt.Println(generateParenthesis(3))
  fmt.Println("\n\n", generateParenthesis(4))
  fmt.Println("\n\n", generateParenthesis(5))
}
