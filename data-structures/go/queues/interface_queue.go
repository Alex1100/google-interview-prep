package queues


type Queue struct {
  Items []interface{}
  Size int
}

func (q *Queue) Enqueue(item interface{}) {
  q.Items = append(q.Items, item)
  q.Size++
  return
}

func (q *Queue) Dequeue() interface{} {
  item := q.Items[0]
  q.Items = q.Items[1:]
  q.Size--
  return item
}

func (q *Queue) Peek() interface{} {
  return q.Items[0]
}

func (q *Queue) IsEmpty() bool {
  return q.Size == 0
}
