package main

import (
  "fmt"
  "strconv"
  "sort"
)

func toChar(i int) string {
  return string(rune('a' + i))
}

func groupStrings(strings []string) [][]string {
  var k string
  r := make([][]string, 0)
  m := make(map[string][]string)
  charMap := make(map[string]int)
  count := 1

  for i := 0; i < 26; i++ {
    charMap[toChar(i)] = count
    count++
  }

  for i := 0; i < len(strings); i++ {
    k = ""
    s := string(strings[i])
    offset := charMap[string(s[0])] - charMap["a"];
    for j := 0; j < len(s); j++ {
      t := charMap[string(s[j])] - offset
      if t - charMap["a"] < 0 {
        k = k + strconv.Itoa(t + 26)
      } else {
        k = k + strconv.Itoa(t)
      }
      k += ","
    }

    m[k] = append(m[k], s)
  }

  for key, _ := range m {
    sort.Strings(m[key])
    r = append(r, m[key])
  }

  fmt.Println("R IS: ", r)
  return r
}

func main() {
  strings := []string{"abc","bcd","acef","xyz","az","ba","a","z"}
  fmt.Println("GROUPED STRINGS ARE: ", groupStrings(strings))
}
