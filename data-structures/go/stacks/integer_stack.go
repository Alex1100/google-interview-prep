package stacks

type IntStack struct {
  Items []int
  Size int
}

// LIFO

func (s *IntStack) Push(item int) {
  s.Items = append(s.Items, item)
  s.Size++
}

func (s *IntStack) Pop() int {
  if s.Size > 0 {
    popped := s.Items[s.Size - 1]
    s.Items = s.Items[:s.Size - 1]
    s.Size--
    return popped
  } else {
    return 0
  }
}

func (s *IntStack) Clear() {
  s.Size = 0
  s.Items = make([]int, 0)
}

func (s *IntStack) Contains(item int) bool {
  for _, element := range s.Items {
    if element == item {
      return true
    }
  }

  return false
}

func (s *IntStack) Peek() int {
  return s.Items[s.Size - 1]
}

func (s *IntStack) Clone() *IntStack {
  clonedStack := &IntStack{
    Items: make([]int, 0),
    Size: 0,
  }

  for i := s.Size; i > 0; i-- {
      clonedStack.Push(s.Pop())
  }

  return clonedStack
}
