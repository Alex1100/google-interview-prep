package main

import "fmt"

func isSubsequence(s string, t string) bool {
  tmp := []byte(s)
	count := 0

	for i, v := range []byte(t) {
        if count == len(tmp) {
			return true
		}

		if v == tmp[count] {
			count++
		}
	}

	return len(tmp) == count
}


func main() {
  s := "abc"
  t := "akdbeiwc"
  fmt.Println(isSubsequence(s, t))
}
