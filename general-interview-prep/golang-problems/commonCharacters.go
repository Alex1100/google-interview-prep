package main

import (
  "fmt"
)

func commonChars(A []string) []string {
    cnt := [26]int{}
	for i := range cnt {
		cnt[i] = math.MaxUint16
	}

	cntInWord := [26]int{}
	for _, word := range A {
		for _, char := range []byte(word) {
            // compiler trick - here we will not allocate new memory
			cntInWord[char - 'a']++
		}

		for i := 0; i < 26; i++ {
			if cntInWord[i] < cnt[i] {
				cnt[i] = cntInWord[i]
			}
		}

		for i := range cntInWord {
			cntInWord[i] = 0
		}
	}

	result := make([]string, 0)
	for i := 0; i < 26; i++ {
		for j := 0; j < cnt[i]; j++ {
			result = append(result, string(i + 'a'))
		}
	}

	return result
}


func main() {
  var words []string
  words = []string{"bella", "label", "roller"}
  fmt.Println(commonChars(words))
}
