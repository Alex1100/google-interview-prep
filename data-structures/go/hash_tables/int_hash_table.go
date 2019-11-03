package hash_tables

import (
  "errors"
  "math"
)

type IntLinkedList struct {
  Head *SinglyIntListNode
  Initialized bool
}

type SinglyIntListNode struct {
  Key string
  Val int
  Next *SinglyIntListNode
}

func ConstructIntLinkedList() *IntLinkedList {
  return &IntLinkedList{
    Head: &SinglyIntListNode{},
    Initialized: false,
  }
}

func (ln *IntLinkedList) AppendInt(key string, node int) {
  if ln.Initialized == false {
    ln.Head.Key = key
    ln.Head.Val = node
    ln.Initialized = true
  }

  if ln.Head.Key == key {
    ln.Head.Val = node
    return
  }

  if ln.Head == nil {
    ln.Head = &SinglyIntListNode{
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

    curr.Next = &SinglyIntListNode{
      Key: key,
      Val: node,
      Next: nil,
    }
  }
}

func (ln *IntLinkedList) DeleteInt(key string) *SinglyIntListNode {
  current := ln.Head
	prev := ln.Head
	var removed *SinglyIntListNode

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


func (ln *IntLinkedList) ContainsInt(key string) bool {
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



type IntHashTable struct {
  Storage []*IntLinkedList
  StorageLimit int
  Size int
}

func constructStorage(limit int) []*IntLinkedList {
  storage := make([]*IntLinkedList, 0)
  for i := 0; i < limit; i++ {
    storage = append(storage, ConstructIntLinkedList())
  }

  return storage
}

func ConstructIntHashTable(limit int) *IntHashTable {
  return &IntHashTable{
    Storage: constructStorage(limit),
    StorageLimit: limit,
    Size: 0,
  }
}

func (ht *IntHashTable) hashify(key string) int {
  var hash int

  for i := 0; i < len(key); i++ {
		hash = (hash << 5) + hash
		hash = hash + int(rune(string(key[i])[0])-'0')
		hash = hash & hash
		hash = int(math.Abs(float64(uint(hash) << uint(3))))
	}

  return hash % ht.StorageLimit
}

func (ht *IntHashTable) Shrink() *IntHashTable {
  return ht
}

func (ht *IntHashTable) Expand() *IntHashTable {
  return ht
}

func (ht *IntHashTable) Insert(key string, item int) {
  if float64(ht.Size) >= float64(ht.StorageLimit) * 0.65 {
    ht = ht.Expand()
  }

  idx := ht.hashify(key)
  ht.Storage[idx].AppendInt(key, item)
  ht.Size++
}

func (ht *IntHashTable) Remove(key string) (*SinglyIntListNode, error) {
  if float64(ht.Size) <= float64(ht.StorageLimit) * 0.3 {
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

func (ht *IntHashTable) Contains(key string) bool {
  idx := ht.hashify(key)
  if idx >= ht.StorageLimit {
    return false
  }

  return ht.Storage[idx].ContainsInt(key)
}
