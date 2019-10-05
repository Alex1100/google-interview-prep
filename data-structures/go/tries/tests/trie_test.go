package tries

import (
  "testing"
  tries "google-interview-prep/data-structures/go/tries"
)

var trieInstance *tries.Trie

func TestTrie_Insert(t *testing.T) {
  trieInstance = &tries.Trie{
    Children: make(map[string]*tries.TrieNode),
  }

  trieInstance.Insert("apple")

  if trieInstance.Children["a"] == nil {
    t.Error("Item was not properly Inserted: ", trieInstance.Children["a"])
  }
  trieInstance.Insert("atom")
  if trieInstance.Children["a"].Children["t"] == nil {
    t.Error("Item was not properly Inserted: ", trieInstance.Children["a"].Children["t"])
  }

  isWord := trieInstance.Children["a"].Children["t"].Children["o"].Children["m"].IsWord

  if !isWord {
    t.Error("Item was not properly Inserted and end of word is not marked: ", isWord)
  }
}

func TestTrie_HasWord(t *testing.T) {
  included := trieInstance.HasWord("atom")
  if !included {
    t.Error("Item was not properly Inserted and can't be found: ", included)
  }
}

func TestTrie_Contains(t *testing.T) {
  contained := trieInstance.Contains("app")

  if !contained {
    t.Error("Item was not properly Inserted and can't be found: ", contained)
  }
}
