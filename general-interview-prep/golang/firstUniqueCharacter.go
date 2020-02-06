package main

import "fmt"

func firstUniqChar(s string) int {
    charMap := make(map[string][]int)

    for index, character := range s {
        charMap[string(character)] = append(charMap[string(character)], index)
    }

    for i := 0; i < len(s); i++ {
        if len(charMap[string(s[i])]) == 1 {
            return i
        }
    }

    return -1
}


func main() {
  s := "loveleetcode"
  fmt.Println("FIRST UNIQUE CHAR INDEX IS: ", firstUniqChar(s))
}
