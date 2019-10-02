package main

import "fmt"

func areSentencesSimilar(words1 []string, words2 []string, pairs [][]string) bool {
    if len(words1) != len(words2) {
        return false;
    }

    for i := 0; i < len(words1); i++ {
        w1 := string(words1[i])
        w2 := string(words2[i])

        if w1 != w2 {
            found := false
            for _, pair := range pairs {
                if w1 == string(pair[0]) && w2 == string(pair[1]) || w1 == string(pair[1]) && w2 == string(pair[0]) {
                        found = true
                    }
            }

            if !found {
                return false
            }
        }
    }

    return true
}

func main() {
  fmt.Println(areSentencesSimilar([]string{"great", "acting", "skills"}, []string{"fine", "drama", "talent"}, [][]string{[]string{"great", "fine"}, []string{"drama", "acting"}, []string{"skills", "talent"}}))
}
