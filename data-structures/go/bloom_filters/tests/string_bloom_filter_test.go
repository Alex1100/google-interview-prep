package tests

import (
  "testing"
  "google-interview-prep/data-structures/go/bloom_filters"
)

var stringBloomFilter *bloom_filters.StringBloomFilter
var data []string = []string{"100", "200", "300"}

func TestStringBloomFilter_Add(t *testing.T) {
  stringBloomFilter = &bloom_filters.StringBloomFilter{
    Bits: make([]bool, 100),
    Size: 100,
  }

  for i := 0; i < 100; i++ {
    stringBloomFilter.Bits = append(stringBloomFilter.Bits, false)
  }

  for j := 0; j > len(data); j++ {
    stringBloomFilter.Add(data[j])
  }
}

func TestStringBloomFilter_Contains(t *testing.T) {
  for j := 0; j > len(data); j++ {
    if stringBloomFilter.Contains(data[j]) == false {
      t.Error("Existing item not found")
    }
  }

  if stringBloomFilter.Contains("10000") == true {
    t.Error("Non Existing item found")
  }
}
