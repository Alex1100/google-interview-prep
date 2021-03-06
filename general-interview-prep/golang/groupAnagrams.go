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

// ALSO BRUTE FORCE
func groupAnagrams(strs []string) [][]string {
    result := [][]string{}
    seen := map[string]bool{}
    seenStrings := map[string][]string{}

    for _, word := range strs {
        wordStr := strings.Split(string(word), "")
        sort.Strings(wordStr)
        joined := strings.Join(wordStr, "")

        if seen[joined] == false {
            seen[joined] = true
            seenStrings[joined] = []string{string(word)}
        } else {
            seenStrings[joined] = append(seenStrings[joined], string(word))
        }
    }

    for _, val := range seenStrings {
        result = append(result, val)
    }

    return result
}


func groupAnagrams2(strs []string) [][]string {
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


/*
  Optimal Solution

  No sorting needed so we remove the log(K) time complexity

  Time: O(NK)
  Space: O(NK)
*/

func groupAnagramsOptimal(strs []string) [][]string {
  result := make([][]string, 0)

  if len(strs) == 0 {
    return result
  }

  tracker := make(map[string][]string)

  for _, s := range strs {
    count := make([]int, 26)
    for _, char := range s {
      count[char - 'a']++
    }

    sb := ""
    for i := 0; i < 26; i++ {
      sb += "#"
      sb += string(count[i])
    }

    tracker[sb] = append(tracker[sb], s)
  }

  for _, val := range tracker {
    result = append(result, val)
  }

  return result
}


func main() {
  input := []string{"eat", "tea", "tan", "ate", "nat", "bat"}
  fmt.Printf("Grouped Anagrams from %s is \n\n%s\n", input, groupAnagrams(input))
  fmt.Printf("Grouped Anagrams from %s is \n\n%s\n", input, groupAnagramsOptimal(input))
}
