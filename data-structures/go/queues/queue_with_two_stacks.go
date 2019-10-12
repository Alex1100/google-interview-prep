package queues

type Stack struct {
  Items []interface{}
  Size int
}

func (s *Stack) Push(item interface{}) {
  s.Items = append(s.Items, item)
  s.Size++
}

func (s *Stack) Pop() interface{} {
  if s.Size > 0 {
    popped := s.Items[s.Size - 1]
    s.Items = s.Items[:s.Size - 1]
    s.Size--
    return popped
  } else {
    return nil
  }
}

func (s *Stack) Clear() {
  s.Size = 0
  s.Items = make([]interface{}, 0)
}

func (s *Stack) Contains(item interface{}) bool {
  for _, element := range s.Items {
    if element == item {
      return true
    }
  }

  return false
}

func (s *Stack) Peek() interface{} {
  return s.Items[s.Size - 1]
}

func (s *Stack) Clone() *Stack {
  clonedStack := &Stack{
    Items: make([]interface{}, 0),
    Size: 0,
  }

  for i := s.Size; i > 0; i-- {
      clonedStack.Push(s.Pop())
  }

  return clonedStack
}


type StackQueue struct {
  FirstStack *Stack
  SecondStack *Stack
}

func (q *StackQueue) Enqueue(item interface{}) {
  if q.FirstStack.Size == 0 {
    q.SecondStack.Push(item)
  } else {
    q.FirstStack.Push(item)
  }
}

func (q *StackQueue) Dequeue() interface{} {
  var deleted interface{}
  var count int

  if q.FirstStack.Size == 0 {
    count = q.SecondStack.Size
    for count > 1 {
      q.FirstStack.Push(q.SecondStack.Pop())
      count = q.SecondStack.Size
    }

    deleted = q.SecondStack.Pop()
  } else if q.SecondStack.Size == 0 {
    count = q.FirstStack.Size
    for count > 1 {
      q.SecondStack.Push(q.FirstStack.Pop())
      count = q.FirstStack.Size
    }

    deleted = q.FirstStack.Pop()
  }

  return deleted
}

func (q *StackQueue) Peek() interface{} {
  if q.FirstStack.Size > 0 {
    return q.FirstStack.Items[q.FirstStack.Size - 1]
  } else if q.SecondStack.Size > 0 {
    return q.SecondStack.Items[q.SecondStack.Size - 1]
  } else {
    return nil
  }
}
func (q *StackQueue) IsEmpty() bool {
  if q.FirstStack.Size == 0 && q.SecondStack.Size == 0 {
    return true
  }

  return false
}
