package hash_tables

import (
  "errors"
  "math"
)

type StringLinkedList struct {
  Head *SinglyStringListNode
  Initialized bool
}

type SinglyStringListNode struct {
  Key string
  Val string
  Next *SinglyStringListNode
}

func ConstructStringLinkedList() *StringLinkedList {
  return &StringLinkedList{
    Head: &SinglyStringListNode{},
    Initialized: false,
  }
}

func (ln *StringLinkedList) AppendInt(key string, node string) {
  if ln.Initialized == false {
    ln.Head.Key = key
    ln.Head.Val = node
    ln.Initialized = true
  } else if ln.Head.Key == key {
    ln.Head.Val = node
  } else if ln.Head == nil {
    ln.Head = &SinglyStringListNode{
      Key: key,
      Val: node,
      Next: nil,
    }
  } else {
    curr := ln.Head
    if curr.Key == key {
      curr.Val = node
      return
    }

    for curr.Next != nil {
      curr = curr.Next
    }

    curr.Next = &SinglyStringListNode{
      Key: key,
      Val: node,
      Next: nil,
    }
  }
}

func (ln *StringLinkedList) DeleteInt(key string) *SinglyStringListNode {
  current := ln.Head
	prev := ln.Head
	var removed *SinglyStringListNode

  if current.Key == key && current.Next != nil {
		ln.Head = current.Next
		ln.Head.Next = current.Next.Next
		return current
	} else if current.Key == key && current.Next == nil {
		ln.Head = nil
		return prev
	} else {
		for current.Next != nil {
			prev = current
			current = current.Next
			if current.Key == key {
				prev.Next = current.Next
				removed = current
				return removed
			}
		}

		return removed
	}
}


func (ln *StringLinkedList) ContainsInt(key string) bool {
  if ln == nil {
    return false
  }

  curr := ln.Head
  contained := false

  for curr != nil {
    if curr.Key == key {
      contained = true
      return contained
    } else {
      curr = curr.Next
    }
  }

  return contained
}



type StringHashTable struct {
  Storage []*StringLinkedList
  StorageLimit int
  Size int
}

func constructStringStorage(limit int) []*StringLinkedList {
  storage := make([]*StringLinkedList, 0)
  for i := 0; i < limit; i++ {
    storage = append(storage, ConstructStringLinkedList())
  }

  return storage
}

func ConstructStringHashTable(limit int) *StringHashTable {
  return &StringHashTable{
    Storage: constructStringStorage(limit),
    StorageLimit: limit,
    Size: 0,
  }
}

func (ht *StringHashTable) hashify(key string) int {
  var hash int

  for i := 0; i < len(key); i++ {
		hash = (hash << 5) + hash
		hash = hash + int(rune(string(key[i])[0])-'0')
		hash = hash & hash
		hash = int(math.Abs(float64(uint(hash) << uint(3))))
	}

  return hash % ht.StorageLimit
}

func (ht *StringHashTable) Shrink() *StringHashTable {
  return ht
}

func (ht *StringHashTable) Expand() *StringHashTable {
  return ht
}

func (ht *StringHashTable) Insert(key string, item string) {
  if float64(ht.Size) >= float64(ht.StorageLimit) * 0.65 {
    ht = ht.Expand()
  }

  idx := ht.hashify(key)
  ht.Storage[idx].AppendInt(key, item)
  ht.Size++
}

func (ht *StringHashTable) Remove(key string) (*SinglyStringListNode, error) {
  if float64(ht.Size) > float64(ht.StorageLimit) * 0.25 && float64(ht.Size) <= float64(ht.StorageLimit) * 0.3 {
    ht = ht.Shrink()
  }

  idx := ht.hashify(key)
  if idx >= ht.StorageLimit {
    return nil, errors.New("Key does not exist")
  }

  removed := ht.Storage[idx].DeleteInt(key)
  ht.Size--
  return removed, nil
}

func (ht *StringHashTable) Contains(key string) bool {
  idx := ht.hashify(key)
  if (idx >= ht.StorageLimit) == true {
    return false
  }

  return ht.Storage[idx].ContainsInt(key)
}
