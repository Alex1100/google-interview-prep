package main

import "fmt"

func shortestWay(source string, target string) int {
    if len(source) == 0 {
        return -1
    }
    sPointer := 0
    tPointer := 0
    counter := 0

    prevPointerT := 0

    for tPointer < len(target) {
        // iterate through target string
        if sPointer == 0 {
            counter++
        }
        if sPointer == len(source) - 1 {
            // if we reach the end of the source string
            // and the current character in target is equal
            // to the last character in the source string
            // increment targetPointer
            // otherwise we always set the source pointer to start back at
            // the beginning of the source string
            if target[tPointer] == source[sPointer] {
                tPointer++
            }
            sPointer = 0
        } else if target[tPointer] == source[sPointer] {
            // if the current character is not the last character in
            // the source string and both characters in source and target
            // at their respective indexes are equal
            // increment both pointers and move to the right
            sPointer++
            tPointer++
            prevPointerT = 0
        } else {
            // otherwise if characters are different and we are not at tht end of the source string
            // increment source
            // increment prevPointer for Target
            // if the prevPointer is equal to the length of the source string
            // return -1
            // because we have not seen characters which are not included in the source string
            // that is pretty much the only time we will need to increment the prevPointer
            // otherwise we shouldn't have the prevPointers value be >= to the len(sourceString)
            sPointer++
            prevPointerT++
            if prevPointerT == len(source) {
                return -1
            }
        }
    }
    return counter
}

func main() {
  fmt.Println(shortestWay("abc", "abcbc"))
  fmt.Println(shortestWay("abc", "acdbc"))
}
