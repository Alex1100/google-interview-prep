package bloom_filters

import (
  "math"
  "strconv"
  "strings"
  "fmt"
)

type IntBloomFilter struct {
  Bits []bool
  Size int
}

const (
  secret1 = 294830
)

func (bf *IntBloomFilter) Hash32(x int, size int) int {
  hash := 0
  hash = x << 5
  hash = hash & hash
  hash = int(math.Abs(float64(hash >> secret1)))

  return (25 * hash + 13) % 31
}


func (bf *IntBloomFilter) Hash140(x int, size int) int {
  hash := 0
  hash = x << 5
  hash = hash & hash
  hash = int(math.Abs(float64(hash >> secret1)))

  return (109 * hash + 71) % 139
}

func (bf *IntBloomFilter) Hash500(x int, size int) int {
  hash := 0
  hash = x << 5
  hash = hash & hash
  hash = int(math.Abs(float64(hash >> secret1)))

  return (173 * hash + 149) % 499
}

func (bf *IntBloomFilter) Hash860(x int, size int) int {
  hash := 0
  hash = x << 5
  hash = hash & hash
  hash = int(math.Abs(float64(hash >> secret1)))

  return (677 * hash + 241) % 860
}

func (bf *IntBloomFilter) Hash998(x int, size int) int {
  hash := 0
  hash = x << 5
  hash = hash & hash
  hash = int(math.Abs(float64(hash >> secret1)))

  return (547 * hash + 383) % 997
}

func (bf *IntBloomFilter) ConvertToBinaryString(item int) string {
  converted := strconv.Itoa(item)
  output := ""
  for _, char := range strings.Split(converted, "") {
    letter := string(char)
    charCode := fmt.Sprintf("%s%b", letter, char)
    output += charCode
  }

  return output
}

func (bf *IntBloomFilter) Add(item int) {
  binaryRep, err := strconv.Atoi(bf.ConvertToBinaryString(item))
  if err != nil {
    return
  }
  bf.Bits[bf.Hash32(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash140(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash500(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash860(binaryRep, bf.Size) % bf.Size] = true
  bf.Bits[bf.Hash998(binaryRep, bf.Size) % bf.Size] = true
}

func (bf *IntBloomFilter) Contains(item int) bool {
  binaryRep, err := strconv.Atoi(bf.ConvertToBinaryString(item))
  if err != nil {
    return false
  }
  count := 0
  hashing_functions := []func(int, int) (int){
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
