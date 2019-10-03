package main

import "fmt"

type Trie struct {
	IsWord   bool
	Children map[string]*Trie
	Word     string
}

func findWords(board [][]byte, words []string) []string {
	if len(board) == 0 || len(board[0]) == 0 {
		return []string{}
	}

    trie := newTrieTreeNode()
    trie.buildTrieTree(words)
	m := make(map[string]bool)

    for i := 0; i < len(board); i++ {
		for j := 0; j < len(board[0]); j++ {
			checkNeighbors(i, j, board, trie, m)
		}
	}

	result := make([]string, len(m))
	idx := 0
	for k := range m {
		result[idx] = k
		idx++
	}
	return result
}

func checkNeighbors(i int, j int, board [][]byte, trie *Trie, m map[string]bool) {
	if i < 0 || i >= len(board) || j < 0 || j >= len(board[0]) || board[i][j] == '!' {
		return
	}

    originalChar := board[i][j]
	char := string(originalChar)
	if trie.Children[char] == nil {
		return
	}

	if trie.Children[char].IsWord {
		m[trie.Children[char].Word] = true
	}

	board[i][j] = '!'
	checkNeighbors(i+1, j, board, trie.Children[char], m)
	checkNeighbors(i-1, j, board, trie.Children[char], m)
	checkNeighbors(i, j+1, board, trie.Children[char], m)
	checkNeighbors(i, j-1, board, trie.Children[char], m)
	board[i][j] = originalChar
}

func newTrieTreeNode() *Trie {
	return &Trie{
		IsWord:   false,
		Children: make(map[string]*Trie),
	}
}

func (t *Trie) buildTrieTree(words []string) *Trie {
	for _, word := range words {
		cur := t

		for i := 0; i < len(word); i++ {
			c := string(word[i])
			if cur.Children[c] == nil {
				cur.Children[c] = newTrieTreeNode()
			}

			cur = cur.Children[c]
		}

		cur.IsWord = true
		cur.Word = word
	}

	return t
}

func main() {
  board := [][]byte{
    []byte{'o', 'a', 'a', 'n'},
    []byte{'e', 't', 'a', 'e'},
    []byte{'i', 'h', 'k', 'r'},
    []byte{'i', 'f', 'l', 'v'},
  }
  words := []string{"oath", "pea", "eat", "rain"}

  board2 := [][]byte{
    []byte{'a', 'a'},
  }
  words2 := []string{"aaa"}

  board3 := [][]byte{
    []byte{'a', 'b'},
    []byte{'c', 'd'},
  }
  words3 := []string{"ab","cb","ad","bd","ac","ca","da","bc","db","adcb","dabc","abb","acb"}

  fmt.Printf("BOARD IS: %s \n\nWORDS IN THE BOARD: %s ARE: \n\n%s\n\n", board, words, findWords(board, words))
  fmt.Printf("BOARD IS: %s \n\nWORDS IN THE BOARD: %s ARE: \n\n%s\n\n", board2, words2, findWords(board2, words2))
  fmt.Printf("BOARD IS: %s \n\nWORDS IN THE BOARD: %s ARE: \n\n%s\n\n", board3, words3, findWords(board3, words3))
}
