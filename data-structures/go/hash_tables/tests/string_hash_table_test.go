package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/hash_tables"
)

var stringHashTable *hash_tables.StringHashTable

func TestStringHashTable_Insert(t *testing.T) {
  stringHashTable = hash_tables.ConstructStringHashTable(10000)
  stringHashTable.Insert("input", "Twenty Two")

  if stringHashTable.Contains("input") == false {
    t.Error("Failed to insert item")
  }
}

func TestStringHashTable_Remove(t *testing.T) {
  removed, err := stringHashTable.Remove("input")

  if err != nil || removed.Val != "Twenty Two" || stringHashTable.Contains("input") == true {
    t.Error("Failed to remove item")
  }
}

func TestStringHashTable_Contains(t *testing.T) {
  stringHashTable.Insert("the_key", "Thirty Three")
  if stringHashTable.Contains("the_key") == false {
    t.Error("Failed to insert item")
  }
}
