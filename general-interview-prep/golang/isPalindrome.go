package main

import (
    "fmt"
    "strings"
)

// Suboptimal Way

func isPalindrome(s string) bool {
    if len(s) < 2 {
        return true
    }

    reversed := ""
    og := ""
    nonAlpha := map[string]int{
        ",": 1,
        "_": 1,
        " ": 1,
        ":": 1,
        "?": 1,
        "!": 1,
        ".": 1,
        "@": 1,
        "#": 1,
        "-": 1,
        "\\": 1,
        "'": 1,
        "\"": 1,
        ";": 1,
        "(": 1,
        ")": 1,
        "`": 1,
    }
    j := 0

    for i := len(s) - 1; i >= 0; i-- {
        lower := strings.ToLower(string(s[i]))
        if nonAlpha[lower] != 1 {
            reversed += lower
        }

        ogLower := strings.ToLower(string(s[j]))
        if nonAlpha[ogLower] != 1 {
            og += ogLower
        }

        j++
    }

    fmt.Println("REVERSED: ", reversed)
    fmt.Println("OG: ", og)

    if reversed == og {
        return true
    }

    return false
}

// Optimal Way

func isPalindrome(s string) bool {
	s = strings.ToLower(s)
	left, right := 0, len(s)-1
	for left < right {
		for left < right && !isChar(s[left]) {
			left++
		}
		for left < right && !isChar(s[right]) {
			right--
		}
		if s[left] != s[right] {
			return false
		}

		left++
		right--
	}

	return true
}

func isChar(c byte) bool {
	if ('a' <= c && c <= 'z') || ('0' <= c && c <= '9') {
		return true
	}
	return false
}


func main() {
  fmt.Println("IS PALINDROME: ", isPalindrome("abcddcba"))
}
