package main

import "fmt"

func isAlienSorted(words []string, order string) bool {
    var alpha = make(map[byte]int, len(order))
    for i := 0; i < len(order); i++ {
        alpha[order[i]] = i
    }
    for word := 0; word < len(words) - 1; word++ {
        for ch := 0; ch < len(words[word]) && ch < len(words[word+1]); ch++ {
            if alpha[words[word][ch]] < alpha[words[word+1][ch]] { break }
            if alpha[words[word][ch]] > alpha[words[word+1][ch]] { return false }
            if (ch == len(words[word]) - 1 || ch == len(words[word+1]) - 1) && len(words[word]) > len(words[word+1]) { return false }
        }
    }
    return true
}

func main() {
  fmt.Println(isAlienSorted([]string{"apple","app"}, "abcdefghijklmnopqrstuvwxyz"))
}
