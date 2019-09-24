package main

import (
  "fmt"
)


/*
 * More efficient way to solve it
 *
 */

func isIsomorphic(s string, t string) bool {
  a := makeCode(s)
  b := makeCode(t)
  for i := range a {
    if a[i] != b[i] {
        return false
    }
  }
  return true
}

func makeCode(str string) []rune {
  mp := make(map[rune]rune)
  cnt := 0
  code := make([]rune, 0, len(str))
  for _, ch := range str {
    num, ok := mp[ch]
    if ok {
      code = append(code, num)
    } else {
      cnt++
      num = rune(cnt)
      mp[ch] = num
      code = append(code, num)
    }
  }
  return code
}


/*
 * Another efficient approach
 *
 */

 func isIsomorphic(s string, t string) bool {
  if len(s)!= len(t) {
    return false
  }

  MapS:=make(map[byte]byte)
  MapT:=make(map[byte]byte)

  for i := range s {
    if valt,ok := MapS[s[i]];ok {
      if valt != t[i] {
        return false
      }
    } else {
      MapS[s[i]] = t[i]
    }

    if vals,ok := MapT[t[i]];ok {
      if vals != s[i] {
        return false
      }
    } else {
      MapT[t[i]] = s[i]
    }
  }

  return true
}


/*
 * Less efficient way to solve it
 *
 */

func isIsomorphic(s string, t string) bool {
    count1 := make([]int, 0)
    count2 := make([]int, 0)
    indexes1 := make(map[string][]int)
    indexes2 := make(map[string][]int)
    counter1 := make(map[string]int)
    counter2 := make(map[string]int)

    for i := 0; i < len(s); i++ {
        counter1[string(s[i])] = -1
        indexes1[string(s[i])] = append(indexes1[string(s[i])], i)
    }

    for j := 0; j < len(t); j++ {
        counter2[string(t[j])] = -1
        indexes2[string(t[j])] = append(indexes2[string(t[j])], j)
    }

    for z := 0; z < len(s); z++ {
        if counter1[string(s[z])] == -1 {
            counter1[string(s[z])] = 1
        } else {
            counter1[string(s[z])]++
        }
    }

    for x := 0; x < len(t); x++ {
        if counter2[string(t[x])] == -1 {
            counter2[string(t[x])] = 1
        } else {
            counter2[string(t[x])]++
        }
    }

    for c := 0; c < len(s); c++ {
        if counter1[string(s[c])] > 0 {
            count1 = append(count1, counter1[string(s[c])])
            counter1[string(s[c])] = 0
        }
    }

    for r := 0; r < len(t); r++ {
        if counter2[string(t[r])] > 0 {
            count2 = append(count2, counter2[string(t[r])])
            counter2[string(t[r])] = 0
        }
    }

    if len(count1) != len(count2) {
        return false
    }

    for v := 0; v < len(count1); v++ {
        if count1[v] != count2[v] {
            return false
        }
    }

    for m := 0; m < len(s); m++ {
        if sumUp(indexes1[string(s[m])]) != sumUp(indexes2[string(t[m])]) {
            return false
        }
    }

    return true
}

func sumUp(nums []int) int {
    sum := 0
    for _, num := range nums {
        sum += num
    }

    return sum
}


func main() {
  fmt.Println("isIsomorphic 'egg' & 'add' ? ", isIsomorphic("egg", "add"))
  fmt.Println("isIsomorphic 'foo' & 'bar' ? ", isIsomorphic("foo", "bar"))
  fmt.Println("isIsomorphic 'paper' & 'title' ? ", isIsomorphic("paper", "title"))
}
