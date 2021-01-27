package main

import "fmt"

func isValid(s string) bool {
    cnt := 0
    for _, ch := range s {
        if string(ch) == "(" {
            cnt += 1
        }
        if string(ch) == ")" {
            cnt -= 1
        }
        if cnt < 0 {
            return false
        }
    }

    return cnt == 0
}

func dfs(s string, start, l, r int, ans *[]string) {
    if l <= 0 && r <= 0 {
        if isValid(s) == true {
            *ans = append(*ans, s)
        }
      return
    }
    for i := start; i != len(s); i++ {
        if i != start && s[i] == s[i - 1] {
            continue
        }
        if r > 0 {
            if string(s[i]) != ")" {
            continue
            }
            dfs(s[0:i] + s[i + 1:], i, l, r - 1, ans);
        } else {
            if string(s[i]) != "(" {
                continue;
            }
            dfs(s[0:i] + s[i + 1:], i, l - 1, r, ans);
        }
    }
}

func removeInvalidParentheses(s string) []string {
    ans := []string{}

    l := 0
    r := 0
    for _, ch := range s {
        if string(ch) == "(" {
            l++
        }
        if l == 0 {
            if string(ch) == ")" {
                r++
            }
        } else {
            if string(ch) == ")" {
                l--
            }
        }
    }

    dfs(s, 0, l, r, &ans)
    return ans
}

func main() {
  fmt.Println("((()())( => removal: => ", removeInvalidParentheses("((()())("))
}
