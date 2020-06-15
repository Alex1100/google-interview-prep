package main

import "fmt"

func isStrobogrammatic(num string) bool {
    length := len(num);
    for i := 0; i < length; i++ {
        switch num[i] - 48 {
            case 2, 3, 4, 5, 7:
                return false;
            case 6:
                if '9' != num[length - 1 - i] {
                    return false;
                }
                break;
            case 9:
                if  '6' != num[length - 1 - i] {
                    return false;
                }
                break;
            case 1, 8, 0:
                if num[i] != num[length - 1 - i] {
                    return false;
                }
                break;
        }
    }
    return true;
}

func main() {
  fmt.Println(isStrobogrammatic("12345"))
}
