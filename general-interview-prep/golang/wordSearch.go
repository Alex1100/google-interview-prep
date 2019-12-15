package main

import (
    "strconv"
    "fmt"
)

func backtrack(board [][]byte, row, col int, word, accumulatedWord string, visited map[string]bool, exists bool) bool {
    // as long as length of accumulatedWord is less than the target
    // word, than we continue to recurse
    // keep track of visited indexes in a map

    // once the length is matching we check to see if they are equal
    // or if we run out of all possible eight directions and they're not
    // matching current string character needed at the current index
    // we return false
    currentString := strconv.Itoa(row) + "," + strconv.Itoa(col)
    visited[currentString] = true

    if len(accumulatedWord) != len(word) {
        // left
        leftString := strconv.Itoa(row) + "," + strconv.Itoa(col - 1)
        rightString := strconv.Itoa(row) + "," + strconv.Itoa(col + 1)
        topString := strconv.Itoa(row - 1) + "," + strconv.Itoa(col)
        bottomString := strconv.Itoa(row + 1) + "," + strconv.Itoa(col)


        if col - 1 >= 0 && !visited[leftString] {
            exists = backtrack(board, row, col - 1, word, accumulatedWord + string(board[row][col - 1]), visited, exists)
        }

        if exists {
            return true
        }

        // right
        if col + 1 < len(board[row]) && !visited[rightString] {
            exists = backtrack(board, row, col + 1, word, accumulatedWord + string(board[row][col + 1]), visited, exists)
        }

        if exists {
            return true
        }

        // top
        if row - 1 >= 0 && !visited[topString] {
            exists = backtrack(board, row - 1, col, word, accumulatedWord + string(board[row - 1][col]), visited, exists)
        }

        if exists {
            return true
        }

        // bottom
        if row + 1 < len(board) && !visited[bottomString] {
            exists = backtrack(board, row + 1, col, word, accumulatedWord + string(board[row + 1][col]), visited, exists)
        }

        if exists {
            return true
        }


    } else if len(accumulatedWord) == len(word) {
        if accumulatedWord == word {
            return true
        }
    }

    visited[currentString] = false

    return false
}


func exist(board [][]byte, word string) bool {
    if len(word) == 0 {
        return false
    }

    visited := make(map[string]bool)
    start := string(word[0])

    for i := 0; i < len(board); i++ {
        for j := 0; j < len(board[i]); j++ {
            current := "INITIAL" + strconv.Itoa(i) + "," + strconv.Itoa(j)
            if string(board[i][j]) == start && !visited[current] {
                if backtrack(board, i, j, word, string(board[i][j]), visited, false) {
                    return true
                }
                visited[current] = true
            }
        }
    }

    return false
}


func main() {
  var board = [][]byte{
    []byte{98,97,97,98,97,98},
    []byte{97,98,97,97,97,97},
    []byte{97,98,97,97,97,98},
    []byte{97,98,97,98,98,97},
    []byte{97,97,98,98,97,98},
    []byte{97,97,98,98,98,97},
    []byte{97,97,98,97,97,98},
  }


  fmt.Println("WORD EXISTS: ", exist(board, "aabbbbabbaababaaaabababbaaba"))
}
