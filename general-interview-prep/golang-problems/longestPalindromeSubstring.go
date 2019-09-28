package main

import (
  "math"
  "fmt"
  "strings"
)



/*
 * Another variant of the manacherPalindromicSubstring
 * Implementation (fastest and most optimal)
 *
 * Time: O(n)
 * Space: O(n)
 */


 func optimalManacherPalindromicSubstring(s string) string {
 	s = getModifiedString(s)
 	l := len(s)
  P := make([]int, l)
 	// P is the maximum radius that can be expanded
  // at the current position.
  // Example a#b#a The p value at position b is 2

 	c, r, maxLen, mirror, index := 0, 0, 0, 0, 0
 	for i:=0; i<l; i++ {
 		// Determine whether the maximum palindrome
    // length of the mirror exceeds the
    // maximum left boundary at this time.
 		// If not, take the value of the mirror directly
    // otherwise take the maximum right border
    // - the current position value,
    // and then continue to expand
    // to the two sides with i as the center.

 		if i < r {
      mirror = (2 * c) - i
 			if P[mirror] > r-i {
 				P[i] = r - i
 			} else {
 				//get mirror index of i
 				P[i] = P[mirror]
 			}
 		}
 		// i Position expands to both sides
 		a := i + (1 + P[i])
 		b := i - (1 + P[i])
 		for a < l && b >= 0 && s[a] == s[b] {
 			P[i]++
 			a++
 			b--
 		}
 		//check if the expanded palindrome at i
    // is expanding beyond the right boundary
    // of current longest palindrome at center c
 		// if it is, the new center is i
 		if i + P[i] > r {
 			c = i
 			r = i + P[i]

 			if P[i] > maxLen { // update maxLen
 				maxLen = P[i]
 				index = i
 			}
 		}
 	}
 	temp := strings.Split(s[index-maxLen:index+maxLen], "#")
 	return strings.Join(temp, "")
 }

 // ## of this step is a character that cannot appear in the original string.
 func getModifiedString(s string) string {
 	t := strings.Split(s, "")
 	r := strings.Join(t, "#")
 	r = "#"+r+"#"
 	return r
 }


/*
 * Time: O(n)
 * Space: O(n)
 *
 * Most optimal solution
 *
 * Manacher's Longest Palindromic Substring
 * url: https://www.youtube.com/watch?v=nbTSfrEfo6M
 *
 *
 */


func manacherPalindromicSubstring(s string) string {
  if len(s) <= 1 {
     return s
  }
  maxLen := 0
  centerIndex := 0
  moddedString := "$"
  for i := 0; i < len(s); i++ {
    moddedString +=  "#" + string(s[i])
  }
  moddedString += "#@"
  palindromeLengths := make([]int, len(moddedString))
  center := 0
  rightBoundary := 0

  for j := 1; j < len(moddedString) - 1; j++ {
    mirr := 2 * center - j
    if j < rightBoundary {
      palindromeLengths[j] = int(math.Min(float64(rightBoundary - j), float64(palindromeLengths[mirr])))
    }

    for moddedString[j + (1 + palindromeLengths[j])] == moddedString[j - (1 + palindromeLengths[j])] {
      palindromeLengths[j]++

      if (j + palindromeLengths[j] > rightBoundary) {
        center = j
        rightBoundary = j + palindromeLengths[j]
      }
    }

    if maxLen < palindromeLengths[j] {
      maxLen = palindromeLengths[j]
      centerIndex = j
    }
  }


  // Construct the palindrome from the center
  // and expand outwards until the length satisfies
  // longest known palindrome length
  result := string(moddedString[centerIndex])
  if result == "#" {
     result = ""
  }
  maxLen--
  l := centerIndex - 1
  r := centerIndex + 1
  for maxLen > 0 {
    if string(moddedString[l]) != "#" {
      result = string(moddedString[l]) + result
      maxLen--
      l--
    } else {
      l--
    }

    if string(moddedString[r]) != "#" {
      result = result + string(moddedString[r])
      maxLen--
      r++
    } else {
      r++
    }
  }

  return result
}

/*
 * Time: O(n^2)
 * Since expanding a palindrome around its center could take O(n) time,
 * the overall complexity is O(n^2)
 *
 * Space: O(1)
 *
 */

func longestPalindrome1(s string) string {
    start := 0
    end := 0
    num := 0;
    maxSubstr := ""
    for i := 0; i < len(s); i++ {
        num = int(math.Max(expandAroundCenter(s, i, i), expandAroundCenter(s, i, i + 1)));

        if (num > end - start) {
            start = i - int(math.Floor(float64((num - 1) / 2)));
            end = i + int(math.Floor(float64(num / 2)));
        }

        if len(maxSubstr) < len(string(s[start:end + 1])) {
            maxSubstr = string(s[start:end + 1])
        }
      }

    return maxSubstr
};

func expandAroundCenter(s string, left, right int) float64 {
    l := left
    r := right
    for l >= 0 && r < len(s) && s[l] == s[r] {
        l--
        r++
     }

    return float64(r - l - 1);
}

// Easier to understand for second the best optimal solution
func longestPalindrome2(str string) string {
	var max string
	for i := 0; i < len(str); i++ {
		expand(i, i, str, &max)
		expand(i, i+1, str, &max)
	}
	return max
}

func expand(left, right int, s string, max *string) {
	for left >= 0 && right < len(s) && s[left] == s[right] {
		if len(*max) < right-left+1 {
			*max = s[left : right+1]
		}
		left--
		right++
	}
}

func main() {
  fmt.Printf("Optimal Manacher Longest Palindrome Substring in 'abababa' is %s\n", optimalManacherPalindromicSubstring("abababa"))
  fmt.Printf("Manacher Longest Palindrome Substring in 'abababa' is %s\n", manacherPalindromicSubstring("abababa"))
  fmt.Printf("Longest Palindrome1 Substring in 'abababa' is %s\n", longestPalindrome1("abababa"))
  fmt.Printf("Longest Palindrome2 Substring in 'abababa' is %s\n", longestPalindrome2("abababa"))
  fmt.Printf("Optimal Manacher Longest Palindrome Substring in 'babad' is %s\n", optimalManacherPalindromicSubstring("babad"))
  fmt.Printf("Manacher Longest Palindrome Substring in 'babad' is %s\n", manacherPalindromicSubstring("babad"))
  fmt.Printf("Longest Palindrome1 Substring in 'babad' is %s\n", longestPalindrome1("babad"))
  fmt.Printf("Longest Palindrome2 Substring in 'babad' is %s\n", longestPalindrome2("babad"))

}
