package main

import (
	"fmt"
)

func countCharacters(words []string, chars string) int {
	maxLength := 0
	for _, word := range words {
		characterCountMap := map[string]int{}
		for _, letter := range chars {
			characterCountMap[string(letter)]++
		}
		satisfactory := true
		for i, letter := range string(word) {
			if !satisfactory {
				continue
			}

			if characterCountMap[string(letter)] > 0 {
				characterCountMap[string(letter)]--
			} else {
				satisfactory = false
			}

			if i == len(string(word))-1 && satisfactory {
				maxLength += len(string(word))
			}
		}
	}

	return maxLength
}

func main() {
	fmt.Println(countCharacters([]string{"cat", "bt", "hat", "tree"}, "atach"))
	fmt.Println(countCharacters([]string{"hello", "world", "leetcode"}, "welldonehoneyr"))
}
