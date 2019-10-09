package stacks

type InterfaceStack struct {
  Items []interface{}
  Size int
}

func (s *InterfaceStack) Push(item interface{}) {
  s.Items = append(s.Items, item)
}

func (s *InterfaceStack) Pop() interface{} {
  if s.Size > 0 {
    popped := s.Items[s.Size - 1]
    s.Items = s.Items[:s.Size - 1]
    return popped
  } else {
    return nil
  }
}

func (s *InterfaceStack) Clear() {
  s.Size = 0
  s.Items = make([]interface{}, 0)
}

func (s *InterfaceStack) Contains(item interface{}) bool {
  for _, element := range s.Items {
    if element == item {
      return true
    }
  }

  return false
}

func (s *InterfaceStack) Peek() interface{} {
  return s.Items[s.Size - 1]
}

func (s *InterfaceStack) Clone() *InterfaceStack {
  clonedStack := &Stack{
    Items: make([]interface{}, 0),
    Size: 0,
  }

  for i := s.Size - 1; i > 0; i-- {
      clonedStack.Push(s.Pop())
  }

  return clonedStack
}
