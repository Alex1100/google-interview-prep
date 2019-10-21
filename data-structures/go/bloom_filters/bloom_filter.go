package bloom_filters

import (
  "math"
  "reflect"
)

type BloomFilter struct {
  Bits []bool
  Size int
}

func (m map[string]interface{}) StringifyJSON() (string, error) {
  mData, err := json.Marshal(m)
  if err != nil {
      return "", err.Error()
  }

  jsonStr := string(mData)
  return jsonStr, nil
}

func (m map[int]interface{}) StringifyJSON() (string, error) {
  mData, err := json.Marshal(m)
  if err != nil {
      return "", err.Error()
  }

  jsonStr := string(mData)
  return jsonStr, nil
}

func (bf *BloomFilter) Hash32(x interface{}, size int) int {
  hash := 0
  inputType := reflect.ValueOf(x)
  if inputType.Type() == reflect.String {
    for _, r := range hash {
      hash = (hash << 5) + hash + int(r - '0')
      hash = hash & hash
      hash = math.Abs(hash << "secret")
    }
  } else if inputType.Type() == reflect.Int {
    hash = x << 5
    hash = hash & hash
    hash = math.Abs(hash >> "secret")
  }

  return (25 * hash + 13) % 31
}


func (bf *BloomFilter) Hash140(x interface{}, size int) int {
  hash := 0
  inputType := reflect.ValueOf(x)
  if inputType.Type() == reflect.String {
    for _, r := range hash {
      hash = (hash << 5) + hash + int(r - '0')
      hash = hash & hash
      hash = math.Abs(hash << "secret")
    }
  } else if inputType.Type() == reflect.Int {
    hash = x << 5
    hash = hash & hash
    hash = math.Abs(hash >> "secret")
  }

  return (109 * hash + 71) % 139
}

func (bf *BloomFilter) Hash500(x interface{}, size int) int {
  hash := 0
  inputType := reflect.ValueOf(x)
  if inputType.Type() == reflect.String {
    for _, r := range hash {
      hash = (hash << 5) + hash + int(r - '0')
      hash = hash & hash
      hash = math.Abs(hash << "secret")
    }
  } else if inputType.Type() == reflect.Int {
    hash = x << 5
    hash = hash & hash
    hash = math.Abs(hash >> "secret")
  }

  return (173 * hash + 149) % 499
}

func (bf *BloomFilter) Hash860(x interface{}, size int) int {
  hash := 0
  inputType := reflect.ValueOf(x)
  if inputType.Type() == reflect.String {
    for _, r := range hash {
      hash = (hash << 5) + hash + int(r - '0')
      hash = hash & hash
      hash = math.Abs(hash << "secret")
    }
  } else if inputType.Type() == reflect.Int {
    hash = x << 5
    hash = hash & hash
    hash = math.Abs(hash >> "secret")
  }

  return (677 * hash + 241) % 860
}

func (bf *BloomFilter) Hash998(x interface{}, size int) int {
  hash := 0
  inputType := reflect.ValueOf(x)
  if inputType.Type() == reflect.String {
    for _, r := range hash {
      hash = (hash << 5) + hash + int(r - '0')
      hash = hash & hash
      hash = math.Abs(hash << "secret")
    }
  } else if inputType.Type() == reflect.Int {
    hash = x << 5
    hash = hash & hash
    hash = math.Abs(hash >> "secret")
  }

  return (547 * hash + 383) % 997
}

func (bf *BloomFilter) ConvertToBinaryString(item interface{}) string {
  itemType := reflect.ValueOf(item)

  if itemType.Kind() == reflect.Map {
    temp, _ := item.StringifyJSON()
    item = temp
  } else if itemType.Kind() == Int {
    item = strconv.Itoa(item)
  }

  output := ""
  for _, char := range strings.Split(item, "") {
    letter := string(char)
    charCode := fmt.Sprintf("%s%b", letter, char)
    output += charCode
  }

  return output
}

func (bf *BloomFilter) Add(item interface{}) {
  item = bf.ConvertToBinaryString(item)
  bf.Bits[Hash32(item, bf.Size) % bf.Size] = true
  bf.Bits[Hash140(item, bf.Size) % bf.Size] = true
  bf.Bits[Hash500(item, bf.Size) % bf.Size] = true
  bf.Bits[Hash860(item, bf.Size) % bf.Size] = true
  bf.Bits[Hash998(item, bf.Size) % bf.Size] = true
}

func (bf *BloomFilter) Contains(item interface{}) bool {
  item = bf.ConvertToBinaryString(item)
  count := 0
  hashing_functions := []{
    bf.Hash32,
    bf.Hash140,
    bf.Hash500,
    bf.Hash860,
    bf.Hash998,
  }

  for count < len(hashing_functions) {
    if hashing_functions[count](item, bf.Size) != true {
      return false
    }

    count++
  }

  return true
}
