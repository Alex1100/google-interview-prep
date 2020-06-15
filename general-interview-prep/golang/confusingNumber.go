package main

import (
    "fmt"
    "strconv"
)

// Given a number N, return true if and only if it is a confusing number, which satisfies the following condition:
//
// We can rotate digits by 180 degrees to form new digits. When 0, 1, 6, 8, 9 are rotated 180 degrees, they become 0, 1, 9, 8, 6 respectively. When 2, 3, 4, 5 and 7 are rotated 180 degrees, they become invalid. A confusing number is a number that when rotated 180 degrees becomes a different number with each digit valid.

func confusingNumber(N int) bool {
    rotationMap := map[string]string{
        "6": "9",
        "9": "6",
        "8": "8",
        "1": "1",
        "0": "0",
    }

    str := strconv.Itoa(N)

    tempStr := ""

    for i := len(str) - 1; i >= 0; i-- {
        character := string(str[i])
        temp := character

        if rotationMap[temp] != "" {
            temp = rotationMap[temp]
        } else {
            return false
        }

        if (len(tempStr) > 0 && (string(tempStr[0]) == "0" && temp != "0" || string(tempStr[0]) != "0")) || temp != "0" {
            tempStr += temp
        }
    }

    if tempStr != str && len(tempStr) != 0 {
        return true
    }
    return false
}

func main() {
  fmt.Println(confusingNumber(69)) // true
  fmt.Println(confusingNumber(25)) // false
}
