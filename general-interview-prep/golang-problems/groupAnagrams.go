package main

// brute force
// I would iterate through the list
// and sort each string

// that way I just iterate once more and finally keep track of the count
// or occurrence of each sorted string

// the time complexity would remain O(N Klog(K)) due to sorting
// where N is the length of the strs slice/array
// and K is the maximum length of a string in strs
// The outer loop has a complexity of O(N) as we iterate
// through each string. Then, we sort each string
// in O(K log K) time

// Space Complexity is: O(NK), the total information
// stored in our result slice

import (
  "fmt"
  "sort"
  "strings"
)

func groupAnagrams(strs []string) [][]string {
  result := make([][]string, 0)
  tracker := make(map[string][]string)

  for i := 0; i < len(strs); i++ {
    checkAnagram(strs[i], tracker)
  }

  for _, anagrams := range tracker {
    result = append(result, anagrams)
  }

  return result
}

func checkAnagram(str string, tracker map[string][]string) {
  originalStr := str
  splitStrings := strings.Split(str, "")
  sort.Strings(splitStrings)
  sortedStr := strings.Join(splitStrings, "")
  tracker[sortedStr] = append(tracker[sortedStr], originalStr)
  return
}


func main() {
  input := []string{"eat", "tea", "tan", "ate", "nat", "bat"}
  fmt.Printf("Grouped Anagrams from %s is \n\n%s\n", input, groupAnagrams(input))
}
