According to the Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

Any live cell with fewer than two live neighbors dies, as if caused by under-population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by over-population..
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
Write a function to compute the next state (after one update) of the board given its current state. The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously.

Example:

Input:
[
  [0,1,0],
  [0,0,1],
  [1,1,1],
  [0,0,0]
]
Output:
[
  [0,0,0],
  [1,0,1],
  [0,1,1],
  [0,1,0]
]
Follow up:

Could you solve it in-place? Remember that the board needs to be updated at the same time: You cannot update some cells first and then use their updated values to update other cells.
In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches the border of the array. How would you address these problems?

func gameOfLife(board [][]int)  {
    if len(board) == 0 {
        return
    }

    boardCopy := make([][]int, len(board))

    for i := 0; i < len(board); i++ {
        arr := make([]int, len(board[0]))
        copy(arr, board[i])
        boardCopy[i] = arr
    }

    for i := 0; i < len(board); i++ {
        for j := 0; j < len(board[i]); j++ {
            neighbors := [][]int{
                []int{-1, -1},
                []int{-1, 0},
                []int{-1, 1},
                []int{0, -1},
                []int{0, 1},
                []int{1, -1},
                []int{1, 0},
                []int{1, 1},
            }
            // check left diagonal
            // dead count
            deadCount := 0
            // live count
            liveCount := 0
            for _, neighbor := range neighbors {
                x := i + neighbor[0]
                y := j + neighbor[1]
                // left diagonal

                if x >= 0 && y >= 0 && x < len(board) && y < len(board[0]) {
                    cell := board[x][y]

                    // rule 1
                    if cell == 1 {
                        liveCount++
                    } else {
                        deadCount++
                    }
                }
            }

            // rule 1 && rule 3
            if (liveCount < 2 || liveCount > 3) && board[i][j] == 1 {
                boardCopy[i][j] = 0
            } else if liveCount == 3 && board[i][j] == 0 {
                boardCopy[i][j] = 1
            }
        }
    }

    copy(board[:], boardCopy)
}
