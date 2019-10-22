package bloom_filters

import (
  "math"
  "strings"
  "fmt"
)

type StringBloomFilter struct {
  Bits []bool
  Size int
}

const (
  secret2 = 294830
)

func (bf *StringBloomFilter) Hash32(x string, size int) int {
  hash := 0
  for _, r := range x {
    hash = (hash << 5) + hash + int(r - '0')
    hash = hash & hash
    hash = int(math.Abs(float64(hash << secret2)))
  }

  return (25 * hash + 13) % 31
}


func (bf *StringBloomFilter) Hash140(x string, size int) int {
  hash := 0
  for _, r := range x {
    hash = (hash << 5) + hash + int(r - '0')
    hash = hash & hash
    hash = int(math.Abs(float64(hash << secret2)))
  }

  return (109 * hash + 71) % 139
}

func (bf *StringBloomFilter) Hash500(x string, size int) int {
  hash := 0

  for _, r := range x {
    hash = (hash << 5) + hash + int(r - '0')
    hash = hash & hash
    hash = int(math.Abs(float64(hash << secret2)))
  }

  return (173 * hash + 149) % 499
}

func (bf *StringBloomFilter) Hash860(x string, size int) int {
  hash := 0

  for _, r := range x {
    hash = (hash << 5) + hash + int(r - '0')
    hash = hash & hash
    hash = int(math.Abs(float64(hash << secret2)))
  }

  return (677 * hash + 241) % 859
}

func (bf *StringBloomFilter) Hash998(x string, size int) int {
  hash := 0
  for _, r := range x {
    hash = (hash << 5) + hash + int(r - '0')
    hash = hash & hash
    hash = int(math.Abs(float64(hash << secret2)))
  }

  return (547 * hash + 383) % 997
}

func (bf *StringBloomFilter) ConvertToBinaryString(item string) string {
  output := ""
  for _, char := range strings.Split(item, "") {
    letter := string(char)
    charCode := fmt.Sprintf("%s%b", letter, char)
    output += charCode
  }

  return output
}

func (bf *StringBloomFilter) Add(item string) {
  binaryRep := bf.ConvertToBinaryString(item)
  bf.Bits[bf.Hash32(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash140(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash500(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash860(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash998(binaryRep, bf.Size) % bf.Size] = true
}

func (bf *StringBloomFilter) Contains(item string) bool {
  binaryRep := bf.ConvertToBinaryString(item)
  count := 0
  hashing_functions := []func(string, int) (int){
    bf.Hash32,
    bf.Hash140,
    bf.Hash500,
    bf.Hash860,
    bf.Hash998,
  }

  for count < len(hashing_functions) {
    if bf.Bits[hashing_functions[count](binaryRep, bf.Size)] != true {
      return false
    }

    count++
  }

  return true
}
