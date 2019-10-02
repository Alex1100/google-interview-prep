package main

import (
  "fmt"
)

/*
  Given a string containing digits from 2-9
  inclusive, return all possible letter
  combinations that the number could
  represent.

  A mapping of digit to letters
  (just like on the telephone buttons)
  is given below. Note that 1 does
  not map to any letters.
*/

func letterCombinations(digits string) []string {
  if len(digits) == 0 {
    return []string{}
  }

  // Establish mapping table
  lettermap := map[byte]string{
    1 : "*",
    2 : "abc",
    3 : "def",
    4 : "ghi",
    5 : "jkl",
    6 : "mno",
    7 : "pqrs",
    8 : "tuv",
    9 : "wxyz",
  }

  var ret []string = []string{""}

  //Traverse the input number
  for i := 0; i < len(digits); i++ {
    // recycle unused combinations
    for j := len(ret); j > 0; j--{
      for _, v1 := range lettermap[digits[i]-'0'] {
        // Because of the removal operation,
        // ret[0] is the first combination that is not used each time.
        ret = append(ret, ret[0] + string(v1))
      }
      // Remove the used combination (ie the first combination in ret)
      ret = append(ret[:0], ret[1:]...)
      }
    }

    return ret
}

func main() {
  fmt.Println(letterCombinations("23"))
  fmt.Println("\n\n", letterCombinations("3258"))
}
