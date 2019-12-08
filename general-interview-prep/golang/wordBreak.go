package main

import "fmt"

func wordBreak(s string, wordDict []string) bool {
    wordDictSet := make(map[string]bool)
    visited := make([]int, len(s))
    for i := 0; i < len(wordDict); i++ {
        wordDictSet[wordDict[i]] = true
        visited = append(visited, 0)
    }

    queue := make([]int, 0)
    queue = append(queue, 0)

    for len(queue) != 0 {
        start := queue[0]
        queue = queue[1:]
        if visited[start] == 0 {
            for end := start + 1; end <= len(s); end++ {
                if wordDictSet[s[start:end]] {
                    queue = append(queue, end)
                    if end == len(s) {
                        return true
                    }
                }
            }
            visited[start] = 1
        }
    }
    return false;
}

func main() {
  s := "leetcode"
  z := "catsandog"
  wordDict1 := []string{"leet", "code"}
  wordDict2 := []string{"cats", "dog", "sand", "and", "cat"}
  fmt.Println("CAN IT BE SPLIT: ", wordBreak(s, wordDict1))
  fmt.Println("CAN IT BE SPLIT: ", wordBreak(z, wordDict2))
}
