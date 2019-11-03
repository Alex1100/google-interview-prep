package hash_tables

import (
  "math"
  "google-interview-prep/data-structures/go/linked_lists"
)

type IntHashTable struct {
  Storage []*linked_lists.SinglyIntListNode
  StorageLimit int
  Size int
}

func constructStorage(limit int) []*linked_lists.SinglyIntListNode {
  storage := make([]*linked_lists.SinglyIntListNode, 0)
  for i := 0; i < limit; i++ {
    storage = append(storage, nil)
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

func (ht *IntHashTable) hashify(item int) int {
  hash = key << 5
  hash = hash & hash
  hash = int(math.Abs(float64(hash) >> float64(123456)))

  return hash % ht.StorageLimit
}

func (ht *IntHashTable) Shrink() *IntHashTable {
  return ht
}

func (ht *IntHashTable) Expand() *IntHashTable {
  return ht
}

func (ht *IntHashTable) Insert(item int) {
  if float64(ht.Size) >= float64(ht.StorageLimit) * 0.65 {
    ht = ht.Expand()
  }

  idx := hashify(item)
  
  if ht.Storage[idx] == nil {
    ht.Storage[idx].Val = item
  } else {
    ht.Storage[idx].AppendInt(item)
  }
}

func (ht *IntHashTable) Remove(item int) (int, error) {
  if float64(ht.Size) <= float64(ht.StorageLimit) * 0.25 {
    ht = ht.Shrink()
  }


}

func (ht *IntHashTable) Contains(item int) bool {
  idx := ht.hashify(item)
  if ht.Storage[idx] != nil {
    return ht.Storage[idx].ContainsInt(item)
  }

  return false
}
