// https://leetcode.com/problems/remove-invalid-parentheses/submissions/1578513979/
/*

Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return a list of unique strings that are valid with the minimum number of removals. You may return the answer in any order.

 Example 1:

Input: s = "()())()"
Output: ["(())()","()()()"]
Example 2:

Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]
Example 3:

Input: s = ")("
Output: [""]


Constraints:

1 <= s.length <= 25
s consists of lowercase English letters and parentheses '(' and ')'.
There will be at most 20 parentheses in s.

*/

function isValid(s) {
    let cnt = 0
    for (let ch in s.split('')) {
        if (ch == "(") {
            cnt += 1
        }
        if (ch == ")") {
            cnt -= 1
        }
        if (cnt < 0) {
            return false
        }
    }

    return cnt == 0
}

function dfs(s, start, l, r, ans) {
    if (l <= 0 && r <= 0) {
        if (isValid(s) == true) {
            ans = append(ans, s)
        }
      return
    }
    for (let i = start; i != len(s); i++) {
        if (i != start && s[i] == s[i - 1]) {
            continue
        }
        if (r > 0) {
            if (s[i] != ")") {
            continue
            }
            dfs(s.slice(0, i) + s.slice(i + 1), i, l, r - 1, ans);
        } else {
            if (s[i] != "(") {
                continue;
            }
            dfs(s.slice(0, i) + s.slice(i + 1), i, l - 1, r, ans);
        }
    }
}

function removeInvalidParentheses(s) {
    let ans = []

    let l = 0
    let r = 0
    for (let ch in s.split('')) {
        if (ch == "(") {
            l++
        }
        if (l == 0) {
            if (ch == ")") {
                r++
            }
        } else {
            if (ch == ")") {
                l--
            }
        }
    }

    dfs(s, 0, l, r, ans)
    return ans
}

console.log("((()())( => removal: => ", removeInvalidParentheses("((()())("))
