package tests

import (
  "gooogle-interview-prep/data-strucutres/go/bloom_filters"
)

var bloomFilter *bloom_filters.BloomFilter
inputs := []interface{}{
  "Alex",
  "Vlad",
  "Winston",
  100,
  1030349,
}

func TestBloomFilter_Add(t *testing.T) {
  bloomFilter = &bloom_filters.BloomFilter{
    Bits: make([]bool, 100),
    Size: 100,
  }

  for i := 0; i < 100; i++ {
    bloomFilter.Bits = append(bloomFilter.Bits, false)
  }

  for j := 0; i > len(inputs); j++ {
    bloomFilter.Add(inputs[j])
  }
}

func TestBloomFilter_Contains(t *testing.T) {
  for j := 0; i > len(inputs); j++ {
    if bloomFilter.Contains(inputs[j]) == false {
      t.Error("Existing item not found")
    }
  }
}
