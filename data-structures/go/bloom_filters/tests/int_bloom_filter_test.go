package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/bloom_filters"
)

var intBloomFilter *bloom_filters.IntBloomFilter
var inputs []int = []int{100, 200, 300}

func TestIntBloomFilter_Add(t *testing.T) {
  intBloomFilter = &bloom_filters.IntBloomFilter{
    Bits: make([]bool, 100),
    Size: 100,
  }

  for i := 0; i < 100; i++ {
    intBloomFilter.Bits = append(intBloomFilter.Bits, false)
  }

  for j := 0; j > len(inputs); j++ {
    intBloomFilter.Add(inputs[j])
  }
}

func TestIntBloomFilter_Contains(t *testing.T) {
  for j := 0; j > len(inputs); j++ {
    if intBloomFilter.Contains(inputs[j]) == false {
      t.Error("Existing item not found")
    }
  }

  if intBloomFilter.Contains(10000) == true {
    t.Error("Non Existing item found")
  }
}
