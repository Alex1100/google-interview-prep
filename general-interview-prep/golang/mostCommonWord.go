package main

import (
	"fmt"
	"strings"
	"unicode"
)

func contains(target string, slice []string) bool {
	if len(slice) == 0 || len(target) == 0 {
		return false
	}

	for _, str := range slice {
		if target == string(str) {
			return true
		}
	}

	return false
}

func stripPunctuation(word string) string {
	if contains(string(word[len(word)-1]), []string{"!", "?", "'", ",", ";", "."}) {
		return word[0 : len(word)-1]
	}

	return word
}

func mostCommonWord(paragraph string, banned []string) string {
	maxCount := 0
	paragraph = strings.ToLower(paragraph)

	f := func(c rune) bool {
		return !unicode.IsLetter(c) && !unicode.IsNumber(c)
	}
	wordList := strings.FieldsFunc(paragraph, f)

	mostCommonWord := wordList[0]
	wordCountMap := map[string]int{}
	for _, word := range wordList {
		stripped := stripPunctuation(strings.ToLower(string(word)))

		if contains(stripped, banned) {
			continue
		}

		wordCountMap[stripped]++
		if wordCountMap[stripped] > maxCount {
			maxCount = wordCountMap[stripped]
			mostCommonWord = stripped
		}
	}

	return mostCommonWord
}

func main() {
	fmt.Println(mostCommonWord("hit hit ball ball hit", []string{"hit"}))
}
