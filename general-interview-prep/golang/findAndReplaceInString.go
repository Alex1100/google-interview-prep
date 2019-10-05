package main

import (
  "fmt"
)

func findReplaceString(S string, indexes []int, sources []string, targets []string) string {
  //mp maps the index to a tuple of the soure and the target
  mp := make(map[int][2]string)

  // for each in index add it's source and target tuple to the map with it's value as the key
  for key, val := range indexes{
    add := [2]string {sources[key], targets[key]}
    mp[val]=add
  }

  //start at the back end of S
  for i := len(S) - 1; i >= 0; i-- {
    //return  the value in the map with key i
    if tuple, ok := mp[i]; ok{
      //grab the substring from S
      hold := S[i:(i + len(tuple[0]))]
      //if the substring is the source string replace it with the target from the tuple
      if hold == tuple[0]{
        S = S[:i] + tuple[1] + S[(i + len(tuple[0])):]
      }
    }
  }

  return S
}

func main() {
  indexes := []int{0, 2}
  sources := []string{"ab", "ec"}
  targets := []string{"eee", "ffff"}

  fmt.Println("abcd =>", findReplaceString("abcd", indexes, sources, targets))
}
