package stacks

type StringStack struct {
  Items []string
  Size int
}

func (s *StringStack) Push(item string) {
  s.Items = append(s.Items, item)
  s.Size++
}

func (s *StringStack) Pop() string {
  if s.Size > 0 {
    popped := s.Items[s.Size - 1]
    s.Items = s.Items[:s.Size - 1]
    s.Size--
    return popped
  } else {
    return ""
  }
}

func (s *StringStack) Clear() {
  s.Size = 0
  s.Items = make([]string, 0)
}

func (s *StringStack) Contains(item string) bool {
  for _, element := range s.Items {
    if element == item {
      return true
    }
  }

  return false
}

func (s *StringStack) Peek() string {
  return s.Items[s.Size - 1]
}

func (s *StringStack) Clone() *StringStack {
  clonedStack := &StringStack{
    Items: make([]string, 0),
    Size: 0,
  }

  for i := s.Size; i > 0; i-- {
      clonedStack.Push(s.Pop())
  }

  return clonedStack
}
