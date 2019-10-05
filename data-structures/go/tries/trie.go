package tries

type TrieNode struct {
  Letter string
  Children map[string]*TrieNode
  IsWord bool
}

type Trie struct {
  Children map[string]*TrieNode
}

func (t *Trie) Insert(str string) {
  counter := len(str)
  firstLetter := string(str[0])
  isEnd := len(str) == 1
  str = str[1:]
  counter--
  if t.Chidlren[firstLetter] == nil {
    t.Children[firstLetter] = &TrieNode{
      Letter: firstLetter,
      Children: make(map[string]*TrieNode),
      IsWord: isEnd,
    }
  }

  curr := t.Children[firstLetter]
  currLetter := string(str[0])

  for counter > 0 {
    isEnd = counter == 1
    curr.Children[currLetter] = &TrieNode{
      Letter: currLetter,
      Children: make(map[string]*TrieNode),
      IsWord: isEnd,
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


func (t *Trie) HasWord(str string) bool {
  includes := false
  currLetter := string(str[0])
  counter := len(str)
  str = str[1:]
  counter--
  curr := t.Children[currLetter]
  if curr == nil {
    return includes
  }

  for counter > 0 && curr != nil {
    if curr != nil {
      currLetter = string(str[0])
      str = str[1:]
      curr = curr.Children[currLetter]

      if counter == 1 && curr != nil && curr.IsWord {
        includes = true
      }
    }

    counter--
  }

  return includes
}

func (t *Trie) Contains(str string) bool {
  includes := false
  currLetter := string(str[0])
  counter := len(str)
  str = str[1:]
  counter--
  curr := t.Children[currLetter]
  if curr == nil {
    return includes
  }

  if curr.Letter + str == curr.Letter {
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

// TODO
func (t *Trie) Search(str string) []string {
  result := make([]string, 0)
  return result
}
