package main

import (
	"fmt"
)

type Trie struct {
	Children map[string]*TrieNode
}

type TrieNode struct {
	Letter   string
	Children map[string]*TrieNode
	IsWord   bool
}

/** Initialize your data structure here. */
func Constructor() Trie {
	instance := &Trie{
		Children: make(map[string]*TrieNode),
	}
	return *instance
}

/** Inserts a word into the trie. */
func (this *Trie) Insert(str string) {
	counter := len(str)
	firstLetter := string(str[0])
	isEnd := len(str) == 1
	str = str[1:]
	counter--
	if this.Children[firstLetter] == nil {
		this.Children[firstLetter] = &TrieNode{
			Letter:   firstLetter,
			Children: make(map[string]*TrieNode),
			IsWord:   isEnd,
		}
	}

	curr := this.Children[firstLetter]
	currLetter := string(str[0])

	for counter > 0 {
		isEnd = counter == 1
		curr.Children[currLetter] = &TrieNode{
			Letter:   currLetter,
			Children: make(map[string]*TrieNode),
			IsWord:   isEnd,
		}

		curr = curr.Children[currLetter]

		if len(str) > 1 {
			str = str[1:]
			currLetter = string(str[0])
		}
		counter--
	}

	return
}

func (this *Trie) Contains(str string) bool {
	includes := false
	currLetter := string(str[0])
	counter := len(str)
	str = str[1:]
	counter--
	curr := this.Children[currLetter]
	if curr == nil {
		return includes
	}

	if curr.Letter+str == curr.Letter {
		return true
	}

	for counter > 0 && curr != nil {
		if curr != nil {
			currLetter = string(str[0])
			str = str[1:]
			curr = curr.Children[currLetter]

			if counter == 1 && curr != nil {
				includes = true
			}
		}

		counter--
	}

	return includes
}

/** Returns if the word is in the trie. */
func (this *Trie) Search(str string) bool {
	includes := false
	currLetter := string(str[0])
	counter := len(str)
	str = str[1:]
	counter--
	curr := this.Children[currLetter]
	if curr == nil {
		return includes
	}

	if curr.Letter+str == curr.Letter {
		return true
	}

	for counter > 0 && curr != nil {
		if curr != nil {
			currLetter = string(str[0])
			str = str[1:]
			curr = curr.Children[currLetter]
			if counter == 1 && curr != nil && curr.IsWord == true {
				includes = true
			}
		}

		counter--
	}

	return includes
}

/** Returns if there is any word in the trie that starts with the given prefix. */
func (this *Trie) StartsWith(prefix string) bool {
	includes := false
	currLetter := string(prefix[0])
	counter := len(prefix)
	prefix = prefix[1:]
	counter--
	curr := this.Children[currLetter]
	if curr == nil {
		return includes
	}

	if curr.Letter+prefix == curr.Letter {
		return true
	}

	for counter > 0 && curr != nil {
		if curr != nil {
			currLetter = string(prefix[0])
			prefix = prefix[1:]
			curr = curr.Children[currLetter]
			if counter == 1 && curr != nil {
				includes = true
			}
		}

		counter--
	}

	return includes
}

// /**
//  * Your Trie object will be instantiated and called as such:
//  * obj := Constructor();
//  * obj.Insert(word);
//  * param_2 := obj.Search(word);
//  * param_3 := obj.StartsWith(prefix);
//  */

func main() {
	trie := Constructor()

	trie.Insert("apple")
	fmt.Println(trie.Search("apple"))   // returns true
	fmt.Println(trie.Search("app"))     // returns false
	fmt.Println(trie.StartsWith("app")) // returns true
	trie.Insert("app")
	fmt.Println(trie.Search("app")) // returns true
}
