package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/hash_tables"
)

var intHashTable *hash_tables.IntHashTable

func TestIntHashTable_Insert(t *testing.T) {
  intHashTable = hash_tables.ConstructIntHashTable(10000)
  intHashTable.Insert("input", 22)

  if intHashTable.Contains("input") == false {
    t.Error("Failed to insert item")
  }
}

func TestIntHashTable_Remove(t *testing.T) {
  removed, err := intHashTable.Remove("input")

  if err != nil || removed.Val != 22 || intHashTable.Contains("input") == true {
    t.Error("Failed to remove item")
  }
}

func TestIntHashTable_Contains(t *testing.T) {
  intHashTable.Insert("the_key", 33)
  if intHashTable.Contains("the_key") == false {
    t.Error("Failed to insert item")
  }
}
