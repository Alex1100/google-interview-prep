package stacks

type Queue struct {
  Items []interface{}
  Size int
}

func (q *Queue) Enqueue(item interface{}) {
  q.Items = append(q.Items, item)
  q.Size++
}

func (q *Queue) Dequeue() interface{} {
  item := q.Items[0]
  if q.Size > 1 {
    q.Items = q.Items[1:]
  } else {
    q.Items = make([]interface{}, 0)
  }
  q.Size--
  return item
}

func (q *Queue) Peek() interface{} {
  return q.Items[0]
}

func (q *Queue) IsEmpty() bool {
  return q.Size == 0
}


type QueueStack struct {
  FirstQueue *Queue
  SecondQueue *Queue
}

func (s *QueueStack) Push(item interface{}) {
  if s.FirstQueue.Size == 0 {
    s.SecondQueue.Enqueue(item)
  } else {
    s.FirstQueue.Enqueue(item)
  }
}

func (s *QueueStack) Pop() interface{} {
  var popped interface{}
  var count int

  if s.FirstQueue.Size > 0 {
    count = s.FirstQueue.Size

    for count != 1 {
      s.SecondQueue.Enqueue(s.FirstQueue.Dequeue())
      count = s.FirstQueue.Size
    }

    popped = s.FirstQueue.Dequeue()
    return popped
  } else if s.SecondQueue.Size > 0 {
    count = s.SecondQueue.Size

    for count != 1 {
      s.FirstQueue.Enqueue(s.SecondQueue.Dequeue())
      count = s.SecondQueue.Size
    }

    popped = s.SecondQueue.Dequeue()
    return popped
  } else {
    return popped
  }
}

func (s *QueueStack) Clear() {
  s.FirstQueue.Size = 0
  s.FirstQueue.Items = make([]interface{}, 0)
  s.SecondQueue.Size = 0
  s.SecondQueue.Items = make([]interface{}, 0)
}

func (s *QueueStack) Contains(item interface{}) bool {
  if s.FirstQueue.Size > 0 {
    for _, element := range s.FirstQueue.Items {
      if element == item {
        return true
      }
    }
  } else if s.SecondQueue.Size > 0 {
    for _, element := range s.SecondQueue.Items {
      if element == item {
        return true
      }
    }
  }

  return false
}

func (s *QueueStack) Peek() interface{} {
  if s.FirstQueue.Size > 0 {
    return s.FirstQueue.Items[s.FirstQueue.Size - 1]
  } else if s.SecondQueue.Size > 0 {
    return s.SecondQueue.Items[s.SecondQueue.Size - 1]
  } else {
    return nil
  }
}

func (s *QueueStack) Clone() *QueueStack {
  clonedStack := &QueueStack{
    FirstQueue: &Queue{
      Items: make([]interface{}, 0),
      Size: 0,
    },
    SecondQueue: &Queue{
      Items: make([]interface{}, 0),
      Size: 0,
    },
  }

  for i := s.FirstQueue.Size; i > 0; i-- {
      clonedStack.Push(s.Pop())
  }

  return clonedStack
}
