package queues


type StringQueue struct {
  Items []string
  Size int
}

func (q *StringQueue) Enqueue(item string) {
  q.Items = append(q.Items, item)
  q.Size++
  return
}

func (q *StringQueue) Dequeue() string {
  item := q.Items[0]
  q.Items = q.Items[1:]
  q.Size--
  return item
}

func (q *StringQueue) Peek() string {
  return q.Items[0]
}

func (q *StringQueue) IsEmpty() bool {
  return q.Size == 0
}
