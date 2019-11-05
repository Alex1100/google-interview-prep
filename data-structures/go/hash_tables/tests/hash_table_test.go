package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/hash_tables"
)

var interfaceHashTable *hash_tables.IntHashTable

func TestInterfaceHashTable_Insert(t *testing.T) {
  interfaceHashTable = hash_tables.ConstructIntHashTable(10000)
  interfaceHashTable.Insert("input", 22)

  if interfaceHashTable.Contains("input") == false {
    t.Error("Failed to insert item")
  }
}

func TestInterfaceHashTable_Remove(t *testing.T) {
  removed, err := interfaceHashTable.Remove("input")

  if err != nil || removed.Val != 22 || interfaceHashTable.Contains("input") == true {
    t.Error("Failed to remove item")
  }
}

func TestInterfaceHashTable_Contains(t *testing.T) {
  interfaceHashTable.Insert("the_key", 33)
  if interfaceHashTable.Contains("the_key") == false {
    t.Error("Failed to insert item")
  }
}
